import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { EnrollmentService } from './enrollment.service.js';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}

  @Post()
  create(@Body() input: CreateEnrollmentDto) {
    return this.service.create(input);
  }

  @Get()
  list() {
    return this.service.list();
  }
}
