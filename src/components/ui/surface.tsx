import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

interface SurfaceProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  tone?: "flat" | "raised" | "outline";
}

const toneClasses = {
  flat: "bg-surface border-line",
  raised: "bg-raised border-line-strong",
  outline: "bg-transparent border-line",
} as const;

export function Surface({ children, className, as: Tag = "div", tone = "flat" }: SurfaceProps) {
  return (
    <Tag className={cn("rounded-2xl border backdrop-blur-xl", toneClasses[tone], className)}>
      {children}
    </Tag>
  );
}
