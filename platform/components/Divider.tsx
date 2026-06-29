// Premium section dividers, grounded in the service-ticket motif.
// Pure CSS, full-bleed, responsive (no fixed heights that break on mobile).
type Variant = "perf" | "gauge" | "hazard";

export default function Divider({ variant = "perf", label = "Lumu" }: { variant?: Variant; label?: string }) {
  if (variant === "hazard") return <div className="seam seam-hazard" aria-hidden="true" />;
  return (
    <div className={`seam seam-${variant}`} aria-hidden="true">
      <span className="seam-chip">
        {variant === "gauge" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M4.5 16a7.5 7.5 0 0 1 15 0" />
            <path d="M12 14l3.4-2.8" />
            <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.4" fill="currentColor" /></svg>
        )}
        {label}
      </span>
    </div>
  );
}
