"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";

import type { OrganizationTestimonialType } from "~/types";
import { editSpace } from "~/actions/edit-space";

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const logoRegex = /\bhttps?:\/\/[^\s]*\.(?:png|jpg|jpeg|gif|svg|ico)\b/g;
export const editFormSchema = z.object({
  websiteUrl: z
    .string()
    .url("Please enter a valid website URL")
    .min(1, "Website URL is required")
    .regex(urlRegex, "Please enter a valid website URL")
    .optional(),
  logoUrl: z
    .string()
    .url("Please enter a valid logo URL")
    .regex(logoRegex, "Please enter a valid logo URL")
    .optional(),
  organizationName: z
    .string()
    .min(1, "Organization name or website name is required")
    .optional(),
});

export default function EditSpace({
  data,
}: {
  data: OrganizationTestimonialType;
}) {
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    try {
      await editSpace(values, data.id);

      toast.success(`Successfully Edited Space`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  return (
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
              <FormLabel>
                Website Url <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  defaultValue={data.website}
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
                  defaultValue={
                    data.logo ?? "https://loremflickr.com/200/200?random=1"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
