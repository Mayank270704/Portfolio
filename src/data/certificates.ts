export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
};

export const certificates: Certificate[] = [
  {
    id: "ml-architect",
    title: "Machine Learning Architect",
    issuer: "AI Excellence Institute",
    year: "2024",
    description: "Completed an advanced studio program in model architecture and deployment.",
  },
  {
    id: "data-analytics",
    title: "Data Analytics Professional",
    issuer: "Analytics Academy",
    year: "2023",
    description: "Validated expertise in premium analytics workflows and data storytelling.",
  },
  {
    id: "python-advanced",
    title: "Advanced Python for Engineers",
    issuer: "Tech Labs",
    year: "2023",
    description: "Structured programming, automation, and engineering best practices.",
  },
  {
    id: "dsa-foundation",
    title: "Foundations of DSA",
    issuer: "Coding Studio",
    year: "2023",
    description: "Applied algorithmic thinking to design efficient engineering systems.",
  },
];
