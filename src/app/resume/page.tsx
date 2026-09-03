import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ResumePanel } from "@/components/resume/resume-panel";
import { Reveal } from "@/components/motion/reveal";
import { getResumeOutline, resume } from "@/data/resume";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: "Education, experience, focus areas, and the technical ground I work on.",
  path: "/resume",
});

export default function ResumePage() {
  const sections = getResumeOutline();

  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="The short version, readable without a download."
        lede={resume.summary}
        meta={resume.file.updated ?? undefined}
      />

      <Section flush>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal className="flex flex-col">
            {sections.map((section) => (
              <div
                key={section.title}
                data-reveal
                className="flex flex-col gap-4 border-t border-line py-8 first:border-t-0 first:pt-0"
              >
                <h2 className="text-xl">{section.title}</h2>
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <ResumePanel />
          </div>
        </div>
      </Section>
    </>
  );
}
