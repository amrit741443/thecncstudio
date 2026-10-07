import { Inject, Injectable } from '@nestjs/common';
import { and, eq, schema, type Database } from '@repo/db';
import { DRIZZLE } from '../database/database.module.js';

@Injectable()
export class AttendanceRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async findByStudentAndSession(studentId: string, classSessionId: string) {
    return this.db
      .select()
      .from(schema.attendance)
      .where(
        and(
          eq(schema.attendance.studentId, studentId),
          eq(schema.attendance.classSessionId, classSessionId),
        ),
      );
  }

  async create(input: typeof schema.attendance.$inferInsert) {
    return this.db.insert(schema.attendance).values(input).returning();
  }
}
