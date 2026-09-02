"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const interactive = finePointer && !reduced;

  const track = (event: React.MouseEvent<HTMLElement>) => {
    const node = cardRef.current;
    if (!interactive || !node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--px", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty("--py", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const enter = () => {
    if (!interactive) return;
    gsap.to(cardRef.current, { y: -6, duration: 0.5, ease: "power3.out" });
    gsap.to(cardRef.current?.querySelector("[data-media]") ?? null, {
      scale: 1.04,
      duration: 0.7,
      ease: "power3.out",
    });
    gsap.to(cardRef.current?.querySelector("[data-arrow]") ?? null, {
      x: 5,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const leave = () => {
    if (!interactive) return;
    gsap.to(cardRef.current, { y: 0, duration: 0.55, ease: "power3.out" });
    gsap.to(cardRef.current?.querySelector("[data-media]") ?? null, {
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
    });
    gsap.to(cardRef.current?.querySelector("[data-arrow]") ?? null, {
      x: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={track}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-xl transition-colors duration-500 hover:border-line-strong"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(28rem 20rem at var(--px, 50%) var(--py, 0%), rgba(124,156,255,0.13), transparent 70%)",
        }}
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-base">
        {project.image ? (
          <Image
            data-media
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            className="h-full w-full object-cover will-change-transform"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div data-media className="hairline-grid flex h-full w-full items-center justify-center">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-fg-subtle">
              Image pending
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
            {project.category}
          </span>
          <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fg-subtle tabular">
            {project.date}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl sm:text-2xl">
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        </div>

        {project.metrics.length > 0 ? (
          <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-subtle">
                  {metric.label}
                </dt>
                <dd className="font-display text-lg font-semibold tabular text-fg">{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
          <span
            data-arrow
            aria-hidden
            className="font-mono text-sm text-fg-subtle transition-colors group-hover:text-accent"
          >
            &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}
