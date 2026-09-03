export type SkillCategory = {
  id: string;
  title: string;
  summary: string;
  items: string[];
};

/**
 * Taken verbatim from the resume's Technical Skills section. Nothing is added
 * that the resume does not claim — this list is what a recruiter will check
 * against, so it has to match.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    summary: "What the work is written in.",
    items: ["Python", "C++", "SQL", "JavaScript"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    summary: "The services and interfaces that put a model in front of someone.",
    items: ["FastAPI", "Flask", "Streamlit"],
  },
  {
    id: "libraries",
    title: "Libraries",
    summary: "Analysis, visualisation, and vector search.",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "FAISS"],
  },
  {
    id: "technologies",
    title: "Technologies",
    summary: "The applied-AI ground: retrieval, embeddings, and the models themselves.",
    items: [
      "LLMs",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases",
      "Prompt Engineering",
      "Embeddings",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    summary: "The everyday environment.",
    items: ["VS Code", "PyCharm", "Jupyter Notebook", "Git", "GitHub"],
  },
];

/** Flat list, in the order the categories declare them. */
export const allSkills = skillCategories.flatMap((category) => category.items);
