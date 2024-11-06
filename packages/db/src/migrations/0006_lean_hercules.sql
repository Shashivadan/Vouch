ALTER TABLE "testimonial" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "testimonial" ALTER COLUMN "liked" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "testimonial" ALTER COLUMN "liked" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "testimonial" ALTER COLUMN "rating" SET DEFAULT 5;--> statement-breakpoint
ALTER TABLE "testimonial" ALTER COLUMN "rating" SET NOT NULL;