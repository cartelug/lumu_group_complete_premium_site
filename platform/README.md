# Lumu Group — Platform (Next.js)

The next-phase build: a real, data-driven **inventory platform** for Lumu Auto Dealers
and Lumu Real Estate, built with **Next.js 16 (App Router)** and **static export** so it
deploys anywhere — including GitHub Pages — with zero server cost.

It lives alongside the original static marketing site (in the repo root) so the current
live link is untouched until you deliberately switch over.

## What's built (Phase 0 + Phase 1)

- **Design system** ported 1:1 from the dark/orange brand (Bricolage Grotesque + Inter via `next/font`).
- **Typed inventory data** (`lib/data.ts`) — `Vehicle` and `Property` models with seed listings.
- **Inventory pages** with **faceted filtering + sorting**:
  - `/auto-dealers/` — vehicle index (`VehicleExplorer`)
  - `/real-estate/` — property index (`PropertyExplorer`)
- **Detail pages** (statically generated per listing) with specs, highlights/amenities,
  per-listing **JSON-LD** structured data, and a **pre-filled WhatsApp inquiry form**.
- **Marketing pages**: home (featured inventory), about, contact, custom 404.
- **SEO**: dynamic `sitemap.xml` + `robots.txt`, per-page metadata, Open Graph/Twitter.
- **UX**: scroll progress, reveal-on-scroll, count-ups, back-to-top, full-screen mobile nav.

## Run locally

```bash
cd platform
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deploy (GitHub Pages)

A workflow at `.github/workflows/deploy-platform.yml` builds the export and deploys it.
To enable: **Settings → Pages → Source: GitHub Actions**. (The build sets
`NEXT_PUBLIC_BASE_PATH` to the project sub-path; set it to `""` for a root custom domain.)

## Replacing seed data with real inventory

Edit `lib/data.ts` — swap the `vehicles` / `properties` arrays for real listings and photos.
Each `image` is a URL; each entry keeps a local `fallback` illustration.

## Roadmap (next phases — require a dynamic host + database)

- **Phase 2 — Lead & CRM engine:** persist inquiries, admin pipeline dashboard,
  WhatsApp Business API + email notifications. (Needs Vercel/Node + Postgres.)
- **Phase 3 — Accounts & engagement:** saved favorites, search alerts, agent profiles, bookings.
- **Phase 4 — CMS:** move inventory into Payload/Sanity so staff manage listings without code.
- **Phase 5 — Advanced:** reservations/deposits (payments), valuations, AI search.

Static export covers Phases 0–1 fully. Phases 2–5 introduce server features and are
enabled by deploying to a dynamic host (e.g. Vercel) with a database.
