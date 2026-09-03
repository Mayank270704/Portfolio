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

/** From the resume's Achievements section. */
export const achievements: Achievement[] = [
  {
    id: "leetcode-100",
    title: "100+ DSA problems solved on LeetCode",
    organisation: "LeetCode",
    date: null,
    summary:
      "Sustained practice across data structures and algorithms, kept up alongside project work.",
    kind: "milestone",
    url: null,
  },
];
