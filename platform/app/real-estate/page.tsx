import type { Metadata } from "next";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import InquiryForm from "@/components/InquiryForm";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Real Estate",
  description: "Lumu Real Estate — land, houses, apartments, rentals and commercial property in and around Kampala. Buy, rent, sell, list or invest with a trusted partner.",
};

const wa = whatsappLink("Hello Lumu Real Estate, I would like help with property.");

const categories = [
  { icon: "land", title: "Land", text: "Residential, commercial and agricultural plots — titled and ready to build." },
  { icon: "home", title: "Houses", text: "Family homes, bungalows and villas for sale across Kampala and Wakiso." },
  { icon: "building", title: "Apartments", text: "Studios to three-bedroom and furnished units for sale or rent." },
  { icon: "key", title: "Rentals", text: "Houses and apartments to let, matched to your budget and area." },
  { icon: "building", title: "Commercial", text: "Shops, offices, warehouses and mixed-use spaces." },
  { icon: "trending", title: "Investment", text: "Land banking, rental income and development opportunities." },
];

const options = ["Buy land", "Buy a house", "Buy / rent an apartment", "Rent a property", "Sell / list my property", "Commercial property", "Investment guidance", "Other"];

export default function RealEstatePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Real Estate</span></div>
            <span className="kicker">Lumu Real Estate</span>
            <h1 className="mt-24">Land, homes &amp; property — with people you trust.</h1>
            <p className="lead mt-24">The other side of Lumu. Whether you want to buy, rent, sell, list or invest, we help you move with clear guidance and honest advice — the same trust that drives our workshop.</p>
            <div className="cta-row mt-36">
              <a className="btn btn-primary" href={wa} target="_blank" rel="noopener">Talk to us on WhatsApp</a>
              <a className="btn btn-ghost" href="#enquiry">Send a property request</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow">What we handle</span>
            <h2 className="mt-24">Property, every way you need it.</h2>
          </div>
          <div className="grid grid-3 mt-56">
            {categories.map((c) => (
              <article key={c.title} className="card card-pad service-card reveal">
                <span className="icon-pill" aria-hidden="true"><Icon name={c.icon} /></span>
                <h3 className="mt-24">{c.title}</h3>
                <p className="subtle">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="text-center narrow reveal">
            <span className="eyebrow eyebrow-light">Who we help</span>
            <h2 className="mt-24">Buyers, tenants, owners &amp; investors.</h2>
          </div>
          <div className="grid grid-3 mt-56">
            <article className="card card-pad reveal"><span className="icon-pill"><Icon name="home" /></span><h3 className="mt-24">Buyers &amp; tenants</h3><p className="subtle">Tell us your area, budget and timeline — we match you to the right property.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill"><Icon name="file" /></span><h3 className="mt-24">Owners &amp; landlords</h3><p className="subtle">List your land, house or rental and we&apos;ll help present and market it.</p></article>
            <article className="card card-pad reveal"><span className="icon-pill"><Icon name="trending" /></span><h3 className="mt-24">Investors</h3><p className="subtle">Guidance on land, rental income and development opportunities.</p></article>
          </div>
        </div>
      </section>

      <section className="section" id="enquiry">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow">Property request</span>
            <h2 className="mt-24">Tell us what you&apos;re looking for.</h2>
            <p className="lead">Share the details and we&apos;ll respond on WhatsApp with options and next steps — buying, renting, listing or investing.</p>
            <div className="trust-pills mt-36">
              <span className="trust-pill">Honest advice</span>
              <span className="trust-pill">Clear guidance</span>
              <span className="trust-pill">Trusted partner</span>
            </div>
          </div>
          <InquiryForm title="Lumu Real Estate — Property Request" options={options} serviceLabel="What do you need?" />
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <span className="eyebrow eyebrow-light">Lumu Real Estate</span>
          <h2 className="mt-24">Find your next property with Lumu.</h2>
          <p className="lead mt-24">{site.promise}</p>
          <div className="cta-row cta-center mt-36">
            <a className="btn btn-primary" href={wa} target="_blank" rel="noopener">Message on WhatsApp</a>
            <Link className="btn btn-outline-light" href="/contact/">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
