import test from "node:test";
import assert from "node:assert/strict";
import { applyPriceFeed } from "../price-feed.js";
import {
  availableOffers,
  basketSummary,
  filterProducts,
  hasCurrentPrice,
} from "../pricing.js";

const now = Date.now();
const sourceUrl = "https://www.extra.com/en-sa/mobiles/phone/p/123";
const source = {
  productId: "phone",
  storeId: "extra",
  url: sourceUrl,
  expected: { sku: "123", model: "MODEL-A" },
};
const verified = (extra = {}) => ({
  productId: "phone",
  storeId: "extra",
  price: 50,
  available: true,
  currency: "SAR",
  sourceType: "retailer-page",
  status: "verified",
  sourceUrl,
  verifiedAt: new Date(now - 1000).toISOString(),
  validUntil: new Date(now + 29 * 60_000).toISOString(),
  identity: { sku: "123", model: "MODEL-A" },
  ...extra,
});
const fixture = () => ({
  products: [
    {
      id: "phone",
      name: "Phone",
      category: "electronics",
      tags: [],
      offers: [{ storeId: "extra", price: null, available: null }],
    },
  ],
  stores: [{ id: "extra", deliveryFee: null, freeDeliveryFrom: null }],
});
const manifest = { version: 1, sources: [source] };
const feed = (offer) => ({
  version: 1,
  generatedAt: new Date(now).toISOString(),
  offers: [offer],
});

test("sample numbers, expired checks and future timestamps cannot qualify as current prices", () => {
  assert.equal(hasCurrentPrice({ price: 1, available: true }, now), false);
  assert.equal(hasCurrentPrice(verified(), now), true);
  for (const changes of [
    { currency: "USD" },
    { status: "unavailable" },
    { validUntil: new Date(now).toISOString() },
    { verifiedAt: new Date(now + 1000).toISOString() },
    { validUntil: new Date(now + 60 * 60_000).toISOString() },
    { price: "50" },
  ])
    assert.equal(hasCurrentPrice(verified(changes), now), false);
});

test("source URL, SKU and exact model must all match the approved source", () => {
  for (const changes of [
    { sourceUrl: "https://www.extra.com/en-sa/mobiles/other/p/456" },
    { identity: { sku: "456", model: "MODEL-A" } },
    { identity: { sku: "123", model: "MODEL-B" } },
    { currency: "USD" },
  ]) {
    const { products, stores } = fixture();
    assert.equal(
      applyPriceFeed(products, stores, feed(verified(changes)), manifest, now)
        .verifiedOffers,
      0,
    );
    assert.equal(products[0].offers[0].price, null);
  }
});

test("out-of-stock source prices may display but cannot win rankings or make a basket complete", () => {
  const { products, stores } = fixture();
  applyPriceFeed(
    products,
    stores,
    feed(verified({ available: false })),
    manifest,
    now,
  );
  assert.equal(products[0].offers[0].price, 50);
  assert.equal(hasCurrentPrice(products[0].offers[0], now), true);
  assert.deepEqual(availableOffers(products[0]), []);
  assert.equal(filterProducts(products, { storeIds: ["extra"] }).length, 1);
  assert.equal(
    filterProducts(products, { storeIds: ["extra"], maxPrice: 100 }).length,
    0,
  );
  assert.equal(
    basketSummary(products, stores, { phone: 1 }).bestSingleStore,
    null,
  );
  assert.equal(basketSummary(products, stores, { phone: 1 }).split.total, null);
  assert.equal(
    basketSummary(products, stores, { phone: 1 }).byStore[0].total,
    null,
  );
});

test("expired out-of-stock evidence becomes unknown instead of hiding the product", () => {
  const { products } = fixture();
  products[0].offers[0] = verified({
    available: false,
    validUntil: new Date(now - 1).toISOString(),
  });
  assert.equal(filterProducts(products, { storeIds: ["extra"] }).length, 1);
  assert.equal(availableOffers(products[0]).length, 0);
});

test("failed or stale refresh clears the previous value instead of retaining a misleading price", () => {
  const { products, stores } = fixture();
  applyPriceFeed(products, stores, feed(verified()), manifest, now);
  assert.equal(products[0].offers[0].price, 50);
  applyPriceFeed(
    products,
    stores,
    feed(verified({ validUntil: new Date(now - 1).toISOString() })),
    manifest,
    now,
  );
  assert.equal(products[0].offers[0].price, null);
  assert.deepEqual(filterProducts(products, { maxPrice: 100 }), []);
  assert.equal(
    basketSummary(products, stores, { phone: 1 }).byStore[0].total,
    null,
  );
});

test("unapproved retailer manifests cannot add a price and an empty failed response clears all stores", () => {
  const { products, stores } = fixture();
  const bad = {
    version: 1,
    sources: [{ ...source, url: "https://untrusted.example/product" }],
  };
  applyPriceFeed(products, stores, feed(verified()), bad, now);
  assert.equal(products[0].offers[0].price, null);
  applyPriceFeed(products, stores, feed(verified()), manifest, now);
  applyPriceFeed(products, stores, {}, manifest, now);
  assert.equal(products[0].offers[0].price, null);
  assert.equal(stores[0].priceMode, "unverified");
});
