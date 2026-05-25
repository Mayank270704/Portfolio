export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    id: "atlas",
    title: "Atlas AI Dashboard",
    category: "Data Product",
    description: "A premium analytics studio interface for exploring model outcomes and enterprise trends.",
    details: "Built with elegant visual layers, predictive monitoring, and interactive AI insight panels.",
    tags: ["Machine Learning", "Python", "Analytics"],
    github: "https://github.com/mayank-swaroop-nandan/atlas-ai-dashboard",
    demo: "https://example.com/atlas-ai-dashboard",
  },
  {
    id: "aether",
    title: "Aether Forecast Suite",
    category: "Predictive System",
    description: "A cinematic forecasting tool that combines time-series intelligence with editorial dashboards.",
    details: "Designed a scalable model pipeline, clean UI narrative, and polished user experience for data-driven decisions.",
    tags: ["Forecasting", "Data Analytics", "Visualization"],
    github: "https://github.com/mayank-swaroop-nandan/aether-forecast-suite",
    demo: "https://example.com/aether-forecast-suite",
  },
  {
    id: "nova",
    title: "Nova Insight Engine",
    category: "Research Platform",
    description: "A studio-grade AI research environment for benchmarking and interpreting model behavior.",
    details: "Delivered modular evaluation pipelines, graceful result exploration, and narrative metadata presentation.",
    tags: ["Research", "AI Engineering", "NLP"],
    github: "https://github.com/mayank-swaroop-nandan/nova-insight-engine",
    demo: "https://example.com/nova-insight-engine",
  },
];
