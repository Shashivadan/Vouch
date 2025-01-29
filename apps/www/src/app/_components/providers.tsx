"use client";

import React from "react";

import { ThemeProvider } from "@vouch/ui/theme";
import { Toaster } from "@vouch/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TRPCReactProvider>{children}</TRPCReactProvider>
      <Toaster />
    </ThemeProvider>
  );
}
