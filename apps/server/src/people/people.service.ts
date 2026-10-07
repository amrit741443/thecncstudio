import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { PeopleRepository } from './people.repository.js';
import { CreateStudentDto, StudentStatus } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';

@Injectable()
export class PeopleService {
  constructor(private readonly repository: PeopleRepository) {}

  async createStudent(input: CreateStudentDto) {
    const studentCode = input.studentCode.trim();
    const existing = await this.repository.findStudentByCode(studentCode);

    if (existing) {
      throw new Error('Student code already exists');
    }

    return this.repository.createStudent({
      id: randomUUID(),
      studentCode,
      firstName: input.firstName.trim(),
      lastName: input.lastName?.trim() || null,
      dateOfBirth: input.dateOfBirth || null,
      gender: input.gender || null,
      status: input.status ?? StudentStatus.ACTIVE,
    });
  }

  async getStudent(id: string) {
    const student = await this.repository.findStudent(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async updateStudent(id: string, input: UpdateStudentDto) {
    const current = await this.getStudent(id);

    if (input.studentCode) {
      const duplicate = await this.repository.findStudentByCode(
        input.studentCode,
      );
      if (duplicate && duplicate.id !== current.id) {
        throw new Error('Student code already exists');
      }
    }

    const updated = await this.repository.updateStudent(id, {
      ...input,
      firstName: input.firstName?.trim(),
      lastName: input.lastName?.trim(),
      dateOfBirth: input.dateOfBirth || null,
    });

    return updated[0];
  }

  async listStudents() {
    return this.repository.listStudents();
  }
}
