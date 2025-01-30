import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { and, desc } from "@vouch/db";
import { db } from "@vouch/db/client";

export const GET = async (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    const result = await db.query.testimonialTable.findMany({
      where: (testimonialTable, { eq }) =>
        and(
          eq(testimonialTable.wallOfFame, true),
          eq(testimonialTable.organizationId, key),
        ),
      orderBy: (testimonialTable) => [desc(testimonialTable.createdAt)],
      columns: {
        id: true,
        createdAt: true,
        authorName: true,
        authorEmail: true,
        wallOfFame: true,
        message: true,
        profileImages: true,
        reviewImages: true,
        type: true,
        rating: true,
      },
    });

    return NextResponse.json({
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
};
