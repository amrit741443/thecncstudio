import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '@/database/database.module.js';
import { and, asc, count, eq, type SQL } from 'drizzle-orm';

import { type Database, course } from '@repo/db';

export type Course = typeof course.$inferSelect;
export type NewCourse = typeof course.$inferInsert;

@Injectable()
export class CoursesRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async findMany(f: {
    programId?: string;
    isActive?: boolean;
    limit: number;
    offset: number;
  }) {
    const conditions: SQL[] = [];
    if (f.programId) conditions.push(eq(course.programId, f.programId));
    if (f.isActive !== undefined)
      conditions.push(eq(course.isActive, f.isActive));
    const where = conditions.length ? and(...conditions) : undefined;
    const [rows, [{ total }]] = await Promise.all([
      this.db
        .select()
        .from(course)
        .where(where)
        .orderBy(asc(course.name))
        .limit(f.limit)
        .offset(f.offset),
      this.db.select({ total: count() }).from(course).where(where),
    ]);
    return { rows, total };
  }

  async findById(id: string): Promise<Course | undefined> {
    const [row] = await this.db.select().from(course).where(eq(course.id, id));
    return row;
  }

  async insert(values: NewCourse): Promise<Course> {
    const [row] = await this.db.insert(course).values(values).returning();
    return row;
  }

  async update(
    id: string,
    values: Partial<NewCourse>,
  ): Promise<Course | undefined> {
    const [row] = await this.db
      .update(course)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(course.id, id))
      .returning();
    return row;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(course)
      .where(eq(course.id, id))
      .returning({ id: course.id });
    return rows.length > 0;
  }
}
