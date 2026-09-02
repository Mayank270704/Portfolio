import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Machine learning and data engineering case studies.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Case studies, structured for engineers who read them properly."
        lede="Problem, approach, architecture, and measured result — in that order, with the repository and demo attached."
        meta={projects.length > 0 ? `${projects.length} published` : "00"}
      />

      <Section flush>
        <Reveal stagger={0.1}>
          <ProjectGrid projects={projects} />
        </Reveal>
      </Section>
    </>
  );
}
