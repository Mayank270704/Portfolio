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
 *
 * WHY NOT A SCRUBBED SCROLLTRIGGER. The journey maps to the height of the whole
 * document, and that height is not stable: pins insert spacers, the marquee
 * tracks resize when the webfont lands, images decode. A ScrollTrigger whose
 * `end` is the document height gets measured during refresh while pin spacers
 * are collapsed, so it settles on a maximum ~12% short and the page reaches
 * near-black before the actual bottom. Reading the live scroll position each
 * frame and smoothing it here cannot go stale, and costs one lerp on a ticker
 * that Lenis is already running.
 */
export function ScrollStage() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    let stage: string | null = null;

    /**
     * Palette resolution.
     *
     * A custom property written on :root invalidates style for every element
     * that reads it, so writing twelve of them every frame was costing ~28ms of
     * style recalculation per frame. Quantising progress means most frames
     * resolve to the same key and write nothing at all.
     *
     * The widest channel travels ~243 8-bit units across the whole journey, so
     * 320 steps moves it by 0.76 of a unit per step — below what a display can
     * resolve, and the ground is a flat fill with no gradient banding to
     * expose. Going finer than this only buys extra document-wide restyles.
     */
    const STEP = 1 / 320;
    let lastKey = -1;

    // Only write a property when its value actually differs from what is
    // already on the element.
    const written = new Map<string, string>();
    const set = (name: string, value: string) => {
      if (written.get(name) === value) return;
      written.set(name, value);
      root.style.setProperty(name, value);
    };

    /**
     * While the ground is moving, every element with a colour transition would
     * restart that transition on each step. Marking the root lets CSS suspend
     * them for the duration of the movement; they return as soon as it settles,
     * so hover states still animate normally.
     */
    let shifting = false;
    let settleTimer = 0;
    const markShifting = () => {
      if (!shifting) {
        shifting = true;
        root.setAttribute("data-stage-shift", "");
      }
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        shifting = false;
        root.removeAttribute("data-stage-shift");
      }, 180);
    };

    const apply = (progress: number, force = false) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const key = Math.round(clamped / STEP);
      if (key === lastKey && !force) return;
      if (key !== lastKey && !force) markShifting();
      lastKey = key;

      const p = paletteAt(key * STEP);

      // Signed tint: positive lightens the ground, negative darkens it. See
      // StagePalette for why the sign has to travel with the journey.
      const tint = (value: number) =>
        value >= 0
          ? `rgb(255 255 255 / ${value.toFixed(3)})`
          : `rgb(0 0 0 / ${(-value).toFixed(3)})`;

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
      set("--stage-progress", clamped.toFixed(3));

      if (p.stage !== stage) {
        stage = p.stage;
        root.dataset.stage = p.stage;
      }
    };

    // Cached so the per-frame read is just window.scrollY, not a layout query.
    let maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
    const measure = () => {
      maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
    };
    const readProgress = () => (maxScroll > 0 ? window.scrollY / maxScroll : 0);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);

    // Reduced motion skips the smoothing entirely: the colour journey still
    // happens (it carries the design's legibility, and a colour change is not
    // vestibular motion) but it tracks native scroll directly.
    if (reduced) {
      let frame = 0;
      const onScroll = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          measure();
          apply(readProgress());
        });
      };

      apply(readProgress(), true);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", onScroll);
      };
    }

    let dispose: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      const { gsap } = await import("@/lib/gsap");
      if (cancelled) return;

      let current = readProgress();
      apply(current, true);

      /**
       * Applying the palette costs a document-wide restyle, and that cost is
       * linear in how often it happens — throttling updates to a third cut
       * style recalculation by 36% in profiling. A colour fade this slow is
       * indistinguishable at 30Hz from 60Hz, so the ground is repainted at most
       * every 32ms while the smoothing itself keeps running every frame. The
       * eased value is never behind; only the number of writes changes.
       */
      const MIN_APPLY_MS = 32;
      let lastApply = 0;

      // Eased toward the live scroll position so the ground settles into each
      // stage rather than tracking the wheel rigidly.
      const tick = () => {
        const target = readProgress();
        const diff = target - current;

        if (Math.abs(diff) < 0.00015) {
          // Settling: always land on the exact value, whatever the throttle.
          if (current !== target) {
            current = target;
            apply(current);
            lastApply = performance.now();
          }
          return;
        }

        current += diff * Math.min(1, 0.11 * gsap.ticker.deltaRatio());

        const now = performance.now();
        if (now - lastApply < MIN_APPLY_MS) return;
        lastApply = now;
        apply(current);
      };

      gsap.ticker.add(tick);
      dispose = () => gsap.ticker.remove(tick);
    };

    void start();

    return () => {
      cancelled = true;
      dispose?.();
      window.clearTimeout(settleTimer);
      root.removeAttribute("data-stage-shift");
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
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
