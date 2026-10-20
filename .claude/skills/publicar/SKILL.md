---
name: publicar
description: Publica (deploy) un producto de Alejo Cloud en el Cloudflare PERSONAL de Alejo. Úsala cuando Alejo diga "deployalo", "publícalo", "súbelo", "sácalo en vivo" o pida una página/landing publicada. Encuentra el producto y su dominio, hace commit+push al GitHub personal, despliega por el carril scripts/deploy.sh, verifica y reporta la URL.
---

# Publicar · Alejo Cloud

Aquí manda Alejo: cuando él dice "deployalo" en el chat, eso ES la autorización. No hace falta
pedir otro permiso para productos de `productos/`. Todo va a la cuenta personal
(`ff989b53…`) y al GitHub `Alejoobregon27/alejo-cloud`. Nunca a la empresa.

## Pasos (en orden; si algo falla, DETENTE y reporta)
1. **¿Qué producto?** El que se está trabajando en la conversación. Si no es obvio, el
   `productos/*` modificado más recientemente; si hay duda, pregunta. Si el trabajo vive
   fuera de `productos/`, primero créalo: `bash scripts/nuevo-producto.sh <slug> [dominio]`
   y mueve los archivos a `productos/<slug>/public/`.
2. **¿Qué dominio?**
   - Si `productos/<slug>/wrangler.toml` ya tiene `[[routes]]`, ese es.
   - Si no, lista las zonas de la cuenta personal:
     `curl -s -H "Authorization: Bearer $(grep -E '^oauth_token' ~/.config/alejo-cloud/.wrangler/config/default.toml | cut -d'"' -f2)" "https://api.cloudflare.com/client/v4/zones?account.id=ff989b53c26e6dbfa506425033548f68" | jq -r '.result[].name'`
     y propón `<slug>.<zona>` (o la raíz si el producto tiene dominio propio). Añade el bloque
     `[[routes]] pattern = "…" custom_domain = true` al toml.
   - Si no hay zonas: publica en `workers.dev` y dile a Alejo que compre/agregue un dominio.
   - Antes de un dominio nuevo: `dig NS <zona> +short` debe dar `*.ns.cloudflare.com`.
     (Lección de la empresa: si la zona no está en Cloudflare, el dry-run pasa y el dominio
     sirve otra cosa sin avisar.)
3. **Verifica:** `bash scripts/deploy.sh <slug> --dry-run` → debe compilar limpio.
4. **Commit + push** a `main` del repo personal (`git add productos/<slug> && git commit && git push`).
   El hook pre-push bloquea cualquier remoto que no sea de Alejoobregon27.
5. **Deploy:** `bash scripts/deploy.sh <slug>` (o `npm run deploy -- <slug>`). Es el ÚNICO
   carril: el hook `guardia-cuentas` bloquea `wrangler deploy` suelto. El script fija la
   cuenta, exige HEAD == origin/main, anota la versión de rollback, despliega, hace smoke
   (HTTP 200 + `<title>`) y escribe en `productos/<slug>/DEPLOYS.md`.
6. **Commit de la bitácora** (`DEPLOYS.md`) y push.
7. **Reporta a Alejo:** URL(s) en vivo, versión nueva, versión de rollback, resultado del smoke.

## Riesgo
- 🟢 Landing / página de ventas con links a Hotmart: el carril basta.
- 🔴 Worker que recibe webhooks de Hotmart o escribe en D1: smoke SOLO lectura (nunca POSTs
  falsos que creen ventas) y `npx wrangler tail <slug>` ~2 min después del deploy.
- Si el smoke falla: `npx wrangler rollback <versión-previa>` y reporta.

## Lo que `wrangler deploy` NO toca
Secrets (`wrangler secret put`), dominios agregados a mano en el panel. Mantén los dominios
declarados en el `wrangler.toml` para que el repo sea la verdad.

## Primer deploy de la cuenta
La cuenta personal necesita un subdominio `workers.dev` registrado una vez (panel de
Cloudflare → Workers → subdominio, o lo pide wrangler en el primer deploy interactivo).
