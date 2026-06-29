import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getServices } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";
import InquiryForm from "@/components/InquiryForm";
import Icon from "@/components/Icon";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Service not found" };
  return { title: s.title, description: `${s.title} — ${s.short} ${site.name}, Kampala.` };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const wa = whatsappLink(`Hello Lumu Autodealers, I would like help with: ${s.title}.`);

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services/">Services</Link><span>/</span><span>{s.title}</span></div>
        <div className="detail-grid mt-24">
          <div>
            <span className="icon-pill" aria-hidden="true"><Icon name={s.icon} size={28} /></span>
            <h1 className="mt-24">{s.title}</h1>
            <p className="lead mt-24">{s.description}</p>
            <h3 className="mt-36">What&apos;s included</h3>
            <ul className="amenity-list">
              {s.includes.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <div className="divider" />
            <p className="subtle">All work starts with a clear diagnosis and a quote you approve first — quality service, honest work.</p>
            <div className="cta-row mt-36">
              <a className="btn btn-primary" href={wa} target="_blank" rel="noopener">Request this on WhatsApp</a>
              <a className="btn btn-ghost" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            </div>
          </div>
          <aside>
            <div className="detail-aside">
              <span className="chip-status chip-available">Available now</span>
              <h3 className="mt-24">Request a quote</h3>
              <p className="subtle">Tell us about your vehicle and we&apos;ll respond with availability and an estimate.</p>
              <div className="divider" />
              <InquiryForm title={`Lumu Autodealers — ${s.title}`} service={s.title} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
