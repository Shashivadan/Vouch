import type {
  organizationTable,
  questionTable,
  testimonialTable,
} from "@vouch/db/schema";

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

export interface OrganizationQuestionsType {
  id: string;
  ownerId: string;
  website: string;
  logo: string | null;
  organizationName: string;
  createdAt: Date;
  updatedAt: Date;
  headerTitle: string;
  customMessage: string;
  questions: QuestionType[];
}

export type QuestionType = typeof questionTable.$inferSelect;
export type QuestionTableType = typeof questionTable;

export type OrganizationType = typeof organizationTable.$inferSelect;

export type TestimonialType = typeof testimonialTable.$inferSelect;

export type TestimonialTableType = typeof testimonialTable;
