# Lumu Autodealers — plain HTML / CSS / JS

A framework-free, no-build version of the Lumu homepage. Just open the files.

```
static-site/
├── index.html      ← all the markup (one page)
├── css/styles.css  ← all styling (design tokens at the top)
├── js/main.js      ← all behaviour (reveals, menu, FAQ, Aisha guide…)
└── README.md
```

## Run it
Open `index.html` in a browser, or serve the folder:

```bash
cd static-site
python3 -m http.server 8080      # then visit http://localhost:8080
```

## Edit it
- **Colours / fonts / spacing:** the `:root` variables at the top of `css/styles.css`.
- **Services and FAQ text:** the `services` and `faqs` arrays near the top of `js/main.js`.
- **Phone / WhatsApp / address:** search `index.html` for `256782017381` and the topbar/footer.
- **Aisha (the mechanic guide):** the `.guide` SVG block at the bottom of `index.html`;
  her pointing logic is the last block in `js/main.js`.

No dependencies, no build step. Icons are an inline SVG sprite (top of `index.html`).
Fonts load from Google Fonts (Archivo / Hanken Grotesk / IBM Plex Mono).
Fully responsive and `prefers-reduced-motion` aware.

> Note: this is the homepage only. The interior pages (services detail, fleet,
> real estate, about, contact) can be ported to the same plain HTML/CSS/JS on request.
