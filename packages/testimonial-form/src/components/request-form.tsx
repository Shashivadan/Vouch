"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

export function RequestForm({
  orgName,
  setFormState,
}: {
  orgName: string;
  setFormState: (status: "sussess" | "current" | "error") => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 5,
      message: "",
      authorName: "",
      authorEmail: "",
      profileImage: "",
      reviewImages: "",
    },
  });
  const headers = {
    "Content-Type": "application/json",
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const resp = await axios.post(
        "http://localhost:3001/api/v1/" + orgName,
        values,
        { headers },
      );
      if (resp.data) {
        setLoading(false);
        setFormState("sussess");
        setIsSubmitting(false);
      }
      form.reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setFormState("error");
      return error;
    }
  }

  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
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
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit Your Review"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
