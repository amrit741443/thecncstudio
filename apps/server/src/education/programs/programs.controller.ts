import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto.js';
import { ListProgramsDto } from './dto/list-programs.dto.js';
import { UpdateProgramDto } from './dto/update-program.dto.js';
import { ProgramsService } from './programs.service.js';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly service: ProgramsService) {}

  @Get() list(@Query() query: ListProgramsDto) {
    return this.service.list(query);
  }

  @Get(':programId')
  get(@Param('programId', ParseUUIDPipe) id: string) {
    return this.service.get(id);
  }

  @Post() create(@Body() dto: CreateProgramDto) {
    return this.service.create(dto);
  }

  @Patch(':programId')
  update(
    @Param('programId', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProgramDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':programId')
  @HttpCode(204)
  remove(@Param('programId', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
