"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { fadeUp, staggerReveal } from "@/components/animations/motion-presets";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  return (
    <section className="relative py-24 px-6 md:px-10 flex justify-center">
      <div className="relative w-full max-w-5xl rounded-[2.5rem] border border-white/[0.03] bg-[#08090d]/90 p-10 md:p-16 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Background Grid and Radial Glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.03), transparent 60%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
            backgroundPosition: "center top, center top, center top"
          }}
        />
        
        {/* Subtle Background Orbitals (matching screenshot) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 mix-blend-screen">
           <div className="h-[350px] w-[350px] rounded-full border border-orange-300/10" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full border border-orange-300/5" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full border border-dashed border-orange-300/5 animate-[spin_120s_linear_infinite]" />
        </div>

        <motion.div 
          variants={staggerReveal} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.1 }} 
          className="relative z-10 space-y-14"
        >
          {skillCategories.map((category, index) => (
            <motion.div key={category.title} variants={fadeUp(index * 0.1)} className="space-y-6">
              <h3 className="text-[1.35rem] font-bold tracking-tight text-blue-500/95 drop-shadow-[0_0_12px_rgba(59,130,246,0.2)]">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-center rounded-[20px] bg-[#14151c]/90 border border-white/[0.04] px-6 py-2.5 shadow-lg backdrop-blur-md transition-all hover:bg-[#1a1c26] hover:border-white/10 hover:-translate-y-0.5"
                  >
                    <span className={cn(
                      "text-sm font-semibold tracking-wide",
                      skill.highlight ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "text-slate-300"
                    )}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
