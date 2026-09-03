import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { EmptyState } from "@/components/ui/empty-state";
import { Timeline, type TimelineEntry } from "@/components/content/timeline";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { achievements } from "@/data/achievements";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { formatPeriod, joinMeta } from "@/lib/format";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: profile.introduction,
  path: "/about",
});

const educationEntries: TimelineEntry[] = education.map((entry) => ({
  id: entry.id,
  title: entry.program,
  subtitle: entry.institution,
  period: formatPeriod(entry.start, entry.end),
  meta: joinMeta([
    entry.specialisation,
    entry.location,
    entry.score,
    entry.status === "in-progress" ? "In progress" : null,
  ]),
  highlights: entry.highlights,
  href: entry.url,
}));

const experienceEntries: TimelineEntry[] = experience.map((entry) => ({
  id: entry.id,
  title: entry.role,
  subtitle: entry.organisation,
  period: formatPeriod(entry.start, entry.end),
  meta: joinMeta([entry.kind.replace("-", " "), entry.location]),
  summary: entry.summary,
  highlights: entry.highlights,
  tags: entry.stack,
  href: entry.url,
}));

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
              {profile.photo ? (
                <div className="overflow-hidden rounded-2xl border border-line bg-well">
                  <Image
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    width={profile.photo.width}
                    height={profile.photo.height}
                    sizes="(max-width: 1024px) 100vw, 34vw"
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              ) : null}

              <Surface className="p-7">
                <h2 className="mb-6 text-lg">At a glance</h2>
                <dl className="flex flex-col gap-4 text-sm">
                  <div className="flex flex-col gap-1">
                    <dt className="eyebrow">Role</dt>
                    <dd className="text-fg-muted">{profile.roleLong}</dd>
                  </div>
                  {profile.location ? (
                    <div className="flex flex-col gap-1">
                      <dt className="eyebrow">Based in</dt>
                      <dd className="text-fg-muted">{profile.location}</dd>
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-1">
                    <dt className="eyebrow">Availability</dt>
                    <dd className="text-fg-muted">{profile.availability}</dd>
                  </div>
                </dl>
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

      <Section labelledBy="education-heading">
        <Reveal className="flex flex-col gap-12">
          <div data-reveal>
            <SectionHeading
              id="education-heading"
              eyebrow="Education"
              title="Where the fundamentals come from"
            />
          </div>
          <div data-reveal>
            {educationEntries.length > 0 ? (
              <Timeline entries={educationEntries} />
            ) : (
              <EmptyState
                eyebrow="Education"
                title="Education details are being added"
                body="Programme, institution, and dates will appear here."
              />
            )}
          </div>
        </Reveal>
      </Section>

      <Section labelledBy="experience-heading" flush>
        <Reveal className="flex flex-col gap-12">
          <div data-reveal>
            <SectionHeading
              id="experience-heading"
              eyebrow="Experience"
              title="Roles and the work inside them"
            />
          </div>
          <div data-reveal>
            {experienceEntries.length > 0 ? (
              <Timeline entries={experienceEntries} />
            ) : (
              <EmptyState
                eyebrow="Experience"
                title="Professional experience is ahead, not behind"
                body="I am an undergraduate actively seeking a first internship. Until a role is confirmed, the projects section is the honest record of what I have built and how I approach a problem."
              />
            )}
          </div>
        </Reveal>
      </Section>

      <Section labelledBy="achievements-heading">
        <Reveal className="flex flex-col gap-12">
          <div data-reveal>
            <SectionHeading
              id="achievements-heading"
              eyebrow="Highlights"
              title="Awards, competitions, and community"
            />
          </div>
          <div data-reveal>
            {achievements.length > 0 ? (
              <ul className="flex flex-col">
                {achievements.map((achievement) => (
                  <li
                    key={achievement.id}
                    className="grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-8"
                  >
                    <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle tabular sm:pt-1.5">
                      {achievement.date ?? "—"}
                    </p>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg leading-snug">
                        {achievement.url ? (
                          <a
                            href={achievement.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent"
                          >
                            {achievement.title}
                          </a>
                        ) : (
                          achievement.title
                        )}
                      </h3>
                      {achievement.organisation ? (
                        <p className="text-sm text-fg-muted">{achievement.organisation}</p>
                      ) : null}
                      <p className="measure text-sm leading-relaxed text-fg-muted">
                        {achievement.summary}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                eyebrow="Highlights"
                title="Highlights are being collected"
                body="Competitions, awards, and community work will be listed here once there is something worth verifying against."
              />
            )}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
