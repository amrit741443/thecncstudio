import { IsInt, IsISO8601, IsNotEmpty, IsString, IsUUID, Matches, MaxLength, Min } from "class-validator"

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/

export class CreateClassDto {
  @IsUUID() courseId!: string

  @IsString() @IsNotEmpty() @MaxLength(150)
  name!: string

  @IsString() @IsNotEmpty() @MaxLength(50)
  code!: string

  @Matches(DATE_ONLY, { message: "startDate must be YYYY-MM-DD" }) @IsISO8601({ strict: true })
  startDate!: string

  @Matches(DATE_ONLY, { message: "endDate must be YYYY-MM-DD" }) @IsISO8601({ strict: true })
  endDate!: string

  @IsInt() @Min(1)
  capacity!: number
}
