# SOP · Cómo correr un lanzamiento (manual asistido)

Procedimiento paso a paso para producir 15-20 landings de calidad-fundador. Tiempo del orquestador: ~medio día. Tiempo del fundador (solo decisiones): ~45 min repartidos.

> Convención: "Invoca X" = usa el Tool `Agent` con `subagent_type: "X"` y pásale en el prompt la ruta del Cerebro y los inputs que pida. Las fases paralelas se lanzan en un solo mensaje con varias llamadas.

---

## Pre-requisito · El Cerebro

Abre `cerebros/<nicho>/cerebro.md` y verifica que esté completo, sobre todo:
- Avatar y dolor/deseo central
- Oferta + escalera de precios
- **Activos de prueba REALES** (testimonios con permiso, resultados verificables) — si está vacío, el lanzamiento sale sin prueba social hasta llenarlo. Nunca se fabrica.
- Voz/tono + 2-3 landings tuyas pasadas como referencia (en `activos/voz-de-marca/`)
- Guardarraíles éticos del nicho

---

## FASE 1 · Investigación  (paralelo, ~15 min)

Lanza en un solo mensaje:
1. **Invoca `investigador-avatar`** → escribe `salidas/<lanzamiento>/01-avatar.md`
2. **Invoca `voice-of-customer`** → escribe `salidas/<lanzamiento>/02-voc.md` (banco de frases textuales)
3. **Invoca `inteligencia-competitiva`** → escribe `salidas/<lanzamiento>/03-swipe.md` (estructuras, no copia)

> Decisión fundador (5 min): hojea el avatar y el VOC. ¿Suena a tu gente? Si algo está flojo, re-invoca con corrección.

---

## FASE 2 · Ángulos  (~10 min)

4. **Invoca `generador-angulos`** (lee avatar + VOC) → `salidas/<lanzamiento>/04-angulos.md` (20-30 ángulos)
5. **Invoca `selector-angulos`** → puntúa y rankea por deseo/emoción/recurrencia/diferenciación/seguridad-ética.

> **Decisión fundador (20 min):** elige los 15-20 ángulos que van a producción. Marca tus elegidos en `04-angulos.md`.

---

## FASE 3 · Copy  (paralelo masivo, ~20 min de reloj)

6. Por cada ángulo elegido, **invoca `copywriter-landing`** (uno por ángulo, todos en paralelo) → `salidas/<lanzamiento>/landings/NN-<slug>.md`
7. Por cada landing, **invoca `generador-hooks`** → variantes de gancho para el testeo pagado.

---

## FASE 4 · Maquetado

8. Por cada copy aprobado, **invoca `constructor-pagina`** → `salidas/<lanzamiento>/html/NN-<slug>.html`

---

## FASE 5 · Compuertas de calidad  (esto reemplaza tu criterio)

Por cada landing, en cadena (reglas primero, jueces después):
9. **`editor-voz-marca`** — ¿suena a ti? Reescribe lo que no.
9.5. **Linter determinista** (gratis, sin LLM): `node herramientas/lint-landing.mjs <landing.md> --reglas cerebros/<marca>/guardarrailes.json`. BLOQUEO = vuelve a Fase 3 sin gastar un token de juez; sus AVISOS se le pasan al guardián como focos.
10. **`guardian-etico`** — APRUEBA / BLOQUEA con razones. Bloqueo = vuelve a Fase 3.
11. **`verificador-adversarial`** — puntúa probabilidad de conversión 0-100; manda a reescribir las <70.

> Solo pasa a publicación lo que tiene: linter ✓ · voz ✓ · ética ✓ · score ≥70.
> El workflow (`fabrica-landings.workflow.js`) ya corre este ciclo SOLO: reescribe con el reporte de los verificadores como input y re-verifica, máximo 2 rondas; lo que no pasa cae a tu cola humana.

---

## FASE 6 · Lanzamiento y aprendizaje

> Dos rutas según presupuesto:
> - **Orgánica (sin pauta):** sigue `OS-LANZAMIENTO-ORGANICO.md` → compuertas G1-G4, motor de contenido, valida PMF antes de gastar.
> - **Pagada:** la de abajo.

12. Media buyer publica, testea en frío, **mata perdedoras, duplica y varía ganadoras**.
13. Cierre del loop: **invoca `registrador-ganadores`** con los resultados reales de la pauta → registra ganadores/muertos en `activos/angulos-ganadores.md` (con veredicto ESCALAR/ITERAR/MATAR/DATA-INMADURA), añade frases nuevas al `activos/voc-maestro.md` y te propone cambios al Cerebro. El `generador-angulos` y el `selector-angulos` ya leen ese registro. **Así el siguiente lanzamiento empieza más inteligente.**

---

## Atajo: todo el pipeline de una

Si quieres correr las fases 1-5 orquestadas y en paralelo, usa el workflow:
`workflows/fabrica-landings.workflow.js` (requiere lanzarlo con la herramienta Workflow; consume bastante — confírmalo antes).
