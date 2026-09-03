import Link from "next/link";
import type { Project } from "@/data/projects";

function Pager({
  project,
  direction,
}: {
  project: Project;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      rel={isNext ? "next" : "prev"}
      className={`group flex flex-col gap-3 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-line-strong ${
        isNext ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="eyebrow">{isNext ? "Next project" : "Previous project"}</span>
      <span className="font-display text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-xl">
        {project.title}
      </span>
      {project.shortDescription ? (
        <span className="text-sm leading-relaxed text-fg-muted">{project.shortDescription}</span>
      ) : null}
    </Link>
  );
}

/**
 * Previous/next within the published order. Renders nothing when there is only
 * one project, and keeps the remaining side aligned when only one neighbour
 * exists.
 */
export function ProjectPager({
  previous,
  next,
}: {
  previous: Project | null;
  next: Project | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Project navigation" className="grid gap-4 sm:grid-cols-2">
      {previous ? <Pager project={previous} direction="previous" /> : <span aria-hidden />}
      {next ? <Pager project={next} direction="next" /> : null}
    </nav>
  );
}
