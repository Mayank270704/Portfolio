"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { SectionShell } from "@/components/shared/section-shell";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/components/animations/motion-presets";

export function ResumeSection() {
  return (
    <SectionShell title="Resume" subtitle="ATS-friendly layout with premium presentation.">
      <motion.div variants={fadeUp(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_0.9fr]">
        <div className="space-y-6 rounded-[32px] border border-white/10 bg-slate-950/70 p-10 backdrop-blur-3xl">
          <p className="text-lg leading-8 text-slate-300">{resume.summary}</p>
          {resume.sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-xl font-semibold text-white">{section.title}</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-400">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex min-h-[280px] flex-col items-start justify-between rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/80 to-slate-900/80 p-10 backdrop-blur-3xl">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-300/90">Download</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Resume preview</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">Instantly access the PDF version designed for recruiters and ATS workflows.</p>
          </div>
          <Button href={resume.downloadUrl} variant="accent" size="lg">
            Download PDF
          </Button>
        </div>
      </motion.div>
    </SectionShell>
  );
}
