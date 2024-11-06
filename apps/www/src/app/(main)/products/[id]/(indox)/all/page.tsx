import React from "react";
import { CalendarIcon, GlobeIcon, UserIcon } from "lucide-react";

import { and } from "@acme/db";
import { db } from "@acme/db/client";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";

import type { OrganizationTestimonialType } from "~/types";
import NotFound from "~/components/404-not-found";
import TestimonialCard from "~/components/testmonial-card";
import { formatDate } from "~/utils/format-date";
import { getCurrentUser } from "~/utils/get-current-user";

export const dynamic = "force-dynamic";

export default async function page({ params }: { params: { id: string } }) {
  const id: string = params.id;
  const user = await getCurrentUser();

  if (!user || !id) {
    return <NotFound />;
  }

  const data = (await db.query.organizationTable.findMany({
    where: (organizationTable, { eq }) =>
      and(
        eq(organizationTable.organizationName, id),
        eq(organizationTable.ownerId, user.id),
      ),
    with: {
      testimonials: true,
    },
    limit: 2,
  })) as OrganizationTestimonialType[];

  if (data.length === 0) {
    return <NotFound />;
  }

  const organization = data[0];

  return (
    <div className="">
      <Card className="mb-2 w-full">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={data[0]?.logo ?? ""}
              alt={organization?.organizationName}
            />
            <AvatarFallback>
              {organization?.organizationName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-xl">
              {organization?.organizationName}
            </CardTitle>
            {organization?.website && (
              <a
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:underline"
              >
                <GlobeIcon className="h-4 w-4" />
                <span className="w-[200px] truncate md:w-full">
                  {organization.website}
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
              Created: {formatDate(organization?.createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-2 p-3 text-xl font-bold">Reviews</Card>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {data[0]?.testimonials.map((item) => (
          <TestimonialCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
