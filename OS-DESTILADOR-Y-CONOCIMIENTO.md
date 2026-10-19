# OS · Destilador y Conocimiento — de 300+ grabaciones a campañas en horas

> Cómo convertimos tu materia prima (300+ grabaciones de HIT, Cumbre, todos los programas) en combustible que hace cada vez más inteligentes a los cerebros, los agentes y los quiz funnels — hasta que el equipo produce campañas completas en un par de horas con un par de comandos.
> Conecta con: `cerebros/_KIT-EXTRACCION-CEREBRO.md` (la base), EL ORQUESTADOR + `EMPIEZA-AQUI-EQUIPO.md` (el empaque para el equipo), `PLAN-ORQUESTADORES-IA.md` (la estrategia).

---

## 0. La idea en una frase

**El Destilador es la refinería.** La materia prima (transcripciones crudas) entra por un lado; por el otro salen **5 tipos de combustible** que alimentan toda la máquina. Hoy la refinería produce 1 salida (el Cerebro). La evolucionamos a 5.

---

## 1. El flujo completo

```
MATERIA PRIMA                 DESTILADOR              4 SALIDAS                 LA MÁQUINA
(300+ grabaciones      →     (refinería:        →   1. Cerebro producto   →   Cerebros + Agentes
 HIT, Cumbre,                 prompts +              2. Conocimiento/          ↓
 programas)                   agentes)               playbooks            →   FÁBRICA (12 agentes)
                                                     3. Banco de quiz          ↓
                                                     4. Evidencia REAL    →   CAMPAÑAS (ads, landings,
                                                                              objeciones, quiz funnels)
                                                                              ↓
                                                                          EL ORQUESTADOR (equipo)
```

**El principio de fondo:** cada grabación destilada **se aprecia** — vuelve al sistema como conocimiento reutilizable, así que el siguiente lanzamiento empieza más inteligente que el anterior.

---

## 2. Las 5 salidas del Destilador (hoy solo produce la #1)

| # | Salida | Qué extrae del corpus | A dónde va | Estado |
|---|---|---|---|---|
| **1** | **Cerebro del producto** | Método, avatar, oferta, objeciones, voz, prueba — por programa | `cerebros/<proyecto>/cerebro.md` | ✅ existe (`_KIT-EXTRACCION-CEREBRO.md`) |
| **2** | **Conocimiento / Playbooks** | Lo que ha FUNCIONADO: ángulos, ganchos, manejo de objeciones, frameworks, historias, transiciones del fundador | `conocimiento/` (nuevo) + `activos/angulos-ganadores.md`, `activos/voc-maestro.md` | 🔨 a construir |
| **3** | **Banco de Quiz / Diagnóstico** | El contenido mapeado como árbol: segmento → dolor/nivel → contenido correcto → oferta correcta | `conocimiento/quiz/` (nuevo) | 🔨 a construir |
| **4** | **Biblioteca de Evidencia REAL** | Testimonios, casos, cifras — **solo reales, nunca fabricados** | `activos/evidencia/` (nuevo) | 🔨 a construir — resuelve el hueco de prueba que hoy bloquea HIT y crianza |
| **5** | **Narrativa Creativa & Concepto Cinematográfico** | Historias con arco, metáforas visuales, momentos de emoción, conceptos de escena/anuncio, ganchos de 3 seg, contra-narrativas | `conocimiento/<proyecto>/narrativa-creativa.md` (nuevo) | 🔨 a construir — virales que CONECTAN + producción a otro nivel |

> El KIT actual hace la #1 con 7 prompts. Le agregamos 4 bloques de prompts/agentes (uno por salida nueva). Mismo patrón, misma regla de oro: **lo que no está en las fuentes, no se inventa.**

---

## 3. Cómo nutre a los agentes (lo que pediste: mejorar cada agente con info del producto)

Cada agente recibe, además del Cerebro, la **capa de conocimiento** relevante a su rol. Así el gusto y lo que funciona dejan de vivir en tu cabeza y pasan a estar wired en la máquina:

| Agente | Se nutre con (del destilado) |
|---|---|
| `generador-angulos` | ángulos ganadores + frases textuales del avatar (corpus) |
| `copywriter-landing` | playbooks de persuasión + objeciones reales + historias del fundador |
| `generador-hooks` | hooks/ganchos que ya convirtieron |
| `editor-voz-marca` | muestras de la voz real del fundador (de las grabaciones) |
| `guardian-etico` | claims prohibidos extraídos del propio contenido y nicho |
| `arquitecto-oferta` / `verificador-*` | qué ofertas y objeciones han funcionado de verdad |
| **editor-orquestador de video** | **narrativa creativa + conceptos cinematográficos** (salida #5) para anuncios a otro nivel |

**El bucle que lo hace componer:** lanzamiento gana → el ganador vuelve al Destilador → enriquece los playbooks → el siguiente lanzamiento (de cualquier línea) empieza más inteligente. Eso es compartir entre líneas las estrategias que funcionaron en otras partes — exactamente lo que pediste.

---

## 4. Los Quiz Funnels (guían a la persona por el contenido)

**Qué es:** un quiz que **diagnostica** a la persona (segmento, dolor, nivel de consciencia) y la **enruta** al contenido correcto del corpus + a la **oferta correcta de la escalera** (Cumbre → membresía → HIT → ascensión).

**Qué necesita del Destilador:** la salida #3 (árbol de diagnóstico) + #1 (las ofertas) + #4 (la prueba para cada rama).

**Cómo se construye:** con la misma fábrica (una plantilla/agente de quiz) + el sistema de diseño + Cloudflare. Mide respuestas y enruta. Encaja con el motor de adquisición que ya estudiamos (quiz web2app × funnel break-even).

**Por qué es potente para ti:** con 300+ grabaciones tienes contenido para diagnosticar y nutrir a casi cualquier perfil; el quiz convierte ese archivo en un **camino guiado** que lleva a cada persona justo a lo que necesita y a la oferta que le toca.

---

## 5. Cómo organizamos los chats y el trabajo

**Principio: los chats son desechables; el repo es la única verdad.** Todo lo bueno de un chat aterriza en un archivo del repo + una línea en memoria. Así nada se pierde y el equipo siempre trabaja sobre lo mismo.

**Mapa de workstreams (un "espacio"/chat por línea, todos escriben al mismo repo):**

| Workstream | Qué produce | Carpeta destino |
|---|---|---|
| **Estrategia & ofertas** | escalera, HIT, ofertas | `cerebros/*/HIT-DISENO`, `OS-ESTRATEGIA-INFOPRODUCTO.md` |
| **Destilador & cerebros** | cerebros + conocimiento + quiz + evidencia | `cerebros/`, `conocimiento/`, `activos/` |
| **Fábrica & lanzamientos** | campañas (ángulos→copy→landings→QA) | `salidas/<proyecto>/` |
| **Cockpits & datos** | medición, decisiones | `cockpit-*.html`, `COCKPIT-*-SPEC.md` |
| **Equipo & onboarding** | el empaque para el equipo | EL ORQUESTADOR, `EMPIEZA-AQUI-EQUIPO.md` |

**Regla de cierre de chat:** antes de cerrar un chat, su salida queda en el repo y se anota en memoria. (Si quieres, te dejo esta regla como hábito/recordatorio del sistema.)

---

## 6. El objetivo final (lo que recibe el equipo)

Con la máquina nutrida por el Destilador, el equipo corre — con un par de comandos y en un par de horas:

> investigación → ángulos → copy → landings → objeciones → **quiz funnel** → QA (voz ✓ / ética ✓ / conversión ✓) → listo para pauta

Cada línea (Cumbre, crianza, la que venga) usa el **mismo motor** con su Cerebro y su conocimiento. El equipo no necesita tu talento tácito: lo cargan los agentes nutridos y las compuertas. Eso multiplica resultados en todas las áreas.

---

## 7. Lo que necesito de ti para arrancar el destilado real

1. **¿Dónde están las transcripciones?** ¿Carpetas locales en tu equipo (dame la ruta) o solo dentro del proyecto Claude "Destilador de contenido"? → decide si destilo aquí (agentes leyendo las carpetas) o si traemos las salidas del proyecto Claude al repo.
2. **¿Por cuál corpus empezamos?** Recomendado: **HIT (300+ grabaciones)** — es el de mayor valor ahora porque nutre la certificación que acabamos de diseñar y desbloquea su evidencia real.

---

## 8. Próximos pasos (cuando definas lo de arriba)

1. Extender el KIT con los 3 bloques nuevos (conocimiento, quiz, evidencia).
2. Destilar el corpus HIT → llenar el Cerebro de Cumbre/HIT + la capa de conocimiento + la evidencia real (resuelve el `[POR COMPLETAR]` de testimonios de HIT).
3. Construir la plantilla de **quiz funnel** y conectarla a la escalera.
4. Wired la capa de conocimiento en los agentes y re-correr un lanzamiento para validar la mejora.
