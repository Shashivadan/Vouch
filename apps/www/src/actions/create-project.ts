"use server";

import type { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@acme/db/client";
import { organizationTable } from "@acme/db/schema";

import type { formSchema } from "~/components/create-spaces";
import { getCurrentUser } from "~/utils/get-current-user";

export async function createProject(values: z.infer<typeof formSchema>) {
  const user = await getCurrentUser();

  if (!user) {
    return "You must be logged in to create a project";
  }

  try {
    const result = await db
      .insert(organizationTable)
      .values({
        ownerId: user.id,
        website: values.websiteUrl,
        logo: values.logoUrl,
        organizationName: values.organizationName,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    revalidatePath("/dashboard");
    return result;
  } catch (error) {
    return (error as Error).message;
  }
}
