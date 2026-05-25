"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HologramEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function HologramEffect({
  children,
  className = "",
  intensity = "medium",
}: HologramEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const intensityConfig = {
    low: { glitch: 0.02, flicker: 0.1, scanlines: 0.05, plasma: 0.08 },
    medium: { glitch: 0.05, flicker: 0.15, scanlines: 0.08, plasma: 0.15 },
    high: { glitch: 0.1, flicker: 0.25, scanlines: 0.12, plasma: 0.25 },
  };

  const config = intensityConfig[intensity];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.opacity = "0.35";

    container.style.position = "relative";
    container.appendChild(canvas);

    let animationId: number;
    let time = 0;

    const drawScanlines = () => {
      if (!ctx) return;
      ctx.fillStyle = `rgba(0, 255, 150, ${config.scanlines})`;
      for (let i = 0; i < canvas.height; i += 3) {
        ctx.fillRect(0, i, canvas.width, 1);
      }
    };

    const drawNoise = () => {
      if (!ctx) return;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.96) {
          data[i] = 0;
          data[i + 1] = 255;
          data[i + 2] = 150;
          data[i + 3] = 120;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const drawPlasmaWave = () => {
      if (!ctx) return;
      const waveY = Math.sin(time * 0.5) * 20 + 30;
      const gradient = ctx.createLinearGradient(0, waveY - 20, 0, waveY + 20);
      gradient.addColorStop(0, `rgba(0, 255, 200, 0)`);
      gradient.addColorStop(0.5, `rgba(0, 255, 200, ${config.plasma})`);
      gradient.addColorStop(1, `rgba(0, 255, 200, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, waveY - 20, canvas.width, 40);
    };

    const animate = () => {
      if (!ctx) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() > 1 - config.flicker) {
        ctx.fillStyle = `rgba(0, 255, 150, 0.08)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      drawScanlines();
      drawNoise();
      drawPlasmaWave();

      time += 0.01;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      canvas.remove();
    };
  }, [config]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          textShadow: [
            "0 0 10px rgba(0, 255, 150, 0.5), 0 0 20px rgba(0, 255, 150, 0.3)",
            "0 0 20px rgba(0, 255, 150, 0.8), 0 0 30px rgba(0, 255, 150, 0.5)",
            "0 0 10px rgba(0, 255, 150, 0.5), 0 0 20px rgba(0, 255, 150, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 z-0 rounded-lg bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function HologramBox({
  children,
  className = "",
  glitchOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  glitchOnHover?: boolean;
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/10 pointer-events-none"
        animate={{
          opacity: isHovering ? [0.3, 0.6, 0.3] : 0.1,
          scale: isHovering ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: isHovering ? 0.6 : 0.3,
          repeat: isHovering ? Infinity : 0,
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-lg border border-cyan-500/30 pointer-events-none"
        animate={{
          boxShadow: isHovering
            ? "0 0 20px rgba(0, 255, 200, 0.6), inset 0 0 20px rgba(0, 255, 200, 0.1)"
            : "0 0 10px rgba(0, 255, 200, 0.2), inset 0 0 10px rgba(0, 255, 200, 0.05)",
        }}
        transition={{ duration: 0.3 }}
      />

      {glitchOnHover && isHovering && (
        <>
          <motion.div
            className="absolute inset-0 rounded-lg bg-cyan-500/10 pointer-events-none"
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [0.3, 0, 0.2, 0, 0],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              repeatDelay: 0.3,
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-lg bg-emerald-500/10 pointer-events-none"
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0, 0.3, 0, 0.2, 0],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              repeatDelay: 0.3,
              delay: 0.08,
            }}
          />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function HologramText({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <motion.span
        className="relative"
        animate={{
          textShadow: [
            "0 0 10px rgba(0, 255, 150, 0.3)",
            "0 0 20px rgba(0, 255, 150, 0.6), 0 0 30px rgba(0, 255, 150, 0.3)",
            "0 0 10px rgba(0, 255, 150, 0.3)",
          ],
          color: [
            "rgba(255, 255, 255, 1)",
            "rgba(0, 255, 200, 0.9)",
            "rgba(255, 255, 255, 1)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
