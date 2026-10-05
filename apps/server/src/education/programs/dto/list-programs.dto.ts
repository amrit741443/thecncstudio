import { IsBoolean, IsOptional, IsUUID } from "class-validator"
import { ToBoolean } from "../../../common/boolean-query.js"
import { PaginationQueryDto } from "../../../common/pagination.js"

export class ListProgramsDto extends PaginationQueryDto {
  @IsOptional() @IsUUID() categoryId?: string
  @IsOptional() @ToBoolean() @IsBoolean() isActive?: boolean
}
