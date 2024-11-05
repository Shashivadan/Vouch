CREATE TYPE "public"."type" AS ENUM('text', 'video');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testimonial" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorName" text NOT NULL,
	"authorEmail" text NOT NULL,
	"wallOfFame" boolean DEFAULT false NOT NULL,
	"message" text NOT NULL,
	"images" text,
	"reviewImages" text,
	"type" "type"
);
--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testimonial" ADD CONSTRAINT "testimonial_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_website_unique" UNIQUE("website");