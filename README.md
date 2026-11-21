# Valery Figueroa Huaman · Portfolio v3

Portfolio personal: integraciones a medida (Node.js, PHP, Python) presentadas como un workflow.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000 → redirige a /es, /en o /it según el navegador
npm run build
npm start
```

## Estructura

- `app/[lang]/` — página principal y layout por idioma (`es`, `en`, `it`), metadatos y hreflang.
- `middleware.ts` — redirige `/` al idioma preferido del navegador (por defecto `es`).
- `dictionaries/` — todos los textos. `es.ts` define el tipo `Dict`; `en.ts` e `it.ts` deben cumplirlo.
- `components/` — secciones: `Hero` (diagrama animado + log), `CaseSection` (flujo bidireccional y payload por CRM), `IntegrationMap` (mapa radial), `Marquee` (empresas), `StackSection` (editor con código), `Process`, `Audience`, `Contact`.
- `lib/snippets.ts` — fragmentos de código del editor y su resaltador.
- `app/globals.css` — tokens de color (claro/oscuro) y estilos.

## Editar contenido

- Textos: `dictionaries/*.ts`.
- Herramientas del mapa: `CATS` en `components/IntegrationMap.tsx`.
- Empresas: `COMPANIES` en `components/Marquee.tsx`.
- Datos de contacto: `components/Contact.tsx`.
