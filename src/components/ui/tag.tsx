import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
