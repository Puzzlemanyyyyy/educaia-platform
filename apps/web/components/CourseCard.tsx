import Link from 'next/link';
import { Card, Button } from '@educaia/ui';
import { formatCurrency } from '@/lib/utils';

interface CourseCardProps {
  slug: string;
  title: string;
  priceCents: number;
}

export function CourseCard({ slug, title, priceCents }: CourseCardProps) {
  return (
    <Card className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-slate-500">{formatCurrency(priceCents)}</p>
      </div>
      <Button asChild>
        <Link href={`/courses/${slug}`}>Ver detalles</Link>
      </Button>
    </Card>
  );
}
