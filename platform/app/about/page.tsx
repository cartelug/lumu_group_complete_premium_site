import type { Metadata } from "next";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Lumu Autodealers & Logistics Ltd has provided trusted motor vehicle repairs, servicing and logistics in Kampala since 2018 — built on honest work and quality service.",
};

export default function AboutPage() {
  const years = new Date().getFullYear() - site.since;
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>About</span></div>
            <span className="kicker">About us · Since {site.since}</span>
            <h1 className="mt-24">An automotive partner built on trust.</h1>
            <p className="lead mt-24">Since {site.since}, Lumu Autodealers &amp; Logistics Ltd has helped Ugandan drivers and businesses keep their vehicles running with professional repairs, servicing, diagnostics and genuine parts.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-24">Honest work and lasting relationships.</h2>
            <p className="lead">We know most car owners worry about trust first — fair pricing, genuine parts and a job done properly. That&apos;s exactly what we&apos;re built on. Every repair starts with a clear diagnosis and a quote you approve before we begin.</p>
            <div className="trust-pills mt-36">
              <span className="trust-pill"><b>{years}+</b> years serving Kampala</span>
              <span className="trust-pill">Computerized diagnostics</span>
              <span className="trust-pill">Qualified technicians</span>
              <span className="trust-pill">Genuine parts</span>
            </div>
          </div>
          <div className="grid grid-2">
            <article className="card card-pad reveal"><span className="icon-pill">🏆</span><h3 className="mt-24">Established 2018</h3><p className="subtle">A proven track record of dependable automotive care.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">💻</span><h3 className="mt-24">Modern equipment</h3><p className="subtle">Computerized diagnostics for accurate, faster repairs.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">👨‍🔧</span><h3 className="mt-24">Skilled technicians</h3><p className="subtle">Experienced mechanics who know your vehicle.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">🧩</span><h3 className="mt-24">Genuine parts</h3><p className="subtle">Quality, brand-matched parts you can rely on.</p></article>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow eyebrow-light">Our promise</span>
            <h2 className="mt-24">{site.promise}</h2>
          </div>
          <div className="grid grid-3 mt-56">
            <article className="card card-pad reveal"><h3>Quality service</h3><p className="subtle">We do the job properly, with the right tools and parts.</p></article>
            <article className="card card-pad reveal"><h3>Honest work</h3><p className="subtle">Clear quotes, fair prices and no unnecessary repairs.</p></article>
            <article className="card card-pad reveal"><h3>Lasting relationships</h3><p className="subtle">We earn your trust so you come back — and tell others.</p></article>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <span className="eyebrow eyebrow-light">{site.tagline}</span>
          <h2 className="mt-24">Experience automotive care you can trust.</h2>
          <div className="cta-row cta-center mt-36">
            <a className="btn btn-primary" href={whatsappLink("Hello Lumu Autodealers, I would like to book a service.")} target="_blank" rel="noopener">Book on WhatsApp</a>
            <Link className="btn btn-outline-light" href="/services/">Our services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
