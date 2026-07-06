# Design Notes — "The Night Workshop"

The current site (`static-site/`) is a premium, framework-free rebuild of the
Lumu Autodealers presence. It is a full company site, not a landing page: a
homepage that establishes the brand, five interior pages, and a WhatsApp-first
conversion path on every screen.

## Direction

The brand is a Kampala garage whose single promise is *quote first — no
surprises*. The design is built from the workshop's own world: a dark
asphalt canvas lit by a molten-amber accent, industrial condensed display
type, and a service-desk vernacular (numbered **bays**, a live **job card**,
a **tachometer** hero).

## Visual system

- **Palette** — warm asphalt darks (`--night / --coal / --panel`) alternating
  with workshop-paper lights (`--paper / --bone`); one molten-amber accent
  (`--amber`), a darker ember for text/focus on light surfaces; manila for
  job cards. Tokens live at the top of `css/styles.css`.
- **Type** — Big Shoulders Display (industrial condensed headlines),
  Instrument Sans (body), IBM Plex Mono (job-card data & labels). All
  self-hosted as woff2 — zero third-party font requests.
- **Signature** — *the ignition*: a one-per-session systems-check preloader,
  then a hero tachometer whose needle sweeps to redline and settles at idle.
- **Structure as information** — services are numbered bays (a real set), the
  process is a five-step rail (a real sequence), the About timeline is an
  ordered growth sequence (01–05, no fabricated dates).

## Research-informed decisions

1. Mobile-first: identical content on mobile and desktop, reorganised not
   removed; a sticky Call / WhatsApp / Book bar replaces the FAB below 860px.
2. Performance: self-hosted fonts + inline SVG icon sprite, no images, no
   build step — fast on Ugandan mobile networks.
3. Accessibility: content renders without JS (reveals are JS-gated),
   reduced-motion respected, focus visible, eyebrow/focus contrast tuned for
   light surfaces, decorative icons hidden from assistive tech.
4. Conversion: every page ends in a WhatsApp-ready action; forms generate a
   pre-filled message rather than posting to a server.

## Future improvements

- Swap in real workshop and vehicle photography where available.
- Connect the job-card and property forms to WhatsApp Business API or a CRM.
- Add real inventory / property listings and customer stories once supplied.
