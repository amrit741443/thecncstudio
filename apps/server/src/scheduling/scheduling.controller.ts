import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { SchedulingService } from './scheduling.service.js';

@Controller('scheduling/locations')
export class SchedulingController {
  constructor(private readonly service: SchedulingService) {}

  @Post()
  createLocation(@Body() input: CreateLocationDto) {
    return this.service.createLocation(input);
  }

  @Get()
  listLocations() {
    return this.service.listLocations();
  }
}
