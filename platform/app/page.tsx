import Link from "next/link";
import { featuredVehicles, featuredProperties } from "@/lib/data";
import VehicleCard from "@/components/VehicleCard";
import PropertyCard from "@/components/PropertyCard";
import Faq from "@/components/Faq";

const HERO = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";

export default function Home() {
  const vehicles = featuredVehicles().slice(0, 3);
  const properties = featuredProperties().slice(0, 3);

  return (
    <>
      <section className="hero-photo">
        <div
          className="hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <span className="hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="hero-copy reveal">
            <span className="kicker">Premium group company</span>
            <h1 className="mt-24">One trusted group. <span className="orange">Two powerful divisions.</span></h1>
            <p className="lead mt-24">Browse real vehicles and properties from Lumu Auto Dealers and Lumu Real Estate — then send a clear, WhatsApp-ready inquiry in one tap.</p>
            <div className="cta-row mt-36">
              <Link className="btn btn-primary" href="/auto-dealers/">Browse vehicles</Link>
              <Link className="btn btn-outline-light" href="/real-estate/">View properties</Link>
            </div>
            <div className="hero-metrics">
              <div className="metric"><strong data-count="2">0</strong><span>Specialist divisions</span></div>
              <div className="metric"><strong data-count="15" data-suffix="+">0</strong><span>Live listings</span></div>
              <div className="metric"><strong data-count="100" data-suffix="%">0</strong><span>Mobile-first</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="container">
          <div className="marquee-track">
            <span>Vehicle Sales<b>•</b>Car Importation<b>•</b>Trade-Ins<b>•</b>Fleet Sourcing<b>•</b>Land<b>•</b>Houses<b>•</b>Rentals<b>•</b>Commercial Property<b>•</b></span>
            <span>Vehicle Sales<b>•</b>Car Importation<b>•</b>Trade-Ins<b>•</b>Fleet Sourcing<b>•</b>Land<b>•</b>Houses<b>•</b>Rentals<b>•</b>Commercial Property<b>•</b></span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="explorer-bar">
            <div className="reveal">
              <span className="eyebrow">Lumu Auto Dealers</span>
              <h2 className="mt-24">Featured vehicles</h2>
            </div>
            <Link className="btn btn-ghost" href="/auto-dealers/">View all vehicles</Link>
          </div>
          <div className="listing-grid">
            {vehicles.map((v) => <VehicleCard key={v.slug} v={v} />)}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="explorer-bar">
            <div className="reveal">
              <span className="eyebrow eyebrow-light">Lumu Real Estate</span>
              <h2 className="mt-24">Featured properties</h2>
            </div>
            <Link className="btn btn-outline-light" href="/real-estate/">View all properties</Link>
          </div>
          <div className="listing-grid">
            {properties.map((p) => <PropertyCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-24">From browse to a real conversation.</h2>
          </div>
          <div className="grid grid-4 process mt-56">
            <article className="card step reveal"><h3>Browse</h3><p>Explore real vehicles and properties with full details and photos.</p></article>
            <article className="card step reveal"><h3>Shortlist</h3><p>Open any listing to see specs, location and pricing.</p></article>
            <article className="card step reveal"><h3>Inquire</h3><p>Send a clear, pre-filled inquiry straight to WhatsApp.</p></article>
            <article className="card step reveal"><h3>Follow up</h3><p>Lumu responds with next steps, viewings or sourcing.</p></article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow">Common questions</span>
            <h2 className="mt-24">Answers before the first call.</h2>
          </div>
          <div className="grid mt-56">
            <Faq q="Are these real listings?" a="Yes — the platform is built to showcase real inventory. Listings shown here are sample stock to demonstrate the experience and are easily replaced with live inventory." />
            <Faq q="Can I inquire about both cars and property?" a="Yes. Lumu Auto Dealers and Lumu Real Estate operate under one trusted group, and every listing has a one-tap inquiry." />
            <Faq q="How do inquiries reach Lumu?" a="Each inquiry is turned into a clear, pre-filled WhatsApp message you can send or copy — no waiting, no friction." />
            <Faq q="Does it work well on mobile?" a="Yes. The experience is mobile-first, with sticky call and WhatsApp actions on small screens." />
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <span className="eyebrow eyebrow-light">Start today</span>
          <h2 className="mt-24">Ready to find your next vehicle or property?</h2>
          <p className="lead mt-24">Browse the latest listings or send a direct inquiry — we&apos;ll follow up with clear next steps.</p>
          <div className="cta-row cta-center mt-36">
            <Link className="btn btn-primary" href="/contact/#inquiry">Start an inquiry</Link>
            <Link className="btn btn-outline-light" href="/auto-dealers/">Browse vehicles</Link>
          </div>
        </div>
      </section>
    </>
  );
}
