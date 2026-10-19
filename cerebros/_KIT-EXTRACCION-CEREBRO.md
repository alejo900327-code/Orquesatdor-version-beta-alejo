# KIT · Replicar el sistema a nuevos proyectos y personas

> Dos cosas en un archivo: **(A)** cómo se replica la Fábrica a otros proyectos, personas y escala; **(B)** los prompts para convertir tus PDFs/chats de un tema (ej. la Cumbre) en un **Cerebro** listo para el sistema.

---

## PARTE A · Cómo se replica (la arquitectura de escala)

### 1. A otros PROYECTOS — un proyecto = un Cerebro
La Fábrica (los agentes + el workflow + el SOP) **se construye una sola vez**. Para un proyecto nuevo NO se reconstruye nada: solo se agrega una carpeta `cerebros/<proyecto>/` con su Cerebro. El mismo motor produce.
- Crianza → `cerebros/crianza-consciente/`
- Cumbre → `cerebros/cumbre-millonarios/`
- El que venga → otra carpeta.

**El Cerebro es el único input nuevo.** Por eso el cuello de botella de un proyecto nuevo es: *¿qué tan rápido convierto mi conocimiento (PDFs, chats, experiencia) en un Cerebro?* → eso lo resuelve la Parte B.

### 2. A otras PERSONAS — roles, no talento
El sistema convierte un oficio tácito en un proceso enseñable. Cada persona toma un rol:
- **Estratega (tú):** dueño del método, la voz y la ética. Decide en las compuertas. Irreemplazable, pero su tiempo baja ~80%.
- **Orquestador:** corre el `SOP-lanzamiento.md`, invoca los agentes, hace el primer filtro. **Este rol ahora SÍ se entrena** — en días, no en años — porque la calidad la cargan los agentes y las compuertas, no la persona.
- **Pauta / Media buyer:** publica, testea, escala ganadoras.
- **Extractor de Cerebros (puede ser el orquestador):** usa la Parte B para alimentar proyectos nuevos.

Un Estratega + un Orquestador ya corre la Fábrica. Sumar gente = sumar proyectos en paralelo, no más complejidad.

### 3. A ESCALA — lo que compone
- **Biblioteca de Cerebros:** cada proyecto suma IP reutilizable.
- **Activos que se aprecian:** `activos/voc-maestro.md` y `activos/angulos-ganadores.md` se enriquecen en cada lanzamiento → el siguiente empieza más inteligente.
- **Cowork:** cuando el equipo no es técnico, se portan los agentes como *skills* en Cowork. Mismo Cerebro, un clic.
- **Plantillas:** una landing-estándar-de-oro por tipo de proyecto acelera el arranque.

### 4. El flujo para un proyecto nuevo (ej. la Cumbre)
1. Reúne las fuentes (PDFs, chats, brochures, grabaciones transcritas).
2. Corre los **prompts de la Parte B** sobre esas fuentes (en un proyecto de Claude con los PDFs adjuntos). Salida: borrador de Cerebro.
3. Pega el resultado en `cerebros/cumbre-millonarios/cerebro.md` y completa lo que falte (sobre todo prueba REAL).
4. Corre el pipeline (Fase 1→5) igual que hicimos con crianza.

---

## PARTE B · Prompts de extracción de Cerebro (PDFs/chats → Cerebro)

> Cómo usarlos: abre un proyecto/chat de Claude, **adjunta los PDFs y pega los chats** del tema, y lanza los prompts en orden. Cada uno llena una sección del Cerebro. Son genéricos: sirven para CUALQUIER proyecto (cambia solo el nombre del tema). Al final, el Prompt 7 ensambla todo.
> Regla de oro (igual que en todo el sistema): **la prueba — testimonios, cifras, credenciales — se extrae solo si es REAL y verificable en las fuentes. Nunca se inventa.**

### Prompt 0 · Inventario y orientación
```
Eres analista de inteligencia de marketing. Te adjunto los materiales de "<NOMBRE DEL PROYECTO/TEMA>" (PDFs, chats, brochures).
Primero, hazme un inventario: lista cada documento, qué tipo de info contiene (oferta, agenda, ponentes, audiencia, precios, testimonios, visión) y qué tan completo está cada tema. Marca los huecos de información que tendré que llenar yo a mano.
No inventes nada que no esté en los materiales. Si algo no está, dilo.
```

### Prompt 1 · Mercado y demanda
```
Con base SOLO en los materiales adjuntos de "<TEMA>", extrae:
- El deseo central que resuelve (¿es urgente, emocional, recurrente?).
- Por qué este público lo quiere AHORA (el contexto/momento).
- Qué hace este proyecto distinto de lo que ya existe (su ángulo de diferenciación).
- El nivel de consciencia del público (¿saben que tienen el problema? ¿conocen la solución? ¿conocen este producto?).
Cita de qué documento sacaste cada punto. Marca lo que no esté claro.
```

### Prompt 2 · Avatar (a quién le vendemos)
```
Con base en los materiales de "<TEMA>", construye el avatar del comprador ideal:
- Quién es (perfil, situación, nivel — para la Cumbre: el "millonario consciente", su mundo, sus valores).
- Dolor de superficie y dolor profundo / identitario.
- Deseo de superficie y deseo profundo (en quién quiere convertirse).
- Creencias y objeciones de compra (incluida la objeción de precio si es alto ticket).
- Sus detonantes: ¿cuándo y por qué diría que sí?
Usa, cuando existan, las palabras textuales que aparezcan en los materiales. No inventes; marca lo que falte investigar.
```

### Prompt 3 · La oferta
```
Con base en los materiales de "<TEMA>", extrae y estructura la oferta:
- Qué es exactamente (formato: evento presencial/online, fechas, lugar, duración).
- La promesa central / transformación (concreta y honesta).
- El mecanismo único: por qué ESTA experiencia logra lo que promete (ponentes, comunidad, método, acceso).
- Componentes de valor (agenda, ponentes, networking, bonos, accesos).
- Niveles de precio / tickets y qué incluye cada uno.
- Reversión de riesgo / garantía si existe.
Saca todo lo que esté en los documentos. Lo que no esté (ej. precio aún sin definir), márcalo como pendiente.
```

### Prompt 4 · Prueba REAL (no se fabrica)
```
Con base ESTRICTAMENTE en los materiales de "<TEMA>", lista solo la prueba REAL y verificable:
- Testimonios reales (cita textual + de quién, solo si están en los materiales).
- Resultados o cifras de ediciones pasadas (solo si están documentados).
- Credibilidad de los ponentes (nombres, trayectoria — solo lo que aparezca).
- Apariciones, alianzas o medios reales.
Si algo no está en los materiales, NO lo inventes: déjalo como "[PRUEBA REAL pendiente — conseguir con permiso]". La credibilidad inventada está prohibida.
```

### Prompt 5 · Voz y tono
```
Analiza cómo está escrito el material de "<TEMA>" (y los chats del fundador si los adjunté) y define la VOZ de marca:
- 5-7 rasgos de cómo suena (ej. para la Cumbre: elevada, aspiracional, espiritual pero aterrizada, exclusiva sin ser arrogante).
- Palabras y frases firma que se repiten.
- Qué NUNCA dice esta marca.
- Si hay una persona/portavoz, descríbela.
Devuélveme además un párrafo de 150 palabras de ejemplo escrito EN esa voz, como muestra de referencia.
```

### Prompt 6 · Guardarraíles éticos y de plataforma
```
Para "<TEMA>", lista los guardarraíles:
- Claims que NO podemos hacer (promesas de resultados financieros/espirituales garantizados, etc.).
- Temas sensibles y cómo tratarlos (dinero, espiritualidad, estatus).
- Políticas de plataforma relevantes (Meta/Google sobre dinero, "hazte rico", afirmaciones personales).
Sé conservador: ante la duda, restringe.
```

### Prompt 7 · Ensamblar el Cerebro
```
Toma todas las respuestas anteriores y ensámblalas en un único documento con esta estructura exacta (es la plantilla del Cerebro):
1. Mercado y demanda · 2. Avatar · 3. La oferta · 4. Activos de prueba (REAL/pendiente) · 5. Voz y tono · 6. Guardarraíles éticos · 7. Pila de persuasión (autoridad, prueba social, absolución, urgencia, reversión de riesgo) traducida a este tema.
Marca cada dato como [confirmado en materiales] o [pendiente del fundador]. Entrégame el documento listo para pegar en cerebros/<proyecto>/cerebro.md.
```

> Tras el Prompt 7: pega el resultado en el Cerebro del proyecto, completa los `[pendiente]` (sobre todo prueba real), y ya puedes correr el pipeline.

---

## PARTE C · Destilado avanzado — las otras 3 salidas (de un corpus grande)

> La Parte B produce el **Cerebro** (salida #1). Para sacarle el máximo a un corpus grande (ej. 300+ grabaciones de HIT) extraemos 3 salidas más. Ver el flujo completo en `OS-DESTILADOR-Y-CONOCIMIENTO.md`.
> **Manejo de volumen (300+ archivos):** se destila **por lotes** (10–20 transcripciones por pasada), cada lote produce un parcial, y un **prompt de fusión** dedup/consolida los parciales al final. Misma regla de oro: **lo que no está en las fuentes, no se inventa.**

### Salida #2 · Conocimiento / Playbooks (nutre a los agentes)
```
Eres analista de lo que CONVIERTE. Con base SOLO en este lote de transcripciones de "<TEMA>", extrae el conocimiento reutilizable que ha funcionado:
- ÁNGULOS: las grandes ideas/encuadres que más enganchan, con la frase que los dispara.
- GANCHOS/HOOKS: aperturas que captan atención (cita textual cuando exista).
- OBJECIONES y su manejo: cómo el fundador desarma cada objeción real (incluida la de precio).
- FRAMEWORKS / mecanismos: los modelos enseñables del método (nómbralos).
- HISTORIAS y analogías firma: las que el fundador repite y mejor resuenan.
- TRANSICIONES de venta: cómo pasa de contenido a oferta sin quemar.
Devuelve cada ítem con: qué es, por qué funciona, y la cita/fuente. Marca [parcial-lote-N]. No inventes.
```
→ Fusión: *"Toma los parciales [parcial-lote-*] y consolida un único playbook por categoría, dedup, ordenado por fuerza. Salida para `conocimiento/<proyecto>/playbooks.md` + alimentar `activos/angulos-ganadores.md` y `activos/voc-maestro.md`."*

### Salida #3 · Banco de Quiz / Diagnóstico (alimenta los quiz funnels)
```
Eres diseñador de diagnósticos. Con base en el contenido de "<TEMA>", mapea el material como un ÁRBOL DE DIAGNÓSTICO para un quiz funnel:
- SEGMENTOS del público (perfiles distinguibles por situación/nivel/dolor).
- Para cada segmento: la pregunta que lo identifica, su dolor/nivel de consciencia, el CONTENIDO del corpus que mejor le sirve, y la OFERTA de la escalera que le toca (Cumbre / membresía / HIT / ascensión).
- Las 5–8 preguntas del quiz que enrutan a la persona al segmento correcto (con opciones de respuesta).
Devuelve el árbol completo. No inventes resultados; si una rama no tiene contenido de respaldo, márcala [hueco de contenido].
```
→ Salida para `conocimiento/<proyecto>/quiz-map.md` (insumo de la plantilla de quiz funnel).

### Salida #4 · Biblioteca de Evidencia REAL (resuelve el hueco de prueba)
```
Eres auditor de prueba. Con base ESTRICTAMENTE en este lote de "<TEMA>", lista solo evidencia REAL y verificable:
- Testimonios/resultados de alumnos (cita textual + quién, solo si están).
- Cifras o casos documentados.
- Credenciales reales mencionadas.
Para cada uno marca: [usable] si es citable, o [requiere permiso] si hay que pedirlo antes de publicar. Lo que no esté, NO lo inventes. Prohibido fabricar credibilidad.
```
→ Fusión a `activos/evidencia/<proyecto>.md`. Esto llena los `[POR COMPLETAR]` de prueba de HIT/Cumbre/crianza con material REAL del propio corpus.

### Salida #5 · Playbook de Narrativa Creativa & Concepto Cinematográfico
```
Eres director creativo + guionista de marca. Con base en este lote de "<TEMA>", extrae material para narrativas que conecten HONDO y puedan volverse virales — no por truco, sino por verdad bien contada, con factura cinematográfica "a otro nivel":
- HISTORIAS REALES con arco (situación → conflicto → giro → transformación) contables en video.
- METÁFORAS e IMÁGENES visuales potentes del fundador (lo abstracto hecho visible).
- MOMENTOS DE TENSIÓN/EMOCIÓN: la frase o idea que da escalofrío, el "click".
- CONCEPTOS CINEMATOGRÁFICOS: cómo se vería esa idea como escena/anuncio (tono, atmósfera, símbolo visual, "set piece").
- GANCHOS NARRATIVOS de 3 seg para abrir un video y detener el scroll.
- VERDADES INCÓMODAS / contra-narrativas que generan conversación (sin humo ni clickbait).
Para cada ítem: la idea, por qué conecta/podría viralizar, y la cita/fuente. No inventes historias ni resultados; solo lo real del corpus.
```
→ Salida para `conocimiento/<proyecto>/narrativa-creativa.md`. Nutre al **editor-orquestador de video**, a `generador-hooks` y al copy con conceptos de producción a otro nivel (viral + conexión profunda, no solo conversión).

> Estos bloques se pueden correr como **agentes** leyendo las carpetas locales de transcripciones, o como **prompts** en el proyecto Claude del Destilador. Mismo resultado; el repo es el destino.
