import React from "react";
import Image from "next/image";
import Link from "next/link";
import icon from "public/icons/icon.svg";

import { Button } from "@vouch/ui/button";
import { ThemeToggle } from "@vouch/ui/theme";

import { getCurrentUser } from "~/utils/get-current-user";
import Beta from "./beta";
import ProfileOpts from "./profile-opts";

export async function MainNav() {
  const user = await getCurrentUser();
  return (
    <>
      <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-screen-2xl justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              {icon && (
                <>
                  <Link href="/">
                    <Image
                      src={icon as string}
                      width={30}
                      height={30}
                      alt="Vouch"
                      className="h-7 w-7 dark:invert"
                    />
                  </Link>
                </>
              )}
              <Link href="/">
                <p className="text-2xl font-bold">Vouch</p>
              </Link>
              <Beta />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <ProfileOpts user={user} />
              </>
            ) : (
              <>
                {" "}
                <Button
                  variant="link"
                  className="border0-none inline rounded-md bg-purple-500/15 px-4 py-1 text-sm font-medium text-purple-500 hover:bg-purple-600/10 hover:text-purple-500"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
