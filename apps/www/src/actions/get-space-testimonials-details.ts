import { revalidatePath } from "next/cache";

import { and, desc, eq } from "@vouch/db";
import { db } from "@vouch/db/client";
import { organizationTable, testimonialTable } from "@vouch/db/schema";

import type {
  Eq,
  OrganizationQuestionsType,
  OrganizationTestimonialType,
  OrganizationType,
  QuestionTableType,
  TestimonialTableType,
} from "~/types";
import { getCurrentUser } from "~/utils/get-current-user";

export const getSpaceDetails = async (orgName: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        and(
          eq(organizationTable.organizationName, orgName),
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

export const getSpaceTestimonialsDetails = async (orgName: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        and(
          eq(organizationTable.organizationName, orgName),
          eq(organizationTable.ownerId, user.id),
        ),
      with: {
        testimonials: {
          orderBy: (testimonials: TestimonialTableType) => [
            desc(testimonials.createdAt),
          ],
        },
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

export const getTestimonialsLikedDetails = async (orgName: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }: { eq: Eq }) =>
        and(
          eq(organizationTable.organizationName, orgName),
          eq(organizationTable.ownerId, user.id),
        ),
      with: {
        testimonials: {
          where: (testimonialsTable: TestimonialTableType) =>
            eq(testimonialsTable.wallOfFame, true),

          orderBy: (testimonials: TestimonialTableType) => [
            desc(testimonials.createdAt),
          ],
        },
      },
    })) as OrganizationTestimonialType[];

    if (data.length === 0) {
      return "Project not found";
    }
    return {
      testimonials: data[0]?.testimonials,
    };
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};

export const getTestimonialsWithTextOnlyDetails = async (orgName: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }: { eq: Eq }) =>
        and(
          eq(organizationTable.organizationName, orgName),
          eq(organizationTable.ownerId, user.id),
        ),
      with: {
        testimonials: {
          where: (testimonialsTable: TestimonialTableType) =>
            eq(testimonialsTable.type, "text"),
          orderBy: (testimonials: TestimonialTableType) => [
            desc(testimonials.createdAt),
          ],
        },
      },
    })) as OrganizationTestimonialType[];

    if (data.length === 0) {
      return "Project not found";
    }
    return {
      testimonials: data[0]?.testimonials,
    };
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};

export const getSingleTestimonialDetails = async (id: string) => {
  try {
    const testimonialWithOrg = await db
      .select({
        testimonial: testimonialTable,
        orgName: organizationTable.organizationName,
        orgLogo: organizationTable.logo,
      })
      .from(testimonialTable)
      .innerJoin(
        organizationTable,
        eq(testimonialTable.organizationId, organizationTable.id),
      )
      .where(eq(testimonialTable.id, id))
      .limit(1);

    if (testimonialWithOrg.length === 0)
      throw new Error("Testimonial not found");

    return testimonialWithOrg[0];
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};

export const getTestimonialsWithArchivedDetails = async (orgName: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get space details");
  }

  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        and(
          eq(organizationTable.organizationName, orgName),
          eq(organizationTable.ownerId, user.id),
        ),
      with: {
        testimonials: {
          where: (testimonialsTable: TestimonialTableType) =>
            eq(testimonialsTable.archive, true),
          orderBy: (testimonials: TestimonialTableType) => [
            desc(testimonials.createdAt),
          ],
        },
      },
    })) as OrganizationTestimonialType[];

    if (data.length === 0) {
      return "Project not found";
    }
    return {
      testimonials: data[0]?.testimonials,
    };
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};

export const getTestimonialsWithWallOfFameDetails = async (OrgName: string) => {
  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }: { eq: Eq }) =>
        eq(organizationTable.organizationName, OrgName),

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
    revalidatePath(`/${OrgName}`);
    return data[0];
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
};

export const getSpaceDetailsPublic = async (orgName: string) => {
  try {
    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        eq(organizationTable.organizationName, orgName),
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

export const getQuestionsDetails = async (id: string) => {
  try {
    const data = await db.query.questionTable.findMany({
      where: (questionTable, { eq }) => eq(questionTable.organizationId, id),
    });

    if (data.length === 0) {
      return "Project not found";
    }
    return data;
  } catch (error) {
    return (error as Error).message;
  }
};

export const getOrganizationQuestionDetails = async (orgName: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("You must be logged in to get space details");
    }

    const data = (await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        and(
          eq(organizationTable.organizationName, orgName),
          eq(organizationTable.ownerId, user.id),
        ),

      with: {
        questions: {
          where: (questionTable: QuestionTableType) =>
            eq(questionTable.id, organizationTable.id),
        },
      },
    })) as OrganizationQuestionsType[];

    if (data.length === 0) {
      return "Project not found";
    }
    return data[0];
  } catch (error) {
    return (error as Error).message;
  }
};
