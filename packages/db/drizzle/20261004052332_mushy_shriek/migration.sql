DROP INDEX "program_category_id_idx";--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_end_date_check" CHECK ("end_date" IS NULL OR "end_date" >= "start_date");--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_capacity_check" CHECK ("capacity" IS NULL OR "capacity" > 0);--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_status_check" CHECK ("status" IN ('planned', 'active', 'completed', 'cancelled'));--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_duration_weeks_check" CHECK ("duration_weeks" IS NULL OR "duration_weeks" > 0);--> statement-breakpoint
ALTER TABLE "program" ADD CONSTRAINT "program_min_age_check" CHECK ("min_age" IS NULL OR "min_age" >= 0);--> statement-breakpoint
ALTER TABLE "program" ADD CONSTRAINT "program_max_age_check" CHECK ("max_age" IS NULL OR "max_age" >= 0);--> statement-breakpoint
ALTER TABLE "program" ADD CONSTRAINT "program_age_range_check" CHECK (
        "min_age" IS NULL
        OR "max_age" IS NULL
        OR "min_age" <= "max_age"
      );