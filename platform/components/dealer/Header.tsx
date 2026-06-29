"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, asset } from "@/lib/site";
import { whatsappLink } from "@/lib/site";
import { Mark } from "./ui";
import { WaIcon } from "./CarCard";

const links = [
  { href: "#lot", label: "Showroom" },
  { href: "#featured", label: "Featured" },
  { href: "#why", label: "Why Lumu" },
  { href: "#finance", label: "Finance" },
  { href: "#visit", label: "Visit" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`dh ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap dh__row">
        <Link className="dh__brand" href={asset("/")} aria-label="Lumu Auto Dealers — home">
          <Mark className="dh__mark" /> Lumu
        </Link>
        <nav className="dh__nav" aria-label="Primary">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <a className="dh__cta btn btn--wa" href={whatsappLink("Hi Lumu, I'd like to ask about a car.")} target="_blank" rel="noopener">
          <WaIcon /> WhatsApp
        </a>
        <button className="dh__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <i /><i /><i />
        </button>
      </div>

      {open && (
        <div className="dh__sheet" role="dialog" aria-modal="true"
          style={{ position: "fixed", inset: 0, top: 64, background: "var(--paper)", zIndex: 59,
            display: "grid", alignContent: "start", gap: 4, padding: "20px var(--gut)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontFamily: "var(--f-display)", fontSize: "2rem", padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--wa" style={{ marginTop: 18, justifyContent: "center" }}
            href={whatsappLink("Hi Lumu, I'd like to ask about a car.")} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
            <WaIcon /> WhatsApp us
          </a>
          <p className="data" style={{ color: "var(--steel)", marginTop: 16, fontSize: ".8rem" }}>{site.location}</p>
        </div>
      )}
    </header>
  );
}
