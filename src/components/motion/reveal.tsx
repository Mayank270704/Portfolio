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
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      if (root.getBoundingClientRect().top < window.innerHeight * 0.92) finish();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.top < 0)) {
          finish();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [delay, stagger, threshold]);

  return (
    <Tag ref={scope} className={cn(className)}>
      {children}
    </Tag>
  );
}
