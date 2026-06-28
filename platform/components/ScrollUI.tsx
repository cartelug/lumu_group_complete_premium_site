"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollUI() {
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? Math.min(doc.scrollTop / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
      setShowTop(doc.scrollTop > 600);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="scroll-progress" ref={barRef} aria-hidden="true" />
      <button
        type="button"
        className={`to-top${showTop ? " show" : ""}`}
        aria-label="Back to top"
        onClick={toTop}
      >
        ↑
      </button>
    </>
  );
}
