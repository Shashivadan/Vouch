import React from "react";

import { Card, CardContent, CardHeader } from "@acme/ui/card";
import { Skeleton } from "@acme/ui/skeleton";

export function TestimonialSkeleton() {
  return (
    <Card className="bg-card text-card-foreground md:w-[600px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-full" />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="w-full space-y-4 p-4 md:h-40">
      <div className="w-full max-w-2xl space-y-4 p-4">
        <div className="flex items-start space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <div className="space-y-1">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <TestimonialSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
