import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Surface } from "@/components/ui/surface";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ContactChannels } from "@/components/contact/contact-channels";
import { Reveal } from "@/components/motion/reveal";
import { liveContactChannels, pendingContactChannels, profile } from "@/data/profile";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: profile.availability,
  path: "/contact",
});

export default function ContactPage() {
  const hasLiveChannel = liveContactChannels.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Direct lines, no forms in the way."
        lede={profile.availability}
        meta="06"
      />

      <Section flush>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div data-reveal>
              {hasLiveChannel ? (
                <ContactChannels
                  live={liveContactChannels}
                  pending={pendingContactChannels}
                />
              ) : (
                <EmptyState
                  eyebrow="Contact"
                  title="Contact details are being published"
                  body="Rather than list an address that might bounce or a profile that might move, this page waits until each destination is confirmed. Every channel below goes live the moment it is."
                />
              )}
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {!hasLiveChannel && pendingContactChannels.length > 0 ? (
              <Surface tone="outline" className="flex flex-col gap-4 p-7">
                <span className="eyebrow">Coming here</span>
                <ul className="flex flex-col gap-3">
                  {pendingContactChannels.map((channel) => (
                    <li
                      key={channel.id}
                      className="flex items-center gap-3 text-sm text-fg-muted"
                    >
                      <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                      {channel.label}
                    </li>
                  ))}
                </ul>
              </Surface>
            ) : null}

            <Surface tone="outline" className="flex flex-col gap-4 p-7">
              <span className="eyebrow">In the meantime</span>
              <p className="text-sm leading-relaxed text-fg-muted">
                The work itself is the fastest way to judge the fit. The projects section carries the
                full case studies, and the resume page has education, focus areas, and the technical
                ground in one place.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button href="/projects" variant="outline" size="sm">
                  View projects
                </Button>
                <Button href="/resume" variant="quiet" size="sm">
                  Resume
                </Button>
              </div>
            </Surface>
          </div>
        </div>
      </Section>
    </>
  );
}
