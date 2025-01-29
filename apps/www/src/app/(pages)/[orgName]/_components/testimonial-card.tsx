import React from "react";
import Image from "next/image";

import { cn } from "@vouch/ui";

import type { TestimonialType } from "~/types";

export default function TestimonialCard({ data }: { data: TestimonialType }) {
  return (
    <figure
      className={cn(
        "relative mb-5 cursor-pointer break-inside-avoid-column overflow-hidden rounded-xl border p-4",

        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",

        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={data.profileImages ?? ""}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {data.authorName}
          </figcaption>
          <p className="truncate text-xs font-medium dark:text-white/40">
            {data.authorEmail}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{data.message}</blockquote>
      {data.reviewImages && (
        <div className="flex items-center justify-center">
          <Image
            src={data.reviewImages}
            alt=""
            className="mt-2 rounded-md"
            width="800"
            height="800"
          />
        </div>
      )}
    </figure>
  );
}
