import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { organizationTable } from "./organization";

export const typeEnum = pgEnum("type", ["text", "video"]);

export const testimonialTable = pgTable("testimonial", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organizationTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  authorName: text("authorName").notNull(),
  authorEmail: text("authorEmail").notNull(),
  wallOfFame: boolean("wallOfFame").notNull().default(false),
  message: text("message").notNull(),
  profileImages: text("images"),
  reviewImages: text("reviewImages"),
  type: typeEnum()
    .$defaultFn(() => "text")
    .notNull(),
  liked: boolean("liked").notNull().default(false),
  rating: integer("rating").notNull().default(5),
});

// relations one to many
export const testimonialRelations = relations(testimonialTable, ({ one }) => ({
  organization: one(organizationTable, {
    fields: [testimonialTable.organizationId],
    references: [organizationTable.id],
  }),
}));

// relations many to one
export const OrganizationTestimonialRelations = relations(
  organizationTable,
  ({ many }) => ({
    testimonials: many(testimonialTable),
  }),
);
