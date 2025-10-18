import { Card, Button } from '@educaia/ui';

export default function CheckoutPage() {
  return (
    <Card className="space-y-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="text-sm text-slate-600">
        Integra aquí tu pasarela preferida (Stripe Elements, Novalnet o Revolut Pay). Este
        prototipo incluye la estructura para conectar con el backend NestJS.
      </p>
      <Button disabled>Continuar con Stripe</Button>
    </Card>
  );
}
