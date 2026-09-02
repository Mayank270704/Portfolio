export type ResumeSection = {
  title: string;
  items: string[];
};

export const resume = {
  headline: "Resume",
  summary:
    "A structured view of the same material as the PDF: education, focus areas, and the technical ground I work on.",
  available: false,
  downloadUrl: "/resume.pdf",
  updated: null as string | null,
  sections: [
    {
      title: "Education",
      items: [
        "B.Tech, Computer Science and Engineering — KIET Group of Institutions (2024 — Present)",
      ],
    },
    {
      title: "Focus areas",
      items: ["Machine learning", "AI engineering", "Data analytics"],
    },
    {
      title: "Seeking",
      items: ["Internship", "Placement opportunities", "AI-driven product roles"],
    },
  ] satisfies ResumeSection[],
};
