import React from "react";

import { getSpaceDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import ApiPage from "~/components/API/api-page";

export const dynamic = "force-dynamic";

export default async function page({ params }: { params: { id: string } }) {
  const id: string = params.id;

  if (!id) return <NotFound />;

  const data = await getSpaceDetails(id);

  if (typeof data === "string" || !data) {
    return <NotFound />;
  }

  return (
    <div className="w-full p-5">
      <ApiPage data={data} />
    </div>
  );
}
