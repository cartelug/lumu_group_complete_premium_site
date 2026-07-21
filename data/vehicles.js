/* ============================================================
   LUMU AUTODEALERS — SAMPLE STOCK
   ------------------------------------------------------------
   Replace this array with the real inventory before launch.
   The page reads window.LUMU_VEHICLES at runtime — no build step.
   Each entry:
     id       – slug (unique)
     make     – Toyota / Nissan / Hino / …
     model    – Hiace / Prado TX / …
     year     – integer
     body     – "Sedan" | "SUV" | "Pickup" | "Van" | "Truck"
     trans    – "Auto" | "Manual"
     km       – odometer
     fuel     – "Petrol" | "Diesel" | "Hybrid"
     price    – integer UGX (no comma). Set null for "POA".
     colour   – short string
     features – array of short chips (max ~6)
     note     – one-line highlight
     photo    – null (placeholder rendered) OR "assets/vehicles/xyz.jpg"
     sample   – true while these are seed rows; drop when a row is real.
   ============================================================ */
window.LUMU_VEHICLES = [
  {
    id: "toyota-hiace-2015",
    make: "Toyota", model: "Hiace", year: 2015,
    body: "Van", trans: "Auto", km: 145000, fuel: "Diesel",
    price: 78000000, colour: "White",
    features: ["9-seater", "AC", "Airbags", "Reverse camera"],
    note: "Freshly serviced, spare wheel new",
    photo: null, sample: true
  },
  {
    id: "toyota-prado-tx-2013",
    make: "Toyota", model: "Prado TX", year: 2013,
    body: "SUV", trans: "Auto", km: 168000, fuel: "Petrol",
    price: 132000000, colour: "Black",
    features: ["4WD", "Leather", "Sunroof", "7-seater"],
    note: "One owner, service book intact",
    photo: null, sample: true
  },
  {
    id: "nissan-patrol-y61-2010",
    make: "Nissan", model: "Patrol Y61", year: 2010,
    body: "SUV", trans: "Manual", km: 210000, fuel: "Diesel",
    price: 145000000, colour: "Silver",
    features: ["4WD low-range", "Snorkel", "Bull-bar", "Diff-lock"],
    note: "Field-ready — recent suspension rebuild",
    photo: null, sample: true
  },
  {
    id: "toyota-hilux-2016",
    make: "Toyota", model: "Hilux", year: 2016,
    body: "Pickup", trans: "Manual", km: 132000, fuel: "Diesel",
    price: 95000000, colour: "White",
    features: ["Double cab", "4WD", "Canopy", "Alloy rims"],
    note: "Clean underside, no accident history",
    photo: null, sample: true
  },
  {
    id: "toyota-premio-2014",
    make: "Toyota", model: "Premio", year: 2014,
    body: "Sedan", trans: "Auto", km: 118000, fuel: "Petrol",
    price: 48000000, colour: "Silver",
    features: ["Push start", "Reverse camera", "Fabric interior"],
    note: "Fuel-friendly city runabout",
    photo: null, sample: true
  },
  {
    id: "hino-300-2018",
    make: "Hino", model: "300 series", year: 2018,
    body: "Truck", trans: "Manual", km: 88000, fuel: "Diesel",
    price: 165000000, colour: "White",
    features: ["3-tonne payload", "Dropside body", "Power steering"],
    note: "Ex-fleet, records available on request",
    photo: null, sample: true
  },
  {
    id: "mitsubishi-pajero-io-2012",
    make: "Mitsubishi", model: "Pajero IO", year: 2012,
    body: "SUV", trans: "Auto", km: 175000, fuel: "Petrol",
    price: 42000000, colour: "Silver",
    features: ["5-door", "Fabric interior", "Roof rails"],
    note: "Compact 4WD — ideal upcountry runs",
    photo: null, sample: true
  },
  {
    id: "nissan-xtrail-2015",
    make: "Nissan", model: "X-Trail", year: 2015,
    body: "SUV", trans: "Auto", km: 129000, fuel: "Petrol",
    price: 68000000, colour: "Grey",
    features: ["7-seater", "Panoramic roof", "Alloy rims"],
    note: "Family SUV, single owner",
    photo: null, sample: true
  }
];
