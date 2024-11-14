"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { Textarea } from "@acme/ui/textarea";

import type { OrganizationType } from "~/types";
import { createTestimonial } from "~/actions/create-testimonial";

const imageRegex =
  /^(?:\bhttps?:\/\/[^\s]*\.(?:png|jpg|jpeg|gif|svg|webp)\b|$)/g;
export const testimonialFormSchema = z.object({
  authorName: z.string().min(4, "Name must be at least 4 characters"),
  profileImages: z.string().regex(imageRegex).optional(),
  authorEmail: z.string().email(),
  reviewImages: z.string().regex(imageRegex).optional(),
  message: z.string().min(10, "Review must be at least 30 characters"),
  rating: z.number().min(1).max(5),
});

export function CreateTestimonialForm({ data }: { data: OrganizationType }) {
  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      authorName: "",
      profileImages: "",
      authorEmail: "",
      reviewImages: "",
      message: "",
      rating: 5,
    },
  });

  async function onSubmit(values: z.infer<typeof testimonialFormSchema>) {
    try {
      await createTestimonial(values, data.id);
      toast.success(`Successfully created testimonial}`);
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="transition-transform hover:scale-110 focus:outline-none"
                      onClick={() => field.onChange(value)}
                      onMouseEnter={() => field.onChange(value)}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${field.value >= value ? "fill-yellow-400 text-yellow-500" : "text-zinc-200"}`}
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <div className="mt-1 text-sm text-gray-500">
                {field.value === 1 && "Poor"}
                {field.value === 2 && "Fair"}
                {field.value === 3 && "Good"}
                {field.value === 4 && "Very Good"}
                {field.value === 5 && "Excellent"}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="write your experience with us"
                  className="h-32 resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 flex justify-start">
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 flex justify-start">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormDescription>We won't spam you, we promise.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 flex justify-start">
                Profile-image{" "}
                <span className="text-xs text-zinc-500">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="profile image-URL" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reviewImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 flex justify-start">
                Review-images{" "}
                <span className="text-xs text-zinc-500">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="htts://image.png-URL" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
