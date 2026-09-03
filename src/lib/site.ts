/**
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment. The fallback is only
 * there so local builds and previews resolve absolute URLs.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://mayank-portfolio.vercel.app";

export const siteName = "Mayank Swaroop Nandan";

export const siteTagline = "AI/ML Engineer";

/**
 * Social share image. Add a 1200x630 file at `public/og/og-default.png` and set
 * this to that path — until then no `og:image` is emitted, which is better than
 * pointing crawlers at a missing file.
 */
export const ogImage: { url: string; width: number; height: number; alt: string } | null = null;

export function absoluteUrl(path = "/") {
  return path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Canonical + Open Graph block for a page, so every route declares the same
 * shape without repeating it.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      url,
      siteName,
      title: `${title} — ${siteName}`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} — ${siteName}`,
      description,
      ...(ogImage ? { images: [ogImage.url] } : {}),
    },
  };
}
