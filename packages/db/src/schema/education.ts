import * as t from "drizzle-orm/pg-core"
import { teacherProfile, student } from "./people.js"
import { sql } from "drizzle-orm"

export const programCategory = t.pgTable("program_category", {
  id: t.uuid("id").defaultRandom().primaryKey(),

  name: t.varchar("name", { length: 150 }).notNull(),

  slug: t.varchar("slug", { length: 180 }).notNull().unique(),

  description: t.text("description"),

  sortOrder: t.integer("sort_order").notNull().default(0),

  isActive: t.boolean("is_active").notNull().default(true),

  createdAt: t
    .timestamp("created_at", {
      precision: 6,
      withTimezone: true,
    })
    .notNull()
    .defaultNow(),

  updatedAt: t
    .timestamp("updated_at", {
      precision: 6,
      withTimezone: true,
    })
    .notNull()
    .defaultNow(),
})

export const program = t.pgTable(
  "program",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    categoryId: t
      .uuid("category_id")
      .notNull()
      .references(() => programCategory.id, {
        onDelete: "restrict",
      }),

    name: t.varchar("name", { length: 150 }).notNull(),

    slug: t.varchar("slug", { length: 180 }).notNull().unique(),

    description: t.text("description"),

    minAge: t.integer("min_age"),

    maxAge: t.integer("max_age"),

    isActive: t.boolean("is_active").notNull().default(true),

    createdAt: t
      .timestamp("created_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),

    updatedAt: t
      .timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    t.index("program_category_id_idx").on(table.categoryId),
    t.check(
      "program_min_age_check",
      sql`${table.minAge} IS NULL OR ${table.minAge} >= 0`
    ),

    t.check(
      "program_max_age_check",
      sql`${table.maxAge} IS NULL OR ${table.maxAge} >= 0`
    ),

    t.check(
      "program_age_range_check",
      sql`
        ${table.minAge} IS NULL
        OR ${table.maxAge} IS NULL
        OR ${table.minAge} <= ${table.maxAge}
      `
    ),
  ]
)

export const course = t.pgTable(
  "course",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    programId: t
      .uuid("program_id")
      .notNull()
      .references(() => program.id, {
        onDelete: "restrict",
      }),

    name: t.varchar("name", { length: 150 }).notNull(),

    slug: t.varchar("slug", { length: 180 }).notNull(),

    description: t.text("description"),

    level: t.varchar("level", { length: 50 }),

    durationWeeks: t.integer("duration_weeks"),

    isActive: t.boolean("is_active").notNull().default(true),

    createdAt: t
      .timestamp("created_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),

    updatedAt: t
      .timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    t.unique("program_slug_unique").on(table.programId, table.slug),
    t.index("course_program_id_idx").on(table.programId),
    t.check(
      "course_duration_weeks_check",
      sql`${table.durationWeeks} IS NULL OR ${table.durationWeeks} > 0`
    ),
  ]
)

export const classTable = t.pgTable(
  "class",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    courseId: t
      .uuid("course_id")
      .notNull()
      .references(() => course.id, {
        onDelete: "restrict",
      }),

    name: t.varchar("name", { length: 150 }).notNull(),

    code: t.varchar("code", { length: 50 }).notNull().unique(),

    startDate: t.date("start_date").notNull(),

    endDate: t.date("end_date"),

    capacity: t.integer("capacity"),

    status: t.text("status").notNull().default("planned"),

    createdAt: t
      .timestamp("created_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),

    updatedAt: t
      .timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    t.index("class_course_id_idx").on(table.courseId),

    t.check(
      "class_end_date_check",
      sql`${table.endDate} IS NULL OR ${table.endDate} >= ${table.startDate}`
    ),

    t.check(
      "class_capacity_check",
      sql`${table.capacity} IS NULL OR ${table.capacity} > 0`
    ),

    t.check(
      "class_status_check",
      sql`${table.status} IN ('planned', 'active', 'completed', 'cancelled')`
    ),
  ]
)

export const classTeacher = t.pgTable(
  "class_teacher",
  {
    classId: t
      .uuid("class_id")
      .notNull()
      .references(() => classTable.id, {
        onDelete: "cascade",
      }),

    teacherId: t
      .uuid("teacher_id")
      .notNull()
      .references(() => teacherProfile.id, {
        onDelete: "restrict",
      }),

    role: t.varchar("role", { length: 50 }).notNull().default("teacher"),

    assignedAt: t
      .timestamp("assigned_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    t.primaryKey({
      columns: [table.classId, table.teacherId],
    }),

    t.index("class_teacher_teacher_id_idx").on(table.teacherId),
  ]
)

export const enrollment = t.pgTable(
  "enrollment",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    studentId: t
      .uuid("student_id")
      .notNull()
      .references(() => student.id, {
        onDelete: "restrict",
      }),

    classId: t
      .uuid("class_id")
      .notNull()
      .references(() => classTable.id, {
        onDelete: "restrict",
      }),

    enrolledAt: t
      .timestamp("enrolled_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),

    startDate: t.date("start_date").notNull(),

    endDate: t.date("end_date"),

    status: t.text("status").notNull().default("active"),

    createdAt: t
      .timestamp("created_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),

    updatedAt: t
      .timestamp("updated_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    t.index("enrollment_student_id_idx").on(table.studentId),

    t.index("enrollment_class_id_idx").on(table.classId),
  ]
)
