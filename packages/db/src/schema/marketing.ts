import * as t from "drizzle-orm/pg-core"
import { program } from "./education.js"

export const lead = t.pgTable("lead", {
  id: t.uuid("id").defaultRandom().primaryKey(),

  name: t.varchar("name", { length: 150 }).notNull(),

  email: t.varchar("email", { length: 255 }),

  phone: t.varchar("phone", { length: 30 }),

  source: t.varchar("source", { length: 100 }),

  status: t.text("status").notNull().default("new"),

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

export const trialBooking = t.pgTable(
  "trial_booking",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    leadId: t
      .uuid("lead_id")
      .notNull()
      .references(() => lead.id, {
        onDelete: "cascade",
      }),

    programId: t
      .uuid("program_id")
      .notNull()
      .references(() => program.id, {
        onDelete: "restrict",
      }),

    studentName: t.varchar("student_name", { length: 150 }).notNull(),

    scheduledAt: t
      .timestamp("scheduled_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull(),

    status: t.text("status").notNull().default("scheduled"),

    notes: t.text("notes"),

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
    t.index("trial_booking_lead_id_idx").on(table.leadId),

    t.index("trial_booking_program_id_idx").on(table.programId),

    t.index("trial_booking_scheduled_at_idx").on(table.scheduledAt),
  ]
)
