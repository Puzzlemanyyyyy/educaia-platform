import Link from 'next/link';
import { Card, Button } from '@educaia/ui';

const highlights = [
  {
    title: 'Integración Moodle',
    description: 'Sincroniza matrículas y progreso con tu campus Moodle en minutos.'
  },
  {
    title: 'Pagos multi-proveedor',
    description: 'Stripe, Novalnet y Revolut preparados para PCI DSS SAQ-A.'
  },
  {
    title: 'Reporting FUNDAE',
    description: 'Genera evidencias y métricas de cumplimiento con un clic.'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-semibold">Plataforma EducaIA</h1>
        <p className="text-lg text-slate-600">
          Ecosistema de formación corporativa con cumplimiento FUNDAE y pagos globales.
        </p>
        <Button asChild>
          <Link href="/courses">Explorar catálogo</Link>
        </Button>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title}>
            <h3 className="text-xl font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
