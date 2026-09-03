import type { ImageAsset } from "@/data/types";

export type ContactChannelId = "email" | "github" | "linkedin" | "x" | "website";

export type ContactChannel = {
  id: ContactChannelId;
  label: string;
  /** What the visitor reads, e.g. `github.com/username`. */
  value: string | null;
  /** Where it goes. `null` until the destination is confirmed. */
  href: string | null;
  /**
   * Only a channel confirmed by Mayank is rendered as a live link. An
   * unconfirmed URL is worse than no URL — it sends a recruiter to a 404.
   */
  verified: boolean;
  primary?: boolean;
};

/**
 * Where the hero expects the transparent portrait cutout. Drop a PNG or WebP
 * with a transparent background at this path and the hero picks it up on the
 * next build — no code change, and nothing is requested while it is absent.
 */
export const PORTRAIT_ASSET = "/images/profile-cutout.png";

export type FocusArea = {
  label: string;
  detail: string;
};

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: null,
    href: null,
    verified: false,
    primary: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/mayank-swaroop-nandan",
    href: "https://github.com/mayank-swaroop-nandan",
    verified: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/mayank-swaroop-nandan",
    href: "https://www.linkedin.com/in/mayank-swaroop-nandan",
    verified: false,
  },
];

export const profile = {
  name: "Mayank Swaroop Nandan",
  shortName: "Mayank",
  initials: "MN",
  role: "AI/ML Engineer",
  roleLong: "AI/ML Engineer & Data Analytics",
  /** Set once a city is confirmed; the UI hides the field while it is null. */
  location: null as string | null,
  /** Professional photograph. Add the file to `public/images/` first. */
  photo: null as ImageAsset | null,
  positioning: "I build machine learning systems and the data pipelines that make them work.",
  introduction:
    "I am an undergraduate engineer at KIET Group of Institutions focused on machine learning, AI engineering, and data analytics. I work across the full path a model takes to production: preparing data, training and evaluating models, and building the interfaces that make their output usable.",
  focusAreas: [
    { label: "Machine learning", detail: "Model training, evaluation, and iteration" },
    { label: "AI engineering", detail: "Turning models into systems people can use" },
    { label: "Data analytics", detail: "Making measurement drive the decision" },
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
