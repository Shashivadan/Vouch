import React from "react";
import { redirect } from "next/navigation";
import {  FolderKanban, Plus } from "lucide-react";

import { db } from "@acme/db/client";
import { Button } from "@acme/ui/button";
import { Card } from "@acme/ui/card";
import { ProjectsCard } from "~/components/project-card";

import { CreateSpaces } from "~/components/create-spaces";
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
          <Button>
            {" "}
            <Plus size={20} className="mr-2" /> Create Space
          </Button>
        </div>
        <div>
          {userOrg.length === 0 ? (
            <CreateSpaces />
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
