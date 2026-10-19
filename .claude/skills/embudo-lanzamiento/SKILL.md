---
name: embudo-lanzamiento
description: Playbook END-TO-END para construir un embudo de captación de lanzamiento estilo Código Fuente — landing(s) con pixel → formulario → encuesta con Lead Score → WhatsApp. Es el índice que ata las skills específicas y fija las DECISIONES a tomar por proyecto (location GHL, pixel/CAPI, dedup, estrategia de WhatsApp). Úsala SIEMPRE que arranques un embudo de lanzamiento nuevo, ANTES de escribir código, para no olvidar piezas ni decisiones. Referencia a nuevo-embudo, ghl-integracion, embudo-formulario-captura, embudo-whatsapp-tracking / embudo-whatsapp-link-grupo, despliegue-cloudflare.
---

# Embudo de lanzamiento (captación) · playbook end-to-end

## Cuándo usar esta Skill
Vas a construir un embudo de **captación de lanzamiento** (landing → registro →
encuesta → WhatsApp), como **Código Fuente** (`apps/codigo-fuente`). Léela al
arrancar para tener el mapa completo y tomar las decisiones antes de codear.

## El mapa (piezas + skill de cada una)
```
1. Scaffolding del Worker/app  ......... nuevo-embudo
2. Landing(s) + Meta Pixel  ............ (esta) + frontend
3. Formulario de captura → GHL  ........ embudo-formulario-captura
4. Encuesta + Lead Score → GHL  ........ embudo-formulario-captura (incluye scoring)
5. Base técnica de GHL  ................ ghl-integracion
6. WhatsApp:
     · con tracking/nurture  ........... embudo-whatsapp-tracking
     · solo link del grupo  ............ embudo-whatsapp-link-grupo
7. Verificar + desplegar  .............. verificacion + despliegue-cloudflare + publicar
```

Etapas del `funnel_id` (mc-events): `visita → lead → encuesta → clic_whatsapp →
checkout → pago` (checkout/pago suelen ser Fase 2 — la venta).

## Decisiones a tomar ANTES de construir (checklist)
- [ ] **Location de GHL** (los IDs de campos son por location — sacarlos con el
      listador). ¿Es la misma de otro embudo (reusar IDs) o nueva?
- [ ] **Meta Pixel**: cuál, y que sea el MISMO que el CAPI (`apps/mc-capi`) para
      dedupe browser↔CAPI. Evento de optimización (normalmente `Lead`).
- [ ] **"Allow Duplicate Contacts"** de la location: ON u OFF. **Define la
      estrategia de WhatsApp** (con OFF → patrón "borrar phantom"; con ON → merge
      nativo posible). Ver ghl-integracion.
- [ ] **Estrategia de WhatsApp**: ¿tracking (webhook + 2 workflows) o solo el link
      del grupo? (ver la tabla en embudo-whatsapp-link-grupo).
- [ ] **Número WABA** (si es tracking) conectado en GHL LC WhatsApp.
- [ ] **Tabla de Lead Score** aprobada + etiquetas de calidad creadas en GHL.
- [ ] **Landings ganadoras** a replicar (del debriefing del lanzamiento) + link
      inteligente si se reparte tráfico entre variantes.

## Convención de datos y privacidad
- **Email en claro solo server-side** (a GHL). Al navegador/URL nunca; entre
  páginas va por `localStorage` (mismo origen). A mc-events, hasheado.
- **`pagina_captura` = slug** de la versión → mide qué página convierte mejor.
- Toda emisión a mc-events es **fail-open**; GHL es fail-open.

## Secrets de producción (típicos)
`GHL_TOKEN`, `GHL_LOCATION`, y si hay tracking de WhatsApp `WA_INBOUND_SECRET`.
Cargarlos con `printf %s '<valor>' | npx wrangler secret put <NOMBRE>` desde la
carpeta de la app (ver la memoria del gotcha de pegado).

## Deploy (recordatorio)
`npm run deploy:app -- <embudo>` desde la **raíz** del repo y en **Git Bash**
(Windows), tras mergear el PR a `main`. Claude tiene VETADO el deploy real (lo
corre un humano). Ritual completo en `publicar` / `despliegue-cloudflare`.

## Bloqueadores (auto-documentado — APPEND-ONLY)
> Formato: `### <síntoma>` → causa → fix. No borres entradas.

<!-- Nuevas entradas debajo de esta línea -->
