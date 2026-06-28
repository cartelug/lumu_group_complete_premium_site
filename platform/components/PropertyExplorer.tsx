"use client";

import { useMemo, useState } from "react";
import type { Property, ListingType } from "@/lib/data";
import PropertyCard from "./PropertyCard";

const FILTERS: { key: ListingType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "invest", label: "Invest" },
];

type Sort = "featured" | "price-asc" | "price-desc";

export default function PropertyExplorer({ properties }: { properties: Property[] }) {
  const [filter, setFilter] = useState<ListingType | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    let out = properties.filter((p) => filter === "all" || p.listingType.includes(filter));
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    else out = [...out].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return out;
  }, [properties, filter, sort]);

  return (
    <div>
      <div className="explorer-bar">
        <div className="filter-row" role="tablist" aria-label="Filter properties">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter${filter === f.key ? " active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="explorer-count" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span>{list.length} propert{list.length === 1 ? "y" : "ies"}</span>
          <select
            aria-label="Sort properties"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            style={{ background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--line-strong)", borderRadius: 10, padding: "10px 12px", fontWeight: 600 }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>
      <div className="listing-grid">
        {list.map((p) => (
          <PropertyCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}
