---
name: embudo-whatsapp-link-grupo
description: La alternativa SIMPLE para el paso de WhatsApp de un embudo — entregar el link directo del grupo (o una conversación) sin webhook, sin tracking ni consolidación de contactos. Úsala cuando NO necesitás medir quién inició WhatsApp ni reconciliar números, y querés meter al lead al grupo rápido con cero infraestructura. Si en cambio necesitás trackear la iniciación y cruzar contactos (mensajería API, cerrar el gap de números), usá embudo-whatsapp-tracking.
---

# WhatsApp: solo el link del grupo (sin tracking) · embudo de lanzamiento

## Cuándo usar esta Skill
El paso de WhatsApp del embudo, en su versión **mínima**: la página de gracias
entrega el **link del grupo** (o abre una conversación) y listo. Sin webhook, sin
`/api/wa-inbound`, sin Workflows de GHL, sin secret. Cero infraestructura.

## Cuándo elegir esta vs `embudo-whatsapp-tracking`

| | link-grupo (esta) | tracking (webhook) |
|---|---|---|
| Complejidad | Mínima (solo un `<a href>`) | Webhook + 2 Workflows + secret |
| ¿Sabés quién inició WhatsApp? | No | Sí (tag `wa-confirmado`) |
| ¿Capturás el número real / cierra el gap? | No | Sí |
| ¿Mensajería API para empujar no-shows? | No | Sí |
| Riesgo de bloqueo del grupo de WhatsApp | Sí (link de grupo público) | Menor (conversación 1:1) |

**Regla:** si el objetivo es solo "que entren al grupo" y no vas a nurturear por
API ni te importa medir la iniciación → esta. Si vas a mandar mensajería/medir →
`embudo-whatsapp-tracking`.

## Cómo se hace
En la config de la página de gracias (`window.CF`), un solo valor:
```js
window.CF = {
  whatsapp_grupo: "https://chat.whatsapp.com/XXXXXXXX", // invite del grupo
  // …fecha_clase, etc.
};
```
Al revelar el "Paso 2", el botón apunta ahí:
```js
btn.href = CF.whatsapp_grupo;
btn.addEventListener("click", function(){ ev("clic_whatsapp"); }); // beacon opcional
```
- **Medición mínima:** seguí emitiendo el beacon `clic_whatsapp` a mc-events al
  hacer clic (conteo, sin PII). No confirma que hayan entrado, solo el clic.
- **Variante conversación (sin tracking):** en vez del invite del grupo, un
  `wa.me/<numero>` para que abran chat 1:1 (menos riesgo de bloqueo), pero SIN el
  `ref:` del mensaje ni webhook → no reconciliás contactos.

## Migrar a tracking después
Si más adelante querés medir/nurturear, el salto es: (1) cambiar el link por
`wa.me/<numero>?text=<mensaje con ref:contactId>`, (2) montar el webhook y los 2
Workflows de `embudo-whatsapp-tracking`. La página de gracias ya tiene el
`contactId` (de `/api/encuesta`), así que el cambio es acotado.

## Bloqueadores (auto-documentado — APPEND-ONLY)
> Formato: `### <síntoma>` → causa → fix. No borres entradas.

<!-- Nuevas entradas debajo de esta línea -->
