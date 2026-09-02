import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";
import { getProject, projects } from "@/data/projects";

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

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        lede={project.summary}
        meta={project.date}
      />

      <Section flush>
        <Reveal className="flex flex-col gap-16">
          <div data-reveal className="flex flex-wrap items-center gap-3">
            {project.github ? (
              <Button href={project.github} external variant="outline" size="sm">
                Repository
              </Button>
            ) : null}
            {project.demo ? (
              <Button href={project.demo} external size="sm">
                Live demo
              </Button>
            ) : null}
          </div>

          {project.image ? (
            <div data-reveal className="overflow-hidden rounded-2xl border border-line">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                className="h-auto w-full"
                priority
              />
            </div>
          ) : null}

          {project.metrics.length > 0 ? (
            <dl data-reveal className="grid gap-8 border-y border-line py-10 sm:grid-cols-3">
              {project.metrics.map((metric) => (
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
              <section data-reveal className="flex flex-col gap-4">
                <h2 className="text-2xl">Problem</h2>
                <p className="measure leading-relaxed text-fg-muted">{project.problem}</p>
              </section>

              <section data-reveal className="flex flex-col gap-4">
                <h2 className="text-2xl">Approach</h2>
                <p className="measure leading-relaxed text-fg-muted">{project.approach}</p>
              </section>

              {project.architecture.map((block) => (
                <section key={block.heading} data-reveal className="flex flex-col gap-4">
                  <h2 className="text-2xl">{block.heading}</h2>
                  <p className="measure leading-relaxed text-fg-muted">{block.body}</p>
                </section>
              ))}
            </div>

            <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
              <Surface className="flex flex-col gap-7 p-7">
                <div className="flex flex-col gap-2">
                  <span className="eyebrow">Role</span>
                  <p className="text-sm text-fg">{project.role}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="eyebrow">Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="eyebrow">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              </Surface>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
