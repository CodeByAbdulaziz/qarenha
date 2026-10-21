import test from "node:test";
import assert from "node:assert/strict";
import {
  availableOffers,
  unverifiedOffers,
  bestOffer,
  savingFor,
  normalizeSearch,
  filterProducts,
  basketSummary,
} from "../pricing.js";

const stores = [
  { id: "a", name: "Store A", deliveryFee: 10, freeDeliveryFrom: 100 },
  { id: "b", name: "Store B", deliveryFee: 8, freeDeliveryFrom: 80 },
  { id: "c", name: "Store C", deliveryFee: 6, freeDeliveryFrom: 60 },
];
const offer = (storeId, price, available = true) => ({
  storeId,
  price,
  available,
});
const product = (id, name, offers, extra = {}) => ({
  id,
  name,
  category: "food",
  unit: "1 كجم",
  tags: [],
  offers,
  ...extra,
});
const products = [
  product(
    "rice",
    "أَرُز بسمتي",
    [offer("a", 10), offer("b", 12), offer("c", 9, false)],
    { tags: ["طعام"] },
  ),
  product("apple", "تفاحة", [offer("a", 5), offer("b", 4)], {
    category: "fruit",
  }),
  product("phone", "Phone", [offer("b", 200)], {
    category: "electronics",
    tags: ["mobile"],
  }),
];

test("Arabic search ignores marks, tatweel, letter variants, and extra whitespace", () => {
  assert.equal(normalizeSearch("  إِجَّـاص   وَفَاكِهَة  "), "اجاص وفاكهه");
  assert.equal(normalizeSearch("آلَى"), "الي");
  assert.equal(normalizeSearch("  PHONE  12 "), "phone 12");
  assert.equal(normalizeSearch(null), "");
});

test("offers exclude unavailable or invalid prices and have a deterministic tie order", () => {
  const item = product("x", "x", [
    offer("z", 5),
    offer("a", 5),
    offer("b", 1, false),
    offer("a", NaN),
    offer("c", -2),
  ]);
  assert.deepEqual(
    availableOffers(item).map((entry) => entry.storeId),
    ["a", "z"],
  );
  assert.equal(bestOffer(item, ["z"]).storeId, "z");
  assert.equal(bestOffer(item, ["missing"]), null);
  assert.equal(bestOffer(product("zero", "zero", [offer("a", 0)])).price, 0);
  assert.equal(
    savingFor(product("cents", "cents", [offer("a", 0.1), offer("b", 0.3)])),
    0.2,
  );
});

test("product filters combine Arabic search, category, favorites, stock and selected-store price", () => {
  assert.deepEqual(
    filterProducts(products, { query: "ارز طعام" }).map((item) => item.id),
    ["rice"],
  );
  assert.deepEqual(
    filterProducts(products, { category: "fruit", query: "تفاحه" }).map(
      (item) => item.id,
    ),
    ["apple"],
  );
  assert.deepEqual(
    filterProducts(products, {
      favoritesOnly: true,
      favoriteIds: ["rice", "phone"],
      maxPrice: 20,
    }).map((item) => item.id),
    ["rice"],
  );
  assert.deepEqual(
    filterProducts(products, { storeIds: ["a"], maxPrice: 9 }).map(
      (item) => item.id,
    ),
    ["apple"],
  );
  assert.deepEqual(filterProducts(products, { storeIds: ["c"] }), []);
  assert.deepEqual(
    filterProducts(products, { query: "mobile" }).map((item) => item.id),
    ["phone"],
  );
});

test("sort modes preserve inputs and featured source order", () => {
  const before = JSON.stringify(products);
  assert.deepEqual(
    filterProducts(products).map((item) => item.id),
    ["rice", "apple", "phone"],
  );
  assert.deepEqual(
    filterProducts(products, { sort: "price-asc" }).map((item) => item.id),
    ["apple", "rice", "phone"],
  );
  assert.deepEqual(
    filterProducts(products, { sort: "price-desc" }).map((item) => item.id),
    ["phone", "rice", "apple"],
  );
  assert.deepEqual(
    filterProducts(products, { sort: "savings" }).map((item) => item.id),
    ["rice", "apple", "phone"],
  );
  assert.equal(JSON.stringify(products), before);
});

test("split basket groups cheapest offers and uses whole quantities with cents math", () => {
  const summary = basketSummary(
    products,
    stores,
    { rice: 3, apple: 2 },
    { includeDelivery: false },
  );
  assert.equal(summary.itemCount, 5);
  assert.equal(summary.split.subtotal, 38);
  assert.equal(summary.split.delivery, 0);
  assert.equal(summary.split.total, 38);
  assert.equal(summary.split.totalSavings, 6);
  assert.deepEqual(
    summary.split.byStore.map((entry) => [entry.storeId, entry.subtotal]),
    [
      ["a", 30],
      ["b", 8],
    ],
  );
  assert.equal(summary.bestSingleStore.store.id, "a");
  const cents = basketSummary(
    [product("x", "x", [offer("a", 0.1)])],
    stores,
    { x: 3 },
    { includeDelivery: false },
  );
  assert.equal(cents.split.total, 0.3);
});

test("delivery fees stop exactly at the free-delivery threshold", () => {
  const thresholdProduct = [product("x", "x", [offer("a", 10)])];
  const below = basketSummary(thresholdProduct, stores, { x: 9 });
  const at = basketSummary(thresholdProduct, stores, { x: 10 });
  assert.equal(below.split.total, 100);
  assert.equal(below.split.delivery, 10);
  assert.equal(at.split.total, 100);
  assert.equal(at.split.delivery, 0);
  assert.equal(at.byStore[0].delivery, 0);
  assert.equal(at.byStore[1].delivery, 0);
});

test("a merchant missing an item cannot be the best complete store", () => {
  const summary = basketSummary(products, stores, { rice: 1, phone: 1 });
  assert.equal(summary.bestSingleStore.store.id, "b");
  assert.deepEqual(summary.byStore[0].missingProductIds, ["phone"]);
  assert.equal(summary.byStore[0].complete, false);
  assert.deepEqual(summary.byStore[2].missingProductIds, ["rice", "phone"]);
});

test("split shipping can cost more than one complete store", () => {
  const summary = basketSummary(products, stores, { rice: 1, apple: 1 });
  assert.equal(summary.split.subtotal, 14);
  assert.equal(summary.split.delivery, 18);
  assert.equal(summary.split.total, 32);
  assert.equal(summary.bestSingleStore.total, 24);
  assert.equal(summary.bestSingleStore.store.id, "b");
  assert.equal(summary.split.totalSavings, 0);
});

test("invalid quantities and stale IDs are ignored without changing the basket", () => {
  const basket = { rice: 0, apple: 1.5, phone: "2", missing: 2 };
  const before = structuredClone(basket);
  const empty = basketSummary(products, stores, basket);
  assert.equal(empty.itemCount, 0);
  assert.equal(empty.split.total, 0);
  assert.equal(empty.bestSingleStore, null);
  assert.deepEqual(basket, before);
  assert.equal(basketSummary(products, stores, { rice: 99 }).itemCount, 99);
  assert.equal(basketSummary(products, stores, { rice: 100 }).itemCount, 0);
  assert.equal(basketSummary(products, stores, { rice: -1 }).itemCount, 0);
});

test("an out-of-stock basket reports the item without a fake full-plan saving", () => {
  const summary = basketSummary(
    [product("x", "x", [offer("a", 10, false)])],
    stores,
    { x: 1 },
  );
  assert.equal(summary.items[0].bestOffer, null);
  assert.equal(summary.bestSingleStore, null);
  assert.equal(summary.split.totalSavings, 0);
  assert.ok(summary.byStore.every((entry) => !entry.complete));
});

test("unknown offers stay separate from available and out-of-stock offers", () => {
  const item = product("x", "x", [
    offer("amazon", null, null),
    offer("a", 12),
    offer("b", 4, false),
  ]);
  assert.deepEqual(availableOffers(item), [offer("a", 12)]);
  assert.deepEqual(unverifiedOffers(item), [offer("amazon", null, null)]);
  assert.deepEqual(unverifiedOffers(item, ["a"]), []);
  assert.equal(bestOffer(item).storeId, "a");
  assert.equal(bestOffer(item, ["amazon"]), null);
  assert.equal(savingFor(item), 0);
});

test("unknown-store browsing keeps matching products but cannot prove a budget", () => {
  const items = [
    product(
      "rice",
      "أرز بسمتي",
      [offer("amazon", null, null), offer("a", 10)],
      {
        tags: ["طعام"],
      },
    ),
    product("soap", "صابون", [offer("amazon", null, null)], {
      category: "care",
    }),
    product("unavailable", "غير متوفر", [offer("amazon", 5, false)]),
  ];
  assert.deepEqual(
    filterProducts(items, { storeIds: ["amazon"] }).map((item) => item.id),
    ["rice", "soap"],
  );
  assert.deepEqual(
    filterProducts(items, {
      storeIds: ["amazon"],
      query: "ارز طعام",
      category: "food",
      favoritesOnly: true,
      favoriteIds: ["rice"],
    }).map((item) => item.id),
    ["rice"],
  );
  assert.deepEqual(
    filterProducts(items, { storeIds: ["amazon"], maxPrice: 100 }),
    [],
  );
  assert.deepEqual(
    filterProducts(items, { storeIds: ["amazon"], maxPrice: 0 }),
    [],
  );
  assert.deepEqual(
    filterProducts(items, { maxPrice: 10 }).map((item) => item.id),
    ["rice"],
  );
});

test("both price sorts leave unknown prices last in their original order", () => {
  const items = [
    product("unknown-first", "x", [offer("amazon", null, null)]),
    product("expensive", "x", [offer("a", 20)]),
    product("unknown-second", "x", [offer("amazon", null, null)]),
    product("cheap", "x", [offer("a", 2)]),
  ];
  const before = structuredClone(items);
  assert.deepEqual(
    filterProducts(items, { sort: "price-asc" }).map((item) => item.id),
    ["cheap", "expensive", "unknown-first", "unknown-second"],
  );
  assert.deepEqual(
    filterProducts(items, { sort: "price-desc" }).map((item) => item.id),
    ["expensive", "cheap", "unknown-first", "unknown-second"],
  );
  assert.deepEqual(items, before);
});

test("an unknown-only store has no zero-priced basket or false stock claim", () => {
  const merchants = [
    stores[0],
    { id: "amazon", name: "Amazon", deliveryFee: null, freeDeliveryFrom: null },
  ];
  const items = [
    product("known", "x", [offer("a", 10), offer("amazon", null, null)]),
    product("unknown", "y", [
      offer("a", 12, false),
      offer("amazon", null, null),
    ]),
  ];
  const summary = basketSummary(items, merchants, { known: 1, unknown: 1 });
  const amazon = summary.byStore[1];
  assert.deepEqual(amazon.unverifiedProductIds, ["known", "unknown"]);
  assert.deepEqual(amazon.missingProductIds, []);
  assert.equal(amazon.subtotal, null);
  assert.equal(amazon.delivery, null);
  assert.equal(amazon.total, null);
  assert.equal(amazon.shippingKnown, false);
  assert.equal(amazon.complete, false);
  assert.equal(summary.bestSingleStore, null);
  assert.equal(summary.split.total, null);
  assert.equal(summary.split.delivery, null);
  assert.equal(summary.split.shippingKnown, false);
  assert.equal(summary.split.totalSavings, 0);

  const unknownOnly = basketSummary(
    [items[1]],
    [merchants[1]],
    { unknown: 1 },
    {
      includeDelivery: false,
    },
  );
  assert.equal(unknownOnly.itemCount, 1);
  assert.equal(unknownOnly.split.total, null);
  assert.equal(unknownOnly.split.delivery, null);
  assert.equal(unknownOnly.byStore[0].subtotal, null);
  assert.equal(unknownOnly.byStore[0].total, null);
  assert.equal(unknownOnly.bestSingleStore, null);
});

test("a store with priced and unknown items preserves only its known subtotal", () => {
  const merchants = [stores[0]];
  const items = [
    product("known", "x", [offer("a", 5)]),
    product("unknown", "y", [offer("a", null, null)]),
  ];
  const summary = basketSummary(items, merchants, { known: 2, unknown: 1 });
  assert.equal(summary.byStore[0].subtotal, 10);
  assert.equal(summary.byStore[0].delivery, null);
  assert.equal(summary.byStore[0].total, null);
  assert.deepEqual(summary.byStore[0].unverifiedProductIds, ["unknown"]);
  assert.deepEqual(summary.byStore[0].missingProductIds, []);
  assert.equal(summary.byStore[0].complete, false);
  assert.equal(summary.bestSingleStore, null);
  assert.equal(summary.split.subtotal, 10);
  assert.equal(summary.split.total, null);
  assert.equal(summary.split.totalSavings, 0);
});

test("unknown shipping cannot become free delivery or win delivered rankings", () => {
  const merchants = [
    {
      id: "known",
      name: "Known shipping",
      deliveryFee: 4,
      freeDeliveryFrom: 100,
    },
    {
      id: "unknown",
      name: "Unknown shipping",
      deliveryFee: null,
      freeDeliveryFrom: null,
    },
  ];
  const items = [product("x", "x", [offer("unknown", 1), offer("known", 10)])];
  const summary = basketSummary(items, merchants, { x: 1 });
  assert.equal(summary.byStore[1].complete, true);
  assert.equal(summary.byStore[1].subtotal, 1);
  assert.equal(summary.byStore[1].shippingKnown, false);
  assert.equal(summary.byStore[1].delivery, null);
  assert.equal(summary.byStore[1].total, null);
  assert.equal(summary.bestSingleStore.store.id, "known");
  assert.equal(summary.bestSingleStore.total, 14);
  assert.equal(summary.split.shippingKnown, false);
  assert.equal(summary.split.delivery, null);
  assert.equal(summary.split.total, null);
  assert.equal(summary.split.byStore[0].shippingKnown, false);
  assert.equal(summary.split.byStore[0].total, null);
  assert.equal(summary.split.totalSavings, 0);

  const withoutShipping = basketSummary(
    items,
    merchants,
    { x: 1 },
    {
      includeDelivery: false,
    },
  );
  assert.equal(withoutShipping.bestSingleStore.store.id, "unknown");
  assert.equal(withoutShipping.split.total, 1);
  assert.equal(withoutShipping.split.delivery, 0);
  assert.equal(withoutShipping.split.shippingKnown, true);
});
