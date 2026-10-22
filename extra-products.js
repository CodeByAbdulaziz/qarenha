// Prices and stock stay unknown until a matching current source is verified.

export const extraCategories = [
  {
    id: "dairy",
    label: "ألبان وأجبان وبيض",
    icon: "dairy",
  },
  {
    id: "bakery",
    label: "مخبوزات",
    icon: "bakery",
  },
  {
    id: "frozen",
    label: "مجمدات",
    icon: "frozen",
  },
  {
    id: "meat",
    label: "لحوم ودواجن",
    icon: "meat",
  },
  {
    id: "personal-care",
    label: "عناية شخصية",
    icon: "personal-care",
  },
  {
    id: "baby",
    label: "مستلزمات الأطفال",
    icon: "baby",
  },
];

export const extraProducts = [
  {
    id: "yogurt",
    name: "زبادي كامل الدسم",
    category: "dairy",
    unit: "170 جم",
    quantity: 0.17,
    unitType: "كجم",
    image: "./assets/products/yogurt.avif",
    tags: ["زبادي", "روب", "yogurt", "yoghurt"],
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
    id: "cheddar-cheese",
    name: "جبن شيدر شرائح",
    category: "dairy",
    unit: "200 جم",
    quantity: 0.2,
    unitType: "كجم",
    image: "./assets/products/cheddar-cheese.avif",
    tags: ["جبن", "شيدر", "cheddar cheese", "cheese slices"],
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
    id: "butter",
    name: "زبدة غير مملحة",
    category: "dairy",
    unit: "200 جم",
    quantity: 0.2,
    unitType: "كجم",
    image: "./assets/products/butter.avif",
    tags: ["زبدة", "غير مملحة", "butter", "unsalted butter"],
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
    id: "cream",
    name: "قشطة",
    category: "dairy",
    unit: "250 مل",
    quantity: 0.25,
    unitType: "لتر",
    image: "./assets/products/cream.avif",
    tags: ["قشطة", "قشطه", "cream", "thick cream"],
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
    id: "croissant",
    name: "كرواسون سادة",
    category: "bakery",
    unit: "60 جم",
    quantity: 0.06,
    unitType: "كجم",
    image: "./assets/products/croissant.avif",
    tags: ["كرواسون", "سادة", "croissant", "plain croissant"],
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
    id: "tortilla",
    name: "خبز تورتيلا",
    category: "bakery",
    unit: "390 جم · 6 قطع",
    quantity: 0.39,
    unitType: "كجم",
    image: "./assets/products/tortilla.avif",
    tags: ["خبز", "تورتيلا", "tortilla", "wraps"],
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
    id: "burger-buns",
    name: "خبز برجر حبوب كاملة",
    category: "bakery",
    unit: "280 جم",
    quantity: 0.28,
    unitType: "كجم",
    image: "./assets/products/burger-buns.jpg",
    tags: ["خبز", "برجر", "burger buns", "whole grain buns"],
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
    id: "baguette",
    name: "خبز باجيت",
    category: "bakery",
    unit: "250 جم",
    quantity: 0.25,
    unitType: "كجم",
    image: "./assets/products/baguette.avif",
    tags: ["خبز", "فرنسي", "baguette", "bread"],
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
    id: "frozen-peas",
    name: "بازلاء مجمدة",
    category: "frozen",
    unit: "400 جم",
    quantity: 0.4,
    unitType: "كجم",
    image: "./assets/products/frozen-peas.avif",
    tags: ["بازلاء", "بسلة", "frozen peas", "peas"],
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
    id: "frozen-mix",
    name: "خضروات مشكلة مجمدة",
    category: "frozen",
    unit: "400 جم",
    quantity: 0.4,
    unitType: "كجم",
    image: "./assets/products/frozen-mix.avif",
    tags: [
      "خضروات",
      "خضار مشكلة",
      "frozen mixed vegetables",
      "mixed vegetables",
    ],
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
    id: "frozen-fries",
    name: "بطاطس مقلية مجمدة",
    category: "frozen",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/frozen-fries.avif",
    tags: ["بطاطس", "مجمدة", "frozen fries", "french fries"],
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
    id: "frozen-strawberry",
    name: "فراولة مجمدة",
    category: "frozen",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/frozen-strawberry.jpg",
    tags: ["فراولة", "فراوله", "frozen strawberry", "frozen berries"],
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
    id: "chicken-breast",
    name: "صدور دجاج طازجة",
    category: "meat",
    unit: "450 جم",
    quantity: 0.45,
    unitType: "كجم",
    image: "./assets/products/chicken-breast.avif",
    tags: ["دجاج", "صدور", "chicken breast", "chicken fillet"],
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
    id: "whole-chicken",
    name: "دجاج كامل طازج",
    category: "meat",
    unit: "1 كجم",
    quantity: 1,
    unitType: "كجم",
    image: "./assets/products/whole-chicken.avif",
    tags: ["دجاج", "كامل", "whole chicken", "fresh chicken"],
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
    id: "beef-mince",
    name: "لحم بقري مفروم",
    category: "meat",
    unit: "500 جم",
    quantity: 0.5,
    unitType: "كجم",
    image: "./assets/products/beef-mince.avif",
    tags: ["لحم", "مفروم", "beef mince", "minced beef"],
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
    id: "beef-steak",
    name: "ستيك لحم بقري",
    category: "meat",
    unit: "500 جم",
    quantity: 0.5,
    unitType: "كجم",
    image: "./assets/products/beef-steak.avif",
    tags: ["لحم", "ستيك", "beef steak", "steak"],
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
    id: "shampoo",
    name: "شامبو للشعر",
    category: "personal-care",
    unit: "400 مل",
    quantity: 0.4,
    unitType: "لتر",
    image: "./assets/products/shampoo.avif",
    tags: ["شامبو", "شعر", "shampoo", "hair care"],
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
    id: "bar-soap",
    name: "صابون للجسم",
    category: "personal-care",
    unit: "125 جم",
    quantity: 0.125,
    unitType: "كجم",
    image: "./assets/products/bar-soap.avif",
    tags: ["صابون", "جسم", "bar soap", "soap"],
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
    id: "toothpaste",
    name: "معجون أسنان",
    category: "personal-care",
    unit: "100 مل",
    quantity: 0.1,
    unitType: "لتر",
    image: "./assets/products/toothpaste.jpg",
    tags: ["معجون", "اسنان", "أسنان", "toothpaste"],
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
    id: "deodorant",
    name: "مزيل رائحة العرق",
    category: "personal-care",
    unit: "150 مل",
    quantity: 0.15,
    unitType: "لتر",
    image: "./assets/products/deodorant.avif",
    tags: ["مزيل", "عرق", "deodorant", "body spray"],
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
    id: "diapers",
    name: "حفاضات أطفال مقاس 4",
    category: "baby",
    unit: "84 حفاضة",
    quantity: 84,
    unitType: "قطعة",
    image: "./assets/products/diapers.jpg",
    tags: ["حفاضات", "اطفال", "أطفال", "diapers", "size 4"],
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
    id: "baby-wipes",
    name: "مناديل مبللة للأطفال",
    category: "baby",
    unit: "80 منديل",
    quantity: 80,
    unitType: "قطعة",
    image: "./assets/products/baby-wipes.avif",
    tags: ["مناديل", "مبللة", "baby wipes", "wet wipes"],
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
    id: "baby-shampoo",
    name: "شامبو أطفال",
    category: "baby",
    unit: "200 مل",
    quantity: 0.2,
    unitType: "لتر",
    image: "./assets/products/baby-shampoo.avif",
    tags: ["شامبو", "اطفال", "أطفال", "baby shampoo"],
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
    id: "baby-bath",
    name: "غسول استحمام للأطفال",
    category: "baby",
    unit: "200 مل",
    quantity: 0.2,
    unitType: "لتر",
    image: "./assets/products/baby-bath.jpg",
    tags: ["غسول", "استحمام", "baby bath", "baby wash"],
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
];

export const extraPhotoCredits = [
  {
    id: "yogurt",
    title: "Almarai Plain Full Fat Fresh Yogurt 170g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/plain-yogurt/almarai-yogurt-ff-170g/p/357349",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/357349/1755187203/357349_main.jpg?im=Resize%3D376",
    merchantUnit: "170g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "cheddar-cheese",
    title: "Puck Cheddar Cheese Slices 200g X 10",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/spread-processed-cheese/puck-cheese-cheddar-10-slices-200g/p/488997",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/hb3/h73/63885745029150/488997_main.jpg?im=Resize%3D376",
    merchantUnit: "200g, 10 slices",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "butter",
    title: "Almarai Unsalted Natural Butter 200g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/unsalted-butter/al-marai-butter-unsalted-200g/p/548654",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/548654/1755187203/548654_main.jpg?im=Resize%3D376",
    merchantUnit: "200g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "cream",
    title: "KDD Thick Cream 250ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/creams/kdd-thick-cream-250ml/p/104277?offer=offer_carrefour_&sellerId=0000&sid=QCOMM",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/hf2/he4/12630262186014/104277_main.jpg?im=Resize%3D376",
    merchantUnit: "250ml",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "croissant",
    title: "L'usine Croissant Plain 60g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/salted-products/l-usine-croissant-plain-60g/p/100843",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/100843/1755181805/100843_main.jpg?im=Resize%3D376",
    merchantUnit: "60g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "tortilla",
    title: "Pronto Tortilla Wraps Wraps, Large, 6 Pieces, 390g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/wraps/pronto-tortilla-white-390g/p/639936",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/hd3/hbf/49411327721502/639936_main.jpg?im=Resize%3D376",
    merchantUnit: "390g, 6 pieces",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "burger-buns",
    title: "Almithali Burger Buns Large, Whole Grain 280g",
    sourcePage: "https://www.carrefourksa.com/mafsau/en/p/573961",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/573961/1760853606/573961_main.jpg?im=Resize%3D376",
    merchantUnit: "280g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "baguette",
    title: "Baguette Traditional",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/bakery/bread-rolls/white-bread/baguette-carrefour/p/358398",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h75/h1d/9169302093854/358398_main.jpg?im=Resize%3D480",
    merchantUnit: "250g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "frozen-peas",
    title: "Foody's Frozen Green Peas 400g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/green-peas/foody-s-green-peas-400g/p/622910",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/hcb/h54/52238601191454/622910_main.jpg?im=Resize%3D376",
    merchantUnit: "400g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "frozen-mix",
    title: "Foody's Frozen Mixed Vegetables 400g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/frozen-food/frozen-fruits-vegetables/frozen-vegetables/mix-vegetable/foody-s-frozen-mixed-vegetables-400/p/622911",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h39/hd5/50421200257054/622911_main.jpg?im=Resize%3D480",
    merchantUnit: "400g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "frozen-fries",
    title: "Al Kabeer French Fries 1000g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/french-fries/al-kabeer-french-fries-1k/p/52221",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h5b/hac/52410210549790/52221_main.jpg?im=Resize%3D480",
    merchantUnit: "1kg",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "frozen-strawberry",
    title: "Dari Frozen Strawberry 1kg",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/frozen-fruits/dari-frozen-strwbry-1kg/p/572696",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h63/h0f/51847207223326/572696_main.jpg?im=Resize%3D376",
    merchantUnit: "1kg",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "chicken-breast",
    title: "Alyoum Fresh Chicken Breast Fillet Chilled 450g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/bbq-meat-poultry/meat-poultry/chicken/chicken-breast/alyoum-chicken-breast-fillet-450g/p/599582",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/599582/1755185404/599582_main.jpg?im=Resize%3D376",
    merchantUnit: "450g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "whole-chicken",
    title: "Golden Chicken Fresh Whole Chicken 1000g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/pet-animals-supplies//fresh-food/meat-poultry/chicken/whole-chicken/golden-chicken-fresh-bag-1000g/p/607934",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/607934/1732514404/607934_main.jpg?im=Resize%3D376",
    merchantUnit: "1000g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "beef-mince",
    title: "Fresh Beef Mince Local",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/local-beef/local-fresh-beef-mince/p/553261",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h4b/hf4/26516762066974/553261_main.jpg?im=Resize%3D376",
    merchantUnit: "500g per category listing",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "beef-steak",
    title: "Fresh Beef Steak Local",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/local-beef/local-fresh-beef-steak/p/553268?offer=offer_carrefour_&sellerId=0000&sid=EXPRESS",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h32/hc2/27675590098974/553268_main.jpg?im=Resize%3D376",
    merchantUnit: "500g per category listing",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "shampoo",
    title: "CLEAR Anti-Dandruff 2 in 1 Shampoo, Hair fall Defence, 400ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/shampoo-antidandruff/clear-men-hair-fall-defense-400m/p/474063",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/474063/1779637200/474063_main.jpg?im=Resize%3D376",
    merchantUnit: "400ml",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "bar-soap",
    title: "Dove Beauty Cream Soap 125g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/creamy-soap/dove-beauty-soap-bar-white-125g/p/328947",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/he9/h73/61776213770270/328947_main.jpg?im=Resize%3D376",
    merchantUnit: "125g",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "toothpaste",
    title:
      "Colgate Max Fresh With Cooling Crystals Cool Mint Toothpaste White 100ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/regular-toothpaste/colgate-max-fresh-cool-mint-125ml/p/405309",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/hd7/hbd/33629167517726/405309_main.jpg?im=Resize%3D376",
    merchantUnit: "100ml",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "deodorant",
    title: "Old Spice Original Men's Deodorant Body Spray 150ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/men-deodorant-spray/os-deo-men-spray-original-150ml/p/717039",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/717039/1787559000/717039_main.jpg?im=Resize%3D376",
    merchantUnit: "150ml",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "diapers",
    title: "Pampers Size 4, 84 Pieces, Pants, Super Hero",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/baby-diapers/pampers-s4-84x1-d6p-super-hero/p/755465",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/755465/1774945800/755465_main.jpg?im=Resize%3D376",
    merchantUnit: "84 pieces, size 4",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "baby-wipes",
    title: "Cool & cool baby wipes pack 80 wipes",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/baby-wipes-single-piece/c-c-wipe-ultrasoft-gentle-x80/p/580698",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h44/h99/9027348725790/580698_main.jpg?im=Resize%3D376",
    merchantUnit: "80 pieces",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "baby-shampoo",
    title: "Johnson's Baby Shampoo 200ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/baby-bath-toiletries/johnson-s-baby-shmp-200ml/p/628886",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/ha6/hb5/9959562739742/628886_main.jpg?im=Resize%3D376",
    merchantUnit: "200ml",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "baby-bath",
    title: "Johnson's everyday gentle cleansing baby bath 200 ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/baby-bath-toiletries/johnson-s-baby-bath-200m/p/111122",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/hc5/hb9/9300159168542/111122_main.jpg?im=Resize%3D376",
    merchantUnit: "200ml",
    source: "Carrefour Saudi Arabia",
  },
];
