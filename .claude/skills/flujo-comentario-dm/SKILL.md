---
name: flujo-comentario-dm
description: Diseña y especifica la automatización "comentario con palabra clave → DM automático → imán → captura de contacto → clase / grupo de WhatsApp / llamada → venta" para reels orgánicos de Instagram, conectándola con GHL y con las skills de embudo existentes. Úsala cuando un reel o una campaña orgánica vaya a pedir "comenta X", cuando haya que dar de alta una palabra nueva, o cuando los comentarios no se estén convirtiendo en leads medibles. Produce la especificación (palabras, mensajes, ramas, etiquetas, métricas); el montaje en GHL lo hace ghl-workflow-planificar / ghl-workflow-construir y el paso a WhatsApp embudo-whatsapp-link-grupo o embudo-whatsapp-tracking.
---

# Flujo comentario → DM → venta

> Principio: cada palabra promete un recurso concreto por mensaje directo ("te envío la clase", "te mando el plan para tu nicho", "te mando el acceso al grupo de WhatsApp", "hablamos por DM para un diagnóstico", "llamada 1 a 1"). Lo que sigue es el diseño de Emprendimiento Consciente para lo que pasa DENTRO del DM.

## 1. Mapa del flujo
```
Reel (carril B) ──"comenta PALABRA"──▶ Comentario
   │                                     │ (respuesta pública automática corta: "¡Te lo envié por DM!")
   ▼                                     ▼
Etiqueta kw:PALABRA ◀──────────── DM 1: entrega/promesa del imán + 1 pregunta de calificación
                                         │
                       ┌─────────────────┼──────────────────┐
                       ▼                 ▼                  ▼
                 Imán ligero        Clase / evento      Diagnóstico 1a1
            (PDF, plantilla, plan)  (registro en landing) (aplicación corta)
                       │                 │                  │
                       └───── pide WhatsApp/email ──────────┘
                                         ▼
                      GHL: contacto + etiquetas (kw, tema, reel, score)
                                         ▼
                  Nurture (WhatsApp grupo o 1a1) → oferta del lanzamiento
```

## 2. Decisiones por palabra (rellena una fila por palabra)
| Palabra | Reel(s) | Imán prometido (literal del reel) | Rama | Pregunta de calificación | Destino final | Etiqueta GHL |
|---|---|---|---|---|---|---|
| GUIÓN | … | Estructura de guion para tu nicho | Imán ligero | "¿A qué te dedicas?" | Grupo WhatsApp lanzamiento | `kw:guion` |

Reglas:
- **Lo que se promete en el reel se entrega en el primer DM, sin formulario delante.** Pedir datos ANTES del regalo rompe la confianza; pídelos para el SIGUIENTE paso (clase, grupo, diagnóstico).
- **Una pregunta de calificación** en el DM 1 (nicho/negocio/facturación o, en marcas de conciencia, "¿qué área quieres ordenar: dinero, propósito, relaciones?"). La respuesta alimenta el lead score (`embudo-formulario-captura`).
- **Imán ligero > llamada en frío.** Un imán tipo plantilla/plan/clase convierte más que "te escribo por DM / llamada 1 a 1" (referencia de trabajo: del orden de 3 veces más comentarios por 1.000 vistas). La llamada va DESPUÉS, como oferta del imán.
- **Respuesta pública al comentario** (corta, variada) → más comentarios visibles = prueba social y señal al algoritmo (hipótesis razonable; mídela en cada cuenta).

## 3. Mensajes (plantillas)
- **DM 1 (entrega):** saludo con nombre + "aquí tienes [imán]" + enlace + 1 pregunta. Máx. 3 líneas.
- **DM 2 (si responde):** reflejo de su respuesta + siguiente paso (clase en fecha X / grupo de WhatsApp / diagnóstico) + enlace con UTM `utm_source=ig&utm_medium=dm&utm_campaign=<lanz>&utm_content=kw-<palabra>`.
- **DM 3 (24 h sin respuesta):** recordatorio de valor (una idea del imán), no presión.
- Voz: la de la marca (cerebro §5): tratamiento, muletillas y frase de cierre propios de cada marca, tal como estén documentados en su cerebro.

## 4. Conexión con lo que ya existe
| Paso | Skill/herramienta existente |
|---|---|
| Captura y lead score | `embudo-formulario-captura` (form + encuesta + score server-side) |
| Grupo de WhatsApp sin tracking | `embudo-whatsapp-link-grupo` |
| WhatsApp con tracking y consolidación de números | `embudo-whatsapp-tracking` |
| Workflow GHL (etiquetas, ramas, recordatorios) | `ghl-workflow-planificar` → `ghl-workflow-construir` |
| Panel de comunicados del lanzamiento | `panel-lanzamiento` (añadir filas "DM kw:X") |
| Herramienta de DM automático por comentario | ManyChat (ya en el stack según `cerebros/millonarios-conscientes/cerebro.md`) o el equivalente de GHL para Instagram — decisión por proyecto; documentar cuál en el cerebro |

## 5. Métricas (por palabra, semanal)
| Métrica | Fórmula | Para qué |
|---|---|---|
| C/1k | comentarios ÷ vistas × 1000 | potencia del reel |
| % comentarios con palabra | comentarios con la palabra ÷ comentarios | limpieza de la señal |
| Tasa de entrega | DMs entregados ÷ comentarios con palabra | salud de la automatización |
| Tasa de respuesta | respuestas a DM 1 ÷ DMs entregados | calidad del imán/pregunta |
| Paso a siguiente etapa | registros clase / entradas grupo / aplicaciones ÷ DMs | puente |
| Venta | compradores con etiqueta kw ÷ leads kw | la única que paga |
Lleva estas columnas al cockpit del lanzamiento (dashboard mc-funnel) con `utm_content=kw-<palabra>`.

## 6. Checklist antes de publicar un reel con palabra
- [ ] Palabra dada de alta en la automatización y probada con una cuenta de prueba (comentar → llega DM).
- [ ] El imán existe y el enlace funciona.
- [ ] Etiqueta GHL `kw:<palabra>` creada; UTM en el enlace.
- [ ] Respuesta pública automática activada (2-3 variantes).
- [ ] Caption y vídeo dicen la MISMA palabra (sin tildes problemáticas: si la palabra lleva tilde, acepta también la versión sin tilde).
- [ ] Plan de respuesta humana para DMs con preguntas (no todo es bot).

## Ética y cumplimiento
- No prometas en el DM nada que el reel no prometió. Nada de "solo hoy" si no es cierto.
- Respeta las políticas de mensajería de Instagram/Meta (ventanas de 24 h, opt-in) — verifícalas al montar; aquí no se documentan.
