# Qarenha

An Arabic product comparison website for Saudi Arabia. Prices are in Saudi riyals.

## Prices

There are no sample prices in the catalogue. A product starts with an unknown price and stock status. A number appears only after a current source has passed the product, model, currency, and expiry checks.

The current automatic source is a small set of matching **eXtra Saudi Arabia** product pages. This reads public product data; it is not an official eXtra API or a partnership. The exact approved pages and match evidence are in `data/product-sources.json`.

Panda, Carrefour, Tamimi, Amazon Saudi Arabia, and Jarir are navigation links only. We do not collect their prices without an approved integration. A product photo or a store link is not proof of a current offer.

Each price has a source link and a check time. Prices expire after at most 30 minutes. A failed check replaces the previous price with `null`; an expired price is hidden. Stock must match the page's product record. Conflicting or unknown stock cannot win the cheapest available offer ranking. Unknown shipping is never treated as free.

Prices may change between checks or vary by city, seller, membership, and checkout costs. The store's final checkout price is the reference. There is no promise of instant or complete coverage.

## Features

- 112 products in 12 categories, including chargers, USB and HDMI cables, power strips, and plug adapters.
- Six stores: Panda, Carrefour, Tamimi, Amazon Saudi Arabia, Jarir, and eXtra. The last two are shown for electronics.
- Arabic and English search from the homepage and product list.
- Category, store, and budget filters; budget checks use verified available offers.
- Source links and check times next to prices.
- A previous price is shown only if the current source explicitly supplies it.
- Favorites and a shopping list saved in the current browser.
- Product and shopping-list sharing, and a print view.
- Privacy, terms, price notices, and error reporting on `legal.html`.

## Automatic updates

`.github/workflows/update-prices.yml` checks the approved pages and publishes a new GitHub Pages artifact on pushes, manual runs, and a schedule about every 15 minutes. GitHub can delay scheduled runs and may disable a schedule after 60 days without repository activity; re-enable it in Actions if needed. This is polling, not a notification from each retailer when it changes a price.

The workflow tests the code, runs `scripts/update-prices.mjs`, builds `_site/`, and publishes it. It does not make price-history commits. Its token can read the repository and deploy Pages; it cannot edit repository contents. No store credentials are included in the public website.

The browser reloads the local price feed every five minutes and on return to the tab. An expiry timer removes old prices even if a deployment is delayed. A failed update may leave no current price, which is safer than showing an old number as current.

## Add an approved source

Add a record to `data/product-sources.json` only after checking the retailer's collection rules and the exact item. Include the Saudi product URL, retailer SKU, and an exact name, model, or GTIN. Variants such as storage, colour, cable length, and pack count must match. Do not bind a similar product or mixed model revisions.

Only eXtra public Saudi product pages are enabled in the collector. Other stores need an authorized feed or API before adding a provider. Put future credentials in a server-side secret store, never in JavaScript or a tracked file. Respect rate limits, access rules, and robots.txt; do not bypass blocks.

## Run locally

No packages are needed. Use Node.js 22 or newer for checks and collection.

```sh
node --test tests/*.test.mjs
node scripts/update-prices.mjs
python -m http.server 8080
```

Open `http://localhost:8080`. Collection uses the network; unit tests do not.

```sh
node scripts/build-public.mjs
```

The build copies only public HTML, styles, modules, images, and price data to `_site/`. It excludes Git metadata, workflow source, tests, and collector scripts.

## Code

- `index.html`, `styles.css`, `app.js`: page, search, product views, and shopping list.
- `catalog.js`: store definitions and the main product list.
- `extra-products.js`, `more-products.js`, `food-products.js`, `home-products.js`, `electronics-products.js`: product names, units, and photo sources. All starting prices are unknown.
- `photo-credits.js`: combined Carrefour photo sources.
- `store-links.js`, `amazon-links.js`: navigation links. A homepage or search link is not a matched offer.
- `price-feed.js`: validates and applies the published price snapshot in the browser.
- `pricing.js`: current-price checks, filtering, rankings, and totals.
- `scripts/update-prices.mjs`: exact source matching and bounded public-page collection.
- `data/product-sources.json`, `data/prices.json`: approved source records and the last collected snapshot.
- `legal.html`, `legal.css`, `legal.js`: policies and reporting.

Product photos are original files from Carrefour Saudi Arabia, saved under `assets/products/`. Rights belong to their owners. Photos illustrate items and are not price feeds. The Arabic font is IBM Plex Sans Arabic; its SIL Open Font License is included under `assets/fonts/`.

Source: https://github.com/CodeByAbdulaziz/qarenha

Website: https://codebyabdulaziz.github.io/qarenha/

Public contact: Abdulazizdk01@gmail.com

## Search engines

`sitemap.xml` lists the two canonical pages. Product query links and sections are not separate pages. Keep last-modified dates tied to real edits and keep the Google verification meta tag.

The origin's `robots.txt` is maintained in the separate portfolio repository at https://codebyabdulaziz.github.io/robots.txt. Publishing these files does not guarantee Google indexing or search ranking.
