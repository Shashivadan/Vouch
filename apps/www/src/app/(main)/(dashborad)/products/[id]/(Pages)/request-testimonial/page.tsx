import React from "react";

import ShowCaseLink from "../_components/show-case-links";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Request Testimonial</h1>
      <div className="mt-2 text-sm">
        Share this link with your clients or customers to request testimonials
      </div>
      <div className="mt-4 flex flex-col gap-4 rounded-md bg-zinc-800/50 p-6">
        <ShowCaseLink page="" name={params.id} />
      </div>
    </div>
  );
}
