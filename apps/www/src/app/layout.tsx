import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";

import { cn } from "@vouch/ui";

import "~/styles/globals.css";

import { env } from "~/env";
import { siteConfig } from "~/utils/site";
import Providers from "./_components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://vouch.lab-x.xyz"
      : "http://localhost:3000",
  ),
  keywords: [
    "vouch",
    "testimonials",
    "feedback",
    "review",
    "customer",
    "customer testimonials",
    "customer feedback",
    "customer reviews",
  ],
  authors: [{ name: "Shashi Vadan", url: "https://github.com/shashivadan" }],
  title: siteConfig.title,
  icons: "/icons/icon.png",
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shashivadan99",
    creator: "@shashivadan99",
    title: "Vouch",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <NextTopLoader color="#9333ea" height={2} />
        <Providers>
          <main className="">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
