# Lumu Autodealers & Logistics Ltd — "The Night Workshop"

A premium, animated, framework-free website. Plain HTML / CSS / JS — no build
step, no dependencies, nothing to install. Deploys as-is to GitHub Pages (see
`.github/workflows/deploy-platform.yml` — pushes to `main` publish this folder).

```
static-site/
├── index.html            ← home (ignition preloader + tachometer hero)
├── services.html         ← the six service bays, in detail
├── fleet.html            ← fleet & logistics for businesses
├── real-estate.html      ← Lumu Real Estate division
├── about.html            ← story, values, timeline
├── contact.html          ← job-card builder → WhatsApp
├── 404.html              ← not-found page (GitHub Pages picks it up)
├── css/styles.css        ← the whole design system (tokens at the top)
├── js/chrome.js          ← shared header / footer / menu — edit nav & phone ONCE here
├── js/main.js            ← all behaviour (ignition, gauge, reveals, forms…)
├── assets/fonts/         ← self-hosted woff2 (no Google Fonts request)
├── assets/favicon.svg    ← brand mark
├── assets/og.png         ← social share card (1200×630)
├── manifest.webmanifest · robots.txt · sitemap.xml
└── README.md
```

## Design system

- **Palette** — warm asphalt darks (`--night/--coal/--panel`) alternating with
  workshop-paper lights (`--paper/--bone`), one molten-amber accent
  (`--amber`, the brand orange), manila for job cards. All tokens sit at the
  top of `css/styles.css`.
- **Type** — Big Shoulders Display (industrial condensed, headlines),
  Instrument Sans (body), IBM Plex Mono (job-card data, labels). Self-hosted.
- **Signature** — the ignition: a systems-check preloader (once per session)
  and a hero tachometer whose needle sweeps to redline and settles at idle.
- **Vernacular** — services are numbered *bays*, the process is a *job card*,
  the contact form literally fills a live job-card preview as you type.

## Run it locally

```bash
cd static-site
python3 -m http.server 8080     # visit http://localhost:8080
```

(Or just open `index.html` — everything works from file:// too.)

## Edit it

- **Colours / spacing / fonts** — the `:root` tokens at the top of `css/styles.css`.
- **Nav, phone numbers, address, footer** — the constants at the top of `js/chrome.js` (one place, every page).
- **WhatsApp number** — `js/chrome.js` + `js/main.js` (`WA` constant) + the `wa.me` links inside each page.
- **Domain** — search `lumuautodealers.com` in every page head, `sitemap.xml`, `robots.txt`.

## Behaviour notes

- Every form opens a pre-filled WhatsApp message — nothing is stored or sent
  to a server.
- All animation is transform/opacity only, `IntersectionObserver`-driven, and
  fully disabled under `prefers-reduced-motion`.
- The ignition preloader runs once per browser session (sessionStorage).
- Works down to 320 px; below 860 px a sticky Call / WhatsApp / Book bar
  replaces the floating chat button.
