"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("motion-ready", !reduced);
    if (reduced) return;

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

      const onProgress = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty("--scroll-progress", (max > 0 ? window.scrollY / max : 0).toFixed(4));
      };

      lenis.on("scroll", onScroll);
      lenis.on("scroll", onProgress);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      onProgress();

      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });

      dispose = () => {
        lenis.off("scroll", onScroll);
        lenis.off("scroll", onProgress);
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
