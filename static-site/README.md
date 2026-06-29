# Lumu Autodealers — plain HTML / CSS / JS

A framework-free, no-build version of the full Lumu site. Just open the files.

```
static-site/
├── index.html          ← home
├── services.html       ← all services
├── fleet.html          ← fleet & logistics
├── real-estate.html    ← Lumu Real Estate
├── about.html          ← about
├── contact.html        ← contact + WhatsApp request form
├── css/styles.css      ← all styling (design tokens at the top)
├── js/chrome.js        ← shared header / footer / guide (edit chrome here, once)
├── js/main.js          ← all behaviour (reveals, menu, FAQ, form, Aisha guide…)
└── README.md
```

Each page is just its own `<main>` content; the header, footer, mobile bar,
WhatsApp button and Aisha are injected on every page by `js/chrome.js`, so you
edit the nav/footer/phone in **one** place. Nav, phone and address also live in
`js/chrome.js`.

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
