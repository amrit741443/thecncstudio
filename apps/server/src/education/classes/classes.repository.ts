import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '@/database/database.module.js';
import { and, desc, count, eq, type SQL } from 'drizzle-orm';

import { type Database, classTable } from '@repo/db';
export type ClassRow = typeof classTable.$inferSelect;
export type NewClass = typeof classTable.$inferInsert;

@Injectable()
export class ClassesRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async findMany(f: {
    courseId?: string;
    status?: string;
    limit: number;
    offset: number;
  }) {
    const conditions: SQL[] = [];
    if (f.courseId) conditions.push(eq(classTable.courseId, f.courseId));
    if (f.status) conditions.push(eq(classTable.status, f.status));
    const where = conditions.length ? and(...conditions) : undefined;
    const [rows, [{ total }]] = await Promise.all([
      this.db
        .select()
        .from(classTable)
        .where(where)
        .orderBy(desc(classTable.startDate))
        .limit(f.limit)
        .offset(f.offset),
      this.db.select({ total: count() }).from(classTable).where(where),
    ]);
    return { rows, total };
  }

  async findById(id: string): Promise<ClassRow | undefined> {
    const [row] = await this.db
      .select()
      .from(classTable)
      .where(eq(classTable.id, id));
    return row;
  }

  async insert(values: NewClass): Promise<ClassRow> {
    const [row] = await this.db.insert(classTable).values(values).returning();
    return row;
  }

  async update(
    id: string,
    values: Partial<NewClass>,
  ): Promise<ClassRow | undefined> {
    const [row] = await this.db
      .update(classTable)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(classTable.id, id))
      .returning();
    return row;
  }

  // async countActiveEnrollments(classId: string): Promise<number> {
  //   const [{ n }] = await this.db
  //     .select({ n: count() })
  //     .from(enrollment)
  //     .where(
  //       and(eq(enrollment.classId, classId), eq(enrollment.status, 'active')),
  //     );
  //   return n;
  // }
}
