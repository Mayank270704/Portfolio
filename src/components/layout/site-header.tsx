"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useActiveRoute } from "@/hooks/use-active-route";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = useActiveRoute();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line bg-void/75 backdrop-blur-xl">
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — home`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong bg-raised font-display text-[0.8125rem] font-semibold tracking-tight text-fg">
              {profile.initials}
              <span className="absolute -right-px -top-px h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight">
                {profile.name}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-fg-subtle">
                {profile.role}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                    active ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.title}
                  {active ? (
                    <span className="absolute inset-x-3.5 -bottom-px h-px bg-accent" aria-hidden />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-raised text-fg-muted transition-colors hover:text-fg lg:hidden"
          >
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <div
        aria-hidden
        className="h-px origin-left bg-accent/70"
        style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
      />

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
