---
name: embudo-whatsapp-tracking
description: Cómo trackear si un lead REALMENTE inicia conversación por WhatsApp y cruzar ese contacto con su registro, para cerrar el gap "se registra con un número y escribe con otro" (~40-45% de mismatch). Cubre el redireccionamiento a conversación con referencia en el mensaje, el webhook /api/wa-inbound que consolida contactos en GHL, los 2 Workflows de GHL, y todas las trampas (dedup, customData anidado, no borrar contactos con historia). Úsala cuando el embudo mande a WhatsApp y quieras medir/nurturear por API. Si en cambio solo querés entregar el link del grupo sin trackear, usá embudo-whatsapp-link-grupo. Depende de ghl-integracion. Se auto-mejora: cada bloqueador se documenta al final.
---

# Tracking de conversación de WhatsApp · embudo de lanzamiento

## Cuándo usar esta Skill
El embudo manda al lead a WhatsApp y querés **saber quién realmente inició la
conversación** + tener su **número real** + poder **nurturear por API** — cerrando
el gap del 40-45% que escribe con un número distinto al que registró. Destila el
webhook de **Código Fuente** (`apps/codigo-fuente/src/routes/wa-inbound.js`).

Si NO necesitás tracking (solo entregar el link del grupo), es más simple:
usá **`embudo-whatsapp-link-grupo`**.

## El problema
- El lead se registra → contacto **O** (email, tags, score, número que puso).
- Escribe por WhatsApp. GHL matchea por teléfono:
  - Si el número **no existía** → crea un contacto phantom **N** nuevo.
  - Si el número **ya era un contacto** → adjunta el mensaje a ESE contacto (con historia).
- Objetivo: consolidar en un solo contacto, con el número real, sin duplicar ni perder datos.

## Arquitectura
```
Gracias → botón "Abrir WhatsApp y enviar" → wa.me/<numero>?text=<mensaje pre-cargado>
   mensaje: "Hola, soy {nombre}. …Código Fuente… Mi correo: {email}. (ref: {contactId})"
      ← el contactId lo devuelve /api/encuesta; el correo va en el texto (no en URL de tracking)

Persona envía → GHL crea/matchea el contacto por su número real
   → Workflow 1 "WA inbound" (trigger: Customer Replied / Inbound Message, canal WhatsApp)
      filtro: mensaje contiene "<Embudo>"
      acción Webhook → /api/wa-inbound  (SIN acciones después)
   → Workflow 2 "WA responder" (trigger: tag = <embudo>-wa-confirmado)
      acción: Send WhatsApp con el link del grupo
```
⚠️ **UTMs en `wa.me` NO se trackean** — WhatsApp solo usa `phone` + `text`. El
tracking se hace metiendo el `ref:<contactId>` (y el correo) en el **texto** del mensaje.

## El webhook `/api/wa-inbound`
Protegido por secret `WA_INBOUND_SECRET` (header `Authorization: Bearer …` o `?k=…`;
sin él → 401). Lógica (fail-open):
1. **Lee los datos de `b.customData`** (GHL los anida ahí), con fallback a los
   campos estándar (`contact_id`, `phone`, `message.body`). Strippea espacios del teléfono.
2. Del mensaje saca `ref:<contactId>` (o el email) → busca el contacto de registro **O**.
3. Consolida según el contacto que recibió el WhatsApp (waId):
   | Caso | Acción |
   |---|---|
   | `waId === o.id` (escribió desde el número que registró) | No borra nada, marca **O** `wa-confirmado` |
   | **Phantom fresco** (sin email ni tags) | Borra N, mueve su número a **O**, marca **O** |
   | **Ya era un contacto CON historia** | **NO borra** (no perder datos), marca **ESE** contacto |
4. El contacto que queda con `wa-confirmado` es el que tiene el número real → el
   Workflow 2 le responde el link del grupo.

## Las 3 reglas que aprendimos a los golpes
1. **Nunca borrar un contacto con historia.** El número de WhatsApp del lead
   SUELE ser ya un contacto (repeat/cross-funnel). Solo se borra un **phantom
   vacío de verdad** (sin email ni tags). Guard obligatorio.
2. **Guard "mismo número":** si escribe desde el número que registró, el contacto
   que dispara ES O → sin el guard borrarías el registro. Detectar `waId === o.id`.
3. **Datos anidados bajo `customData`:** GHL manda los "Datos personalizados" del
   Webhook anidados, no en el nivel superior. Leer `b.customData.*`.

## Los 2 Workflows en GHL
**WF1 "WA inbound":** trigger *Customer Replied* (canal WhatsApp) → filtro *message
body contains* `<Embudo>` → acción **Webhook** POST a `…/api/wa-inbound`, header
`Authorization: Bearer <secret>`, Datos personalizados `wa_contact_id={{contact.id}}`,
`wa_phone={{contact.phone}}`, `mensaje={{message.body}}`. **Sin acciones después**
(el webhook puede borrar el contacto). El `{{message.body}}` está en el picker bajo
*Valores personalizados › Message › Message Body* (no bajo Contact).

**WF2 "WA responder":** trigger *Contact Tag* = `<embudo>-wa-confirmado` → acción
*Send WhatsApp* con el link del grupo. Se dispara a los segundos → dentro de la
ventana de 24h de WABA → sale como mensaje libre (en sesión). Verificado que
funciona; si tu location exigiera plantilla, usar un template aprobado.

## Debug con n8n / webhook.site
Para VER el payload exacto que GHL manda, apuntá el Webhook de WF1 a n8n o a
webhook.site temporalmente. No llama a nuestro endpoint → seguro (no borra nada).
Fue así que descubrimos el bug del `customData` anidado.

## Setup del secret
```bash
cd apps/<embudo>
printf %s '<un-secreto-largo>' | npx wrangler secret put WA_INBOUND_SECRET
```

## Bloqueadores (auto-documentado — APPEND-ONLY)
> Formato: `### <síntoma>` → causa → fix. No borres entradas.

### El webhook devolvía matched:false con el mensaje correcto (2026-07-22)
Causa: GHL manda los Datos personalizados ANIDADOS bajo `customData`, y el webhook
leía `b.wa_contact_id`/`b.mensaje` (nivel superior) → undefined → sin ref → matched:false.
Fix: leer `b.customData.*` con fallback a los estándar (`contact_id`, `message.body`).

### Poner el número de WhatsApp en O daba 400 (2026-07-22)
Causa: con "Allow Duplicate Contacts" OFF, no se puede poner en O un teléfono que
otro contacto (N) ya tiene. Fix: borrar N PRIMERO (libera el número) y recién
mover el número a O. Y solo se borra N si es phantom fresco (ver regla 1).

### Merge nativo de GHL: no aplica con dedup OFF (2026-07-22)
La acción "Merge Contact (by email)" necesita que ambos compartan email, lo que
dedup-OFF impide crear. El merge real requiere activar "Allow Duplicate Contacts"
(cambio GLOBAL de la location) — por eso elegimos el patrón "borrar phantom".
