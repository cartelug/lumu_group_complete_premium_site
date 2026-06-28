import type { Metadata } from "next";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Fleet & Logistics",
  description: "Fleet servicing and logistics solutions for companies, NGOs, schools and delivery operators in Kampala — scheduled maintenance, priority turnaround and genuine parts.",
};

export default function FleetPage() {
  const wa = whatsappLink("Hello Lumu Autodealers, I would like to discuss a fleet / company vehicle service plan.");
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Fleet &amp; Logistics</span></div>
            <span className="kicker">For businesses</span>
            <h1 className="mt-24">Keep your fleet on the road.</h1>
            <p className="lead mt-24">Dedicated servicing and logistics for company cars, school vans, NGO vehicles and delivery fleets — scheduled maintenance, priority turnaround and dependable parts supply.</p>
            <div className="cta-row mt-36">
              <a className="btn btn-primary" href={wa} target="_blank" rel="noopener">Discuss a service plan</a>
              <a className="btn btn-ghost" href={`tel:${site.phone}`}>Call us</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <article className="card card-pad reveal"><span className="icon-pill">📋</span><h3 className="mt-24">Scheduled servicing</h3><p className="subtle">Planned maintenance that prevents costly, unexpected breakdowns.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">⏱️</span><h3 className="mt-24">Priority turnaround</h3><p className="subtle">Your vehicles are a priority — minimal downtime, fast service.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">🧩</span><h3 className="mt-24">Genuine parts supply</h3><p className="subtle">Quality, brand-matched parts supplied and fitted for every unit.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">🚚</span><h3 className="mt-24">Logistics support</h3><p className="subtle">Practical logistics solutions to keep operations moving.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">💻</span><h3 className="mt-24">Computerized diagnostics</h3><p className="subtle">Accurate fault-finding so problems are fixed right the first time.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">🤝</span><h3 className="mt-24">One trusted partner</h3><p className="subtle">A single, reliable garage for your whole fleet — built on trust.</p></article>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow eyebrow-light">Start a conversation</span>
            <h2 className="mt-24">Tell us about your fleet.</h2>
            <p className="lead">Share how many vehicles you run and what you need — we&apos;ll propose a simple service plan that fits your operation and budget.</p>
            <div className="cta-row mt-36"><a className="btn btn-primary" href={wa} target="_blank" rel="noopener">Message on WhatsApp</a></div>
          </div>
          <InquiryForm title="Lumu Autodealers — Fleet Inquiry" service="Fleet & Logistics Solutions" />
        </div>
      </section>
    </>
  );
}
