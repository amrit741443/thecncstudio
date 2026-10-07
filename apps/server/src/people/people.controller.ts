import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import { PeopleService } from './people.service.js';

@Controller('people/students')
export class PeopleController {
  constructor(private readonly service: PeopleService) {}

  @Post()
  create(@Body() input: CreateStudentDto) {
    return this.service.createStudent(input);
  }

  @Get()
  list() {
    return this.service.listStudents();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getStudent(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateStudentDto) {
    return this.service.updateStudent(id, input);
  }
}
