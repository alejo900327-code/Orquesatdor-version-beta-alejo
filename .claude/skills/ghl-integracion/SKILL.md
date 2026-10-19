---
name: ghl-integracion
description: Patrones probados para integrar un Worker de IIDAI con GoHighLevel (LeadConnector API v2) — upsert de contactos, campos personalizados por ID, tags aditivos/exclusivos, leer/actualizar/borrar contactos, y las trampas de la dedup. Úsala SIEMPRE que un embudo/Worker vaya a escribir o leer contactos en GHL (captura de lead, encuesta, webhook de WhatsApp, etc.). Es la base técnica de las skills embudo-formulario-captura, embudo-whatsapp-tracking y embudo-whatsapp-link-grupo. Se auto-mejora: cada bloqueador nuevo se documenta al final.
---

# Integración con GoHighLevel (LeadConnector API v2)

## Cuándo usar esta Skill
Vas a hacer que un Worker escriba o lea contactos en GHL: crear/actualizar un
lead, escribir respuestas de encuesta, agregar/quitar tags, o cruzar contactos
(webhook de WhatsApp). Destila lo aprendido construyendo el embudo **Código Fuente**.

Referencia viva del código: `apps/codigo-fuente/src/services/ghl.js` y
`apps/codigo-fuente/src/ghl-fields.js`.

## Reglas de oro
1. **El token vive como SECRET** (`env.GHL_TOKEN`), NUNCA en el código ni en el
   navegador. La location como secret (`env.GHL_LOCATION`). El frontend solo hace
   POST a `/api/*`; el Worker habla con GHL server-side.
2. **FAIL-OPEN total.** Si faltan los secrets o GHL falla, el embudo sigue vivo
   (la landing responde, los eventos igual llegan a mc-events). Nunca rompas el
   flujo del usuario por un error de GHL.
3. **User-Agent de navegador OBLIGATORIO** en cada request a `services.leadconnectorhq.com`.
   El WAF de Cloudflare delante de GHL bloquea (error 1010) User-Agents no-browser.

## Endpoints y headers
Base: `https://services.leadconnectorhq.com`. Headers comunes:
```js
{
  Authorization: 'Bearer ' + env.GHL_TOKEN,
  Version: '2021-07-28',
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
}
```
- **Upsert contacto:** `POST /contacts/upsert`  (crea o actualiza por email/teléfono).
- **Leer:** `GET /contacts/{id}`  ·  **Buscar:** `GET /contacts/?locationId=…&query=…`
- **Actualizar:** `PUT /contacts/{id}`  ·  **Borrar:** `DELETE /contacts/{id}`
- **Tags aditivos:** `POST /contacts/{id}/tags`  ·  **Quitar:** `DELETE /contacts/{id}/tags`
- **Listar campos:** `GET /locations/{locationId}/customFields`

## Campos personalizados → SIEMPRE por ID
El upsert v2 acepta `{ id, field_value }` **o** `{ key, field_value }`, PERO los
IDs son 100% fiables (la key puede necesitar prefijo `contact.` o no resolver).
Convención: mapear cada campo a su **ID** en un archivo `src/ghl-fields.js`, y
sacar los IDs con el listador:

```bash
GHL_TOKEN=… GHL_LOCATION=… node scripts/listar-campos-ghl.mjs
```
(ver `apps/codigo-fuente/scripts/listar-campos-ghl.mjs` — imprime name/key/id de
cada campo y un `ghl-fields.js` listo para pegar). **Los IDs son POR LOCATION:**
los de una location NO sirven en otra.

Helper que acepta id o key (detecta cuál es):
```js
export function campoGHL(ref, value) {
  const esId = /^[A-Za-z0-9]{18,}$/.test(String(ref)); // ids GHL: 20+ alfanum sin '_'
  return esId ? { id: ref, field_value: value } : { key: ref, field_value: value };
}
```

## Tags: aditivos vs destructivos
- **El `POST /contacts/upsert` REEMPLAZA el array `tags` completo.** NUNCA mandes
  tags en el body del upsert si querés conservar los existentes.
- Para AGREGAR sin borrar: `POST /contacts/{id}/tags` (aditivo). → `agregarTags()`.
- Para tag EXCLUSIVO (una sola etiqueta de un grupo, p.ej. `Lead Oro/Plata/…`):
  agregá el que corresponde y **quitá los otros** con `DELETE /contacts/{id}/tags`
  → `removeTags()`. GHL guarda los tags en **minúscula** pero matchea igual.

## ⚠️ "Allow Duplicate Contacts" OFF (dedup) — implicaciones fuertes
Si la location tiene duplicados APAGADOS (email y/o teléfono únicos):
- **No podés poner en un contacto un email o teléfono que YA tiene otro** → el
  PUT/upsert responde **400 `"This location does not allow duplicated contacts"`**
  con `meta.matchingField`.
- Esto rompe cualquier plan de "poner el mismo email/teléfono en dos contactos"
  (p.ej. para merge por email). Ver `embudo-whatsapp-tracking` para el patrón que
  esto obliga (borrar el phantom o merge nativo con duplicados activados).
- El **merge de contactos NO tiene endpoint de API**; solo existe la acción de
  Workflow "Merge Contact" (match by email/phone), que requiere duplicados activados.

## Nombre completo → `contact.name`
Si el form tiene un solo campo de nombre, mandá `name` (nombre completo) en el
upsert: GHL lo divide solo en `firstName`/`lastName`. Payload condicional (no
mandes strings vacíos que borren datos en un update):
```js
const payload = { locationId: env.GHL_LOCATION, source, customFields };
if (contacto.name) payload.name = contacto.name;
if (contacto.email) payload.email = contacto.email;
if (contacto.phone) payload.phone = contacto.phone;
```

## Verificar de verdad
Después de escribir, leé el contacto (`GET /contacts/{id}`) y confirmá los
customFields + tags. Un `succeeded:true` no garantiza que un campo entró si el
id/valor estaba mal.

## Bloqueadores (auto-documentado — APPEND-ONLY)
> Formato: `### <síntoma>` → causa → fix. No borres entradas.

### 403 "The token does not have access to this location" con un token que SÍ funciona local (2026-07-22)
Causa: el secret se cargó por el prompt oculto de `wrangler secret put` y se
coló basura invisible al pegar (Windows). Fix: cargarlo por tubería,
`printf %s '<valor>' | npx wrangler secret put <NOMBRE>` desde la carpeta de la
app (toma `account_id`/`name` del toml). Ver la memoria `wrangler-secret-paste-gotcha`.

### El upsert borró los tags del contacto (2026-07)
Causa: se mandaron `tags` en el body del `/contacts/upsert`, que REEMPLAZA el
array completo. Fix: nunca mandar tags en el upsert; agregarlos aparte con
`POST /contacts/{id}/tags` (aditivo).
