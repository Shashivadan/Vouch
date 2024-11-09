import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { eq } from "@acme/db";
import { testimonialTable } from "@acme/db/schema";

import { protectedProcedure } from "../trpc";

export const likeTestimonialsRouter = {
  like: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      if (!opts.input.id) {
        return {
          success: false,
        };
      }
      const result = await opts.ctx.db
        .update(testimonialTable)
        .set({ wallOfFame: !opts.input.value })
        .where(eq(testimonialTable.id, opts.input.id))
        .returning();

      return {
        success: true,
        result,
      };
    }),
} satisfies TRPCRouterRecord;
