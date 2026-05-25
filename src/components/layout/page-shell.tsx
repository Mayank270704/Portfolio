"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { staggerReveal } from "@/components/animations/motion-presets";
import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <motion.main
        variants={staggerReveal}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden pt-24"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
