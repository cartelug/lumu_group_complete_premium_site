"use client";

import { useEffect, useRef } from "react";

/**
 * Aisha — the Lumu mechanic guide. A flat-vector half-figure docked at the
 * bottom-left whose pointing arm re-aims at the active section heading as you
 * scroll. Pure rAF (no deps), works identically on touch and pointer,
 * decorative (aria-hidden), and never intercepts input (pointer-events:none).
 */
export default function Guide() {
  const armRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const arm = armRef.current;
    if (!arm) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      arm.style.transform = "rotate(0deg)";
      return;
    }

    const targets = () =>
      Array.from(document.querySelectorAll<HTMLElement>("#main h1, #main h2"));
    let cur = 0;
    let raf = 0;
    let active: HTMLElement | null = null;

    const pick = () => {
      const fy = window.innerHeight * 0.4;
      let best: HTMLElement | null = null;
      let bestD = Infinity;
      for (const t of targets()) {
        const r = t.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const d = Math.abs(r.top + r.height / 2 - fy);
        if (d < bestD) { bestD = d; best = t; }
      }
      return best;
    };

    const loop = () => {
      const t = pick();
      if (t && t !== active) {
        if (active) active.classList.remove("guide-look");
        active = t;
        t.classList.add("guide-look");
      }
      // Map the active heading's vertical position to a natural arm swing:
      // heading high in viewport -> arm points up; lower -> arm eases down.
      let goal = 0;
      if (t) {
        const r = t.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (r.top + r.height / 2) / window.innerHeight));
        goal = -52 + ratio * 78; // range ~ -52deg (up) .. +26deg (down)
      }
      cur += (goal - cur) * 0.1;
      arm.style.transform = `rotate(${cur.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const skin = "#7c5234";
  const suit = "#2b3038";
  const suit2 = "#3a414a";
  const hair = "#1d1712";

  return (
    <div className="guide" aria-hidden="true">
      <svg viewBox="0 0 220 250" className="guide__svg" role="presentation">
        <g className="guide__fig">
          {/* hair back + afro */}
          <ellipse cx="110" cy="56" rx="44" ry="36" fill={hair} />
          <circle cx="70" cy="74" r="16" fill={hair} />
          <circle cx="150" cy="74" r="16" fill={hair} />
          {/* head */}
          <circle cx="110" cy="76" r="33" fill={skin} />
          {/* hairline fringe */}
          <path d="M79 60 Q110 40 141 60 Q126 54 110 55 Q94 54 79 60Z" fill={hair} />
          {/* face */}
          <g className="guide__eyes">
            <circle cx="98" cy="78" r="3.6" fill="#16110b" />
            <circle cx="122" cy="78" r="3.6" fill="#16110b" />
          </g>
          <path d="M91 70 Q98 66 104 70" stroke="#16110b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M116 70 Q122 66 129 70" stroke="#16110b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M99 92 Q110 101 121 92" stroke="#3a241a" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* neck */}
          <rect x="100" y="103" width="20" height="18" rx="8" fill={skin} />
          {/* torso / jumpsuit */}
          <path d="M52 250 L52 154 Q52 124 88 118 L132 118 Q168 124 168 154 L168 250 Z" fill={suit} />
          {/* collar + zip */}
          <path d="M88 118 L110 146 L132 118 L122 116 L110 132 L98 116 Z" fill={suit2} />
          <line x1="110" y1="146" x2="110" y2="250" stroke={suit2} strokeWidth="3" />
          {/* chest badge */}
          <rect x="92" y="158" width="34" height="14" rx="3" fill="#ff5a1f" />
          <text x="109" y="168" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#fff">LUMU</text>
          {/* left arm + wrench */}
          <path d="M70 132 Q50 168 52 206" stroke={suit} strokeWidth="22" fill="none" strokeLinecap="round" />
          <circle cx="52" cy="208" r="12" fill={skin} />
          <rect x="40" y="196" width="9" height="30" rx="4" transform="rotate(34 44 211)" fill="#9aa0a6" />
          <circle cx="40" cy="198" r="6" fill="none" stroke="#9aa0a6" strokeWidth="4" />
          {/* RIGHT ARM — the pointing rig (pivots at the shoulder) */}
          <g className="guide__arm" ref={armRef}>
            <path d="M150 130 Q172 112 188 92" stroke={suit} strokeWidth="20" fill="none" strokeLinecap="round" />
            <circle cx="190" cy="90" r="11" fill={skin} />
            <rect x="186" y="64" width="9" height="28" rx="4.5" transform="rotate(34 190 78)" fill={skin} />
            <circle className="guide__ping" cx="206" cy="62" r="4" fill="#ff5a1f" />
          </g>
        </g>
      </svg>
    </div>
  );
}
