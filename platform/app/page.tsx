import Link from "next/link";
import { site, asset, whatsappLink } from "@/lib/site";
import {
  getCars, featuredCar, carTitle, carWhatsApp, fmtUGX, fmtUSD, fmtKm,
} from "@/lib/inventory";
import CarCard, { WaIcon } from "@/components/dealer/CarCard";
import FinanceEstimator from "@/components/dealer/FinanceEstimator";
import { Plate, CarFigure, GradeStamp, Odometer, RouteMap } from "@/components/dealer/ui";

const why = [
  { h: "Verified at the auction", p: "We buy from Japanese and UK auctions and show you the inspection grade on every verified car — not a sales pitch, the actual sheet.", note: null },
  { h: "Mileage you can check", p: "The reading on each verified car comes from its auction sheet, and you can see it on the odometer in person.", note: null },
  { h: "Paperwork before you pay", p: "Logbook, import and customs documents are here to inspect before any money changes hands.", note: null },
  { h: "Inspection on arrival", p: "Each unit is checked when it lands in Kampala.", note: "Confirm your exact inspection checklist and I'll list it here." },
  { h: "After-sales & warranty", p: "Service support after you drive away.", note: "Send real warranty terms (duration / what's covered) to replace this." },
];

const flow = [
  { h: "Choose", p: "Browse the lot or tell us what you want on WhatsApp." },
  { h: "Verify", p: "See the grade, mileage and import papers in person." },
  { h: "Reserve", p: "Place a deposit to hold the car while you arrange payment." },
  { h: "Finance", p: "Pay outright or spread it with a financing partner." },
  { h: "Handover", p: "Registered, plated and yours — keys and documents in hand." },
];

export default function Showroom() {
  const car = featuredCar();
  const cars = getCars();

  return (
    <>
      {/* ── Arrival ───────────────────────────────── */}
      <section className="section arrival">
        <div className="wrap arrival__grid">
          <div>
            <span className="eyebrow">{car.verified ? `Verified import · Grade ${car.grade}` : "This week on the lot"}</span>
            <h1 data-split>Imported, inspected, and <span className="red">registered</span> for you.</h1>
            <p className="lead" style={{ marginTop: "1.4rem" }} data-reveal="up">
              Verified Japanese and UK cars in Kampala. Every one shows its grade, its mileage and the road it travelled to get here.
            </p>
            <div className="arrival__meta" data-reveal="up">
              {car.importRoute && <RouteMap stops={car.importRoute} />}
              <Odometer value={car.mileageKm} />
            </div>
            <div className="arrival__cta" data-reveal="up">
              <a className="btn btn--wa" href={carWhatsApp(car)} target="_blank" rel="noopener"><WaIcon /> Enquire on WhatsApp</a>
              <a className="btn btn--ghost" href="#lot">Browse the lot</a>
            </div>
            <dl className="spec-rail" data-reveal="up">
              <div><dt>Price</dt><dd>{fmtUGX(car.price)}</dd></div>
              <div><dt>Gearbox</dt><dd>{car.transmission}</dd></div>
              <div><dt>Fuel</dt><dd>{car.fuel}</dd></div>
            </dl>
          </div>
          <div className="arrival__stage">
            <Plate num={car.plate} className="arrival__plate" />
            <div style={{ position: "relative" }}>
              <span className="figure__stamp"><GradeStamp car={car} /></span>
              <CarFigure car={car} tag={`${carTitle(car)} · ${car.paintName}`} />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Lot ───────────────────────────────── */}
      <section className="section section--tight" id="lot">
        <div className="wrap">
          <div className="lot__head">
            <div>
              <span className="eyebrow">The lot · {cars.length} cars</span>
              <h2 data-reveal="up">Drag through the showroom.</h2>
            </div>
            <span className="data muted" data-reveal="up" style={{ fontSize: ".75rem" }}>← swipe / drag →</span>
          </div>
        </div>
        <div className="wrap" data-lenis-prevent>
          <div className="lot__rail">
            {cars.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        </div>
      </section>

      {/* ── Featured dossier (pinned) ─────────────── */}
      <section className="section dossier" id="featured" data-pin>
        <div className="wrap dossier__grid">
          <div>
            <span className="eyebrow">Featured dossier</span>
            <h2 data-reveal="up">{carTitle(car)}</h2>
            <p className="lead" data-reveal="up" style={{ color: "var(--steel-soft)" }}>
              {car.paintName}. {car.keyFeatures.slice(0, 3).join(", ")}. Here&apos;s the full record.
            </p>
            <div className="dossier__specs">
              {([
                ["Auction grade", car.verified ? `${car.grade} · verified` : "Pending inspection"],
                ["Mileage", fmtKm(car.mileageKm)],
                ["Year", String(car.year)],
                ["Transmission", car.transmission],
                ["Fuel", car.fuel],
                ["Body", car.bodyType],
                ["Route", car.importRoute ? car.importRoute.join(" → ") : "Local"],
                ["Price", `${fmtUGX(car.price)}${car.priceUsd ? ` · ${fmtUSD(car.priceUsd)}` : ""}`],
              ] as const).map(([k, v]) => (
                <div className="row" key={k}><span className="k">{k}</span><span className="dots" /><span className="v">{v}</span></div>
              ))}
            </div>
            <div className="arrival__cta" data-reveal="up">
              <a className="btn btn--wa" href={carWhatsApp(car)} target="_blank" rel="noopener"><WaIcon /> Enquire on WhatsApp</a>
              <Link className="btn btn--ghost" href={asset(`/cars/${car.id}/`)}>Full dossier</Link>
            </div>
          </div>
          <div className="dossier__fig">
            <span className="dossier__stamp"><GradeStamp car={car} /></span>
            <CarFigure car={car} tag={`${car.paintName} · placeholder`} />
          </div>
        </div>
      </section>

      {/* ── Why Lumu ──────────────────────────────── */}
      <section className="section" id="why">
        <div className="wrap">
          <span className="eyebrow">Why Lumu</span>
          <h2 style={{ maxWidth: "16ch" }} data-reveal="up">Trust isn&apos;t a slogan. It&apos;s the paperwork.</h2>
          <div className="spine__list" style={{ marginTop: "2.4rem" }}>
            {why.map((w, i) => (
              <div className="spine__item" data-reveal="up" key={w.h}>
                <span className="spine__tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12.5l4 4L19 7" /></svg>
                </span>
                <div>
                  <span className="spine__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{w.h}</h3>
                  <p>{w.p}</p>
                  {w.note && <span className="ph-note">Needs your input · {w.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How buying & finance works ────────────── */}
      <section className="section section--tight" id="finance" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h2 data-reveal="up">From the lot to your plate.</h2>
          <div className="flow__grid" style={{ marginTop: "2.2rem" }}>
            {flow.map((s) => (
              <div className="flow__step" data-reveal="up" key={s.h}>
                <h3>{s.h}</h3><p>{s.p}</p>
              </div>
            ))}
          </div>
          <FinanceEstimator />
        </div>
      </section>

      {/* ── Visit ─────────────────────────────────── */}
      <section className="section" id="visit">
        <div className="wrap">
          <span className="eyebrow">Visit the showroom</span>
          <h2 data-reveal="up" style={{ marginBottom: "2rem" }}>Find us on Masaka Road.</h2>
          <div className="visit__grid">
            <div className="visit__card" data-reveal="up">
              <h3>{site.name}</h3>
              <p className="data" style={{ color: "var(--verified)" }}>Open · {site.hours}</p>
              <p className="k">Address</p><p>{site.addressLine}</p>
              <p className="k">Phone</p><p className="data">{site.phoneDisplay} · {site.phone2Display}</p>
              <div className="arrival__cta" style={{ marginTop: 22 }}>
                <a className="btn btn--wa" href={whatsappLink("Hi Lumu, I'd like directions to the showroom.")} target="_blank" rel="noopener"><WaIcon /> WhatsApp us</a>
                <a className="btn btn--ghost" href="https://www.google.com/maps/search/?api=1&query=Busega+Masaka+Road+Kampala" target="_blank" rel="noopener">Directions</a>
              </div>
            </div>
            <div className="visit__map" data-reveal="up" aria-label="Map placeholder — Busega, Masaka Road">
              <span className="visit__pin">📍 {site.location}<br /><span className="muted">Exact pin on confirmation</span></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
