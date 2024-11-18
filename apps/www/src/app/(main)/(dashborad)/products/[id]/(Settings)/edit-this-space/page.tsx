import React from "react";
import dynamic from "next/dynamic";

import { getOrganizationQuestionDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";

const EditSpace = dynamic(() => import("~/components/edit-space"), {
  loading: () => <p>Loading...</p>,
});

export const revalidate = 0;
export default async function page({ params }: { params: { id: string } }) {
  const id: string = params.id;

  const data = await getOrganizationQuestionDetails(id);

  if (typeof data === "string" || !data) {
    return <NotFound />;
  }

  return (
    <div className="w-full p-5">
      <EditSpace data={data} />
    </div>
  );
}
