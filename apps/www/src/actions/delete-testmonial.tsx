"use server";

import { revalidatePath } from "next/cache";

import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { organizationTable, testimonialTable } from "@acme/db/schema";

import { getCurrentUser } from "~/utils/get-current-user";

export async function deleteTestmonial(id: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized: You must be logged in");
  }

  try {
    const testimonialWithOrg = await db
      .select({
        testimonialId: testimonialTable.id,
        organizationId: testimonialTable.organizationId,
        ownerId: organizationTable.ownerId,
        orgName: organizationTable.organizationName,
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

    if (testimonialWithOrg[0]?.ownerId !== user.id)
      throw new Error(
        "Unauthorized: You are not the owner of this testimonial",
      );

    await db.delete(testimonialTable).where(eq(testimonialTable.id, id));

    revalidatePath(`/products/${testimonialWithOrg[0]?.orgName}/**`);

    return testimonialWithOrg[0];
  } catch (error) {
    return (error as Error).message;
  }
}
