import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  list() {
    return this.coursesService.listCourses();
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }
}
