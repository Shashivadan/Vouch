"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

import { Error } from "./error";
import { RequestForm } from "./request-form";
import { Success } from "./sussess";

export function TestimonialForm({ orgName }: { orgName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const [formState, setFormState] = useState<"sussess" | "current" | "error">(
    "current",
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Share Your Experience</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] rounded-3xl border-none bg-white/10 p-0 text-white backdrop-blur-[300px] dark:bg-black/10 sm:max-w-[600px]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            {formState === "current" && "Your Review Matters"}
            {formState === "sussess" && "Thank You for Sharing!"}
            {formState === "error" && "Oops! Something Went Wrong"}
          </DialogTitle>
          <DialogDescription className="text-zinc-300">
            {formState === "sussess" &&
              "Your feedback helps us improve! We'll use your insights to make our service better for everyone"}
            {formState === "current" &&
              "Help us improve by sharing your experience"}
            {formState === "error" &&
              "We couldn't submit your review. Please try again later or contact support if the issue persists"}
          </DialogDescription>
        </DialogHeader>
        <div>
          {formState == "current" && (
            <RequestForm orgName={orgName} setFormState={setFormState} />
          )}
          {formState === "sussess" && <Success />}
          {formState === "error" && <Error />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
