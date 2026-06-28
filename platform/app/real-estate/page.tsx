import type { Metadata } from "next";
import Link from "next/link";
import { getProperties } from "@/lib/data";
import PropertyExplorer from "@/components/PropertyExplorer";

export const metadata: Metadata = {
  title: "Real Estate — Property for Sale & Rent",
  description: "Browse land, houses, apartments and commercial property from Lumu Real Estate — to buy, rent or invest.",
};

export default function RealEstatePage() {
  const properties = getProperties();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Real Estate</span></div>
            <span className="kicker">Lumu Real Estate</span>
            <h1 className="mt-24">Land, homes &amp; investments.</h1>
            <p className="lead mt-24">Buy, rent, sell or invest — browse current properties across Kampala and beyond, and inquire in one tap.</p>
            <div className="cta-row mt-36">
              <Link className="btn btn-primary" href="/contact/#inquiry">Request a property</Link>
              <a className="btn btn-ghost" href={`https://wa.me/256700000000`}>WhatsApp us</a>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PropertyExplorer properties={properties} />
        </div>
      </section>
    </>
  );
}
