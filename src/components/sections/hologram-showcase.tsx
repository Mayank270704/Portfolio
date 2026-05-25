"use client";

import { motion } from "framer-motion";
import { HologramEffect, HologramBox, HologramText } from "@/components/animations/hologram-effect";

export function HologramShowcase() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-24 md:px-10">
      {/* Animated hologram grid background */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(0deg, rgba(0,255,200,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.2) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Central holographic orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background: "radial-gradient(circle, rgba(0,255,200,0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            <HologramText>Sci-Fi Hologram Portfolio</HologramText>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Experience the future with cutting-edge holographic animations and cyber effects
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-16"
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Hologram Box Feature */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <HologramBox className="h-full">
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-cyan-400">Hologram Boxes</h3>
                <p className="text-slate-300">
                  Interactive boxes with glowing borders, scanline effects, and hover animations
                </p>
                <div className="pt-4 text-sm text-slate-400">
                  Hover over this card to see the glitch effect
                </div>
              </div>
            </HologramBox>
          </motion.div>

          {/* Glowing Text Feature */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <HologramBox className="h-full">
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-emerald-400">
                  <HologramText>Glowing Text</HologramText>
                </h3>
                <p className="text-slate-300">
                  Dynamic text with pulsing cyan glow and color shifting animations
                </p>
                <div className="pt-4 text-sm text-slate-400">
                  Text shimmers with holographic energy
                </div>
              </div>
            </HologramBox>
          </motion.div>

          {/* Cyber Grid Feature */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <HologramBox className="h-full">
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-blue-400">Cyber Grid</h3>
                <p className="text-slate-300">
                  Animated grid background that creates a futuristic, digital atmosphere
                </p>
                <div className="pt-4 text-sm text-slate-400">
                  Grid patterns flow infinitely across the screen
                </div>
              </div>
            </HologramBox>
          </motion.div>

          {/* Scanline Effect Feature */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <HologramBox className="h-full">
              <div className="p-8 space-y-4 scanlines">
                <h3 className="text-2xl font-bold text-orange-400">Scanline Effects</h3>
                <p className="text-slate-300">
                  Classic terminal scanlines overlay creates authentic retro-futuristic feel
                </p>
                <div className="pt-4 text-sm text-slate-400">
                  Horizontal lines animate smoothly downward
                </div>
              </div>
            </HologramBox>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-6 justify-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <HologramBox>
            <button className="px-8 py-4 bg-cyan-500/20 border border-cyan-400 rounded-lg text-cyan-300 font-semibold hover:bg-cyan-500/40 transition-all">
              Explore Projects
            </button>
          </HologramBox>
          <HologramBox>
            <button className="px-8 py-4 bg-emerald-500/20 border border-emerald-400 rounded-lg text-emerald-300 font-semibold hover:bg-emerald-500/40 transition-all">
              Get in Touch
            </button>
          </HologramBox>
        </motion.div>
      </div>
    </section>
  );
}
