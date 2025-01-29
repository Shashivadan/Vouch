import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent, CardHeader } from "@vouch/ui/card";

import { getSingleTestimonialDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import { formatDate } from "~/utils/format-date";

export const dynamic = "force-dynamic";

export default async function page({
  params,
}: {
  params: { testimonial: string };
}) {
  const testimonial: string = params.testimonial;

  const data = await getSingleTestimonialDetails(testimonial);

  if (typeof data === "string" || !data) {
    return <NotFound />;
  }

  const { testimonial: testimonialDetails, orgName, orgLogo } = data;

  return (
    <div className="flex h-[93svh] items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex items-center space-x-4">
            {orgLogo && (
              <Image
                src={orgLogo}
                alt={`${orgName} logo`}
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{data.orgName}</h2>
              <p className="text-sm text-muted-foreground">
                Posted on {formatDate(testimonialDetails.createdAt)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < testimonialDetails.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="font-semibold">{testimonialDetails.rating}/5</span>
          </div>
          <blockquote className="border-l-4 border-primary py-2 pl-4 italic">
            "{testimonialDetails.message}"
          </blockquote>
          <div className="flex items-center space-x-4">
            {testimonialDetails.profileImages && (
              <Image
                src={testimonialDetails.profileImages}
                alt={`${testimonialDetails.authorName}'s profile`}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold">{testimonialDetails.authorName}</p>
              <p className="text-sm text-muted-foreground">
                {testimonialDetails.authorEmail}
              </p>
            </div>
          </div>
          {testimonialDetails.reviewImages && (
            <div className="flex items-center justify-center">
              <Image
                width={300}
                height={300}
                src={testimonialDetails.reviewImages}
                alt="Review"
                className="mt-4 rounded-md object-cover object-center"
              />
            </div>
          )}
          {testimonialDetails.type === "video" && (
            <p className="text-center text-muted-foreground">
              Video testimonial available
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
