/**
 * How a technology already named in `skillCategories` should be drawn on the
 * home technology wall.
 *
 * This file only says how to draw an entry that is already in the skills data;
 * it never introduces one. `icon` is a simple-icons slug, resolved on the
 * server so no icon library reaches the browser. Entries with no slug are
 * concepts rather than products and render as typographic tiles in the same
 * grid — RAG has no logo, and inventing one would be worse than not having it.
 */
export const TECH_ICON_SLUGS: Record<string, string> = {
  Python: "python",
  "C++": "cplusplus",
  JavaScript: "javascript",
  FastAPI: "fastapi",
  Flask: "flask",
  Streamlit: "streamlit",
  Pandas: "pandas",
  NumPy: "numpy",
  PyCharm: "pycharm",
  "Jupyter Notebook": "jupyter",
  Git: "git",
  GitHub: "github",
};

/** Shorter labels so the wall stays readable at tile size. */
export const TECH_LABELS: Record<string, string> = {
  "Retrieval-Augmented Generation (RAG)": "RAG",
  "Jupyter Notebook": "Jupyter",
};
