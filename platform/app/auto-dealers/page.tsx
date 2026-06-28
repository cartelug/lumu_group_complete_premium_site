import type { Metadata } from "next";
import Link from "next/link";
import { getVehicles } from "@/lib/data";
import VehicleExplorer from "@/components/VehicleExplorer";

export const metadata: Metadata = {
  title: "Auto Dealers — Vehicles for Sale",
  description: "Browse vehicles from Lumu Auto Dealers — SUVs, sedans, pickups and more, with sales, importation, trade-ins and fleet sourcing.",
};

export default function AutoDealersPage() {
  const vehicles = getVehicles();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 820 }}>
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Auto Dealers</span></div>
            <span className="kicker">Lumu Auto Dealers</span>
            <h1 className="mt-24">Find your next vehicle.</h1>
            <p className="lead mt-24">Sales, importation, trade-ins and fleet sourcing — browse the current lineup and send a clear inquiry in one tap.</p>
            <div className="cta-row mt-36">
              <Link className="btn btn-primary" href="/contact/#inquiry">Request a vehicle</Link>
              <a className="btn btn-ghost" href={`https://wa.me/256700000000`}>WhatsApp us</a>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <VehicleExplorer vehicles={vehicles} />
        </div>
      </section>
    </>
  );
}
