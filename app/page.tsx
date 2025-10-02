"use client";

import { useState } from "react";

export default function Home() {
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQuotes([]);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rut, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al enviar los datos");
      } else {
        setQuotes(data.quotes || []);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-50 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-blue-600">
          Cotiza tu seguro en 1 minuto
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="RUT"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Enviando..." : "Cotizar"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}

        {quotes.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Resultados:
            </h2>
            <ul className="space-y-2">
              {quotes.map((q, i) => (
                <li
                  key={i}
                  className="rounded-md border border-gray-200 p-2 shadow-sm"
                >
                  <span className="font-bold">{q.aseguradora}</span>: $
                  {q.precio}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
