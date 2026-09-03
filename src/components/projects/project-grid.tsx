import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Project } from "@/data/projects";

interface ProjectGridProps {
  projects: Project[];
  emptyTitle?: string;
  emptyBody?: string;
}

export function ProjectGrid({
  projects,
  emptyTitle = "Case studies are being written up",
  emptyBody = "Each one is documented the same way — the problem, the approach, the architecture, and what the numbers said. They go live as they are finished rather than as summaries.",
}: ProjectGridProps) {
  if (projects.length === 0) {
    return <EmptyState eyebrow="Selected work" title={emptyTitle} body={emptyBody} />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <div key={project.slug} data-reveal>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
