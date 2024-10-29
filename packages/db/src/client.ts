import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schemas/index";

const client = new pg.Client({
  connectionString: process.env.POSTGRES_URL,
});

client
  .connect()
  .then()
  .catch((error) => {
    console.error("Failed to connect to database", error);
  });

export const db = drizzle(client, { schema });
