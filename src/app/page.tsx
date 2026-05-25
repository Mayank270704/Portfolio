"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroSection } from "@/components/sections/hero-section";
import { AuroraBg } from "@/components/ui/aurora-bg";
import { profile } from "@/data/profile";

export default function HomePage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      {/* Fixed aurora canvas sits below everything */}
      <AuroraBg />

      <main ref={containerRef} className="relative z-10">
        {/* Sticky Hero Section */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div style={{ scale, opacity }} className="h-full w-full origin-top">
            <HeroSection />
          </motion.div>
        </div>

        {/* Overlapping Bottom Section – glassmorphic so aurora bleeds through */}
        <section className="relative z-10 w-full overflow-hidden px-6 py-24 md:px-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0,4,8,0.55) 0%, rgba(1,6,15,0.88) 60%, rgba(2,5,12,0.97) 100%)",
            backdropFilter: "blur(0px)",
            boxShadow: "0 -40px 80px rgba(0,0,0,0.6)",
          }}
        >
          <div className="mx-auto max-w-6xl space-y-8">
            <div
              className="rounded-[32px] border border-white/10 p-10 shadow-xl"
              style={{ background: "rgba(5, 8, 20, 0.65)", backdropFilter: "blur(24px)" }}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/90">Featured perspective</p>
              <h2 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
                A luxury AI/ML portfolio designed with architectural precision.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                {profile.overview[0]} {profile.overview[2]}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "About",        description: "Elegant introduction and refined vision.",                      href: "/about"        },
                { title: "Skills",       description: "Technical capability profile and modern tool mastery.",         href: "/skills"       },
                { title: "Projects",     description: "Premium AI showcases with clean storytelling.",                 href: "/projects"     },
                { title: "Certificates",description: "Validated credentials in AI architecture and engineering.",      href: "/certificates" },
                { title: "Resume",       description: "ATS-ready overview and professional blueprint.",                href: "/resume"       },
                { title: "Contact",      description: "Recruiter-ready outreach with luxury simplicity.",              href: "/contact"      },
              ].map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group rounded-[28px] border border-white/10 p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40"
                  style={{ background: "rgba(5, 10, 22, 0.55)", backdropFilter: "blur(20px)" }}
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-400/80">{card.title}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400 group-hover:text-slate-200">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
