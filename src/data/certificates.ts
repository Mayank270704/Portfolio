import type { ImageAsset } from "@/data/types";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** Free-form issue date. `null` when it has not been supplied. */
  issued: string | null;
  expires?: string | null;
  credentialId: string | null;
  /** Public verification page run by the issuer. */
  credentialUrl: string | null;
  /**
   * The certificate document itself, served from `public/`. Distinct from
   * `credentialUrl`: this is the artefact, that is the issuer's check.
   */
  documentUrl: string | null;
  image?: ImageAsset | null;
  logo?: ImageAsset | null;
  skills: string[];
  description: string;
};

/**
 * The four real certificates in `public/certificates/`.
 *
 * The PDFs are scans without extractable text, so issue dates and credential
 * IDs are not filled in — they are left null rather than guessed, and the UI
 * omits them. Add them here and they appear.
 */
export const certificates: Certificate[] = [
  {
    id: "aws-ai-practitioner",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    issued: null,
    credentialId: null,
    credentialUrl: null,
    documentUrl: "/certificates/aws-ai-practitioner.pdf",
    skills: ["Applied AI", "AWS"],
    description:
      "Foundational certification covering AI and machine learning concepts and their application on AWS.",
  },
  {
    id: "palo-alto-cybersecurity",
    title: "Palo Alto Cybersecurity Fundamentals",
    issuer: "Palo Alto Networks",
    issued: null,
    credentialId: null,
    credentialUrl: null,
    documentUrl: "/certificates/palo-alto-cybersecurity.pdf",
    skills: ["Cybersecurity"],
    description: "Fundamentals of network security, threats, and defensive practice.",
  },
  {
    id: "forage-aws-solutions-architecture",
    title: "Solutions Architecture Job Simulation",
    issuer: "Forage · AWS",
    issued: null,
    credentialId: null,
    credentialUrl: null,
    documentUrl: "/certificates/forage-aws-solutions-architecture.pdf",
    skills: ["Solutions Architecture", "AWS"],
    description: "Job simulation covering architectural design and proposal work on AWS.",
  },
  {
    id: "forage-tata-genai-data-analytics",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Forage · Tata",
    issued: null,
    credentialId: null,
    credentialUrl: null,
    documentUrl: "/certificates/forage-tata-genai-data-analytics.pdf",
    skills: ["Data Analytics", "Generative AI"],
    description: "Job simulation applying generative AI to data analytics problems.",
  },
];

export const verifiableCertificates = certificates.filter(
  (certificate) => certificate.credentialUrl !== null || certificate.documentUrl !== null,
);
