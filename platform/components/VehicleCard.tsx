"use client";

import Link from "next/link";
import type { Vehicle } from "@/lib/data";
import { formatPrice } from "@/lib/site";

export default function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <Link className="lcard" href={`/vehicles/${v.slug}/`}>
      <div className="lcard-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={v.image}
          alt={v.title}
          loading="lazy"
          onError={(e) => {
            const t = e.currentTarget;
            t.onerror = null;
            t.src = v.fallback;
          }}
        />
        <span className="lcard-badge">{v.condition}</span>
      </div>
      <div className="lcard-body">
        <div>
          <h3 className="lcard-title">{v.title}</h3>
          <p className="lcard-loc">{v.year} · {v.bodyType} · {v.location}</p>
        </div>
        <div className="lcard-meta">
          <span className="mini">{v.transmission}</span>
          <span className="mini">{v.fuel}</span>
          {v.mileageKm && <span className="mini">{v.mileageKm.toLocaleString()} km</span>}
        </div>
        <div className="lcard-price">{formatPrice(v.price, v.currency)}</div>
      </div>
      <div className="lcard-foot">
        <span className="chip-status chip-available">Available</span>
        <span className="lcard-cta">View details →</span>
      </div>
    </Link>
  );
}
