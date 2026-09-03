"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { isActiveRoute } from "@/data/navigation";

/** Never emits; the value differs only between the server and client snapshots. */
const noSubscribe = () => () => {};

/**
 * Returns a predicate for "is this nav href the current section?".
 *
 * Exact matches are resolved during the server render, so the seven top-level
 * routes highlight on first paint. Nested matches — `/projects/some-slug`
 * highlighting Projects — wait until after hydration, because Next serves the
 * prerendered not-found shell for unmatched URLs and that shell's pathname is
 * `/_not-found`, not the URL the client router reports. Resolving nesting
 * during hydration therefore mismatches on every 404.
 */
export function useActiveRoute() {
  const pathname = usePathname();
  const hydrated = useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );

  return (href: string) => (hydrated ? isActiveRoute(pathname, href) : pathname === href);
}
