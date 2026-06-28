export const site = {
  name: "Lumu Group of Companies",
  shortName: "Lumu Group",
  phoneDisplay: "+256 700 000 000",
  phone: "+256700000000",
  whatsapp: "256700000000",
  email: "info@lumugroup.com",
  location: "Kampala, Uganda",
  url: "https://www.lumugroup.com",
  tagline: "Auto Dealers & Real Estate",
};

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a local asset path with the deploy base path (for GitHub Pages subpaths). */
export const asset = (p: string) => `${BASE}${p.startsWith("/") ? "" : "/"}${p}`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(amount: number, currency: "USD" | "UGX") {
  if (currency === "UGX") return `UGX ${amount.toLocaleString("en-US")}`;
  return `$${amount.toLocaleString("en-US")}`;
}
