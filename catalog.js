// Prices and stock stay unknown until a matching current source is verified.
import { extraCategories, extraProducts } from "./extra-products.js?v=20261022";
import { moreProducts } from "./more-products.js?v=20261022";
import { foodProducts } from "./food-products.js?v=20261022";
import { homeProducts } from "./home-products.js?v=20261022";
import { electronicsProducts } from "./electronics-products.js?v=20261022";

export const DATA_MODE = "verified-only";

export const categories = [
  {
    id: "groceries",
    label: "مواد غذائية",
    icon: "groceries",
  },
  {
    id: "vegetables",
    label: "خضروات",
    icon: "vegetables",
  },
  {
    id: "fruits",
    label: "فواكه",
    icon: "fruits",
  },
  {
    id: "electronics",
    label: "إلكترونيات",
    icon: "electronics",
  },
  {
    id: "drinks",
    label: "مشروبات",
    icon: "drinks",
  },
  {
    id: "home",
    label: "احتياجات المنزل",
    icon: "home",
  },
  ...extraCategories,
];

export const stores = [
  {
    id: "panda",
    name: "بنده",
    initial: "ب",
    color: "#BE6D33",
    deliveryFee: null,
    freeDeliveryFrom: null,
    priceMode: "unverified",
  },
  {
    id: "carrefour",
    name: "كارفور",
    initial: "ك",
    color: "#5867B2",
    deliveryFee: null,
    freeDeliveryFrom: null,
    priceMode: "unverified",
  },
  {
    id: "tamimi",
    name: "التميمي",
    initial: "ت",
    color: "#967141",
    deliveryFee: null,
    freeDeliveryFrom: null,
    priceMode: "unverified",
  },
  {
    id: "amazon",
    name: "أمازون السعودية",
    initial: "أ",
    color: "#B56B00",
    deliveryFee: null,
    freeDeliveryFrom: null,
    priceMode: "unverified",
  },
  {
    id: "jarir",
    name: "جرير",
    initial: "ج",
    color: "#B92D38",
    deliveryFee: null,
    freeDeliveryFrom: null,
    priceMode: "unverified",
  },
  {
    id: "extra",
    name: "إكسترا",
    initial: "إ",
    color: "#1769AA",
    deliveryFee: null,
    freeDeliveryFrom: null,
    priceMode: "unverified",
  },
];

export const products = [
  {
    id: "apple",
    name: "تفاح أحمر",
    category: "fruits",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/apple.avif",
    tags: ["تفاح", "فاكهة", "apple", "red apple"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "banana",
    name: "موز",
    category: "fruits",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/banana.avif",
    tags: ["موز", "فاكهة", "banana"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "orange",
    name: "برتقال",
    category: "fruits",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/orange.avif",
    tags: ["برتقال", "فاكهة", "orange"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "avocado",
    name: "أفوكادو",
    category: "fruits",
    unit: "عبوة · الوزن غير مذكور",
    quantity: null,
    unitType: "عبوة",
    image: "./assets/products/avocado.avif",
    tags: ["افوكادو", "أفوكادو", "فاكهة", "avocado"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "strawberry",
    name: "فراولة",
    category: "fruits",
    unit: "250 جم",
    quantity: 0.25,
    unitType: "كجم",
    image: "./assets/products/strawberry.jpg",
    tags: ["فراولة", "فراوله", "فاكهة", "strawberry", "berries"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "lemon",
    name: "ليمون",
    category: "fruits",
    unit: "500 جم",
    quantity: 0.5,
    unitType: "كجم",
    image: "./assets/products/lemon.avif",
    tags: ["ليمون", "فاكهة", "lemon", "citrus"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "tomato",
    name: "طماطم",
    category: "vegetables",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/tomato.avif",
    tags: ["طماطم", "خضار", "tomato"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "cucumber",
    name: "خيار",
    category: "vegetables",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/cucumber.avif",
    tags: ["خيار", "خضار", "cucumber"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "potato",
    name: "بطاطس",
    category: "vegetables",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/potato.avif",
    tags: ["بطاطس", "بطاطا", "خضار", "potato"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "carrot",
    name: "جزر",
    category: "vegetables",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/carrot.avif",
    tags: ["جزر", "خضار", "carrot"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "pepper",
    name: "فلفل ألوان",
    category: "vegetables",
    unit: "صينية · الوزن غير مذكور",
    quantity: null,
    unitType: "عبوة",
    image: "./assets/products/pepper.avif",
    tags: ["فلفل", "فلفل رومي", "خضار", "pepper", "capsicum"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "rice",
    name: "أرز بسمتي",
    category: "groceries",
    unit: "5 كجم",
    quantity: 5,
    unitType: "كجم",
    image: "./assets/products/rice.avif",
    tags: ["ارز", "أرز", "رز", "بسمتي", "rice"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "oats",
    name: "شوفان كامل",
    category: "groceries",
    unit: "500 جم",
    quantity: 0.5,
    unitType: "كجم",
    image: "./assets/products/oats.jpg",
    tags: ["شوفان", "حبوب", "oats", "breakfast"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "eggs",
    name: "بيض طازج",
    category: "dairy",
    unit: "30 حبة",
    quantity: 30,
    unitType: "قطعة",
    image: "./assets/products/eggs.avif",
    tags: ["بيض", "eggs", "breakfast"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "milk",
    name: "حليب كامل الدسم",
    category: "dairy",
    unit: "1 لتر",
    quantity: 1,
    unitType: "لتر",
    image: "./assets/products/milk.avif",
    tags: ["حليب", "لبن", "ألبان", "milk", "dairy"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "bread",
    name: "خبز قمح كامل أسمر",
    category: "bakery",
    unit: "600 جم",
    quantity: 0.6,
    unitType: "كجم",
    image: "./assets/products/bread.avif",
    tags: ["خبز", "توست", "أسمر", "اسمر", "bread", "toast"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "olive-oil",
    name: "زيت زيتون بكر",
    category: "groceries",
    unit: "500 مل",
    quantity: 0.5,
    unitType: "لتر",
    image: "./assets/products/olive-oil.avif",
    tags: ["زيت", "زيتون", "بكر", "olive", "oil"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "pasta",
    name: "مكرونة أقلام",
    category: "groceries",
    unit: "500 جم",
    quantity: 0.5,
    unitType: "كجم",
    image: "./assets/products/pasta.avif",
    tags: ["مكرونة", "معكرونة", "مكرونه", "pasta", "penne"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "water",
    name: "مياه شرب",
    category: "drinks",
    unit: "12 × 330 مل",
    quantity: 3.96,
    unitType: "لتر",
    image: "./assets/products/water.avif",
    tags: ["مياه", "ماء", "water"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "coffee",
    name: "قهوة مطحونة",
    category: "drinks",
    unit: "250 جم",
    quantity: 0.25,
    unitType: "كجم",
    image: "./assets/products/coffee.avif",
    tags: ["قهوة", "قهوه", "بن", "coffee", "arabic coffee"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "tea",
    name: "شاي أسود",
    category: "drinks",
    unit: "100 كيس",
    quantity: 100,
    unitType: "قطعة",
    image: "./assets/products/tea.avif",
    tags: ["شاي", "tea", "black tea"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "headphones",
    name: "سماعة لاسلكية",
    category: "electronics",
    unit: "قطعة واحدة",
    quantity: 1,
    unitType: "قطعة",
    image: "./assets/products/headphones.avif",
    tags: ["سماعة", "سماعات", "بلوتوث", "headphones", "bluetooth"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "laptop",
    name: "لابتوب",
    category: "electronics",
    unit: "قطعة واحدة",
    quantity: 1,
    unitType: "قطعة",
    image: "./assets/products/laptop.avif",
    tags: ["لابتوب", "حاسب", "كمبيوتر", "laptop", "computer"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "phone",
    name: "سامسونج جالكسي A16 (4G)",
    category: "electronics",
    unit: "4GB RAM · 128GB · أسود · SM-A165FZKDMEA",
    quantity: 1,
    unitType: "قطعة",
    image: "./assets/products/phone.avif",
    tags: ["هاتف", "جوال", "موبايل", "phone", "smartphone"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "powerbank",
    name: "شاحن متنقل",
    category: "electronics",
    unit: "قطعة واحدة",
    quantity: 1,
    unitType: "قطعة",
    image: "./assets/products/powerbank.avif",
    tags: ["شاحن", "باور بنك", "شحن", "powerbank", "power bank", "charger"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "detergent",
    name: "سائل غسيل ملابس",
    category: "home",
    unit: "2 لتر",
    quantity: 2,
    unitType: "لتر",
    image: "./assets/products/detergent.avif",
    tags: ["غسيل", "منظف", "ملابس", "detergent", "laundry"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "tissues",
    name: "مناديل ورقية",
    category: "home",
    unit: "6 علب × 100 منديل",
    quantity: 6,
    unitType: "قطعة",
    image: "./assets/products/tissues.avif",
    tags: ["مناديل", "ورق", "tissues", "tissue"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "dish-soap",
    name: "سائل غسيل صحون",
    category: "home",
    unit: "750 مل",
    quantity: 0.75,
    unitType: "لتر",
    image: "./assets/products/dish-soap.jpg",
    tags: ["صحون", "مواعين", "منظف", "صابون", "dish", "soap"],
    offers: [
      {
        storeId: "panda",
        price: null,
        available: null,
      },
      {
        storeId: "carrefour",
        price: null,
        available: null,
      },
      {
        storeId: "tamimi",
        price: null,
        available: null,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  ...extraProducts,
  ...moreProducts,
  ...foodProducts,
  ...homeProducts,
  ...electronicsProducts,
];

for (const product of products) {
  if (product.category !== "electronics") continue;
  for (const storeId of ["jarir", "extra"]) {
    if (!product.offers.some((offer) => offer.storeId === storeId)) {
      product.offers.push({ storeId, price: null, available: null });
    }
  }
}
