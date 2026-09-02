import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "start" | "center";
  as?: "h2" | "h3";
  className?: string;
  action?: ReactNode;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  align = "start",
  as: Tag = "h2",
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <span className="eyebrow">{eyebrow}</span>
        <Tag id={id} className="max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)]">{title}</Tag>
        {lede ? <p className="measure text-[0.9375rem] leading-relaxed text-fg-muted">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
