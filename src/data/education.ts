export type EducationEntry = {
  id: string;
  institution: string;
  program: string;
  /** Branch or concentration, when it is narrower than the programme name. */
  specialisation: string | null;
  location: string | null;
  /** Free-form so a year alone is valid, e.g. `"2024"` or `"Aug 2024"`. */
  start: string;
  /** `null` while ongoing. */
  end: string | null;
  status: "in-progress" | "completed";
  /** CGPA or percentage, exactly as it appears on the transcript. */
  score: string | null;
  highlights: string[];
  url: string | null;
};

export const education: EducationEntry[] = [
  {
    id: "kiet-btech-cse",
    institution: "KIET Group of Institutions",
    program: "B.Tech, Computer Science and Engineering",
    specialisation: null,
    location: null,
    start: "2024",
    end: null,
    status: "in-progress",
    score: null,
    highlights: [],
    url: null,
  },
];
