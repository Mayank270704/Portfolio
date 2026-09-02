"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";

const stages = [
  { id: "data", label: "Data", note: "collect / clean" },
  { id: "features", label: "Features", note: "shape / encode" },
  { id: "model", label: "Model", note: "train / tune" },
  { id: "eval", label: "Evaluate", note: "measure / compare" },
  { id: "serve", label: "Serve", note: "deploy / observe" },
];

export function PipelineDiagram() {
  const scope = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const paths = gsap.utils.toArray<SVGPathElement>("[data-flow]");

    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    gsap
      .timeline({ delay: 0.5 })
      .to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: "power2.inOut" })
      .fromTo(
        "[data-node]",
        { opacity: 0, scale: 0.86 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.09, ease: "back.out(1.7)" },
        "-=1.05",
      );

    gsap.to("[data-pulse]", {
      opacity: 0.9,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.35, from: "start" },
      ease: "sine.inOut",
    });
  }, scope);

  return (
    <div ref={scope} className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-6 backdrop-blur-xl sm:p-8">
        <div className="mb-7 flex items-center justify-between gap-4">
          <span className="eyebrow">Working pipeline</span>
          <span className="font-mono text-[0.625rem] tracking-[0.14em] text-fg-subtle">
            end &rarr; end
          </span>
        </div>

        <ol className="flex flex-col gap-0" role="list">
          {stages.map((stage, index) => (
            <li key={stage.id} className="relative flex items-start gap-4">
              <div className="relative flex w-6 shrink-0 flex-col items-center">
                <span
                  data-node
                  className="relative z-10 mt-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-accent"
                >
                  <span
                    data-pulse
                    className="absolute inset-[-6px] rounded-full border border-accent/40 opacity-25"
                  />
                </span>
                {index < stages.length - 1 ? (
                  <svg
                    className="h-12 w-px overflow-visible"
                    viewBox="0 0 1 48"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      data-flow
                      d="M0.5 0 L0.5 48"
                      stroke="currentColor"
                      className="text-line-strong"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                ) : null}
              </div>

              <div className="flex flex-1 items-baseline justify-between gap-4 pb-1">
                <span className="font-display text-sm font-semibold tracking-tight text-fg">
                  {stage.label}
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-fg-subtle">
                  {stage.note}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
