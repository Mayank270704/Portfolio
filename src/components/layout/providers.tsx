"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { useLenis } from "@/hooks/use-lenis";
import { HologramProvider } from "@/components/animations/hologram-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useLenis();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <HologramProvider enableGlobalEffects={true}>
        {children}
      </HologramProvider>
    </ThemeProvider>
  );
}
