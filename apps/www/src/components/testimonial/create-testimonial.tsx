import { GlobeIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";

import type { OrganizationTestimonialType } from "~/types";

export default function CreateTestimonial({
  data,
}: {
  data: OrganizationTestimonialType;
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Write a Review</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Testimonial</DialogTitle>
            <Card className="mb-2 w-full border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={data.logo ?? ""}
                    alt={data.organizationName}
                  />
                  <AvatarFallback>
                    {data.organizationName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <CardTitle className="text-xl">
                    {data.organizationName}
                  </CardTitle>
                  {data.website && (
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground"
                    >
                      <GlobeIcon className="h-4 w-4" />
                      <span className="w-[200px] truncate text-blue-600 md:w-full">
                        {data.website}
                      </span>
                    </a>
                  )}
                </div>
              </CardHeader>
              <CardContent className="">
                <div className="text-center text-lg">
                  Give your a valuable review
                </div>
              </CardContent>
            </Card>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
