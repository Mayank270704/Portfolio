"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface HologramProviderProps {
  children: React.ReactNode;
  enableGlobalEffects?: boolean;
}

export function HologramProvider({ children, enableGlobalEffects = true }: HologramProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <div className="relative">
      {enableGlobalEffects && (
        <>
          {/* Floating hologram particles */}
          <motion.div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: -1 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
                animate={{
                  x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                  y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>

          {/* Global hologram overlay glow */}
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(0,255,200,0.02) 0%, transparent 70%)",
              zIndex: -1,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Corner hologram accents */}
          <motion.div
            className="fixed top-0 right-0 w-96 h-96 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,255,200,0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
              zIndex: -1,
            }}
            animate={{
              x: [0, 30, 0],
              y: [-30, 0, -30],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="fixed bottom-0 left-0 w-96 h-96 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,255,150,0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
              zIndex: -1,
            }}
            animate={{
              x: [0, -30, 0],
              y: [30, 0, 30],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {children}
    </div>
  );
}

export function HologramCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="relative w-6 h-6">
        {/* Outer glow circle */}
        <motion.div
          className="absolute inset-0 border-2 border-cyan-400/50 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Center dot */}
        <motion.div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

        {/* Corner accents */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            className="absolute w-1 h-4 bg-gradient-to-b from-cyan-400 to-transparent"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${angle}deg) translateY(-12px) translateX(-0.5px)`,
            }}
            animate={{
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
}
