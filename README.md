# Lumu Group of Companies — Complete Premium Website

This is a mobile-first static website for **Lumu Group of Companies**, with dedicated pages for:

- Home
- Lumu Auto Dealers
- Lumu Real Estate
- About
- Contact

## Files

- `index.html` — homepage
- `auto-dealers.html` — full auto division page
- `real-estate.html` — full real estate division page
- `about.html` — brand/about page
- `contact.html` — contact and general inquiry page
- `styles.css` — complete responsive styling
- `script.js` — mobile menu, tabs, filters, FAQ, WhatsApp inquiry generator
- `assets/` — SVG logo/illustrations/favicon
- `manifest.webmanifest`, `robots.txt`, `sitemap.xml`

## Replace before launch

Search and replace these placeholders:

- `+256 700 000 000`
- `256700000000` inside `script.js` for WhatsApp links
- `info@lumugroup.com`
- `Official office location goes here`
- `https://example.com` in `sitemap.xml` and schema metadata
- Replace `assets/lumu-mark.svg` with the official logo if available

## Performance notes

The site is built without heavy animation libraries, canvas effects, or large image files. It uses lightweight SVG illustrations and minimal JavaScript to stay fast on mobile.

## Font notes

The pages load Montserrat and Plus Jakarta Sans from Google Fonts with `font-display=swap`. If the site is offline, it falls back to system sans-serif fonts.
