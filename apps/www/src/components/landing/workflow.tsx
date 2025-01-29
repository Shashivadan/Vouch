import React from "react";
import Image from "next/image";

import { cn } from "@vouch/ui/index";

export default function Workflow() {
  const cards = [
    {
      title: "Quick Collection Forms",
      description:
        "Create beautiful, branded collection forms in minutes. Customize questions, add your logo, and choose between video or text testimonials - no coding required.",
      image: "/landing/card-img/workflow-01.png",
    },
    {
      title: "Smart Automation",
      description:
        "Set up automated email campaigns to request testimonials from happy customers. Schedule follow-ups and thank-you messages to maximize response rates.",
      image: "/landing/card-img/workflow-02.png",
    },
    {
      title: "Easy Embedding",
      description:
        "Display testimonials anywhere with one click. Embed on your website, landing pages, or share directly on social media with responsive, customizable layouts.",
      image: "/landing/card-img/workflow-03.png",
    },
  ];
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Tailored Workflows
              </span>
            </div>
            <h2 className="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.700),theme(colors.indigo.600),theme(colors.gray.800),theme(colors.indigo.700),theme(colors.gray.700))] bg-[length:200%_auto] bg-clip-text text-3xl font-semibold text-transparent dark:bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] md:text-4xl">
              Map your product journey
            </h2>
            <p className="text-xs text-gray-600 dark:text-indigo-200/65 md:text-lg">
              Simple and elegant interface to start collaborating with your team
              in minutes. It seamlessly integrates with your code and your
              favorite programming languages.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <div
                key={index}
                className={cn(
                  "group max-w-sm rounded-2xl border p-6",
                  "border-zinc-200 dark:border-white/10",
                  "shadow-sm dark:shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]",
                  "group transform-gpu transition-transform hover:scale-[1.01]",
                  "bg-white dark:bg-zinc-950",
                )}
              >
                <Image
                  src={card.image}
                  alt=""
                  height={400}
                  width={400}
                  className="brightness-90 contrast-125 filter transition-all duration-300 hover:brightness-100"
                />
                <h6 className="mb-2 origin-left transform-gpu text-xl font-semibold tracking-tighter text-gray-800 transition-all group-hover:scale-90 dark:text-gray-300">
                  {card.title}
                </h6>
                <p className="text-sm tracking-tight text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
