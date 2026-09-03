import Link from "next/link";
import { Tag } from "@/components/ui/tag";

export type TimelineEntry = {
  id: string;
  /** Programme or job title. */
  title: string;
  /** Institution or organisation. */
  subtitle: string;
  period: string;
  /** Location, score, employment type — anything already joined for display. */
  meta?: string | null;
  summary?: string | null;
  highlights?: string[];
  tags?: string[];
  href?: string | null;
};

/**
 * Shared rendering for education and experience. Every optional field is
 * omitted rather than rendered empty.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="flex flex-col">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-8"
        >
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle tabular sm:pt-1.5">
            {entry.period}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg leading-snug">
                {entry.href ? (
                  <Link
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {entry.title}
                  </Link>
                ) : (
                  entry.title
                )}
              </h3>
              <p className="text-sm text-fg-muted">{entry.subtitle}</p>
              {entry.meta ? (
                <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle">
                  {entry.meta}
                </p>
              ) : null}
            </div>

            {entry.summary ? (
              <p className="measure text-sm leading-relaxed text-fg-muted">{entry.summary}</p>
            ) : null}

            {entry.highlights && entry.highlights.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}

            {entry.tags && entry.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {entry.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
