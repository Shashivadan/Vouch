ALTER TABLE "testimonial" ADD COLUMN "archive" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "testimonial" DROP COLUMN IF EXISTS "achvied";