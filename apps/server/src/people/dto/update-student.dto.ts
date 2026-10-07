import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export enum StudentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  studentCode?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  lastName?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  gender?: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;
}
