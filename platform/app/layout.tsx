import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { site, asset, brands, whatsappLink } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import ScrollUI from "@/components/ScrollUI";
import RevealManager from "@/components/RevealManager";
import Preloader from "@/components/Preloader";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";

const display = Archivo({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"], display: "swap" });

export const viewport: Viewport = { themeColor: "#f5f5f2" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Auto Repairs, Servicing & Logistics`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Lumu Autodealers & Logistics Ltd — professional motor vehicle repairs, servicing, diagnostics, spare parts and logistics in Kampala. Built on trust. Book on WhatsApp.",
  manifest: asset("/manifest.webmanifest"),
  icons: { icon: asset("/favicon.svg") },
  openGraph: {
    type: "website",
    title: `${site.name} | Auto Repairs, Servicing & Logistics`,
    description: "Professional automotive repairs, servicing, spare parts and logistics in Kampala — built on trust.",
    url: site.url,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  description: "Professional motor vehicle repairs, servicing, diagnostics, spare parts and logistics.",
  url: site.url,
  telephone: [site.phone, site.phone2],
  email: site.email,
  foundingDate: String(site.since),
  slogan: site.tagline,
  address: { "@type": "PostalAddress", streetAddress: "Busega, Masaka Road", addressLocality: "Kampala", addressCountry: "UG" },
  areaServed: "Kampala, Uganda",
  openingHours: "Mo-Sa 08:00-18:00",
  brand: brands,
  makesOffer: brands,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Preloader />
        <a className="skip-link" href="#main">Skip to content</a>

        <div className="topbar">
          <div className="container topbar-row">
            <div className="topbar-contact">
              <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
              <span className="topbar-sep" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="topbar-meta">
              <span>{site.location}</span>
              <span className="topbar-sep" />
              <span>{site.hours}</span>
            </div>
          </div>
        </div>

        <SiteHeader />

        <main id="main">{children}</main>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <Link className="brand" href="/" aria-label="Lumu Autodealers home">
                  <Logo sub="& Logistics Ltd" />
                </Link>
                <p className="mt-24">{site.promise}</p>
                <div className="cta-row mt-24">
                  <Link className="btn btn-primary" href="/contact/#book">Book a service</Link>
                  <a className="btn btn-ghost" href={`tel:${site.phone}`}>Call us</a>
                </div>
              </div>
              <div><h3>Services</h3><Link href="/services/repairs-servicing/">Repairs &amp; Servicing</Link><Link href="/services/computerized-diagnostics/">Diagnostics</Link><Link href="/services/genuine-spare-parts/">Spare Parts</Link><Link href="/fleet/">Fleet &amp; Logistics</Link></div>
              <div><h3>Company</h3><Link href="/about/">About Lumu</Link><Link href="/real-estate/">Real Estate</Link><Link href="/services/">All services</Link><Link href="/contact/">Contact</Link></div>
              <div>
                <h3>Visit / Contact</h3>
                <p className="subtle" style={{ margin: "10px 0" }}>{site.addressLine}</p>
                <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
                <a href={`tel:${site.phone2}`}>{site.phone2Display}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
            <div className="bottom">
              <span>© {year} {site.name}. All rights reserved.</span>
              <span>{site.promise}</span>
            </div>
          </div>
        </footer>

        <div className="mobile-actions">
          <a href={`tel:${site.phone}`}>Call</a>
          <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>
        </div>

        <a
          className="wa-fab"
          href={whatsappLink("Hello Lumu Autodealers, I have a question.")}
          target="_blank"
          rel="noopener"
          aria-label="Chat with Lumu Autodealers on WhatsApp"
        >
          <span className="wa-fab-ring" aria-hidden="true" />
          <Icon name="chat" size={26} />
          <span className="wa-fab-label">Chat with us</span>
        </a>

        <ScrollUI />
        <RevealManager />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
