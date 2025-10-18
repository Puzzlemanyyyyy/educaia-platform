import { notFound } from 'next/navigation';
import { Button, Card } from '@educaia/ui';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { apiFetch } from '@/lib/api-client';
import type { CourseSummary } from '@educaia/types';

interface CoursePageProps {
  params: { slug: string };
}

async function loadCourse(slug: string): Promise<CourseSummary | null> {
  try {
    return await apiFetch<CourseSummary>(`/courses/${slug}`);
  } catch (error) {
    console.error('Failed to load course', error);
    return null;
  }
}

export const dynamic = 'force-dynamic';

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const course = await loadCourse(params.slug);

  if (!course) {
    notFound();
  }

  const resolvedCourse = course;

  return (
    <Card className="space-y-4">
      <div>
        <h1 className="text-3xl font-semibold">{resolvedCourse.title}</h1>
        <p className="text-slate-600">{formatCurrency(resolvedCourse.priceCents)}</p>
      </div>
      <p className="text-sm text-slate-600">
        Este curso incluye plantillas de evidencias FUNDAE, actividades SCORM compatibles con Moodle y seguimiento de progreso
        automatizado.
      </p>
      <Button asChild>
        <Link href="/checkout">Comprar ahora</Link>
      </Button>
    </Card>
  );
}
