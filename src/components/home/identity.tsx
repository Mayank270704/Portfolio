import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/layout/section";
import { profile } from "@/data/profile";

export function Identity() {
  return (
    <Section labelledBy="identity-heading">
      <Reveal className="flex flex-col gap-14">
        <div className="flex flex-col gap-6">
          <span data-reveal className="eyebrow">
            Positioning
          </span>
          <h2
            id="identity-heading"
            data-reveal
            className="max-w-4xl text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.12]"
          >
            {profile.introduction}
          </h2>
        </div>

        <div data-reveal className="rule" />

        <div className="grid gap-10 sm:grid-cols-3">
          {profile.focusAreas.map((area, index) => (
            <div key={area.label} data-reveal className="flex flex-col gap-3">
              <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg">{area.label}</h3>
              <p className="text-sm leading-relaxed text-fg-muted">{area.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
