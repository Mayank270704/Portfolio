"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = useMemo(
    () =>
      navigation.map((item) => ({
        ...item,
        active: pathname === item.href,
      })),
    [pathname],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-4">
          <BrandIcon />
          <div>
            <p className="text-sm uppercase tracking-[0.5em] text-slate-300/80">Mayank Swaroop</p>
            <p className="text-xs text-slate-500">AI/ML Engineer</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm uppercase tracking-[0.35em] transition hover:text-orange-300",
                item.active ? "text-white" : "text-slate-400",
              )}
            >
              {item.title}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950/95 backdrop-blur-3xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-3xl px-4 py-3 text-base uppercase tracking-[0.35em] transition hover:bg-white/5",
                  item.active ? "bg-white/10 text-white" : "text-slate-300",
                )}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
