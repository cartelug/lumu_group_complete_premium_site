import Link from "next/link";
import { type Car, carTitle, carWhatsApp, fmtUGX, fmtUSD, fmtKm } from "@/lib/inventory";
import { asset } from "@/lib/site";
import { CarFigure, Plate, GradeStamp } from "./ui";

export default function CarCard({ car }: { car: Car }) {
  const sold = car.status === "sold";
  return (
    <article className="car-card" data-reveal="up">
      <div className="car-card__media">
        {car.status !== "available" && (
          <span className={`car-card__status ${car.status}`}>{car.status}</span>
        )}
        <span className="figure__stamp" style={{ position: "absolute", right: 10, top: 10, zIndex: 2 }}>
          <GradeStamp car={car} />
        </span>
        <CarFigure car={car} tag={`${car.condition} · ${car.paintName}`} />
      </div>
      <div className="car-card__body">
        <div className="car-card__title">
          <h3>{carTitle(car)}</h3>
          <Plate num={car.plate} />
        </div>
        <div className="car-card__specs">
          <span>{fmtKm(car.mileageKm)}</span>
          <span>{car.transmission}</span>
          <span>{car.fuel}</span>
          <span>{car.bodyType}</span>
        </div>
        <div className="car-card__price">
          {fmtUGX(car.price)}
          {car.priceUsd && <small>≈ {fmtUSD(car.priceUsd)}</small>}
        </div>
        <div className="car-card__foot">
          <Link className="btn btn--ghost" href={asset(`/cars/${car.id}/`)}>View dossier</Link>
          {!sold && (
            <a className="btn btn--wa" href={carWhatsApp(car)} target="_blank" rel="noopener">
              <WaIcon /> Enquire
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 0 1 12 4zm-2.5 4c-.2 0-.5 0-.7.3-.3.3-1 .9-1 2.2s1 2.6 1.1 2.8c.2.2 2 3.2 5 4.3 2.4.9 2.9.7 3.5.7s1.7-.7 2-1.4c.2-.6.2-1.2.1-1.3l-.6-.3s-1.5-.7-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.8-.7-1.4-1.6-1.6-1.9s0-.4.1-.6l.5-.5.3-.5v-.5L10.2 8.3c-.2-.4-.4-.3-.6-.3z" />
    </svg>
  );
}
