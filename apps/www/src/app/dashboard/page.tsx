import React from "react";
import { redirect } from "next/navigation";

import { db } from "@acme/db/client";
import { CreateSpaces } from "~/components/create-spaces";

import { getCurrentUser } from "~/utils/get-current-user";
import { FolderKanban , UserRound , Plus } from 'lucide-react';
import {Card} from "@acme/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import { Ellipsis } from 'lucide-react';
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
      <div className="m-auto md:w-5/6 p-6 md:px-12">
        <h1 className="text-2xl font-semibold md:mt-12 md:text-2xl">
          Overview
        </h1>
        <div className={" md:flex items-center  gap-4"}>
        <Card className=" mt-6 dark:bg-zinc-900/50  p-4 rounded-xl md:min-w-[300px] shadow-md">
          <div className={"flex items-center justify-between"}>
            <h1 className={" text-xl font-semibold"}>
              Projects
            </h1>
            <FolderKanban />
          </div>
          <div className="text-xl font-bold mt-2 md:mt-5 ">{userOrg.length}</div>
        </Card>
        </div>
        <div className={"flex justify-between items-center mt-6"}>
          <h1 className={"text-2xl font-semibold  md:text-2xl  "}>
            Spaces
          </h1>
          <Button  > <Plus size={20} className="mr-2" /> Create Space</Button>
        </div>
        <div>
          {userOrg.length === 0 ? (
            <CreateSpaces />
          ) : (
            <div className={"md:flex flex-wrap gap-4"}>
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

interface Project {
  id: string;
  ownerId: string;
  website: string;
  logo: string | null;
  organizationName: string | null;
  createdAt: Date;
  updatedAt: Date;
}


const ProjectsCard = ({project} : {project: Project  }) => {
  return (

    <Card className=" mt-6 dark:bg-zinc-900/50  p-4 rounded-xl md:min-w-[300px] shadow-md hover:scale-105 duration-200 hover:shadow-lg">
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-2 "}>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={project.logo ?? ""}
              alt={project.organizationName ?? "user avater"}
            />
            <AvatarFallback>
              <UserRound className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <h1 className={" text-xl font-semibold"}>
            {project.organizationName}
          </h1>
        </div>
        <Ellipsis className="h-5 w-5" />
      </div>

      <div className="text-xl font-bold md:mt-10 mt-5 "></div>
    </Card>

  );
}


