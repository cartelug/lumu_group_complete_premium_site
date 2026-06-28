"use client";

import { useState } from "react";

export default function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq reveal${open ? " open" : ""}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {q}
      </button>
      <div className="faq-content">{a}</div>
    </div>
  );
}
