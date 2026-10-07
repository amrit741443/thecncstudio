import { Body, Controller, Post } from '@nestjs/common';
import { MarkAttendanceDto } from './dto/mark-attendance.dto.js';
import { AttendanceService } from './attendance.service.js';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post()
  mark(@Body() input: MarkAttendanceDto) {
    return this.service.mark(input);
  }
}
