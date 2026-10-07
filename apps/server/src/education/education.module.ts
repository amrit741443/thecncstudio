import { Module } from '@nestjs/common';
import { ProgramCategoriesController } from './program-categories/program-categories.controller.js';
import { ProgramCategoriesService } from './program-categories/program-categories.service.js';
import { ProgramCategoriesRepository } from './program-categories/program-categories.repositories.js';
import { ProgramsController } from './programs/programs.controller.js';
import { ProgramsRepository } from './programs/programs.repository.js';
import { ProgramsService } from './programs/programs.service.js';
import { CoursesController } from './courses/courses.controller.js';
import { CoursesRepository } from './courses/courses.repository.js';
import { CoursesService } from './courses/courses.service.js';
import { ClassesController } from './classes/classes.controller.js';
import { ClassesService } from './classes/classes.service.js';
import { ClassesRepository } from './classes/classes.repository.js';

@Module({
  controllers: [
    ProgramCategoriesController,
    ProgramsController,
    CoursesController,
    ClassesController,
  ],
  providers: [
    ProgramCategoriesService,
    ProgramCategoriesRepository,

    ProgramsService,
    ProgramsRepository,

    CoursesService,
    CoursesRepository,

    ClassesService,
    ClassesRepository,
  ],
})
export class EducationModule {}
