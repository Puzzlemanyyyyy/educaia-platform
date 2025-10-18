import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'NextAuth not configured in this skeleton.' }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ error: 'NextAuth not configured in this skeleton.' }, { status: 501 });
}
