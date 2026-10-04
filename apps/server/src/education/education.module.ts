import { Module } from '@nestjs/common';
import { ProgramCategoriesController } from './program-categories/program-categories.controller.js';
import { ProgramCategoriesService } from './program-categories/program-categories.service.js';

@Module({
  controllers: [ProgramCategoriesController],
  providers: [ProgramCategoriesService]
})
export class EducationModule {}
