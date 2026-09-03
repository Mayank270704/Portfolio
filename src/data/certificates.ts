import type { ImageAsset } from "@/data/types";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** Free-form issue date, e.g. `"2025"` or `"Mar 2025"`. */
  issued: string;
  /** `null` when the credential does not expire. */
  expires?: string | null;
  credentialId: string | null;
  /** Public verification page. `null` renders the card without a verify link. */
  credentialUrl: string | null;
  /** The certificate itself, scanned or exported. */
  image?: ImageAsset | null;
  /** Issuer mark, if one is available. */
  logo?: ImageAsset | null;
  skills: string[];
  description: string;
};

/** Empty until real, verifiable credentials exist. */
export const certificates: Certificate[] = [];

export const verifiableCertificates = certificates.filter(
  (certificate) => certificate.credentialUrl !== null,
);
