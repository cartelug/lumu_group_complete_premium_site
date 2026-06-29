import { site, whatsappLink } from "@/lib/site";
import { Mark, Plate } from "./ui";
import { WaIcon } from "./CarCard";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="reg-footer" id="visit-footer">
      <div className="wrap">
        <div className="reg-footer__top">
          <div>
            <span className="eyebrow" style={{ color: "var(--steel-soft)" }}>Visit the lot</span>
            <h2>Come kick the tyres.</h2>
            <p className="reg-footer__line">{site.promise} See it, drive it, check the paperwork — then decide.</p>
          </div>
          <div style={{ display: "grid", gap: 14, justifyItems: "start" }}>
            <Plate num="UG LUMU" />
            <a className="btn btn--wa" href={whatsappLink("Hi Lumu, I'd like to arrange a viewing.")} target="_blank" rel="noopener">
              <WaIcon /> Arrange a viewing
            </a>
            <a className="data" href={`tel:${site.phone}`} style={{ color: "var(--steel-soft)", letterSpacing: ".04em" }}>{site.phoneDisplay}</a>
          </div>
        </div>
        <div className="reg-footer__bottom">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Mark className="dh__mark" /> {site.name}</span>
          <span>{site.location} · {site.hours}</span>
          <span>© {year} — all cars subject to availability</span>
        </div>
      </div>
    </footer>
  );
}
