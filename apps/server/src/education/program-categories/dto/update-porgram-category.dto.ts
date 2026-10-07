import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramCategoryDto } from './create-program-category.dto.js';

export class UpdateProgramCategoryDto extends PartialType(
  CreateProgramCategoryDto,
) {}
