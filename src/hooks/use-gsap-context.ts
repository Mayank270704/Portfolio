"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type ContextSetup = (context: gsap.Context) => void;

/**
 * useLayoutEffect on the client, useEffect on the server.
 *
 * The distinction matters for teardown, not setup. React runs useEffect
 * cleanups for an unmounting tree in the passive phase — after it has already
 * removed the nodes from the document. Anything GSAP added to the DOM, above
 * all a ScrollTrigger pin spacer, therefore had to be unwound after the fact.
 * A layout effect's cleanup runs synchronously during the mutation phase,
 * before React touches the DOM, so GSAP always restores the tree it was given
 * while that tree is still live.
 */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useGsapContext(
  setup: ContextSetup,
  scope: RefObject<HTMLElement | null>,
  revision = 0,
) {
  const reduced = useReducedMotion();
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  });

  useIsomorphicLayoutEffect(() => {
    const element = scope.current;
    if (reduced || !element) return;

    const context = gsap.context((self) => setupRef.current(self), element);
    return () => context.revert();
  }, [reduced, scope, revision]);
}
