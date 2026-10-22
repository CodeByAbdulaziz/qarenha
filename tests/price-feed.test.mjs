import test from "node:test";
import assert from "node:assert/strict";
import {
  collectPrices,
  isFreshOffer,
  parseProductOffer,
  robotsAllows,
} from "../scripts/update-prices.mjs";

const now = Date.parse("2026-10-22T12:00:00Z");
const source = {
  productId: "charger",
  storeId: "extra",
  url: "https://www.extra.com/en-sa/mobiles/charger/p/100499681",
  expected: { sku: "100499681", model: "A2656K11" },
};
const item = (extra = {}) => ({
  "@type": "Product",
  sku: "100499681",
  name: "Anker 25W Charger Black",
  mpn: "A2656K11",
  offers: {
    "@type": "Offer",
    price: "49",
    priceCurrency: "SAR",
    availability: "https://schema.org/InStock",
  },
  ...extra,
});
const html = (data, pageStock = "inStock") =>
  `<html><script>ACC.rrvariables.productId = "${data.sku ?? ""}"; ACC.rrvariables.productStatusCode = "${pageStock}";</script><script type="application/ld+json">${JSON.stringify(data)}</script></html>`;

test("a matched Saudi offer records its source and a short validity window", () => {
  const result = parseProductOffer(html(item()), source, { now });
  assert.equal(result.price, 49);
  assert.equal(result.available, true);
  assert.equal(result.sourceUrl, source.url);
  assert.equal(result.identity.model, "A2656K11");
  assert.equal(result.verifiedAt, "2026-10-22T12:00:00.000Z");
  assert.equal(result.validUntil, "2026-10-22T12:30:00.000Z");
  assert.equal(result.regularPrice, null);
});

test("price changes come from the current offer, never a previous snapshot or installment amount", () => {
  const product = item();
  product.offers.price = "39";
  product.offers.priceSpecification = [
    {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/StrikethroughPrice",
      price: "69",
      priceCurrency: "SAR",
    },
    { price: "3", priceCurrency: "SAR" },
  ];
  const result = parseProductOffer(html(product), source, { now });
  assert.equal(result.price, 39);
  assert.equal(result.regularPrice, 69);
});

test("a related product with a different SKU or model cannot provide the price", () => {
  for (const product of [item({ sku: "OTHER" }), item({ mpn: "A2149K22" })]) {
    const result = parseProductOffer(html(product), source, { now });
    assert.equal(result.price, null);
    assert.equal(result.reason, "product-identity-mismatch");
  }
});

test("exact names normalize HTML entities, while variants and package sizes stay distinct", () => {
  const named = {
    ...source,
    expected: { sku: "100499681", name: "Adapter – White 2 Pack" },
  };
  assert.equal(
    parseProductOffer(
      html(item({ name: "Adapter &ndash; White 2 Pack" })),
      named,
      { now },
    ).price,
    49,
  );
  assert.equal(
    parseProductOffer(html(item({ name: "Adapter White 1 Pack" })), named, {
      now,
    }).price,
    null,
  );
});

test("aggregate ranges, multiple sellers and non-SAR currency do not become comparable prices", () => {
  for (const offers of [
    {
      "@type": "AggregateOffer",
      lowPrice: "5",
      highPrice: "49",
      priceCurrency: "SAR",
    },
    [item().offers, item().offers],
    { ...item().offers, priceCurrency: "AED" },
  ]) {
    assert.equal(
      parseProductOffer(html(item({ offers })), source, { now }).price,
      null,
    );
  }
});

test("unknown stock is not fabricated, and out-of-stock is kept separate", () => {
  const unknown = parseProductOffer(
    html(item({ offers: { ...item().offers, availability: undefined } })),
    source,
    { now },
  );
  const unavailable = parseProductOffer(
    html(
      item({
        offers: {
          ...item().offers,
          availability: "https://schema.org/OutOfStock",
        },
      }),
      "outOfStock",
    ),
    source,
    { now },
  );
  assert.equal(unknown.price, 49);
  assert.equal(unknown.available, null);
  assert.equal(unavailable.price, 49);
  assert.equal(unavailable.available, false);
});

test("eXtra page out-of-stock overrides a contradictory structured InStock flag", () => {
  const result = parseProductOffer(html(item(), "outOfStock"), source, { now });
  assert.equal(result.price, 49);
  assert.equal(result.available, false);
  assert.equal(result.availabilityEvidence, "matching-page-out-of-stock");
  const missingPageState = parseProductOffer(
    `<script type="application/ld+json">${JSON.stringify(item())}</script>`,
    source,
    { now },
  );
  assert.equal(missingPageState.price, 49);
  assert.equal(missingPageState.available, null);
});

test("expired source promotions are rejected and fresh offers stop at their source expiry", () => {
  const expired = item({
    offers: { ...item().offers, priceValidUntil: "2026-10-21" },
  });
  assert.equal(parseProductOffer(html(expired), source, { now }).price, null);
  const ending = item({
    offers: { ...item().offers, priceValidUntil: "2026-10-22T12:10:00Z" },
  });
  assert.equal(
    parseProductOffer(html(ending), source, { now }).validUntil,
    "2026-10-22T12:10:00.000Z",
  );
});

test("freshness rejects expiry, future timestamps and inflated validity windows", () => {
  const result = parseProductOffer(html(item()), source, { now });
  assert.equal(isFreshOffer(result, now), true);
  assert.equal(isFreshOffer(result, now + 30 * 60_000), false);
  assert.equal(isFreshOffer(result, now - 1000), false);
  assert.equal(
    isFreshOffer({ ...result, validUntil: "2026-10-23T12:00:00Z" }, now),
    false,
  );
});

test("invalid source calendar dates cannot extend a promotion", () => {
  for (const priceValidUntil of ["2027-02-31", "2027-99-01", "invalid"]) {
    const product = item({ offers: { ...item().offers, priceValidUntil } });
    assert.equal(parseProductOffer(html(product), source, { now }).price, null);
  }
});

test("robots rules honor wildcards, specific agents, longest matches and allow ties", () => {
  const rules =
    "User-agent: *\nDisallow: /*?*\nDisallow: /private\nAllow: /private/public\nUser-agent: OtherBot\nDisallow: /";
  assert.equal(robotsAllows(rules, "/en-sa/x/p/1"), true);
  assert.equal(robotsAllows(rules, "/private/item"), false);
  assert.equal(robotsAllows(rules, "/private/public/item"), true);
  assert.equal(robotsAllows(rules, "/x?q=1"), false);
});

test("a failed refresh clears numeric prices rather than reusing previous data", async () => {
  const feed = await collectPrices(
    { version: 1, sources: [source] },
    {
      now: () => now,
      pauseMs: 0,
      fetcher: async (url) =>
        String(url).endsWith("robots.txt")
          ? new Response("User-agent: *\nAllow: /", { status: 200 })
          : new Response("Unavailable", { status: 503 }),
    },
  );
  assert.equal(feed.offers[0].price, null);
  assert.equal(feed.offers[0].available, null);
  assert.equal(feed.offers[0].verifiedAt, null);
  assert.equal(feed.offers[0].reason, "http-503");
});

test("unsupported retailers and redirects to non-retailer domains are never fetched", async () => {
  let calls = 0;
  const disabled = await collectPrices(
    { version: 1, sources: [{ ...source, storeId: "amazon" }] },
    {
      now: () => now,
      pauseMs: 0,
      fetcher: async () => {
        calls++;
        throw Error("unexpected");
      },
    },
  );
  assert.equal(calls, 0);
  assert.equal(disabled.offers[0].reason, "retailer-permission-required");
  const badRedirect = await collectPrices(
    { version: 1, sources: [source] },
    {
      now: () => now,
      pauseMs: 0,
      fetcher: async (url) =>
        String(url).endsWith("robots.txt")
          ? new Response("User-agent: *\nAllow: /", { status: 200 })
          : new Response("", {
              status: 302,
              headers: { location: "https://example.com/p/1" },
            }),
    },
  );
  assert.equal(badRedirect.offers[0].price, null);
});
