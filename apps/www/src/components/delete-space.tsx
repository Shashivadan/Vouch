"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";

import { deleteSpace } from "~/actions/delete-space";

export default function DeleteAccount({ id }: { id: string }) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const deleted = await deleteSpace(id);
      if (deleted) {
        setIsOpen(false);
        toast.success("Account deleted successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-none bg-red-600/50 hover:bg-red-600"
        >
          Delete my account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="md:mb-4">
            <DialogTitle className="md:mb-4">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="font-medium">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our database.
            </DialogDescription>
          </DialogHeader>
          <div>
            Type <strong>delete my account</strong> to continue:
          </div>
          <div className="flex items-center space-x-2">
            <div className="mt-4 grid flex-1 gap-2">
              <Label htmlFor="confirmDelete" className="sr-only">
                Confirm deletion
              </Label>
              <Input
                id="confirmDelete"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type delete my account"
              />
            </div>
          </div>
          <DialogFooter className="mt-3 flex items-center justify-between">
            <Button
              type="submit"
              variant="destructive"
              disabled={value !== "delete my account"}
              className="w-20 bg-red-600/50 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
