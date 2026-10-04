import * as t from "drizzle-orm/pg-core"
import { classTable } from "./education.js"

export const location = t.pgTable("location", {
  id: t.uuid("id").defaultRandom().primaryKey(),

  name: t.varchar("name", { length: 150 }).notNull(),

  address: t.text("address"),

  phone: t.varchar("phone", { length: 30 }),

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

export const room = t.pgTable(
  "room",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    locationId: t
      .uuid("location_id")
      .notNull()
      .references(() => location.id, {
        onDelete: "restrict",
      }),

    name: t.varchar("name", { length: 100 }).notNull(),

    capacity: t.integer("capacity"),

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
    t.uniqueIndex("room_location_name_idx").on(table.locationId, table.name),
  ]
)

export const classSchedule = t.pgTable(
  "class_schedule",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    classId: t
      .uuid("class_id")
      .notNull()
      .references(() => classTable.id, {
        onDelete: "cascade",
      }),

    roomId: t
      .uuid("room_id")
      .notNull()
      .references(() => room.id, {
        onDelete: "restrict",
      }),

    dayOfWeek: t.smallint("day_of_week").notNull(),

    startTime: t.time("start_time").notNull(),

    endTime: t.time("end_time").notNull(),

    validFrom: t.date("valid_from").notNull(),

    validUntil: t.date("valid_until"),

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
    t.index("class_schedule_class_id_idx").on(table.classId),

    t.index("class_schedule_room_id_idx").on(table.roomId),

    t.index("class_schedule_day_idx").on(table.dayOfWeek),
  ]
)

export const classSession = t.pgTable(
  "class_session",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),

    classId: t
      .uuid("class_id")
      .notNull()
      .references(() => classTable.id, {
        onDelete: "restrict",
      }),

    scheduleId: t
      .uuid("schedule_id")
      .notNull()
      .references(() => classSchedule.id, {
        onDelete: "restrict",
      }),

    scheduledStartAt: t
      .timestamp("scheduled_start_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull(),

    scheduledEndAt: t
      .timestamp("scheduled_end_at", {
        precision: 6,
        withTimezone: true,
      })
      .notNull(),

    actualStartAt: t.timestamp("actual_start_at", {
      precision: 6,
      withTimezone: true,
    }),

    actualEndAt: t.timestamp("actual_end_at", {
      precision: 6,
      withTimezone: true,
    }),

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
    t.index("class_session_class_id_idx").on(table.classId),

    t.index("class_session_schedule_id_idx").on(table.scheduleId),

    t.index("class_session_scheduled_start_idx").on(table.scheduledStartAt),
  ]
)
