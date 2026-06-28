"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/fleet/", label: "Fleet" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container nav">
        <Link className="brand" href="/" aria-label="Lumu Autodealers home">
          <span className="brandmark" aria-hidden="true">L</span>
          <span className="brandtext">Lumu <b>Autodealers</b><small>Built on Trust</small></span>
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`} aria-label="Primary navigation">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="btn btn-soft" href="/contact/#book">Book a service</Link>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
