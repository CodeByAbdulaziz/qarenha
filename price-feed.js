import { hasCurrentPrice } from "./pricing.js?v=20261022";

const providerDomains = { extra: "www.extra.com" };
const normalize = (value) =>
  String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "");

function matchesIdentity(identity, expected) {
  return (
    String(identity?.sku) === String(expected?.sku) &&
    (!expected.name ||
      normalize(identity?.name) === normalize(expected.name)) &&
    (!expected.model ||
      normalize(identity?.model) === normalize(expected.model)) &&
    (!expected.gtin || normalize(identity?.gtin) === normalize(expected.gtin))
  );
}

function resetPrices(products, stores) {
  for (const product of products) {
    for (const offer of product.offers) {
      const storeId = offer.storeId;
      for (const key of Object.keys(offer)) delete offer[key];
      Object.assign(offer, { storeId, price: null, available: null });
    }
  }
  for (const store of stores) store.priceMode = "unverified";
}

function allowedSource(source) {
  try {
    const url = new URL(source.url);
    return (
      providerDomains[source.storeId] === url.hostname &&
      url.protocol === "https:" &&
      url.pathname.startsWith("/en-sa/") &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      source.expected?.sku &&
      (source.expected.name || source.expected.model || source.expected.gtin)
    );
  } catch {
    return false;
  }
}

export function applyPriceFeed(
  products,
  stores,
  feed,
  manifest,
  now = Date.now(),
) {
  resetPrices(products, stores);
  if (
    feed?.version !== 1 ||
    manifest?.version !== 1 ||
    !Array.isArray(feed.offers) ||
    !Array.isArray(manifest.sources)
  ) {
    return { status: "unavailable", updatedAt: null, verifiedOffers: 0 };
  }
  const sources = new Map();
  for (const source of manifest.sources) {
    if (allowedSource(source))
      sources.set(`${source.productId}/${source.storeId}`, source);
  }
  const productById = new Map(products.map((product) => [product.id, product]));
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const seen = new Set();
  let verifiedOffers = 0;
  for (const entry of feed.offers) {
    if (!entry || typeof entry !== "object") continue;
    const key = `${entry.productId}/${entry.storeId}`;
    const source = sources.get(key);
    const product = productById.get(entry.productId);
    const store = storeById.get(entry.storeId);
    if (seen.has(key) || !source || !product || !store) continue;
    seen.add(key);
    const offer = product.offers.find((offer) => offer.storeId === store.id);
    if (
      !offer ||
      entry.sourceUrl !== source.url ||
      !hasCurrentPrice(entry, now)
    )
      continue;
    if (!matchesIdentity(entry.identity, source.expected)) continue;
    if (
      entry.available !== true &&
      entry.available !== false &&
      entry.available !== null
    )
      continue;
    Object.assign(offer, {
      ...entry,
      storeId: store.id,
      regularPrice:
        typeof entry.regularPrice === "number" &&
        Number.isFinite(entry.regularPrice) &&
        entry.regularPrice > entry.price
          ? entry.regularPrice
          : null,
    });
    if (offer.available === true) {
      store.priceMode = "verified";
      verifiedOffers += 1;
    }
  }
  return {
    status: verifiedOffers ? "ready" : "unavailable",
    updatedAt: feed.generatedAt || null,
    verifiedOffers,
  };
}

export async function loadPriceFeed(products, stores) {
  try {
    const options = { cache: "no-store", signal: AbortSignal.timeout(10_000) };
    const responses = await Promise.all([
      fetch(new URL("./data/prices.json", import.meta.url), options),
      fetch(new URL("./data/product-sources.json", import.meta.url), options),
    ]);
    if (responses.some((response) => !response.ok))
      throw new Error("Price feed unavailable");
    const [feed, manifest] = await Promise.all(
      responses.map((response) => response.json()),
    );
    return applyPriceFeed(products, stores, feed, manifest);
  } catch {
    resetPrices(products, stores);
    return { status: "unavailable", updatedAt: null, verifiedOffers: 0 };
  }
}
