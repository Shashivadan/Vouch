import React from "react";
import Image from "next/image";
import icon from "public/icons/icon.svg";

import { Button } from "@acme/ui/button";

import Beta from "./beta";

export function MainNav() {
  return (
    <>
      <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-screen-2xl justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              {icon && (
                <>
                  <Image
                    src={icon as string}
                    width={30}
                    height={30}
                    alt="Vouch"
                    className="h-7 w-7 dark:invert"
                  />
                </>
              )}
              <p className="text-2xl font-bold">Vouch</p>
              <Beta />
            </div>
          </div>
          <Button
            variant="link"
            className="inline rounded-md bg-purple-500/15 px-4 py-1 text-sm font-medium text-purple-500 hover:bg-purple-600/10 hover:text-purple-500 border0-none"
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}