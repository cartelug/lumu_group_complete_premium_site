export const site = {
  name: "Lumu Auto Dealers",
  shortName: "Lumu",
  phoneDisplay: "+256 782 017 381",
  phone: "+256782017381",
  phone2Display: "+256 782 493 499",
  phone2: "+256782493499",
  whatsapp: "256782017381",
  email: "info@lumuautodealers.com",
  location: "Busega – Masaka Road, Kampala",
  addressLine: "P.O. Box 72434, Kampala — Busega, Masaka Road",
  url: "https://www.lumuautodealers.com",
  tagline: "Imported, inspected, registered.",
  promise: "Every car here has paperwork you can inspect in person.",
  since: 2018,
  hours: "Mon – Sat, 8:00am – 6:00pm",
};

export const brands = ["Toyota", "Nissan", "Hino", "Isuzu", "Mitsubishi", "Yamaha"];

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a local asset path with the deploy base path (for GitHub Pages subpaths). */
export const asset = (p: string) => `${BASE}${p.startsWith("/") ? "" : "/"}${p}`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
