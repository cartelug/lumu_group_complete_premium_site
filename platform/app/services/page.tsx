import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { whatsappLink } from "@/lib/site";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Motor vehicle repairs, servicing, computerized diagnostics, engine tuning, brakes, panel beating, genuine spare parts, and fleet & logistics solutions in Kampala.",
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Services</span></div>
            <span className="kicker">What we do</span>
            <h1 className="mt-24">Complete automotive services.</h1>
            <p className="lead mt-24">Everything your vehicle needs under one trusted roof — from routine servicing to diagnostics, bodywork, genuine parts and fleet support.</p>
            <div className="cta-row mt-36">
              <a className="btn btn-primary" href={whatsappLink("Hello Lumu Autodealers, I would like to book a service.")} target="_blank" rel="noopener">Book on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {services.map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>
    </>
  );
}
