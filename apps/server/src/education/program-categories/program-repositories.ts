import { DRIZZLE } from '@/database/database.module.js';
import { Injectable } from '@nestjs/common/decorators/core/index.js';
import { Inject } from '@nestjs/common/decorators/core/index.js';
import { type Database, programCategory } from '@repo/db';
import { and, eq } from 'drizzle-orm/sql/expressions/conditions';
import { asc } from 'drizzle-orm/sql/expressions/select';
import { count } from 'drizzle-orm/sql/functions/aggregate';
import { SQL } from 'drizzle-orm/sql/sql';

export type ProgramCategory = typeof programCategory.$inferSelect;
export type NewProgramCategory = typeof programCategory.$inferInsert;

@Injectable()
export class ProgramCategoriesRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async findAll(filter: { isActive?: boolean; limit: number; offset: number }) {
    const where: SQL | undefined =
      filter.isActive === undefined
        ? undefined
        : and(eq(programCategory.isActive, filter.isActive));

    const [rows, [{ total }]] = await Promise.all([
      this.db
        .select()
        .from(programCategory)
        .where(where)
        .limit(filter.limit)
        .offset(filter.offset)
        .orderBy(asc(programCategory.name)),
      this.db.select({ total: count() }).from(programCategory).where(where),
    ]);

    return { rows, total };
  }
  async findById(id: string): Promise<ProgramCategory | undefined> {
    const [row] = await this.db
      .select()
      .from(programCategory)
      .where(eq(programCategory.id, id));
    return row;
  }

  async findBySlug(slug: string): Promise<ProgramCategory | undefined> {
    const [row] = await this.db
      .select()
      .from(programCategory)
      .where(eq(programCategory.slug, slug));
    return row;
  }

  async insert(values: NewProgramCategory): Promise<ProgramCategory> {
    const [row] = await this.db
      .insert(programCategory)
      .values(values)
      .returning();
    return row;
  }

  async update(
    id: string,
    values: Partial<NewProgramCategory>,
  ): Promise<ProgramCategory | undefined> {
    // defaultNow() only covers INSERT, so every UPDATE must set updatedAt itself.
    const [row] = await this.db
      .update(programCategory)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(programCategory.id, id))
      .returning();
    return row;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(programCategory)
      .where(eq(programCategory.id, id))
      .returning({ id: programCategory.id });
    return rows.length > 0;
  }
}
