export default function Gracias({ searchParams }: any) {
  return (
    <main className="mx-auto max-w-lg p-6 text-center">
      <div className="card">
        <h1 className="text-2xl font-bold text-celeste-900">¡Gracias!</h1>
        <p className="mt-2 text-celeste-900/80">
          Tu solicitud (<span className="font-mono">{searchParams.lead}</span>) fue recibida.
          Pronto te contactaremos con el detalle.
        </p>
      </div>
    </main>
  );
}