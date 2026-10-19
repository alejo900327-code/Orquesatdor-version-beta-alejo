---
name: anuncios-vsl
description: Genera scripts de anuncios de video para Meta Ads (Facebook/Instagram) que dirigen tráfico a un VSL, en el estilo probado de Millonarios Conscientes. Produce sets de 5 anuncios diferenciados por formato para evitar canibalización, en dos modos. Modo conciencia (tono reflexivo, audiencia amplia, para VSL de ticket bajo/medio) o modo high-ticket (tono directo y confrontacional, nicho profesional, para VSL premium). Úsala SIEMPRE que el usuario quiera crear anuncios, ads, scripts de video para Meta/Facebook/Instagram, o creativos para meter tráfico a un VSL o página de ventas. Dispara esta skill con frases como "hazme los anuncios para este VSL", "necesito ads para Meta", "genera los anuncios de Facebook para este producto", "crea creativos para mi embudo", "adapta los anuncios de MC a este otro producto". El anuncio NO vende el producto; vende el clic al VSL.
---

# Anuncios para VSL — Generador de Scripts para Meta Ads

Esta skill reconstruye el framework de anuncios de video de Millonarios Conscientes, probado en Meta Ads, para generar creativos que metan tráfico a un VSL.

Principio fundamental: **el anuncio no vende el producto. Vende el clic al VSL.** Su única función es detener el scroll, generar curiosidad o tocar un dolor, y mover a la persona a ver el video largo donde ocurre la venta real. Modelo: Ad → VSL → Oferta.

## Los dos modos

La skill opera en dos modos según el VSL al que dirige el tráfico:

**Modo CONCIENCIA** (para VSL de ticket bajo/medio, tipo Método Fuerza al Poder)
- Audiencia amplia, ángulo de transformación interna
- Tono reflexivo, contemplativo, pausado
- Lenguaje universal, SIN dinero ni negocio
- 5 formatos: Enseñanza, Manifiesto, Confesión, Revelación, Reflexión
- Duración: 60-75 seg

**Modo HIGH-TICKET** (para VSL premium, tipo MC Vitalicio)
- Nicho profesional (coaches, terapeutas, formadores), ángulo de negocio
- Tono directo, confrontacional, con autoridad
- Lenguaje business específico, con números y resultados
- 5 formatos: Confrontación, Historia, Diagnóstico, Caso, Espejo
- Duración: 50-70 seg

Si el usuario no especifica, preguntá a cuál VSL dirigen los anuncios para elegir el modo correcto.

## Por qué 5 formatos diferentes (regla anti-canibalización)

Este es el error estratégico más común y el que esta skill resuelve. La persona en Meta no ve un anuncio — ve 5, 10, 15 al día. Si los 5 anuncios de un producto siguen el mismo patrón, se canibalizan: el algoritmo los trata como la misma cosa y el usuario piensa "ya vi esto".

Por eso cada set tiene 5 formatos DISTINTOS entre sí. No solo mensajes distintos — estructuras y energías distintas. Esto le da al algoritmo audiencias diferentes para cada formato y te permite identificar qué formato convierte mejor.

Regla de oro: dentro de un set, ningún anuncio debe sonar como otro en los primeros 3 segundos.

## Proceso de creación

### Paso 1 — Diagnóstico (preguntar primero)

1. **¿A qué VSL dirigen los anuncios?** (determina el modo: conciencia o high-ticket)
2. **¿Qué producto y qué promete?** (la transformación o el resultado)
3. **¿Quién es el avatar?**
4. **¿Cuál es el mecanismo / fuente de autoridad del VSL?** (para la autoridad prestada — en MC: Hawkins)
5. **¿Hay casos de éxito con datos?** (nombres, cifras, timeframes — clave para los formatos Caso e Historia)
6. **¿Cuál es la historia del presentador?** (para los formatos Confesión e Historia)
7. **¿Qué alternativas ya probó el avatar?** (para la destrucción de alternativas)

### Paso 2 — Leer las referencias

**Conexión con el sistema (LEE PRIMERO, viven en el repo):** el Cerebro de la marca (`cerebros/<marca>/cerebro.md` — voz, prueba REAL, mecanismo de autoridad; MC: `cerebros/millonarios-conscientes/cerebro.md`) + `conocimiento/_COMPARTIDO/playbook-vsl-anuncios.md` §4 (el framework de anuncios) + `playbook-mercado-hispano.md`. Lo de marca manda sobre lo genérico.

Luego, las referencias de esta skill:
- `references/tecnicas-y-testing.md` — Las técnicas transversales del framework (autoridad prestada, specificity bias, negación por exclusión, 3 pasos incompletos, doble CTA) + el plan de testing y segmentación. **Leer siempre.**
- `references/formatos-conciencia.md` — Los 5 formatos del modo conciencia con estructura y ejemplos. (Leer si modo conciencia.)
- `references/formatos-high-ticket.md` — Los 5 formatos del modo high-ticket con estructura y ejemplos. (Leer si modo high-ticket.)

### Paso 3 — Escribir los 5 anuncios

Generá los 5 anuncios del modo correspondiente, cada uno con un formato distinto. Para cada anuncio:
- Estructura por tiempos (Hook 0-5s → Desarrollo → ... → CTA)
- Aplicá las técnicas transversales donde corresponda
- Mantené el tono del modo (reflexivo o directo)
- El CTA siempre dirige al VSL ("mira el video", "dale click al enlace")

### Paso 4 — Entregar en docx

Entregá los 5 anuncios en un documento Word, con:
- Portada indicando modo, VSL destino y los 5 formatos
- Cada anuncio con su formato, nota de producción y estructura por tiempos
- Una sección final de notas de implementación (testing, segmentación Meta, métricas)

Usá la skill `docx`. Si el usuario quiere los dos sets (conciencia y high-ticket), entregá dos documentos separados — nunca mezclados, porque sirven a embudos distintos.

## El framework de anuncio en una mirada

Todo anuncio del framework sigue esta estructura base (los formatos varían cómo se ejecuta):

1. **Hook (0-5 seg)** — detener el scroll. La única función de la apertura.
2. **Desarrollo (5-30 seg)** — desarrollar el ángulo: el descubrimiento, la historia, el dolor, el dato.
3. **Destrucción de alternativas** — "no es X, no es Y" — eliminar lo que ya probó y diferenciar.
4. **3 pasos incompletos (opcional)** — dar pasos reales pero omitir el "cómo" completo (eso está en el VSL).
5. **CTA (doble)** — dirigir al VSL, repetido para reforzar.

## Reglas críticas

- **El anuncio vende el clic, no el producto.** Nunca intentes cerrar la venta en el ad. Solo llevá al VSL.
- **5 formatos distintos por set.** Anti-canibalización. Ningún anuncio suena como otro.
- **Modo correcto según VSL.** Conciencia = reflexivo + sin dinero. High-ticket = directo + business.
- **Autoridad prestada real.** Usá la fuente del VSL (en MC: Hawkins). Una autoridad científica real pesa más que "le pregunté a una IA".
- **Specificity bias.** Números exactos, nombres reales. "$10,000 en 6 meses" vende más que "mucho dinero rápido".
- **Doble CTA al final.** Repetir el llamado a la acción aumenta CTR. Es una técnica del framework.
- **Subtitulado obligatorio.** 80%+ del tráfico en Meta es sin audio. Anotarlo en las notas de producción.
- **Coherencia ad-to-VSL.** El anuncio continúa la conversación que el VSL retoma (ad-to-page congruence).
