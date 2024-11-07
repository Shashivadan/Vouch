import React from "react";
import { CalendarIcon, GlobeIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";

import { getProjectDetails } from "~/actions/get-project-details";
import NotFound from "~/components/404-not-found";
import TestimonialCard from "~/components/testmonial-card";
import { formatDate } from "~/utils/format-date";
import { getCurrentUser } from "~/utils/get-current-user";

export const dynamic = "force-dynamic";

export default async function page({ params }: { params: { id: string } }) {
  const id: string = params.id;
  const user = await getCurrentUser();
  if (!user || !id) return <NotFound />;

  const data = await getProjectDetails(id);

  if (!data) return <NotFound />;

  if (typeof data === "string") return <NotFound />;

  return (
    <div className="">
      <Card className="mb-2 w-full">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={data.logo ?? ""} alt={data.organizationName} />
            <AvatarFallback>
              {data.organizationName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-xl">{data.organizationName}</CardTitle>
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:underline"
              >
                <GlobeIcon className="h-4 w-4" />
                <span className="w-[200px] truncate md:w-full">
                  {data.website}
                </span>
              </a>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Owner Name: {user.name ?? "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Created: {formatDate(data.createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-2 p-3 text-xl font-bold">Reviews</Card>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {data.testimonials.map((item) => (
          <TestimonialCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
