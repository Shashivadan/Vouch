import React from "react";
import { UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@vouch/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@vouch/ui/dropdown-menu";

import SignOutButton from "./sign-out-button";

interface UserData {
  name: string | null | undefined;
  image: string | null | undefined;
  id: string;
  email?: string | null;
}

export default function ProfileOpts({ user }: { user: UserData }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.image ?? ""}
              alt={user.name ?? "user avater"}
            />
            <AvatarFallback>
              <UserRound className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="lg:w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
