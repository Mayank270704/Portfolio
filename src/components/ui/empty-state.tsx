import type { ReactNode } from "react";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  body: string;
  /** Short label above the title. Keep it outward-facing. */
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}

/**
 * The one treatment for a section that has no content yet. It reads as a
 * deliberate state rather than a gap, and never exposes build notes.
 */
export function EmptyState({
  title,
  body,
  eyebrow = "In progress",
  action,
  className,
}: EmptyStateProps) {
  return (
    <Surface tone="outline" className={cn("p-7 sm:p-9", className)}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent/70" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl sm:text-2xl">{title}</h3>
          <p className="measure text-sm leading-relaxed text-fg-muted">{body}</p>
        </div>
        {action ? <div className="flex flex-wrap items-center gap-3 pt-1">{action}</div> : null}
      </div>
    </Surface>
  );
}
