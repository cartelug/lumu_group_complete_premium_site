"use client";

import { useMemo, useState } from "react";
import { featuredCar, fmtUGX } from "@/lib/inventory";

// EXAMPLE estimate only. Replace EXAMPLE_APR with Lumu's real partner rate
// before this goes in front of buyers — see the note rendered below.
const EXAMPLE_APR = 0.22;

export default function FinanceEstimator() {
  const base = featuredCar().price;
  const [price, setPrice] = useState(base);
  const [depositPct, setDepositPct] = useState(30);
  const [months, setMonths] = useState(36);

  const monthly = useMemo(() => {
    const principal = price * (1 - depositPct / 100);
    const r = EXAMPLE_APR / 12;
    const m = (principal * r) / (1 - Math.pow(1 + r, -months));
    return Math.round(m);
  }, [price, depositPct, months]);

  return (
    <>
      <div className="finance" data-reveal="up">
        <div className="field">
          <label htmlFor="fe-price">Car price (UGX)</label>
          <input id="fe-price" type="number" min={5_000_000} step={1_000_000}
            value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} />
        </div>
        <div className="field">
          <label htmlFor="fe-dep">Deposit ({depositPct}%)</label>
          <input id="fe-dep" type="range" min={10} max={70} step={5}
            value={depositPct} onChange={(e) => setDepositPct(Number(e.target.value))} />
        </div>
        <div className="field">
          <label htmlFor="fe-term">Term</label>
          <select id="fe-term" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
            <option value={12}>12 months</option>
            <option value={24}>24 months</option>
            <option value={36}>36 months</option>
            <option value={48}>48 months</option>
          </select>
        </div>
        <div className="finance__out">
          {fmtUGX(monthly)}<small>/ month · example only</small>
        </div>
      </div>
      <p className="ph-note" style={{ marginTop: 14 }}>
        Placeholder rate — send me Lumu&apos;s real financing partner &amp; APR and this becomes a true estimate.
      </p>
    </>
  );
}
