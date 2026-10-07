import { IsIn, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '@/common/pagination.js';
import { CLASS_STATUSES, type ClassStatus } from '../class-rules.js';

export class ListClassesDto extends PaginationQueryDto {
  @IsOptional() @IsUUID() courseId?: string;
  @IsOptional() @IsIn(CLASS_STATUSES) status?: ClassStatus;
}
