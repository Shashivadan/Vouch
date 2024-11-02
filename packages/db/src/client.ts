import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schemas/index";


type DrizzleClient = ReturnType<typeof createDrizzleClient>;

const createDrizzleClient = () => {
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL,
  });

  client
    .connect()
    .then()
    .catch((error) => {
      console.error("Failed to connect to database", error);
    });

  return drizzle(client, { schema });
};


declare global {
  // eslint-disable-next-line no-var
  var drizzleGlobal: DrizzleClient | undefined;
}

const db = global.drizzleGlobal ?? createDrizzleClient();

if (process.env.NODE_ENV !== "production") {
  global.drizzleGlobal = db;
}

export { db };


export type DbClient = typeof db;
