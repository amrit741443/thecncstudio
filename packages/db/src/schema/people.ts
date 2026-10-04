import * as t from "drizzle-orm/pg-core"
import { user } from "./auth.js"

export const teacherProfile = t.pgTable("teacher_profile", {
  id: t.uuid("id").defaultRandom().primaryKey(),

  userId: t
    .text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  bio: t.text("bio"),

  specialization: t.text("specialization"),

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
})

export const guardianProfile = t.pgTable("guardian_profile", {
  id: t.uuid("id").defaultRandom().primaryKey(),

  userId: t
    .text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

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

export const student = t.pgTable("student", {
  id: t.uuid("id").defaultRandom().primaryKey(),

  studentCode: t.varchar("student_code", { length: 50 }).notNull().unique(),

  firstName: t.varchar("first_name", { length: 100 }).notNull(),

  lastName: t.varchar("last_name", { length: 100 }),

  dateOfBirth: t.date("date_of_birth"),

  gender: t.varchar("gender", { length: 30 }),

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
})

export const studentGuardian = t.pgTable(
  "student_guardian",
  {
    studentId: t
      .uuid("student_id")
      .notNull()
      .references(() => student.id, {
        onDelete: "cascade",
      }),

    guardianId: t
      .uuid("guardian_id")
      .notNull()
      .references(() => guardianProfile.id, {
        onDelete: "cascade",
      }),

    relationship: t.varchar("relationship", { length: 50 }).notNull(),

    isPrimary: t.boolean("is_primary").notNull().default(false),

    createdAt: t
      .timestamp("created_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    t.primaryKey({
      columns: [table.studentId, table.guardianId],
    }),

    t.index("student_guardian_guardian_id_idx").on(table.guardianId),
  ]
)
