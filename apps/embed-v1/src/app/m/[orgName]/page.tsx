import React from "react";

import NotFound from "@vouch/ui/components/404-not-found";

import { getOrgTestimonials } from "~/actions/getOrgTestimonials";
import MarqueeMain from "~/components/marquee-main";
import { ReviewCard } from "~/components/review-card";

export default async function TestimonialsPage({
  params,
}: {
  params: { orgName: string };
}) {
  const { orgName } = params;
  const data = await getOrgTestimonials(orgName);

  if (!data || typeof data === "string") return <NotFound />;
  if (data.testimonials.length === 0) return <NotFound />;

  if (data.testimonials.length < 4) {
    return (
      <div className="h-svh columns-[300px] overflow-hidden">
        {data.testimonials.map((testimonial, index) => (
          <ReviewCard key={index} data={testimonial} />
        ))}
      </div>
    );
  }

  // Split testimonials into 5 columns for marquee effect
  const testimonialsData = data.testimonials.reduce<JSX.Element[][]>(
    (acc, testimonial, index) => {
      const columnIndex = index % 5;

      if (!acc[columnIndex]) {
        acc[columnIndex] = [];
      }

      acc[columnIndex].push(
        <ReviewCard
          key={`testimonial-${columnIndex}-${index}`}
          data={testimonial}
        />,
      );
      return acc;
    },
    [],
  );

  return (
    <MarqueeMain data={data.testimonials} testmonials={testimonialsData} />
  );
}
