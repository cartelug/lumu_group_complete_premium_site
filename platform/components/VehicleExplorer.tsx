"use client";

import { useMemo, useState } from "react";
import type { Vehicle, VehicleCategory } from "@/lib/data";
import VehicleCard from "./VehicleCard";

const FILTERS: { key: VehicleCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "personal", label: "Personal" },
  { key: "family", label: "Family" },
  { key: "executive", label: "Executive" },
  { key: "business", label: "Business" },
];

type Sort = "featured" | "price-asc" | "price-desc";

export default function VehicleExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const [filter, setFilter] = useState<VehicleCategory | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    let out = vehicles.filter((v) => filter === "all" || v.categories.includes(filter));
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    else out = [...out].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return out;
  }, [vehicles, filter, sort]);

  return (
    <div>
      <div className="explorer-bar">
        <div className="filter-row" role="tablist" aria-label="Filter vehicles">
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
          <span>{list.length} vehicle{list.length === 1 ? "" : "s"}</span>
          <select
            aria-label="Sort vehicles"
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
        {list.map((v) => (
          <VehicleCard key={v.slug} v={v} />
        ))}
      </div>
    </div>
  );
}
