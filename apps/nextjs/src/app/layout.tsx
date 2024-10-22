import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";



import { cn } from "@acme/ui";
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";



import { TRPCReactProvider } from "~/trpc/react";



import "~/styles/globals.css";



import { env } from "~/env";


export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://vouch.lab-x.xyz"
      : "http://localhost:3000",
  ),
  title: "Vouch",
  icons: "/icons/icon.png",
  description:
    "Vouch is a zero-code platform that transforms the way businesses collect and showcase customer testimonials.",
  openGraph: {
    title: "Vouch",
    description:
      "Vouch is a zero-code platform that transforms the way businesses collect and showcase customer testimonials.",
    url: "https://vouch.lab-x.xyz",
    type: "website",
    siteName: "Vouch",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shashivadan99",
    creator: "@shashivadan99",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}