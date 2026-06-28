"use client";

import { useId, useState } from "react";
import { whatsappLink } from "@/lib/site";

type Props = {
  title?: string;
  reference?: string;
  interestOptions?: string[];
};

const DEFAULT_INTERESTS = [
  "Vehicle help",
  "Property help",
  "List property",
  "Fleet sourcing",
  "Investment guidance",
];

export default function InquiryForm({
  title = "Lumu Group Inquiry",
  reference,
  interestOptions = DEFAULT_INTERESTS,
}: Props) {
  const uid = useId();
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [title, ""];
    if (reference) lines.push(`Listing: ${reference}`);
    fd.forEach((value, key) => {
      const v = String(value).trim();
      if (v) {
        const label = key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        lines.push(`${label}: ${v}`);
      }
    });
    lines.push("", "Please contact me with the next steps.");
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
      {reference && (
        <p className="kicker" style={{ marginBottom: 18 }}>Re: {reference}</p>
      )}
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
          <label htmlFor={`${uid}-interest`}>Interest</label>
          <select id={`${uid}-interest`} name="interest" required defaultValue="">
            <option value="" disabled>Choose one</option>
            {interestOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-budget`}>Budget / range</label>
          <input id={`${uid}-budget`} name="budget" placeholder="Your preferred budget" />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-timeline`}>Timeline</label>
          <select id={`${uid}-timeline`} name="timeline" defaultValue="Immediately">
            <option>Immediately</option>
            <option>This month</option>
            <option>1–3 months</option>
            <option>Still exploring</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-pref`}>Preferred location / model</label>
          <input id={`${uid}-pref`} name="preferred-location-or-model" placeholder="Area, property type, or vehicle model" />
        </div>
        <div className="field full">
          <label htmlFor={`${uid}-details`}>Extra details</label>
          <textarea id={`${uid}-details`} name="extra-details" placeholder="Tell us what you want, what matters most, and any special requirements." />
        </div>
      </div>
      <div className="cta-row mt-24">
        <button className="btn btn-primary" type="submit">Generate inquiry message</button>
        {message && (
          <a className="btn btn-soft" href={whatsappLink(message)} target="_blank" rel="noopener">Open WhatsApp</a>
        )}
      </div>
      {message && (
        <div className="mt-24">
          <textarea readOnly value={message} aria-label="Generated inquiry message" style={{ width: "100%", minHeight: 150, borderRadius: 12, border: "1px solid var(--line-strong)", background: "var(--surface-2)", color: "var(--text)", padding: 14, fontFamily: "var(--ff)" }} />
          <div className="cta-row mt-24">
            <button className="btn btn-ghost" type="button" onClick={copy}>{copied ? "Copied ✓" : "Copy message"}</button>
          </div>
        </div>
      )}
      <p className="form-note mt-24">This website does not store form data. It creates a polished message you can send through WhatsApp or copy.</p>
    </form>
  );
}
