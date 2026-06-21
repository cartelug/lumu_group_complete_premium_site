# Lumu Group of Companies — One-Month Final Website Build

This package is a polished static website for **Lumu Group of Companies** with two major divisions:

- **Lumu Auto Dealers** — vehicle sales, car importation, trade-ins, fleet sourcing, documentation support and after-sales guidance.
- **Lumu Real Estate** — land, houses, rentals, apartments, commercial property, property listing and investment guidance.

## Files

- `index.html` — premium homepage
- `auto-dealers.html` — full auto division page
- `real-estate.html` — full real estate division page
- `about.html` — company positioning page
- `contact.html` — contact and inquiry page
- `assets/css/styles.css` — white + premium orange design system
- `assets/js/app.js` — navigation, filters, FAQ and WhatsApp message generator
- `assets/images/` — custom generated SVG illustrations and brand assets
- `manifest.webmanifest`, `robots.txt`, `sitemap.xml` — launch and SEO support
- `docs/` — design research and content map

## Replace before launch

Search and replace these placeholders:

- Phone: `+256 700 000 000`
- WhatsApp: `+256700000000`
- Email: `info@lumugroup.com`
- Location: `Kampala, Uganda`
- Domain in sitemap/robots: `https://www.lumugroup.com`

## How to run locally

Open `index.html` in your browser, or run a local static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Notes

The forms are static and do not save data. They generate a WhatsApp-ready inquiry message. For production, connect the forms to email, WhatsApp Business API, a CRM, or Google Sheets.
