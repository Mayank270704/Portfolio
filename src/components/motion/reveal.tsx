"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  threshold?: number;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = 0.08,
  threshold = 0.15,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root || !document.documentElement.classList.contains("motion-ready")) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!targets.length) return;

    const show = () => {
      targets.forEach((node, index) => {
        node.style.transitionDelay = `${delay + index * stagger}s`;
        node.setAttribute("data-reveal-visible", "");
      });
    };

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      show();
      observer.disconnect();
    };

    // IntersectionObserver alone. There used to be a scroll listener alongside
    // this as a belt-and-braces fallback, but every Reveal on the page added
    // one, and each called getBoundingClientRect on every scroll event — a
    // forced layout per instance per frame. The observer's first callback
    // already reports elements that start above the fold, which is the only
    // case the fallback covered.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.top < 0)) {
          finish();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, [delay, stagger, threshold]);

  return (
    <Tag ref={scope} className={cn(className)}>
      {children}
    </Tag>
  );
}
