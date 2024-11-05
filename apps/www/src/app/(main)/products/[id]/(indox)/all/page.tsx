import React from "react";

import { and } from "@acme/db";
import { db } from "@acme/db/client";

import NotFound from "~/components/404-not-found";
import { getCurrentUser } from "~/utils/get-current-user";

export const dynamic = "force-dynamic";

export default async function page({ params }: { params: { id: string } }) {
  const id: string = params.id;
  const user = await getCurrentUser();

  if (!user || !id) {
    return <NotFound />;
  }

  const testimonials = await db.query.organizationTable.findMany({
    where: (organizationTable, { eq }) =>
      and(
        eq(organizationTable.organizationName, id),
        eq(organizationTable.ownerId, user.id),
      ),
    with: {
      testimonials: true,
    },
  });

  if (testimonials.length === 0) {
    return <NotFound />;
  }

  return <div className="">{JSON.stringify(testimonials, null, 2)}</div>;
}
