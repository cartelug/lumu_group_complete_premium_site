import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicle, getVehicles } from "@/lib/data";
import { formatPrice, site } from "@/lib/site";
import InquiryForm from "@/components/InquiryForm";

export function generateStaticParams() {
  return getVehicles().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) return { title: "Vehicle not found" };
  return {
    title: v.title,
    description: `${v.title} — ${v.condition}, ${v.year}, ${v.transmission}, ${v.fuel}. ${formatPrice(v.price, v.currency)} at Lumu Auto Dealers.`,
    openGraph: { images: [v.image] },
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();

  const specs: [string, string][] = [
    ["Year", String(v.year)],
    ["Body type", v.bodyType],
    ["Transmission", v.transmission],
    ["Fuel", v.fuel],
    ["Condition", v.condition],
    ["Mileage", v.mileageKm ? `${v.mileageKm.toLocaleString()} km` : "—"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: v.title,
    brand: v.make,
    model: v.model,
    vehicleModelDate: String(v.year),
    fuelType: v.fuel,
    vehicleTransmission: v.transmission,
    mileageFromOdometer: v.mileageKm ? { "@type": "QuantitativeValue", value: v.mileageKm, unitCode: "KMT" } : undefined,
    image: v.image,
    offers: { "@type": "Offer", price: v.price, priceCurrency: v.currency, availability: "https://schema.org/InStock", seller: { "@type": "Organization", name: site.name } },
  };

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/auto-dealers/">Auto Dealers</Link><span>/</span><span>{v.title}</span></div>
        <div className="detail-grid mt-24">
          <div>
            <div className="detail-hero" style={{ backgroundImage: `url(${v.image})`, backgroundSize: "cover", backgroundPosition: "center" }} role="img" aria-label={v.title} />
            <h1 className="mt-36">{v.title}</h1>
            <p className="lead mt-24">{v.description}</p>
            <dl className="spec-grid">
              {specs.map(([k, val]) => (
                <div className="spec" key={k}><dt>{k}</dt><dd>{val}</dd></div>
              ))}
            </dl>
            <h3 className="mt-24">Highlights</h3>
            <ul className="amenity-list">
              {v.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
          <aside>
            <div className="detail-aside">
              <span className="chip-status chip-available">Available</span>
              <p className="detail-price mt-24">{formatPrice(v.price, v.currency)}</p>
              <p className="subtle">{v.location} · {v.bodyType}</p>
              <div className="divider" />
              <InquiryForm
                title="Lumu Auto Dealers — Vehicle Inquiry"
                reference={v.title}
                interestOptions={["Buy this vehicle", "Trade-in", "Car importation", "Fleet sourcing", "Test drive / viewing"]}
              />
            </div>
          </aside>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
