"use server";

import type { z } from "zod";
import { revalidatePath } from "next/cache";

import { and, eq } from "@acme/db";
import { db } from "@acme/db/client";
import { organizationTable } from "@acme/db/schema";

import type { editFormSchema } from "~/components/edit-space";
import { getCurrentUser } from "~/utils/get-current-user";

export async function editSpace(
  values: z.infer<typeof editFormSchema>,
  id: string,
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to create a project");
  }

  try {
    if (values.organizationName)
      throw new Error("organization name already exists");

    const result = await db
      .update(organizationTable)
      .set({ website: values.websiteUrl, logo: values.logoUrl })
      .where(
        and(
          eq(organizationTable.ownerId, user.id),
          eq(organizationTable.id, id),
        ),
      )
      .returning();

    revalidatePath(`/products/${values.organizationName}`);

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
