"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { skillCategories } from "@/data/skills";

export function CapabilityJourney() {
  const scope = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const horizontal = useMediaQuery("(min-width: 1024px)");

  useGsapContext(() => {
    if (!horizontal) return;

    const track = trackRef.current;
    const viewport = scope.current;
    if (!track || !viewport) return;

    const distance = () => track.scrollWidth - viewport.clientWidth;
    if (distance() <= 0) return;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: viewport,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
      gsap.fromTo(
        panel.querySelectorAll("[data-panel-item]"),
        { opacity: 0.25, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ScrollTrigger.refresh();
  }, scope, horizontal ? 1 : 0);

  return (
    <div
      ref={scope}
      className="relative lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:overflow-hidden"
    >
      <div className="shell pb-12 pt-20 lg:pb-14 lg:pt-0">
        <SectionHeading
          id="capability-heading"
          eyebrow="Capability map"
          title="Where I work across the stack"
          lede="Four layers, ordered the way I actually approach a problem: the model first, then everything needed to put it in front of someone."
        />
      </div>

      <div className="lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-[clamp(1.25rem,5vw,2.5rem)] pb-20 lg:w-max lg:flex-row lg:gap-8 lg:pb-0 lg:pr-[max(12vw,6rem)] lg:will-change-transform"
        >
          {skillCategories.map((category, index) => (
            <article
              key={category.id}
              data-panel
              className="flex flex-col gap-6 rounded-2xl border border-line bg-surface/60 p-7 backdrop-blur-xl lg:w-[min(30rem,72vw)] lg:shrink-0 lg:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-subtle">
                  Layer
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-2xl lg:text-[1.75rem]">{category.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{category.summary}</p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-6">
                {category.items.map((item) => (
                  <span key={item} data-panel-item>
                    <Tag>{item}</Tag>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
