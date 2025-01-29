import type { organizationTable, testimonialTable } from "@vouch/db/schema";

export interface OrganizationTestimonialType {
  id: string;
  ownerId: string;
  website: string;
  logo: string | null;
  organizationName: string;
  createdAt: Date;
  updatedAt: Date;
  headerTitle: string;
  customMessage: string;
  testimonials: TestimonialType[];
}

export type OrganizationType = typeof organizationTable.$inferSelect;

export type TestimonialType = typeof testimonialTable.$inferSelect;

export type TestimonialTableType = typeof testimonialTable;
