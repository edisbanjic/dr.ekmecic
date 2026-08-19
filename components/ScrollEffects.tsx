"use client";

import { useEffect } from "react";

/**
 * Scroll-driven behavior ported from the design: header background,
 * parallax blobs, scroll reveals, count-up stats and hero entrance.
 * Pure DOM effects over the server-rendered markup.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const qa = (s: string) => [...document.querySelectorAll<HTMLElement>(s)];
    const cleanups: (() => void)[] = [];

    // header background + parallax blobs
    const hdr = document.querySelector<HTMLElement>("#hdr");
    const pels = qa("[data-parallax]").map((el) => ({
      el,
      f: parseFloat(el.dataset.parallax || "0"),
      base: el.style.transform || "",
      top: el.getBoundingClientRect().top + window.scrollY,
    }));
    const onScroll = () => {
      const y = window.scrollY;
      if (hdr) {
        const on = hdr.dataset.solid === "1" || y > 24;
        hdr.style.background = on ? "rgba(245,240,232,.85)" : "transparent";
        hdr.style.backdropFilter = on ? "blur(14px)" : "none";
        hdr.style.boxShadow = on ? "0 12px 30px -20px rgba(61,65,66,.4)" : "none";
      }
      for (const p of pels) {
        const d = (y + window.innerHeight - p.top) * p.f;
        p.el.style.transform = p.base + " translate3d(0," + d.toFixed(1) + "px,0)";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      pels.forEach((p) => (p.el.style.transform = p.base));
    });
    onScroll();

    // scroll reveals (only elements still below the fold on mount)
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es)
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.transitionDelay = (el.dataset.delay || "0") + "ms";
            el.style.opacity = "1";
            el.style.transform = el.dataset.rbase || "none";
            io.unobserve(el);
          }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    const revealed: { el: HTMLElement; style: string }[] = [];
    for (const el of qa("[data-reveal]")) {
      if (el.getBoundingClientRect().top < vh * 0.9) continue;
      revealed.push({ el, style: el.getAttribute("style") || "" });
      el.dataset.rbase = el.style.transform || "none";
      el.style.opacity = "0";
      el.style.transform =
        (el.dataset.rbase === "none" ? "" : el.dataset.rbase + " ") + "translateY(30px)";
      el.style.transition = "opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1)";
      io.observe(el);
    }
    cleanups.push(() => {
      io.disconnect();
      revealed.forEach((r) => r.el.setAttribute("style", r.style));
    });

    // count-up stats
    const cio = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          cio.unobserve(el);
          const target = parseFloat(el.dataset.count || "0");
          const suf = el.dataset.suffix || "";
          const t0 = performance.now();
          const dur = 1600;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            el.textContent =
              Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("de-DE") + suf;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    qa("[data-count]").forEach((el) => cio.observe(el));
    cleanups.push(() => cio.disconnect());

    // hero entrance
    const hs = qa("[data-hero]").sort(
      (a, b) => Number(a.dataset.hero) - Number(b.dataset.hero)
    );
    for (const el of hs) {
      el.style.opacity = "0";
      el.style.transform = "translateY(26px)";
    }
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        hs.forEach((el, i) => {
          el.style.transition =
            "opacity .9s ease " + i * 110 + "ms, transform .9s cubic-bezier(.22,1,.36,1) " + i * 110 + "ms";
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      })
    );
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      hs.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.transition = "";
      });
    });

    return () => cleanups.forEach((f) => f());
  }, []);

  return null;
}
