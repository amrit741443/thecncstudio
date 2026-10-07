import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;
}

export interface Paginated<T> {
  data: T[];
  meta: { total: number; limit: number; offset: number };
}

export function paginated<T>(
  data: T[],
  total: number,
  q: PaginationQueryDto,
): Paginated<T> {
  return { meta: { total, limit: q.limit, offset: q.offset }, data };
}
