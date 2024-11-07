import React from "react";

import { Card } from "@acme/ui/card";

import { getTestimonialsWithTextOnlyDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import NothingHere from "~/components/nothing-here";
import TestimonialCard from "~/components/testmonial-card";

export default async function Page({ params }: { params: { id: string } }) {
  const id: string = params.id;

  if (!id) return <NotFound />;

  const data = await getTestimonialsWithTextOnlyDetails(id);

  if (!data) return <NotFound />;

  if (typeof data === "string") return <NotFound />;

  return (
    <div>
      <Card className="mb-2 p-3 text-lg font-bold">Text Testimonials</Card>
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
