import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations/motion-presets";

interface SectionShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function SectionShell({ title, subtitle, children }: SectionShellProps) {
  return (
    <section className="relative py-24 px-6 md:px-10">
      <motion.div variants={fadeUp(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="mb-12 max-w-3xl text-slate-100">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300/80">{title}</p>
          {subtitle ? <p className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">{subtitle}</p> : null}
        </div>
      </motion.div>
      {children}
    </section>
  );
}
