import React from "react";

import { Card } from "@vouch/ui/card";

import { getTestimonialsLikedDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import NothingHere from "~/components/nothing-here";
import TestimonialCard from "~/components/testimonial/testimonial-card";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const id: string = params.id;

  if (!id) return <NotFound />;

  const data = await getTestimonialsLikedDetails(id);

  if (!data) return <NotFound />;

  if (typeof data === "string") return <NotFound />;

  return (
    <div>
      <Card className="mb-2 p-3 text-lg font-bold">Liked testimonials</Card>

      <>
        {" "}
        {data.testimonials.length === 0 ? (
          <NothingHere />
        ) : (
          <>
            <div className="columns-[450px]">
              {data.testimonials.map((Testimonials) => (
                <div className="mb-2">
                  {" "}
                  <TestimonialCard data={Testimonials} />
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
}
