import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCars, getCar, carTitle, carWhatsApp, fmtUGX, fmtUSD, fmtKm } from "@/lib/inventory";
import { site, asset } from "@/lib/site";
import { Plate, CarFigure, GradeStamp, Odometer, RouteMap } from "@/components/dealer/ui";
import { WaIcon } from "@/components/dealer/CarCard";

export function generateStaticParams() {
  return getCars().map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const car = getCar(id);
  if (!car) return { title: "Car not found" };
  return {
    title: `${carTitle(car)} — ${fmtUGX(car.price)}`,
    description: `${carTitle(car)} (${car.plate}) in Kampala. ${car.verified ? `Auction grade ${car.grade}, ` : ""}${fmtKm(car.mileageKm)}, ${car.transmission}, ${car.fuel}. Enquire on WhatsApp.`,
  };
}

export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  const others = getCars().filter((c) => c.id !== car.id).slice(0, 3);
  const vehicleLd = {
    "@context": "https://schema.org", "@type": "Car",
    name: carTitle(car), brand: car.make, model: car.model,
    vehicleModelDate: String(car.year), mileageFromOdometer: { "@type": "QuantitativeValue", value: car.mileageKm, unitCode: "KMT" },
    vehicleTransmission: car.transmission, fuelType: car.fuel,
    offers: { "@type": "Offer", price: car.price, priceCurrency: "UGX", availability: car.status === "available" ? "InStock" : "SoldOut" },
  };

  return (
    <>
      <section className="section dossier" style={{ paddingTop: "clamp(110px,16vw,180px)" }}>
        <div className="wrap">
          <Link href={asset("/#lot")} className="data" style={{ color: "var(--steel-soft)", fontSize: ".74rem", letterSpacing: ".1em" }}>← Back to the lot</Link>
          <div className="dossier__grid" style={{ marginTop: 24 }}>
            <div>
              <span className="eyebrow">{car.verified ? `Verified · Grade ${car.grade}` : "Inspection pending"}</span>
              <h2 data-reveal="up">{carTitle(car)}</h2>
              <div style={{ display: "flex", gap: 16, alignItems: "center", margin: "1.2rem 0" }} data-reveal="up">
                <Plate num={car.plate} /><Odometer value={car.mileageKm} />
              </div>
              {car.importRoute && <div data-reveal="up" style={{ marginBottom: "1.4rem" }}><RouteMap stops={car.importRoute} /></div>}
              <div className="dossier__specs">
                {([
                  ["Auction grade", car.verified ? `${car.grade} · verified` : "Pending"],
                  ["Mileage", fmtKm(car.mileageKm)],
                  ["Year", String(car.year)],
                  ["Transmission", car.transmission],
                  ["Fuel", car.fuel],
                  ["Body", car.bodyType],
                  ["Condition", car.condition],
                  ["Price", `${fmtUGX(car.price)}${car.priceUsd ? ` · ${fmtUSD(car.priceUsd)}` : ""}`],
                ] as const).map(([k, v]) => (
                  <div className="row" key={k}><span className="k">{k}</span><span className="dots" /><span className="v">{v}</span></div>
                ))}
              </div>
              <ul className="data" style={{ listStyle: "none", padding: 0, margin: "1.4rem 0", display: "flex", flexWrap: "wrap", gap: "8px 16px", color: "var(--steel-soft)", fontSize: ".8rem" }}>
                {car.keyFeatures.map((f) => <li key={f}>· {f}</li>)}
              </ul>
              {car.status !== "sold" && (
                <a className="btn btn--wa" href={carWhatsApp(car)} target="_blank" rel="noopener"><WaIcon /> Enquire on WhatsApp</a>
              )}
            </div>
            <div className="dossier__fig" style={{ alignSelf: "start" }}>
              <span className="dossier__stamp"><GradeStamp car={car} /></span>
              <CarFigure car={car} tag={`${car.paintName} · placeholder`} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <span className="eyebrow">More on the lot</span>
          <div className="visit__grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: 24 }}>
            {others.map((c) => (
              <Link key={c.id} href={asset(`/cars/${c.id}/`)} className="visit__card" data-reveal="up">
                <CarFigure car={c} tag={c.paintName} />
                <h3 style={{ marginTop: 14 }}>{carTitle(c)}</h3>
                <p className="data muted" style={{ fontSize: ".8rem" }}>{fmtUGX(c.price)} · {fmtKm(c.mileageKm)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleLd) }} />
    </>
  );
}
