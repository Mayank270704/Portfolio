"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/data/projects";

/** The homepage carries at most this many case studies. */
export const FEATURED_LIMIT = 5;

/**
 * Featured work.
 *
 * Desktop pins the section and moves the rail sideways under the scroll, with
 * an active-project indicator and a progress bar tracking position. Below
 * 1024px the same cards stack vertically and scroll normally — the horizontal
 * telling is an enhancement, never the only way through.
 */
export function FeaturedWork({ projects }: { projects: Project[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  // Mirrors `active` so the scrub can compare without touching React state.
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  const featured = projects.slice(0, FEATURED_LIMIT);

  useGsapContext(() => {
    if (featured.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const viewport = stageRef.current;
      if (!track || !viewport) return;

      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (distance() <= 0) return;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => `+=${distance()}`,
          // Pin the inner stage, never this component's outermost node.
          // ScrollTrigger wraps whatever it pins in a .pin-spacer, and React
          // goes on believing the wrapped node is a direct child of <main>; the
          // next route change then calls main.removeChild() on a node that now
          // lives inside that spacer. Keeping the spacer inside a React-owned
          // wrapper means React only ever removes the wrapper, which really is
          // still its parent's child.
          pin: viewport,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
            // Which card is closest to the reading position. Compared against
            // a ref so a re-render is only requested when it genuinely changes,
            // rather than dispatching an update on every scrub frame.
            const index = Math.round(self.progress * (featured.length - 1));
            if (index !== activeRef.current) {
              activeRef.current = index;
              setActive(index);
            }
          },
        },
      });

      // Each card lifts into place as it enters, driven by the same horizontal
      // motion rather than by vertical scroll position.
      gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 28, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      return () => ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, scope, featured.length);

  if (featured.length === 0) {
    return (
      <section aria-labelledby="work-heading" className="relative py-20 sm:py-24 lg:py-32">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            id="work-heading"
            eyebrow="Selected work"
            title="Projects as evidence, not decoration"
            lede="Each case study follows the same structure: the problem, the approach, the architecture, and what the numbers actually said."
            action={
              <Button href="/projects" variant="outline" size="sm">
                All projects
              </Button>
            }
          />
          <Reveal>
            <div data-reveal>
              <EmptyState
                eyebrow="Selected work"
                title="Case studies are being written up"
                body="Five are in progress. They go live as each one is finished rather than as summaries, so what you read here is the whole story or nothing."
              />
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    // Outer wrapper stays React's child of <main>; the stage inside it is what
    // ScrollTrigger pins and wraps. See the pin comment above.
    <div ref={scope} className="relative">
      <div
        ref={stageRef}
        aria-labelledby="work-heading"
        className="relative lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:overflow-hidden"
      >
        <div className="shell flex flex-col gap-8 pb-12 pt-20 lg:pb-10 lg:pt-0">
          <SectionHeading
            id="work-heading"
            eyebrow="Selected work"
            title="Projects as evidence, not decoration"
            lede="Each case study follows the same structure: the problem, the approach, the architecture, and what the numbers actually said."
            action={
              <Button href="/projects" variant="outline" size="sm">
                All projects
              </Button>
            }
          />

          {/* Position indicator. Desktop only — on mobile the page scroll is
              already the indicator. */}
          <div className="hidden items-center gap-5 lg:flex">
            <ol className="flex items-center gap-2">
              {featured.map((project, index) => (
                <li key={project.slug}>
                  <span
                    aria-current={index === active ? "true" : undefined}
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      index === active ? "w-8 bg-accent" : "w-3 bg-line-strong"
                    }`}
                  >
                    <span className="sr-only">{project.title}</span>
                  </span>
                </li>
              ))}
            </ol>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle tabular">
              {String(active + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
            </span>
            <span className="relative h-px flex-1 overflow-hidden bg-line">
              <span
                ref={progressRef}
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-accent"
              />
            </span>
          </div>
        </div>

        <div className="lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col gap-6 px-[clamp(1.25rem,5vw,2.5rem)] pb-20 lg:w-max lg:flex-row lg:gap-8 lg:pb-0 lg:pr-[max(12vw,6rem)] lg:will-change-transform"
          >
            {featured.map((project, index) => (
              <div
                key={project.slug}
                data-work-card
                className="lg:w-[min(32rem,74vw)] lg:shrink-0"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
