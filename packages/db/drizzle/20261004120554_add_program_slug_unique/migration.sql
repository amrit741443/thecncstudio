ALTER TABLE "course" DROP CONSTRAINT "course_slug_key";--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "program_slug_unique" UNIQUE("program_id","slug");