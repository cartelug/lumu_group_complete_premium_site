"use client";

import { useId, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { services } from "@/lib/data";

type Props = {
  title?: string;
  service?: string;
};

export default function InquiryForm({ title = "Lumu Autodealers — Service Request", service }: Props) {
  const uid = useId();
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [title, ""];
    fd.forEach((value, key) => {
      const v = String(value).trim();
      if (v) {
        const label = key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        lines.push(`${label}: ${v}`);
      }
    });
    lines.push("", "Please advise on availability and an estimate. Thank you.");
    setMessage(lines.join("\n"));
    setCopied(false);
  };

  const copy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <form className="form-card reveal" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Full name</label>
          <input id={`${uid}-name`} name="full-name" required placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-phone`}>Phone number</label>
          <input id={`${uid}-phone`} name="phone-number" required placeholder="e.g. +256..." />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-vehicle`}>Vehicle (make &amp; model)</label>
          <input id={`${uid}-vehicle`} name="vehicle" placeholder="e.g. Toyota Harrier, 2015" />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-service`}>Service needed</label>
          <select id={`${uid}-service`} name="service" required defaultValue={service ?? ""}>
            <option value="" disabled>Choose a service</option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Other / not sure</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-when`}>Preferred time</label>
          <select id={`${uid}-when`} name="preferred-time" defaultValue="As soon as possible">
            <option>As soon as possible</option>
            <option>Today</option>
            <option>This week</option>
            <option>Just need a quote</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-location`}>Where is the vehicle?</label>
          <input id={`${uid}-location`} name="vehicle-location" placeholder="At your workshop / my location" />
        </div>
        <div className="field full">
          <label htmlFor={`${uid}-details`}>Describe the problem</label>
          <textarea id={`${uid}-details`} name="problem-details" placeholder="What's happening with the vehicle? Any warning lights, noises or symptoms?" />
        </div>
      </div>
      <div className="cta-row mt-24">
        <button className="btn btn-primary" type="submit">Send request</button>
        {message && (
          <a className="btn btn-soft" href={whatsappLink(message)} target="_blank" rel="noopener">Open WhatsApp</a>
        )}
      </div>
      {message && (
        <div className="mt-24">
          <textarea
            readOnly
            value={message}
            aria-label="Generated request message"
            style={{ width: "100%", minHeight: 150, borderRadius: 12, border: "1px solid var(--line-strong)", background: "var(--surface-2)", color: "var(--text)", padding: 14, fontFamily: "var(--ff)" }}
          />
          <div className="cta-row mt-24">
            <button className="btn btn-ghost" type="button" onClick={copy}>{copied ? "Copied ✓" : "Copy message"}</button>
          </div>
        </div>
      )}
      <p className="form-note mt-24">This sends your details as a ready WhatsApp message — nothing is stored on this website.</p>
    </form>
  );
}
