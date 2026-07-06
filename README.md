# Lumu Autodealers & Logistics Ltd — Premium Website

Website for **Lumu Autodealers & Logistics Ltd** (Busega, Masaka Road,
Kampala — est. 2018, *Built on Trust*): motor vehicle repairs, servicing,
computerized diagnostics, genuine spare parts, fleet & logistics, plus the
**Lumu Real Estate** division.

## What's in this repo

| Path | What it is |
| --- | --- |
| **`static-site/`** | **The live site.** Framework-free HTML/CSS/JS — "The Night Workshop" design: ignition preloader, hero tachometer, service bays, job-card contact form. Deployed to GitHub Pages on every push to `main`. |
| `platform/` | An earlier Next.js build of the group site (kept for reference). |
| `docs/` | Design research and content-map notes. |
| `.github/workflows/deploy-platform.yml` | GitHub Pages deploy — publishes `static-site/`. |

## Quick start

```bash
cd static-site
python3 -m http.server 8080     # → http://localhost:8080
```

No build step. See `static-site/README.md` for the design system and how to
edit content, phone numbers and colours.

## Before launch

- Confirm the phone numbers (`+256 782 017 381` / `+256 782 493 499`) and
  email (`info@lumuautodealers.com`) in `static-site/js/chrome.js`.
- Point the domain in `sitemap.xml`, `robots.txt` and each page's canonical
  tag at the real production URL.
- Forms are WhatsApp-first by design — no backend required.
