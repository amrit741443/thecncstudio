import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { type Paginated, paginated } from '@/common/pagination.js';
import { rethrowAsHttp } from '@/common/pg-errors.js';
import { slugify } from '@/common/slug.js';
import { ProgramsRepository } from '@/education/programs/programs.repository.js';
import { type Course, CoursesRepository } from './courses.repository.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { ListCoursesDto } from './dto/list-courses.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

const SLUG_TAKEN = 'A course with this slug already exists';

@Injectable()
export class CoursesService {
  constructor(
    private readonly repo: CoursesRepository,
    private readonly programs: ProgramsRepository,
  ) {}

  async list(query: ListCoursesDto): Promise<Paginated<Course>> {
    const { rows, total } = await this.repo.findMany(query);
    return paginated(rows, total, query);
  }

  async get(id: string): Promise<Course> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException(`Course ${id} not found`);
    return row;
  }

  async create(dto: CreateCourseDto): Promise<Course> {
    await this.assertProgramUsable(dto.programId);
    try {
      return await this.repo.insert({
        ...dto,
        slug: dto.slug ? slugify(dto.slug) : slugify(dto.name),
      });
    } catch (err) {
      rethrowAsHttp(err, { unique: SLUG_TAKEN });
    }
  }

  async update(id: string, dto: UpdateCourseDto): Promise<Course> {
    const current = await this.get(id);
    if (dto.programId && dto.programId !== current.programId)
      await this.assertProgramUsable(dto.programId);

    try {
      if (dto.name || dto.slug) {
        dto.slug = dto.slug ? slugify(dto.slug) : slugify(dto.name!);
      }

      const row = await this.repo.update(id, dto);
      if (!row) throw new NotFoundException(`Course ${id} not found`);
      return row;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      rethrowAsHttp(err, { unique: SLUG_TAKEN });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      if (!(await this.repo.delete(id)))
        throw new NotFoundException(`Course ${id} not found`);
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      rethrowAsHttp(err, {
        foreignKey:
          'Course has classes. Deactivate it instead (isActive: false).',
      });
    }
  }

  private async assertProgramUsable(programId: string) {
    const program = await this.programs.findById(programId);
    if (!program)
      throw new UnprocessableEntityException(
        `Program ${programId} does not exist`,
      );
    if (!program.isActive)
      throw new UnprocessableEntityException('Program is not active');
  }
}
