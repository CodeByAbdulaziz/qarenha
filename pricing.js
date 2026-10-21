const toCents = (value) => Math.round((value + Number.EPSILON) * 100);
const money = (cents) => (cents === null ? null : cents / 100);
const isPrice = (value) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

export function availableOffers(product, storeIds = []) {
  const selected = new Set(storeIds);
  return (product.offers ?? [])
    .filter(
      (offer) =>
        offer.available === true &&
        isPrice(offer.price) &&
        (selected.size === 0 || selected.has(offer.storeId)),
    )
    .sort(
      (a, b) =>
        a.price - b.price || String(a.storeId).localeCompare(String(b.storeId)),
    );
}

export function unverifiedOffers(product, storeIds = []) {
  const selected = new Set(storeIds);
  return (product.offers ?? []).filter(
    (offer) =>
      offer.available === null &&
      (selected.size === 0 || selected.has(offer.storeId)),
  );
}

export function bestOffer(product, storeIds = []) {
  return availableOffers(product, storeIds)[0] ?? null;
}

export function savingFor(product, storeIds = []) {
  const offers = availableOffers(product, storeIds);
  if (offers.length < 2) return 0;
  return money(
    Math.max(0, toCents(offers.at(-1).price) - toCents(offers[0].price)),
  );
}

export function normalizeSearch(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
}

export function filterProducts(
  products,
  {
    query = "",
    category = "all",
    storeIds = [],
    maxPrice = null,
    favoritesOnly = false,
    favoriteIds = [],
    sort = "featured",
  } = {},
) {
  const terms = normalizeSearch(query).split(" ").filter(Boolean);
  const favorites = new Set(favoriteIds);
  const result = products.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    if (favoritesOnly && !favorites.has(product.id)) return false;
    const offer = bestOffer(product, storeIds);
    if (!offer && !unverifiedOffers(product, storeIds).length) return false;
    if (isPrice(maxPrice) && (!offer || offer.price > maxPrice)) return false;
    const searchable = normalizeSearch(
      [product.name, product.unit, ...(product.tags ?? [])].join(" "),
    );
    return terms.every((term) => searchable.includes(term));
  });

  if (sort === "price-asc" || sort === "price-desc") {
    result.sort((a, b) => {
      const first = bestOffer(a, storeIds);
      const second = bestOffer(b, storeIds);
      if (!first) return second ? 1 : 0;
      if (!second) return -1;
      return sort === "price-asc"
        ? first.price - second.price
        : second.price - first.price;
    });
  }
  if (sort === "savings")
    result.sort((a, b) => savingFor(b, storeIds) - savingFor(a, storeIds));
  return result;
}

function deliveryCents(store, subtotal, includeDelivery, hasItems) {
  if (!includeDelivery || !hasItems) return 0;
  if (
    isPrice(store.freeDeliveryFrom) &&
    subtotal >= toCents(store.freeDeliveryFrom)
  )
    return 0;
  return isPrice(store.deliveryFee) ? toCents(store.deliveryFee) : null;
}

export function basketSummary(
  products,
  stores,
  basket,
  { includeDelivery = true } = {},
) {
  const productById = new Map(products.map((product) => [product.id, product]));
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const items = Object.entries(basket ?? {}).flatMap(
    ([productId, quantity]) => {
      const product = productById.get(productId);
      if (
        !product ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 99
      )
        return [];
      const offers = availableOffers(product).filter((offer) =>
        storeById.has(offer.storeId),
      );
      return [{ product, quantity, bestOffer: offers[0] ?? null }];
    },
  );

  const splitSubtotals = new Map();
  for (const item of items) {
    if (!item.bestOffer) continue;
    const { storeId, price } = item.bestOffer;
    splitSubtotals.set(
      storeId,
      (splitSubtotals.get(storeId) ?? 0) + toCents(price) * item.quantity,
    );
  }
  const splitByStore = [...splitSubtotals].map(([storeId, subtotal]) => {
    const delivery = deliveryCents(
      storeById.get(storeId),
      subtotal,
      includeDelivery,
      true,
    );
    return {
      storeId,
      subtotal: money(subtotal),
      delivery: money(delivery),
      total: delivery === null ? null : money(subtotal + delivery),
      shippingKnown: delivery !== null,
    };
  });
  const splitSubtotal = [...splitSubtotals.values()].reduce(
    (sum, value) => sum + value,
    0,
  );
  const splitHasUnverifiedPrices = items.some(
    (item) =>
      !item.bestOffer &&
      unverifiedOffers(item.product).some((offer) =>
        storeById.has(offer.storeId),
      ),
  );
  const splitShippingKnown =
    !splitHasUnverifiedPrices &&
    splitByStore.every((entry) => entry.shippingKnown);
  const splitDelivery = splitShippingKnown
    ? splitByStore.reduce((sum, entry) => sum + toCents(entry.delivery), 0)
    : null;
  const splitTotal =
    splitDelivery === null ? null : splitSubtotal + splitDelivery;

  const byStore = stores.map((store) => {
    let subtotal = 0;
    let found = 0;
    const missingProductIds = [];
    const unverifiedProductIds = [];
    for (const item of items) {
      const offer = bestOffer(item.product, [store.id]);
      if (!offer) {
        if (unverifiedOffers(item.product, [store.id]).length)
          unverifiedProductIds.push(item.product.id);
        else missingProductIds.push(item.product.id);
        continue;
      }
      found += 1;
      subtotal += toCents(offer.price) * item.quantity;
    }
    const hasUnverifiedPrices = unverifiedProductIds.length > 0;
    const delivery = hasUnverifiedPrices
      ? null
      : deliveryCents(store, subtotal, includeDelivery, found > 0);
    return {
      store,
      subtotal: !found && hasUnverifiedPrices ? null : money(subtotal),
      delivery: money(delivery),
      total: delivery === null ? null : money(subtotal + delivery),
      missingProductIds,
      unverifiedProductIds,
      shippingKnown: delivery !== null,
      complete: missingProductIds.length === 0 && !hasUnverifiedPrices,
    };
  });
  const completeStores = items.length
    ? byStore
        .filter((entry) => entry.complete && entry.total !== null)
        .sort(
          (a, b) => a.total - b.total || a.store.id.localeCompare(b.store.id),
        )
    : [];
  const highestCompleteTotal = completeStores.length
    ? toCents(completeStores.at(-1).total)
    : splitTotal;
  const splitComplete = items.every((item) => item.bestOffer !== null);

  return {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    split: {
      subtotal: money(splitSubtotal),
      total: money(splitTotal),
      delivery: money(splitDelivery),
      shippingKnown: splitShippingKnown,
      totalSavings:
        splitComplete && splitTotal !== null
          ? money(Math.max(0, highestCompleteTotal - splitTotal))
          : 0,
      byStore: splitByStore,
    },
    byStore,
    bestSingleStore: completeStores[0] ?? null,
  };
}
