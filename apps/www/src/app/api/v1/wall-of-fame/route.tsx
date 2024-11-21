import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { and } from "@acme/db";
import { db } from "@acme/db/client";

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
