"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-navigation"
      hidden={!open}
      className="fixed inset-0 z-50 flex flex-col bg-void/97 backdrop-blur-2xl lg:hidden"
    >
      <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-fg-subtle">
          Navigation
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-surface text-fg-muted transition-colors hover:text-fg"
        >
          <span aria-hidden className="relative block h-4 w-4">
            <span className="absolute left-0 top-1/2 block h-px w-4 rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 block h-px w-4 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center gap-1 pb-16">
        {navigation.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className="group flex items-baseline gap-5 border-b border-line py-5"
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-fg-subtle">
                {item.index}
              </span>
              <span
                className={`font-display text-3xl font-semibold tracking-tight transition-colors ${
                  active ? "text-accent" : "text-fg group-hover:text-accent"
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
        <p className="mt-8 font-mono text-[0.6875rem] leading-relaxed text-fg-subtle">
          {profile.role}
        </p>
      </nav>
    </div>
  );
}
