import { brands } from "@/lib/site";

export default function BrandStrip() {
  return (
    <div className="brand-strip">
      {brands.map((b) => (
        <span key={b} className="brand-chip">{b}</span>
      ))}
    </div>
  );
}
