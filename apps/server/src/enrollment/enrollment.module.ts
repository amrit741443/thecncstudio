import { Module } from '@nestjs/common';

import { EnrollmentController } from './enrollment.controller.js';
import { EnrollmentRepository } from './enrollment.repository.js';
import { EnrollmentService } from './enrollment.service.js';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentRepository, EnrollmentService],
})
export class EnrollmentModule {}
