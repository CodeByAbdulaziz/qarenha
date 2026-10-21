import { products } from "./catalog.js?v=20261021";

const storageKey = "qarenha-v1";
const clearButton = document.querySelector("#clear-local-data");
const clearDialog = document.querySelector("#clear-data-dialog");
const storageStatus = document.querySelector("#storage-status");

clearButton?.addEventListener("click", () => {
  clearDialog.returnValue = "cancel";
  clearDialog.showModal();
});
if (clearButton) clearButton.disabled = false;
clearDialog?.querySelector("form").addEventListener("submit", (event) => {
  if (event.submitter?.value !== "confirm") return;
  try {
    localStorage.removeItem(storageKey);
    storageStatus.textContent =
      "حذفت القائمة والمفضلة المحفوظة هنا. أعد تحميل أي تبويب آخر مفتوح لقارنها لتحديثه.";
  } catch {
    storageStatus.textContent =
      "لم يسمح المتصفح بحذف التخزين. يمكنك مسح بيانات الموقع من إعدادات المتصفح.";
  }
});

const requestedProduct = new URLSearchParams(location.search).get("product");
const productId = products.some((product) => product.id === requestedProduct)
  ? requestedProduct
  : null;
const productUrl = new URL("./", location.href);
if (productId) productUrl.searchParams.set("product", productId);
const productContext = productId
  ? [`معرّف المنتج: ${productId}`, `صفحة المنتج: ${productUrl.href}`, ""]
  : [];
const reportBody = [
  ...productContext,
  "نوع المشكلة: رابط / صورة / عبوة / حساب / توضيح بيانات تجريبية / أخرى",
  "اسم المنتج والمتجر:",
  "ما الذي ظهر؟",
  "ما التصحيح المتوقع؟",
  "رابط عام يساعد على التحقق (اختياري):",
];

const emailParams = new URLSearchParams();
emailParams.set(
  "subject",
  `بلاغ عن مشكلة في قارنها${productId ? `: ${productId}` : ""}`,
);
emailParams.set(
  "body",
  [
    "لا ترسل كلمة مرور أو بيانات دفع أو مستند هوية، واحذف أي معلومات خاصة لا يحتاجها البلاغ.",
    "",
    ...reportBody,
  ].join("\n"),
);
document.querySelectorAll("[data-report-email]").forEach((link) => {
  link.href = `mailto:Abdulazizdk01@gmail.com?${emailParams.toString().replace(/\+/g, "%20")}`;
});

const reportUrl = new URL(
  "https://github.com/CodeByAbdulaziz/qarenha/issues/new",
);
reportUrl.searchParams.set("title", "بلاغ عن مشكلة في قارنها");
reportUrl.searchParams.set(
  "body",
  [
    "تنبيه: هذا البلاغ عام. لا تكتب بيانات شخصية أو بيانات دفع أو عنوانًا، ولا ترفق مستندات خاصة.",
    "",
    ...reportBody,
  ].join("\n"),
);
document.querySelectorAll("[data-report-link]").forEach((link) => {
  link.href = reportUrl.href;
});

const sectionLinks = [...document.querySelectorAll('.contents a[href^="#"]')];
function updateCurrentSection() {
  const currentHash = location.hash || "#privacy";
  sectionLinks.forEach((link) => {
    if (link.hash === currentHash)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("hashchange", updateCurrentSection);
updateCurrentSection();
