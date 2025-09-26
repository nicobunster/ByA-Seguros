'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = { rut:string; edad:number; comuna:string; plan:'basico'|'intermedio'|'full' };

export default function Home() {
  const { register, handleSubmit, formState:{errors} } = useForm<FormData>();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:FormData) => {
    setLoading(true);
    const r = await fetch('/api/quote', { method:'POST', body: JSON.stringify(data) });
    const j = await r.json();
    setQuotes(j.quotes || []);
    setLoading(false);
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="card">
          <h1 className="text-2xl font-bold text-celeste-900">Compara planes en 1 minuto</h1>
          <p className="text-celeste-900/70 mt-1 text-sm">Rellena tus datos y te mostramos las mejores opciones.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5">
            <input className="input" placeholder="RUT (12.345.678-9)" {...register('rut', {required:true})}/>
            <input className="input" type="number" placeholder="Edad" {...register('edad', {required:true, min:18, max:90})}/>
            <input className="input" placeholder="Comuna" {...register('comuna', {required:true})}/>
            <select className="input" {...register('plan', {required:true})}>
              <option value="basico">Básico</option>
              <option value="intermedio">Intermedio</option>
              <option value="full">Full</option>
            </select>
            <button className="btn-primary disabled:opacity-60" disabled={loading}>
              {loading ? 'Cotizando…' : 'Cotizar'}
            </button>
            {Object.keys(errors).length>0 && (
              <p className="text-red-600 text-sm">Revisa los campos obligatorios.</p>
            )}
          </form>
        </div>

        <div className="space-y-4">
          <div className="card bg-celeste-50 border-celeste-200">
            <h2 className="font-semibold text-celeste-900">¿Cómo funciona?</h2>
            <ul className="list-disc pl-5 text-sm text-celeste-900/80 mt-2 space-y-1">
              <li>Ingresas tus datos (edad, comuna, plan deseado).</li>
              <li>Calculamos precios simulados según reglas (puedes cambiarlas).</li>
              <li>Guardamos tu lead en una base de datos para seguimiento.</li>
            </ul>
          </div>

          {!!quotes.length && (
            <section className="space-y-3">
              {quotes.map((q) => (
                <article key={q.id} className="card border-celeste-200">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-celeste-900">{q.aseguradora}</h3>
                      <p className="text-sm text-celeste-900/70">{q.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-celeste-800">${q.precio.toLocaleString('es-CL')}</div>
                      <a href={`/gracias?lead=${encodeURIComponent(q.leadId)}`} className="inline-block mt-2 btn-primary">Lo quiero</a>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </div>
    </section>
  );
}