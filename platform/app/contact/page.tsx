import type { Metadata } from "next";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description: "Book a service or get a quote from Lumu Autodealers & Logistics Ltd, Busega – Masaka Road, Kampala. WhatsApp, call or send a request online.",
};

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Lumu+Autodealers+Busega+Masaka+Road+Kampala";

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Contact</span></div>
            <span className="kicker">Contact &amp; booking</span>
            <h1 className="mt-24">Book a service or get a quote.</h1>
            <p className="lead mt-24">The fastest way to reach us is WhatsApp. Tell us your vehicle and the problem, and we&apos;ll reply with availability and an estimate.</p>
            <div className="cta-row mt-36">
              <a className="btn btn-primary" data-magnetic href={whatsappLink("Hello Lumu Autodealers, I would like to book a service / get a quote.")} target="_blank" rel="noopener">WhatsApp us</a>
              <a className="btn btn-ghost" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <aside className="reveal">
            <div className="contact-card">
              <span className="kicker">Contact details</span>
              <h2 className="h3 mt-24">{site.name}</h2>
              <p className="subtle">{site.tagline} · Since {site.since}</p>
              <div className="divider" />
              <p><b>Phone</b><br />{site.phoneDisplay}<br />{site.phone2Display}</p>
              <p><b>WhatsApp</b><br />{site.phoneDisplay}</p>
              <p><b>Email</b><br />{site.email}</p>
              <p><b>Location</b><br />{site.addressLine}</p>
              <p><b>Hours</b><br />{site.hours}</p>
            </div>
            <div className="map-card mt-24">
              <div className="map-pin">📍 {site.location}<br /><a className="subtle" href={mapsUrl} target="_blank" rel="noopener" style={{ color: "var(--orange-300)" }}>Get directions →</a></div>
            </div>
          </aside>
          <div id="book">
            <InquiryForm title="Lumu Autodealers — Service Request" />
          </div>
        </div>
      </section>
    </>
  );
}
