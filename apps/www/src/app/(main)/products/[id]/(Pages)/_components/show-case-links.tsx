"use client";

import Link from "next/link";
import { CopyIcon, Eye } from "lucide-react";

import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

export default function ShowCaseLink({
  name,
  page,
}: {
  page?: string;
  name: string;
}) {
  const domain = document.location.origin;
  return (
    <div>
      <div className="font-bold">On our hosted page</div>
      <div className="mt-2 flex items-center justify-between gap-2 rounded-md bg-zinc-700/30">
        <div className="flex w-full items-center justify-between p-1 font-mono text-white">
          <div className="cursor-pointer text-primary">{`${domain}/${name}/${page}`}</div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={async () => {
                await navigator.clipboard
                  .writeText(`${domain}/${name}/${page}`)
                  .then(() => {
                    toast.success("Link copied to clipboard");
                  });
              }}
            >
              <CopyIcon size={16} />
            </Button>
            <Button size="sm" variant="outline" className="w-full" asChild>
              <Link href={`/${name}/${page}`} target="_blank" className="">
                <Eye size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
