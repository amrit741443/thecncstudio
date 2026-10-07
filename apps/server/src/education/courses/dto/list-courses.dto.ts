import { IsBoolean, IsOptional, IsUUID } from "class-validator"
import { ToBoolean } from "../../../common/boolean-query.js"
import { PaginationQueryDto } from "../../../common/pagination.js"

export class ListCoursesDto extends PaginationQueryDto {
  @IsOptional() @IsUUID() programId?: string
  @IsOptional() @ToBoolean() @IsBoolean() isActive?: boolean
}
