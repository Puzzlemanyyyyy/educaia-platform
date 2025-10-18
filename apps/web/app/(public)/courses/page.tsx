import { CourseCard } from '@/components/CourseCard';
import { apiFetch } from '@/lib/api-client';
import type { CourseSummary } from '@educaia/types';

async function loadCourses(): Promise<CourseSummary[]> {
  try {
    return await apiFetch<CourseSummary[]>('/courses');
  } catch (error) {
    console.error('Failed to load courses', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const courses = await loadCourses();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold mb-2">Catálogo de cursos</h1>
        <p className="text-slate-600">
          Programas diseñados para empresas que requieren cumplimiento FUNDAE y normativa financiera.
        </p>
      </header>
      {courses.length === 0 ? (
        <p className="text-sm text-slate-500">No hay cursos disponibles en este momento.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.id} slug={course.slug} title={course.title} priceCents={course.priceCents} />
          ))}
        </div>
      )}
    </div>
  );
}
