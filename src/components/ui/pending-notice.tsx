import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

interface PendingNoticeProps {
  title: string;
  body: string;
  requires: string[];
  className?: string;
}

export function PendingNotice({ title, body, requires, className }: PendingNoticeProps) {
  return (
    <Surface tone="outline" className={cn("p-7 sm:p-9", className)}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-caution" />
          <span className="eyebrow text-signal-caution">Awaiting content</span>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl sm:text-2xl">{title}</h3>
          <p className="measure text-sm leading-relaxed text-fg-muted">{body}</p>
        </div>
        <ul className="flex flex-col gap-2 border-t border-line pt-5">
          {requires.map((item) => (
            <li key={item} className="flex gap-3 font-mono text-[0.75rem] leading-relaxed text-fg-subtle">
              <span aria-hidden className="text-accent">
                &rarr;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}
