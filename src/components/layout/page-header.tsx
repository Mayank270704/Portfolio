import { Reveal } from "@/components/motion/reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: string;
}

export function PageHeader({ eyebrow, title, lede, meta }: PageHeaderProps) {
  return (
    <header className="relative pt-[calc(var(--header-h)+4.5rem)] pb-14 sm:pb-20">
      <div className="shell">
        <Reveal className="flex flex-col gap-6">
          <div data-reveal className="flex items-center gap-4">
            <span className="eyebrow">{eyebrow}</span>
            <span aria-hidden className="h-px flex-1 max-w-24 bg-line-strong" />
            {meta ? <span className="font-mono text-[0.6875rem] text-fg-subtle">{meta}</span> : null}
          </div>
          <h1 data-reveal className="max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)]">
            {title}
          </h1>
          {lede ? (
            <p data-reveal className="measure text-base leading-relaxed text-fg-muted sm:text-lg">
              {lede}
            </p>
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}
