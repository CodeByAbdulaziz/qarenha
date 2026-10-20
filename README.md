# قارنها

An Arabic website for comparing product prices between stores. Prices are in Saudi riyals.

## Data

This is a working demo. The store names are Al Othaim, Panda, Carrefour, and Tamimi. Prices, stock, delivery fees, and free-delivery thresholds are sample data and are not official store offers. They are labeled as demo data on the website. The site does not fetch live prices or take payments.

## Features

- Search in Arabic or English and filter by category, store, and budget.
- Compare the same product and package across stores.
- Save favorites and a shopping list in the current browser.
- Compare a full shopping list across stores, with optional delivery costs.
- Share product and shopping-list links.
- Open a store product page or search for any product at each store.
- Print the shopping list.
- Browse 52 products in 12 categories.
- Read privacy, terms, price notices, and reporting details on `legal.html`.

## Run

Use a local HTTP server from this folder:

```sh
python -m http.server 8080
```

Then open `http://localhost:8080`.

```sh
npm test
```

No packages or build step are needed. All website files are in the main folder. The pricing rules are in `pricing.js` and the sample catalogue is in `catalog.js`.

The Arabic font is IBM Plex Sans Arabic, from Google Fonts, licensed under the SIL Open Font License. Its license is included in `assets/fonts/OFL.txt`.

## Product photos

Product photos come from Carrefour Saudi Arabia product pages. The image files are saved in `assets/products/` so photos load from this site. They illustrate product types. The brand, model, or package shown is not verified across the other stores. Source product pages and original image URLs are listed in `photo-credits.js`, `extra-products.js`, and the website's photo sources panel. Image rights belong to their owners. Photos are not sources for the demo prices.

## Where the code is

- `index.html`: page layout and Arabic text.
- `styles.css`: responsive layout and colors.
- `app.js`: search, favorites, dialogs, and shopping list.
- `pricing.js`: price comparison and delivery calculations.
- `catalog.js`: products, store names, and sample offers.
- `extra-products.js`: added categories, products, and photo sources.
- `photo-credits.js`: Carrefour photo sources and original image URLs.
- `store-links.js`: product pages and store search links.
- `tests/pricing.test.mjs`: tests for the comparison rules.
- `legal.html`, `legal.css`, and `legal.js`: privacy, terms, price warnings, responsibility limits, and error reporting.

## Policies and contact

The policy page describes the current demo only. There are no accounts, payments, live retailer feeds, ads, or affiliate links. Favorites and shopping lists stay in browser storage. Shared URLs include product IDs and quantities. GitHub Pages handles hosting logs under its own privacy policy.

Visitors can report technical errors or request clarification at `Abdulazizdk01@gmail.com`. Email links open the visitor's email app; the website does not send messages or upload forms. Public GitHub issues are an optional technical reporting channel and should not contain personal information.

The price notice explains changes by date, location, store, package, promotions, taxes, and delivery. The terms limit responsibility only to the extent allowed by applicable law. Policy text does not create absolute legal immunity or replace advice for a commercial launch. Review the policies again before adding tracking, accounts, payments, live prices, or affiliate services.

## Store links

Every product has a link for each store. A saved product link opens the retailer's product page. Other links search for the product inside the store. Al Othaim uses a Google search limited to its official website because a public product search was not found. The button explains the destination. Links open in a new tab.

These links are for browsing, not sources for the sample prices. Brands, sizes, stock, and prices can differ. Check the retailer before buying.

## Edit the website

The code is at https://github.com/CodeByAbdulaziz/qarenha.
The live website is at https://codebyabdulaziz.github.io/qarenha/.

- Change page text and layout in `index.html`.
- Change colors, spacing, and mobile layout in `styles.css`.
- Change products, units, and demo prices in `catalog.js` and `extra-products.js`.
- Change store links in `store-links.js`.
- Change website behavior in `app.js`.

You can edit a file on GitHub with the pencil button, then commit the change to `main`.
GitHub Pages publishes the files from the main folder on that branch. No build command is needed.

To edit on your computer, open this folder in your code editor, run a local server, and open the local URL:

```sh
python -m http.server 8080
```

After editing, commit and push your changes to `main` to update the live website.
