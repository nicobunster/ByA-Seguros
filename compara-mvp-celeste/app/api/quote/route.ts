import { NextResponse } from 'next/server';
import { cotizar } from '@/lib/rules';
import { sb } from '@/lib/supabase';

export async function POST(req: Request) {
  const body = await req.text();
  const data = JSON.parse(body || '{}');

  const quotes = cotizar({ edad: Number(data.edad), comuna: String(data.comuna), plan: data.plan });

  try {
    await sb.from('leads').insert({
      rut: String(data.rut || ''),
      edad: Number(data.edad || 0),
      comuna: String(data.comuna || ''),
      plan: String(data.plan || ''),
      quotes: quotes.map(q => ({ aseguradora:q.aseguradora, precio:q.precio })),
    });
  } catch(e){
    // si falla supabase, igual devolvemos las cotizaciones
  }

  const withLead = quotes.map(q => ({ ...q, leadId: `${Date.now()}-${q.id}` }));
  return NextResponse.json({ ok:true, quotes: withLead });
}