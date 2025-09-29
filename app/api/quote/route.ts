import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rut, edad, comuna, plan } = body;

    if (!rut || !edad || !comuna || !plan) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Aquí puedes aplicar reglas de negocio si quieres (ej: cotizar seguros)
    const quotes = [
      { aseguradora: 'Seguro A', precio: 10000 },
      { aseguradora: 'Seguro B', precio: 12000 },
    ];

    const { error } = await supabase.from('leads').insert([
      {
        rut: String(rut),
        edad: Number(edad),
        comuna: String(comuna),
        plan: String(plan),
        quotes,
      },
    ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Error al guardar lead' }, { status: 500 });
    }

    return NextResponse.json({ success: true, quotes });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
