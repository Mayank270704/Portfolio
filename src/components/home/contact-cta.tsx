import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";

export function ContactCta() {
  return (
    <Section labelledBy="cta-heading" className="pb-28 sm:pb-32">
      <Reveal className="flex flex-col gap-10 rounded-3xl border border-line bg-surface/50 p-8 backdrop-blur-xl sm:p-12 lg:p-16">
        <div className="flex flex-col gap-6">
          <span data-reveal className="eyebrow">
            Next step
          </span>
          <h2 id="cta-heading" data-reveal className="max-w-3xl text-[clamp(1.875rem,4.6vw,3.25rem)]">
            {profile.availability}
          </h2>
        </div>
        <div data-reveal className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg">
            Get in touch
          </Button>
          <Button href="/resume" variant="outline" size="lg">
            Resume
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
