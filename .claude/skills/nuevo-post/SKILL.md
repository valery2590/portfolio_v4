---
name: nuevo-post
description: Crea la entrega semanal de "Integraciones sin drama" de Valery — artículo del blog en ES/EN/IT, texto de LinkedIn en inglés listo para pegar e imágenes (LinkedIn en inglés, story de Instagram en español) — a partir de un tema de una o dos frases o del siguiente tema de content/temas.md. Úsala siempre que pida un post nuevo, el siguiente de la serie, "el de esta semana", convertir una idea o un problema técnico en post/artículo, o escriba /nuevo-post, aunque no diga "skill" ni nombre la serie.
---

# Nuevo post · Integraciones sin drama

Cada semana Valery publica un patrón de integración o rendimiento en su blog (valeryfigueroahuaman.com, Next.js en este repo) en ES/EN/IT, en **LinkedIn en inglés** (su perfil principal está en inglés y su público son recruiters y empresas internacionales) y como **story de Instagram en español**. Esta skill convierte un tema en todo eso de una vez, para que solo tenga que revisar y publicar. Puede ejecutarse en su Mac o en una sesión en la nube (Claude Code en la web o en el móvil), así que no dependas de nada que solo exista en local.

## Las reglas de contenido (y por qué)

Valery trabaja como Solutions Developer en una empresa y quiere promocionarse **sin revelar ni parecer que revela lo que construye en su trabajo**. Por eso:

- **Patrón genérico, nunca anécdota laboral.** Escribe "Es un patrón muy común…", "Antes de X, pregúntate…", no "en mi empresa teníamos…" ni "construimos…". Aunque el tema venga de algo que vivió, cuéntalo como algo que le pasa a cualquier equipo. Si el tema que te dan delata algo concreto de su trabajo, generalízalo y díselo en el resumen.
- **Sin clientes ni pistas que los identifiquen** (nombres de empresas, modelos de coche, cifras internas). Los nombres de **herramientas públicas** (HubSpot, Salesforce, Zoho, WhatsApp, LeadCars, Zendesk…) sí valen como ejemplos.
- **Sin proveedores concretos de su stack laboral** como protagonistas: di "un CDN", "una cola", "un CRM"; como mucho, una lista de alternativas ("Cloudflare, Fastly, Bunny…").
- **Lenguaje neutro de género al hablar de la audiencia** (no "experta/experto"; usa "quien…", "equipo", "dev"). Si hablas de Valery, es hombre: formas masculinas.
- **Enseñar la oportunidad o la lección, no la implementación interna.**

Tono: claro, directo, de dev a dev pero entendible por un perfil de negocio. Frases cortas. Nada de relleno ni de frases tipo "en el mundo actual". Cada post deja una idea práctica (una pregunta, una checklist, un criterio).

## Flujo

### 1. Elegir el tema
- Si el usuario da un tema, úsalo.
- Si no, abre `content/temas.md` y coge el primer tema sin marcar (`- [ ]`). Si la lista está vacía, propón 3 temas y pregunta.

### 2. Número y slug
- Número de la serie: el mayor `number` de `POSTS` en `lib/blog.ts` + 1.
- Slug: corto, en minúsculas con guiones, entendible en cualquier idioma (p. ej. `lead-scoring`, `reintentos-backoff` → mejor `retries-backoff`). Comprueba que no exista ya `content/blog/<slug>.ts`.

### 3. Escribir el contenido
Crea `content/blog/<slug>.ts` siguiendo **exactamente** la forma de `content/blog/cache-cdn.ts` (léelo antes: es el ejemplo de referencia en estructura, longitud y tono). El tipo está en `lib/blog.ts` (`Post`, `PostContent`, `Social`, `Block`). Para cada idioma `es`, `en`, `it`:

- `title`: la pregunta o promesa del artículo (≤ 70 caracteres).
- `description`: una frase que resuma el problema y la solución (≤ 160 caracteres; se usa en Google y al compartir).
- `tags`: 3 etiquetas en minúsculas.
- `body`: 10–18 bloques, ~450–700 palabras. Estructura que funciona: el patrón/problema → la pregunta clave (`h2`) → la solución (`h2`, con lista `ul` y, si encaja, un `code` corto y genérico) → lo difícil / los matices (`h2`) → un aviso en `quote` si hay un riesgo típico → checklist (`h2` + `ul`) → frase final memorable. Dentro del texto puedes usar `**negrita**` y `` `código` ``.
- `social`: los textos de las imágenes generadas.
  - `hook`: frase potente de 6–14 palabras (es el titular de la imagen; no repitas el `title` tal cual).
  - `highlight`: la parte final del `hook` (subcadena exacta) que se pinta en violeta.
  - `points`: 3 ideas clave, ≤ 60 caracteres cada una.
- `linkedin`: **solo en `en`** (Valery publica en LinkedIn en inglés; no hay post en español ni en italiano: quien lo necesite tiene el blog en su idioma y la traducción de LinkedIn). El post listo para pegar:
  - Escríbelo directamente en inglés natural, no como traducción del español.
  - 2 primeras líneas = gancho (es lo único que se ve antes del "…see more").
  - Párrafos de 1–2 líneas separados por **una línea en blanco** (la web añade el carácter invisible al descargarlo).
  - Listas con `→`, 2–4 emojis como mucho, sin markdown (`**`, `#` de títulos, backticks): LinkedIn los muestra tal cual.
  - Cierre fijo de la serie:
    ```
    📌 This is #N of Integrations without drama.
    A new pattern every week. Follow me so you don't miss the next one.

    #IntegrationsWithoutDrama #tag1 #tag2 #tag3
    ```
  - Sin enlace dentro del post (LinkedIn reduce el alcance de los posts con enlaces); el enlace va en el primer comentario.

Las versiones `en` e `it` son adaptaciones naturales, no traducciones literales.

### 4. Registrar el post
En `lib/blog.ts`: importa el nuevo archivo y ponlo **el primero** en `POSTS` (el más reciente primero). No toques `cache-cdn` ni los demás.

### 5. Marcar el tema
En `content/temas.md`, marca el tema como hecho (`- [x]`) y añade `→ #N <slug>`. Si el tema no estaba en la lista, añádelo ya marcado.

### 6. Comprobar
Ejecuta `npx tsc --noEmit` y `npm run lint`. Si hay errores, corrígelos. (No hace falta `npm run build`: a veces falla al descargar fuentes de Google y no indica un error real.)

### 7. Entregables
- **En el Mac de Valery** (existe `~/Documents/personal`): ejecuta `bash .claude/skills/nuevo-post/scripts/exportar.sh <slug>`. Arranca la web en local y guarda `linkedin-en.txt` y `linkedin-en.png` (inglés) y `story-instagram.png` (español) en `~/Documents/personal/integraciones-sin-drama/<fecha> - #<N> - <título corto>/` (el título corto es el título en español hasta los dos puntos), y abre la carpeta. Ahí están también los posts anteriores y `_perfil/` (banner de LinkedIn). Mira las dos imágenes (Read) y, si el texto se sale o queda mal repartido, acorta `hook`/`points` y vuelve a exportar.
- **En la nube / móvil**: no hay carpetas locales. Cuando el cambio esté publicado, los archivos estarán en:
  - `https://valeryfigueroahuaman.com/social/en/<slug>/linkedin.txt` (LinkedIn, inglés)
  - `https://valeryfigueroahuaman.com/social/en/<slug>/square.png` (imagen de LinkedIn, inglés)
  - `https://valeryfigueroahuaman.com/social/es/<slug>/story.png` (story de Instagram, español)
  La próxima vez que use el Mac, puede ejecutar `exportar.sh <slug> --live` para archivarlos en su carpeta.

### 8. Git
- En el Mac: **no hagas commit ni push**; Valery lo hace desde Tower. Dile qué archivos han cambiado.
- En la nube: pregunta si quiere que hagas commit y push a `main` (Vercel publica solo en 1–2 minutos). Sin su "sí", no publiques.

### 9. Resumen final
Responde en español, breve:
1. Tema y número (#N), y si generalizaste algo del tema para que no apunte a su trabajo.
2. Dónde están los archivos (carpeta de `integraciones-sin-drama` o URLs).
3. Cómo publicar:
   - **LinkedIn (inglés)**: pega `linkedin-en.txt` (Cmd+A, Cmd+C), añade `linkedin-en.png` y publica. Después, en el **primer comentario**: "Full article on my site 👉 https://valeryfigueroahuaman.com/en/blog/<slug>".
   - **Instagram (español, cuenta personal → solo story)**: sube `story-instagram.png` y añade el sticker **Enlace** con `https://valeryfigueroahuaman.com/es/blog/<slug>` en el hueco de abajo.
   - **Web**: commit + push (Tower o confirmación en la nube).
4. El post de LinkedIn (inglés) completo en un bloque, por si quiere leerlo sin abrir archivos.
