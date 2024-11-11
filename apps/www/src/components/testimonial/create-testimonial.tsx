import { PlusIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import { Card, CardHeader, CardTitle } from "@acme/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";

import type { OrganizationTestimonialType } from "~/types";
import { CreateTestimonialForm } from "./create-testimonial-form";

export default function CreateTestimonial({
  data,
}: {
  data: OrganizationTestimonialType;
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button className="hidden md:block">Create a Testimonial</Button>
            <Button className="block h-fit w-fit border-none p-1 md:hidden">
              <PlusIcon className="h-6 w-6" />
            </Button>
          </div>
        </DialogTrigger>
        <DialogOverlay className="bg-transparent backdrop-blur-[5px] dark:bg-blend-saturation" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Testimonial</DialogTitle>
            <Card className="w-full border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={data.logo ?? ""}
                    alt={data.organizationName}
                  />
                  <AvatarFallback>
                    {data.organizationName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {data.organizationName}
                </CardTitle>
              </CardHeader>
              <CreateTestimonialForm data={data} />
            </Card>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
