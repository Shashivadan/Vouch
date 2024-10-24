"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroWapper({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const imageVariants = {
    initial: { opacity: 0, y: 0 },
    animate: {
      y: [0, 20, 0],
      opacity: 1,
      transition: {
        opacity: { duration: 1 },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div className="relative min-h-[80svh] w-full px-4 sm:px-6">
      {/* Glow effects with adjusted positioning */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="left-1/5 absolute top-1/4 -z-10 h-48 w-48 -translate-x-1/2 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
      >
        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="absolute h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-[100px] sm:blur-[150px] lg:blur-[200px]"
        />
      </motion.div>
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="bottom-1/5 absolute left-1/2 -z-10 h-48 w-48 -translate-x-1/2 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
      >
        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="absolute h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-[100px] sm:blur-[150px] lg:blur-[200px]"
        />
      </motion.div>
      <div className="absolute -z-50 hidden h-full w-full md:block">
        <motion.div
          initial="initial"
          animate="animate"
          variants={imageVariants}
        >
          <Image
            src="/assets/bookmark.png"
            alt="Mordran"
            width={120}
            height={120}
            className="md:absolute md:left-[6rem] md:top-[2rem] lg:left-[7rem] lg:top-[6rem]"
          />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={imageVariants}
        >
          <Image
            src="/assets/lab-dynamic.png"
            alt="Mordran"
            width={120}
            height={120}
            className="md:absolute md:left-[6rem] md:top-[12rem] lg:left-[15rem] lg:top-[30rem]"
          />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={imageVariants}
        >
          <Image
            src="/assets/message.webp"
            alt="Mordran"
            width={120}
            height={120}
            className="md:absolute md:left-[36rem] md:top-[12rem] lg:left-[79rem] lg:top-[6rem]"
          />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={imageVariants}
        >
          <Image
            src="/assets/chart-dynamic-color.png"
            alt="Mordran"
            width={120}
            height={120}
            className="md:absolute md:left-[36rem] md:top-[12rem] lg:left-[70rem] lg:top-[30rem]"
          />
        </motion.div>
      </div>
      <div>{children}</div>
    </div>
  );
}
