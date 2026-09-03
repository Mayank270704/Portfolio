"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { PORTRAIT_ASSET } from "@/data/profile";

interface PortraitProps {
  /** Resolved on the server: is the real cutout present under `public/`? */
  available: boolean;
  alt: string;
}

/**
 * The hero portrait: a transparent cutout on a soft halo, with an inertial
 * response to the pointer.
 *
 * Movement is deliberately small — a few pixels of translation and under a
 * degree of rotation — so it reads as the light in the scene shifting rather
 * than the image chasing the cursor. Three layers move by different amounts,
 * which is what gives the parallax its depth.
 */
export function Portrait({ available, alt }: PortraitProps) {
  const scope = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const interactive = finePointer && !reduced;

  useEffect(() => {
    const root = scope.current;
    if (!interactive || !root) return;

    const subject = root.querySelector<HTMLElement>("[data-portrait-subject]");
    const halo = root.querySelector<HTMLElement>("[data-portrait-halo]");
    const frame = root.querySelector<HTMLElement>("[data-portrait-frame]");
    if (!subject || !halo || !frame) return;

    // quickTo keeps a single interpolating tween per property instead of
    // spawning a new tween on every mousemove.
    const setup = { duration: 0.9, ease: "power3.out" } as const;
    const subjectX = gsap.quickTo(subject, "x", setup);
    const subjectY = gsap.quickTo(subject, "y", setup);
    const subjectRotate = gsap.quickTo(subject, "rotate", { duration: 1.2, ease: "power3.out" });
    const haloX = gsap.quickTo(halo, "x", { duration: 1.4, ease: "power3.out" });
    const haloY = gsap.quickTo(halo, "y", { duration: 1.4, ease: "power3.out" });
    const frameX = gsap.quickTo(frame, "x", { duration: 1.6, ease: "power3.out" });
    const frameY = gsap.quickTo(frame, "y", { duration: 1.6, ease: "power3.out" });

    let frameId = 0;
    let pointer = { x: 0, y: 0 };

    const render = () => {
      frameId = 0;
      const { x, y } = pointer;
      subjectX(x * 14);
      subjectY(y * 10);
      subjectRotate(x * 0.9);
      // The halo trails further and in the same direction, so the light
      // displaces with the subject instead of sitting behind it.
      haloX(x * 30);
      haloY(y * 22);
      frameX(x * -8);
      frameY(y * -6);
    };

    const onMove = (event: PointerEvent) => {
      // Measured against the viewport, not the element, so the portrait keeps
      // responding when the cursor is elsewhere on the page.
      pointer = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    const onLeave = () => {
      pointer = { x: 0, y: 0 };
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gsap.set([subject, halo, frame], { x: 0, y: 0, rotate: 0 });
    };
  }, [interactive]);

  return (
    <div ref={scope} className="relative isolate mx-auto w-full max-w-[34rem] lg:max-w-none">
      <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
        {/* Light behind the subject. Moves furthest, so it reads as depth. */}
        <div
          data-portrait-halo
          data-hero-halo
          aria-hidden
          className="pointer-events-none absolute inset-[-18%] -z-10 will-change-transform"
          style={{ background: "var(--portrait-halo)" }}
        />

        {/* Editorial frame: a hairline plate the subject sits in front of. */}
        <div
          data-portrait-frame
          aria-hidden
          className="absolute inset-x-[8%] bottom-0 top-[9%] -z-10 rounded-t-full border border-line bg-surface will-change-transform"
        />

        <div
          data-portrait-subject
          data-hero-portrait
          className="absolute inset-0 will-change-transform"
        >
          {available ? (
            <Image
              src={PORTRAIT_ASSET}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-contain object-bottom"
            />
          ) : (
            <PortraitPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Shown until the real cutout is in place. It is a composition, not a stand-in
 * for a person: no figure is implied and nothing needs removing later — the
 * moment the file exists at the expected path, the photograph takes over.
 */
function PortraitPlaceholder() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute inset-x-[14%] bottom-0 top-[14%] overflow-hidden rounded-t-full border border-line-strong/60">
        <div className="hairline-grid h-full w-full opacity-70" />
      </div>
      <div
        className="absolute inset-x-[26%] bottom-[18%] top-[26%] rounded-t-full opacity-70"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--glow-accent) / 0.22), rgb(var(--glow-accent) / 0) 72%)",
        }}
      />
    </div>
  );
}
