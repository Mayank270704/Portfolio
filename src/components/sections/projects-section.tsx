"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionShell } from "@/components/shared/section-shell";
import { ProjectCard } from "@/components/cards/project-card";
import { staggerReveal } from "@/components/animations/motion-presets";

export function ProjectsSection() {
  return (
    <SectionShell title="Projects" subtitle="Studio-grade work for AI, analytics, and innovation.">
      <motion.div variants={staggerReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <motion.div key={project.id} className="w-full">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
