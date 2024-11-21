"use client";

import React from "react";
import { Copy } from "lucide-react";

import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import type { OrganizationType } from "~/types";

export default function ApiPage({ data }: { data: OrganizationType }) {
  const domain = document.location.origin;

  const handleCopyToClipboard = async (data: string) => {
    await navigator.clipboard.writeText(data);
    toast.success("copied to clipboard");
  };
  return (
    <div>
      {" "}
      <h1 className="text-3xl font-bold">API Integration</h1>
      <div className="mt-2 text-sm">
        Integrate our API into your application to receive testimonials directly
        into your app.
      </div>
      <div className="mt-4 text-lg font-semibold">Your API key</div>
      <div className="mt-4 flex items-center justify-between gap-4 rounded-md bg-zinc-800/50 p-2">
        <code>{data.id}</code>{" "}
        <Button
          variant={"outline"}
          className="p-2"
          onClick={() => handleCopyToClipboard(data.id)}
        >
          <Copy size={20} />
        </Button>
      </div>
      <div className="mt-4 text-lg font-semibold">
        Wall of Fame - Testimonials API{" "}
        <span className="ml-4 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-500">
          GET
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 rounded-md bg-zinc-800/50 p-2">
        <code>{`${domain}/api/v1/wall-of-fame?key=${data.id}`}</code>
        <Button
          variant={"outline"}
          className="p-2"
          onClick={() =>
            handleCopyToClipboard(
              `${domain}/api/v1/wall-of-fame?key=${data.id}`,
            )
          }
        >
          <Copy size={20} />
        </Button>
      </div>
    </div>
  );
}
