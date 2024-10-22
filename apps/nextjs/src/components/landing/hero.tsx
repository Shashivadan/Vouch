"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const glowVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: {
      scale: [0.8, 1, 0.8],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative h-svh">
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute top-28 -z-10 h-72 w-72"
      >
        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-[200px]"
        />
      </motion.div>
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-28 right-0 -z-10 h-72 w-72"
      >
        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-[200px]"
        />
      </motion.div>

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 lg:py-16">
        <div className="inline-block max-w-sm lg:max-w-4xl text-center justify-center text-2xl tracking-tight  font-semibold">
        <h1>Turn Happy Customers into Powerful Stories</h1>
      </div>
      </div>
    </div>
  );
}
