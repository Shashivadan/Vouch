import React from "react";
import { CopyIcon, LucideLinkedin, Share, Twitter } from "lucide-react";

import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import { toast } from "@acme/ui/toast";

import type { TestimonialType } from "~/types";

export default function ShareTestimonial({ data }: { data: TestimonialType }) {
  const domain = document.location.origin;

  const getLinkOnClick = async () => {
    await navigator.clipboard.writeText(`${domain}/share/${data.id}`);
    toast.success("copied to clipboard");
  };
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${domain}/share/${data.id}`)}&text=${encodeURIComponent("Check out these amazing customer testimonial! 🌟")}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${domain}/share/${data.id}`)}&title=${encodeURIComponent("Real stories from real users ⭐️ See what everyone's saying about us!")}&summary=${encodeURIComponent("Check out these amazing customer testimonial! 🌟")}&source=${encodeURIComponent(`${domain}/share/${data.id}`)}`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center" asChild>
        <Button variant="outline" size="sm" className="rounded-sm">
          Share <Share size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button
            variant={"ghost"}
            onClick={getLinkOnClick}
            className="flex items-center justify-between gap-2"
          >
            Get the link <CopyIcon size={16} />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            className="flex w-full items-center justify-between gap-2"
            target="_blank"
            href={linkedinShareUrl}
          >
            LinkedIn <LucideLinkedin size={16} />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            className="flex w-full items-center justify-between gap-2"
            target="_blank"
            href={twitterShareUrl}
          >
            Twitter <Twitter size={16} />
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
