"use server";

import type { z } from "zod";

import { db } from "@acme/db/client";
import { testimonialTable } from "@acme/db/schema";

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

    return result;
  } catch (error) {
    return (error as Error).message;
  }
};
