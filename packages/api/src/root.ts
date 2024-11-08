import { authRouter } from "./router/auth";
import { likeTestimonialsRouter } from "./router/like-testimonials";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  likeTestimonials: likeTestimonialsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
