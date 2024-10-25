import path from "node:path";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

import * as schema from "./schema";

const client = new pg.Client({
  connectionString: process.env.POSTGRES_URL,
});

await client.connect();

const main = async () => {
  try {
    const db = drizzle(client, {
      schema,
    });

    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), "src/migrations"),
    });
    console.log("🎉 Database migration successfully!");
  } catch (error) {
    console.error("❌ Database migration failed:\n", error);
  } finally {
    await client.end();
  }
};

await main();
