"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { Card, CardContent, CardFooter } from "@acme/ui/card";

import type { TestimonialType } from "~/types";
import { RatingStar } from "./rating-star";
import TestmonialDialog from "./testmonial-dialog";

export default function TestimonialCard({ data }: { data: TestimonialType }) {
  const { message = "No message provided", createdAt, rating = 0 } = data;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mx-auto flex h-[150px] w-full flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardContent className="flex flex-grow flex-col justify-between gap-5 overflow-hidden p-6">
          <TestmonialDialog data={data}>
            <div className="relative">
              <Quote className="absolute left-0 top-0 h-6 w-6 text-primary opacity-20" />
              <p className="pl-8 pr-4 text-start text-sm italic">
                {message.length > 100 ? message.slice(0, 100) + "..." : message}{" "}
              </p>
            </div>
          </TestmonialDialog>
          {rating && (
            <div className="fixed bottom-3 flex items-center">
              <RatingStar rating={rating} />
            </div>
          )}
        </CardContent>
        <CardFooter className="fixed bottom-0 right-0 flex items-center justify-between p-4">
          <div className="text-xs text-muted-foreground">
            Posted on {new Date(createdAt).toDateString()}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
