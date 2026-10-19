---
name: ghl-workflow-planificar
description: Usar cuando alguien del equipo quiere una automatización o workflow nuevo en GoHighLevel (GHL / HighLevel / LeadConnector) — "automatiza en GHL", "crea un workflow que…", "cuando alguien se registre que le llegue…", "secuencia de emails/SMS/WhatsApp en GHL", "mover oportunidad de etapa", "etiquetar contactos" — y todavía no existe una especificación aprobada. También para convertir un workflow existente en especificación.
user-invocable: true
---

# ghl-workflow-planificar

## Qué hace

Convierte una necesidad en una **especificación aprobada** (`salidas/ghl-workflows/AAAA-MM-DD-<slug>.md` si la sesión está en el repo `el-orquestador`; si no, en `ghl-workflows/AAAA-MM-DD-<slug>.md` dentro de la carpeta actual) con la plantilla `plantilla-spec.md`. Sin especificación aprobada, `ghl-workflow-construir` no construye nada.

**Principio:** todo lo que va en la especificación debe existir en la documentación oficial de GHL. No se inventan disparadores, acciones, campos ni operadores.

## Fuente de verdad obligatoria

**REQUIRED:** consulta la skill `ghl-workflows-referencia` (documentación oficial de GHL) antes de escribir cada disparador o acción. Abre solo el archivo que necesites:

| Necesitas… | Archivo en `ghl-workflows-referencia/` |
|---|---|
| Qué dispara el workflow y sus filtros | `disparadores.md` |
| Etiquetas, campos, asignar, notas, tareas, email, SMS, WhatsApp, redes, notificaciones | `acciones-contacto-comunicacion.md` |
| If/Else, Wait, Goal, Go To, Split, webhooks, código, formateadores, IA, sintaxis `{{…}}` | `acciones-logica-datos-ia.md` |
| Oportunidades y pipelines, citas, pagos, facturas, membresías, afiliados, audiencias, IVR | `acciones-negocio.md` |
| Ajustes (re-entry, time window, sender), borrador/publicar, pruebas, límites, premium | `constructor-ajustes-pruebas.md` |

Si algo que pide el usuario **no aparece** en la referencia, dilo claramente y propón la alternativa oficial más cercana. No lo metas "a ver si existe".

## Subcuentas conocidas

| Subcuenta | Location ID | Uso |
|---|---|---|
| **Emprendimiento Consciente** | `xZeB78e6zr1peyHwvhRg` | **Subcuenta de trabajo del equipo (producción).** Por defecto, salvo que se diga otra |
| Leadpro Marketing Solutions LLC (personal) | `ulX10R1oni8qsv0Q0dWD` | Solo para pruebas de las skills. No construir aquí workflows del equipo |

Confirma siempre la subcuenta con quien pide el workflow y escribe su nombre y su ID en la spec. La URL de GHL lo muestra: `/v2/location/<ID>/…`.

## Proceso

1. **Entender** (preguntas cortas, de una en una, solo lo que falte):
   - ¿Qué lo dispara? ¿Qué debe pasarle al contacto? ¿Cuándo termina?
   - ¿Qué subcuenta? ¿Qué textos exactos se envían y desde qué remitente?
   - ¿Qué pasa si el contacto ya estaba dentro (re-entry) o responde (stop on response)?
2. **Traducir a GHL** con la referencia: cada paso → nombre exacto del disparador o acción + configuración completa. Marca las acciones **premium** (cuestan por ejecución) y los requisitos de cumplimiento (DND, plantillas de WhatsApp fuera de la ventana de 24 h, horario de envío).
3. **Requisitos previos:** si hay emails o SMS, incluye el **remitente** (pestaña Settings del workflow → Sender details: From name, From email y **From number**, que en la subcuenta de pruebas estaba vacío). Lista también cada tag, custom field, custom value, pipeline/stage, calendar, form, plantilla, número o dominio que se usa. Si tienes navegador con la sesión de GHL, comprueba si existen (pantallas de ajustes: ver `ghl-workflow-construir/interfaz-constructor.md`). Si no, márcalos como "por verificar".
4. **Riesgos:** bucles (un workflow que pone un tag que dispara otro workflow), mensajes duplicados, envíos fuera de horario, contactos sin email/teléfono.
5. **Escribir la especificación** con la plantilla. Textos literales y completos.
6. **Aprobación:** muestra un resumen legible (disparador → pasos → ramas, en viñetas) y pide aprobación explícita. Anota quién aprobó en `aprobada_por`. Con cambios → vuelve al paso 5.

## Reglas

- **Nombre siempre con prefijo `[Claude]`** y `estado_objetivo: Draft`. Publicar lo hace una persona.
- **Un workflow = un objetivo.** Si la petición mezcla varios (captación + recuperación de carritos + postventa), propón dividirla en varios workflows enlazados con `Add to Workflow` o tags.
- **Un solo plan B por paso, y aprobado.** Si un paso puede no ser posible en la interfaz, escribe **una** alternativa concreta y márcala como aprobada o no. Nunca pongas "omitir" en un sitio y "parar y preguntar" en otro.
- **Toda salida con nombre lleva su "Siguiente".** Los pasos con varias salidas (If/Else, Find Opportunity Found/Not Found, Wait con timeout: respondió/expiró) deben indicar qué pasa en **cada** salida, aunque sea "fin". Las ramas no se vuelven a unir.
- **Dependencias entre pasos:** un `Wait` "Until the contact replies" necesita **un paso de envío anterior** (SMS/Email) en el mismo workflow; es el campo `Reply to`. Un `Update Opportunity` o `Add Owner to Opportunity` necesita una oportunidad en contexto (trigger de oportunidad o `Find Opportunity` antes). Revisa cada paso: ¿necesita algo de uno anterior?
- **Owner de oportunidad:** `Create Opportunity` no tiene owner. El patrón es `Create Opportunity` → `Find Opportunity` → Found → `Add Owner to Opportunity`.
- **Nada ambiguo:** "espera un rato" → `Wait · Time Delay · 2 hours`. "Si es cliente" → la condición exacta (`Tags · Includes · cliente`).
- Idioma: especificación en español; nombres de GHL en inglés, tal cual aparecen en la interfaz.

## Errores comunes

| Error | Corrección |
|---|---|
| Inventar una acción que "debería existir" | Buscarla en la referencia; si no está, decirlo |
| Dejar textos como "email de bienvenida" | Asunto y cuerpo literales |
| Olvidar requisitos previos | Todo tag, campo o plantilla mencionado va a la tabla |
| Una sola spec con 3 objetivos | Dividir en varios workflows |
| Mandar a construir sin `aprobada_por` | Pedir aprobación explícita primero |
