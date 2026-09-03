import type { ExternalLink, ImageAsset } from "@/data/types";

export type ProjectStatus = "shipped" | "in-progress" | "archived";

export type ProjectMetric = {
  label: string;
  value: string;
  note?: string;
};

/** A titled prose block. Used for architecture and implementation sections. */
export type ProjectSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** One or two sentences. Used on cards, the case-study lede, and metadata. */
  shortDescription: string;
  category: string;
  role: string;
  /** Free-form, e.g. `"2025"` or `"Mar 2025"`. */
  date: string;
  status: ProjectStatus;
  featured: boolean;
  tags: string[];
  stack: string[];

  problem: string;
  approach: string;
  /** How the system is put together. One block per concern. */
  architecture?: ProjectSection[];
  /** The engineering detail: notable decisions, trade-offs, hard parts. */
  implementation?: ProjectSection[];
  features?: string[];
  metrics?: ProjectMetric[];

  /** Card and case-study cover. */
  image?: ImageAsset | null;
  /** Screenshots and architecture diagrams. */
  gallery?: ImageAsset[];

  github?: string | null;
  demo?: string | null;
  /** Anything else worth linking: paper, dataset, blog post. */
  links?: ExternalLink[];
};

/**
 * Case studies. Empty until real work is written up — a fabricated project
 * costs more credibility than an empty section.
 */
export const projects: Project[] = [];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Previous/next within the published order, without wrapping around.
 */
export function getProjectNeighbours(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}

/** The external links a case study should offer, in display order. */
export function getProjectLinks(project: Project): ExternalLink[] {
  return [
    project.demo ? { label: "Live demo", href: project.demo } : null,
    project.github ? { label: "Repository", href: project.github } : null,
    ...(project.links ?? []),
  ].filter((link): link is ExternalLink => link !== null);
}
