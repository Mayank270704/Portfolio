import { achievements } from "@/data/achievements";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { formatPeriod, joinMeta } from "@/lib/format";

export type ResumeFile = {
  /** Only `true` once the PDF actually exists at `url`. */
  available: boolean;
  url: string | null;
  fileName: string;
  /** Free-form, e.g. `"March 2026"`. Shown beside the download. */
  updated: string | null;
  sizeLabel: string | null;
};

export const resumeFile: ResumeFile = {
  available: true,
  url: "/resume.pdf",
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
 * there is exactly one source for education, experience, skills and awards.
 */
export function getResumeOutline(): ResumeSection[] {
  const sections: ResumeSection[] = [];

  if (education.length > 0) {
    sections.push({
      title: "Education",
      items: education.map((entry) =>
        joinMeta([
          entry.specialisation ? `${entry.program} (${entry.specialisation})` : entry.program,
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

  sections.push(
    ...skillCategories.map((category) => ({
      title: category.title,
      items: category.items,
    })),
  );

  if (achievements.length > 0) {
    sections.push({
      title: "Achievements",
      items: achievements.map((entry) => joinMeta([entry.title, entry.organisation])),
    });
  }

  sections.push({ title: "Seeking", items: profile.goals });

  return sections;
}

export const resume = {
  summary:
    "The same material as the PDF, readable without a download: education, focus areas, the technical ground I work on, and what I am looking for.",
  file: resumeFile,
};
