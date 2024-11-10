ALTER TABLE "organization" ADD COLUMN "headerTitle" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "customMessage" text NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "question" text NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "question1";