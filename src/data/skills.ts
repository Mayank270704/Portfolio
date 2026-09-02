export type SkillCategory = {
  id: string;
  title: string;
  summary: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ml",
    title: "AI/ML & Data Science",
    summary: "Training, evaluating, and reasoning about models — and the data they depend on.",
    items: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "NLP",
      "Computer Vision",
      "Hugging Face",
    ],
  },
  {
    id: "backend",
    title: "Backend & Services",
    summary: "The services that put a model behind an interface and keep it reachable.",
    items: ["Node.js", "Express", "MongoDB", "REST APIs", "GraphQL"],
  },
  {
    id: "frontend",
    title: "Interfaces",
    summary: "Front ends that make model output legible instead of raw.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    id: "tools",
    title: "Tooling & Platforms",
    summary: "The everyday environment: version control, containers, notebooks, deployment.",
    items: ["Git/GitHub", "Docker", "Jupyter", "Vercel", "VS Code", "Cursor", "Canva"],
  },
];
