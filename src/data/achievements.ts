export type AchievementKind =
  | "award"
  | "competition"
  | "publication"
  | "community"
  | "milestone";

export type Achievement = {
  id: string;
  title: string;
  organisation: string | null;
  /** Free-form, e.g. `"2025"` or `"Mar 2025"`. */
  date: string | null;
  summary: string;
  kind: AchievementKind;
  /** Proof — a results page, certificate, or write-up. */
  url: string | null;
};

export const achievements: Achievement[] = [];
