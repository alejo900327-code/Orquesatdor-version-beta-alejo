# 🧠 Fábrica de Estrategia · Fase 1.5 (Agnóstico de marca)

> **Qué es:** la flota multiagéntica que diseña el **negocio** antes de producir una sola landing — la oferta, la escalera de ascensión, el embudo y los números — y **enriquece el Cerebro**. Es la capa que faltaba: hasta ahora la estrategia la pensábamos a mano; aquí se vuelve sistema replicable.
>
> **Dónde encaja:** corre **después de la Investigación (Fase 1) y antes de los Ángulos (Fase 2)**. ¿Por qué después de investigar? Porque la oferta nace del lenguaje real del avatar y del VoC: no se puede diseñar una oferta irresistible sin haber investigado primero. La investigación es el **cimiento compartido** que alimentan tanto la estrategia como las landings.
>
> **Regla de replicabilidad:** ningún nombre de marca aquí. Todo lo variable vive en el Cerebro. Cambiar de marca = cambiar el Cerebro.

Operacionaliza la etapa **"Idea/Estrategia" del Founder's Playbook (Anthropic, 2026)** — validar hipótesis de problema, mapa competitivo, distinguir PMF real de hype — y **apalanca `PLAN-ORQUESTADORES-IA.md`** como base de conocimiento de patrones reales (precios, casos, funciones de cada peldaño). Los agentes abstraen ese patrón a cualquier marca; respetan sus datos; nunca copian una marca.

---

## La cadena completa (dónde vive esta fase)

```
[ Conocimiento crudo: PDFs, chats, experiencia ]
            │  (kit de extracción)
            ▼
   FASE 0 · CEREBRO crudo (§1-2: mercado y avatar inicial)
            │
   FASE 1 · INVESTIGACIÓN   (avatar, VoC, competencia)  ← CIMIENTO compartido
            │  alimenta a ambas flotas
            ▼
   FASE 1.5 · FÁBRICA DE ESTRATEGIA   ←★ ESTE DOCUMENTO
   arquitecto-oferta → arquitecto-escalera → estratega-embudo
   → modelador-economico → verificador-estrategia (Gate G0)
            │  enriquece
            ▼
       [ cerebro.md completo ]   ← input único de todo lo demás
            │
   FASE 2-5 · FÁBRICA DE LANDINGS   (SOP-lanzamiento.md)
            │
   FASE 6 · OS DE LANZAMIENTO       (OS-LANZAMIENTO-ORGANICO.md)
```

> **La investigación (Fase 1) no es de la estrategia ni de las landings: es de ambas.** Por eso va antes y se hace una sola vez por lanzamiento.

---

## Los agentes de la Fase 1.5 (la flota completa de 5)

| # | Agente | Diseña | Escribe en |
|---|---|---|---|
| 1 | `arquitecto-oferta` | promesa, mecanismo único, stack de valor, bonos, reversión de riesgo, anclaje de precio | Cerebro §3 + `salidas/<lanz>/00-oferta.md` |
| 2 | `arquitecto-escalera` | la escalera de ascensión (imán→membresía→certificación→círculo→IA), precio posicionado, lógica de conexión | Cerebro §3 + `salidas/<lanz>/00-escalera.md` |
| 3 | `estratega-embudo` | el journey del cliente + mecanismo de lanzamiento (reto/webinar/VSL/evergreen/orgánico); conecta al OS de lanzamiento | `salidas/<lanz>/00-embudo.md` |
| 4 | `modelador-economico` | la economía: tráfico→lead→venta, CAC, LTV por peldaño, equilibrio, 3 escenarios; conecta a los cockpits | `salidas/<lanz>/00-modelo.md` |
| 5 | `verificador-estrategia` | **Gate G0**: ataca oferta+escalera+embudo+modelo, puntúa 0-100, bloquea lo flojo | `salidas/<lanz>/qa/00-estrategia.score.md` |

> **El de mayor apalancamiento es `arquitecto-oferta`:** en respuesta directa, la oferta vence a la copy. Una oferta irresistible convierte hasta con copy cruda; una landing perfecta sobre una oferta mediocre no.

---

## Cómo se corre (manual asistido)

> Convención idéntica al SOP: "Invoca X" = Tool `Agent` con `subagent_type: "X"`, pasándole la ruta del Cerebro.

> **Prerrequisito:** la Investigación (Fase 1) ya corrida — `01-avatar.md` y `02-voc.md` existen. Sin eso, la oferta sale genérica.

1. **Invoca `arquitecto-oferta`** → diseña la oferta del peldaño en foco → Cerebro §3 + `00-oferta.md`.
2. **Invoca `arquitecto-escalera`** → diseña la escalera completa y la conexión entre peldaños → Cerebro §3 + `00-escalera.md`.
3. **Invoca `estratega-embudo`** → elige mecanismo de lanzamiento y mapea el journey → `00-embudo.md`.
4. **Invoca `modelador-economico`** → proyecta la economía en 3 escenarios → `00-modelo.md`.

> Pasos 3 y 4 pueden lanzarse en paralelo (ambos leen oferta+escalera).

5. **Invoca `verificador-estrategia`** → **Gate G0** sobre los 4 entregables. PASA / ITERA / MATA.

> **Decisión fundador (~15 min):** revisa el score G0 y aprueba. Si ITERA, se re-invoca al agente correspondiente con el fix #1.

---

## Compuerta numérica · Gate G0

| Gate | Mide | Umbral por defecto | Fuente | Si falla |
|---|---|---|---|---|
| **G0 — Estrategia sólida** | oferta irresistible · escalera conectada · precio defendible · supuestos realistas · honestidad | score ≥ `{{min_score_estrategia}}` (def. 80) | `qa/00-estrategia.score.md` | ITERA → vuelve a oferta/escalera. MATA → no hay negocio viable, no insistir. |

> **Regla dura:** nada pasa a la Fase 2 (Ángulos) sin **G0 = PASA**. Producir landings sobre una estrategia rota es quemar trabajo. G0 es el seguro.

Añade el umbral al Cerebro §7:
```markdown
- min_score_estrategia: 80   # G0 · score mínimo del verificador-estrategia
```

---

## Cómo apalanca el conocimiento (sin violar las fuentes)

- **`PLAN-ORQUESTADORES-IA.md`** → base de patrones reales. Los agentes leen precios/casos/funciones y los **abstraen**. No se copia ninguna marca de ese documento; se respeta su data como referencia de "qué es realista".
- **Founder's Playbook (Anthropic)** → la lógica de etapa: validar la hipótesis de problema y la diferenciación (hueco de mercado) ANTES de construir, y el principio PMF-vs-hype que el `verificador-estrategia` aplica a los supuestos.
- **Tus activos** → `activos/voc-maestro.md` y `activos/angulos-ganadores.md` alimentan al `arquitecto-oferta` con el lenguaje y las palancas que ya demostraron resonar.

---

## El loop (cierra con el resto del sistema)

La estrategia no es de una vez: tras cada lanzamiento, los resultados del OS (PMF real, peldaño que más convirtió) **vuelven a la Fase 0** para afinar oferta y escalera del siguiente ciclo. La Fase 0 lee lo que la Fase 6 aprendió. Así el negocio entero se auto-mejora, no solo las landings.

---

## Replicar a cualquier marca (la cadena entera)

1. **Extrae el Cerebro** crudo (`cerebros/_KIT-EXTRACCION-CEREBRO.md`) con los PDFs/chats de la marca.
2. **Corre la Investigación** (Fase 1 del SOP) → avatar, VoC, competencia.
3. **Corre la Fase 1.5** (este documento) → oferta + escalera + embudo + modelo, pasa G0 → Cerebro completo.
4. **Corre Fases 2-6** → landings + lanzamiento.

Mismo sistema. Distinto Cerebro. De idea cruda a negocio a dinero, todo multiagéntico.
