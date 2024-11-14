"use server";

import type { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@acme/db/client";
import { testimonialTable } from "@acme/db/schema";

import type { testimonialFormSchema } from "~/components/testimonial/create-testimonial-form";
import type { OrganizationType } from "~/types";

export const createRequestTestimonial = async (
  data: z.infer<typeof testimonialFormSchema>,
  orgData: OrganizationType,
) => {
  try {
    const result = await db
      .insert(testimonialTable)
      .values({
        organizationId: orgData.id,
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

    revalidatePath(`/products/${orgData.organizationName}/**`);

    return result;
  } catch (error) {
    return (error as Error).message;
  }
};
