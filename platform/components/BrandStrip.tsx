import { brands } from "@/lib/site";

// Two identical sets so the track can loop seamlessly (-50%). The second set is
// decorative (aria-hidden) and is hidden when the user prefers reduced motion,
// where the track falls back to a centered, static wrap.
export default function BrandStrip() {
  return (
    <div className="brand-marquee">
      <div className="brand-track">
        {brands.map((b) => (
          <span key={b} className="brand-chip">{b}</span>
        ))}
        {brands.map((b) => (
          <span key={`dup-${b}`} className="brand-chip" aria-hidden="true" data-dup>{b}</span>
        ))}
      </div>
    </div>
  );
}
