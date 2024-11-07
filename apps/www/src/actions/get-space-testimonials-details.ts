import { and, eq } from "@acme/db";
import { db } from "@acme/db/client";

import type {
  Eq,
  OrganizationTestimonialType,
  OrganizationType,
  TestimonialTableType,
} from "~/types";
import { getCurrentUser } from "~/utils/get-current-user";

export const getSpaceDetails = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        and(
          eq(organizationTable.organizationName, id),
          eq(organizationTable.ownerId, user.id),
        ),
    })) as OrganizationType[];

    if (data.length === 0) {
      return "Project not found";
    }
    return data[0];
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};

export const getSpaceTestimonialsDetails = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        and(
          eq(organizationTable.organizationName, id),
          eq(organizationTable.ownerId, user.id),
        ),
      with: {
        testimonials: true,
      },
      limit: 2,
    })) as OrganizationTestimonialType[];

    if (data.length === 0) {
      return "Project not found";
    }
    return data[0];
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};

export const getTestimonialsLikedDetails = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }: { eq: Eq }) =>
        and(
          eq(organizationTable.organizationName, id),
          eq(organizationTable.ownerId, user.id),
        ),
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
    return data[0]?.testimonials;
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};

export const getTestimonialsWithTextOnlyDetails = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }: { eq: Eq }) =>
        and(
          eq(organizationTable.organizationName, id),
          eq(organizationTable.ownerId, user.id),
        ),
      with: {
        testimonials: {
          where: (testimonialsTable: TestimonialTableType) =>
            eq(testimonialsTable.type, "text"),
        },
      },
    })) as OrganizationTestimonialType[];

    if (data.length === 0) {
      return "Project not found";
    }
    return data[0]?.testimonials;
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};
