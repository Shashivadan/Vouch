import React from "react";

import { Card } from "@acme/ui/card";

import { getTestimonialsLikedDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import NothingHere from "~/components/nothing-here";
import TestimonialCard from "~/components/testmonial-card";

export default async function Page({ params }: { params: { id: string } }) {
  const id: string = params.id;

  if (!id) return <NotFound />;

  const data = await getTestimonialsLikedDetails(id);

  if (!data) return <NotFound />;

  if (typeof data === "string") return <NotFound />;

  return (
    <div>
      <Card className="mb-2 p-3 text-lg font-bold">Liked testimonials</Card>

      {data.length === 0 ? (
        <NothingHere />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {data.map((testmonials) => (
              <>
                {" "}
                <TestimonialCard data={testmonials} />
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
