export type EducationEntry = {
  id: string;
  institution: string;
  program: string;
  specialisation: string | null;
  location: string | null;
  start: string;
  /** `null` while ongoing. */
  end: string | null;
  status: "in-progress" | "completed";
  /** CGPA or percentage, exactly as it appears on the transcript. */
  score: string | null;
  highlights: string[];
  url: string | null;
};

/** From the resume's Education section. */
export const education: EducationEntry[] = [
  {
    id: "kiet-btech-cse-ai",
    institution: "KIET Group of Institutions",
    program: "B.Tech, Computer Science and Engineering",
    specialisation: "Artificial Intelligence",
    location: "Ghaziabad, Uttar Pradesh",
    start: "2023",
    end: "2027",
    status: "in-progress",
    score: null,
    highlights: [],
    url: null,
  },
];
