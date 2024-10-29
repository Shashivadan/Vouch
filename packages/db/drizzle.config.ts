import type { Config } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}

const nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");

export default {
  schema: "./src/schemas",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  out: "./src/migrations",
  casing: "snake_case",
  verbose: true,
  strict: true,
} satisfies Config;
