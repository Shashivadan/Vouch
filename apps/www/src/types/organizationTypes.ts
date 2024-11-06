import type { organizationTable, testimonialTable } from "@acme/db/schema";

export interface OrganizationTestimonialType {
  id: string;
  ownerId: string;
  website: string;
  logo: string | null;
  organizationName: string;
  createdAt: Date;
  updatedAt: Date;
  testimonials: TestimonialType[];
}

export type OrganizationType = typeof organizationTable.$inferSelect;

export type TestimonialType = typeof testimonialTable.$inferSelect;
