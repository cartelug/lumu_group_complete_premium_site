import type { Car } from "@/lib/inventory";

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {/* L mark as a route turning down to a verified dot */}
      <path d="M13 10v14h11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
      <circle cx="27.5" cy="24" r="3.2" fill="#1F7A4D" />
    </svg>
  );
}

export function Plate({ num, className }: { num: string; className?: string }) {
  return (
    <span className={`plate ${className ?? ""}`} aria-label={`Registration ${num}`}>
      <span className="plate__strip">UG</span>
      <span className="plate__num">{num}</span>
    </span>
  );
}

export function GradeStamp({ car, className }: { car: Car; className?: string }) {
  if (car.verified && car.grade) {
    return (
      <span className={`stamp ${className ?? ""}`} role="img" aria-label={`Verified auction grade ${car.grade}`}>
        <b>{car.grade}</b>
        <span>Verified</span>
      </span>
    );
  }
  return (
    <span className={`stamp stamp--unverified ${className ?? ""}`} role="img" aria-label="Inspection pending">
      <b>—</b>
      <span>Inspect</span>
    </span>
  );
}

/** Placeholder car figure — clearly a silhouette, painted in the car's colour.
 *  Swap for real photography by replacing this component's contents. */
export function CarFigure({ car, tag }: { car: Car; tag?: string }) {
  const dark = isDark(car.paint);
  const wheel = dark ? "#0d0f12" : "#15171A";
  return (
    <div className="figure" data-reveal="fig">
      <div className="figure__ph">
        <svg viewBox="0 0 220 96" width="78%" role="img" aria-label={`${car.year} ${car.make} ${car.model}, ${car.paintName}`}>
          <path
            d="M8 70 Q10 56 26 54 L58 52 Q70 38 92 35 L140 34 Q166 35 182 52 L204 58 Q212 60 212 70 L212 74 L8 74 Z"
            fill={car.paint} stroke="rgba(0,0,0,.25)" strokeWidth="1"
          />
          <path d="M72 50 L96 40 L132 39 L150 50 Z" fill={dark ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.5)"} />
          <circle cx="62" cy="74" r="15" fill={wheel} /><circle cx="62" cy="74" r="6" fill={car.paint} opacity=".5" />
          <circle cx="168" cy="74" r="15" fill={wheel} /><circle cx="168" cy="74" r="6" fill={car.paint} opacity=".5" />
        </svg>
      </div>
      <span className="figure__tag">{tag ?? `${car.paintName} · placeholder`}</span>
    </div>
  );
}

export function Odometer({ value, suffix = "km", className }: { value: number; suffix?: string; className?: string }) {
  const digits = String(value).padStart(6, "0").split("");
  return (
    <span className={`odo ${className ?? ""}`} data-odo-value={value} aria-label={`${value.toLocaleString()} ${suffix}`}>
      {digits.map((d, i) => (
        <span key={i} data-odo-target={d}>{d}</span>
      ))}
      <em style={{ fontStyle: "normal", color: "var(--steel)", marginLeft: 6, alignSelf: "center" }}>{suffix}</em>
    </span>
  );
}

export function RouteMap({ stops }: { stops: string[] }) {
  return (
    <div className="route" aria-label={`Import route: ${stops.join(" to ")}`}>
      {stops.map((s, i) => (
        <span key={s} style={{ display: "contents" }}>
          <span className="route__stop">
            <span className={`route__dot ${i === stops.length - 1 ? "is-end" : ""}`} />
            {s}
          </span>
          {i < stops.length - 1 && (
            <span className="route__line">
              <svg className="route__draw" viewBox="0 0 100 2" preserveAspectRatio="none">
                <line x1="0" y1="1" x2="100" y2="1" stroke="var(--verified)" strokeWidth="2" data-route-draw />
              </svg>
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function isDark(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 140;
}
