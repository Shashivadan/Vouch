"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
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
import { toast } from "@acme/ui/toast";

import type { OrganizationType } from "~/types";
import { createRequestTestimonial } from "~/actions/create-request-testimonial";

const imageRegex =
  /^(?:\bhttps?:\/\/[^\s]*\.(?:png|jpg|jpeg|gif|svg|webp)\b|$)/g;

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  authorName: z.string().min(2, "Name must be at least 2 characters long"),
  authorEmail: z.string().email("Invalid email address"),
  profileImage: z.string().regex(imageRegex).optional(),
  reviewImages: z.string().regex(imageRegex).optional(),
});

export default function CoolReviewForm({ data }: { data: OrganizationType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      message: "",
      authorName: "",
      authorEmail: "",
      profileImage: "",
      reviewImages: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      await createRequestTestimonial(values, data);
      toast.success("submitted");
      setIsSubmitting(false);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="min-w-40 rounded-xl bg-white/0 py-6 text-white backdrop-blur-[300px] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/20 hover:shadow-2xl"
        >
          Share Your Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] rounded-3xl border-none bg-white/10 p-0 text-white backdrop-blur-[300px] dark:bg-black/10 sm:max-w-[600px]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            Your Review Matters
          </DialogTitle>
          <DialogDescription className="text-zinc-300">
            Help us improve by sharing your experience
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-6"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <motion.button
                          key={value}
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="focus:outline-none"
                          onClick={() => field.onChange(value)}
                        >
                          <Star
                            className={`h-10 w-10 transition-colors ${
                              field.value >= value
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-zinc-400"
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </FormControl>
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
                      placeholder="Tell us about your experience..."
                      className="min-h-[100px] resize-none rounded-xl border-none bg-white/5 p-4 text-white placeholder:text-zinc-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        className="rounded-xl border-none bg-white/5 text-white placeholder:text-zinc-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="authorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        className="rounded-xl border-none bg-white/5 text-white placeholder:text-zinc-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Profile Image URL (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/your-image.jpg"
                      className="rounded-xl border-none bg-white/5 text-white placeholder:text-zinc-400"
                      {...field}
                    />
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
                  <FormLabel className="text-zinc-300">
                    Review Images (optional)
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="https://example.com/review-image.jpg"
                        className="rounded-xl border-none bg-white/5 text-white placeholder:text-zinc-400"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-zinc-400">
                    Add multiple image URLs separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-6 text-lg font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit Your Review"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
