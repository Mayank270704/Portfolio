import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";

/**
 * The concise version of About: a label, one large statement, one short
 * paragraph, one way through. The full background lives on /about.
 */
export function AboutTeaser() {
  return (
    <Section labelledBy="about-teaser-heading">
      <Reveal className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <span data-reveal className="eyebrow">
            Who I am
          </span>
          <h2
            id="about-teaser-heading"
            data-reveal
            className="display max-w-4xl text-[clamp(1.875rem,4.6vw,3.25rem)]"
          >
            {profile.positioning}
          </h2>
        </div>

        <div data-reveal className="rule" />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <p data-reveal className="measure text-base leading-relaxed text-fg-muted sm:text-lg">
              {profile.introduction}
            </p>
            <div data-reveal>
              <Button href="/about" variant="outline">
                More about me
              </Button>
            </div>
          </div>

          <div>
            <ul className="flex flex-col gap-5">
              {profile.focusAreas.map((area, index) => (
                <li key={area.label} data-reveal className="flex gap-5">
                  <span className="mt-1 font-mono text-[0.6875rem] tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-base font-semibold tracking-tight">
                      {area.label}
                    </span>
                    <span className="text-sm leading-relaxed text-fg-muted">{area.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
