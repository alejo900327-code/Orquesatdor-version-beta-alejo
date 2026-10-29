---
name: herramienta-regalo-brujula
description: Construye una herramienta-regalo web para la audiencia de una ponencia (el "regalo" que se llevan los alumnos), sobre el patrón "Brújula". HTML autocontenido de nivel luxury (entrada por voz o texto, tarjetas editables, export PDF con window.print, motor demo de respaldo), cableada a Claude por un Cloudflare Worker (/ruta sirve el HTML, /api/ruta llama a la IA reutilizando un secret y cae a demo si falla), con QR en la slide de cierre del deck. Úsala cuando Alejo diga "hazles una herramienta como la Brújula", "el regalo de la clase", "una micro-app para que apliquen lo de la ponencia", o quiera una web interactiva con IA para entregar al final de un evento. Pareja de [[ponencia-cinematografica]].
---

# Herramienta-regalo tipo Brújula

Patrón del regalo del Día 2 ("El Organigrama de Escala", gemelo de la "Brújula" del Día 1). Una web que el alumno abre con un link/QR, le describe algo (voz o texto), la IA se lo estructura, lo edita y lo descarga en PDF. Fuentes: `Medellin-Escala/micro-app/organigrama.html` + rutas en `apps/mastermind-circulo-co/worker.js` del repo mc-funnel.

## Anatomía
1. **HTML autocontenido** (un solo archivo, mismo sistema de diseño luxury que el deck: `--bg:#0A0D14 --gold:#C9A24B`, Bodoni Moda + Hanken Grotesk + JetBrains Mono, íconos SVG dibujados). Componentes: barra de entrada con **mic** (Web Speech API) + textarea + botón "Construir ✦"; chips de ejemplo; zona de resultado con **tarjetas editables** (`contenteditable`); botones Reset y **⤓ Descargar PDF** (`window.print()` + `@media print`). Badge de estado "✦ con IA" / "modo demo".
2. **Llamada a la IA:** `const API_ENDPOINT="/api/<tool>"`. `go()` hace `fetch` con `AbortController` (timeout ~22s); valida el JSON; si falla → `catch` → **motor demo** determinista local (reglas/regex) para que SIEMPRE funcione sin IA.
3. **Motor demo:** reglas simples que producen un resultado razonable desde el texto. Es el respaldo si la IA no responde (sin créditos, caída, etc.).

## Worker (Cloudflare Pages/Worker)
En el worker del evento, añade DOS rutas (patrón idéntico a `/brujula` + `/api/brujula`):
```js
if (path === '/<tool>') return new Response(HTML_TOOL, {headers:{'Content-Type':'text/html; charset=utf-8'}});
if (path === '/api/<tool>' && request.method === 'POST') return handleTool(request, env);
```
`handleTool`: lee `body.desc`, usa `env.BRUJULA_API_KEY || env.ANTHROPIC_API_KEY` (REUTILIZA el secret de la Brújula, no crees otro), llama `https://api.anthropic.com/v1/messages` con `model:'claude-sonnet-5-5'`, un `system` que exige **devolver SOLO JSON** con la forma exacta que la UI consume, extrae el primer `{...}` del texto y lo parsea. Si no hay key o no parsea → responde `{error:...}` 200 y la UI cae a demo.

### Inyectar el HTML grande en el worker sin romperlo
No pegues el HTML a mano (riesgo de escape). Usa un script Node: `const HTML_TOOL = ${JSON.stringify(html)};` + el handler + las rutas, insertando por anclas únicas (`async function handleBrujula`, `export default {`, el bloque de la ruta `/api/brujula`). Así evitas corromper el worker.

## Gotchas (reales)
- **Lint de la casa:** `catch {}` vacío y `catch (e)` sin usar `e` suman errores sobre el baseline. Usa `catch { parsed=null; }` y `} catch { return json(...) }` (optional catch binding).
- **Créditos Anthropic:** si la key no tiene saldo, la API da 400 "credit balance too low" → cae a demo. Es el mismo secret que la Brújula; cargar créditos enciende ambas.
- **Clave scoped a workspace:** una Admin/Organización key da 400 "not scoped to a workspace"; crear con Ámbito=Workspace.
- `wrangler dev` local puede fallar por desajuste de compat-date del binario; confía en `wrangler deploy --dry-run` + el patrón probado de `/brujula`.

## Deploy (reglas del monorepo mc-funnel)
- Worktree desde `origin/main`; rama `feat/*`; **nunca** tocar main directo ni desplegar por iniciativa propia.
- `npm run lint` sin errores nuevos + `wrangler deploy --dry-run` compila.
- PR. El **deploy lo corre un humano**: `git pull --ff-only origin main && npm run deploy:app -- <app>` (gate anti-drift exige HEAD=origin/main + árbol limpio; la cuenta por defecto del wrapper ya es la 1302c769). Verifica en vivo: `GET /<tool>` → 200.
- QR: `python3 -c "import qrcode; ..."` apuntando al live (`<evento>.millonariosconscientes.eu/<tool>`), embébelo en la slide `regalo()` del deck.

## Ojo con el panel de resultados
Si las respuestas de la gente caen en un panel admin, ese panel puede ser de OTRO (p.ej. Erick) y vivir en otro dominio/codebase. **No trabajes en paralelo sobre el mismo panel**: confirma cuál es la fuente oficial antes de editar/desplegar nada.
