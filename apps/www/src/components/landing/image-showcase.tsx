import React from "react";
import Image from "next/image";

export const ImageShowcase = () => {
  return (
    <div className="relative mb-40 md:mb-24">
      <div className="flex items-center justify-center">
        <div className="absolute top-0 -z-10 h-full w-96 rounded-3xl bg-primary/50 blur-xl md:w-11/12"></div>
        <Image
          src="/assets/dark-img.png"
          width={22}
          height={33}
          className="aspect-video w-96 rounded-2xl border-2 border-primary-foreground/20 md:w-11/12"
          alt="show-case"
        />
      </div>
    </div>
  );
};
