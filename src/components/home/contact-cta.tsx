import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";

/**
 * The ending.
 *
 * This is where the scroll journey lands, so it is the darkest point of the
 * page by construction rather than by a hard-coded colour — it inherits the
 * ground that ScrollStage has arrived at, and simply gives it room.
 */
export function ContactCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative flex min-h-[85dvh] flex-col justify-center overflow-hidden py-28 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-1/4 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 100%, rgb(var(--glow-accent) / 0.18), transparent 70%)",
        }}
      />

      <Reveal className="shell flex flex-col gap-14">
        <div className="flex flex-col gap-8">
          <span data-reveal className="eyebrow">
            Next step
          </span>
          <h2
            id="cta-heading"
            data-reveal
            className="display max-w-4xl text-[clamp(2.25rem,6vw,4.25rem)]"
          >
            {profile.availability}
          </h2>
        </div>

        <div data-reveal className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg">
            Get in touch
          </Button>
          <Button href="/projects" variant="outline" size="lg">
            See the work
          </Button>
          <Button href="/resume" variant="quiet" size="lg">
            Resume
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
