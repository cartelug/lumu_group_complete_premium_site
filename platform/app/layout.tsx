import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { site, asset } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import ScrollUI from "@/components/ScrollUI";
import RevealManager from "@/components/RevealManager";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#0a0807" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Lumu Group of Companies connects customers to Lumu Auto Dealers and Lumu Real Estate — browse real vehicles and properties and send a clear inquiry in one tap.",
  manifest: asset("/manifest.webmanifest"),
  icons: { icon: asset("/favicon.svg") },
  openGraph: {
    type: "website",
    title: `${site.name} | ${site.tagline}`,
    description: "Browse real vehicles and properties from Lumu Auto Dealers and Lumu Real Estate.",
    url: site.url,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body data-whatsapp={site.phone}>
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
              <span>{site.tagline}</span>
            </div>
          </div>
        </div>

        <SiteHeader />

        <main id="main">{children}</main>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset("/assets/images/logo-lumu.svg")} width={260} height={72} alt={site.name} />
                <p className="mt-24">A trusted group company helping customers move confidently across vehicle ownership and real estate decisions.</p>
                <div className="cta-row mt-24">
                  <Link className="btn btn-primary" href="/contact/#inquiry">Send inquiry</Link>
                  <Link className="btn btn-ghost" href="/auto-dealers/">Browse vehicles</Link>
                </div>
              </div>
              <div><h3>Company</h3><Link href="/about/">About Lumu</Link><Link href="/contact/">Contact</Link><Link href="/real-estate/">Real Estate</Link></div>
              <div><h3>Auto Dealers</h3><Link href="/auto-dealers/">All vehicles</Link><Link href="/auto-dealers/">Importation</Link><Link href="/auto-dealers/">Fleet sourcing</Link></div>
              <div><h3>Real Estate</h3><Link href="/real-estate/">All properties</Link><Link href="/real-estate/">List property</Link><Link href="/real-estate/">Investment</Link></div>
            </div>
            <div className="bottom">
              <span>© {year} {site.name}. All rights reserved.</span>
              <span>Built for performance, clarity and mobile-first inquiries.</span>
            </div>
          </div>
        </footer>

        <div className="mobile-actions">
          <a href={`tel:${site.phone}`}>Call</a>
          <a href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>
        </div>

        <ScrollUI />
        <RevealManager />
      </body>
    </html>
  );
}
