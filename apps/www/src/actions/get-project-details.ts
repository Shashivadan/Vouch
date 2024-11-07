import { and } from "@acme/db";
import { db } from "@acme/db/client";

import type { OrganizationTestimonialType } from "~/types";
import { getCurrentUser } from "~/utils/get-current-user";

export const getProjectDetails = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to get project details");
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
