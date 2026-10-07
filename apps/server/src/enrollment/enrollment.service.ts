import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { eq, schema, type Database } from '@repo/db';

import { DRIZZLE } from '../database/database.module.js';
import { EnrollmentRepository } from './enrollment.repository.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly repository: EnrollmentRepository,
    @Inject(DRIZZLE) private readonly db: Database,
  ) {}

  async create(input: CreateEnrollmentDto) {
    const [student] = await this.db
      .select()
      .from(schema.student)
      .where(eq(schema.student.id, input.studentId));
    const [classRecord] = await this.db
      .select()
      .from(schema.classTable)
      .where(eq(schema.classTable.id, input.classId));

    if (!student) throw new NotFoundException('Student not found');
    if (!classRecord) throw new NotFoundException('Class not found');

    const existing = await this.repository.findByStudentAndClass(
      input.studentId,
      input.classId,
    );
    if (existing.some((record) => record.status === 'active')) {
      throw new Error('Student is already enrolled in this class');
    }

    if (classRecord.capacity) {
      const activeCount = await this.repository.countActiveForClass(
        input.classId,
      );
      if (activeCount >= classRecord.capacity) {
        throw new Error('Class capacity has been reached');
      }
    }

    return this.repository.create({
      id: randomUUID(),
      studentId: input.studentId,
      classId: input.classId,
      status: 'active',
      enrolledAt: new Date(),
      startDate: input.startDate,
      endDate: input.endDate || null,
    });
  }

  async list() {
    return this.repository.list();
  }
}
