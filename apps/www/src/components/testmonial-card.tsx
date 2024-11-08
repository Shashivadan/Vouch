"use client";

import { Image, Video } from "lucide-react";

import { Badge } from "@acme/ui/badge";
import { Card, CardContent } from "@acme/ui/card";

import type { TestimonialType } from "~/types";
import { formatDate } from "~/utils/format-date";
import LikeButton from "./like-button";
import { RatingStar } from "./rating-star";
import TestmonialDialog from "./testmonial-dialog";

export default function TestimonialCard({ data }: { data: TestimonialType }) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between">
          <span className="truncate text-xl font-semibold">
            {data.authorName}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <RatingStar rating={data.rating} />
            </div>
            {data.type === "video" ? (
              <Video className="h-5 w-5" />
            ) : (
              <Image className="h-5 w-5" />
            )}
            <LikeButton data={data} />
          </div>
        </div>
        <div className="space-y-2">
          <TestmonialDialog data={data}>
            <p className="text-start text-sm italic">
              {data.message.length > 100
                ? data.message.slice(0, 100) + "..."
                : data.message}
            </p>
          </TestmonialDialog>
          <div
            className={`flex items-center ${
              data.wallOfFame ? "justify-between" : "justify-end"
            }`}
          >
            {data.wallOfFame && (
              <Badge
                variant="secondary"
                className="bg-purple-600 text-zinc-100"
              >
                Wall of Fame
              </Badge>
            )}
            <p className="text-xs">{formatDate(data.createdAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
