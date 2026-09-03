import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Tag } from "@/components/ui/tag";
import { skillCategories } from "@/data/skills";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Skills",
  description:
    "Technical ground: AI/ML and data science, backend services, interfaces, and the tooling around them.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="The technical ground, ordered by how I use it."
        lede="Model work first, then the services and interfaces that carry it, then the tooling underneath."
        meta="02"
      />

      <Section flush>
        <Reveal className="flex flex-col">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              data-reveal
              className="grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-14"
            >
              <div className="flex gap-6">
                <span className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl lg:text-[1.75rem]">{category.title}</h2>
                  <p className="measure text-sm leading-relaxed text-fg-muted">{category.summary}</p>
                </div>
              </div>

              <ul className="flex flex-wrap content-start gap-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <Tag className="px-3 py-1.5 text-[0.75rem]">{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
