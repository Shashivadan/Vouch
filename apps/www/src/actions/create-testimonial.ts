"use server";

import type { z } from "zod";
import { revalidatePath } from "next/cache";

import { eq } from "@vouch/db";
import { db } from "@vouch/db/client";
import { organizationTable, testimonialTable } from "@vouch/db/schema";

import type { testimonialFormSchema } from "~/components/testimonial/create-testimonial-form";
import { getCurrentUser } from "~/utils/get-current-user";

export const createTestimonial = async (
  data: z.infer<typeof testimonialFormSchema>,
  orgId: string,
) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: You must be logged in");
  }
  try {
    const orgData = await db
      .select({
        orgName: organizationTable.organizationName,
      })
      .from(organizationTable)
      .where(eq(organizationTable.id, orgId));

    const result = await db
      .insert(testimonialTable)
      .values({
        organizationId: orgId,
        authorName: data.authorName,
        profileImages:
          data.profileImages === ""
            ? `https://robohash.org/${data.authorEmail}`
            : data.profileImages,
        authorEmail: data.authorEmail,
        message: data.message,
        rating: data.rating,
        reviewImages: data.reviewImages,
      })
      .returning();

    revalidatePath(`/products/${orgData[0]?.orgName}/**`);

    return result;
  } catch (error) {
    return (error as Error).message;
  }
};
