"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "accent";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps =
  | ({ href: string } & {
      variant?: ButtonVariant;
      size?: ButtonSize;
      className?: string;
      children: React.ReactNode;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & {
      variant?: ButtonVariant;
      size?: ButtonSize;
      className?: string;
      children: React.ReactNode;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-slate-950 shadow-[0_20px_70px_rgba(255,255,255,0.14)] hover:bg-white/90",
  accent:
    "bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 shadow-[0_20px_70px_rgba(251,146,60,0.18)] hover:brightness-110",
  ghost:
    "border border-white/15 bg-white/5 text-white hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({ href, variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
