import { UnprocessableEntityException } from "@nestjs/common"
import { assertCapacityFitsEnrollment, assertDateRange, assertStatusTransition } from "./class-rules.js"

describe("class rules", () => {
  it("accepts equal and later end dates, rejects earlier", () => {
    expect(() => assertDateRange("2026-10-01", "2026-10-01")).not.toThrow()
    expect(() => assertDateRange("2026-10-01", "2026-12-01")).not.toThrow()
    expect(() => assertDateRange("2026-10-02", "2026-10-01")).toThrow(UnprocessableEntityException)
  })

  it.each([
    ["planned", "active"], ["planned", "cancelled"], ["active", "completed"], ["active", "cancelled"], ["active", "active"],
  ] as const)("allows %s -> %s", (from, to) => {
    expect(() => assertStatusTransition(from, to)).not.toThrow()
  })

  it.each([
    ["planned", "completed"], ["active", "planned"], ["completed", "active"], ["cancelled", "planned"], ["cancelled", "active"],
  ] as const)("rejects %s -> %s", (from, to) => {
    expect(() => assertStatusTransition(from, to)).toThrow(UnprocessableEntityException)
  })

  it("rejects capacity below current active enrollments, allows equal", () => {
    expect(() => assertCapacityFitsEnrollment(5, 6)).toThrow(UnprocessableEntityException)
    expect(() => assertCapacityFitsEnrollment(6, 6)).not.toThrow()
  })
})
