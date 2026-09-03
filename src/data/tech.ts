/**
 * Which technologies appear on the home technology wall, and which brand mark
 * each one uses.
 *
 * The list is derived from `skillCategories` at render time — nothing is
 * introduced here that is not already in the skills data. This file only says
 * how an entry that is already there should be drawn.
 *
 * `icon` is a simple-icons slug (resolved on the server, so no icon library
 * reaches the browser). Entries with no slug are concepts rather than products
 * and render as typographic tiles in the same grid.
 */
export const TECH_ICON_SLUGS: Record<string, string> = {
  Python: "python",
  TensorFlow: "tensorflow",
  "Scikit-learn": "scikitlearn",
  Pandas: "pandas",
  NumPy: "numpy",
  "Hugging Face": "huggingface",
  "Node.js": "nodedotjs",
  Express: "express",
  MongoDB: "mongodb",
  GraphQL: "graphql",
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  JavaScript: "javascript",
  "Tailwind CSS": "tailwindcss",
  "HTML/CSS": "html5",
  "Git/GitHub": "git",
  Docker: "docker",
  Jupyter: "jupyter",
  Vercel: "vercel",
  Cursor: "cursor",
};

/**
 * The wall reads better with a curated selection than with every entry. These
 * are shown first, in this order; the rest follow in skills-data order.
 */
export const TECH_WALL_ORDER = [
  "Python",
  "TensorFlow",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Hugging Face",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Docker",
  "Git/GitHub",
  "Jupyter",
  "Vercel",
];
