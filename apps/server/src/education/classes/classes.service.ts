import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { type Paginated, paginated } from '@/common/pagination.js';
import { rethrowAsHttp } from '@/common/pg-errors.js';
import { CoursesRepository } from '@/education/courses/courses.repository.js';
import {
  assertCapacityFitsEnrollment,
  assertDateRange,
  assertStatusTransition,
  type ClassStatus,
} from './class-rules.js';
import { type ClassRow, ClassesRepository } from './classes.repository.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { ListClassesDto } from './dto/list-classes.dto.js';
import { UpdateClassDto } from './dto/update-class.dto.js';

const CODE_TAKEN = 'A class with this code already exists';

@Injectable()
export class ClassesService {
  constructor(
    private readonly repo: ClassesRepository,
    private readonly courses: CoursesRepository,
  ) {}

  async list(query: ListClassesDto): Promise<Paginated<ClassRow>> {
    const { rows, total } = await this.repo.findMany(query);
    return paginated(rows, total, query);
  }

  async get(id: string): Promise<ClassRow> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException(`Class ${id} not found`);
    return row;
  }

  async create(dto: CreateClassDto): Promise<ClassRow> {
    // 1. Course exists  2. Course is active  3. Dates valid  4. Capacity valid (DTO + DB CHECK)
    const course = await this.courses.findById(dto.courseId);

    if (!course)
      throw new UnprocessableEntityException(
        `Course ${dto.courseId} does not exist`,
      );
    if (!course.isActive)
      throw new UnprocessableEntityException('Course is not active');

    assertDateRange(dto.startDate, dto.endDate);

    try {
      return await this.repo.insert({ ...dto, status: 'planned' });
    } catch (err) {
      rethrowAsHttp(err, { unique: CODE_TAKEN });
    }
  }

  async update(id: string, dto: UpdateClassDto): Promise<ClassRow> {
    const current = await this.get(id);

    assertDateRange(
      dto.startDate ?? current.startDate,
      dto.endDate ?? current.endDate,
    );

    if (dto.status)
      assertStatusTransition(current.status as ClassStatus, dto.status);

    // if (dto.capacity !== undefined && dto.capacity !== current.capacity) {
    //   assertCapacityFitsEnrollment(dto.capacity, await this.repo.countActiveEnrollments(id))
    // }

    try {
      const row = await this.repo.update(id, dto);
      if (!row) throw new NotFoundException(`Class ${id} not found`);
      return row;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      rethrowAsHttp(err, { unique: CODE_TAKEN });
    }
  }
}
