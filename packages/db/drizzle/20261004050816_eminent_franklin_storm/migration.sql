CREATE TABLE "class" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"course_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"code" varchar(50) NOT NULL UNIQUE,
	"start_date" date NOT NULL,
	"end_date" date,
	"capacity" integer,
	"status" text DEFAULT 'planned' NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_teacher" (
	"class_id" uuid,
	"teacher_id" uuid,
	"role" varchar(50) DEFAULT 'teacher' NOT NULL,
	"assigned_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "class_teacher_pkey" PRIMARY KEY("class_id","teacher_id")
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"program_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"slug" varchar(180) NOT NULL UNIQUE,
	"description" text,
	"level" varchar(50),
	"duration_weeks" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enrollment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_id" uuid NOT NULL,
	"class_id" uuid NOT NULL,
	"enrolled_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"category_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"slug" varchar(180) NOT NULL UNIQUE,
	"description" text,
	"min_age" integer,
	"max_age" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(150) NOT NULL,
	"slug" varchar(180) NOT NULL UNIQUE,
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_schedule" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"class_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"day_of_week" smallint NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"valid_from" date NOT NULL,
	"valid_until" date,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"class_id" uuid NOT NULL,
	"schedule_id" uuid NOT NULL,
	"scheduled_start_at" timestamp(6) with time zone NOT NULL,
	"scheduled_end_at" timestamp(6) with time zone NOT NULL,
	"actual_start_at" timestamp(6) with time zone,
	"actual_end_at" timestamp(6) with time zone,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"notes" text,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(150) NOT NULL,
	"address" text,
	"phone" varchar(30),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "room" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"location_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"capacity" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(150) NOT NULL,
	"email" varchar(255),
	"phone" varchar(30),
	"source" varchar(100),
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trial_booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"lead_id" uuid NOT NULL,
	"program_id" uuid NOT NULL,
	"student_name" varchar(150) NOT NULL,
	"scheduled_at" timestamp(6) with time zone NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"notes" text,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guardian_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL UNIQUE,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_code" varchar(50) NOT NULL UNIQUE,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100),
	"date_of_birth" date,
	"gender" varchar(30),
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_guardian" (
	"student_id" uuid,
	"guardian_id" uuid,
	"relationship" varchar(50) NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_guardian_pkey" PRIMARY KEY("student_id","guardian_id")
);
--> statement-breakpoint
CREATE TABLE "teacher_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL UNIQUE,
	"bio" text,
	"specialization" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attendance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"class_session_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"status" text NOT NULL,
	"marked_at" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE INDEX "class_course_id_idx" ON "class" ("course_id");--> statement-breakpoint
CREATE INDEX "class_teacher_teacher_id_idx" ON "class_teacher" ("teacher_id");--> statement-breakpoint
CREATE INDEX "course_program_id_idx" ON "course" ("program_id");--> statement-breakpoint
CREATE INDEX "enrollment_student_id_idx" ON "enrollment" ("student_id");--> statement-breakpoint
CREATE INDEX "enrollment_class_id_idx" ON "enrollment" ("class_id");--> statement-breakpoint
CREATE INDEX "program_category_id_idx" ON "program" ("category_id");--> statement-breakpoint
CREATE INDEX "class_schedule_class_id_idx" ON "class_schedule" ("class_id");--> statement-breakpoint
CREATE INDEX "class_schedule_room_id_idx" ON "class_schedule" ("room_id");--> statement-breakpoint
CREATE INDEX "class_schedule_day_idx" ON "class_schedule" ("day_of_week");--> statement-breakpoint
CREATE INDEX "class_session_class_id_idx" ON "class_session" ("class_id");--> statement-breakpoint
CREATE INDEX "class_session_schedule_id_idx" ON "class_session" ("schedule_id");--> statement-breakpoint
CREATE INDEX "class_session_scheduled_start_idx" ON "class_session" ("scheduled_start_at");--> statement-breakpoint
CREATE UNIQUE INDEX "room_location_name_idx" ON "room" ("location_id","name");--> statement-breakpoint
CREATE INDEX "trial_booking_lead_id_idx" ON "trial_booking" ("lead_id");--> statement-breakpoint
CREATE INDEX "trial_booking_program_id_idx" ON "trial_booking" ("program_id");--> statement-breakpoint
CREATE INDEX "trial_booking_scheduled_at_idx" ON "trial_booking" ("scheduled_at");--> statement-breakpoint
CREATE INDEX "student_guardian_guardian_id_idx" ON "student_guardian" ("guardian_id");--> statement-breakpoint
CREATE UNIQUE INDEX "attendance_class_session_student_idx" ON "attendance" ("class_session_id","student_id");--> statement-breakpoint
CREATE INDEX "attendance_student_id_idx" ON "attendance" ("student_id");--> statement-breakpoint
ALTER TABLE "class" ADD CONSTRAINT "class_course_id_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "class_teacher" ADD CONSTRAINT "class_teacher_class_id_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "class_teacher" ADD CONSTRAINT "class_teacher_teacher_id_teacher_profile_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher_profile"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_program_id_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_student_id_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_class_id_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "program" ADD CONSTRAINT "program_category_id_program_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "program_category"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_class_id_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "class_schedule" ADD CONSTRAINT "class_schedule_room_id_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "class_session" ADD CONSTRAINT "class_session_class_id_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "class_session" ADD CONSTRAINT "class_session_schedule_id_class_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "class_schedule"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_location_id_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "trial_booking" ADD CONSTRAINT "trial_booking_lead_id_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "lead"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "trial_booking" ADD CONSTRAINT "trial_booking_program_id_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "guardian_profile" ADD CONSTRAINT "guardian_profile_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "student_guardian" ADD CONSTRAINT "student_guardian_student_id_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "student_guardian" ADD CONSTRAINT "student_guardian_guardian_id_guardian_profile_id_fkey" FOREIGN KEY ("guardian_id") REFERENCES "guardian_profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "teacher_profile" ADD CONSTRAINT "teacher_profile_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_class_session_id_class_session_id_fkey" FOREIGN KEY ("class_session_id") REFERENCES "class_session"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_student_id_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT;