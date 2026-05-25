"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { SectionShell } from "@/components/shared/section-shell";
import { fadeUp } from "@/components/animations/motion-presets";
import { GlassCard } from "@/components/ui/glass-card";

export function AboutSection() {
  return (
    <SectionShell title="About" subtitle="Elegant AI engineering with luxury direction.">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div variants={fadeUp(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <GlassCard>
            <div className="space-y-6">
              <p className="text-lg leading-8 text-slate-300">{profile.introduction}</p>
              <div className="space-y-4">
                {profile.overview.map((item) => (
                  <p key={item} className="text-sm leading-7 text-slate-400">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="space-y-6">
            <GlassCard>
              <h2 className="text-xl font-semibold text-white">Education</h2>
              <div className="mt-6 space-y-4">
                {profile.education.map((item) => (
                  <div key={item.institution} className="rounded-3xl bg-slate-900/70 p-6">
                    <p className="text-base font-semibold text-white">{item.program}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.institution}</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.25em] text-orange-300/80">{item.year}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-xl font-semibold text-white">Career Vision</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                I seek to build refined AI experiences with clear structure, rigorous analytics, and premium presentation.
              </p>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
