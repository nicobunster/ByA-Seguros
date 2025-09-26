import { NextResponse } from 'next/server';
import { cotizar } from '@/lib/rules';
import sb from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    // 1. Leer datos enviados desde el formulario
    const body = await req.text();
    const data = JSON.parse(body || '{}');

    console.log("📩 Datos recibidos en /api/quote:", data);

    // 2. Calcular cotización
    const quotes = cotizar({
      edad: Number(data.edad),
      comuna: String(data.comuna),
      plan: data.plan,
    });

    // 3. Guardar en Supabase
    const result = await sb.from('leads').insert({
      rut: String(data.rut || ''),
      edad: Number(data.edad || 0),
      comuna: String(data.comuna || ''),
      plan: String(data.plan || ''),
      quotes: quotes.map(q => ({
        aseguradora: q.aseguradora,
        precio: q.precio,
      })),
    });

    console.log("✅ Resultado del insert en Supabase:", result);

    if (result.error) {
      throw result.error;
    }

    // 4. Responder al frontend
    return NextResponse.json({ ok: true, quotes });
  } catch (e) {
    console.error("❌ Error en /api/quote:", e);
    return NextResponse.json(
      { ok: false, error: String(e) },
      { status: 500 }
    );
  }
}
