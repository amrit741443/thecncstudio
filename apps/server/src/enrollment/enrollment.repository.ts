import { Inject, Injectable } from '@nestjs/common';
import { and, eq, schema, type Database } from '@repo/db';

import { DRIZZLE } from '../database/database.module.js';

@Injectable()
export class EnrollmentRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async findByStudentAndClass(studentId: string, classId: string) {
    return this.db
      .select()
      .from(schema.enrollment)
      .where(
        and(
          eq(schema.enrollment.studentId, studentId),
          eq(schema.enrollment.classId, classId),
        ),
      );
  }

  async countActiveForClass(classId: string) {
    return this.db
      .select()
      .from(schema.enrollment)
      .where(
        and(
          eq(schema.enrollment.classId, classId),
          eq(schema.enrollment.status, 'active'),
        ),
      )
      .then((rows) => rows.length);
  }

  async create(input: typeof schema.enrollment.$inferInsert) {
    return this.db.insert(schema.enrollment).values(input).returning();
  }

  async list() {
    return this.db
      .select()
      .from(schema.enrollment)
      .orderBy(schema.enrollment.enrolledAt);
  }
}
