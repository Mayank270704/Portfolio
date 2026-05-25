import { motion } from "framer-motion";
import { GitBranch, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { hoverGlow } from "@/components/animations/motion-presets";
import { HologramBox } from "@/components/animations/hologram-effect";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div {...hoverGlow} className="w-full">
      <HologramBox>
        <GlassCard className="h-full">
          <div className="mb-6 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.35em] text-orange-300/90">{project.category}</span>
            <div>
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-slate-300">{project.description}</p>
            </div>
          </div>
          <div className="mb-6 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={project.github} variant="ghost" size="sm" className="border-white/10 text-slate-100 hover:text-orange-300">
              <GitBranch className="mr-2 h-4 w-4" /> GitHub
            </Button>
            <Button href={project.demo} variant="accent" size="sm" className="shadow-none">
              <Globe className="mr-2 h-4 w-4" /> Visit demo
            </Button>
          </div>
        </GlassCard>
      </HologramBox>
    </motion.div>
  );
}
