/**
 * Shared shapes for the content layer.
 *
 * Every content type in `src/data` is authored by hand. Fields that may not be
 * available yet are modelled as `null` or optional rather than as empty strings,
 * so the UI can branch on real absence instead of guessing.
 */

export type ImageAsset = {
  /** Path under `public/`, e.g. `/projects/atlas/cover.png`. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ExternalLink = {
  label: string;
  href: string;
};
