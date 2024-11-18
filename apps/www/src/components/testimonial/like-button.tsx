"use client";

import React, { startTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { toast } from "@acme/ui/toast";

import type { TestimonialType } from "~/types";
import { api } from "~/trpc/react";

export default function LikeButton({ data }: { data: TestimonialType }) {
  const router = useRouter();
  const [optimisticWallOfFame, setOptimisticWallOfFame] = useOptimistic(
    data.wallOfFame,
    (state, newValue: boolean) => newValue,
  );

  const mutation = api.likeTestimonials.like.useMutation({
    onSuccess: (data) => {
      toast.success(
        `Testimonial ${(data.result as unknown as TestimonialType).wallOfFame ? "liked" : "unLiked"}`,
      );
      router.refresh();
    },
    onError: (error: unknown) => {
      // Revert optimistic update on error
      startTransition(() => {
        setOptimisticWallOfFame(data.wallOfFame);
      });

      if (error instanceof Error) {
        toast.error(`Something went wrong: ${error.message}`);
        console.error("Detailed error:", error);
      } else {
        toast.error("Something went wrong");
        console.error("Unknown error type:", error);
      }
    },
  });

  const handleLike = () => {
    startTransition(() => {
      setOptimisticWallOfFame(!optimisticWallOfFame);
      mutation.mutate({ id: data.id, value: data.wallOfFame });
    });
  };

  return (
    <button
      disabled={mutation.isPending}
      onClick={handleLike}
      className="disabled:opacity-50"
    >
      <Heart
        fill={optimisticWallOfFame ? "red" : "none"}
        className="h-5 w-5 cursor-pointer text-red-500 transition-colors duration-150 hover:text-red-500"
      />
    </button>
  );
}
