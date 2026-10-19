# 🛰️ OS de Lanzamiento Orgánico · Agnóstico de marca

> **Qué es:** el sistema operativo que convierte la Fábrica en un lanzamiento **orgánico, medible y replicable**. No reemplaza al `SOP-lanzamiento.md` (que produce las landings) — lo continúa: toma esas landings y las **distribuye sin pauta**, valida con señal real y solo escala lo que demuestra tracción.
>
> **Por qué existe:** el SOP termina en "media buyer publica y testea en frío" (pauta). Este OS es la ruta **antes/sin dinero**: ganchos → contenido → lista → oferta, todo como cadena agéntica.
>
> **Regla de oro de la replicabilidad:** este documento **no menciona ninguna marca**. Todo lo variable vive en `cerebros/<nicho>/cerebro.md`. Para correrlo en otra marca: cambias el cerebro, nada más. Donde leas `{{...}}`, el valor sale del cerebro.

Inspirado en *The Founder's Playbook: Building an AI-Native Startup* (Anthropic, 2026) — sus 4 etapas (Idea → MVP → Launch → Scale) mapeadas a tus fases, con el founder como **orquestador** y cada etapa cerrada por una **compuerta numérica**.

---

## 0. Principio: "altamente computable"

Un paso es computable cuando tiene **input definido → output definido → criterio numérico de paso/no-paso**. Sin número, es opinión. Este OS le pone número a cada compuerta. Los umbrales de abajo son **valores por defecto**: cada cerebro puede sobreescribirlos en su sección `## 7. Umbrales de lanzamiento` (ver plantilla al final).

---

## 1. Mapa Playbook → Fábrica (las 4 etapas)

| Etapa Playbook | Fase fábrica | Agentes | Compuerta de salida (computable) |
|---|---|---|---|
| **1 · Idea** (validar problema, mapa competitivo, customer discovery) | Fase 1–2 | `investigador-avatar`, `voice-of-customer`, `inteligencia-competitiva`, `generador-angulos`, `selector-angulos` | **G1** · ≥ `{{min_angulos}}` (def. 15) ángulos con respaldo VoC citable y score selector ≥ `{{min_score_angulo}}` (def. 80). 1 "gran idea" marcada. |
| **2 · MVP** (arquitectura, alcance, sin deuda técnica) | Fase 3–4 | `copywriter-landing`, `generador-hooks`, `constructor-pagina` | **G2** · Landing viva en Cloudflare + 1 lead magnet real + oferta de entrada. Componentes reutilizan tokens de `activos/diseno/`. |
| **3 · Launch** (OS que reemplaza la atención del founder con workflows agénticos) | Fase 5 + Motor Orgánico (§3) | `editor-voz-marca`, `guardian-etico`, `verificador-adversarial` | **G3** · Pasa las 3 compuertas (voz ✓ · ética ✓ · score ≥ `{{min_score_conversion}}`, def. 70) **y** secuencia orgánica de `{{dias_lanzamiento}}` días programada. |
| **4 · Scale** (cuándo usar Chat / Cowork / Code) | Fase 4.5 + Cockpits | `localizador` + dashboards | **G4** · PMF real demostrado (§4) **antes** de localizar o meter pauta. |

---

## 2. Las compuertas numéricas (tablero de paso/no-paso)

> Esto es el corazón "computable". Nada avanza de fase sin cumplir su número.

| Gate | Mide | Umbral por defecto | Fuente del dato | Si falla |
|---|---|---|---|---|
| **G1 — Idea válida** | nº ángulos válidos · score selector | ≥15 ángulos · score ≥80 | `salidas/<lanz>/04-angulos.md` | Re-investigar avatar/VoC; afinar `generador-angulos`. |
| **G2 — MVP vivo** | landing publicada · lead magnet · oferta | URL Cloudflare activa | `salidas/<lanz>/html/` + cerebro §3 | Falta oferta o prueba → completar cerebro §3/§4. |
| **G3 — Listo para lanzar** | voz · ética · conversión | voz ✓ · ética ✓ · score ≥70 | compuertas Fase 5 | Vuelve a Fase 3 (reescritura). |
| **G4 — PMF real** | señal cuali + cuanti (§4) | ver matriz §4 | cockpit + bandeja/DMs | No escalar; iterar oferta/ángulo. |

---

## 3. El Motor de Contenido Orgánico (la pieza nueva)

El playbook llama a esto "el OS de lanzamiento que reemplaza la atención del founder con flujos agénticos". En orgánico, es una **cadena encadenada** que va del gancho a la venta sin que el founder produzca a mano:

```
[Cerebro] → [Ángulos G1] → [Ganchos] → [Piezas de contenido] → [Lead magnet] → [Landing G3] → [Secuencia de email] → [Oferta]
              selector       generador     (3 formatos/gancho)     constructor      constructor       copywriter
```

### 3.1 De ángulo a contenido (reúso de agentes que ya tienes)
- `generador-hooks` ya produce variantes de gancho "para testeo pagado" → en orgánico esos **mismos ganchos son los hooks de tus posts/reels/threads**. No se desperdicia nada.
- Por cada gancho ganador, deriva **3 formatos** (def. `{{formatos_por_gancho}}`): post de valor, historia/caso (solo prueba REAL del cerebro §4), y post de oferta suave con CTA al lead magnet.
- `copywriter-landing` produce además la **secuencia de email** de `{{emails_secuencia}}` (def. 5): bienvenida → valor → caso real → oferta → cierre/escasez honesta.

### 3.2 Calendario de distribución (def. `{{dias_lanzamiento}}` = 10 días)
| Días | Fase orgánica | Objetivo | Métrica que dispara |
|---|---|---|---|
| 1–4 | **Calentamiento** (valor puro) | resonancia del ángulo | guardados/compartidos por pieza |
| 5–7 | **Puente** (problema→solución + lead magnet) | capturar lista | tasa visita→suscriptor |
| 8–10 | **Oferta** (caso real + CTA + cierre honesto) | conversión | tasa lista→venta |

### 3.3 Compuerta de orgánico
Toda pieza pasa por `editor-voz-marca` (¿suena a la marca del cerebro?) y `guardian-etico` (¿usa solo prueba real?) **antes de publicarse**. Misma línea ética que las landings: el `guardian-etico` bloquea prueba fabricada por defecto.

---

## 4. Framework PMF vs. Hype (adaptado a orgánico)

> Del playbook: "distinguir el product-market fit real del entusiasmo inicial". En orgánico, los likes son hype; la señal real es **gente que levanta la mano y gente que paga**.

Se escala (G4) solo si se cumplen **≥ 2 cuanti + ≥ 1 cuali**:

**Señal cuantitativa (del cockpit):**
- Visita orgánica → suscriptor ≥ `{{cr_lead}}` (def. 25%)
- Suscriptor → comprador ≥ `{{cr_venta}}` (def. 2%)
- Contenido: ≥ `{{tasa_guardado}}` (def. 3%) de guardados/compartidos (señal de resonancia, no vanidad)

**Señal cualitativa (bandeja, DMs, comentarios):**
- Aparecen, sin pedirlas, **frases del lenguaje del avatar** (las que `voice-of-customer` documentó). Es la prueba de que el ángulo tocó el dolor real.
- Respuestas tipo "esto es justo lo que necesitaba / ¿cuándo abre?".

> ❗ Si hay muchos likes pero **cero** de lo anterior: es hype. No localizar, no pautar. Iterar oferta o ángulo.

---

## 5. El loop de aprendizaje (lo que vuelve infinito al sistema)

Cada lanzamiento **entrena al siguiente**. Al cierre, el orquestador escribe de vuelta:

1. **Ángulos/ganchos ganadores** → `activos/angulos-ganadores.md` (alimenta a `selector-angulos` la próxima vez).
2. **Frases nuevas del cliente** capturadas en orgánico → `activos/voc-maestro.md` (el foso que crece).
3. **Estructuras de contenido que convirtieron** → nota en el cerebro del nicho.
4. **Números reales** → reemplazan los umbrales por defecto en el cerebro §7 (el sistema se auto-calibra).

Los cockpits (`cockpit-*.html`) no son reporte: son el **input de la Fase 1** del siguiente ciclo.

---

## 6. Matriz de herramienta Claude por etapa (del playbook)

| Etapa | Herramienta | Para qué |
|---|---|---|
| Idea / ideación | **Chat** | explorar avatar, afinar ángulos, decisiones del founder |
| MVP / construir la fábrica | **Claude Code** | correr agentes, workflow, maquetar, conectar medición |
| Lanzar / orquestar | **Cowork** | el equipo no técnico corre el motor orgánico como skills, mismo cerebro, un clic |

---

## 7. Cómo replicar a CUALQUIER marca (3 pasos)

No se construye nada de cero:

1. **Crea el cerebro** del nuevo nicho con `cerebros/_KIT-EXTRACCION-CEREBRO.md` (incluye la sección §7 de umbrales — abajo).
2. **Corre el SOP** (Fases 1–5) → genera las landings + activos.
3. **Corre este OS** (§3 Motor Orgánico → §4 PMF → §5 loop).

Mismo sistema, distinto cerebro. Eso es lo replicable.

### Bloque a añadir en cada cerebro (`## 7. Umbrales de lanzamiento`)
```markdown
## 7. Umbrales de lanzamiento (sobreescriben los defaults del OS)
- min_angulos: 15
- min_score_angulo: 80
- min_score_conversion: 70
- dias_lanzamiento: 10
- emails_secuencia: 5
- formatos_por_gancho: 3
- cr_lead: 25%        # visita orgánica → suscriptor
- cr_venta: 2%        # suscriptor → comprador
- tasa_guardado: 3%   # resonancia de contenido
```
> Tras cada lanzamiento, reemplaza estos números por tus reales (paso §5.4). El sistema deja de adivinar.

---

## 8. Checklist de un lanzamiento orgánico (una pantalla)

- [ ] Cerebro completo, incl. §4 prueba REAL y §7 umbrales
- [ ] **G1** ≥15 ángulos · score ≥80 → "gran idea" marcada
- [ ] **G2** landing viva + lead magnet + oferta
- [ ] **G3** voz ✓ · ética ✓ · score ≥70 · calendario `{{dias_lanzamiento}}` listo
- [ ] Motor orgánico corriendo (calentamiento → puente → oferta)
- [ ] **G4** PMF real (≥2 cuanti + ≥1 cuali) **antes** de escalar
- [ ] Loop cerrado: ganadores → `activos/` · números reales → cerebro §7

> El tiempo del founder en todo esto = solo las **decisiones de compuerta** (G1 elegir ángulos, G3/G4 aprobar). El resto lo orquesta el sistema.
