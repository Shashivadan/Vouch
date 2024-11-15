"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const content = [
  {
    name: "404 Not Found",
    height: 100,
    width: 100,
    background: "#EF626C",
    rotate: 180,
  },
];

export default function NotFound() {
  const [index] = useState(0);
  const activeContent = content[index];

  const textVariants = {
    enter: { x: "-100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center">
      <div className="flex h-[600px] w-full flex-col items-center gap-20">
        <div className="flex flex-col items-center">
          <div className="flex gap-5">
            <motion.div
              animate={{
                height: activeContent?.height,
                width: activeContent?.width,
              }}
              className="rounded-full bg-primary transition duration-300"
            />
            <motion.div
              animate={{
                height: activeContent?.height,
                width: activeContent?.width,
              }}
              className="rounded-full bg-primary transition duration-300"
            />
          </div>
          <div className="mt-10">
            <Icon rotate={activeContent?.rotate ?? 180} />
          </div>
        </div>
        <motion.h2
          key={index}
          initial="enter"
          animate="center"
          exit="exit"
          variants={textVariants}
          transition={{ duration: 0 }}
          className="text-center text-xl font-bold transition delay-300 duration-300 md:text-7xl"
        >
          {activeContent?.name}
        </motion.h2>
      </div>
    </div>
  );
}

function Icon({ rotate }: { rotate: number }) {
  return (
    <motion.svg
      width="89"
      height="27"
      viewBox="0 0 89 27"
      fill="none"
      animate={{ rotate }}
      transition={{ duration: 0.3 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M88.6062 5.75162C83.2588 12.2265 76.5801 17.4742 69.024 21.1381C61.468 24.8021 53.2116 26.7962 44.8162 26.9852C36.4208 27.1741 28.0832 25.5534 20.3699 22.2331C12.6566 18.9129 5.74863 13.9709 0.115372 7.74314L6.26321 2.18218C11.0982 7.52742 17.0273 11.7691 23.6476 14.6188C30.2678 17.4686 37.424 18.8597 44.6297 18.6975C51.8354 18.5354 58.9218 16.8237 65.4071 13.679C71.8925 10.5343 77.6248 6.03022 82.2144 0.472867L88.6062 5.75162Z"
        fill="#FFD700"
        className="!fill-primary-foreground"
      />
    </motion.svg>
  );
}
