"use client";

import Link from "next/link";
import { Ellipsis, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@vouch/ui/avatar";
import { Card } from "@vouch/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@vouch/ui/dropdown-menu";

import { deleteProject } from "~/actions/delete-project";

interface Project {
  id: string;
  ownerId: string;
  website: string;
  logo: string | null;
  organizationName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const ProjectsCard = ({ project }: { project: Project }) => {
  return (
    <Card className="mt-6 rounded-xl p-4 shadow-md hover:shadow-lg dark:bg-zinc-900/50 md:min-w-[300px]">
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-2"}>
          <Link
            href={`/products/${project.organizationName}/all`}
            className="flex items-center gap-2"
            key={project.id}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={project.logo ?? ""}
                alt={project.organizationName ?? "user avater"}
              />
              <AvatarFallback>
                <UserRound className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <h1 className={"text-xl font-semibold"}>
              {project.organizationName}
            </h1>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:w-56">
            <DropdownMenuItem
              className="cursor-pointer hover:bg-red-700"
              asChild
            >
              <Link
                href={`/products/${project.id}`}
                className="flex h-full w-full items-end"
              >
                Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-red-700">
              <button
                className="flex h-full w-full items-end"
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
