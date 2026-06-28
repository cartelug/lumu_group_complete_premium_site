import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Lumu Group of Companies is a trusted parent brand with two focused divisions: Lumu Auto Dealers and Lumu Real Estate.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>About</span></div>
            <span className="kicker">About Lumu Group</span>
            <h1 className="mt-24">A serious group brand, built for growth and trust.</h1>
            <p className="lead mt-24">Lumu Group of Companies presents Auto Dealers and Real Estate as two focused divisions under one organized, credible parent company.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow">Brand position</span>
            <h2 className="mt-24">More than a dealership. A growing group.</h2>
            <p className="lead">The parent company carries trust, while each division speaks directly to its customers — vehicles on one side, property on the other, one standard across both.</p>
          </div>
          <div className="grid grid-2">
            <article className="card card-pad reveal"><span className="icon-pill">G</span><h3 className="mt-24">Group identity</h3><p className="subtle">A central brand that looks organized and ready to scale.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">D</span><h3 className="mt-24">Clear divisions</h3><p className="subtle">Auto and property paths are separated for easier decisions.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">T</span><h3 className="mt-24">Trust language</h3><p className="subtle">Clarity, guidance and professional follow-through throughout.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill">M</span><h3 className="mt-24">Mobile-first</h3><p className="subtle">Designed around fast inquiries from phone visitors.</p></article>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow eyebrow-light">Values</span>
            <h2 className="mt-24">The principles behind the experience.</h2>
          </div>
          <div className="grid grid-3 mt-56">
            <article className="card card-pad reveal"><h3>Clarity</h3><p className="subtle">Visitors understand what Lumu offers within seconds.</p></article>
            <article className="card card-pad reveal"><h3>Confidence</h3><p className="subtle">Every listing and service is framed with professional support.</p></article>
            <article className="card card-pad reveal"><h3>Direction</h3><p className="subtle">Inquiries collect useful detail so conversations start stronger.</p></article>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <span className="eyebrow eyebrow-light">Work with Lumu</span>
          <h2 className="mt-24">A group ready to support your next move.</h2>
          <div className="cta-row cta-center mt-36">
            <Link className="btn btn-primary" href="/contact/#inquiry">Start an inquiry</Link>
            <Link className="btn btn-outline-light" href="/auto-dealers/">Browse vehicles</Link>
          </div>
        </div>
      </section>
    </>
  );
}
