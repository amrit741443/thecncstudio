import { UnprocessableEntityException } from "@nestjs/common"
import type { ProgramCategoriesRepository } from "../program-categories/program-categories.repository.js"
import type { Program, ProgramsRepository } from "./programs.repository.js"
import { ProgramsService } from "./programs.service.js"

const existing = { id: "p1", categoryId: "cat1", name: "Robotics", slug: "robotics", minAge: 6, maxAge: 12, isActive: true } as Program

function setup(category: { isActive: boolean } | null = { isActive: true }) {
  const inserted: object[] = []
  const repo = {
    findById: async () => existing,
    insert: async (v: object) => { inserted.push(v); return { ...existing, ...v } as Program },
    update: async (_id: string, v: object) => ({ ...existing, ...v }) as Program,
  } as unknown as ProgramsRepository
  const categories = { findById: async () => category ?? undefined } as unknown as ProgramCategoriesRepository
  return { service: new ProgramsService(repo, categories), inserted }
}

const dto = { categoryId: "cat1", name: "Digital Art", minAge: 5, maxAge: 10 }

describe("ProgramsService", () => {
  it("generates a slug from the name", async () => {
    const { service, inserted } = setup()
    await service.create(dto)
    expect(inserted[0]).toMatchObject({ slug: "digital-art" })
  })

  it("rejects minAge > maxAge", async () => {
    await expect(setup().service.create({ ...dto, minAge: 11 })).rejects.toThrow(/minAge/)
  })

  it("rejects an unknown or inactive category", async () => {
    await expect(setup(null).service.create(dto)).rejects.toThrow(UnprocessableEntityException)
    await expect(setup({ isActive: false }).service.create(dto)).rejects.toThrow(/not active/)
  })

  it("validates the merged age range on PATCH (existing max is 12)", async () => {
    const { service } = setup()
    await expect(service.update("p1", { minAge: 13 })).rejects.toThrow(/minAge/)
    await expect(service.update("p1", { minAge: 8 })).resolves.toMatchObject({ minAge: 8 })
  })
})
