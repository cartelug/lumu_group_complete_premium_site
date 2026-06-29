import Link from "next/link";
import { featuredServices } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";
import ServiceCard from "@/components/ServiceCard";
import BrandStrip from "@/components/BrandStrip";
import Faq from "@/components/Faq";
import Icon from "@/components/Icon";

const bookWhatsApp = whatsappLink("Hello Lumu Autodealers, I would like to book a service / get a quote.");

export default function Home() {
  const years = new Date().getFullYear() - site.since;
  const svc = featuredServices().slice(0, 6);

  return (
    <>
      <section className="hero-photo">
        <span className="hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="home-hero-grid">
            <div className="hero-copy">
              <span className="kicker hero-step">Built on Trust · Since {site.since}</span>
              <h1 className="mt-24 hero-step">Trusted automotive care <span className="orange">you can rely on.</span></h1>
              <p className="lead mt-24 hero-step">Professional motor vehicle repairs, servicing, diagnostics, genuine spare parts and logistics in Kampala — honest work, fair quotes and fast turnaround for private cars and company fleets.</p>
              <div className="hero-badges hero-step">
                <span className="hero-badge"><Icon name="parts" />Genuine parts</span>
                <span className="hero-badge"><Icon name="diagnostics" />Computerized diagnostics</span>
                <span className="hero-badge"><Icon name="file" />Written quote first</span>
                <span className="hero-badge"><Icon name="clock" />Fast turnaround</span>
              </div>
              <div className="cta-row mt-36 hero-step">
                <a className="btn btn-primary" data-magnetic href={bookWhatsApp} target="_blank" rel="noopener">Book on WhatsApp</a>
                <Link className="btn btn-ghost" href="/services/">Our services</Link>
              </div>
              <div className="hero-metrics hero-step">
                <div className="metric"><strong data-count={years} data-suffix="+">0</strong><span>Years of service</span></div>
                <div className="metric"><strong data-count="6" data-suffix="+">0</strong><span>Brands serviced</span></div>
                <div className="metric"><strong data-count="100" data-suffix="%">0</strong><span>Genuine parts</span></div>
              </div>
            </div>

            <aside className="hero-media" aria-hidden="true">
              <div className="hero-card">
                <div className="hero-card-top">
                  <svg className="hero-card-mark" viewBox="0 0 44 44">
                    <defs><linearGradient id="heroMark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff8a1f" /><stop offset="1" stopColor="#c24e00" /></linearGradient></defs>
                    <rect width="44" height="44" rx="12" fill="url(#heroMark)" />
                    <path d="M28 14.5a4.7 4.7 0 0 0-6.2 6.1l-7.4 7.4a1.75 1.75 0 0 0 2.5 2.5l7.4-7.4a4.7 4.7 0 0 0 6.1-6.2l-2.8 2.8-2.4-2.4 2.8-2.8z" fill="#fff" />
                  </svg>
                  <div>
                    <strong>Lumu Autodealers</strong>
                    <span>Auto repairs · servicing · logistics</span>
                  </div>
                </div>
                <span className="hero-card-status"><i />Open · {site.hours}</span>
                <div className="hero-card-rows">
                  <div className="hero-card-row"><Icon name="wrench" /> Repairs &amp; full servicing</div>
                  <div className="hero-card-row"><Icon name="diagnostics" /> Computerized diagnostics</div>
                  <div className="hero-card-row"><Icon name="parts" /> Genuine spare parts</div>
                  <div className="hero-card-row"><Icon name="truck" /> Fleet &amp; logistics support</div>
                </div>
                <div className="hero-card-foot">
                  <Icon name="pin" /> {site.location}
                </div>
              </div>
              <span className="hero-float hero-float-a"><Icon name="shield" /> Quote first</span>
              <span className="hero-float hero-float-b"><Icon name="check" /> Honest work</span>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-tight section-soft">
        <div className="container text-center reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Brands we service &amp; supply parts for</span>
          <div className="mt-36"><BrandStrip /></div>
          <div className="assure mt-56" style={{ textAlign: "left" }}>
            <div className="assure-item"><Icon name="file" /><div><b>A quote before we start</b><span>You approve the price first — no surprises.</span></div></div>
            <div className="assure-item"><Icon name="shield" /><div><b>Genuine, quality parts</b><span>Brand-matched components you can trust.</span></div></div>
            <div className="assure-item"><Icon name="check" /><div><b>Work done properly</b><span>By qualified technicians, finished right.</span></div></div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="explorer-bar">
            <div className="reveal reveal-l">
              <span className="eyebrow">What we do</span>
              <h2 className="mt-24">Complete automotive services.</h2>
            </div>
            <Link className="btn btn-ghost" href="/services/">View all services</Link>
          </div>
          <div className="grid grid-3 mt-56">
            {svc.map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="text-center narrow reveal reveal-scale">
            <span className="eyebrow eyebrow-light">Why customers trust us</span>
            <h2 className="mt-24">Honest work, every time.</h2>
            <p className="lead">We answer the question every car owner asks first — can I trust this garage with my vehicle?</p>
          </div>
          <div className="grid grid-4 mt-56">
            <article className="card card-pad reveal"><span className="icon-pill"><Icon name="wrench" /></span><h3 className="mt-24">Expert technicians</h3><p className="subtle">Qualified, experienced mechanics with modern, computerized equipment.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill"><Icon name="shield" /></span><h3 className="mt-24">Reliable service</h3><p className="subtle">Clear quotes before we start — no surprises, no overcharging.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill"><Icon name="clock" /></span><h3 className="mt-24">Fast turnaround</h3><p className="subtle">Quick diagnosis and efficient repairs to get you back on the road.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill"><Icon name="star" /></span><h3 className="mt-24">Customer satisfaction</h3><p className="subtle">Quality service, honest work and lasting relationships.</p></article>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container split">
          <div className="reveal reveal-l">
            <span className="eyebrow">For businesses</span>
            <h2 className="mt-24">Fleet &amp; company vehicle servicing.</h2>
            <p className="lead">Keep your business moving. We offer scheduled servicing, priority turnaround and logistics support for company cars, school vans, NGO and delivery fleets.</p>
            <div className="cta-row mt-36">
              <Link className="btn btn-primary" href="/fleet/">Explore fleet services</Link>
              <a className="btn btn-ghost" href={bookWhatsApp} target="_blank" rel="noopener">Talk to us</a>
            </div>
          </div>
          <div className="grid grid-2">
            <div className="card card-pad reveal"><span className="icon-pill"><Icon name="file" /></span><h3 className="mt-24">Service plans</h3><p className="subtle">Scheduled maintenance that prevents costly breakdowns.</p></div>
            <div className="card card-pad reveal"><span className="icon-pill"><Icon name="clock" /></span><h3 className="mt-24">Priority turnaround</h3><p className="subtle">Less downtime for the vehicles your business depends on.</p></div>
            <div className="card card-pad reveal"><span className="icon-pill"><Icon name="parts" /></span><h3 className="mt-24">Genuine parts</h3><p className="subtle">Quality, brand-matched parts supplied and fitted.</p></div>
            <div className="card card-pad reveal"><span className="icon-pill"><Icon name="check" /></span><h3 className="mt-24">Simple reporting</h3><p className="subtle">Know what was done and what&apos;s due next.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-24">Simple, transparent, fast.</h2>
          </div>
          <div className="grid grid-4 process mt-56">
            <article className="card step reveal"><h3>Tell us</h3><p>Send your vehicle and the problem on WhatsApp.</p></article>
            <article className="card step reveal"><h3>Diagnose &amp; quote</h3><p>We inspect, explain the issue and give a clear quote.</p></article>
            <article className="card step reveal"><h3>Approve</h3><p>You approve before any work begins — no surprises.</p></article>
            <article className="card step reveal"><h3>Collect</h3><p>We finish properly and hand back a vehicle you can trust.</p></article>
          </div>
        </div>
      </section>

      <section className="section-tight section-soft">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow" style={{ justifyContent: "center" }}>Our promise to you</span>
            <h2 className="mt-24">What every customer can count on.</h2>
            <p className="lead">Not testimonials — the commitments we stand behind on every vehicle that comes through our gate.</p>
          </div>
          <div className="grid grid-3 promise-grid mt-56">
            <article className="promise-card reveal">
              <span className="icon-pill"><Icon name="file" /></span>
              <h3 className="mt-24">A quote before we start</h3>
              <p className="subtle">We diagnose, explain the problem and give you a clear price. Nothing happens until you approve it.</p>
            </article>
            <article className="promise-card reveal">
              <span className="icon-pill"><Icon name="parts" /></span>
              <h3 className="mt-24">Genuine parts, fitted right</h3>
              <p className="subtle">Quality, brand-matched components and qualified technicians — work finished properly the first time.</p>
            </article>
            <article className="promise-card reveal">
              <span className="icon-pill"><Icon name="handshake" /></span>
              <h3 className="mt-24">Honest, lasting relationships</h3>
              <p className="subtle">We&apos;d rather earn your trust and keep you for years than win once. That&apos;s how Lumu works.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-feature">
        <span className="amb amb-a" aria-hidden="true" />
        <span className="amb amb-b" aria-hidden="true" />
        <div className="container split">
          <div className="reveal reveal-l">
            <span className="eyebrow">Also from Lumu</span>
            <h2 className="mt-24">Lumu Real Estate.</h2>
            <p className="lead">Beyond the workshop, Lumu helps you buy, rent, sell, list and invest in property — land, houses, apartments, rentals and commercial space — with the same honest, trusted approach.</p>
            <div className="cta-row mt-36"><Link className="btn btn-primary" href="/real-estate/">Explore Real Estate</Link></div>
          </div>
          <div className="grid grid-2">
            <div className="card card-pad reveal"><span className="icon-pill"><Icon name="land" /></span><h3 className="mt-24">Land</h3><p className="subtle">Titled residential, commercial and agricultural plots.</p></div>
            <div className="card card-pad reveal"><span className="icon-pill"><Icon name="home" /></span><h3 className="mt-24">Houses</h3><p className="subtle">Family homes, bungalows and villas.</p></div>
            <div className="card card-pad reveal"><span className="icon-pill"><Icon name="building" /></span><h3 className="mt-24">Apartments</h3><p className="subtle">For sale or rent, furnished options.</p></div>
            <div className="card card-pad reveal"><span className="icon-pill"><Icon name="trending" /></span><h3 className="mt-24">Investment</h3><p className="subtle">Land banking and rental income.</p></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow">Common questions</span>
            <h2 className="mt-24">Answers before you bring the car in.</h2>
          </div>
          <div className="grid mt-56">
            <Faq q="Will you give me a fair price?" a="Yes. We diagnose first and give you a clear quote before any work starts — you approve before we begin, so there are no surprises." />
            <Faq q="Do you use genuine parts?" a="We use quality and genuine spare parts, matched to your vehicle's brand — Toyota, Nissan, Hino, Isuzu, Mitsubishi and more." />
            <Faq q="Can I talk to someone quickly?" a="Yes — WhatsApp is the fastest way to reach us. Send your vehicle details and problem and we'll respond with next steps." />
            <Faq q="Do you service company and fleet vehicles?" a="Absolutely. We handle company cars, school vans, NGO and delivery fleets with scheduled servicing and priority turnaround." />
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <span className="eyebrow eyebrow-light">{site.tagline}</span>
          <h2 className="mt-24">Bring your vehicle to people you can trust.</h2>
          <p className="lead mt-24">{site.promise}</p>
          <div className="cta-row cta-center mt-36">
            <a className="btn btn-primary" data-magnetic href={bookWhatsApp} target="_blank" rel="noopener">Book on WhatsApp</a>
            <Link className="btn btn-outline-light" href="/contact/">Visit / contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
