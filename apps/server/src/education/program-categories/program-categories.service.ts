import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type ProgramCategory,
  ProgramCategoriesRepository,
} from './program-repositories.js';
import { ListProgramCategoriesDto } from './dto/list-program-categories.dto.js';
import { CreateProgramCategoryDto } from './dto/create-program-category.dto.js';
import { Paginated, paginated } from '@/common/pagination.js';
import { rethrowAsHttp } from '@/common/pg-errors.js';
import { slugify } from '@/common/slug.js';
import { UpdateProgramCategoryDto } from './dto/update-porgram-category.dto.js';

@Injectable()
export class ProgramCategoriesService {
  constructor(private readonly repo: ProgramCategoriesRepository) {}

  async list(
    query: ListProgramCategoriesDto,
  ): Promise<Paginated<ProgramCategory>> {
    const { rows, total } = await this.repo.findAll(query);

    return paginated(rows, total, query);
  }

  async get(id: string): Promise<ProgramCategory> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException(`Program category ${id} not found`);
    return row;
  }

  async create(dto: CreateProgramCategoryDto): Promise<ProgramCategory> {
    try {
      return await this.repo.insert({
        ...dto,
        slug: dto.slug ? slugify(dto.slug) : slugify(dto.name),
      });
    } catch (err) {
      // The UNIQUE constraint is the real guard; a pre-check would race under concurrency.
      rethrowAsHttp(err, {
        unique: 'A category with this slug already exists',
      });
    }
  }

  async update(
    id: string,
    dto: UpdateProgramCategoryDto,
  ): Promise<ProgramCategory> {
    if (dto.name || dto.slug) {
      dto.slug = dto.slug ? slugify(dto.slug) : slugify(dto.name!);
    }

    try {
      const row = await this.repo.update(id, dto);
      if (!row) throw new NotFoundException(`Program category ${id} not found`);
      return row;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      rethrowAsHttp(err, {
        unique: 'A category with this slug already exists',
      });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      if (!(await this.repo.delete(id)))
        throw new NotFoundException(`Program category ${id} not found`);
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      rethrowAsHttp(err, {
        foreignKey:
          'Category still has programs. Deactivate it instead (isActive: false).',
      });
    }
  }
}
