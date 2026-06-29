"use client";

import { useEffect } from "react";

declare global {
  interface Window { __lumuMotionFail?: ReturnType<typeof setTimeout> }
}

function revealAll() {
  document.documentElement.classList.remove("anim");
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

export default function Experience() {
  useEffect(() => {
    if (window.__lumuMotionFail) clearTimeout(window.__lumuMotionFail);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { revealAll(); return; }

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      try {
        const [{ default: Lenis }, gsapMod, stMod, dsMod] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/DrawSVGPlugin"),
        ]);
        let SplitText: any;
        try { SplitText = (await import("gsap/SplitText")).SplitText; } catch { /* optional */ }
        if (cancelled) return;

        const gsap = (gsapMod as any).default ?? (gsapMod as any).gsap ?? gsapMod;
        const ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default;
        const DrawSVGPlugin = (dsMod as any).DrawSVGPlugin ?? (dsMod as any).default;
        gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, ...(SplitText ? [SplitText] : []));

        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (t: number) => { lenis.raf(t); rafId = requestAnimationFrame(raf); };
        let rafId = requestAnimationFrame(raf);

        const mm = gsap.matchMedia();

        // header scrolled state
        const header = document.querySelector(".dh");
        const onScroll = ({ scroll }: { scroll: number }) => header?.classList.toggle("scrolled", scroll > 24);
        lenis.on("scroll", onScroll);

        // hero headline split reveal
        if (SplitText) {
          document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
            const split = new SplitText(el, { type: "lines", linesClass: "line" });
            gsap.from(split.lines, { yPercent: 110, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12, delay: 0.15 });
          });
        }

        // generic scroll reveals (batched, stagger)
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 86%",
          onEnter: (els: HTMLElement[]) =>
            gsap.to(els, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });

        // odometer roll
        document.querySelectorAll<HTMLElement>("[data-odo-value]").forEach((el) => {
          const target = Number(el.dataset.odoValue || "0");
          const digits = el.querySelectorAll<HTMLElement>("[data-odo-target]");
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => {
              const s = String(Math.round(obj.v)).padStart(digits.length, "0");
              digits.forEach((d, i) => { d.textContent = s[i]; });
            },
          });
        });

        // import route draw
        const routes = document.querySelectorAll<SVGElement>("[data-route-draw]");
        if (routes.length) {
          gsap.set(routes, { drawSVG: "0%" });
          ScrollTrigger.batch(routes, {
            start: "top 85%",
            onEnter: (els: SVGElement[]) =>
              gsap.to(els, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut", stagger: 0.25 }),
          });
        }

        // grade stamp slam
        ScrollTrigger.batch(".stamp", {
          start: "top 88%",
          onEnter: (els: HTMLElement[]) =>
            gsap.fromTo(els, { scale: 1.6, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.1, overwrite: true }),
        });

        // featured dossier: pin + scrub spec rows (desktop only)
        mm.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => {
          const dossier = document.querySelector<HTMLElement>("[data-pin]");
          if (!dossier) return;
          const rows = dossier.querySelectorAll(".dossier__specs .row");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: dossier, start: "top top", end: "+=80%", pin: true, scrub: 0.6 },
          });
          tl.from(rows, { opacity: 0, x: 24, stagger: 0.5, ease: "none" });
        });

        ScrollTrigger.refresh();

        cleanup = () => {
          cancelled = true;
          cancelAnimationFrame(rafId);
          mm.revert();
          ScrollTrigger.getAll().forEach((t: any) => t.kill());
          lenis.destroy();
          revealAll();
        };
      } catch {
        revealAll();
      }
    })();

    const safety = setTimeout(() => { if (document.documentElement.classList.contains("anim")) revealAll(); }, 3500);
    return () => { clearTimeout(safety); cleanup(); };
  }, []);

  return null;
}
