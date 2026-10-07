import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common"
import { CoursesService } from "./courses.service.js"
import { CreateCourseDto } from "./dto/create-course.dto.js"
import { ListCoursesDto } from "./dto/list-courses.dto.js"
import { UpdateCourseDto } from "./dto/update-course.dto.js"

@Controller("courses")
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get() list(@Query() query: ListCoursesDto) { return this.service.list(query) }

  @Get(":courseId")
  get(@Param("courseId", ParseUUIDPipe) id: string) { return this.service.get(id) }

  @Post() create(@Body() dto: CreateCourseDto) { return this.service.create(dto) }

  @Patch(":courseId")
  update(@Param("courseId", ParseUUIDPipe) id: string, @Body() dto: UpdateCourseDto) { return this.service.update(id, dto) }

  @Delete(":courseId") @HttpCode(204)
  remove(@Param("courseId", ParseUUIDPipe) id: string) { return this.service.remove(id) }
}
