"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type ContextSetup = (context: gsap.Context) => void;

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

  useEffect(() => {
    const element = scope.current;
    if (reduced || !element) return;

    const context = gsap.context((self) => setupRef.current(self), element);
    return () => context.revert();
  }, [reduced, scope, revision]);
}
