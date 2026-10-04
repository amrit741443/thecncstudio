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

import { ProgramCategoriesService } from './program-categories.service.js';
import { ListProgramCategoriesDto } from './dto/list-program-categories.dto.js';
import { CreateProgramCategoryDto } from './dto/create-program-category.dto.js';
import { UpdateProgramCategoryDto } from './dto/update-porgram-category.dto.js';

@Controller('program-categories')
export class ProgramCategoriesController {
  constructor(private readonly service: ProgramCategoriesService) {}

  @Get() list(@Query() query: ListProgramCategoriesDto) {
    return this.service.list(query);
  }

  @Get(':categoryId')
  get(@Param('categoryId', ParseUUIDPipe) id: string) {
    return this.service.get(id);
  }

  @Post() create(@Body() dto: CreateProgramCategoryDto) {
    return this.service.create(dto);
  }

  @Patch(':categoryId')
  update(
    @Param('categoryId', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProgramCategoryDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':categoryId')
  @HttpCode(204)
  remove(@Param('categoryId', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
