import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "quiet";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps =
  | (BaseProps & { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | (BaseProps & { href?: undefined; external?: never } & React.ButtonHTMLAttributes<HTMLButtonElement>);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-void hover:bg-accent-bright shadow-[0_0_0_1px_rgba(124,156,255,0.35),0_18px_40px_-18px_rgba(124,156,255,0.9)]",
  outline: "border border-line-strong bg-surface/60 text-fg hover:border-accent/60 hover:bg-raised",
  quiet: "text-fg-muted hover:text-fg",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 disabled:pointer-events-none disabled:opacity-45",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (rest.href !== undefined) {
    const { href, external, ...anchorProps } = rest as BaseProps & {
      href: string;
      external?: boolean;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = rest as BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
