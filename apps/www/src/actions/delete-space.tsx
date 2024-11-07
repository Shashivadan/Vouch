"use server";

import { and, eq } from "@acme/db";
import { db } from "@acme/db/client";
import { organizationTable } from "@acme/db/schema";

import { getCurrentUser } from "~/utils/get-current-user";

export const deleteSpace = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to create a project");
  }

  try {
    await db
      .delete(organizationTable)
      .where(
        and(
          eq(organizationTable.ownerId, user.id),
          eq(organizationTable.id, id),
        ),
      )
      .returning();

    return true;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
