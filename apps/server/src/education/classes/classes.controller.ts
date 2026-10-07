import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClassesService } from './classes.service.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { ListClassesDto } from './dto/list-classes.dto.js';
import { UpdateClassDto } from './dto/update-class.dto.js';

// No DELETE: a class carries enrollments and attendance history. Retire it with status 'cancelled'.
@Controller('classes')
export class ClassesController {
  constructor(private readonly service: ClassesService) {}

  @Get() list(@Query() query: ListClassesDto) {
    return this.service.list(query);
  }

  @Get(':classId')
  get(@Param('classId', ParseUUIDPipe) id: string) {
    return this.service.get(id);
  }

  @Post() create(@Body() dto: CreateClassDto) {
    return this.service.create(dto);
  }

  @Patch(':classId')
  update(
    @Param('classId', ParseUUIDPipe) id: string,
    @Body() dto: UpdateClassDto,
  ) {
    return this.service.update(id, dto);
  }
}
