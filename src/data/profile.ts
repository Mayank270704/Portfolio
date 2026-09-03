import type { ImageAsset } from "@/data/types";

export type ContactChannelId = "email" | "github" | "linkedin" | "leetcode" | "phone";

export type ContactChannel = {
  id: ContactChannelId;
  label: string;
  /** What the visitor reads, e.g. `github.com/Mayank270704`. */
  value: string | null;
  /** Where it goes. `null` until the destination is confirmed. */
  href: string | null;
  /** Only a confirmed channel is rendered as a live link. */
  verified: boolean;
  primary?: boolean;
};

export type FocusArea = {
  label: string;
  detail: string;
};

/**
 * Where the hero expects the transparent portrait cutout. Drop a PNG or WebP
 * with a transparent background at this path and the hero picks it up on the
 * next build — no code change, and nothing is requested while it is absent.
 */
export const PORTRAIT_ASSET = "/images/profile-cutout.png";

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: "mayanknandan27@gmail.com",
    href: "mailto:mayanknandan27@gmail.com",
    verified: true,
    primary: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/Mayank270704",
    href: "https://github.com/Mayank270704",
    verified: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/mayank-swaroop-nandan",
    href: "https://www.linkedin.com/in/mayank-swaroop-nandan-a096aa327/",
    verified: true,
  },
];

export const profile = {
  name: "Mayank Swaroop Nandan",
  shortName: "Mayank",
  initials: "MN",
  role: "AI/ML Engineer",
  roleLong: "AI/ML Engineer & Data Analytics",
  location: "Gorakhpur, Uttar Pradesh" as string | null,
  /** Real transparent cutout. Rendered only when the file is present. */
  photo: null as ImageAsset | null,
  positioning: "I build machine learning systems and the data pipelines that make them work.",
  introduction:
    "I am an undergraduate engineer at KIET Group of Institutions, studying Computer Science and Engineering with a specialisation in AI. I work across the full path a model takes to production: preparing data, building retrieval and inference pipelines, and shipping the interfaces that make their output usable.",
  focusAreas: [
    { label: "Applied LLMs", detail: "Retrieval-augmented generation, embeddings, and agent workflows" },
    { label: "Backend for AI", detail: "FastAPI services that put a model behind an interface" },
    { label: "Data analytics", detail: "Turning raw data into something a decision can rest on" },
  ] satisfies FocusArea[],
  availability: "Open to internships, placement opportunities, and AI-driven product roles.",
  goals: ["Internship", "Placement opportunities", "AI-driven product roles"],
  contact: {
    channels: contactChannels,
  },
};

/** Channels safe to render as links. */
export const liveContactChannels = contactChannels.filter(
  (channel) => channel.verified && Boolean(channel.href),
);

/** Channels that exist as a concept but have no confirmed destination yet. */
export const pendingContactChannels = contactChannels.filter(
  (channel) => !channel.verified || !channel.href,
);

export const primaryEmail =
  contactChannels.find((channel) => channel.id === "email" && channel.verified)?.value ?? null;

export const hasAnyContactChannel = liveContactChannels.length > 0;
