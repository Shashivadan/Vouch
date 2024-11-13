import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";

import { getTestimonialsWithWallOfFameDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import TestimonialCard from "../_components/testimonial-card";
import img from "../../../../../public/0245.jpg";

export default async function page({
  params,
}: {
  params: { orgName: string };
}) {
  const { orgName } = params;
  const data = await getTestimonialsWithWallOfFameDetails(orgName);

  if (!data || typeof data === "string") return <NotFound />;

  return (
    <div>
      <div className="relative aspect-video h-80 w-full rounded-lg bg-black">
        <Image
          src={img}
          alt={"img"}
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 backdrop-blur-3xl dark:bg-black/30">
          <Avatar className="h-24 w-24">
            <AvatarImage src={data.logo ?? ""} alt={data.organizationName} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-bold">{data.organizationName}</h1>
          </div>
          <Button className="min-w-40 rounded-none">
            <Link href={`/${data.organizationName}`}>
              Share your experience
            </Link>
          </Button>
          <Link className="text-sm underline underline-offset-2" href={`/`}>
            Build your own wall? It's free 👉
          </Link>
        </div>
      </div>
      <div className="columns-[300px] p-5">
        {data.testimonials.map((testimonial) => (
          <>
            <span className="">
              <TestimonialCard data={testimonial} />
            </span>
          </>
        ))}
      </div>
    </div>
  );
}
