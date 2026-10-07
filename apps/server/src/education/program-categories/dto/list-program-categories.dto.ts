import { IsBoolean, IsOptional } from 'class-validator';

import { ToBoolean } from '@/common/boolean-query.js';

import { PaginationQueryDto } from '@/common/pagination.js';

export class ListProgramCategoriesDto extends PaginationQueryDto {
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  isActive?: boolean;
}
