"use client";

import * as React from "react";
import { ThemeProvider, useTheme } from "next-themes";

import { cn } from "@acme/ui";

function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-neutral-500/10 bg-white px-2 py-1 font-medium tracking-tight text-neutral-600"
        type="button"
      >
        <span className="relative size-6 scale-75 rounded-full" />
      </button>
    );
  }

  return (
    <button
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-zinc-500/10  px-2 py-1 font-medium tracking-tight text-neutral-600 hover:bg-neutral-100  dark:text-neutral-300 dark:hover:bg-neutral-700"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
            "absolute right-0 top-0 z-20 size-4 origin-top-right transform-gpu rounded-full bg-white transition-transform duration-500 group-hover:bg-neutral-100 dark:bg-zinc-950 group-hover:dark:bg-neutral-700",
            theme === "dark" ? "scale-100" : "scale-0",
          )}
        />
      </span>
    </button>
  );
}

export { ThemeProvider, ThemeToggle };
