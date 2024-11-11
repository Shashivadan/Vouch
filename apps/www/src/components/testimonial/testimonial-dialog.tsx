import React from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Badge } from "@acme/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@acme/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";

import type { TestimonialType } from "~/types";
import { formatDate } from "~/utils/format-date";
import { RatingStar } from "./rating-star";

export default function TestimonialDialog({
  children,
  data,
}: {
  children: React.ReactNode;
  data: TestimonialType;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Card
              key={data.id}
              className="flex flex-col border-none shadow-none"
            >
              <DialogTitle className="flex flex-row items-center gap-4">
                {" "}
                <Avatar>
                  <AvatarImage
                    src={data.profileImages ?? ""}
                    alt={data.authorName}
                  />
                  <AvatarFallback>
                    {data.authorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{data.authorName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(data.createdAt)}
                  </p>
                </div>
              </DialogTitle>
              <CardHeader className=""></CardHeader>
              <CardContent className="">
                <p className="text-sm">{data.message}</p>
                {data.reviewImages && (
                  <div className="flex items-center justify-center">
                    <Image
                      width={300}
                      height={300}
                      src={data.reviewImages}
                      alt="Review"
                      className="mt-4 rounded-md object-cover object-center"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <RatingStar rating={data.rating ? data.rating : 0} />
                <div className=""></div>
                <div className="flex gap-2">
                  {data.wallOfFame && (
                    <Badge variant="secondary">
                      <Trophy className="h-4 w-4 md:mr-1" />
                      <div className="hidden md:block"> Wall of Fame</div>
                    </Badge>
                  )}
                </div>
              </CardFooter>
            </Card>
            <DialogDescription className="flex items-center justify-between"></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
