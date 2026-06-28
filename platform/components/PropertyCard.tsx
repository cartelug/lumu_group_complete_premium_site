"use client";

import Link from "next/link";
import type { Property } from "@/lib/data";
import { formatPrice } from "@/lib/site";

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <Link className="lcard" href={`/properties/${p.slug}/`}>
      <div className="lcard-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          onError={(e) => {
            const t = e.currentTarget;
            t.onerror = null;
            t.src = p.fallback;
          }}
        />
        <span className="lcard-badge">{p.type}</span>
      </div>
      <div className="lcard-body">
        <div>
          <h3 className="lcard-title">{p.title}</h3>
          <p className="lcard-loc">{p.location}</p>
        </div>
        <div className="lcard-meta">
          {p.beds != null && <span className="mini">{p.beds} bed</span>}
          {p.baths != null && <span className="mini">{p.baths} bath</span>}
          {p.sizeLabel && <span className="mini">{p.sizeLabel}</span>}
        </div>
        <div className="lcard-price">
          {formatPrice(p.price, p.currency)}
          {p.priceNote && <small> {p.priceNote}</small>}
        </div>
      </div>
      <div className="lcard-foot">
        <span className="chip-status chip-available">Available</span>
        <span className="lcard-cta">View details →</span>
      </div>
    </Link>
  );
}
