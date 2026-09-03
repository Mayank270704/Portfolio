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
 * The hero portrait.
 *
 * The cutout is composed into the page rather than framed by it: a soft halo
 * behind, a hairline the figure stands on, and a mask that dissolves the
 * photograph's bottom crop into the ground. Because the ground colour travels
 * from white to near-black as you scroll, the fade goes to transparent rather
 * than to a colour — so the figure stays seated in the scene at every stage of
 * the journey.
 *
 * Pointer response is inertial and deliberately small: a few pixels of
 * translation and under a degree of rotation, with three layers moving by
 * different amounts. It should read as the light in the scene shifting, not as
 * an image chasing the cursor.
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
    const rings = root.querySelector<HTMLElement>("[data-portrait-rings]");
    if (!subject || !halo || !rings) return;

    // quickTo keeps one interpolating tween per property instead of spawning a
    // new tween on every pointer event.
    const subjectX = gsap.quickTo(subject, "x", { duration: 0.9, ease: "power3.out" });
    const subjectY = gsap.quickTo(subject, "y", { duration: 0.9, ease: "power3.out" });
    const subjectRot = gsap.quickTo(subject, "rotate", { duration: 1.3, ease: "power3.out" });
    const haloX = gsap.quickTo(halo, "x", { duration: 1.5, ease: "power3.out" });
    const haloY = gsap.quickTo(halo, "y", { duration: 1.5, ease: "power3.out" });
    const ringsX = gsap.quickTo(rings, "x", { duration: 1.7, ease: "power3.out" });
    const ringsY = gsap.quickTo(rings, "y", { duration: 1.7, ease: "power3.out" });

    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const render = () => {
      frame = 0;
      const { x, y } = pointer;
      // The subject leads, the halo displaces further in the same direction so
      // the light moves with him, and the rings counter-move for depth.
      subjectX(x * 18);
      subjectY(y * 12);
      subjectRot(x * 1.1);
      haloX(x * 40);
      haloY(y * 28);
      ringsX(x * -14);
      ringsY(y * -10);
    };

    const onMove = (event: PointerEvent) => {
      // Measured against the viewport, not the element, so the portrait keeps
      // responding while the cursor is anywhere on the page.
      pointer = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onLeave = () => {
      pointer = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gsap.set([subject, halo, rings], { x: 0, y: 0, rotate: 0 });
    };
  }, [interactive]);

  return (
    <div ref={scope} className="relative isolate mx-auto w-full max-w-[30rem] lg:max-w-none">
      <div className="relative aspect-[1/1.12] w-full">
        {/* Light behind the subject. Moves furthest, so it reads as depth. */}
        <div
          data-portrait-halo
          data-hero-halo
          aria-hidden
          className="pointer-events-none absolute inset-[-22%] -z-20 will-change-transform"
          style={{ background: "var(--portrait-halo)" }}
        />

        {/* Two hairline rings — structure behind the figure, not a frame around
            him. They counter-move, which separates him from the background. */}
        <div
          data-portrait-rings
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        >
          <div className="absolute left-1/2 top-[6%] aspect-square w-[78%] -translate-x-1/2 rounded-full border border-line" />
          <div className="absolute left-1/2 top-[16%] aspect-square w-[58%] -translate-x-1/2 rounded-full border border-line" />
        </div>

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
              sizes="(max-width: 1024px) 78vw, 42vw"
              className="object-contain object-bottom"
              // Dissolves the photograph's bottom crop into whatever the ground
              // currently is, instead of ending on a hard cut.
              style={{
                maskImage: "linear-gradient(to bottom, #000 82%, transparent 99%)",
                WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 99%)",
              }}
            />
          ) : (
            <PortraitPlaceholder />
          )}
        </div>

        {/* The line he stands on. Sits above the fade, so the figure reads as
            grounded rather than floating. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[-6%] bottom-[6%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-line-strong) 22%, var(--color-line-strong) 78%, transparent)",
          }}
        />
      </div>
    </div>
  );
}

/**
 * Shown until the real cutout is in place. A composition, not a stand-in for a
 * person: no figure is implied and nothing needs removing later.
 */
function PortraitPlaceholder() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute inset-x-[16%] bottom-[6%] top-[14%] overflow-hidden rounded-t-full border border-line-strong/60">
        <div className="hairline-grid h-full w-full opacity-70" />
      </div>
    </div>
  );
}
