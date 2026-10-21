import { photoCredits } from "./photo-credits.js?v=20261021";
import { amazonPages, amazonSearchTerms } from "./amazon-links.js?v=20261021";

// These links are for browsing stores. They are not sources for the demo prices.
export const productPages = {
  apple: {
    panda: "https://panda.sa/ar/p/red-apple-26806",
    carrefour: "https://www.carrefourksa.com/mafsau/en/apple/apple-red/p/77766",
    tamimi: "https://shop.tamimimarkets.com/product/red-apple-5",
  },
  banana: {
    panda: "https://panda.sa/ar/p/18743.local-banana",
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/banana/banana-nrtc/p/78158",
  },
  orange: {
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/orange/orange-navel/p/78034",
  },
  avocado: {
    panda: "https://panda.sa/ar/p/39786.hass-avocado",
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/avocado/fg-avocado-hass/p/706409",
  },
  strawberry: {
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/berries/strawberry-punnet-250g/p/77930",
  },
  lemon: {
    panda: "https://panda.sa/ar/p/18725.fresh-lemon",
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/lemon-lime/lemon-import/p/77975",
  },
  tomato: {
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/tomato/tomato-ep/p/78493",
  },
  cucumber: {
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/cucumber/cucumber/p/78541",
  },
  potato: {
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/potato/potato-ep/p/78680",
  },
  carrot: {
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/carrot/carrot-ksa/p/78635",
  },
  pepper: {
    carrefour:
      "https://www.carrefourksa.com/mafsau/en/root-maf-category//fruits-vegetables/vegetables/capsicum-chilli/capsicum-mixed-local-tray/p/522165",
  },
};

const storeDomains = {
  amazon: "amazon.sa",
  panda: "panda.sa",
  carrefour: "carrefourksa.com",
  tamimi: "shop.tamimimarkets.com",
};

const searchTerms = {
  rice: "basmati rice",
  milk: "full cream milk",
  bread: "whole wheat bread",
  "olive-oil": "olive oil",
  pasta: "penne pasta",
  coffee: "ground coffee",
  tea: "black tea",
  headphones: "wireless headphones",
  phone: "smartphone",
  powerbank: "power bank",
  detergent: "laundry detergent",
  "dish-soap": "dishwashing liquid",
};

export function storeLink(product, storeId) {
  const domain = storeDomains[storeId];
  if (!domain) return null;

  const directUrl =
    productPages[product.id]?.[storeId] ||
    (storeId === "amazon" ? amazonPages[product.id] : null) ||
    (storeId === "carrefour"
      ? photoCredits.find((photo) => photo.id === product.id)?.sourcePage
      : null);
  if (directUrl) {
    return { href: directUrl, kind: "product", label: "صفحة المنتج" };
  }

  if (storeId === "amazon") {
    const url = new URL("https://www.amazon.sa/s");
    const query =
      amazonSearchTerms[product.id] ||
      photoCredits.find((photo) => photo.id === product.id)?.title ||
      product.name;
    url.searchParams.set("k", query);
    return { href: url.href, kind: "search", label: "ابحث في أمازون" };
  }

  if (storeId === "panda") {
    const url = new URL("https://panda.sa/ar/plp");
    url.searchParams.set("search_key", product.name);
    return { href: url.href, kind: "search", label: "ابحث في المتجر" };
  }

  if (storeId === "tamimi" || storeId === "carrefour") {
    const term =
      searchTerms[product.id] || product.tags.find((tag) => /[a-z]/i.test(tag));
    const url = new URL(
      storeId === "tamimi"
        ? "https://shop.tamimimarkets.com/search"
        : "https://www.carrefourksa.com/mafsau/en/search",
    );
    url.searchParams.set(
      storeId === "tamimi" ? "query" : "keyword",
      term || product.name,
    );
    return { href: url.href, kind: "search", label: "ابحث في المتجر" };
  }

  return null;
}
