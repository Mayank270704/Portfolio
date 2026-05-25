export type SkillCategory = {
  title: string;
  items: { name: string; highlight?: boolean }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    items: [
      { name: "React" },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript" },
      { name: "Next.js" },
      { name: "HTML/CSS" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend Development",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "GraphQL" },
    ],
  },
  {
    title: "AI/ML & Data Science",
    items: [
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "Scikit-learn" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "NLP" },
      { name: "Computer Vision" },
      { name: "Hugging Face" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git/GitHub" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "VS Code" },
      { name: "Jupyter" },
      { name: "Canva" },
      { name: "Cursor" },
    ],
  },
];
