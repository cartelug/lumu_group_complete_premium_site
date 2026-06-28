import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Lumu Group for vehicle inquiries, property inquiries, listings, fleet sourcing and investment guidance.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Contact</span></div>
            <span className="kicker">Contact Lumu Group</span>
            <h1 className="mt-24">Start with a clear inquiry.</h1>
            <p className="lead mt-24">Choose vehicle help, property help, listing support or investment guidance — the form turns your details into a professional WhatsApp-ready message.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <aside className="reveal">
            <div className="contact-card">
              <span className="kicker">Contact details</span>
              <h2 className="h3 mt-24">{site.name}</h2>
              <p className="subtle">Placeholders below until official details are confirmed.</p>
              <div className="divider" />
              <p><b>Phone</b><br />{site.phoneDisplay}</p>
              <p><b>WhatsApp</b><br />{site.phone}</p>
              <p><b>Email</b><br />{site.email}</p>
              <p><b>Location</b><br />{site.location}</p>
            </div>
          </aside>
          <div id="inquiry">
            <InquiryForm title="Lumu Group Contact Inquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
