import { Inject, Injectable } from '@nestjs/common';
import { eq, schema, type Database } from '@repo/db';

import { DRIZZLE } from '../database/database.module.js';

@Injectable()
export class PeopleRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async findStudent(id: string) {
    const [student] = await this.db
      .select()
      .from(schema.student)
      .where(eq(schema.student.id, id))
      .limit(1);
    return student;
  }

  async findStudentByCode(studentCode: string) {
    const [student] = await this.db
      .select()
      .from(schema.student)
      .where(eq(schema.student.studentCode, studentCode))
      .limit(1);
    return student;
  }

  async createStudent(input: typeof schema.student.$inferInsert) {
    return this.db.insert(schema.student).values(input).returning();
  }

  async updateStudent(
    id: string,
    input: Partial<typeof schema.student.$inferInsert>,
  ) {
    return this.db
      .update(schema.student)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(schema.student.id, id))
      .returning();
  }

  async listStudents() {
    return this.db
      .select()
      .from(schema.student)
      .orderBy(schema.student.firstName);
  }
}
