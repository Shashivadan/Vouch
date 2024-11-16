"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import { cn } from "@acme/ui";

import type { TestimonialType } from "~/types/schema-types";
import { Marquee } from "./marquee";
import { ReviewCard } from "./review-card";

export default function MarqueeMain({
  testmonials,
  data,
}: {
  testmonials: JSX.Element[][];
  data: TestimonialType[];
}) {
  const searchParams = useSearchParams();
  const noMarquee = searchParams.get("no-marquee");
  const cantainerClassName = searchParams.get("container-classname");
  const darkTheme = searchParams.get("darktheme");

  const { theme, setTheme } = useTheme();

  // http://localhost:3001/m/zenstream?classname=df%20sdf&theme=dark&marquee=%22true%22

  React.useEffect(() => {
    if (darkTheme) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme, setTheme, darkTheme]);

  if (noMarquee) {
    return (
      <>
        <div className="h-svh w-full columns-[450px] gap-4">
          {data.map((item) => (
            <ReviewCard
              key={item.id}
              data={item}
              className="mb-4 break-inside-avoid"
            />
          ))}
          {data.map((item) => (
            <ReviewCard
              key={item.id}
              data={item}
              className="mb-4 break-inside-avoid"
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "h-svh columns-[350px] overflow-hidden",
        cantainerClassName,
      )}
    >
      {testmonials.map((columnData, columnIndex) => (
        <Marquee
          key={`marquee-${columnIndex}`}
          vertical
          reverse={columnIndex % 2 === 1}
          className="overflow-hidden [--duration:80s]"
        >
          {columnData}
        </Marquee>
      ))}
    </div>
  );
}
