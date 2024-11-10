import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schemas/index";

console.log("dsf");

const client = new pg.Client({
  connectionString: process.env.POSTGRES_URL,
});
const main = async () => {
  try {
    await client.connect();

    const db = drizzle(client, {
      schema,
    });

    const orgName = "v21lf9dajs4lxn6zcsd3app5";

    //TODO : please  login to get an id run ""npm run stuido" and get the form users table
    // const userId = "before seeding please login to get an id";

    // const organizationsdata: (typeof schema.organizationTable.$inferInsert)[] =
    //   [];

    // for (let i = 0; i < 10; i++) {
    //   organizationsdata.push({
    //     organizationName: faker.company.name(),
    //     website: faker.internet.url(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     ownerId: userId,
    //     id: orgName,
    //   });
    // }

    const testimonialsData: (typeof schema.testimonialTable.$inferInsert)[] =
      [];

    for (let i = 0; i < 10; i++) {
      testimonialsData.push({
        archive: faker.datatype.boolean(),
        organizationId: orgName,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorName: faker.internet.username(),
        authorEmail: faker.internet.email(),
        wallOfFame: faker.datatype.boolean(),
        message: faker.lorem.paragraph(),
        profileImages: faker.helpers.arrayElement([
          "https://loremflickr.com/200/200?random=1",
          "https://loremflickr.com/200/200?random=2",
          "https://loremflickr.com/200/200?random=3",
        ]),
        type: faker.helpers.arrayElement(["text"]),
        rating: faker.number.int({ min: 1, max: 5 }),
        reviewImages: faker.helpers.arrayElement([
          "https://loremflickr.com/200/200?random=1",
          "https://loremflickr.com/200/200?random=2",
          "https://loremflickr.com/200/200?random=3",
        ]),
      });
    }

    await db.insert(schema.testimonialTable).values(testimonialsData);

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Database migration failed:\n", error);
  } finally {
    await client.end();
  }
};

await main();
