import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { eq, schema, type Database } from '@repo/db';
import { Inject } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module.js';
import { AttendanceRepository } from './attendance.repository.js';
import { MarkAttendanceDto } from './dto/mark-attendance.dto.js';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly repository: AttendanceRepository,
    @Inject(DRIZZLE) private readonly db: Database,
  ) {}

  async mark(input: MarkAttendanceDto) {
    const [student] = await this.db
      .select()
      .from(schema.student)
      .where(eq(schema.student.id, input.studentId));
    const [session] = await this.db
      .select()
      .from(schema.classSession)
      .where(eq(schema.classSession.id, input.classSessionId));
    if (!student) throw new NotFoundException('Student not found');
    if (!session) throw new NotFoundException('Class session not found');

    const existing = await this.repository.findByStudentAndSession(
      input.studentId,
      input.classSessionId,
    );
    if (existing.length)
      throw new Error('Attendance already marked for this student and session');

    return this.repository.create({
      id: randomUUID(),
      studentId: input.studentId,
      classSessionId: input.classSessionId,
      status: input.status,
      markedAt: new Date(),
      notes: input.notes || null,
    });
  }
}
