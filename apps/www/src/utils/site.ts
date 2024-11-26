import { env } from "~/env";

export const siteConfig = {
  name: "Vouch",
  url:
    env.VERCEL_ENV === "production"
      ? "https://vouch.lab-x.xyz"
      : "http://localhost:3000",
  ogImage: "https://vouch.lab-x.xyz/og.jpg",
  title: "Vouch",
  description:
    "Vouch is a zero-code platform that transforms the way businesses collect and showcase customer testimonials.",
  links: {
    twitter: "https://twitter.com/shashivadan99",
    github: "https://github.com/shashivadan/vouch",
  },
};

export type SiteConfig = typeof siteConfig;
