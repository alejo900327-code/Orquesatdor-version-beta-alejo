# Plantilla de especificación de workflow GHL

Copia este bloque a `salidas/ghl-workflows/AAAA-MM-DD-<slug>.md` y rellénalo. Es el **contrato** entre planificar y construir: lo que no esté aquí, no se construye.

Reglas de escritura:
- Nombres de disparadores, acciones, campos y operadores **exactamente como en GHL, en inglés** (sácalos de la referencia `ghl-workflows-referencia`).
- Textos de mensajes **completos y literales**, en el idioma del cliente final. Nada de "un email de bienvenida": el asunto y el cuerpo, enteros.
- En "Configuración completa" usa **los nombres de campo exactos de la ficha de referencia** (p. ej. en Add to Notes: `Note Content`, no "Note") y empieza siempre por `Action Name: "…"`, también en los Wait.
- Cada paso lleva un **ID** (`P1`, `P2`…; en ramas `P4.a1`, `P4.b1`…) para poder verificarlo uno por uno.

```markdown
---
workflow: "[Claude] <Nombre descriptivo>"
subcuenta: "<nombre>"            # y su location id si se conoce
carpeta: "<carpeta en GHL o ->"
estado_objetivo: Draft           # siempre Draft; publicar lo hace una persona
autor_spec: <quién la pidió>
aprobada_por: <nombre>           # vacío = NO se puede construir
fecha: AAAA-MM-DD
---

## Objetivo
Una o dos frases: qué problema resuelve y qué resultado se espera.

## Requisitos previos
Todo lo que el workflow usa y debe EXISTIR antes de construir.
| Tipo | Nombre exacto | ¿Existe? | Acción si falta |
|---|---|---|---|
| Tag | cumbre-registro | sí | — |
| Custom Field | Pais (texto) | no | crear (aprobado: sí/no) |
| Pipeline / Stage | Cumbre › Registrado | sí | — |
| Calendar / Form / Template / Número / Dominio email | … | … | … |

## Disparadores
| ID | Trigger (nombre GHL) | Filtros (campo · operador · valor) |
|---|---|---|
| T1 | Form Submitted | Form · is · "Registro Cumbre" |

## Pasos
| ID | Acción (nombre GHL) | Configuración completa | Siguiente |
|---|---|---|---|
| P1 | Add Contact Tag | Tags: cumbre-registro | P2 |
| P2 | Wait | Time Delay · 1 day | P3 |
| P3 | If/Else | Rama "Cliente": Tags · Includes · cliente / None branch | a: P3.a1 · b: P3.b1 |
| P3.a1 | Send Email | From: … · Subject: "…" · Body: "…" | fin |
| P3.b1 | Send SMS | Message: "Hola {{contact.first_name}}, …" | fin |

## Ajustes del workflow (pestaña Settings)
- Allow re-entry: sí/no · Stop on response: sí/no · Time window: … · Timezone: … · Sender (from name/email/number): …

## Objetivo / salida (opcional)
- Goal Event: … · Condición de salida: …

## Casos de prueba (los ejecuta una persona tras revisar)
1. Contacto de prueba con tag `claude-cliente` → debe recibir P3.a1.
2. Contacto sin el tag → debe recibir P3.b1.

## Riesgos y notas
- Acciones premium (coste), cumplimiento (DND, plantillas WhatsApp), bucles posibles, re-entrada…
```
