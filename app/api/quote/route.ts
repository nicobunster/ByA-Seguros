import { NextResponse } from 'next/server';
import { cotizar } from '@/lib/rules';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const data = JSON.parse(body || '{}');

    const quotes = cotizar({
      edad: Number(data.edad),
      comuna: String(data.comuna),
      plan: data.plan,
    });

    // Insertar en la tabla "leads"
    await supabase.from('leads').insert({
      rut: String(data.rut || ''),
      edad: Number(data.edad || 0),
      comuna: String(data.comuna || ''),
      plan: String(data.plan || ''),
      quotes: quotes.map((q: any) => ({
        aseguradora: q.aseguradora,
        precio: q.precio,
      })),
    });

    return NextResponse.json({ ok: true, quotes });
  } catch (e) {
    console.error('Error en POST /api/quote:', e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
