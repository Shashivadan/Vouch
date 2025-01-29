"use server";

import { eq } from "@vouch/db";
import { db } from "@vouch/db/client";

import type {
  OrganizationTestimonialType,
  TestimonialTableType,
} from "~/types/schema-types";

export async function getOrgTestimonials(org: string) {
  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        eq(organizationTable.organizationName, org),
      with: {
        testimonials: {
          where: (testimonialsTable: TestimonialTableType) =>
            eq(testimonialsTable.wallOfFame, true),
        },
      },
    })) as OrganizationTestimonialType[];

    if (data.length === 0) {
      return "Project not found";
    }
    return data[0];
  } catch (error) {
    return (error as Error).message;
  }
}
