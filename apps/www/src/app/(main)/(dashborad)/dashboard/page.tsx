import React from "react";
import { redirect } from "next/navigation";
import { FolderKanban, FolderPlus } from "lucide-react";

import { db } from "@vouch/db/client";
import { Card } from "@vouch/ui/card";

import { CreateSpaces } from "~/components/products/create-spaces";
import { ProjectsCard } from "~/components/project-card";
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

  return (
    <div className="p-3">
      <div className="m-auto p-6 md:w-5/6 md:px-12">
        <h1 className="text-2xl font-semibold md:mt-12 md:text-2xl">
          Overview
        </h1>
        <div className={"items-center gap-4 md:flex"}>
          <Card className="mt-6 rounded-xl p-4 shadow-md dark:bg-zinc-900/50 md:min-w-[300px]">
            <div className={"flex items-center justify-between"}>
              <h1 className={"text-xl font-semibold"}>Projects</h1>
              <FolderKanban />
            </div>
            <div className="mt-2 text-xl font-bold md:mt-5">
              {userOrg.length}
            </div>
          </Card>
        </div>
        <div className={"mt-6 flex items-center justify-between"}>
          <h1 className={"text-2xl font-semibold md:text-2xl"}>Spaces</h1>
          {userOrg.length > 0 && <CreateSpaces />}
        </div>
        <div>
          {userOrg.length === 0 ? (
            <>
              {" "}
              <div className={"flex flex-col items-center gap-6 p-6"}>
                <FolderPlus size={64} />
                <h2 className={"text-2xl font-medium"}>Create Spaces</h2>
                <p
                  className={"text-md text-center font-normal text-opacity-35"}
                >
                  Start your journey by gathering valuable feedback from your
                  community.
                </p>
                <CreateSpaces />
              </div>
            </>
          ) : (
            <div className={"flex-wrap gap-4 md:flex"}>
              {userOrg.map((project) => (
                <ProjectsCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
