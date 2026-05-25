"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { SectionShell } from "@/components/shared/section-shell";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/components/animations/motion-presets";
import { HologramBox, HologramEffect } from "@/components/animations/hologram-effect";

export function ContactSection() {
  return (
    <SectionShell title="Contact" subtitle="Minimal luxury contact for recruiters and collaborators.">
      <motion.div variants={fadeUp(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_0.95fr]">
        <HologramEffect className="rounded-[32px] border border-cyan-400/10 bg-slate-950/75 p-10 backdrop-blur-3xl">
          <div className="space-y-8">
            <p className="text-lg leading-8 text-slate-300">Reach out for internships, projects, or AI collaborations with a premium data mindset.</p>
            <div className="space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">Email</p>
                <p className="mt-3 text-base text-slate-200">{profile.contact.email}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">LinkedIn</p>
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="mt-3 inline-block text-base text-slate-200 hover:text-cyan-300">
                  {profile.contact.linkedin}
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">GitHub</p>
                <a href={profile.contact.github} target="_blank" rel="noreferrer" className="mt-3 inline-block text-base text-slate-200 hover:text-cyan-300">
                  {profile.contact.github}
                </a>
              </div>
            </div>
          </div>
        </HologramEffect>

        <HologramBox className="relative">
          <motion.form className="space-y-6 rounded-[32px] border border-white/10 bg-slate-950/80 p-10 shadow-[0_30px_120px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
            <div>
              <label htmlFor="name" className="text-sm uppercase tracking-[0.35em] text-slate-400">
                Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Your name"
                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm uppercase tracking-[0.35em] text-slate-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm uppercase tracking-[0.35em] text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project or role"
                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-cyan-300/80"
              />
            </div>
            <Button variant="accent" size="lg" href="mailto:mayank@example.com">
              Send inquiry
            </Button>
          </motion.form>
        </HologramBox>
      </motion.div>
    </SectionShell>
  );
}
