"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("motion-ready", !reduced);

    const writeProgress = () => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", (max > 0 ? window.scrollY / max : 0).toFixed(4));
    };

    // Reduced motion skips Lenis entirely, so the progress indicator is driven
    // off native scroll instead of going dead.
    if (reduced) {
      writeProgress();
      window.addEventListener("scroll", writeProgress, { passive: true });
      window.addEventListener("resize", writeProgress);

      return () => {
        window.removeEventListener("scroll", writeProgress);
        window.removeEventListener("resize", writeProgress);
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
      window.addEventListener("resize", writeProgress);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      writeProgress();

      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });

      dispose = () => {
        lenis.off("scroll", onScroll);
        lenis.off("scroll", writeProgress);
        window.removeEventListener("resize", writeProgress);
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
