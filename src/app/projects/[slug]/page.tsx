import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { Tag } from "@/components/ui/tag";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectPager } from "@/components/projects/project-pager";
import { Reveal } from "@/components/motion/reveal";
import {
  getProject,
  getProjectLinks,
  getProjectNeighbours,
  hasCaseStudy,
  projects,
  type ProjectSection,
} from "@/data/projects";
import { pageMetadata } from "@/lib/site";

/** Only published slugs resolve; anything else is a 404 rather than a shell page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description:
      project.shortDescription ?? `${project.title} — a project by Mayank Swaroop Nandan.`,
    path: `/projects/${project.slug}`,
  });
}

function ProseSections({ sections }: { sections: ProjectSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.heading} data-reveal className="flex flex-col gap-4">
          <h2 className="text-2xl">{section.heading}</h2>
          <p className="measure leading-relaxed text-fg-muted">{section.body}</p>
          {section.bullets && section.bullets.length > 0 ? (
            <ul className="flex flex-col gap-2 pt-1">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const links = getProjectLinks(project);
  const { previous, next } = getProjectNeighbours(project.slug);
  const architecture = project.architecture ?? [];
  const implementation = project.implementation ?? [];
  const features = project.features ?? [];
  const metrics = project.metrics ?? [];
  const gallery = project.gallery ?? [];
  const stack = project.stack ?? [];
  const tags = project.tags ?? [];
  const documented = hasCaseStudy(project);

  return (
    <>
      <PageHeader
        eyebrow={project.category ?? "Project"}
        title={project.title}
        lede={project.shortDescription}
        meta={project.date}
      />

      <Section flush>
        <Reveal className="flex flex-col gap-16">
          {links.length > 0 ? (
            <div data-reveal className="flex flex-wrap items-center gap-3">
              {links.map((link, index) => (
                <Button
                  key={link.href}
                  href={link.href}
                  external
                  size="sm"
                  variant={index === 0 ? "primary" : "outline"}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          ) : null}

          {project.image ? (
            <div data-reveal className="overflow-hidden rounded-2xl border border-line bg-well">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 1024px) 100vw, 76rem"
                className="h-auto w-full"
                priority
              />
            </div>
          ) : null}

          {metrics.length > 0 ? (
            <dl data-reveal className="grid gap-8 border-y border-line py-10 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-2">
                  <dt className="eyebrow">{metric.label}</dt>
                  <dd className="font-display text-3xl font-semibold tabular text-fg">
                    {metric.value}
                  </dd>
                  {metric.note ? (
                    <p className="text-sm leading-relaxed text-fg-muted">{metric.note}</p>
                  ) : null}
                </div>
              ))}
            </dl>
          ) : null}

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div className="flex flex-col gap-12">
              {!documented ? (
                <div data-reveal>
                  <EmptyState
                    eyebrow="Case study"
                    title="This write-up is still being written"
                    body="The repository is public and is the most accurate record of the work right now. The full case study — problem, approach, architecture, and result — follows here once it is written."
                    action={
                      project.github ? (
                        <Button href={project.github} external variant="outline" size="sm">
                          View the repository
                        </Button>
                      ) : undefined
                    }
                  />
                </div>
              ) : null}

              {project.problem ? (
                <section data-reveal className="flex flex-col gap-4">
                  <h2 className="text-2xl">Problem</h2>
                  <p className="measure leading-relaxed text-fg-muted">{project.problem}</p>
                </section>
              ) : null}

              {project.approach ? (
                <section data-reveal className="flex flex-col gap-4">
                  <h2 className="text-2xl">Approach</h2>
                  <p className="measure leading-relaxed text-fg-muted">{project.approach}</p>
                </section>
              ) : null}

              {features.length > 0 ? (
                <section data-reveal className="flex flex-col gap-5">
                  <h2 className="text-2xl">What it does</h2>
                  <ul className="flex flex-col gap-4">
                    {features.map((feature, index) => (
                      <li key={feature} className="flex gap-5">
                        <span className="mt-1 font-mono text-[0.6875rem] tracking-[0.18em] text-accent tabular">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="measure leading-relaxed text-fg-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {architecture.length > 0 ? (
                <div className="flex flex-col gap-12">
                  <ProseSections sections={architecture} />
                </div>
              ) : null}

              {implementation.length > 0 ? (
                <div className="flex flex-col gap-12">
                  <ProseSections sections={implementation} />
                </div>
              ) : null}

              {gallery.length > 0 ? (
                <section data-reveal className="flex flex-col gap-6">
                  <h2 className="text-2xl">Screens and diagrams</h2>
                  <ProjectGallery images={gallery} />
                </section>
              ) : null}
            </div>

            <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
              <Surface className="flex flex-col gap-7 p-7">
                {project.role ? (
                  <div className="flex flex-col gap-2">
                    <span className="eyebrow">Role</span>
                    <p className="text-sm text-fg">{project.role}</p>
                  </div>
                ) : null}
                {project.date ? (
                  <div className="flex flex-col gap-2">
                    <span className="eyebrow">Timeline</span>
                    <p className="text-sm text-fg">{project.date}</p>
                  </div>
                ) : null}
                {stack.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    <span className="eyebrow">Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {stack.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </div>
                ) : null}
                {tags.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    <span className="eyebrow">Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </div>
                ) : null}
                {project.github ? (
                  <div className="flex flex-col gap-2 border-t border-line pt-6">
                    <span className="eyebrow">Source</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-sm text-accent transition-colors hover:text-accent-bright"
                    >
                      {project.github.replace("https://", "")}
                    </a>
                  </div>
                ) : null}
              </Surface>
            </div>
          </div>

          <div data-reveal className="flex flex-col gap-8">
            <div className="rule" />
            <ProjectPager previous={previous} next={next} />
            <div>
              <Button href="/projects" variant="quiet" size="sm">
                All projects
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
