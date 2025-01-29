"use server";

import type { z } from "zod";
import { revalidatePath } from "next/cache";

import { and, eq } from "@vouch/db";
import { db } from "@vouch/db/client";
import { organizationTable, testimonialTable } from "@vouch/db/schema";

import type { testimonialEditFormSchema } from "~/components/testimonial/edit-testimonial";
import { getCurrentUser } from "~/utils/get-current-user";

export const editTestimonial = async (
  data: z.infer<typeof testimonialEditFormSchema>,
  testimonialId: string,
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
      .update(testimonialTable)
      .set({
        profileImages:
          data.profileImages === "" || !data.profileImages?.startsWith("https")
            ? `https://robohash.org/${data.authorEmail}`
            : data.profileImages,
        authorEmail: data.authorEmail,
        reviewImages: data.reviewImages ?? "",
        message: data.message,
        rating: data.rating,
        authorName: data.authorName,
      })
      .where(
        and(
          eq(testimonialTable.organizationId, orgId),
          eq(testimonialTable.id, testimonialId),
        ),
      );

    revalidatePath(`/products/${orgData[0]?.orgName}/**`);

    return result;
  } catch (error) {
    return (error as Error).message;
  }
};
