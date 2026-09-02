export type ContactChannel = {
  label: string;
  value: string | null;
  href: string | null;
  verified: boolean;
};

export const profile = {
  name: "Mayank Swaroop Nandan",
  role: "AI/ML Engineer",
  roleLong: "AI/ML Engineer & Data Analytics",
  positioning: "I build machine learning systems and the data pipelines that make them work.",
  introduction:
    "I am an undergraduate engineer at KIET Group of Institutions focused on machine learning, AI engineering, and data analytics. I work across the full path a model takes to production: preparing data, training and evaluating models, and building the interfaces that make their output usable.",
  focusAreas: [
    { label: "Machine learning", detail: "Model training, evaluation, and iteration" },
    { label: "AI engineering", detail: "Turning models into systems people can use" },
    { label: "Data analytics", detail: "Making measurement drive the decision" },
  ],
  availability: "Open to internships, placement opportunities, and AI-driven product roles.",
  goals: ["Internship", "Placement opportunities", "AI-driven product roles"],
  education: [
    {
      institution: "KIET Group of Institutions",
      program: "B.Tech, Computer Science and Engineering",
      period: "2024 — Present",
      status: "In progress",
    },
  ],
  contact: {
    channels: [
      { label: "Email", value: null, href: null, verified: false },
      {
        label: "GitHub",
        value: "github.com/mayank-swaroop-nandan",
        href: "https://github.com/mayank-swaroop-nandan",
        verified: false,
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/mayank-swaroop-nandan",
        href: "https://www.linkedin.com/in/mayank-swaroop-nandan",
        verified: false,
      },
    ] satisfies ContactChannel[],
  },
};
