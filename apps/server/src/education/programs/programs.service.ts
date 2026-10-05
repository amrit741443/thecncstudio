import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { type Paginated, paginated } from '@/common/pagination.js';
import { rethrowAsHttp } from '@/common/pg-errors.js';
import { slugify } from '@/common/slug.js';
import { ProgramCategoriesRepository } from '@/education/program-categories/program-categories.repositories.js';
import { CreateProgramDto } from './dto/create-program.dto.js';
import { ListProgramsDto } from './dto/list-programs.dto.js';
import { UpdateProgramDto } from './dto/update-program.dto.js';
import { type Program, ProgramsRepository } from './programs.repository.js';

const SLUG_TAKEN = 'A program with this slug already exists';

@Injectable()
export class ProgramsService {
  constructor(
    private readonly repo: ProgramsRepository,
    private readonly categories: ProgramCategoriesRepository,
  ) {}

  async list(query: ListProgramsDto): Promise<Paginated<Program>> {
    const { rows, total } = await this.repo.findMany(query);
    return paginated(rows, total, query);
  }

  async get(id: string): Promise<Program> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException(`Program ${id} not found`);
    return row;
  }

  async create(dto: CreateProgramDto): Promise<Program> {
    this.assertAgeRange(dto.minAge, dto.maxAge);
    await this.assertCategoryUsable(dto.categoryId);
    try {
      return await this.repo.insert({
        ...dto,
        slug: dto.slug ?? slugify(dto.name),
      });
    } catch (err) {
      rethrowAsHttp(err, { unique: SLUG_TAKEN });
    }
  }

  async update(id: string, dto: UpdateProgramDto): Promise<Program> {
    const current = await this.get(id);
    // PATCH sends only some fields, so validate the MERGED result, not just the patch.
    this.assertAgeRange(
      dto.minAge ?? current.minAge,
      dto.maxAge ?? current.maxAge,
    );
    if (dto.categoryId && dto.categoryId !== current.categoryId)
      await this.assertCategoryUsable(dto.categoryId);
    try {
      if (dto.name || dto.slug) {
        dto.slug = dto.slug ?? dto.name;
      }

      const row = await this.repo.update(id, dto);
      if (!row) throw new NotFoundException(`Program ${id} not found`);
      return row;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      rethrowAsHttp(err, { unique: SLUG_TAKEN });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      if (!(await this.repo.delete(id)))
        throw new NotFoundException(`Program ${id} not found`);
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      rethrowAsHttp(err, {
        foreignKey:
          'Program is referenced by courses or trial bookings. Deactivate it instead (isActive: false).',
      });
    }
  }

  private assertAgeRange(minAge: number | null, maxAge: number | null) {
    if (minAge == null || maxAge == null) return;
    if (minAge > maxAge)
      throw new UnprocessableEntityException(
        'minAge must be less than or equal to maxAge',
      );
  }

  private async assertCategoryUsable(categoryId: string) {
    const category = await this.categories.findById(categoryId);
    if (!category)
      throw new UnprocessableEntityException(
        `Program category ${categoryId} does not exist`,
      );
    if (!category.isActive)
      throw new UnprocessableEntityException('Program category is not active');
  }
}
