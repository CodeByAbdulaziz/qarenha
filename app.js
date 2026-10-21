import { products, categories, stores } from "./catalog.js?v=20261021b";
import { photoCredits } from "./photo-credits.js?v=20261021b";
import { storeLink } from "./store-links.js?v=20261021b";
import {
  availableOffers,
  unverifiedOffers,
  bestOffer,
  savingFor,
  filterProducts,
  basketSummary,
} from "./pricing.js?v=20261021";

const $ = (selector) => document.querySelector(selector);
const productById = new Map(products.map((product) => [product.id, product]));
const storeById = new Map(stores.map((store) => [store.id, store]));
const storageKey = "qarenha-v1";
const number = new Intl.NumberFormat("en-SA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const state = {
  query: "",
  category: "all",
  storeIds: [],
  maxPrice: null,
  sort: "featured",
  favoritesOnly: false,
  favoriteIds: [],
  basket: {},
  visible: 12,
  includeDelivery: true,
};
let selectedProduct = null;
let toastTimer;

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function money(value) {
  return `<span class="money"><b>${number.format(value)}</b><small>ر.س</small></span>`;
}

function readSavedList() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (Array.isArray(saved.favoriteIds)) {
      state.favoriteIds = [
        ...new Set(saved.favoriteIds.filter((id) => productById.has(id))),
      ];
    }
    if (
      saved.basket &&
      typeof saved.basket === "object" &&
      !Array.isArray(saved.basket)
    ) {
      for (const [id, quantity] of Object.entries(saved.basket)) {
        if (
          productById.has(id) &&
          Number.isInteger(quantity) &&
          quantity >= 1 &&
          quantity <= 99
        ) {
          state.basket[id] = quantity;
        }
      }
    }
  } catch {
    // Browsing and comparisons still work when browser storage is unavailable.
  }
}

function saveList() {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ favoriteIds: state.favoriteIds, basket: state.basket }),
    );
  } catch {
    toast("الحفظ غير متاح في هذا المتصفح. يمكنك مشاركة رابط قائمتك.");
  }
}

function toast(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 3200);
}

function updateCounts() {
  const count = Object.values(state.basket).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  $("#basket-count").textContent = count;
  $("#basket-button").setAttribute("aria-label", `قائمة التسوق، ${count} قطعة`);
  $("#favorites-count").textContent = state.favoriteIds.length;
  $("#favorites-count").hidden = state.favoriteIds.length === 0;
  $("#favorites-button").setAttribute(
    "aria-pressed",
    String(state.favoritesOnly),
  );
}

function renderHero() {
  const product = products[0];
  $("#hero-feature").innerHTML = `
    <img src="${product.image}" alt="${escapeHtml(product.name)}" width="400" height="300" fetchpriority="high">
    <p class="hero-product-title">${escapeHtml(product.name)} <span>${escapeHtml(product.unit)}</span></p>
    ${availableOffers(product)
      .map((offer) => {
        const store = storeById.get(offer.storeId);
        return `<div class="hero-offer"><span><i class="store-dot" style="background:${store.color}"></i>${escapeHtml(store.name)}</span><strong>${number.format(offer.price)} <small>ر.س</small></strong></div>`;
      })
      .join("")}
    <div class="hero-saving"><small>فرق السعر</small><strong>${number.format(savingFor(product))}</strong><small>ريال في نفس العبوة</small></div>`;
}

function renderCategories() {
  const categoryIcons = {
    groceries: "grocery",
    vegetables: "vegetable",
    fruits: "fruit",
    drinks: "drink",
  };
  $("#category-grid").innerHTML = [
    { id: "all", label: "كل المنتجات", icon: "grid" },
    ...categories,
  ]
    .map(
      (category) => `
    <button class="category-card ${state.category === category.id ? "selected" : ""}" data-category="${category.id}" aria-pressed="${state.category === category.id}">
      <span class="category-icon">${icon(categoryIcons[category.icon] || category.icon)}</span>
      <span>${escapeHtml(category.label)}</span>
      <small>${category.id === "all" ? products.length : products.filter((product) => product.category === category.id).length} منتج</small>
    </button>`,
    )
    .join("");
}

function renderStores() {
  $("#store-filters").innerHTML = stores
    .map(
      (store) => `
    <label class="store-checkbox"><input type="checkbox" value="${store.id}" ${state.storeIds.includes(store.id) ? "checked" : ""}><span>${escapeHtml(store.name)}</span></label>`,
    )
    .join("");
}

function productCard(product) {
  const offer = bestOffer(product, state.storeIds);
  const count = availableOffers(product, state.storeIds).length;
  const difference = savingFor(product, state.storeIds);
  const favorite = state.favoriteIds.includes(product.id);
  const unknown = unverifiedOffers(product, state.storeIds);
  const unknownStore = storeById.get(unknown[0]?.storeId);
  return `<article class="product-card ${product.category}">
    <div class="product-image">
      <button data-product="${product.id}" aria-label="قارن أسعار ${escapeHtml(product.name)}"><img src="${product.image}" alt="${escapeHtml(product.name)}" width="400" height="300" loading="lazy"></button>
      <span class="offer-count">${count ? `في ${count} ${count === 1 ? "متجر" : "متاجر"}` : "تحقق من السعر"}</span>
      <button class="icon-button ${favorite ? "is-favorite" : ""}" data-favorite="${product.id}" aria-label="${favorite ? "إزالة" : "حفظ"} ${escapeHtml(product.name)} ${favorite ? "من" : "في"} المفضلة" aria-pressed="${favorite}">${icon("heart")}</button>
    </div>
    <div class="product-body"><h3 class="product-name"><button data-product="${product.id}">${escapeHtml(product.name)}</button></h3><p class="product-unit">${escapeHtml(product.unit)}</p>
      <div class="price-line"><div><span class="price-label">${offer ? "أقل سعر تجريبي" : "السعر والتوفر"}</span>${offer ? money(offer.price) : '<span class="missing-label">غير متحققين</span>'}</div><span class="best-store">${escapeHtml(offer ? storeById.get(offer.storeId).name : unknownStore?.name || "راجع المتجر")}</span></div>
      <p class="price-difference">${!offer ? "افتح المتجر وتحقق من العبوة والسعر والتوفر" : difference > 0 ? `فرق يصل إلى ${number.format(difference)} ر.س بين المتاجر` : count > 1 ? "نفس السعر في بيانات التجربة" : "سعر تجريبي واحد للمقارنة"}</p>
      <div class="card-actions"><button class="compare-button" data-product="${product.id}">قارن الأسعار ${icon("arrow")}</button><button class="add-button" data-add="${product.id}" aria-label="أضف ${escapeHtml(product.name)} إلى قائمة التسوق">${icon("plus")}</button></div>
    </div></article>`;
}

function renderCatalog() {
  const filtered = filterProducts(products, state);
  $("#product-grid").innerHTML = filtered
    .slice(0, state.visible)
    .map(productCard)
    .join("");
  $("#empty-state").hidden = filtered.length > 0;
  $("#load-more").hidden = filtered.length <= state.visible;
  $("#shown-count").textContent = filtered.length
    ? `تستعرض ${Math.min(filtered.length, state.visible)} من ${filtered.length} منتج`
    : "";
  const selectedStores = stores.filter(
    (store) => !state.storeIds.length || state.storeIds.includes(store.id),
  );
  const pricedStores = selectedStores.filter(
    (store) => store.priceMode !== "unverified",
  ).length;
  $("#result-count").textContent = pricedStores
    ? `${filtered.length} منتج · أسعار تجريبية لدى ${pricedStores} متاجر${selectedStores.some((store) => store.priceMode === "unverified") ? " · أمازون للتحقق من السعر" : ""}`
    : `${filtered.length} منتج · سعر أمازون وتوفره غير متحققين`;
  $("#empty-state p").textContent =
    !pricedStores && state.maxPrice !== null
      ? "لا يمكن تطبيق حد السعر على أسعار غير متحقق منها. امسح الحد أو اختر متجرًا له بيانات سعر."
      : "جرّب اسمًا ثانيًا أو وسّع الفلاتر.";
  const chips = [];
  if (state.query) chips.push({ key: "query", label: `بحث: ${state.query}` });
  if (state.category !== "all")
    chips.push({
      key: "category",
      label: categories.find((category) => category.id === state.category)
        .label,
    });
  if (state.favoritesOnly)
    chips.push({ key: "favorites", label: "المحفوظة فقط" });
  $("#active-filters").innerHTML = chips
    .map(
      (chip) =>
        `<button class="filter-chip" data-clear="${chip.key}">${escapeHtml(chip.label)} ${icon("close")}</button>`,
    )
    .join("");
  renderCategories();
  updateCounts();
}

function updateSearch(value, activeInput = null) {
  state.query = value.trim().slice(0, 200);
  state.visible = 12;
  document.querySelectorAll("[data-product-search]").forEach((input) => {
    if (input !== activeInput) input.value = state.query;
  });
}

function resetFilters() {
  Object.assign(state, {
    query: "",
    category: "all",
    storeIds: [],
    maxPrice: null,
    sort: "featured",
    favoritesOnly: false,
    visible: 12,
  });
  updateSearch("");
  $("#max-price").value = "";
  $("#sort-select").value = "featured";
  renderStores();
  renderCatalog();
}

function openProduct(id, updateUrl = true) {
  const product = productById.get(id);
  if (!product) return;
  selectedProduct = id;
  renderProduct();
  if (!$("#product-dialog").open) $("#product-dialog").showModal();
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("product", id);
    history.replaceState(null, "", url);
  }
}

function renderProduct() {
  const product = productById.get(selectedProduct);
  if (!product) return;
  const photo = photoCredits.find((credit) => credit.id === product.id);
  const best = bestOffer(product);
  const statusRank = (offer) =>
    offer.available === true ? 2 : offer.available === false ? 1 : 0;
  const offers = [...product.offers].sort(
    (a, b) => statusRank(b) - statusRank(a) || (a.price ?? 0) - (b.price ?? 0),
  );
  const favorite = state.favoriteIds.includes(product.id);
  $("#product-detail").innerHTML = `
    <div class="dialog-top"><span>أسعار وتوفر تجريبيان · ليست عروضًا فعلية</span><button class="icon-button close-dialog" aria-label="إغلاق مقارنة المنتج">${icon("close")}</button></div>
    <div class="detail-header"><img src="${product.image}" width="400" height="300" alt="${escapeHtml(product.name)}"><div><p class="eyebrow">قارن الأسعار بين المتاجر.</p><h2 id="product-dialog-title">${escapeHtml(product.name)}</h2><p>${escapeHtml(product.unit)} · ${availableOffers(product).length} متاجر بأسعار تجريبية</p><p class="photo-source">صورة توضيحية من <a href="${escapeHtml(photo.sourcePage)}" target="_blank" rel="noopener noreferrer">كارفور ↗</a> · <button data-info="photos">كل المصادر</button></p></div></div>
    <div class="detail-body"><div class="detail-section-head"><h3>الأسعار بين المتاجر</h3><span>لنفس العبوة · قبل التوصيل</span></div>
      ${offers
        .map((offer) => {
          const store = storeById.get(offer.storeId);
          const unverified = offer.available === null;
          const hasPrice =
            offer.available === true && Number.isFinite(offer.price);
          const lowest = hasPrice && offer.price === best?.price;
          const link = storeLink(product, store.id);
          const linkHint =
            link.kind === "web-search"
              ? `بحث جوجل داخل موقع ${store.name}`
              : link.kind === "search"
                ? `نتائج البحث عن ${product.name}`
                : "تحقق من العبوة والسعر في المتجر";
          return `<div class="offer-row ${lowest ? "best" : ""} ${offer.available === false ? "unavailable" : ""} ${unverified ? "unverified" : ""}"><span class="store-badge" style="--store-color:${store.color}">${escapeHtml(store.initial || store.name[0])}</span><div class="offer-store"><strong>${escapeHtml(store.name)}</strong>${lowest ? '<span class="best-label">الأقل سعرًا</span>' : ""}<small>${unverified ? "السعر والتوفر غير متحققين" : hasPrice ? "متوفر في بيانات التجربة" : "غير متوفر في بيانات التجربة"}</small></div><div class="offer-price">${hasPrice ? money(offer.price) : `<span class="missing-label">${unverified ? "راجع المتجر" : "غير متوفر"}</span>`}${hasPrice && product.quantity > 0 ? `<small>${number.format(offer.price / product.quantity)} ر.س / ${escapeHtml(product.unitType)}</small>` : ""}</div><div class="offer-link"><a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${link.label}: ${product.name} لدى ${store.name}، يفتح في تبويب جديد`)}">${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a><small>${escapeHtml(linkHint)}</small></div></div>`;
        })
        .join("")}
      <p class="offer-note">أسعار بنده وكارفور والتميمي بيانات تجريبية. لم نتحقق من سعر أمازون أو توفر المنتج لديه، لذلك لا يدخل في ترتيب الأرخص. تحقق من العلامة والعبوة وعدد القطع والبائع والتوصيل داخل المتجر؛ نتائج البحث قد تعرض عبوات متعددة أو منتجات مختلفة.</p>
      <div class="product-help"><a href="./legal.html#prices">لماذا قد يختلف السعر؟</a><a href="./legal.html?product=${encodeURIComponent(product.id)}#corrections">بلّغ عن خطأ في المنتج</a></div>
    </div>
    <div class="dialog-bottom"><button class="button button-primary" data-add="${product.id}">${icon("plus")} أضف إلى قائمتي</button><button class="icon-button ${favorite ? "is-favorite" : ""}" data-favorite="${product.id}" aria-label="حفظ المنتج في المفضلة" aria-pressed="${favorite}">${icon("heart")}</button><button class="icon-button" data-share-product="${product.id}" aria-label="نسخ رابط مقارنة هذا المنتج">${icon("share")}</button></div>`;
}

function addToBasket(id) {
  if (!productById.has(id)) return;
  if ((state.basket[id] || 0) >= 99)
    return toast("وصلت للحد الأقصى: 99 عبوة من المنتج.");
  state.basket[id] = (state.basket[id] || 0) + 1;
  toast(`أضفنا ${productById.get(id).name} إلى قائمتك`);
  saveList();
  updateCounts();
  if ($("#basket-dialog").open) renderBasket();
}

function toggleFavorite(id) {
  if (!productById.has(id)) return;
  state.favoriteIds = state.favoriteIds.includes(id)
    ? state.favoriteIds.filter((value) => value !== id)
    : [...state.favoriteIds, id];
  saveList();
  renderCatalog();
  if ($("#product-dialog").open) renderProduct();
  const scope = $("#product-dialog").open
    ? "#product-dialog "
    : "#product-grid ";
  const replacement =
    $(`${scope}[data-favorite="${id}"]`) || $("#favorites-button");
  replacement.focus({ preventScroll: true });
}

function openBasket() {
  if ($("#product-dialog").open) $("#product-dialog").close();
  renderBasket();
  if (!$("#basket-dialog").open) $("#basket-dialog").showModal();
}

function storeTotalRow(entry, index) {
  const ranked = entry.complete && entry.total !== null;
  const unverified = entry.unverifiedProductIds.length > 0;
  const description = unverified
    ? `لم نتحقق من سعر وتوفر ${entry.unverifiedProductIds.length} منتج · خارج ترتيب الإجمالي`
    : !entry.shippingKnown
      ? "رسوم التوصيل غير متحققة · لم يحسب الإجمالي مع التوصيل"
      : ranked
        ? `المنتجات ${number.format(entry.subtotal)} ر.س${state.includeDelivery ? ` + التوصيل ${number.format(entry.delivery)} ر.س` : ""}`
        : `ينقص ${entry.missingProductIds.length} منتج في بيانات التجربة · خارج ترتيب الإجمالي`;
  return `<div class="store-total ${index === 0 && ranked ? "best" : ""}"><span class="store-badge" style="--store-color:${entry.store.color}">${escapeHtml(entry.store.initial || entry.store.name[0])}</span><div class="store-total-copy"><strong>${escapeHtml(entry.store.name)}</strong>${index === 0 && ranked ? '<span class="best-label">الأقل لمتجر واحد</span>' : ""}<small>${description}</small></div>${ranked ? money(entry.total) : `<span class="missing-label">${unverified ? "أسعار غير متحققة" : !entry.shippingKnown ? "التوصيل غير متحقق" : "قائمة غير مكتملة"}</span>`}</div>`;
}

function renderBasket() {
  const summary = basketSummary(products, stores, state.basket, {
    includeDelivery: state.includeDelivery,
  });
  if (!summary.items.length) {
    $("#basket-content").innerHTML =
      `<div class="basket-empty">${icon("bag")}<h3>قائمتك تنتظر أول منتج</h3><p>أضف احتياجاتك، وقارن إجماليها بين المتاجر.</p><button class="button button-primary" data-action="browse">تصفّح المنتجات ${icon("arrow")}</button></div>`;
    return;
  }
  const complete = summary.byStore
    .filter((entry) => entry.complete && entry.total !== null)
    .sort((a, b) => a.total - b.total);
  const incomplete = summary.byStore.filter(
    (entry) => !entry.complete || entry.total === null,
  );
  const splitComplete = summary.items.every((item) => item.bestOffer);
  $("#basket-content").innerHTML = `
    <div class="basket-items">${summary.items.map((item) => `<article class="basket-item"><img src="${item.product.image}" width="400" height="300" alt="${escapeHtml(item.product.name)}"><div class="basket-item-info"><h3>${escapeHtml(item.product.name)}</h3><p>${escapeHtml(item.product.unit)} · ${item.bestOffer ? `أقل سعر للعبوة ${number.format(item.bestOffer.price)} ر.س` : unverifiedOffers(item.product).length ? "السعر والتوفر غير متحققين" : "غير متوفر في بيانات التجربة"}</p><div class="quantity-control"><button data-quantity="${item.product.id}" data-change="-1" aria-label="تقليل كمية ${escapeHtml(item.product.name)}">−</button><output aria-label="عدد العبوات">${item.quantity}</output><button data-quantity="${item.product.id}" data-change="1" aria-label="زيادة كمية ${escapeHtml(item.product.name)}" ${item.quantity >= 99 ? "disabled" : ""}>+</button></div></div><div>${item.bestOffer ? money(Math.round(item.bestOffer.price * item.quantity * 100) / 100) : "لم يحسب"}</div><button class="icon-button" data-remove="${item.product.id}" aria-label="إزالة ${escapeHtml(item.product.name)} من القائمة">${icon("trash")}</button></article>`).join("")}</div>
    <div class="basket-tools"><span>${summary.items.length} منتجات · ${summary.itemCount} عبوة</span><button data-action="clear-basket">تفريغ القائمة</button></div>
    <label class="delivery-toggle"><span>إضافة رسوم التوصيل<small>رسوم وحد توصيل مجاني تجريبيان، وليسا رسوم المتاجر الفعلية</small></span><input id="include-delivery" type="checkbox" ${state.includeDelivery ? "checked" : ""}></label>
    <div class="basket-results"><h3>قائمتك كاملة من متجر واحد</h3><p>نفس المنتجات والكميات. ${state.includeDelivery ? "تشمل التوصيل الافتراضي." : "بدون تكلفة التوصيل."}</p>
      ${[...complete, ...incomplete].map(storeTotalRow).join("")}
      <details class="split-total"><summary><span>${splitComplete ? "أقل سعر لكل منتج، من عدة متاجر" : "لا تتوفر بيانات سعر كاملة للقائمة"}</span>${summary.split.total !== null ? money(summary.split.total) : '<span class="missing-label">الإجمالي غير محسوب</span>'}</summary><div class="split-breakdown"><p>هذا الخيار يجمع أقل سعر لكل منتج قبل رسوم التوصيل. قد يكون متجر واحد أوفر بعد إضافة الرسوم.${splitComplete ? "" : " لم تحسب قائمة كاملة؛ قد توجد أسعار أو حالة توفر غير متحققة."}</p>${summary.split.byStore.map((entry) => `<div><span>${escapeHtml(storeById.get(entry.storeId).name)}<br><small>منتجات ${number.format(entry.subtotal)} ر.س · ${entry.delivery === null ? "التوصيل غير متحقق" : `توصيل ${number.format(entry.delivery)} ر.س`}</small></span><strong>${entry.total === null ? "الإجمالي غير محسوب" : `${number.format(entry.total)} ر.س`}</strong></div>`).join("")}<div><span>إجمالي التوصيل</span><strong>${summary.split.delivery === null ? "غير متحقق" : `${number.format(summary.split.delivery)} ر.س`}</strong></div></div></details>
    </div>
    <p class="basket-data-note">أسعار ورسوم افتراضية للتجربة. لا توجد خدمة طلب أو دفع.</p>
    <div class="basket-bottom"><button class="button button-primary" data-action="share-list">${icon("share")} مشاركة القائمة</button><button class="button button-outline" data-action="print">طباعة القائمة</button></div>`;
}

const infoPages = {
  photos: `<p class="eyebrow">مصدر واحد للصور</p><h2 id="info-title">صور المنتجات من كارفور</h2><p>جميع صور المنتجات حقيقية ومن صفحات منتجات <a href="https://www.carrefourksa.com/" target="_blank" rel="noopener noreferrer">كارفور السعودية</a>. الصور للتوضيح؛ قد تختلف العلامة التجارية أو العبوة في المتاجر الأخرى. الأسعار المعروضة تجريبية وليست مأخوذة من صفحات الصور.</p><p>حقوق الصور لأصحابها. لكل صورة رابط لصفحة المنتج الأصلية أدناه.</p><ol class="photo-credits">${photoCredits.map((credit) => `<li><strong>${escapeHtml(productById.get(credit.id)?.name || credit.id)}</strong><span dir="auto">${escapeHtml(credit.title)}</span><a href="${escapeHtml(credit.sourcePage)}" target="_blank" rel="noopener noreferrer">صفحة المنتج والصورة في كارفور ↗</a></li>`).join("")}</ol>`,
  about: `<p class="eyebrow">قرار الشراء يبدأ بمعلومة</p><h2 id="info-title">عن قارنها</h2><p>قارنها تجربة عربية لمقارنة أسعار توضيحية بين المتاجر. تجمع الغذائيات والخضروات والفواكه والإلكترونيات والعناية الشخصية واحتياجات الطفل والمنزل في واجهة واحدة.</p><p>يمكنك ترتيب قائمة مشتريات، تغيير الكميات، ومقارنة التكلفة في متجر واحد أو جمع أقل سعر لكل منتج من عدة متاجر.</p><p>الموقع لا يستقبل مدفوعات أو طلبات، ولا توجد عمولات أو روابط تابعة في هذه النسخة.</p><p><a href="./legal.html#terms">شروط الاستخدام والسياسات</a></p>`,
  data: `<p class="eyebrow">وضوح من البداية</p><h2 id="info-title">عن الأسعار والمتاجر</h2><p><strong>أسماء المتاجر حقيقية. الأسعار والتوفر والتوصيل بيانات تجريبية وليست عروضًا رسمية أو أسعارًا محدثة من المتاجر.</strong></p><ul><li>حساب المقارنة يستخدم المنتج والعبوة في بيانات التجربة؛ الصور قد تخص علامة أو عبوة مختلفة.</li><li>المنتج غير المتوفر في بيانات التجربة يستبعد من أقل سعر.</li><li>فرق السعر في البطاقة لا يشمل التوصيل، ورسوم التوصيل في القائمة افتراضية.</li></ul><p>الأسعار الفعلية قد تختلف حسب الوقت والمدينة والفرع والعبوة والعضوية والكوبونات والضرائب ورسوم التوصيل. صفحة المتجر وإجمالي سلته هما المرجع قبل الشراء.</p><p>الروابط تفتح صفحة المنتج أو نتائج البحث في المتجر، ولا تؤكد السعر أو التوفر. رابط أمازون يفتح صفحة المنتج أو نتائج البحث بالمنتج والعبوة؛ السعر والتوفر والتوصيل غير متحقق منها ولا تدخل في ترتيب الأرخص.</p><p><a href="./legal.html#prices">تنبيه الأسعار وحدود المقارنة</a> · <a href="./legal.html#corrections">الإبلاغ عن معلومة خاطئة</a></p>`,
};

function openInfo(type) {
  $("#info-content").innerHTML = infoPages[type] || infoPages.about;
  $("#info-dialog").showModal();
}

async function copyLink(url) {
  try {
    if (!navigator.clipboard?.writeText)
      throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(url);
    toast("تم نسخ الرابط. تقدر تشاركه الآن.");
  } catch {
    $("#info-content").innerHTML =
      `<h2 id="info-title">رابط المشاركة</h2><p>انسخ هذا الرابط لفتح المقارنة على جهاز آخر.</p><label class="copy-field">الرابط<textarea id="share-url" readonly dir="ltr">${escapeHtml(url)}</textarea></label>`;
    if (!$("#info-dialog").open) $("#info-dialog").showModal();
    $("#share-url").select();
  }
}

function shareProduct(id) {
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("product", id);
  copyLink(url.href);
}

function shareList() {
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("list", JSON.stringify(Object.entries(state.basket)));
  copyLink(url.href);
}

function restoreSharedLink() {
  const params = new URLSearchParams(location.search);
  if (params.has("list")) {
    try {
      if (params.get("list").length > 8000) throw new Error("Too large");
      const entries = JSON.parse(params.get("list"));
      if (!Array.isArray(entries)) throw new Error("Invalid list");
      let imported = false;
      for (const entry of entries.slice(0, products.length)) {
        if (!Array.isArray(entry) || entry.length !== 2) continue;
        const [id, quantity] = entry;
        if (
          productById.has(id) &&
          Number.isInteger(quantity) &&
          quantity >= 1 &&
          quantity <= 99
        ) {
          state.basket[id] = Math.max(state.basket[id] || 0, quantity);
          imported = true;
        }
      }
      if (imported) {
        saveList();
        updateCounts();
        openBasket();
        toast("أضفنا القائمة المشتركة إلى قائمتك الحالية.");
      } else toast("رابط القائمة لا يحتوي على منتجات متاحة.");
    } catch {
      toast("تعذر فتح القائمة المشتركة. رابط القائمة غير صالح.");
    }
  } else if (productById.has(params.get("product")))
    openProduct(params.get("product"), false);
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.classList.contains("close-dialog"))
    return button.closest("dialog").close();
  if (button.dataset.product) return openProduct(button.dataset.product);
  if (button.dataset.add) return addToBasket(button.dataset.add);
  if (button.dataset.favorite) return toggleFavorite(button.dataset.favorite);
  if (button.dataset.shareProduct)
    return shareProduct(button.dataset.shareProduct);
  if (button.dataset.info) return openInfo(button.dataset.info);
  if (button.dataset.category) {
    state.category = button.dataset.category;
    state.visible = 12;
    renderCatalog();
    $(`[data-category="${state.category}"]`)?.focus({ preventScroll: true });
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  }
  if (button.dataset.search) {
    updateSearch(button.dataset.search);
    state.category = "all";
    renderCatalog();
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  }
  if (button.dataset.clear) {
    if (button.dataset.clear === "query") {
      updateSearch("");
    }
    if (button.dataset.clear === "category") state.category = "all";
    if (button.dataset.clear === "favorites") state.favoritesOnly = false;
    renderCatalog();
  }
  if (button.dataset.quantity) {
    const id = button.dataset.quantity;
    const change = Number(button.dataset.change);
    const quantity = (state.basket[id] || 0) + change;
    if (quantity <= 0) delete state.basket[id];
    else state.basket[id] = Math.min(99, quantity);
    saveList();
    updateCounts();
    renderBasket();
    $(`[data-quantity="${id}"][data-change="${change}"]`)?.focus({
      preventScroll: true,
    });
  }
  if (button.dataset.remove) {
    delete state.basket[button.dataset.remove];
    saveList();
    updateCounts();
    renderBasket();
  }
  if (button.dataset.action === "reset") resetFilters();
  if (button.dataset.action === "browse") {
    $("#basket-dialog").close();
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  }
  if (button.dataset.action === "clear-basket") {
    state.basket = {};
    saveList();
    updateCounts();
    renderBasket();
  }
  if (button.dataset.action === "share-list") shareList();
  if (button.dataset.action === "print") window.print();
});

document.querySelectorAll("[data-search-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateSearch(form.querySelector("[data-product-search]").value);
    renderCatalog();
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  });
});
document.querySelectorAll("[data-product-search]").forEach((input) => {
  input.addEventListener("input", () => {
    updateSearch(input.value, input);
    renderCatalog();
  });
});
$("#sort-select").addEventListener("change", (event) => {
  state.sort = event.target.value;
  state.visible = 12;
  renderCatalog();
});
$("#max-price").addEventListener("input", (event) => {
  const value = event.target.value === "" ? null : Number(event.target.value);
  state.maxPrice = Number.isFinite(value) && value >= 0 ? value : null;
  state.visible = 12;
  renderCatalog();
});
$("#store-filters").addEventListener("change", () => {
  state.storeIds = [
    ...$("#store-filters").querySelectorAll("input:checked"),
  ].map((input) => input.value);
  state.visible = 12;
  renderCatalog();
});
$("#favorites-button").addEventListener("click", () => {
  state.favoritesOnly = !state.favoritesOnly;
  state.visible = 12;
  renderCatalog();
  $("#catalog").scrollIntoView({ behavior: "smooth" });
});
$("#reset-filters").addEventListener("click", resetFilters);
$("#load-more").addEventListener("click", () => {
  state.visible += 12;
  renderCatalog();
});
$("#basket-button").addEventListener("click", openBasket);
$("#banner-basket").addEventListener("click", openBasket);
$("#basket-dialog").addEventListener("change", (event) => {
  if (event.target.id === "include-delivery") {
    state.includeDelivery = event.target.checked;
    renderBasket();
    $("#include-delivery").focus({ preventScroll: true });
  }
});
$("#product-dialog").addEventListener("close", () => {
  selectedProduct = null;
  const url = new URL(location.href);
  url.searchParams.delete("product");
  history.replaceState(null, "", url);
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      dialog.close();
  });
});

readSavedList();
renderHero();
renderStores();
renderCatalog();
restoreSharedLink();
