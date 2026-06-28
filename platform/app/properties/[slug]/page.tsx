import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperty, getProperties } from "@/lib/data";
import { formatPrice, site } from "@/lib/site";
import InquiryForm from "@/components/InquiryForm";

export function generateStaticParams() {
  return getProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return { title: "Property not found" };
  return {
    title: p.title,
    description: `${p.title} — ${p.type} in ${p.location}. ${formatPrice(p.price, p.currency)}${p.priceNote ? " " + p.priceNote : ""} at Lumu Real Estate.`,
    openGraph: { images: [p.image] },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const specs: [string, string][] = [
    ["Type", p.type],
    ["Location", p.location],
    ["Bedrooms", p.beds != null ? String(p.beds) : "—"],
    ["Bathrooms", p.baths != null ? String(p.baths) : "—"],
    ["Size", p.sizeLabel ?? "—"],
    ["Tenure", p.tenure ?? "—"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: p.title,
    image: p.image,
    address: { "@type": "PostalAddress", addressLocality: p.location, addressCountry: "UG" },
    offers: { "@type": "Offer", price: p.price, priceCurrency: p.currency, availability: "https://schema.org/InStock", seller: { "@type": "Organization", name: site.name } },
  };

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/real-estate/">Real Estate</Link><span>/</span><span>{p.title}</span></div>
        <div className="detail-grid mt-24">
          <div>
            <div className="detail-hero" style={{ backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center" }} role="img" aria-label={p.title} />
            <h1 className="mt-36">{p.title}</h1>
            <p className="lead mt-24">{p.description}</p>
            <dl className="spec-grid">
              {specs.map(([k, val]) => (
                <div className="spec" key={k}><dt>{k}</dt><dd>{val}</dd></div>
              ))}
            </dl>
            <h3 className="mt-24">Amenities</h3>
            <ul className="amenity-list">
              {p.amenities.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <aside>
            <div className="detail-aside">
              <span className="chip-status chip-available">Available</span>
              <p className="detail-price mt-24">{formatPrice(p.price, p.currency)}{p.priceNote && <small> {p.priceNote}</small>}</p>
              <p className="subtle">{p.type} · {p.location}</p>
              <div className="divider" />
              <InquiryForm
                title="Lumu Real Estate — Property Inquiry"
                reference={p.title}
                interestOptions={["Buy this property", "Rent this property", "Book a viewing", "Investment guidance"]}
              />
            </div>
          </aside>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
