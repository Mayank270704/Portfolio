export type ProjectMetric = {
  label: string;
  value: string;
  note?: string;
};

export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  date: string;
  category: string;
  featured: boolean;
  tags: string[];
  stack: string[];
  problem: string;
  approach: string;
  architecture: ProjectSection[];
  metrics: ProjectMetric[];
  image: { src: string; alt: string; width: number; height: number } | null;
  github: string | null;
  demo: string | null;
};

export const projects: Project[] = [];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
