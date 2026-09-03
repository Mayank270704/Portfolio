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

/**
 * A case study.
 *
 * Only `slug` and `title` are required. Everything else is optional because the
 * write-ups land at different times: a repository can be listed the day it
 * exists, and the problem/approach/architecture sections appear as they are
 * actually written. The UI renders what is present and omits the rest, so a
 * thinly documented project reads as deliberate rather than broken.
 */
export type Project = {
  slug: string;
  title: string;
  /** One or two sentences. Used on cards, the case-study lede, and metadata. */
  shortDescription?: string;
  category?: string;
  role?: string;
  /** Free-form, e.g. `"Feb 2026"`. */
  date?: string;
  status?: ProjectStatus;
  featured: boolean;
  tags?: string[];
  stack?: string[];

  problem?: string;
  approach?: string;
  /** How the system is put together. One block per concern. */
  architecture?: ProjectSection[];
  /** The engineering detail: notable decisions, trade-offs, hard parts. */
  implementation?: ProjectSection[];
  /** What it actually does, one line each. */
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
 * The five real repositories.
 *
 * Two of them (AI Task Planner, AI-Powered PDF Reader) are described in the
 * resume, so their stack, date and feature list come from there verbatim. The
 * other three are listed by name and repository only — no description, stack or
 * date has been supplied for them yet, and none is invented here.
 */
export const projects: Project[] = [
  {
    slug: "ai-interview-intelligence-assessment-platform",
    title: "AI Interview Intelligence Assessment Platform",
    featured: true,
    github: "https://github.com/Mayank270704/Ai-Interview-Intelligence-assessment-platform",
  },
  {
    slug: "lologpt",
    title: "LoloGPT",
    featured: true,
    github: "https://github.com/Mayank270704/lologpt",
  },
  {
    slug: "ai-task-planner",
    title: "AI Task Planner",
    shortDescription:
      "An AI-powered software engineering agent that turns a natural-language project idea into a complete implementation plan and production-ready code.",
    category: "Applied LLMs",
    date: "Feb 2026",
    status: "shipped",
    featured: true,
    tags: ["Multi-Agent AI", "LLMs", "Code Generation"],
    stack: ["Python", "FastAPI", "Streamlit", "Gemini API", "Multi-Agent AI"],
    features: [
      "Transforms natural language project ideas into complete implementation plans and production-ready code.",
      "Multi-stage AI workflow covering requirement analysis, system design, code generation, debugging, and validation using large language models.",
      "Scalable backend APIs orchestrating project planning, code generation, testing, and workflow management across multiple development stages.",
      "Automates the software development lifecycle from idea generation to tested implementation, reducing manual development effort.",
    ],
    github: "https://github.com/Mayank270704/AI-task-plannar",
  },
  {
    slug: "ai-powered-pdf-reader",
    title: "AI-Powered PDF Reader",
    shortDescription:
      "A PDF question-answering system built on retrieval-augmented generation, using FAISS and embeddings for semantic document retrieval.",
    category: "Retrieval-Augmented Generation",
    date: "Jan 2026",
    status: "shipped",
    featured: true,
    tags: ["RAG", "Vector Search", "Embeddings"],
    stack: ["Python", "FastAPI", "Streamlit", "FAISS", "RAG"],
    features: [
      "PDF question answering using retrieval-augmented generation, FAISS, and embeddings for semantic document retrieval.",
      "RAG pipeline with document chunking, embedding generation, and vector similarity search for accurate context retrieval.",
      "Scalable FastAPI backend with RESTful APIs for document ingestion, embedding management, and semantic querying.",
      "Streamlit interface for PDF upload and question answering, delivering an end-to-end user experience.",
    ],
    github: "https://github.com/Mayank270704/PDF-Reader",
  },
  {
    slug: "music-recommendation-system",
    title: "Music Recommendation System",
    featured: true,
    github: "https://github.com/Mayank270704/music-recommendation-system",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Previous/next within the published order, without wrapping around. */
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

/** True when there is enough written up to justify a case-study body. */
export function hasCaseStudy(project: Project): boolean {
  return Boolean(
    project.shortDescription ||
      project.problem ||
      project.approach ||
      project.features?.length ||
      project.architecture?.length ||
      project.implementation?.length,
  );
}
