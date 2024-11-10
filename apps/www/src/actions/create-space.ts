"use server";

import type { z } from "zod";
import { revalidatePath } from "next/cache";

import { and, or } from "@acme/db";
import { db } from "@acme/db/client";
import { organizationTable, questionTable } from "@acme/db/schema";

import type { formSchema } from "~/components/products/create-spaces";
import { getCurrentUser } from "~/utils/get-current-user";

export async function createProject(values: z.infer<typeof formSchema>) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be logged in to create a project");
  }

  try {
    const uniqueOrganizationName = await db.query.organizationTable.findMany({
      where: (organizationTable, { eq }) =>
        or(
          and(
            eq(organizationTable.organizationName, values.organizationName),
            eq(organizationTable.ownerId, user.id),
          ),
          eq(organizationTable.website, values.websiteUrl),
        ),
    });

    if (uniqueOrganizationName.length > 0) {
      throw new Error(
        "Organization Name already exists or website already exists",
      );
    }

    const result = await db
      .insert(organizationTable)
      .values({
        ownerId: user.id,
        website: values.websiteUrl,
        logo: values.logoUrl,
        organizationName: values.organizationName,
        headerTitle: values.headerTitle,
        customMessage: values.customMessage,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ orgId: organizationTable.id });

    if (!result[0]?.orgId) {
      return;
    }
    const orgId = result[0].orgId;

    if (!values.questions) {
      revalidatePath("/dashboard");
      return;
    }
    const question: string[] = values.questions.map((q) => {
      if (q) return q.question;
      else return "";
    });

    await db.insert(questionTable).values(
      question.map((q) => ({
        question: q,
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: orgId,
      })),
    );

    revalidatePath("/dashboard");
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
