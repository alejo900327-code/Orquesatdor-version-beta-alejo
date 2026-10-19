# Sistema maestro de implementación — Landing pages elite de respuesta directa (Cloudflare)

> **Cerebro de diseño y conversión de la Fábrica.** Conocimiento base que TODOS los agentes de maquetado/copy/QA consumen. Complementa (no reemplaza) el resto del sistema. Fuente: investigación consolidada del fundador (2026).
> Archivos operativos derivados: `tokens.css` (sistema de diseño), `SPEC-PAGINA.md` (input por página), y los guardrails/QA que aplican `constructor-pagina` y `verificador-adversarial`.

## 0. Filosofía operativa
**Premium en el OFICIO. Respuesta directa en la ESTRUCTURA.**
- **Premium (constante):** tipografía excelente, espaciado en sistema, paleta restringida, imágenes propias, performance, micro-interacciones con propósito.
- **Respuesta directa (según oferta):** páginas largas cuando la oferta lo pide, copy abundante, CTA repetido, prueba social densa, urgencia honesta, objeciones explícitas.

Modelo mental de cada decisión (Demand Curve):
```
Conversión ≈ (Deseo + Confianza) / (Esfuerzo + Confusión)
```
Todo elemento debe subir deseo/confianza o bajar esfuerzo/confusión. Si no hace ninguna, sobra.
**Lección Basecamp:** un rediseño "más bonito" sin testear puede BAJAR la conversión. Nunca rediseñes "porque se ve mejor": mide.

---
## PARTE 1 — SISTEMA DE DISEÑO REUTILIZABLE
### 1.1 Tokens en 3 capas
1. **Primitivos:** valores crudos (`--blue-600`, `--space-4`).
2. **Semánticos (alias):** intención (`--color-action`, `--color-text`). **Aquí ocurre el theming.**
3. **De componente:** específicos (`--button-bg: var(--color-action)`).
Regla: **ningún bloque usa valores hard-coded.** Todo consume tokens → clonar y re-tematizar es trivial. Ver `tokens.css`.
**Anti-FOUC (edge Cloudflare):** aplica `data-theme` inline/estático en el HTML servido.

### 1.3 Qué hace que algo se vea "caro" (por impacto/esfuerzo)
1. **Whitespace generoso** (#1; pero modula: demasiado puede bajar respuesta directa). 2. **Tipografía excelente** (mayor impacto/menor esfuerzo; fuente auto-hospedada de calidad). 3. **Paleta restringida** (60-30-10). 4. **Imágenes propias** (stock genérico destruye valor). 5. **Micro-interacciones funcionales.** 6. **Grid y alineación consistentes.** 7. **Performance** (velocidad = calidad percibida).

### 1.4 Librería de bloques (Lego que consume tokens)
Hero (con-form · con-VSL · solo-CTA · con-countdown) · Barra "as seen on" · Bloque VSL · Prueba social (texto/video/estrellas/contadores/casos) · Bio del mentor/autoridad · Oferta/stack de valor · Garantía/reversión de riesgo · FAQ/objeciones · Urgencia/escasez · Quiz · Agenda/ponentes · Tipos de ticket/pricing · CTA final.
Modelo de 3 niveles: **tokens → bloques → páginas.**

### 1.5 Consistencia vs personalización
El sistema gobierna el OFICIO; el copy gobierna el ÁNGULO. Cada oferta cambia copy/imágenes/orden de bloques, NO la escala tipográfica ni el espaciado. Rompe el sistema solo si: (a) alto ticket que exige tratamiento más exclusivo; (b) test A/B documentado → **promueve el ganador a token/variante**; (c) skin temporal de campaña.

---
## PARTE 2 — PLAYBOOKS POR TIPO DE PÁGINA
### 2.1 Anatomía universal (promesa → prueba → acción)
Hero (titular-beneficio que hace match con el anuncio = "conversion scent" · subtítulo del cómo · UN CTA) → prueba social inmediata → propuesta de valor/beneficios → prueba social profunda → oferta/stack + garantía → objeciones/FAQ → CTA final repetido. Copy a orden visual: PAS / AIDA.

### 2.2 Por formato (orden · decisiones · qué testear primero)
- **A) Opt-in:** Hero con-form (beneficio del recurso + form mínimo) → "as seen on" → 2-3 testimonios → CTA. Testear: titular, luego nº de campos.
- **B) VSL:** Headline (refleja primeros 15s) → VSL arriba del fold → bullets bajo el video → prueba → oferta/garantía → CTA → FAQ. Sin nav (ratio 1:1). **Revela el botón por tiempo.** Subtítulos+bullets para los que no ven el video. Testear: hook del video y momento de revelado del CTA.
- **C) Quiz:** directo a la 1ª pregunta → 5-10 preguntas, una por pantalla, barra de progreso → **opt-in ANTES del resultado** → resultado personalizado por outcome → CTA del resultado. Empieza por preguntas fáciles. Testear: splash sí/no, ubicación del opt-in.
- **D) Sales page larga:** Hero → prueba inmediata → PAS visual → oferta/stack → prueba profunda (casos) → garantía → objeciones/FAQ → CTA repetido (arriba/medio/final). Testear: titular y orden de bloques.
- **E) Lanzamiento (PLF):** = sales page + **urgencia real** (countdown de cierre de carrito) junto al CTA. Deadline genuino, early-bird con subida real. Testear: posición/framing del countdown.
- **F) Evento presencial / Cumbre:** Hero con-countdown (fecha+lugar+CTA) → ponentes prominentes → agenda/tracks → tipos de ticket (2-3 tiers, early-bird) → prueba social de ediciones anteriores (fotos/video/quotes) → FOMO de plazas limitadas → CTA repetido. Countdown atado a **subida de precio**. Si no hay ponentes confirmados, muestra los de ediciones pasadas. Transmite la experiencia/transformación, no solo logística. Testear: estructura de tickets y prueba social de la edición anterior.
- **G) Alto ticket (aplicación):** Hero (transformación) → bio/autoridad del mentor → prueba profunda (casos antes/después) → mecanismo único → objeciones → **CTA = aplicar/agendar** (no "comprar"). Diseño que señala valor (whitespace, display, paleta exclusiva). Más campos = mejor calificación. Testear: oferta/mecanismo y copy del CTA.

---
## PARTE 3 — DECISIONES VISUALES BASADAS EN EVIDENCIA
> **Método:** la mayoría de "case studies" CRO vienen de blogs de vendedores, no de peer-review. Trata cada número como **hipótesis a testear en tu propio tráfico**.

- **3.1 CTA — no es el color, es el CONTRASTE** (efecto Von Restorff): el CTA debe ser el de mayor peso visual en su contexto. **Copy del botón > color:** primera persona ("Empezar mi prueba"), verbos de valor ("Obtener/Descubrir") > obligación ("Enviar"). Solo 1/7 tests de botón llega a significancia (lift medio ~49% cuando lo hace). Repite el CTA en los puntos de decisión.
- **3.2 Above the fold (matizado):** el scroll sí ocurre. Ofertas complejas/caras → construye valor ANTES de pedir la acción; ofertas simples → CTA arriba funciona.
- **3.3 Imágenes vs video:** el video NO siempre gana (Brookdale: imagen estática +3.92% vs video +0.85%). Imágenes propias > stock.
- **3.4 Formularios:** la conversión cae al subir campos, pero NO es universal (estabiliza 4-7). Pide solo lo que aporta valor o califica. Alto ticket: más campos = mejor calificación. Multi-paso mejora finalización.
- **3.5 Prueba social:** testimonio = cara + nombre + **resultado específico**; intercalada, no amontonada. Logos "as seen on" = autoridad transferida. Contadores = bandwagon. Casos antes/después para alto ticket. Video testimonial = máxima autenticidad.
- **3.6 Urgencia ética:** *si el cliente supiera la verdad detrás del mensaje, ¿se sentiría engañado?* Si sí, no lo uses. SÍ: cierre real, early-bird real, plazas reales. Countdown junto al CTA.
- **3.7 Psicología:** Cialdini (reciprocidad, compromiso/consistencia, prueba social, autoridad, simpatía, escasez honesta, unidad). **Ley de Hick → UN CTA.** Ley de Fitts → botones grandes/separados en móvil. F-pattern = mala señal (prevén con jerarquía); Z-pattern para poco contenido.
- **3.8 Móvil primero:** 83% del tráfico es móvil. Diseña para smartphone y escala. Velocidad: cada segundo ≈ −7%; >3s dispara abandono. **Edge Cloudflare = ventaja:** CSS crítico inline, woff2 auto-hospedadas en R2, imágenes comprimidas, JS mínimo.
- **3.9 Errores que matan:** hero sobrecargado · CTA sin contraste · demasiados CTAs/links · forms largos sin justificar · lento en móvil · stock genérico · urgencia falsa · rediseño bonito sin testear.

---
## PARTE 4 — HERRAMIENTAS (por fases, todo Cloudflare-friendly)
- **Fase 0 (base):** Tailwind v4 o tokens CSS puros (<10KB) · fuentes variables auto-hospedadas woff2 en R2 (`font-display:swap` + preload) · iconos Lucide/Phosphor (SVG) · paleta monocroma + 1 acento.
- **Fase 1 (bajo riesgo):** CSS scroll-driven animations nativas (`@supports` fallback) · Lenis (~3KB) smooth scroll · micro-interacciones CSS · respeta `prefers-reduced-motion`.
- **Fase 2 (elite):** **GSAP 100% gratis** (ScrollTrigger, SplitText, MorphSVG, Flip…) vía CDN/auto-hospedado · Motion (si React) · fondos wow de bajo coste (Vanta/tsParticles/mesh gradient).
- **Fase 3 (3D solo si justifica):** Spline/Three.js/OGL · lazy-load, fallback estático móvil, dimensiones reservadas (anti-CLS), assets en R2; si no es interactivo, exporta a vídeo/imagen.
- **Performance 2026 (CWV p75):** **LCP ≤2.5s · INP ≤200ms · CLS ≤0.1.** Prioriza el hero (mayor fallo = LCP). Anima solo `transform`/`opacity`. Hero WebP/AVIF <100-200KB con `fetchpriority="high"`, nunca `loading="lazy"` en el LCP. Referencia: Vodafone +31% LCP → +8% ventas.

---
## PARTE 5 — OPERACIÓN
### 5.3 Guardrails que el generador NUNCA rompe
1. **Un solo objetivo de conversión por página** (un CTA repetido al mismo destino — Ley de Hick).
2. **Mobile-first** (83% del tráfico).
3. **Solo tokens, cero hard-coded** en los bloques.
4. **Presupuesto de performance:** LCP ≤2.5s / INP ≤200ms / CLS ≤0.1; animar solo transform/opacity; lazy-load de lo pesado; nada bloquea el LCP.
5. **Urgencia solo si es real** (test ético).
6. **`prefers-reduced-motion`** en toda animación.
7. **Regla de oro del stack:** todo en Cloudflare; assets pesados en R2; sin dependencias que rompan el edge.
8. **No rediseñar sin medir** (Basecamp).

### 5.4 Checklist QA pre-publicación
- [ ] H1 hace match con el anuncio (conversion scent).
- [ ] Un objetivo de conversión; CTA destaca (mayor peso visual) y se repite en puntos de decisión.
- [ ] Prueba social con cara + nombre + resultado específico, intercalada.
- [ ] Formulario mínimo (o multi-paso/calificación si alto ticket).
- [ ] Urgencia (si hay) real y junto al CTA.
- [ ] Garantía/reversión de riesgo (sales pages).
- [ ] Objeciones/FAQ cubiertas.
- [ ] Móvil: una columna, targets amplios, teclados correctos, CTA visible.
- [ ] Performance: LCP ≤2.5s / INP ≤200ms / CLS ≤0.1; hero WebP/AVIF `fetchpriority=high`; fuentes woff2; animación solo transform/opacity.
- [ ] `prefers-reduced-motion` respetado.
- [ ] `data-theme` correcto sin FOUC.
- [ ] Tracking/atribución cableado (visita→evento→conversión).

### 5.5 A/B testing — orden por impacto
1. Titular/propuesta de valor · 2. Estructura/orden de bloques · 3. Oferta y reversión de riesgo · 4. Copy del CTA · 5. Hero (imagen vs video vs nada) · 6. Nº de campos · 7. Prueba social.
No te obsesiones con el color del botón. Un cambio por test. **Promueve ganadores a tokens/variantes.**

### 5.6 Umbrales que cambian la decisión
- Conversión móvil >8% bajo desktop → prioriza velocidad/form móvil. · Form >5 campos y buscas volumen → recorta o multi-paso. · Alto ticket → mantén campos de calificación. · Rediseño "premium" no mueve/baja → revierte. · Alto ticket "de plantilla" → invierte en signaling. · 3D sube TBT/INP → reemplaza por vídeo/imagen. · LCP >2.5s → optimiza hero antes de añadir efectos.

---
## Apéndice — Integridad de datos
Trata los números CRO como hipótesis, no leyes (contexto manda). Correcciones: el "video +46%/+27%" es *tasa de reproducción*, no lift; "+304% CTA bajo el fold" lleva la advertencia del propio autor; "menos campos siempre gana" no es universal; "+743% del quiz" es caso singular. GSAP gratis confirmado (Webflow, 2025). CSS scroll-driven parcial en Firefox → `@supports`.
