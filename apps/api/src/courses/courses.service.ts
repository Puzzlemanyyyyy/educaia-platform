import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@educaia/database';
import type { Course } from '@prisma/client';

@Injectable()
export class CoursesService {
  async listCourses(): Promise<Course[]> {
    return prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getCourseBySlug(slug: string): Promise<Course> {
    const course = await prisma.course.findUnique({
      where: { slug }
    });

    if (!course) {
      throw new NotFoundException(`Course with slug "${slug}" not found`);
    }

    return course;
  }
}
