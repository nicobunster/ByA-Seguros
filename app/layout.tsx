import './globals.css';
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compara MVP - Celeste',
  description: 'Cotizador tipo ComparaOnline en Next.js + Tailwind (celeste y blanco)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-celeste-500" />
              <span className="font-bold text-celeste-800">Compara<span className="text-celeste-600">MVP</span></span>
            </div>
            <nav className="text-sm text-celeste-800/80">
              <a className="hover:text-celeste-800" href="/">Cotizar</a>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="mt-16 border-t">
          <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-celeste-900/70">
            © {new Date().getFullYear()} ComparaMVP — Hecho con Next.js
          </div>
        </footer>
      </body>
    </html>
  );
}