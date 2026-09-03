"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { paletteAt } from "@/lib/stage";

/**
 * Drives the white -> near-black journey.
 *
 * Writes the interpolated palette onto the root element as custom properties,
 * plus data-stage ("light" | "dark") at the crossover. That is a dozen
 * setProperty calls on one element per frame and nothing else — no per-element
 * work, no layout, no canvas.
 *
 * Every colour in the design reads from those properties, so the whole
 * environment moves together rather than one background changing underneath
 * fixed text.
 */
export function ScrollStage() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    let stage: string | null = null;

    const apply = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const p = paletteAt(clamped);

      // Signed tint: positive lightens the ground, negative darkens it. See
      // StagePalette for why the sign has to travel with the journey.
      const tint = (value: number) =>
        value >= 0
          ? `rgb(255 255 255 / ${value.toFixed(3)})`
          : `rgb(0 0 0 / ${(-value).toFixed(3)})`;
      const set = (name: string, value: string) => root.style.setProperty(name, value);

      set("--color-void", p.ground);
      set("--color-fg", p.fg);
      set("--color-fg-muted", p.fgMuted);
      set("--color-fg-subtle", p.fgSubtle);
      set("--color-accent", p.accent);
      set("--color-accent-bright", p.accentBright);
      set("--color-surface", tint(p.surface));
      set("--color-well", tint(p.surface * 1.4));
      set("--color-raised", tint(p.raised));
      set("--color-line", tint(p.line));
      set("--color-line-strong", tint(p.lineStrong));
      set("--stage-progress", clamped.toFixed(4));

      if (p.stage !== stage) {
        stage = p.stage;
        root.dataset.stage = p.stage;
      }
    };

    const readProgress = () => {
      const max = root.scrollHeight - window.innerHeight;
      return max > 0 ? window.scrollY / max : 0;
    };

    // Reduced motion skips GSAP entirely: the colour journey still happens
    // (it carries the design's legibility, and a colour change is not
    // vestibular motion) but it is read straight off native scroll.
    if (reduced) {
      let frame = 0;
      const onScroll = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          apply(readProgress());
        });
      };

      apply(readProgress());
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    let dispose: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      if (cancelled) return;

      const proxy = { p: readProgress() };
      apply(proxy.p);

      // Scrubbed so the ground eases behind the scroll rather than tracking it
      // rigidly — the environment feels like it is settling into each stage.
      const tween = gsap.to(proxy, {
        p: 1,
        ease: "none",
        overwrite: true,
        scrollTrigger: {
          start: 0,
          end: () => ScrollTrigger.maxScroll(window),
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
        onUpdate: () => apply(proxy.p),
      });

      dispose = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    void start();

    return () => {
      cancelled = true;
      dispose?.();
      for (const name of [
        "--color-void",
        "--color-fg",
        "--color-fg-muted",
        "--color-fg-subtle",
        "--color-accent",
        "--color-accent-bright",
        "--color-surface",
        "--color-well",
        "--color-raised",
        "--color-line",
        "--color-line-strong",
        "--stage-progress",
      ]) {
        root.style.removeProperty(name);
      }
    };
  }, [reduced]);

  return null;
}
