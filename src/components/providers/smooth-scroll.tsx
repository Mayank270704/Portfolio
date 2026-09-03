"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("motion-ready", !reduced);

    // Written on every scroll event, and a custom property on :root
    // invalidates style for everything that reads it. Three decimals is finer
    // than the 1px progress bar can show, and skipping unchanged values means
    // most scroll events write nothing at all.
    let lastProgress = "";
    let progressMax = Math.max(0, root.scrollHeight - window.innerHeight);
    const measureProgress = () => {
      progressMax = Math.max(0, root.scrollHeight - window.innerHeight);
    };
    const writeProgress = () => {
      const value = (progressMax > 0 ? window.scrollY / progressMax : 0).toFixed(3);
      if (value === lastProgress) return;
      lastProgress = value;
      root.style.setProperty("--scroll-progress", value);
    };
    // A viewport resize changes innerHeight without necessarily changing body
    // height, so the cached maximum has to be refreshed before writing.
    const onResize = () => {
      measureProgress();
      writeProgress();
    };

    // Reduced motion skips Lenis entirely, so the progress indicator is driven
    // off native scroll instead of going dead.
    if (reduced) {
      writeProgress();
      window.addEventListener("scroll", writeProgress, { passive: true });
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("scroll", writeProgress);
        window.removeEventListener("resize", onResize);
      };
    }

    let dispose: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);

      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });

      const onScroll = () => ScrollTrigger.update();
      const raf = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", onScroll);
      lenis.on("scroll", writeProgress);
      window.addEventListener("resize", onResize);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      writeProgress();

      // The document grows after first measurement: pins insert spacers, the
      // marquee tracks resize once the webfont lands, and images decode. Every
      // ScrollTrigger end that depends on document height — including the
      // colour journey, which maps to the full scroll range — is stale until a
      // refresh. Watching the body height and refreshing on change keeps them
      // honest without polling.
      let refreshTimer = 0;
      const resizeObserver = new ResizeObserver(() => {
        measureProgress();
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
      });
      resizeObserver.observe(document.body);

      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });

      dispose = () => {
        window.clearTimeout(refreshTimer);
        resizeObserver.disconnect();
        lenis.off("scroll", onScroll);
        lenis.off("scroll", writeProgress);
        window.removeEventListener("resize", onResize);
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    };

    void start();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [reduced]);

  return null;
}
