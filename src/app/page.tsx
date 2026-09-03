import { Hero } from "@/components/home/hero";
import { AboutTeaser } from "@/components/home/about-teaser";
import { TechWall } from "@/components/home/tech-wall";
import { FeaturedWork } from "@/components/home/featured-work";
import { CertificatesPreview } from "@/components/home/certificates-preview";
import { ContactCta } from "@/components/home/contact-cta";
import { featuredProjects, projects } from "@/data/projects";
import { PORTRAIT_ASSET } from "@/data/profile";
import { hasPublicAsset } from "@/lib/assets";

export default function HomePage() {
  // Resolved at build time: the hero shows the real cutout the moment the file
  // is in place, and asks for nothing while it is not.
  const portraitAvailable = hasPublicAsset(PORTRAIT_ASSET);

  // Fall back to the full list so the homepage still leads with work before
  // anything has been explicitly flagged as featured.
  const highlights = featuredProjects.length > 0 ? featuredProjects : projects;

  return (
    <>
      <Hero portraitAvailable={portraitAvailable} />
      <AboutTeaser />
      <TechWall />
      <FeaturedWork projects={highlights} />
      <CertificatesPreview />
      <ContactCta />
    </>
  );
}
