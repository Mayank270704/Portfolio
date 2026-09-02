"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

export function Parallax({ children, className, distance = 60 }: ParallaxProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    gsap.fromTo(
      "[data-parallax-layer]",
      { yPercent: 0 },
      {
        y: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, scope);

  return (
    <div ref={scope} className={cn(className)}>
      <div data-parallax-layer className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
