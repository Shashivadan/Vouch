import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./index";

export const organizationTable = pgTable("organization", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  website: text("website").notNull().unique(),
  logo: text("logo"),
  headerTitle: text("headerTitle").notNull(),
  customMessage: text("customMessage").notNull(),
  organizationName: text("organization").notNull().unique(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const organizationRelations = relations(
  organizationTable,
  ({ one }) => ({
    users: one(users, {
      fields: [organizationTable.ownerId],
      references: [users.id],
    }),
  }),
);

export const usersOrganizationRelations = relations(users, ({ many }) => ({
  organizations: many(organizationTable),
}));
