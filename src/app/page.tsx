import { Hero } from "@/components/home/hero";
import { Identity } from "@/components/home/identity";
import { CapabilityJourney } from "@/components/home/capability-journey";
import { WorkPreview } from "@/components/home/work-preview";
import { ContactCta } from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Identity />
      <CapabilityJourney />
      <WorkPreview />
      <ContactCta />
    </>
  );
}
