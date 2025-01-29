import { Card } from "@vouch/ui/card";

import { TestimonialSkeleton } from "../all/loading";

export default function Component() {
  return (
    <div className="mx-auto">
      <Card className="mb-2 p-3 font-bold">Liked</Card>
      <div className="grid w-full gap-2 md:grid-cols-2">
        {[1, 2, 3, 4, 5, 5].map((i) => (
          <div key={i} className="">
            <TestimonialSkeleton key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
