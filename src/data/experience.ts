export type ExperienceKind =
  | "internship"
  | "full-time"
  | "part-time"
  | "freelance"
  | "open-source"
  | "research"
  | "volunteer";

export type ExperienceEntry = {
  id: string;
  role: string;
  organisation: string;
  kind: ExperienceKind;
  location: string | null;
  /** Free-form, e.g. `"Jun 2025"`. */
  start: string;
  /** `null` while ongoing. */
  end: string | null;
  summary: string;
  /** What was actually shipped or measured, one line each. */
  highlights: string[];
  stack: string[];
  url: string | null;
};

/**
 * Empty until a real role exists. Nothing is inferred from the projects list —
 * a side project is not a job.
 */
export const experience: ExperienceEntry[] = [];

export const currentExperience = experience.filter((entry) => entry.end === null);
