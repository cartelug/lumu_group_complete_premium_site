"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
      counters.forEach((el) => {
        el.textContent = (el.dataset.count || "") + (el.dataset.suffix || "");
      });
      return;
    }

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => {
      if (!el.classList.contains("in")) revealObs.observe(el);
    });

    const runCount = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount(entry.target as HTMLElement);
            countObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => countObs.observe(el));

    // Magnetic CTA — pointer-following nudge on capable desktop pointers only.
    const fine = window.matchMedia("(hover:hover) and (pointer:fine) and (min-width:861px)").matches;
    const magnets: { el: HTMLElement; enter: () => void; move: (e: PointerEvent) => void; leave: () => void }[] = [];
    if (fine) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = 0.32;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * strength;
          const y = (e.clientY - (r.top + r.height / 2)) * strength;
          el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        };
        const enter = () => el.classList.add("is-magnetic");
        const leave = () => {
          el.classList.remove("is-magnetic");
          el.style.transform = "";
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        magnets.push({ el, enter, move, leave });
      });
    }

    return () => {
      revealObs.disconnect();
      countObs.disconnect();
      magnets.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        el.style.transform = "";
      });
    };
  }, [pathname]);

  return null;
}
