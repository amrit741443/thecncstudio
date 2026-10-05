import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProgramDto {
  @IsUUID() categoryId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase letters, numbers and hyphens',
  })
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt() @Min(0) minAge!: number;
  @IsInt() @Min(0) maxAge!: number;

  @IsOptional() @IsBoolean() isActive?: boolean;
}
