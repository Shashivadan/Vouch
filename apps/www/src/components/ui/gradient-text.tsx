import type { ReactNode } from "react";

import { cn } from "@acme/ui";

export default ({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) => {
  return (
    <p
      className={cn(
        "bg-gradient-to-br from-sky-400 via-violet-500 to-orange-400 bg-clip-text text-xl font-medium tracking-tighter text-transparent",
        className,
      )}
    >
      {children}
    </p>
  );
};
