import React from "react";
import { redirect } from "next/navigation";

import { db } from "@acme/db/client";

import { getCurrentUser } from "~/utils/get-current-user";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userOrg = await db.query.organizationTable.findMany({
    where: (organizationTable, { eq }) =>
      eq(organizationTable.ownerId, user.id),
  });

  console.log("userOrg", userOrg)

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>{JSON.stringify(userOrg , null , 2)}</pre>
    </div>
  );
}
