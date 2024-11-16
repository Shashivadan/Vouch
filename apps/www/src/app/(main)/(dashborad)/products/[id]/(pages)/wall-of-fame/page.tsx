import React from "react";

import ShowCaseLink from "../_components/show-case-links";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="w-full p-5">
      <h1 className="text-3xl font-bold">Wall 0f Fame</h1>
      <div className="mt-2 text-sm">share you wall of fame</div>
      <div className="mt-4 flex flex-col gap-4 rounded-md bg-zinc-800/50 p-6">
        <ShowCaseLink page="all" name={params.id} />
      </div>
    </div>
  );
}
