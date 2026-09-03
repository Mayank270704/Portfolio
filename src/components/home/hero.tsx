"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Portrait } from "@/components/home/portrait";
import { profile } from "@/data/profile";
import { allSkills } from "@/data/skills";
import { TECH_LABELS } from "@/data/tech";

/**
 * A cross-section of the real skills list rather than one category, so the
 * strip under the hero reads as what the work actually is.
 */
const SIGNATURE = [
  "Python",
  "FastAPI",
  "Retrieval-Augmented Generation (RAG)",
  "FAISS",
  "LLMs",
].filter((name) => allSkills.includes(name));

export function Hero({ portraitAvailable }: { portraitAvailable: boolean }) {
  const scope = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const q = gsap.utils.selector(scope);

    const headline = q("[data-hero-headline]");
    const meta = q("[data-hero-meta]");
    const cta = q("[data-hero-cta]");
    const portrait = q("[data-hero-portrait]");
    const halo = q("[data-hero-halo]");
    const scrollCue = q("[data-hero-scroll]");
    const column = q("[data-hero-column]");

    // The from-state of every tween below is already applied by CSS
    // (html.motion-ready), so the first paint and the first frame match.
    const entrance = gsap
      .timeline({ defaults: { ease: "expo.out" } })
      // `y: 0` is not redundant. The CSS from-state is a percentage translate,
      // and GSAP reads the computed matrix back as pixels — so without pinning
      // y to 0 it animates yPercent to 0 while a parsed y of ~95px stays on the
      // element, and the headline never leaves its overflow-hidden mask.
      .fromTo(
        q("[data-hero-line] > span"),
        { yPercent: 110, y: 0 },
        { yPercent: 0, y: 0, duration: 1.25, stagger: 0.08 },
      )
      .fromTo(halo, { opacity: 0 }, { opacity: 1, duration: 1.4 }, "-=1.05")
      .fromTo(
        portrait,
        { opacity: 0, y: 34, scale: 1.04 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" },
        "-=1.25",
      )
      .fromTo(meta, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, "-=1.05")
      .fromTo(cta, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.65")
      .fromTo(scrollCue, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.35");

    // Whatever the scrub was mid-way through, this is the state the hero must
    // return to once the visitor is back above it. Scrolling down and up
    // repeatedly is a normal thing to do, so it is asserted rather than assumed.
    const restEntranceState = () => {
      gsap.set(headline, { scale: 1, y: 0 });
      gsap.set([...meta, ...cta], { opacity: 1, y: 0 });
      gsap.set(portrait, { opacity: 1, y: 0, scale: 1 });
      gsap.set(halo, { opacity: 1, y: 0, scale: 1 });
      gsap.set(scrollCue, { opacity: 1 });
      gsap.set(column, { y: 0 });
    };

    // gsap.matchMedia owns the desktop-only pin. Using it instead of a React
    // media-query hook keeps the entrance out of the conditional: a width
    // change (including the one React makes at hydration, when the
    // server-rendered `false` is replaced by the real match) would otherwise
    // tear down and rebuild the whole context, restarting the entrance
    // mid-flight.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", (context) => {
      let handedOver = false;
      let disposed = false;

      const buildScrub = () => {
        const scrub = gsap
          .timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: "+=88%",
              scrub: 0.6,
              pin: "[data-hero-stage]",
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
            defaults: { ease: "none", immediateRender: false },
          })
          // The text recedes: scaled back and lifted, as if the camera is
          // pulling away from the page rather than the page sliding up.
          .fromTo(headline, { scale: 1, y: 0 }, { scale: 0.93, y: -54, duration: 1 }, 0)
          .fromTo([...meta, ...cta], { opacity: 1, y: 0 }, { opacity: 0, y: -26, duration: 0.5 }, 0)
          .fromTo(scrollCue, { opacity: 1 }, { opacity: 0, duration: 0.25 }, 0)
          // The portrait holds longer and moves less, so it stays the anchor of
          // the composition while everything else clears out around it.
          .fromTo(portrait, { y: 0, scale: 1 }, { y: -92, scale: 1.06, duration: 1 }, 0)
          .fromTo(halo, { y: 0, scale: 1 }, { y: -130, scale: 1.18, duration: 1 }, 0)
          .fromTo(portrait, { opacity: 1 }, { opacity: 0.2, duration: 0.4 }, 0.55)
          .fromTo(halo, { opacity: 1 }, { opacity: 0, duration: 0.45 }, 0.5);

        scrub.eventCallback("onUpdate", () => {
          if (scrub.progress() === 0) restEntranceState();
        });
      };

      // Hand over when the entrance settles, or immediately if the visitor
      // scrolls first — building the pin later would otherwise shift the page
      // under them.
      const handOver = () => {
        if (handedOver || disposed) return;
        handedOver = true;
        window.removeEventListener("scroll", handOver);
        entrance.progress(1);
        context.add(buildScrub);
      };

      entrance.eventCallback("onComplete", handOver);
      window.addEventListener("scroll", handOver, { passive: true });

      return () => {
        disposed = true;
        entrance.eventCallback("onComplete", null);
        window.removeEventListener("scroll", handOver);
        // The pin is gone below 1024px, so the hero has to be handed back in
        // its finished state rather than wherever the scrub left it.
        restEntranceState();
      };
    });

    // Tablet keeps the choreography but drops the pin: a short parallax offset
    // between the text column and the portrait, nothing that holds the page.
    mm.add("(min-width: 768px) and (max-width: 1023.98px)", () => {
      gsap.fromTo(
        portrait,
        { y: 0 },
        {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    });

    return () => mm.revert();
  }, scope);

  return (
    <div ref={scope} className="relative">
      <div
        data-hero-stage
        className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-[calc(var(--header-h)+2rem)] pb-16 sm:pb-20"
      >
        <div className="shell relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div data-hero-column className="order-2 flex flex-col gap-9 lg:order-1">
            <div data-hero-headline className="flex flex-col gap-6">
              <span className="eyebrow" data-hero-meta>
                {profile.roleLong}
              </span>

              <h1
                className="display text-[clamp(2.75rem,8vw,5.5rem)]"
                aria-label={`${profile.name}. ${profile.positioning}`}
              >
                <span data-hero-line className="block overflow-hidden pb-[0.09em]" aria-hidden>
                  <span className="block">Mayank</span>
                </span>
                <span data-hero-line className="block overflow-hidden pb-[0.09em]" aria-hidden>
                  <span className="block">Swaroop</span>
                </span>
                <span data-hero-line className="block overflow-hidden pb-[0.09em]" aria-hidden>
                  <span className="block text-fg-muted">Nandan</span>
                </span>
              </h1>

              <p data-hero-meta className="measure text-lg leading-relaxed text-fg-muted sm:text-xl">
                {profile.positioning}
              </p>
            </div>

            <div data-hero-cta className="flex flex-col gap-7">
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
                {SIGNATURE.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-subtle"
                  >
                    {TECH_LABELS[item] ?? item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Portrait
              available={portraitAvailable}
              alt={`${profile.name}, ${profile.role}`}
            />
          </div>
        </div>

        <div
          data-hero-scroll
          className="shell pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden items-center gap-4 lg:flex"
        >
          <span className="eyebrow">Scroll</span>
          <span aria-hidden className="h-px w-16 bg-line-strong" />
        </div>
      </div>
    </div>
  );
}
