import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organizationTable } from "./organization";

export const questionTable = pgTable("questions", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  question: text("question").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organizationTable.id, { onDelete: "cascade" }),
});

export const questionRelations = relations(questionTable, ({ one }) => ({
  organization: one(organizationTable, {
    fields: [questionTable.organizationId],
    references: [organizationTable.id],
  }),
}));

export const OrganizationQuestionRelations = relations(
  organizationTable,
  ({ many }) => ({
    questions: many(questionTable),
  }),
);
