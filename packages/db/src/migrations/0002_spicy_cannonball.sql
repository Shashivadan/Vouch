ALTER TABLE "organization" ADD COLUMN "customMessage" text;--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN IF EXISTS "costuem";