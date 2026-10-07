import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateLeadDto {
  @IsString() @Length(1, 150) name!: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @Length(1, 30) phone?: string;
  @IsOptional() @IsString() source?: string;
}
