// Product names and package sizes follow the linked Carrefour Saudi Arabia listings.
// Panda, Carrefour and Tamimi prices and stock are fictional demo data, not live offers.
// Amazon prices and availability are unknown.

export const homeProducts = [
  {
    id: "antiseptic-liquid",
    name: "مطهر ديتول الأصلي",
    category: "home",
    unit: "1 لتر",
    quantity: 1,
    unitType: "لتر",
    image: "./assets/products/antiseptic-liquid.jpg",
    tags: [
      "مطهر ديتول الأصلي",
      "Dettol Antiseptic Antibacterial Disinfectant Liquid 1L",
    ],
    offers: [
      {
        storeId: "panda",
        price: 32.45,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 34.25,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 33.75,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "floor-wiper",
    name: "مساحة أرضيات فيلدا كلاسيك مع عصا",
    category: "home",
    unit: "42 سم · قطعة واحدة",
    quantity: 1,
    unitType: "قطعة",
    image: "./assets/products/floor-wiper.jpg",
    tags: [
      "مساحة أرضيات فيلدا كلاسيك مع عصا",
      "Vileda Classic Floor Wiper With Stick Red 42cm",
    ],
    offers: [
      {
        storeId: "panda",
        price: 39.5,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 42.25,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 40.75,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "lemon-bleach",
    name: "مبيض كلوركس بلاتينيوم بالليمون",
    category: "home",
    unit: "3.78 لتر",
    quantity: 3.78,
    unitType: "لتر",
    image: "./assets/products/lemon-bleach.jpg",
    tags: [
      "مبيض كلوركس بلاتينيوم بالليمون",
      "Clorox Platinum Bleach Crisp Lemon 3.78L",
    ],
    offers: [
      {
        storeId: "panda",
        price: 27.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 29.25,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 28.45,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "kitchen-spray",
    name: "بخاخ تنظيف المطبخ جف",
    category: "home",
    unit: "470 مل",
    quantity: 0.47,
    unitType: "لتر",
    image: "./assets/products/kitchen-spray.jpg",
    tags: ["بخاخ تنظيف المطبخ جف", "Jif Kitchen Spray 470ml"],
    offers: [
      {
        storeId: "panda",
        price: 15.45,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 16.25,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 15.95,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "surface-wipes",
    name: "مناديل كلوركس المطهرة بالحمضيات",
    category: "home",
    unit: "35 منديل",
    quantity: 35,
    unitType: "منديل",
    image: "./assets/products/surface-wipes.jpg",
    tags: [
      "مناديل كلوركس المطهرة بالحمضيات",
      "Clorox Disinfectant Wipes Citrus 35 Pieces",
    ],
    offers: [
      {
        storeId: "panda",
        price: 23.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 24.95,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 24.25,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "toothbrush",
    name: "فرشاة أسنان كولجيت تريبل أكشن متوسطة",
    category: "personal-care",
    unit: "فرشتان",
    quantity: 2,
    unitType: "قطعة",
    image: "./assets/products/toothbrush.jpg",
    tags: [
      "فرشاة أسنان كولجيت تريبل أكشن متوسطة",
      "Colgate Triple Action Medium Toothbrush 2 Pieces",
    ],
    offers: [
      {
        storeId: "panda",
        price: 14.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 16.25,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 15.45,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "dental-flossers",
    name: "أعواد خيط أسنان أورينكس",
    category: "personal-care",
    unit: "20 قطعة",
    quantity: 20,
    unitType: "قطعة",
    image: "./assets/products/dental-flossers.jpg",
    tags: ["أعواد خيط أسنان أورينكس", "Orinex Dental Flossers 20 Pieces"],
    offers: [
      {
        storeId: "panda",
        price: 6.25,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 6.95,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 6.65,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "body-lotion",
    name: "لوشن نيفيا بزبدة الكاكاو",
    category: "personal-care",
    unit: "400 مل",
    quantity: 0.4,
    unitType: "لتر",
    image: "./assets/products/body-lotion.jpg",
    tags: [
      "لوشن نيفيا بزبدة الكاكاو",
      "NIVEA Body Lotion Cocoa Butter Vitamin E 400ml",
    ],
    offers: [
      {
        storeId: "panda",
        price: 28.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 30.45,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 29.25,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "baby-jelly",
    name: "فازلين جل بترولي للأطفال",
    category: "baby",
    unit: "450 مل",
    quantity: 0.45,
    unitType: "لتر",
    image: "./assets/products/baby-jelly.jpg",
    tags: [
      "فازلين جل بترولي للأطفال",
      "Vaseline Moisturizing Petroleum Jelly Baby 450ml",
    ],
    offers: [
      {
        storeId: "panda",
        price: 35.25,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 37.75,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 36.45,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "baby-powder",
    name: "بودرة أطفال جونسون",
    category: "baby",
    unit: "400 جم",
    quantity: 0.4,
    unitType: "كجم",
    image: "./assets/products/baby-powder.jpg",
    tags: ["بودرة أطفال جونسون", "Johnson's Baby Powder 400g"],
    offers: [
      {
        storeId: "panda",
        price: 47.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 49.25,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 48.45,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "fabric-softener",
    name: "منعم أقمشة كمفورت فلورا سوفت",
    category: "home",
    unit: "4 لتر",
    quantity: 4,
    unitType: "لتر",
    image: "./assets/products/fabric-softener.jpg",
    tags: [
      "منعم أقمشة كمفورت فلورا سوفت",
      "Comfort Fabric Softener Flora Soft 4L",
    ],
    offers: [
      {
        storeId: "panda",
        price: 36.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 39.25,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 38.45,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "mouthwash",
    name: "غسول فم سنسوداين بالنعناع البارد",
    category: "personal-care",
    unit: "500 مل",
    quantity: 0.5,
    unitType: "لتر",
    image: "./assets/products/mouthwash.jpg",
    tags: [
      "غسول فم سنسوداين بالنعناع البارد",
      "Sensodyne Cool Mint Mouthwash 500ml",
    ],
    offers: [
      {
        storeId: "panda",
        price: 21.25,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 23.45,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 22.75,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "hand-wash",
    name: "غسول يدين لايفبوي توتال 10",
    category: "personal-care",
    unit: "200 مل",
    quantity: 0.2,
    unitType: "لتر",
    image: "./assets/products/hand-wash.jpg",
    tags: [
      "غسول يدين لايفبوي توتال 10",
      "Lifebuoy Antibacterial Hand Wash Total 10 200ml",
    ],
    offers: [
      {
        storeId: "panda",
        price: 13.25,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 14.45,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 13.95,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "aa-batteries",
    name: "بطاريات دوراسيل ألترا باور AA",
    category: "electronics",
    unit: "4 بطاريات",
    quantity: 4,
    unitType: "بطارية",
    image: "./assets/products/aa-batteries.jpg",
    tags: [
      "بطاريات دوراسيل ألترا باور AA",
      "Duracell Ultra Power AA Batteries 4 Pack",
    ],
    offers: [
      {
        storeId: "panda",
        price: 22.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 24.45,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 23.25,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "wireless-mouse",
    name: "ماوس لوجيتك M170 لاسلكي رمادي",
    category: "electronics",
    unit: "قطعة واحدة",
    quantity: 1,
    unitType: "قطعة",
    image: "./assets/products/wireless-mouse.jpg",
    tags: [
      "ماوس لوجيتك M170 لاسلكي رمادي",
      "Logitech M170 Wireless Mouse Grey",
    ],
    offers: [
      {
        storeId: "panda",
        price: 42.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 45.45,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 44.25,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
  {
    id: "body-wash",
    name: "غسول دوف مين كير بالفحم والطين 3 في 1",
    category: "personal-care",
    unit: "400 مل",
    quantity: 0.4,
    unitType: "لتر",
    image: "./assets/products/body-wash.jpg",
    tags: [
      "غسول دوف مين كير بالفحم والطين 3 في 1",
      "Dove Men+Care Charcoal and Clay 3in1 Cleanser 400ml",
    ],
    offers: [
      {
        storeId: "panda",
        price: 31.75,
        available: true,
      },
      {
        storeId: "carrefour",
        price: 33.45,
        available: true,
      },
      {
        storeId: "tamimi",
        price: 32.25,
        available: true,
      },
      {
        storeId: "amazon",
        price: null,
        available: null,
      },
    ],
  },
];

export const homePhotoCredits = [
  {
    id: "antiseptic-liquid",
    title: "Dettol Antiseptic Antibacterial Disinfectant Liquid 1L",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/antiseptic-disinfectant/dettol-disinf-original-1l/p/19802",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/19802/1759930205/19802_main.jpg?im=Resize%3D376",
    merchantUnit: "1 لتر",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "floor-wiper",
    title: "Vileda Classic Floor Wiper With Stick Red 42cm",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/wiper-floor/vileda-wiper-floor-42cm/p/36187",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/hb9/h61/63043666083870/36187_main.jpg?im=Resize%3D376",
    merchantUnit: "42 سم · قطعة واحدة",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "lemon-bleach",
    title: "Clorox Platinum Bleach Crisp Lemon 3.78L",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/antiseptic-disinfectant/clorox-platnm-disinf-lemon-3-78l/p/739653",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/739653/1728201603/739653_main.jpg?im=Resize%3D376",
    merchantUnit: "3.78 لتر",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "kitchen-spray",
    title: "Jif Kitchen Spray 470ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/antiseptic-disinfectant/jif-kitch-spray-470ml/p/753706",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/753706/1757224804/753706_main.jpg?im=Resize%3D376",
    merchantUnit: "470 مل",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "surface-wipes",
    title: "Clorox Disinfectant Wipes Citrus 35 Pieces",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/multi-purpose-wipes/clorox-disinf-wipe-citrus-x35/p/633288",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h99/h1a/9936418570270/633288_main.jpg?im=Resize%3D376",
    merchantUnit: "35 منديل",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "toothbrush",
    title: "Colgate Triple Action Medium Toothbrush 2 Pieces",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/tooth-brush-manual/colgate-tb-tripleaction-med-1free/p/595581",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h3c/h7e/33878925606942/595581_main.jpg?im=Resize%3D376",
    merchantUnit: "فرشتان",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "dental-flossers",
    title: "Orinex Dental Flossers 20 Pieces",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/floss-accessories/orinex-dental-flosser-x20/p/596370",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/he6/h8c/27174562267166/596370_main.jpg?im=Resize%3D376",
    merchantUnit: "20 قطعة",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "body-lotion",
    title: "NIVEA Body Lotion Cocoa Butter Vitamin E 400ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/body-lotion-creams/nivea-lotion-cocobttr-dryskin-400ml/p/536882",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/536882/1752999003/536882_main.jpg?im=Resize%3D376",
    merchantUnit: "400 مل",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "baby-jelly",
    title: "Vaseline Moisturizing Petroleum Jelly Baby 450ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/baby-nourish-toiletries/vaseline-petroleum-baby-jelly-450ml/p/599409",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/599409/1779618600/599409_main.jpg?im=Resize%3D376",
    merchantUnit: "450 مل",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "baby-powder",
    title: "Johnson's Baby Powder 400g",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/baby-refresh-toiletries/js-baby-powder-400g/p/716689",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h84/h60/51327538135070/716689_main.jpg?im=Resize%3D376",
    merchantUnit: "400 جم",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "fabric-softener",
    title: "Comfort Fabric Softener Flora Soft 4L",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/fabric-softener-dilute/comfort-softnr-pink-flora-4l/p/96640",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/96640/1780308484/96640_main.jpg?im=Resize%3D376",
    merchantUnit: "4 لتر",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "mouthwash",
    title: "Sensodyne Cool Mint Mouthwash 500ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/mouth-wash-hygiene/sensodyne-mw-coolmint-sensitv-500ml/p/565139",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h7a/h69/9321685581854/565139_main.jpg?im=Resize%3D376",
    merchantUnit: "500 مل",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "hand-wash",
    title: "Lifebuoy Antibacterial Hand Wash Total 10 200ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/liquid-soap-antibacterial/lifebuoy-hw-total10-200ml/p/301159",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/he6/h31/61893999788062/301159_main.jpg?im=Resize%3D378",
    merchantUnit: "200 مل",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "aa-batteries",
    title: "Duracell Ultra Power AA Batteries 4 Pack",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/ar/alkaline-batteries/duracell-ultrap-aa-4/p/596449",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/hf3/hc7/63043671752734/596449_main.jpg?im=Resize%3D376",
    merchantUnit: "4 بطاريات",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "wireless-mouse",
    title: "Logitech M170 Wireless Mouse Grey",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/ar/mouses/logitech-mouse-wireless-m170/p/597774",
    imageUrl:
      "https://cdn.mafrservices.com/sys-master-root/h9a/h41/35070678368286/597774_main.jpg?im=Resize%3D376",
    merchantUnit: "قطعة واحدة",
    source: "Carrefour Saudi Arabia",
  },
  {
    id: "body-wash",
    title: "Dove Men+Care Charcoal and Clay 3in1 Cleanser 400ml",
    sourcePage:
      "https://www.carrefourksa.com/mafsau/en/shower-gel-men/dove-sg-men-chrcl-cly-400ml/p/742975",
    imageUrl:
      "https://cdn.mafrservices.com/pim-content/SAU/media/product/742975/1732616404/742975_main.jpg?im=Resize%3D376",
    merchantUnit: "400 مل",
    source: "Carrefour Saudi Arabia",
  },
];
