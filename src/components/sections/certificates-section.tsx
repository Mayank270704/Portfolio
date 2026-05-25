"use client";

import { motion } from "framer-motion";
import { certificates } from "@/data/certificates";
import { SectionShell } from "@/components/shared/section-shell";
import { CertificateCard } from "@/components/cards/certificate-card";
import { staggerReveal } from "@/components/animations/motion-presets";

export function CertificatesSection() {
  return (
    <SectionShell title="Certificates" subtitle="A premium gallery of verified achievement.">
      <motion.div variants={staggerReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
        {certificates.map((certificate) => (
          <motion.div key={certificate.id} className="w-full">
            <CertificateCard certificate={certificate} />
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
