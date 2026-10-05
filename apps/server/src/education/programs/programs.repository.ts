import { DRIZZLE } from '@/database/database.module.js';
import { Injectable } from '@nestjs/common/decorators/core/index.js';
import { Inject } from '@nestjs/common/decorators/core/index.js';
import { type Database, program } from '@repo/db';
import { and, asc, count, eq, type SQL } from 'drizzle-orm';

export type Program = typeof program.$inferSelect;
export type NewProgram = typeof program.$inferInsert;

@Injectable()
export class ProgramsRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async findMany(f: {
    categoryId?: string;
    isActive?: boolean;
    limit: number;
    offset: number;
  }) {
    const conditions: SQL[] = [];
    if (f.categoryId) conditions.push(eq(program.categoryId, f.categoryId));
    if (f.isActive !== undefined)
      conditions.push(eq(program.isActive, f.isActive));
    const where = conditions.length ? and(...conditions) : undefined;
    const [rows, [{ total }]] = await Promise.all([
      this.db
        .select()
        .from(program)
        .where(where)
        .orderBy(asc(program.name))
        .limit(f.limit)
        .offset(f.offset),
      this.db.select({ total: count() }).from(program).where(where),
    ]);
    return { rows, total };
  }

  async findById(id: string): Promise<Program | undefined> {
    const [row] = await this.db
      .select()
      .from(program)
      .where(eq(program.id, id));
    return row;
  }

  async insert(values: NewProgram): Promise<Program> {
    const [row] = await this.db.insert(program).values(values).returning();
    return row;
  }

  async update(
    id: string,
    values: Partial<NewProgram>,
  ): Promise<Program | undefined> {
    const [row] = await this.db
      .update(program)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(program.id, id))
      .returning();
    return row;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(program)
      .where(eq(program.id, id))
      .returning({ id: program.id });
    return rows.length > 0;
  }
}
