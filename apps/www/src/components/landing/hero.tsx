"use client";

import React from "react";

import { Button } from "@acme/ui/button";

import MordranAnimatedButton from "../mordran-animted-button";
import HeroWapper from "./hero-wapper";

export default function Hero() {
  return (
    <>
      <HeroWapper>
        <div>
          <div className="h-full w-full p-6">
            <div className="mt-48 flex flex-col items-center justify-center">
              <div className="flex w-full max-w-7xl flex-col items-center gap-2 md:gap-3">
                <div className=" ">
                  <MordranAnimatedButton />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl md:w-[70%] md:text-4xl lg:text-6xl">
                    Turn Happy{" "}
                    <span className="inline bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text font-semibold tracking-tight text-transparent">
                      Customers
                    </span>{" "}
                    into Powerful Stories
                  </h1>
                </div>
                <div className="max-w-xl text-center text-sm text-zinc-400 sm:text-base lg:text-lg">
                  From happy customers to powerful testimonials in minutes.
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Button size="lg" className="rounded-full">
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="rounded-full border-2 text-zinc-400 dark:border-zinc-700 hover:dark:bg-zinc-800"
                  >
                    <a
                      target="_blank"
                      href="https://github.com/Shashivadan/vouch"
                    >
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroWapper>
    </>
  );
}
