import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Surface } from "@/components/ui/surface";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: profile.introduction,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Engineering that starts at the data and ends at the interface."
        lede={profile.positioning}
        meta="01"
      />

      <Section flush>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <p data-reveal className="text-lg leading-relaxed text-fg sm:text-xl">
              {profile.introduction}
            </p>
            <div data-reveal className="rule" />
            <div className="flex flex-col gap-8">
              {profile.focusAreas.map((area, index) => (
                <div key={area.label} data-reveal className="flex gap-6">
                  <span className="mt-1 font-mono text-[0.6875rem] tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg">{area.label}</h2>
                    <p className="measure text-sm leading-relaxed text-fg-muted">{area.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Parallax distance={40} className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex flex-col gap-6">
              <Surface className="p-7">
                <h2 className="mb-6 text-lg">Education</h2>
                <div className="flex flex-col gap-5">
                  {profile.education.map((entry) => (
                    <div key={entry.institution} className="flex flex-col gap-2">
                      <p className="font-display text-[0.9375rem] font-semibold text-fg">
                        {entry.program}
                      </p>
                      <p className="text-sm text-fg-muted">{entry.institution}</p>
                      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle tabular">
                        {entry.period} &middot; {entry.status}
                      </p>
                    </div>
                  ))}
                </div>
              </Surface>

              <Surface className="p-7">
                <h2 className="mb-6 text-lg">Looking for</h2>
                <ul className="flex flex-col gap-3">
                  {profile.goals.map((goal) => (
                    <li key={goal} className="flex items-center gap-3 text-sm text-fg-muted">
                      <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </Surface>
            </div>
          </Parallax>
        </div>
      </Section>
    </>
  );
}
