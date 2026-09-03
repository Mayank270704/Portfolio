"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveRoute } from "@/hooks/use-active-route";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const isActive = useActiveRoute();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      // Keep focus inside the open menu; it covers the whole viewport, so
      // tabbing out would land on controls the visitor cannot see.
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previous = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-navigation"
      ref={panelRef}
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 flex flex-col bg-void backdrop-blur-2xl lg:hidden"
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
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-raised text-fg-muted transition-colors hover:text-fg"
        >
          <span aria-hidden className="relative block h-4 w-4">
            <span className="absolute left-0 top-1/2 block h-px w-4 rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 block h-px w-4 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="shell flex flex-1 flex-col justify-center gap-1 overflow-y-auto pb-16"
      >
        {navigation.map((item) => {
          const active = isActive(item.href);
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
