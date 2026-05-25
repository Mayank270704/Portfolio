"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/components/animations/motion-presets";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 flex items-center justify-center md:px-10">
      {/* No background — aurora canvas shows through from below */}

      <div className="relative mx-auto flex flex-col items-center text-center gap-8 max-w-4xl z-10">
        
        {/* Bhavna Singh Style Central Circular Avatar */}
        <motion.div 
          className="relative flex h-60 w-60 items-center justify-center mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Outer glowing pulsing aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-cyan-500/10 blur-2xl animate-pulse" />
          
          {/* Subtle concentric orbit rings */}
          <div className="absolute -inset-4 rounded-full border border-white/[0.04] bg-transparent" />
          <div className="absolute -inset-8 rounded-full border border-white/[0.02] bg-transparent" />
          
          {/* Central Medallion */}
          <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full border-2 border-white/10 bg-slate-950/85 shadow-[0_0_50px_rgba(249,115,22,0.15)] backdrop-blur-xl">
            {/* Inner futuristic tech details */}
            <div className="absolute inset-1 rounded-full border border-white/5 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.15),_transparent_75%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full border border-dashed border-orange-500/20 animate-[spin_40s_linear_infinite]" />
            
            {/* Initials and text styling representing the core */}
            <div className="flex flex-col items-center justify-center text-center z-20">
              <span className="text-5xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-orange-300">
                MS
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-orange-400/80 font-bold">
                AI CORE
              </span>
            </div>
            
            {/* Green glowing indicator dot */}
            <div className="absolute top-5 right-5 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-[pulse_2s_infinite]" />
          </div>

          {/* Connected Pointer Tag 1: Python Core (Left Bottom) */}
          <motion.div 
            className="absolute left-[-7.5rem] bottom-[1.5rem] flex items-center z-20"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="rounded-xl border border-white/10 bg-slate-950/85 px-4 py-2.5 shadow-2xl backdrop-blur-md text-left transition hover:border-orange-500/30">
              <p className="text-[10px] uppercase tracking-[0.2em] text-orange-400 font-extrabold">Python Core</p>
              <p className="text-[11px] text-slate-400 font-semibold whitespace-nowrap mt-0.5">robust pipelines</p>
            </div>
            {/* Custom connecting line pointing to the bottom-left of the avatar */}
            <div className="relative w-12 h-6 -ml-[1px] pointer-events-none">
              <svg className="w-full h-full text-white/20" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12 H24 L48 24" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>
          </motion.div>

          {/* Connected Pointer Tag 2: MLOps (Right Top) */}
          <motion.div 
            className="absolute right-[-7.5rem] top-[1.5rem] flex items-center z-20"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {/* Custom connecting line pointing to the top-right of the avatar */}
            <div className="relative w-12 h-6 -mr-[1px] pointer-events-none">
              <svg className="w-full h-full text-white/20" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 12 H24 L0 0" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/85 px-4 py-2.5 shadow-2xl backdrop-blur-md text-left transition hover:border-cyan-500/30">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-extrabold">MLOps</p>
              <p className="text-[11px] text-slate-400 font-semibold whitespace-nowrap mt-0.5">production-ready</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Pill Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-orange-300 backdrop-blur-md"
          variants={fadeUp(0.15)}
          initial="hidden"
          animate="show"
        >
          <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse" />
          AI/ML ENGINEER &bull; DATA ANALYTICS ENTHUSIAST
        </motion.div>

        {/* Main Name Header */}
        <div className="space-y-4">
          <motion.h1 
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
            variants={fadeUp(0.3)}
            initial="hidden"
            animate="show"
          >
            Hi, I'm <span className="bg-gradient-to-r from-white via-slate-100 to-orange-300 bg-clip-text text-transparent">Mayank Swaroop</span>
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl text-base text-slate-400 sm:text-lg leading-relaxed mx-auto"
            variants={fadeUp(0.45)}
            initial="hidden"
            animate="show"
          >
            Building premium machine learning systems with data, intelligence, and architectural precision.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col gap-4 sm:flex-row sm:items-center mt-4"
          variants={fadeUp(0.6)}
          initial="hidden"
          animate="show"
        >
          <Button href="/about" variant="accent" size="lg">
            Explore the Studio
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Connect with me
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
