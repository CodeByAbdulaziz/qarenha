import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Only enable a retailer after checking its public data and collection rules.
// Carrefour, Jarir and Amazon require a separate authorized integration.
const retailerHosts = { extra: new Set(["www.extra.com", "extra.com"]) };
const userAgent =
  "QarenhaPriceCheck/1.0 (+https://codebyabdulaziz.github.io/qarenha/)";
const maxPageBytes = 3_000_000;
const maxAgeMinutes = 30;

const asArray = (value) =>
  Array.isArray(value) ? value : value ? [value] : [];
const hasType = (item, type) =>
  asArray(item?.["@type"]).some(
    (value) => String(value).split("/").at(-1) === type,
  );
const text = (value) => String(value ?? "").trim();

function decodeEntities(value) {
  return text(value).replace(
    /&(#x[0-9a-f]+|#\d+|amp|quot|apos|nbsp|ndash|mdash|lt|gt);/gi,
    (entity, key) => {
      const named = {
        amp: "&",
        quot: '"',
        apos: "'",
        nbsp: " ",
        ndash: "-",
        mdash: "-",
        lt: "<",
        gt: ">",
      };
      if (!key.startsWith("#")) return named[key.toLowerCase()] ?? entity;
      const number = key.toLowerCase().startsWith("#x")
        ? parseInt(key.slice(2), 16)
        : Number(key.slice(1));
      return number >= 0 && number <= 0x10ffff
        ? String.fromCodePoint(number)
        : entity;
    },
  );
}

const normalizeName = (value) =>
  decodeEntities(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
const normalizeCode = (value) =>
  text(value).toLowerCase().replace(/[\s-]/g, "");

function priceNumber(value) {
  if (
    typeof value !== "number" &&
    (typeof value !== "string" || !/^\d+(\.\d+)?$/.test(value.trim()))
  )
    return null;
  const number = Number(value);
  const rounded = Math.round(number * 100) / 100;
  return Number.isFinite(number) &&
    number > 0 &&
    number < 10_000_000 &&
    Math.abs(rounded - number) < 0.0000001
    ? rounded
    : null;
}

function productsIn(value) {
  return asArray(value).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    return [
      ...(hasType(item, "Product") ? [item] : []),
      ...productsIn(item["@graph"]),
    ];
  });
}

export function structuredProducts(html) {
  const products = [];
  for (const match of String(html).matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi,
  )) {
    if (!/\btype\s*=\s*(["'])application\/ld\+json\1/i.test(match[1])) continue;
    try {
      products.push(...productsIn(JSON.parse(match[2])));
    } catch {
      /* A malformed block cannot supply a price. */
    }
  }
  return products;
}

function identityMatches(product, expected = {}) {
  if (!expected.sku || text(product.sku) !== text(expected.sku)) return false;
  if (!expected.name && !expected.model && !expected.gtin) return false;
  if (
    expected.name &&
    normalizeName(product.name) !== normalizeName(expected.name)
  )
    return false;
  if (expected.gtin) {
    const gtins = [
      product.gtin,
      product.gtin8,
      product.gtin12,
      product.gtin13,
      product.gtin14,
    ].map(normalizeCode);
    if (!gtins.includes(normalizeCode(expected.gtin))) return false;
  }
  if (expected.model) {
    const model = normalizeCode(expected.model);
    const explicit = [product.mpn, product.model].map(normalizeCode);
    const nameTokens = normalizeName(product.name)
      .split(" ")
      .map(normalizeCode);
    if (!explicit.includes(model) && !nameTokens.includes(model)) return false;
  }
  return true;
}

function unavailable(source, checkedAt, reason) {
  return {
    productId: source.productId,
    storeId: source.storeId,
    price: null,
    available: null,
    currency: "SAR",
    sourceUrl: source.url,
    sourceType: "retailer-page",
    checkedAt,
    verifiedAt: null,
    validUntil: null,
    status: "unavailable",
    reason,
    regularPrice: null,
    seller: null,
    identity: null,
  };
}

function sourceOfferExpiry(value) {
  if (!value) return Infinity;
  if (typeof value !== "string") return NaN;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (dateOnly) {
    const calendarDate = Date.parse(`${value}T00:00:00Z`);
    if (
      !Number.isFinite(calendarDate) ||
      new Date(calendarDate).toISOString().slice(0, 10) !== value
    )
      return NaN;
  }
  const normalized = dateOnly ? `${value}T23:59:59+03:00` : value;
  return Date.parse(normalized);
}

function pageAvailability(html, sku, structuredStock) {
  // eXtra's public page can disagree with its JSON-LD stock value.
  // Read the matching server-rendered product record without executing scripts.
  const pageSku = String(html).match(
    /ACC\.rrvariables\.productId\s*=\s*["']([^"']+)["']/,
  )?.[1];
  const pageStock = String(html).match(
    /ACC\.rrvariables\.productStatusCode\s*=\s*["']([^"']*)["']/,
  )?.[1];
  if (pageSku !== sku)
    return { available: null, evidence: "page-stock-not-confirmed" };
  if (pageStock === "outOfStock")
    return { available: false, evidence: "matching-page-out-of-stock" };
  if (
    ["inStock", "lowStock"].includes(pageStock) &&
    ["InStock", "LimitedAvailability"].includes(structuredStock)
  )
    return { available: true, evidence: "page-and-structured-stock-agree" };
  return { available: null, evidence: "page-stock-not-confirmed" };
}

export function parseProductOffer(
  html,
  source,
  { now = Date.now(), ttlMinutes = maxAgeMinutes } = {},
) {
  const checkedAt = new Date(now).toISOString();
  const fail = (reason) => unavailable(source, checkedAt, reason);
  const matches = structuredProducts(html).filter((product) =>
    identityMatches(product, source.expected),
  );
  if (matches.length !== 1)
    return fail(
      matches.length ? "ambiguous-product" : "product-identity-mismatch",
    );
  const product = matches[0];
  let offers = asArray(product.offers).filter((offer) =>
    hasType(offer, "Offer"),
  );
  if (source.expected?.seller)
    offers = offers.filter(
      (offer) =>
        normalizeName(offer.seller?.name ?? offer.seller) ===
        normalizeName(source.expected.seller),
    );
  if (offers.length !== 1)
    return fail(offers.length ? "ambiguous-offer" : "no-single-offer");
  const offer = offers[0];
  if (text(offer.priceCurrency).toUpperCase() !== "SAR")
    return fail("wrong-currency");
  const price = priceNumber(offer.price);
  if (price === null) return fail("invalid-price");
  const offerExpiry = sourceOfferExpiry(offer.priceValidUntil);
  if (Number.isNaN(offerExpiry) || offerExpiry <= now)
    return fail("expired-source-offer");
  const stock = text(offer.availability).split("/").at(-1);
  const availability = pageAvailability(html, text(product.sku), stock);
  const regularPrices = asArray(offer.priceSpecification)
    .filter(
      (spec) =>
        text(spec.priceType).split("/").at(-1) === "StrikethroughPrice" &&
        text(spec.priceCurrency).toUpperCase() === "SAR",
    )
    .map((spec) => priceNumber(spec.price))
    .filter((number) => number !== null && number > price);
  const ttl = Math.min(
    maxAgeMinutes,
    Math.max(1, Number(ttlMinutes) || maxAgeMinutes),
  );
  return {
    productId: source.productId,
    storeId: source.storeId,
    price,
    available: availability.available,
    currency: "SAR",
    sourceUrl: source.url,
    sourceType: "retailer-page",
    checkedAt,
    verifiedAt: checkedAt,
    validUntil: new Date(
      Math.min(now + ttl * 60_000, offerExpiry),
    ).toISOString(),
    status: "verified",
    reason: null,
    regularPrice: regularPrices.length === 1 ? regularPrices[0] : null,
    availabilityEvidence: availability.evidence,
    region: null,
    shippingRegions: [
      ...new Set(
        asArray(offer.shippingDetails)
          .flatMap((detail) =>
            asArray(detail.shippingDestination).map((destination) =>
              text(destination.name),
            ),
          )
          .filter(Boolean),
      ),
    ],
    seller:
      text(
        offer.seller?.name ??
          (typeof offer.seller === "string" ? offer.seller : ""),
      ) || null,
    identity: {
      sku: text(product.sku),
      name: decodeEntities(product.name),
      model: text(product.mpn ?? product.model) || null,
      gtin:
        text(
          product.gtin ??
            product.gtin13 ??
            product.gtin14 ??
            product.gtin12 ??
            product.gtin8,
        ) || null,
    },
  };
}

export function isFreshOffer(offer, now = Date.now()) {
  const verifiedAt = Date.parse(offer?.verifiedAt);
  const validUntil = Date.parse(offer?.validUntil);
  return (
    offer?.status === "verified" &&
    offer?.currency === "SAR" &&
    priceNumber(offer.price) !== null &&
    Number.isFinite(verifiedAt) &&
    Number.isFinite(validUntil) &&
    verifiedAt <= now &&
    validUntil > now &&
    validUntil > verifiedAt &&
    validUntil - verifiedAt <= maxAgeMinutes * 60_000
  );
}

function allowedUrl(value, storeId) {
  const url = new URL(value);
  if (
    !retailerHosts[storeId]?.has(url.hostname) ||
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    url.hash
  )
    throw new Error("source-url-not-allowed");
  if (
    storeId === "extra" &&
    !/^\/(en|ar)-sa\/.+\/p\/\d+\/?$/.test(url.pathname)
  )
    throw new Error("not-saudi-product-page");
  return url;
}

async function boundedBody(response, maxBytes) {
  const declared = Number(response.headers.get("content-length"));
  if (declared > maxBytes) throw new Error("response-too-large");
  const chunks = [];
  let size = 0;
  for await (const chunk of response.body ?? []) {
    size += chunk.byteLength;
    if (size > maxBytes) throw new Error("response-too-large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function getPage(url, storeId, fetcher, { robots = false } = {}) {
  let next = url;
  for (let count = 0; count < 4; count++) {
    const response = await fetcher(next, {
      redirect: "manual",
      signal: AbortSignal.timeout(20_000),
      headers: {
        "User-Agent": userAgent,
        Accept: robots ? "text/plain" : "text/html",
        "Accept-Language": "en-SA,en;q=0.9",
      },
    });
    if (response.status >= 300 && response.status < 400) {
      const target = new URL(response.headers.get("location"), next);
      if (robots) {
        if (
          target.protocol !== "https:" ||
          !retailerHosts[storeId]?.has(target.hostname) ||
          target.pathname !== "/robots.txt" ||
          target.search
        )
          throw new Error("redirect-not-allowed");
      } else allowedUrl(target.href, storeId);
      next = target;
      continue;
    }
    if (robots && response.status === 404) return "";
    if (!response.ok) throw new Error(`http-${response.status}`);
    const contentType = text(
      response.headers.get("content-type"),
    ).toLowerCase();
    if (!robots && !contentType.includes("text/html"))
      throw new Error("not-html");
    return boundedBody(response, robots ? 100_000 : maxPageBytes);
  }
  throw new Error("too-many-redirects");
}

export function robotsAllows(content, path, agent = "qarenhapricecheck") {
  const groups = [];
  let group = null;
  for (const line of content.split(/\r?\n/)) {
    const match = line
      .replace(/#.*$/, "")
      .trim()
      .match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (key === "user-agent") {
      if (!group || group.rules.length) {
        group = { agents: [], rules: [] };
        groups.push(group);
      }
      group.agents.push(value.toLowerCase());
    } else if (group && ["allow", "disallow"].includes(key) && value)
      group.rules.push({ allow: key === "allow", path: value });
  }
  const specific = groups.filter((item) =>
    item.agents.some((name) => name !== "*" && agent.includes(name)),
  );
  const selected = specific.length
    ? specific
    : groups.filter((item) => item.agents.includes("*"));
  let best = { length: -1, allow: true };
  for (const rule of selected.flatMap((item) => item.rules)) {
    const end = rule.path.endsWith("$") ? "$" : "";
    const pattern = rule.path
      .replace(/\$$/, "")
      .split("*")
      .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
      .join(".*");
    if (new RegExp(`^${pattern}${end}`).test(path)) {
      const length = rule.path.replace(/\*/g, "").length;
      if (length > best.length || (length === best.length && rule.allow))
        best = { length, allow: rule.allow };
    }
  }
  return best.allow;
}

export async function collectPrices(
  config,
  { fetcher = fetch, now = () => Date.now(), pauseMs = 500 } = {},
) {
  if (
    config?.version !== 1 ||
    !Array.isArray(config.sources) ||
    config.sources.length > 300
  )
    throw new Error("Invalid source manifest");
  const keys = new Set();
  for (const source of config.sources) {
    const key = `${source.productId}/${source.storeId}`;
    if (
      !/^[a-z0-9-]+$/.test(source.productId ?? "") ||
      !/^[a-z0-9-]+$/.test(source.storeId ?? "") ||
      keys.has(key)
    )
      throw new Error("Invalid or duplicate product/store source");
    keys.add(key);
  }
  const robotsByOrigin = new Map();
  const offers = new Array(config.sources.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < config.sources.length) {
      const index = nextIndex++;
      const source = config.sources[index];
      const checkedAt = new Date(now()).toISOString();
      if (!retailerHosts[source.storeId]) {
        offers[index] = unavailable(
          source,
          checkedAt,
          "retailer-permission-required",
        );
        continue;
      }
      try {
        const url = allowedUrl(source.url, source.storeId);
        if (
          !source.expected?.sku ||
          url.pathname.split("/").filter(Boolean).at(-1) !==
            text(source.expected.sku) ||
          (!source.expected.name &&
            !source.expected.model &&
            !source.expected.gtin)
        )
          throw new Error("invalid-expected-identity");
        if (!robotsByOrigin.has(url.origin))
          robotsByOrigin.set(
            url.origin,
            getPage(new URL("/robots.txt", url), source.storeId, fetcher, {
              robots: true,
            }),
          );
        const rules = await robotsByOrigin.get(url.origin);
        if (!robotsAllows(rules, url.pathname))
          throw new Error("robots-disallowed");
        const html = await getPage(url, source.storeId, fetcher);
        offers[index] = parseProductOffer(html, source, {
          now: now(),
          ttlMinutes: config.maxAgeMinutes,
        });
      } catch (error) {
        const safe =
          /^(source-url-not-allowed|not-saudi-product-page|redirect-not-allowed|robots-disallowed|not-html|response-too-large|too-many-redirects|invalid-expected-identity|http-\d+)$/.test(
            error.message,
          )
            ? error.message
            : "fetch-failed";
        offers[index] = unavailable(source, checkedAt, safe);
      }
      if (pauseMs > 0) await new Promise((done) => setTimeout(done, pauseMs));
    }
  }
  await Promise.all([worker(), worker()]);
  return {
    version: 1,
    generatedAt: new Date(now()).toISOString(),
    maxAgeMinutes: Math.min(
      maxAgeMinutes,
      Math.max(1, Number(config.maxAgeMinutes) || maxAgeMinutes),
    ),
    offers,
  };
}

async function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const input = resolve(root, process.argv[2] || "data/product-sources.json");
  const output = resolve(root, process.argv[3] || "data/prices.json");
  const config = JSON.parse(await readFile(input, "utf8"));
  const result = await collectPrices(config);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(`${output}.tmp`, `${JSON.stringify(result, null, 2)}\n`);
  await rename(`${output}.tmp`, output);
  console.log(
    JSON.stringify({
      sources: result.offers.length,
      verified: result.offers.filter((offer) => offer.status === "verified")
        .length,
      unavailable: result.offers.filter((offer) => offer.status !== "verified")
        .length,
    }),
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
