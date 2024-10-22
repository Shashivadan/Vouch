import { Suspense } from "react";

export const runtime = "edge";

export default function HomePage() {


  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>

        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={<div className="flex w-full flex-col gap-4"></div>}
          ></Suspense>
        </div>
      </div>
    </main>
  );
}
