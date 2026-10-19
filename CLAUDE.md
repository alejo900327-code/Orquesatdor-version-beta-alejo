# Alejo Cloud — orquestador personal

Proyecto PERSONAL de Alejo, separado de la empresa. Aquí se construyen y prueban productos propios (el primero: "Decide Tú").

## Cuentas (únicas permitidas)
- **GitHub:** `Alejoobregon27/alejo-cloud` (privado). Un hook `pre-push` bloquea cualquier otro remoto.
- **Cloudflare:** cuenta personal `alejo900327@gmail.com`, ID `28a0caea3d6af60c2a36eb7ae3f6ecf9`. Fijada en `.claude/settings.json` (`CLOUDFLARE_ACCOUNT_ID`) y en cada `wrangler.toml` (usar `plantillas/wrangler.toml`).
- **Meta:** solo el Business Manager y la cuenta publicitaria personales.

## Reglas
- NUNCA desplegar, subir, publicar ni escribir en cuentas, repos, bases (D1/KV/R2), GHL, ClickUp o Meta de la empresa (Emprendimiento Consciente / MC / HIT, cuentas CF `1302c769…` y `9d0de308…`). Solo con permiso explícito de Alejo en el chat.
- Antes de `wrangler deploy` o cualquier acción en Cloudflare, confirmar que el `account_id` es `28a0caea…`.
- No traer aquí datos de clientes ni bases de contactos de la empresa.
- Responder siempre en español.

## Publicar ("deployalo")
- Cada producto vive en `productos/<slug>/` (`wrangler.toml` + `public/`). Crear: `bash scripts/nuevo-producto.sh <slug> [dominio]`.
- Publicar SOLO por el carril `bash scripts/deploy.sh <slug>` — ver skill `publicar`. El hook `guardia-cuentas` bloquea `wrangler deploy` suelto y cualquier comando con cuentas de la empresa.
- Cada deploy queda anotado en `productos/<slug>/DEPLOYS.md`.
