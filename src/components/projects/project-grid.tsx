import { ProjectCard } from "@/components/projects/project-card";
import { PendingNotice } from "@/components/ui/pending-notice";
import type { Project } from "@/data/projects";

const REQUIREMENTS = [
  "Project name, one-line summary, and your role",
  "The problem it solves and the approach you took",
  "Stack, architecture notes, and any measured results",
  "Repository URL and live demo URL, if the demo is public",
  "A screenshot or diagram for the card and case study",
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <PendingNotice
        title="Case studies are not published yet"
        body="The project architecture, routing, and case-study template are built and waiting. Nothing is shown here until it describes real work — placeholder projects would cost more credibility than an empty section."
        requires={REQUIREMENTS}
      />
    );
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
