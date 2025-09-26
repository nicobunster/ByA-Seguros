
# Compara MVP (celeste + blanco)

MVP gratuito estilo ComparaOnline con **Next.js (App Router)** + **Tailwind** + **Supabase**.
Tema visual: **celeste y blanco**.

## 1) Requisitos
- Node 18+
- (opcional) cuenta en Vercel (free) y Supabase (free)

## 2) Instalación
```bash
npm install
npm run dev
```

## 3) Variables de entorno
Crea en Vercel o localmente un archivo `.env.local` con:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url
SUPABASE_SERVICE_ROLE_KEY=tu_key
```
> Si prefieres no usar Service Role en backend, puedes usar la clave ANON y configurar RLS como insert público para la tabla `leads`.

## 4) Tabla en Supabase
Ejecuta este SQL en el editor de Supabase:
```sql
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  rut text,
  edad int,
  comuna text,
  plan text,
  quotes jsonb
);
```

## 5) Deploy en Vercel
1. Sube el repo a GitHub.
2. En Vercel: New Project → importa el repo → Framework: Next.js
3. Agrega variables de entorno y deploy.

## 6) Personalización rápida
- **Reglas de precio**: `lib/rules.ts`
- **Estilos**: `styles/globals.css` y `tailwind.config.js`
- **UI**: `app/page.tsx` y tarjetas de resultados
- **Gracias**: `app/gracias/page.tsx`

## 7) Roadmap sugerido
- Integrar Auth (Supabase Auth) para panel interno de leads.
- Reemplazar reglas por APIs reales.
- SEO/Analytics (Vercel Analytics o Umami).
- Landing, FAQ, términos y privacidad.
```

