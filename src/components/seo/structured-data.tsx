import { education } from "@/data/education";
import { liveContactChannels, primaryEmail, profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { siteName, siteUrl } from "@/lib/site";

/**
 * Person + WebSite JSON-LD.
 *
 * Only confirmed facts are emitted. Unverified social URLs are left out of
 * `sameAs` entirely rather than asserted to search engines.
 */
export function StructuredData() {
  const sameAs = liveContactChannels
    .filter((channel) => channel.id !== "email")
    .map((channel) => channel.href)
    .filter((href): href is string => href !== null);

  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    jobTitle: profile.role,
    description: profile.positioning,
    url: siteUrl,
    knowsAbout: skillCategories.flatMap((category) => category.items),
    ...(education.length > 0
      ? {
          alumniOf: education.map((entry) => ({
            "@type": "CollegeOrUniversity",
            name: entry.institution,
          })),
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(primaryEmail ? { email: primaryEmail } : {}),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: profile.positioning,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from local data only; no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
