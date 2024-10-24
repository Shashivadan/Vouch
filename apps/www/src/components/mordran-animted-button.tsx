import React from "react";
import { motion } from "framer-motion";

export default function MordranAnimatedButton() {
  // Animation variants for the spinning border effect
  const borderVariants = {
    initial: {
      background:
        "conic-gradient(from 0deg at 50% 50%, transparent 0, #eca5a7 25%, transparent 50%), #452324",
    },
    animate: {
      background: [
        "conic-gradient(from 0deg at 50% 50%, transparent 0, #eca5a7 25%, transparent 50%), #452324",
        "conic-gradient(from 360deg at 50% 50%, transparent 0, #eca5a7 25%, transparent 50%), #452324",
      ],
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <motion.button
      className="relative transform-gpu cursor-pointer rounded-full p-px shadow-[0_0_20px_0_rgba(245,48,107,0.1)] hue-rotate-[190deg] invert transition-all hover:bg-[#782a2b] hover:shadow-[0_0_20px_3px_rgba(245,49,108,.2)] dark:hue-rotate-0 dark:invert-0"
      variants={borderVariants}
      initial="initial"
      animate="animate"
      type="button"
    >
      <span className="pointer-events-none flex h-7 flex-nowrap items-center gap-2 rounded-full bg-[#120d0e] px-3 py-1 text-sm font-medium tracking-tighter text-[#eca5a7]">
        <span>Introduction</span>
        <span className="h-5/6 w-px bg-neutral-700/50" />
        <span className="text-neutral-500">Vouch</span>
      </span>
    </motion.button>
  );
}
