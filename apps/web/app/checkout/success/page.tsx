import Link from 'next/link';
import { Card, Button } from '@educaia/ui';

export default function CheckoutSuccessPage() {
  return (
    <Card className="space-y-4 text-center">
      <h1 className="text-2xl font-semibold">¡Pago recibido!</h1>
      <p className="text-sm text-slate-600">
        Te hemos matriculado y recibirás un email con instrucciones para acceder a Moodle.
      </p>
      <Button asChild>
        <Link href="/dashboard">Ir al panel</Link>
      </Button>
    </Card>
  );
}
