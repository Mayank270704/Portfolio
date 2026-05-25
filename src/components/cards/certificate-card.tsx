import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { hoverGlow } from "@/components/animations/motion-presets";
import type { Certificate } from "@/data/certificates";

interface CertificateCardProps {
  certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <motion.div {...hoverGlow} className="w-full">
      <GlassCard className="h-full">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-orange-300/90">{certificate.year}</span>
          <div>
            <h3 className="text-xl font-semibold text-white">{certificate.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{certificate.issuer}</p>
          </div>
          <p className="text-sm leading-7 text-slate-300">{certificate.description}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
