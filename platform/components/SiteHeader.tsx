"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { asset } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/auto-dealers/", label: "Auto Dealers" },
  { href: "/real-estate/", label: "Real Estate" },
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
        <Link className="brand" href="/" aria-label="Lumu Group of Companies home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/assets/images/logo-lumu.svg")} width={260} height={72} alt="Lumu Group of Companies" />
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`} aria-label="Primary navigation">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="btn btn-soft" href="/contact/#inquiry">Start inquiry</Link>
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
