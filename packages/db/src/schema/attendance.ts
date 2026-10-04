import * as t from "drizzle-orm/pg-core"
import { classSession } from "./scheduling.js"
import { student } from "./people.js"

export const attendance = t.pgTable(
  "attendance",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    classSessionId: t
      .uuid("class_session_id")
      .notNull()
      .references(() => classSession.id, {
        onDelete: "cascade",
      }),

    studentId: t
      .uuid("student_id")
      .notNull()
      .references(() => student.id, {
        onDelete: "restrict",
      }),

    status: t.text("status").notNull(),

    markedAt: t
      .timestamp("marked_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull()
      .defaultNow(),

    notes: t.text("notes"),
  },
  (table) => [
    t
      .uniqueIndex("attendance_class_session_student_idx")
      .on(table.classSessionId, table.studentId),

    t.index("attendance_student_id_idx").on(table.studentId),
  ]
)
