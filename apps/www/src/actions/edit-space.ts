"use server";

import { revalidatePath } from "next/cache";

import { and, eq } from "@acme/db";
import { db } from "@acme/db/client";
import { organizationTable, questionTable } from "@acme/db/schema";

import { getCurrentUser } from "~/utils/get-current-user";

interface newData {
  questions:
    | {
        question: string | undefined;
        id: string | undefined;
      }[]
    | undefined;
  websiteUrl: string;
  organizationName: string;
  headerTitle: string;
  customMessage: string;
  logoUrl?: string | undefined;
}

export async function editSpace(values: newData, id: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to create a project");
  }

  try {
    const result = await db
      .update(organizationTable)
      .set({
        website: values.websiteUrl,
        logo: values.logoUrl,
        headerTitle: values.headerTitle,
        customMessage: values.customMessage,
      })
      .where(
        and(
          eq(organizationTable.ownerId, user.id),
          eq(organizationTable.id, id),
        ),
      )
      .returning();

    if (result.length === 0 || !result[0]) {
      throw new Error("update failed");
    }

    if (!values.questions) {
      throw new Error("Questions are not updated");
    }

    for (const question of values.questions) {
      if (question.id) {
        await db
          .update(questionTable)
          .set({
            question: question.question,
          })
          .where(eq(questionTable.id, question.id));
      }
    }
    revalidatePath(`/products/${values.organizationName}/**`);

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
