import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { formatPeriod, joinMeta } from "@/lib/format";

export type ResumeFile = {
  /**
   * Flip to `true` only once the PDF actually exists at `url`. While this is
   * `false` the page renders an unavailable state and emits no link at all.
   */
  available: boolean;
  /** Path under `public/`. */
  url: string | null;
  /** Filename offered to the browser on download. */
  fileName: string;
  /** Free-form, e.g. `"March 2026"`. Shown beside the download. */
  updated: string | null;
  /** e.g. `"180 KB"`. Optional courtesy for the visitor. */
  sizeLabel: string | null;
};

export const resumeFile: ResumeFile = {
  available: false,
  url: null,
  fileName: "mayank-swaroop-nandan-resume.pdf",
  updated: null,
  sizeLabel: null,
};

export type ResumeSection = {
  title: string;
  items: string[];
};

/**
 * The on-page resume is derived from the same data as the rest of the site, so
 * there is exactly one source for education, experience, and skills.
 */
export function getResumeOutline(): ResumeSection[] {
  const sections: ResumeSection[] = [];

  if (education.length > 0) {
    sections.push({
      title: "Education",
      items: education.map((entry) =>
        joinMeta([
          entry.program,
          entry.institution,
          formatPeriod(entry.start, entry.end),
          entry.score,
        ]),
      ),
    });
  }

  if (experience.length > 0) {
    sections.push({
      title: "Experience",
      items: experience.map((entry) =>
        joinMeta([entry.role, entry.organisation, formatPeriod(entry.start, entry.end)]),
      ),
    });
  }

  sections.push({
    title: "Focus areas",
    items: profile.focusAreas.map((area) => area.label),
  });

  sections.push(
    ...skillCategories.map((category) => ({
      title: category.title,
      items: category.items,
    })),
  );

  sections.push({
    title: "Seeking",
    items: profile.goals,
  });

  return sections;
}

export const resume = {
  summary:
    "The same material as the PDF, readable without a download: education, experience, focus areas, and the technical ground I work on.",
  file: resumeFile,
};
