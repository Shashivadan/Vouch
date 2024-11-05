ALTER TABLE "organization" ALTER COLUMN "organization" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_organization_unique" UNIQUE("organization");