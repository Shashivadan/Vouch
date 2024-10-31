"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";



import { Button } from "@acme/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@acme/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@acme/ui/form";
import { Input } from "@acme/ui/input";



import { createProject } from "~/actions/create-project";


const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const logoRegex = /\bhttps?:\/\/[^\s]*\.(?:png|jpg|jpeg|gif|svg|ico)\b/g;
export const formSchema = z.object({
  websiteUrl: z
    .string()
    .url("Please enter a valid website URL")
    .min(1, "Website URL is required")
    .regex(urlRegex, "Please enter a valid website URL"),
  logoUrl: z
    .string()
    .url("Please enter a valid logo URL")
    .regex(logoRegex, "Please enter a valid logo URL")
    .optional(),
  organizationName: z
    .string()
    .min(1, "Organization name or website name is required"),
});
export const CreateSpaces = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const result = await createProject(values);
      toast.success("Successfully submitted the form.");
      console.log(result);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button asChild>
            <div className="flex items-center">
              <Plus size={20} className="mr-2" /> Create Space
            </div>
          </Button>
        </DialogTrigger>
        <DialogOverlay className="bg-transparent backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Space</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mx-auto max-w-3xl space-y-8 py-10"
                >
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Url</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo Url</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.example.com/logo.png"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name or Website Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};