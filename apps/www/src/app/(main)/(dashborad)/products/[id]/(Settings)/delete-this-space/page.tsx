import React from "react";

import { getSpaceDetails } from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import DeleteAccount from "~/components/delete-space";

export default async function page({ params }: { params: { id: string } }) {
  const id: string = params.id;

  const data = await getSpaceDetails(id);
  if (typeof data === "string" || !data) {
    return <NotFound />;
  }

  return (
    <div className="w-full">
      <div className="rounded-lg border border-red-700 bg-zinc-900/50">
        <div className="p-3 md:p-6">
          <div className="mb-4 text-2xl font-semibold">Delete my account</div>
          <div className="text-sm">
            This action will permanently remove all your posts, data, and
            personal information associated with your account. This action is
            irreversible and cannot be undone.
          </div>
        </div>
        <div className="bg-red-900/60 p-2 px-6">
          <DeleteAccount id={data.id} />
        </div>
      </div>
    </div>
  );
}
