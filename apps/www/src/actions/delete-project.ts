"use server";

import { revalidatePath } from "next/cache";

import { and, eq } from "@vouch/db";
import { db } from "@vouch/db/client";
import { organizationTable } from "@vouch/db/schema";

import { getCurrentUser } from "~/utils/get-current-user";

export async function deleteProject(projectId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return "You must be logged in to delete a project";
  }
  try {
    const result = await db
      .delete(organizationTable)
      .where(
        and(
          eq(organizationTable.id, projectId),
          eq(organizationTable.ownerId, user.id),
        ),
      )
      .returning();
    revalidatePath("/dashboard");
    return result;
  } catch (error) {
    return (error as Error).message;
  }
}
