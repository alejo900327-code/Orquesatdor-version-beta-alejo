---
name: vsl-high-ticket
description: Genera un VSL (Video Sales Letter) high-ticket para productos premium de coaching, mentoría, consultoría o formación profesional que se venden vía aplicación + llamada de ventas, en el estilo de MC Vitalicio de Millonarios Conscientes. Úsala SIEMPRE que el usuario quiera crear un VSL, guion de video de ventas, o script de venta para un producto de ticket alto ($1,500+) dirigido a un nicho profesional (coaches, terapeutas, formadores, consultores, emprendedores) cuyo objetivo es que apliquen para una llamada estratégica. El ángulo es resultados de negocio (facturación, escalar, clientes) con conciencia como mecanismo diferenciador. Dispara esta skill con frases como "hazme un VSL high-ticket", "necesito el guion del video de ventas para mi programa premium", "genera el VSL para mi oferta de coaching de alto valor", "adapta el VSL de Vitalicio a este otro producto". NO uses esta skill para productos de ticket bajo/medio que van directo a checkout (para eso existe vsl-conciencia).
---

# VSL High-Ticket — Generador de Video Sales Letters Premium

Esta skill reconstruye la arquitectura del VSL de **MC Vitalicio** (Millonarios Conscientes) para generar un VSL de alta conversión para productos premium que se venden vía aplicación + llamada de ventas.

El modelo combina la estructura de venta high-ticket (calificación + deseo + autoridad + caso) con el mecanismo de conciencia (Fuerza vs. Poder de Hawkins) como diferenciador competitivo, aplicado a resultados de negocio concretos.

## Cuándo aplica este modelo

Este VSL es para productos donde:
- El precio es alto ($1,500+)
- La venta es vía **aplicación + llamada** (no checkout directo)
- La audiencia es un **nicho profesional** (coaches, terapeutas, formadores, consultores, emprendedores)
- El ángulo es **resultados de negocio** (facturación, escalar, clientes, ingresos)
- El objetivo del VSL es que la persona aplique para una llamada estratégica

Si el producto es de ticket bajo/medio ($17-$500) con pago directo y ángulo de transformación interna, usa la skill `vsl-conciencia` en su lugar.

## Principio rector: resultados de negocio CON conciencia como diferenciador

A diferencia del VSL de conciencia, este VSL SÍ habla de dinero, facturación, clientes y escalar. Esa es la promesa principal. La conciencia (Hawkins, Fuerza vs. Poder) aparece como la PIEZA 1 de un sistema de negocio — el diferenciador que explica por qué este sistema funciona donde otros fallan.

- ✅ El ángulo principal: "facturar $X/mes sin sacrificar tu paz mental"
- ✅ La conciencia es el mecanismo: "el nivel desde el que vendes determina cuánto facturas"
- ⚠️ Equilibrio crítico: si el VSL se vuelve 100% conciencia, pierde al avatar de negocio. Si se vuelve 100% táctica de marketing, pierde el diferenciador. La integración ES la propuesta de valor.

## Proceso de creación

### Paso 1 — Diagnóstico del producto (SIEMPRE preguntar primero)

Antes de escribir, reúne esta información:

1. **¿Qué producto premium es y qué resultado de negocio promete?** (la "Big Promise" numérica, ej: "facturar $10K/mes")
2. **¿Precio y estructura de pago?** ($X único, o planes de cuotas)
3. **¿Quién es el avatar profesional?** (coach, terapeuta, formador, consultor — sé específico)
4. **¿Cuál es la contradicción central del avatar?** (en MC: "ayudas a otros a transformar su vida pero no podés vivir de ello con dignidad")
5. **¿Cuál es el sistema/método?** (idealmente con pilares nombrados — en MC: Conciencia, Posicionamiento, Atracción, Conversión)
6. **¿Cuál es el mecanismo diferenciador?** (la pieza que nadie más integra — en MC: conciencia + estrategia)
7. **¿Casos de éxito con números reales?** (nombres, antes/después, cifras, timeframes)
8. **¿Hay tipos/perfiles distintos de avatar?** (en MC: 4 tipos de emprendedor para personalización)
9. **¿Cuál es la urgencia genuina?** (en MC: convergencia de IA + despertar de conciencia)

### Paso 2 — Leer las referencias

**Conexión con el sistema (LEE PRIMERO, viven en el repo):**
- **El Cerebro de la marca** (`cerebros/<marca>/cerebro.md`) — voz real, oferta, escalera, precios, prueba REAL, guardarraíles. **Manda sobre las referencias genéricas.** (MC: `cerebros/millonarios-conscientes/cerebro.md`.)
- `conocimiento/_COMPARTIDO/playbook-vsl-anuncios.md` + `playbook-persuasion.md` + `playbook-mercado-hispano.md` + `playbook-modelos-de-negocio.md` (patrones de alto ticket) + `compliance-2025.md`.

Luego, los archivos de referencia de esta skill (estilo MC, PLANTILLA si la marca es otra):
- `references/estructura-bloques.md` — La arquitectura completa de bloques del VSL high-ticket, con propósito e ingeniería inversa. **El corazón de la skill.**
- `references/tipos-avatar.md` — Cómo segmentar el avatar en perfiles (los 4 tipos de MC) y usar esa segmentación en el VSL y la personalización posterior.
- `references/material-hawkins-negocio.md` — El mecanismo de conciencia aplicado a negocio (Fuerza vs. Poder como pilar 1, no como producto). Cómo conectar la escala de Hawkins con facturación.
- `references/voz-javi-directa.md` — La voz y el tono (directo, confrontacional, con autoridad). Distinto del tono reflexivo de la skill de conciencia.

### Paso 3 — Escribir el VSL bloque por bloque

Sigue la estructura de `estructura-bloques.md`. Para cada bloque:
- Respeta el PROPÓSITO psicológico
- Adapta al producto y avatar específico
- Mantén la voz directa de `voz-javi-directa.md`
- Mantén el equilibrio: negocio como promesa, conciencia como mecanismo

### Paso 4 — Entregar en formato docx

Entrega el VSL en Word (.docx) estructurado por bloques, con:
- Indicaciones de grabación al inicio
- Los ganchos claramente separados (genera múltiples variantes para A/B testing — en el high-ticket suelen ser más, hasta 10, porque la audiencia es más sofisticada)
- Cada bloque con su título y notas de producción
- Límite de duración objetivo: ~18 minutos (más largo que el de conciencia porque la venta es más compleja y el ticket más alto justifica más tiempo)

Usa la skill `docx`. Pon el copy en bloques visualmente distinguibles.

## La estructura en una mirada

El VSL high-ticket tiene estos bloques (detalle en `references/estructura-bloques.md`):

1. **Ganchos** (hasta 10 variantes) — confrontacionales, de dolor específico o resultado específico
2. **La Big Promise** — la promesa numérica de negocio + la condición ("sin sacrificar X")
3. **Los tipos de avatar** — segmentación que hace que cada perfil se sienta identificado
4. **La contradicción / problema** — el dolor profesional específico
5. **Autoridad + historia** — el viaje del presentador con énfasis en resultados de negocio
6. **La pieza que falta (mecanismo)** — el diferenciador (conciencia aplicada a negocio)
7. **El sistema de pilares** — el método completo nombrado por pilares
8. **Case studies por objeción** — casos reales que derriban objeciones específicas
9. **Urgencia genuina** — por qué el momento es ahora
10. **La oferta + cómo aplicar** — qué incluye + el CTA a la aplicación/llamada (NO venta directa)

## Reglas críticas

- **Negocio como promesa, conciencia como mecanismo.** Mantené el equilibrio. La Big Promise es de facturación; el diferenciador es la conciencia.
- **El CTA es aplicar, no comprar.** El VSL high-ticket no vende directo — invita a aplicar para una llamada. El cierre debe filtrar ("no es para todos") y crear deseo de calificar.
- **Números reales en casos.** Los case studies necesitan cifras, nombres, timeframes. La especificidad vende high-ticket. Validá que los casos sean reales.
- **Tono directo, no reflexivo.** Este Javi confronta, desafía, dice la verdad sin filtros. La autoridad de haber facturado millones le permite ser directo.
- **Segmentá el avatar.** Los tipos de avatar (4 en MC) hacen que cada perfil se sienta visto y alimentan la personalización del funnel posterior.
- **Más ganchos que en conciencia.** La audiencia profesional es más sofisticada y la inversión en ads más alta — genera hasta 10 variantes de gancho.
- **Duración ~18 min.** El ticket alto justifica un VSL más largo y completo que el de conciencia.
