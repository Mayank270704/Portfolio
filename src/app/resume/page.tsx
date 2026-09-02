import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { PendingNotice } from "@/components/ui/pending-notice";
import { Reveal } from "@/components/motion/reveal";
import { resume } from "@/data/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "Education, focus areas, and what I am looking for.",
};

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="The short version, readable without a download."
        lede={resume.summary}
        meta={resume.updated ?? undefined}
      />

      <Section flush>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal className="flex flex-col">
            {resume.sections.map((section) => (
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
            {resume.available ? (
              <Surface tone="raised" className="flex flex-col gap-6 p-8">
                <div className="flex flex-col gap-3">
                  <span className="eyebrow">Download</span>
                  <h2 className="text-2xl">Full resume, PDF</h2>
                  <p className="text-sm leading-relaxed text-fg-muted">
                    The complete document, formatted for applicant tracking systems.
                  </p>
                </div>
                <Button href={resume.downloadUrl} external size="lg" download>
                  Download PDF
                </Button>
              </Surface>
            ) : (
              <PendingNotice
                title="No PDF attached yet"
                body="The download panel is wired and will appear the moment a real file exists. The previous file in this repository was a corrupt placeholder and has been removed rather than served to a recruiter."
                requires={[
                  "Your resume PDF, placed at public/resume.pdf",
                  "A last-updated date to display beside it",
                  "Confirmation that the PDF text is selectable, so ATS parsers can read it",
                ]}
              />
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
