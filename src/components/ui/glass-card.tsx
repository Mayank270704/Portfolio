import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
