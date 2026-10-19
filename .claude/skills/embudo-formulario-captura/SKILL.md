---
name: embudo-formulario-captura
description: Cómo construir el formulario de registro y la encuesta con Lead Score de un embudo de lanzamiento/captación (estilo Código Fuente) — form compartido con teléfono internacional y validación, captura de UTMs + slug de la versión, envío a GHL, y la página de gracias con encuesta que puntúa al lead server-side y le pone su etiqueta de calidad. Úsala SIEMPRE que armes la captura de leads o el scoring de un embudo nuevo. Depende de la skill ghl-integracion. Se auto-mejora: cada bloqueador se documenta al final.
---

# Formulario de captura + Lead Score · embudo de lanzamiento

## Cuándo usar esta Skill
Vas a montar la **captura de leads** de un embudo de lanzamiento: la(s) landing(s)
con su formulario, y la página de gracias con la **encuesta que puntúa al lead**.
Destila el embudo **Código Fuente** (`apps/codigo-fuente`). Requiere `ghl-integracion`.

## Arquitectura (2 piezas)
```
Landing (v4b/v6c/…) → form → POST /api/lead → GHL (contacto+tags) + mc-events (etapa 'lead')
   → redirige a gracias.html?<utms>   (email por localStorage, NO en la URL)
Gracias → encuesta 8 preguntas → POST /api/encuesta → puntaje SERVER-SIDE + GHL
   (respuestas + puntaje_encuesta + etiqueta de calidad exclusiva) + mc-events ('encuesta')
```

## Parte 1 — El formulario (snippet compartido)
Una sola fuente de verdad para TODAS las landings: `public/registro.css` +
`public/registro.js`. Cada landing solo incluye `<form id="lead-form" class="form
cfr-form" data-variante="v4b">` con los inputs + `<link registro.css>` +
`<script registro.js defer>`. Referencia: `apps/codigo-fuente/public/registro.js`.

Qué hace `registro.js` (por cada `form.cfr-form` de la página — soporta VARIOS,
las long-form tienen 2):
- **Teléfono internacional** con `intl-tel-input` (CDN), país inicial por GEO de
  Cloudflare (`/cdn-cgi/trace`), número normalizado a E.164 (`getNumber()`).
- **Validación por campo** con badges (nombre/correo/WhatsApp).
- **Captura automática**: `variante` (data-attr), `utm_*`/`fbclid`/… (query string),
  `pais_ip` (GEO), y **`pagina_captura` = `location.pathname`** (el slug de la
  versión: `/v4b`, `/v6c`, `/autosabotaje`…) → así se mide qué página trae mejores leads.
- Al enviar: `localStorage.cf_lead` (con el email), `POST /api/lead`, dispara el
  pixel `Lead`, y **redirige a gracias conservando las UTMs en la URL**.

### Reglas del formulario
- **El email viaja por `localStorage` (mismo origen), NUNCA en la URL.** Evita PII
  en query strings. En gracias se lee de `localStorage.cf_lead`.
- **`pagina_captura` = slug** de la versión, no la URL completa.
- **Multi-formulario:** realzá TODOS los `form.cfr-form` (no por id global, que
  colisiona en las long-form). Lookups por formulario, badges por `.cfr-group`.

### `/api/lead` (Worker)
Upsert en GHL: `name` = nombre completo → `contact.name`; UTMs + `pagina_captura`
por ID (`campoGHL`, ver ghl-integracion); tags `['<embudo>', '<embudo>-<variante>']`
aditivos; source. Emite `lead` a mc-events (fail-open, email hasheado). Ref:
`apps/codigo-fuente/src/routes/lead.js`.

## Parte 2 — Lead Score (encuesta en la página de gracias)
La encuesta (N preguntas de selección única, auto-avance, barra de progreso) al
terminar hace `POST /api/encuesta`. El puntaje se calcula **100% server-side** —
la tabla de puntos NUNCA se expone al navegador.

### `src/scoring.js` (el patrón)
- Un objeto `PUNTOS` por pregunta: `{ respuesta_exacta: puntos }`. Las claves son
  el **texto EXACTO** de la opción en la encuesta (si cambia el copy, actualizar acá).
- `calcularPuntaje(respuestas)` suma (respuesta desconocida = 0).
- `nivelDe(puntaje)` → nivel por umbrales de temperatura.
- **Alineá el máximo teórico con el tope de la escala** (en Código Fuente: máx 100,
  umbrales 0–45 Bronce / 46–55 Cobre / 56–69 Plata / 70–100 Oro). Si el máx no
  llega al tope, los niveles altos quedan inalcanzables — puntuá suficientes
  preguntas (incluí las que miden el perfil ideal: p.ej. profesión + disposición
  a invertir en sí mismo).
- Alguna pregunta puede NO puntuar (solo segmentación).

### `/api/encuesta` (Worker)
1. Calcula puntaje + nivel (scoring.js).
2. Upsert en GHL: las respuestas (por ID, carpeta LEADSCORING) + `puntaje_encuesta`
   (numérico) + tags: `<embudo>-encuestacompletada` y la **etiqueta de calidad
   EXCLUSIVA** (`Lead Oro/Plata/Cobre/Bronce`): se agrega la del nivel y se
   **quitan las otras 3** con `removeTags` (ver ghl-integracion).
3. Emite `encuesta` a mc-events (fail-open, email hasheado, idempotente por persona).
4. Devuelve `contactId` (lo usa la página de gracias, p.ej. para WhatsApp).
Ref: `apps/codigo-fuente/src/routes/encuesta.js`, `src/scoring.js`.

### La página de gracias
Manda `{ email (de localStorage), respuestas, variante, utm, pagina_captura }` a
`/api/encuesta`. **Espera la respuesta** (para tener el `contactId`) antes de
revelar el paso siguiente, con fallback por timeout para no bloquear al usuario.

## Checklist para un embudo nuevo
- [ ] `registro.css` + `registro.js` compartidos; cada landing con el `<form>` + includes.
- [ ] Pixel de Meta en el `<head>` (mismo pixel que el CAPI para dedupe browser↔CAPI).
- [ ] `ghl-fields.js` con los IDs reales de la location (usar el listador).
- [ ] `scoring.js` con la tabla de puntos aprobada + máximo alineado a los umbrales.
- [ ] Etiquetas de calidad creadas en GHL (`Lead Oro/Plata/Cobre/Bronce`).
- [ ] Secrets `GHL_TOKEN` + `GHL_LOCATION` en prod.

## Bloqueadores (auto-documentado — APPEND-ONLY)
> Formato: `### <síntoma>` → causa → fix. No borres entradas.

### El puntaje daba mal en las pruebas por curl (2026-07-22)
Causa: los acentos/ñ de las respuestas ("años", "España", "Más de…") se corrompían
al pasar por el shell inline → no matcheaban las claves de scoring.js. Fix: probar
el endpoint con el payload UTF-8 desde archivo (`curl --data-binary @file.json`);
en el navegador el UTF-8 va intacto y matchea.

### Long-form con 2 formularios: colisión de IDs (2026-07)
Causa: usar ids globales (`id="cfr-nombre"`) rompe cuando la página tiene 2 forms.
Fix: registro.js realza TODOS los `form.cfr-form`, con lookups por formulario
(`form.querySelector('[name=…]')`) y badges por `.cfr-group`, sin ids globales.
