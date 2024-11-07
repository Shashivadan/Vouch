import React from "react";

import { getSpaceDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import EditSpace from "~/components/edit-space";

export default async function page({ params }: { params: { id: string } }) {
  const id: string = params.id;

  const data = await getSpaceDetails(id);
  if (typeof data === "string" || !data) {
    return <NotFound />;
  }

  return (
    <div>
      <EditSpace data={data} />
    </div>
  );
}
