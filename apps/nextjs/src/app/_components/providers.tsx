"use client";

import React from "react";

import { ThemeProvider } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TRPCReactProvider>{children}</TRPCReactProvider>

      <Toaster />
    </ThemeProvider>
  );
}
