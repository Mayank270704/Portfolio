import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bleed?: boolean;
  flush?: boolean;
  labelledBy?: string;
}

export function Section({
  children,
  className,
  id,
  bleed = false,
  flush = false,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-20 sm:py-24 lg:py-32",
        flush && "pt-0 sm:pt-0 lg:pt-0",
        className,
      )}
    >
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}
