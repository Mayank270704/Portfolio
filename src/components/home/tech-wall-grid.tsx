"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { TechTile } from "@/components/home/tech-wall";

/** Rows alternate: 1 left, 2 right, 3 left, 4 right, 5 left. */
const ROW_COUNT = 5;

/**
 * Tiles per row.
 *
 * A marquee only looks seamless while one copy of the track is wider than its
 * container — otherwise the loop point arrives inside the viewport and leaves a
 * visible gap. The skills list is short, so each row takes a long window of the
 * full list rather than an exclusive slice: rows differ by where they start.
 *
 * The count is per breakpoint because it is pure cost. A tile is ~135px, so 16
 * covers a 1920px viewport with margin, while a narrow screen needs a fraction
 * of that — and every extra tile is another element the browser restyles each
 * time the colour journey advances. Profiling at 390px put the wall at 65% of
 * scroll style-recalculation with the wide count; the row still out-widths a
 * 768px viewport at 8.
 */
const ROW_LENGTH_WIDE = 16;
const ROW_LENGTH_NARROW = 8;

/** Seconds for a row to travel exactly one copy of its content. */
const ROW_DURATIONS = [64, 78, 58, 84, 70];

/** A window of `length` tiles starting at `offset`, wrapping around the list. */
function windowFrom<T>(items: T[], offset: number, length: number): T[] {
  if (items.length === 0) return [];
  return Array.from({ length }, (_, i) => items[(offset + i) % items.length]);
}

export function TechWallGrid({ tiles }: { tiles: TechTile[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Defaults to the wide count on the server so desktop — where the pinned,
  // scrubbed sections live — renders its final DOM in one pass. Narrow screens
  // drop to the short rows on hydration, which is a single cheap re-render.
  const wide = useMediaQuery("(min-width: 768px)", true);
  const rowLength = wide ? ROW_LENGTH_WIDE : ROW_LENGTH_NARROW;

  const stride = Math.max(1, Math.floor(tiles.length / ROW_COUNT));
  const rows = Array.from({ length: ROW_COUNT }, (_, index) =>
    windowFrom(tiles, index * stride, Math.min(rowLength, Math.max(tiles.length, 1))),
  );

  useGsapContext(() => {
    const q = gsap.utils.selector(scope);
    const tracks = q("[data-tech-track]") as HTMLElement[];
    if (tracks.length === 0) return;

    // One tween per row, driving one transform. No per-tile animation and no
    // JS per frame — GSAP interpolates a single xPercent per track.
    const loops = tracks.map((track, index) => {
      const toLeft = index % 2 === 0;

      // The track holds the row twice, so translating by exactly half its width
      // lands on the start of the identical second copy: the loop point is
      // visually identical to the start, which is what makes it seamless.
      // Tiles carry a right margin rather than the track carrying a flex gap —
      // with a gap, half the track width falls half a gap short of one full
      // copy and the loop visibly jumps.
      return gsap.fromTo(
        track,
        { xPercent: toLeft ? 0 : -50 },
        {
          xPercent: toLeft ? -50 : 0,
          duration: ROW_DURATIONS[index % ROW_DURATIONS.length],
          ease: "none",
          repeat: -1,
          paused: true,
        },
      );
    });

    let started = false;
    let lastSkew = Number.NaN;

    // Rows arrive staggered, then the marquee takes over.
    const entrance = gsap.fromTo(
      tracks,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        paused: true,
        onStart: () => {
          started = true;
          loops.forEach((loop) => loop.play());
        },
      },
    );

    const triggers = [
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top 88%",
        end: "bottom top",
        onEnter: () => entrance.play(),
        // Suspend while off-screen so five tweens are not running for the whole
        // page. Resumed, never restarted, so position is preserved.
        onToggle: (self) => {
          if (!started) return;
          loops.forEach((loop) => (self.isActive ? loop.play() : loop.pause()));
        },
      }),
      // A gentle scroll-linked skew on top of the constant motion, so the wall
      // reacts to the page rather than running independently of it.
      //
      // The written value is rounded to 1/100th of a degree and skipped when
      // unchanged. Writing an inline transform on this element restyles all
      // five rows and their tiles, and profiling put that at 25% of the
      // remaining scroll cost; at a total range of 1.2 degrees the rounding is
      // far below anything visible, but it removes most of the writes.
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const drift = (self.progress - 0.5) * 2;
          const skewY = Math.round(drift * -0.6 * 100) / 100;
          if (skewY === lastSkew) return;
          lastSkew = skewY;
          gsap.set(scope.current, { skewY });
        },
      }),
    ];

    // Hovering a row eases it down rather than stopping it, so a tile can be
    // read without the wall jolting.
    const hover = gsap.matchMedia();
    const cleanups: Array<() => void> = [];

    hover.add("(hover: hover) and (pointer: fine)", () => {
      tracks.forEach((track, index) => {
        const row = track.parentElement;
        if (!row) return;
        const loop = loops[index];
        const slow = () => gsap.to(loop, { timeScale: 0.15, duration: 0.7, overwrite: true });
        const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.9, overwrite: true });
        row.addEventListener("pointerenter", slow);
        row.addEventListener("pointerleave", resume);
        cleanups.push(() => {
          row.removeEventListener("pointerenter", slow);
          row.removeEventListener("pointerleave", resume);
        });
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      entrance.kill();
      loops.forEach((loop) => loop.kill());
      cleanups.forEach((fn) => fn());
      hover.revert();
      gsap.set(scope.current, { clearProps: "transform" });
    };
  }, scope);

  // Reduced motion gets a static, wrapped wall of the real list — no repeats.
  // A paused marquee would leave most of each row parked outside its
  // overflow-hidden container, hiding content rather than holding it still.
  if (reduced) {
    return (
      <div className="mt-14 flex flex-wrap justify-center px-[clamp(1.25rem,5vw,2.5rem)]">
        {tiles.map((tile) => (
          <TechTileCard key={tile.name} tile={tile} spaced />
        ))}
      </div>
    );
  }

  return (
    <div ref={scope} className="mt-14 flex flex-col gap-3 sm:gap-4">
      {rows.map((row, index) => (
        <div
          key={index}
          data-tech-row
          // overflow-hidden keeps the oversized track from ever reaching the
          // document, so a marquee can never create horizontal page scroll.
          className="relative overflow-hidden [contain:layout_paint]"
        >
          <div data-tech-track className="flex w-max flex-nowrap will-change-transform">
            {row.map((tile, i) => (
              <TechTileCard key={`a-${i}-${tile.name}`} tile={tile} />
            ))}
            {/* The seamless second copy, hidden from assistive tech so the wall
                is not announced twice. */}
            {row.map((tile, i) => (
              <TechTileCard key={`b-${i}-${tile.name}`} tile={tile} echo />
            ))}
          </div>

          {/*
            Edge fade.

            This was a mask-image on the row itself, which reproduced the same
            look but forced an offscreen rasterisation pass on every frame the
            track moved — profiling attributed 77% of all scroll rasterisation
            to those five masks. Two gradient overlays in the ground colour give
            an identical result with an ordinary composited paint, and they
            track the colour journey automatically because the gradient reads
            the same --color-void everything else does.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[7%]"
            style={{ background: "linear-gradient(90deg, var(--color-void), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[7%]"
            style={{ background: "linear-gradient(270deg, var(--color-void), transparent)" }}
          />
        </div>
      ))}
    </div>
  );
}

function TechTileCard({
  tile,
  echo = false,
  spaced = false,
}: {
  tile: TechTile;
  echo?: boolean;
  spaced?: boolean;
}) {
  return (
    <div
      data-tech-tile
      aria-hidden={echo || undefined}
      className={`group mr-3 flex shrink-0 items-center gap-3 rounded-xl border border-line bg-surface px-5 py-3.5 transition-transform duration-500 ease-out hover:-translate-y-1 hover:border-line-strong hover:bg-raised sm:mr-4 ${
        spaced ? "mb-3" : ""
      }`}
    >
      {tile.path ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-[1.125rem] w-[1.125rem] shrink-0 transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ fill: tile.hex ?? "currentColor" }}
        >
          <path d={tile.path} />
        </svg>
      ) : (
        <span
          aria-hidden
          className="flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-[5px] border border-line-strong font-mono text-[0.5rem] text-fg-subtle transition-transform duration-500 ease-out group-hover:scale-110"
        >
          {tile.label.slice(0, 1)}
        </span>
      )}
      <span className="whitespace-nowrap text-[0.8125rem] font-medium tracking-tight text-fg-muted transition-colors duration-500 group-hover:text-fg">
        {tile.label}
      </span>
    </div>
  );
}
