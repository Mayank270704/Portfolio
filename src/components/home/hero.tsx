"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { PipelineDiagram } from "@/components/home/pipeline-diagram";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";

const signature = skillCategories[0].items.slice(0, 6);

export function Hero() {
  const scope = useRef<HTMLDivElement>(null);
  const canPin = useMediaQuery("(min-width: 1024px)");

  useGsapContext((self) => {
    // The start state lives in CSS (html.motion-ready) so the first paint is
    // already the entrance's from-state instead of the final layout.
    const entrance = gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .fromTo("[data-hero-line] > span", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.09 })
      .fromTo("[data-hero-meta]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.75")
      .fromTo("[data-hero-cta]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo("[data-hero-diagram]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.7");

    let disposed = false;
    let handedOver = false;

    if (!canPin) {
      return () => {
        disposed = true;
      };
    }

    // The scrub drives the same properties as the entrance. Every endpoint is
    // stated explicitly and rendering is deferred, so scrubbing back to the top
    // restores the entrance's final state rather than whatever the entrance
    // happened to be showing when this timeline was built.
    const buildScrub = () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "+=110%",
            scrub: 0.6,
            pin: "[data-hero-stage]",
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none", immediateRender: false },
        })
        .fromTo("[data-hero-headline]", { scale: 1, y: 0 }, { scale: 0.94, y: -46, duration: 1 }, 0)
        .fromTo("[data-hero-meta]", { opacity: 1, y: 0 }, { opacity: 0, y: -24, duration: 0.55 }, 0)
        .fromTo("[data-hero-cta]", { opacity: 1, y: 0 }, { opacity: 0, y: -18, duration: 0.55 }, 0.05)
        .fromTo("[data-hero-diagram]", { y: 0 }, { y: -70, duration: 1 }, 0)
        .fromTo("[data-hero-diagram]", { opacity: 1 }, { opacity: 0.15, duration: 0.4 }, 0.6)
        .fromTo("[data-hero-veil]", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4);
    };

    // Hand over when the entrance settles, or immediately if the visitor
    // scrolls first — building the pin later would otherwise shift the page
    // under them.
    const handOver = () => {
      if (handedOver || disposed) return;
      handedOver = true;
      window.removeEventListener("scroll", handOver);
      entrance.progress(1);
      self.add(buildScrub);
    };

    entrance.eventCallback("onComplete", handOver);
    window.addEventListener("scroll", handOver, { passive: true });

    return () => {
      disposed = true;
      window.removeEventListener("scroll", handOver);
    };
  }, scope, canPin ? 1 : 0);

  return (
    <div ref={scope} className="relative">
      <div
        data-hero-stage
        className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-24 sm:pb-28"
      >
        <div
          data-hero-veil
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-void/40 to-void opacity-0"
        />

        <div className="shell relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex max-w-2xl flex-col gap-8 lg:flex-1">
            <div data-hero-headline className="flex flex-col gap-6">
              <span className="eyebrow" data-hero-meta>
                {profile.roleLong}
              </span>

              <h1
                className="text-[clamp(2.75rem,7.5vw,5.25rem)] leading-[0.98]"
                aria-label={`${profile.name}. ${profile.positioning}`}
              >
                <span data-hero-line className="block overflow-hidden pb-[0.08em]" aria-hidden>
                  <span className="block">Mayank Swaroop</span>
                </span>
                <span data-hero-line className="block overflow-hidden pb-[0.08em]" aria-hidden>
                  <span className="block text-fg-muted">Nandan</span>
                </span>
              </h1>

              <p
                data-hero-meta
                className="measure text-lg leading-relaxed text-fg-muted sm:text-xl"
              >
                {profile.positioning}
              </p>
            </div>

            <div data-hero-cta className="flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button href="/projects" size="lg">
                    View work
                  </Button>
                </Magnetic>
                <Button href="/about" variant="outline" size="lg">
                  About me
                </Button>
              </div>

              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {signature.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-subtle"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div data-hero-diagram className="lg:flex-1">
            <PipelineDiagram />
          </div>
        </div>

        <div className="shell pointer-events-none absolute inset-x-0 bottom-10 z-10 hidden items-center gap-4 lg:flex">
          <span className="eyebrow">Scroll</span>
          <span aria-hidden className="h-px w-16 bg-line-strong" />
        </div>
      </div>
    </div>
  );
}
