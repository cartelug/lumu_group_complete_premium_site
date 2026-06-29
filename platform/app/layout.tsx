import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Hanken_Grotesk, JetBrains_Mono, Saira_Condensed } from "next/font/google";
import "./globals.css";
import { site, asset } from "@/lib/site";
import { inventory } from "@/lib/inventory";
import Header from "@/components/dealer/Header";
import Experience from "@/components/dealer/Experience";
import Footer from "@/components/dealer/Footer";

const display = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const data = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-data", display: "swap" });
const plate = Saira_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-plate", display: "swap" });

export const viewport: Viewport = { themeColor: "#ECECE7" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Verified car imports in Kampala`, template: `%s | ${site.name}` },
  description:
    "Lumu Auto Dealers — verified Japanese and UK car imports in Kampala. Every car shows its inspection grade, mileage and import route. Enquire on WhatsApp.",
  icons: { icon: asset("/favicon.svg") },
  openGraph: { type: "website", title: `${site.name} — Verified car imports in Kampala`, siteName: site.name, url: site.url },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: site.name,
  description: "Verified Japanese and UK car imports in Kampala, Uganda.",
  url: site.url,
  telephone: [site.phone, site.phone2],
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: "Busega, Masaka Road", addressLocality: "Kampala", addressCountry: "UG" },
  openingHours: "Mo-Sa 08:00-18:00",
  makesOffer: inventory.map((c) => ({
    "@type": "Offer",
    priceCurrency: "UGX",
    price: c.price,
    itemOffered: { "@type": "Car", name: `${c.year} ${c.make} ${c.model}`, vehicleTransmission: c.transmission, fuelType: c.fuel },
  })),
};

const motionScript =
  "(function(){try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('anim');window.__lumuMotionFail=setTimeout(function(){d.classList.remove('anim')},4000)}catch(e){}})();";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${data.variable} ${plate.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />

        <div className="ignition" aria-hidden="true">
          <div className="ignition__inner">
            <svg className="ignition__mark" viewBox="0 0 40 40">
              <rect x="1" y="1" width="38" height="38" rx="7" fill="none" stroke="#15171A" strokeWidth="1.6" />
              <path d="M13 10v14h11" fill="none" stroke="#15171A" strokeWidth="2.4" />
              <circle cx="27.5" cy="24" r="3.2" fill="#1F7A4D" />
            </svg>
            <div className="ignition__bar"><i /></div>
            <span className="ignition__label">Lumu — opening the lot</span>
          </div>
        </div>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        <div className="wa-bar">
          <a className="call" href={`tel:${site.phone}`}>Call</a>
          <a className="wa" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
        </div>

        <Experience />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
