import type { NextRequest } from "next/server";
import type { z } from "zod";
import { NextResponse } from "next/server";

import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import { testimonialTable } from "@acme/db/schema";

import type { testimonialFormSchema } from "~/components/testimonial/create-testimonial-form";

export async function POST(
  req: NextRequest,
  { params }: { params: { orgName: string } },
) {
  const { orgName } = params;
  const data: z.infer<typeof testimonialFormSchema> =
    (await req.json()) as z.infer<typeof testimonialFormSchema>;

  try {
    if (!data.message || data.rating || !data.authorEmail || !data.authorName) {
      return NextResponse.json({
        message:
          "you need to povided the messag , rating , authorEmail , your-name",
      });
    }

    const result = await db.transaction(async (tx) => {
      const orgId = await tx.query.organizationTable.findFirst({
        where: (organizationTable) =>
          eq(organizationTable.organizationName, orgName),
      });

      if (!orgId) {
        return NextResponse.json(
          { message: "organization Not Fount" },
          { status: 404 },
        );
      }
      return tx
        .insert(testimonialTable)
        .values({
          organizationId: orgId.id,
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
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
