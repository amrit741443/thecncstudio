import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateLocationDto {
  @IsString() @Length(1, 150) name!: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() @Length(1, 30) phone?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
