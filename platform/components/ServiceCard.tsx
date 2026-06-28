import Link from "next/link";
import type { Service } from "@/lib/data";

export default function ServiceCard({ s }: { s: Service }) {
  return (
    <Link className="card card-pad service-card reveal" href={`/services/${s.slug}/`}>
      <span className="icon-pill" aria-hidden="true">{s.icon}</span>
      <h3 className="mt-24">{s.title}</h3>
      <p className="subtle">{s.short}</p>
      <span className="lcard-cta">View service →</span>
    </Link>
  );
}
