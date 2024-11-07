import React from "react";
import { AlertCircle } from "lucide-react";

export default function NothingHere() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-lg p-8 text-center shadow-xl dark:shadow-none">
          <AlertCircle className="mx-auto mb-4 h-12 w-12" />
          <h1 className="mb-2 text-2xl font-bold">Nothing to see here</h1>
          <p className="">
            It looks like there's no data to display at the moment.
          </p>
        </div>
      </div>
    </div>
  );
}
