import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Reveal } from "@/components/motion/reveal";
import { featuredProjects } from "@/data/projects";

export function WorkPreview() {
  return (
    <Section id="work" labelledBy="work-heading">
      <Reveal className="flex flex-col gap-12">
        <div data-reveal>
          <SectionHeading
            id="work-heading"
            eyebrow="Selected work"
            title="Projects as evidence, not decoration"
            lede="Each case study follows the same structure: the problem, the approach, the architecture, and what the numbers actually said."
            action={
              <Button href="/projects" variant="outline" size="sm">
                All projects
              </Button>
            }
          />
        </div>
        <div data-reveal>
          <ProjectGrid projects={featuredProjects} />
        </div>
      </Reveal>
    </Section>
  );
}
