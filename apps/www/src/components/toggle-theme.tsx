"use client";

import React from "react";
import { cn } from "@acme/ui";





export const ToggleTheme = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  return (
    <button
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-neutral-500/10 bg-white px-2 py-1 font-medium tracking-tight text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      type="button"
    >
      <span
        className={cn(
          "relative size-6 scale-75 rounded-full bg-gradient-to-tr",
        )}
      >
        <span
          className={cn(
            "transition-color absolute left-0 top-0 z-10 h-full w-full transform-gpu rounded-full bg-gradient-to-tr from-indigo-400 to-sky-200 duration-500",
            theme === "dark" ? "scale-100" : "scale-90",
          )}
        />
        <span
          className={cn(
            "transition-color absolute left-0 top-0 z-10 h-full w-full transform-gpu rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 duration-500 dark:from-rose-600 dark:to-amber-600",
            theme === "light" ? "opacity-100" : "opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute right-0 top-0 z-20 size-4 origin-top-right transform-gpu rounded-full bg-white transition-transform duration-500 group-hover:bg-neutral-100 dark:bg-neutral-800 group-hover:dark:bg-neutral-700",
            theme === "dark" ? "scale-100" : "scale-0",
          )}
        />
      </span>
     
    </button>
  );
};