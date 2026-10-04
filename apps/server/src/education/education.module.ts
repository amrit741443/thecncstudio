import { Module } from '@nestjs/common';
import { ProgramCategoriesController } from './program-categories/program-categories.controller.js';
import { ProgramCategoriesService } from './program-categories/program-categories.service.js';
import { ProgramCategoriesRepository } from './program-categories/program-repositories.js';

@Module({
  controllers: [ProgramCategoriesController],
  providers: [ProgramCategoriesService, ProgramCategoriesRepository],
})
export class EducationModule {}
