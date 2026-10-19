---
name: vsl-conciencia
description: Genera un VSL (Video Sales Letter) de venta directa para productos de conciencia, transformación personal y desarrollo humano dirigidos a audiencia amplia, en el estilo del Método Fuerza al Poder de Millonarios Conscientes. Úsala SIEMPRE que el usuario quiera crear un VSL, guion de video de ventas, o script de venta para un producto de membresía, curso o programa de transformación personal de ticket bajo o medio ($17-$500) que va directo a checkout (sin llamada de ventas). Ideal para productos tipo Mindvalley o Silva (espiritualidad práctica, mindset, conciencia, hábitos, bienestar). Dispara esta skill con frases como "hazme un VSL para este producto", "necesito un guion de ventas estilo conciencia", "genera el video de ventas de mi membresía", "adapta el VSL de Fuerza al Poder a este otro producto". NO uses esta skill para productos high-ticket con llamada de ventas (para eso existe vsl-high-ticket).
---

# VSL de Conciencia — Generador de Video Sales Letters

Esta skill reconstruye la arquitectura del VSL del **Método Fuerza al Poder** (Millonarios Conscientes) para que puedas generar un VSL de alta conversión para cualquier producto de transformación personal dirigido a audiencia amplia.

El modelo está basado en ingeniería inversa de VSLs de venta directa estilo Mindvalley/Silva Ultramind, integrando material científico real como mecanismo de autoridad (en el caso de MC: la obra de David Hawkins, *El Poder contra la Fuerza*).

## Cuándo aplica este modelo

Este VSL es para productos donde:
- El precio es bajo o medio ($17-$500), pago directo (sin llamada)
- La audiencia es amplia (no un nicho profesional específico)
- El ángulo es **transformación interna**, no resultados de negocio
- El objetivo es que la persona mire el video completo y haga click a checkout
- El producto es una membresía, curso o programa de conciencia/mindset/bienestar

Si el producto es high-ticket ($1,500+) con aplicación y llamada de ventas, usa la skill `vsl-high-ticket` en su lugar.

## Principio rector: el ángulo es conciencia, NO dinero

Este es el error más común y el más caro. Un VSL de conciencia vende **transformación interna**. El dinero y los resultados materiales pueden estar IMPLÍCITOS (como hace Mindvalley con "abundancia" y "éxito") pero NUNCA con cifras de facturación, ni lenguaje de negocio.

- ❌ Prohibido: "facturar $10,000/mes", "escalar tu negocio", "conseguir más clientes", "duplicar tus ventas"
- ✅ Permitido: "abundancia", "éxito", "resultados", "tu vida cambia", "claridad", "energía"

El puente al dinero ocurre SOLO en la sección de objeciones, con la fórmula "¿es espiritualidad o negocios? Es las dos cosas" — y aun ahí el foco es la transformación, no las cifras.

## Proceso de creación

### Paso 1 — Diagnóstico del producto (SIEMPRE preguntar primero)

Antes de escribir una sola palabra, reúne esta información. Si el usuario no la da, pregúntala:

1. **¿Qué producto es y qué transformación interna promete?** (la transformación, no el feature)
2. **¿Precio y modelo?** ($X/mes o $Y/año, o pago único)
3. **¿Quién es el avatar?** (1 línea: quién es, qué siente, qué desea)
4. **¿Cuál es el dolor #1 del avatar?** (el dolor emocional, no práctico)
5. **¿Hay un mecanismo central / fuente de autoridad?** (en MC: Hawkins y la escala de conciencia. En otro producto puede ser otra investigación, marco, o descubrimiento. Si no hay uno, ayúdale a construirlo — el VSL NECESITA un mecanismo único con autoridad.)
6. **¿Historia personal del presentador?** (el momento de quiebre que lo llevó a descubrir esto)
7. **¿Casos de éxito o testimonios disponibles?**
8. **¿Qué incluye el producto?** (componentes, acceso, comunidad, en vivo, etc.)

### Paso 2 — Leer las referencias

**Conexión con el sistema (LEE PRIMERO, viven en el repo):**
- **El Cerebro de la marca** (`cerebros/<marca>/cerebro.md`) — la VOZ real del fundador, la oferta, los precios, la prueba REAL y los guardarraíles. **Es la fuente de verdad de la marca; manda sobre las referencias genéricas de esta skill.** (Para Millonarios Conscientes: `cerebros/millonarios-conscientes/cerebro.md`.)
- `conocimiento/_COMPARTIDO/playbook-vsl-anuncios.md` — la arquitectura transferible de VSL (esta skill la ejecuta).
- `conocimiento/_COMPARTIDO/playbook-persuasion.md` + `playbook-mercado-hispano.md` — craft de persuasión y psicología cultural latina.
- `conocimiento/_COMPARTIDO/compliance-2025.md` — disclaimers requeridos.

Luego, los archivos de referencia de esta skill (estilo MC, úsalos como PLANTILLA si la marca es otra):
- `references/estructura-bloques.md` — La arquitectura completa de 10 bloques, con el propósito y la ingeniería inversa de cada uno. **Este es el corazón de la skill.**
- `references/material-hawkins.md` — El material de Hawkins (escala, niveles, gravedad). Si la marca es MC o usa el mismo mecanismo, va directo. Si es otra marca, su mecanismo de autoridad sale de SU Cerebro; este archivo es la PLANTILLA de cómo integrar cualquier fuente de autoridad.
- `references/voz-javi.md` — La voz reflexiva de Javi (marca ancla). Si la marca es otra, la voz sale de la guía de voz de SU Cerebro; este archivo muestra el patrón de calibración.

### Paso 3 — Escribir el VSL bloque por bloque

Sigue la estructura de 10 bloques de `estructura-bloques.md`. Para cada bloque:
- Respeta el PROPÓSITO del bloque (no solo el contenido literal)
- Adapta el contenido al producto específico
- Mantén la voz reflexiva de `voz-javi.md`
- Mantén el ángulo 100% conciencia (sin dinero/negocio)

### Paso 4 — Entregar en formato docx

Entrega el VSL en un documento Word (.docx) estructurado por bloques, con:
- Indicaciones de grabación al inicio (qué grabar en video, qué en audio)
- Los ganchos/hooks claramente separados (genera 5-6 variantes para A/B testing)
- Cada bloque con su título y notas de producción donde aplique
- Límite de duración objetivo: ~15 minutos de video

Usa la skill `docx` para generar el archivo. Pon las secciones de copy en bloques visualmente distinguibles para que sea fácil pasarlo a grabación.

## La estructura en una mirada

El VSL tiene 10 bloques (detalle completo en `references/estructura-bloques.md`):

1. **Ganchos** (5-6 variantes para testear) — detener el scroll, crear curiosidad o tocar dolor
2. **Credibilidad rápida** — autoridad del presentador + prueba social masiva
3. **El problema real** — el dolor universal del avatar, reframeado
4. **Autoridad + historia personal** — el viaje del héroe del presentador hasta el momento de quiebre
5. **El mecanismo** — la fuente de autoridad científica + el descubrimiento central
6. **La distinción central** (Fuerza vs. Poder en MC) — la analogía que lo cambia todo
7. **Por qué nadie te lo enseñó** — destrucción de alternativas + posicionamiento como único
8. **Qué vas a recibir** — los componentes del producto (sin stacking agresivo)
9. **La oferta** — precio, planes, garantía
10. **Objeciones + pintar futuro + CTA** — derribar objeciones, visualización, cierre

## Reglas críticas

- **Ángulo conciencia siempre.** Si te encontrás escribiendo "facturación" o "negocio", parate y reescribí (excepto el puente de objeciones).
- **El mecanismo necesita autoridad real.** Una fuente científica, un investigador, un marco validado. Sin esto el VSL es solo motivación vacía.
- **La historia personal vende.** El momento de quiebre del presentador es el corazón emocional. Que sea vulnerable y específico.
- **Genera múltiples hooks.** Mínimo 5 variantes con ángulos distintos (emocional, científico, vulnerable, dato, analogía) para A/B testing.
- **Voz reflexiva, no de vendedor.** El tono es de alguien compartiendo algo importante, no empujando una venta. La autoridad viene de la calma.
- **Mantené el límite de 15 minutos.** Un VSL de conciencia más largo pierde a la audiencia amplia.
