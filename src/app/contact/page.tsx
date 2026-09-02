import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Surface } from "@/components/ui/surface";
import { PendingNotice } from "@/components/ui/pending-notice";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: profile.availability,
};

export default function ContactPage() {
  const live = profile.contact.channels.filter((channel) => channel.href);
  const missing = profile.contact.channels.filter((channel) => !channel.href);

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
          <Reveal className="flex flex-col">
            {live.map((channel) => (
              <a
                key={channel.label}
                href={channel.href as string}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group flex items-center justify-between gap-6 border-t border-line py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-2">
                  <span className="eyebrow">{channel.label}</span>
                  <span className="font-display text-xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-2xl">
                    {channel.value}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="font-mono text-lg text-fg-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                >
                  &rarr;
                </span>
              </a>
            ))}

            {missing.map((channel) => (
              <div
                key={channel.label}
                data-reveal
                className="flex items-center justify-between gap-6 border-t border-line py-8"
              >
                <div className="flex flex-col gap-2">
                  <span className="eyebrow">{channel.label}</span>
                  <span className="font-display text-xl font-semibold tracking-tight text-fg-subtle sm:text-2xl">
                    Not published yet
                  </span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-signal-caution" aria-hidden />
              </div>
            ))}
          </Reveal>

          <div className="flex flex-col gap-6">
            <PendingNotice
              title="Email and contact form are held back"
              body="The previous build shipped an example.com address behind a form that submitted nowhere. Both were removed. Give me a real address or a form endpoint and this panel becomes a working, validated form."
              requires={[
                "A real contact email address",
                "Optionally, a form endpoint (Formspree, Resend, or a route handler)",
                "Confirmation that the GitHub and LinkedIn URLs listed here are correct",
              ]}
            />

            <Surface tone="outline" className="flex flex-col gap-4 p-7">
              <span className="eyebrow">Response</span>
              <p className="text-sm leading-relaxed text-fg-muted">
                Recruiters and collaborators: the fastest route is LinkedIn until the email address is
                published here.
              </p>
            </Surface>
          </div>
        </div>
      </Section>
    </>
  );
}
