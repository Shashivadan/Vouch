"use server";

import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { organizationTable } from "@acme/db/schema";
import { revalidatePath } from "next/cache";

export async function deleteProject(projectId: string, ownerId: string) {
  console.log(projectId, ownerId);
  try {
    const result = await db
      .delete(organizationTable)
      .where(eq(organizationTable.id, projectId))
      .returning();
      revalidatePath("/dashboard");
    return result;
  } catch (error) {
    return (error as Error).message;
  }
}
