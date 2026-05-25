"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

interface RootLayoutWrapperProps {
  children: ReactNode;
}

export function RootLayoutWrapper({ children }: RootLayoutWrapperProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Sidebar />
      <main className={`relative min-h-screen overflow-hidden ${!isHome ? "xl:pl-[5.5rem]" : ""}`}>
        {children}
      </main>
      {!isHome && <Footer />}
    </>
  );
}
