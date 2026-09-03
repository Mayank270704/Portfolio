"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { TechTile } from "@/components/home/tech-wall";

/** Rows alternate direction: row 1 left, row 2 right, row 3 left, row 4 right. */
const ROW_COUNT = 4;

/**
 * Seconds for a row to travel one full copy of its content. Varied slightly per
 * row so the wall does not read as one rigid mechanism, but all slow enough to
 * read a tile as it passes.
 */
const ROW_DURATIONS = [58, 68, 52, 63];

function chunk<T>(items: T[], rows: number): T[][] {
  // Sequential chunks rather than round-robin: the tiles arrive grouped by
  // layer, and keeping neighbours together keeps each row coherent.
  const out: T[][] = Array.from({ length: rows }, () => []);
  const size = Math.ceil(items.length / rows);
  items.forEach((item, index) => {
    out[Math.min(rows - 1, Math.floor(index / size))].push(item);
  });
  return out.filter((row) => row.length > 0);
}

export function TechWallGrid({ tiles }: { tiles: TechTile[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rows = chunk(tiles, ROW_COUNT);

  useGsapContext(() => {
    const q = gsap.utils.selector(scope);
    const tracks = q("[data-tech-track]") as HTMLElement[];
    if (tracks.length === 0) return;

    // One tween per row, driving one transform. No per-tile animation and no
    // JS per frame — GSAP interpolates a single xPercent per track.
    const loops = tracks.map((track, index) => {
      const toLeft = index % 2 === 0;

      // The track holds the tile set twice, so translating by exactly half its
      // width lands on the start of the identical second copy: the loop point
      // is visually identical to the start, which is what makes it seamless.
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

    // Rows arrive with a small vertical offset, then the marquee takes over.
    const entrance = gsap.fromTo(
      tracks,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.09,
        paused: true,
        onStart: () => {
          started = true;
          loops.forEach((loop) => loop.play());
        },
      },
    );

    const trigger = ScrollTrigger.create({
      trigger: scope.current,
      start: "top 88%",
      end: "bottom top",
      onEnter: () => entrance.play(),
      // Suspend while off-screen so four tweens are not running for the whole
      // page. Resumed, never restarted, so position is preserved.
      onToggle: (self) => {
        if (!started) return;
        loops.forEach((loop) => (self.isActive ? loop.play() : loop.pause()));
      },
    });

    // Hovering a row eases it down rather than stopping it, so a tile can be
    // read without the wall jolting.
    const hover = gsap.matchMedia();
    const cleanups: Array<() => void> = [];

    hover.add("(hover: hover) and (pointer: fine)", () => {
      tracks.forEach((track, index) => {
        const row = track.parentElement;
        if (!row) return;
        const loop = loops[index];
        const slow = () => gsap.to(loop, { timeScale: 0.18, duration: 0.6, overwrite: true });
        const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true });
        row.addEventListener("pointerenter", slow);
        row.addEventListener("pointerleave", resume);
        cleanups.push(() => {
          row.removeEventListener("pointerenter", slow);
          row.removeEventListener("pointerleave", resume);
        });
      });
    });

    return () => {
      trigger.kill();
      entrance.kill();
      loops.forEach((loop) => loop.kill());
      cleanups.forEach((fn) => fn());
      hover.revert();
    };
  }, scope);

  // Reduced motion gets a static, wrapped wall. A paused marquee would leave
  // most of each row parked outside its overflow-hidden container, hiding
  // content rather than just holding it still.
  if (reduced) {
    return (
      <div className="mt-12 flex flex-wrap justify-center px-[clamp(1.25rem,5vw,2.5rem)]">
        {tiles.map((tile) => (
          <TechTileCard key={tile.name} tile={tile} spaced />
        ))}
      </div>
    );
  }

  return (
    <div ref={scope} className="mt-12 flex flex-col gap-3">
      {rows.map((row, index) => (
        <div
          key={index}
          data-tech-row
          // overflow-hidden keeps the oversized track from ever reaching the
          // document, so a marquee can never create horizontal page scroll.
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div data-tech-track className="flex w-max flex-nowrap will-change-transform">
            {row.map((tile) => (
              <TechTileCard key={tile.name} tile={tile} />
            ))}
            {/* The seamless second copy, hidden from assistive tech so the wall
                is not announced twice. */}
            {row.map((tile) => (
              <TechTileCard key={`echo-${tile.name}`} tile={tile} echo />
            ))}
          </div>
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
      className={`group mr-3 flex shrink-0 items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-[transform,border-color,background-color] duration-500 ease-out hover:-translate-y-1 hover:border-line-strong hover:bg-raised ${
        spaced ? "mb-3" : ""
      }`}
    >
      {tile.path ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-5 w-5 shrink-0 transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ fill: tile.hex ?? "currentColor" }}
        >
          <path d={tile.path} />
        </svg>
      ) : (
        <span
          aria-hidden
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-line-strong font-mono text-[0.5625rem] text-fg-subtle transition-transform duration-500 ease-out group-hover:scale-110"
        >
          {tile.name.slice(0, 1)}
        </span>
      )}
      <span className="whitespace-nowrap text-[0.8125rem] font-medium tracking-tight text-fg-muted transition-colors duration-500 group-hover:text-fg">
        {tile.name}
      </span>
    </div>
  );
}
