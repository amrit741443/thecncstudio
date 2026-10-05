import { ConflictException, NotFoundException, UnprocessableEntityException } from "@nestjs/common"
import { ClassesService } from "./classes.service.js"
import type { ClassRow, ClassesRepository } from "./classes.repository.js"
import type { CoursesRepository } from "../courses/courses.repository.js"

const baseClass = {
  id: "c1", courseId: "course1", name: "Robotics A", code: "ROB-A",
  startDate: "2026-10-01", endDate: "2026-12-01", capacity: 10, status: "planned",
} as ClassRow

function setup(opts: { course?: { isActive: boolean } | undefined; current?: ClassRow; enrolled?: number; insertError?: unknown } = {}) {
  const calls = { insert: 0, update: 0 }
  const repo = {
    findById: async () => opts.current,
    insert: async (v: object) => {
      calls.insert++
      if (opts.insertError) throw opts.insertError
      return { ...baseClass, ...v } as ClassRow
    },
    update: async (_id: string, v: object) => { calls.update++; return { ...(opts.current ?? baseClass), ...v } as ClassRow },
    countActiveEnrollments: async () => opts.enrolled ?? 0,
  } as unknown as ClassesRepository
  const courses = { findById: async () => opts.course } as unknown as CoursesRepository
  return { service: new ClassesService(repo, courses), calls }
}

const dto = { courseId: "course1", name: "Robotics A", code: "ROB-A", startDate: "2026-10-01", endDate: "2026-12-01", capacity: 10 }

describe("ClassesService.create", () => {
  it("creates a planned class for an active course", async () => {
    const { service, calls } = setup({ course: { isActive: true } })
    expect((await service.create(dto)).status).toBe("planned")
    expect(calls.insert).toBe(1)
  })

  it("rejects a missing course and never inserts", async () => {
    const { service, calls } = setup({ course: undefined })
    await expect(service.create(dto)).rejects.toThrow(UnprocessableEntityException)
    expect(calls.insert).toBe(0)
  })

  it("rejects an inactive course", async () => {
    const { service } = setup({ course: { isActive: false } })
    await expect(service.create(dto)).rejects.toThrow(/not active/)
  })

  it("rejects endDate before startDate", async () => {
    const { service } = setup({ course: { isActive: true } })
    await expect(service.create({ ...dto, endDate: "2026-09-01" })).rejects.toThrow(/endDate/)
  })

  it("turns a unique-violation on code into 409", async () => {
    // Shape of a wrapped driver error: DrizzleQueryError.cause = postgres.js error.
    const dbError = Object.assign(new Error("query failed"), { cause: { code: "23505", constraint_name: "class_code_unique" } })
    const { service } = setup({ course: { isActive: true }, insertError: dbError })
    await expect(service.create(dto)).rejects.toThrow(ConflictException)
  })

  it("does not swallow unknown database errors", async () => {
    const { service } = setup({ course: { isActive: true }, insertError: new Error("connection lost") })
    await expect(service.create(dto)).rejects.toThrow("connection lost")
  })
})

describe("ClassesService.update", () => {
  it("404s for an unknown class", async () => {
    const { service } = setup({ current: undefined })
    await expect(service.update("nope", { name: "x" })).rejects.toThrow(NotFoundException)
  })

  it("validates dates against the MERGED values (patch only sends endDate)", async () => {
    const { service, calls } = setup({ current: baseClass })
    await expect(service.update("c1", { endDate: "2026-09-01" })).rejects.toThrow(/endDate/)
    expect(calls.update).toBe(0)
  })

  it("blocks lowering capacity below active enrollments", async () => {
    const { service } = setup({ current: baseClass, enrolled: 8 })
    await expect(service.update("c1", { capacity: 5 })).rejects.toThrow(/currently enrolled/)
  })

  it("allows lowering capacity down to the enrolled count", async () => {
    const { service } = setup({ current: baseClass, enrolled: 8 })
    expect((await service.update("c1", { capacity: 8 })).capacity).toBe(8)
  })

  it("blocks reviving a cancelled class", async () => {
    const { service } = setup({ current: { ...baseClass, status: "cancelled" } })
    await expect(service.update("c1", { status: "active" })).rejects.toThrow(/Cannot change class status/)
  })
})
