# 🗺️ GUÍA MAESTRA · Proceso Multiagéntico

> Si te perdiste, empieza aquí. Esta es la foto completa de TODO lo que construimos, en orden y en lenguaje simple.

## ¿Qué es esto en una frase?
Una **fábrica con IA** que investiga, escribe, diseña y revisa páginas de venta con tu nivel de calidad — para hacer 15-20 páginas (por país, por ángulo, por avatar) en vez de 3, sin perder tu voz ni cruzar la línea ética, y publicarlas en Cloudflare midiendo todo.

## El recorrido que hicimos (orden cronológico)
1. **Analizamos el teardown de MEDVi** → sacamos el "motor" replicable (investigación + copy + testeo masivo) y descartamos su fraude.
2. **Construimos la Fábrica** → 12 agentes especializados + un workflow + un procedimiento (SOP).
3. **La probamos con un caso real** (crianza · México) → de cero a 3 páginas terminadas, 3/3 aprobadas en ética, una maquetada y verificada.
4. **Definimos la voz "Bianca"** y la oferta, y llevamos la página #1 a estándar de oro.
5. **Hicimos el showcase** (para mostrar) y el **kit de réplica** (para escalar a otros proyectos).
6. **Subimos el diseño**: sistema de diseño + animaciones + **GSAP premium**, publicando en **Cloudflare**.
7. **Arrancamos la Cumbre** (millonarios conscientes, evento presencial): investigación lista, matriz de producción y plan de medición/dashboards.

## Mapa de carpetas (qué hay y para qué)
```
.claude/agents/      → Los 12 agentes (el método codificado: investigación, copy, voz, ética, diseño…)
activos/
  diseno/            → Sistema de diseño + kit.css + animaciones.js + gsap-kit (render premium)
  voz-de-marca/      → La voz (Bianca para crianza); se entrena con tus mejores textos
  voc-maestro.md     → Banco de lenguaje del cliente que crece en cada lanzamiento (el foso)
  angulos-ganadores  → Qué funcionó; lo escribe `registrador-ganadores` post-testeo, lo leen generador/selector de ángulos
cerebros/            → El conocimiento por proyecto (el ÚNICO input nuevo para un proyecto)
  _PLANTILLA-CEREBRO → Plantilla en blanco
  _KIT-EXTRACCION    → Los prompts para convertir PDFs/chats en un Cerebro
  crianza-consciente → Proyecto piloto (completo; incluye guardarrailes.json para el linter determinista)
  cumbre-millonarios → Proyecto Cumbre (CONFIG, MATRIZ, MEDICION, EMPIEZA-AQUI)
salidas/             → Lo que produce el sistema, por lanzamiento
  mini-piloto/       → Crianza: investigación, ángulos, landings, HTML, QA
  cumbre/            → Cumbre: investigación inicial (avatar, VOC, competencia)
workflows/           → El pipeline orquestado (corre las fases en paralelo)
showcase/            → La página-resumen para mostrar
README.md            → Visión general del sistema
OS-ESTRATEGIA-INFOPRODUCTO.md → Fase 1.5: DISEÑA el negocio (oferta + escalera + embudo + modelo) y completa el Cerebro (agnóstico)
OS-NARRATIVA.md      → Cómo CONSTRUIR LA NARRATIVA de cualquier producto/lanzamiento/campaña: 6 fases + StoryBrand SB7, trazable a compradores reales (agnóstico de marca)
SOP-lanzamiento.md   → Cómo PRODUCIR las landings paso a paso (Fases 1-5)
OS-LANZAMIENTO-ORGANICO.md → Cómo DISTRIBUIR sin pauta: compuertas numéricas, motor de contenido orgánico y PMF (agnóstico de marca)
PLAN-FLOTA-AGENTES.md → El mapa de las flotas que FALTAN (comercial, evento, retención, producto, video) y el plan de 90 días para construirlas
equipo/               → Para PERSONAS nuevas: ORGANIZACION.html (misiones, dueños, KPIs) + EMPIEZA-AQUI.md (orden de uso y reglas)
```

> **Las dos flotas de agentes:** los 12 originales **producen las landings** (Fases 2-5); los 5 de estrategia (`arquitecto-oferta`, `arquitecto-escalera`, `estratega-embudo`, `modelador-economico`, `verificador-estrategia`) **diseñan el negocio** (Fase 1.5). Entre ambas está la **Investigación (Fase 1)**: el cimiento compartido que las dos consumen. La salida de la estrategia es el Cerebro completo que alimenta a las landings. Y cerrando el ciclo está `registrador-ganadores` (Fase 6): convierte los resultados reales de la pauta en registro acumulativo — el paso "repetir" que hace más inteligente cada lanzamiento siguiente.

## Cómo se usa para un proyecto NUEVO (la magia de la réplica)
No se construye nada de cero. Solo 5 pasos, en orden:
1. **Extrae el Cerebro** crudo del tema (con el kit de extracción + tus PDFs/chats), incl. su §7 de umbrales.
2. **Investiga** (Fase 1 del SOP): avatar, VoC, competencia. Es el cimiento de TODO lo que sigue.
3. **Diseña el negocio** (Fase 1.5, ver `OS-ESTRATEGIA-INFOPRODUCTO.md`): oferta → escalera → embudo → modelo → `verificador-estrategia` (Gate G0). Completa el Cerebro.
4. **Construye la narrativa** (ver `OS-NARRATIVA.md`): público real → auditoría de oferta → jornada → BrandScript SB7 → calendario → anuncios. Es el documento madre del que cuelga todo el copy.
5. **Corre el pipeline** (Fases 2→5 del SOP) → produce las landings.
6. **Lanza con el OS orgánico** (ver `OS-LANZAMIENTO-ORGANICO.md`): compuertas G1-G4, motor de contenido orgánico, y solo escalas/pautas lo que pasa PMF.

> Orden clave: **investigar → diseñar negocio → construir narrativa → producir páginas → lanzar.** La investigación va primero porque la oferta nace del lenguaje real del cliente.

> Producir (SOP) y lanzar (OS) son dos capas: el SOP hace las páginas, el OS las distribuye sin dinero y valida con señal real. Ambas leen el MISMO cerebro — por eso replicar una marca = cambiar el cerebro.

## Estado actual y próximo paso
- ✅ Sistema completo y probado (crianza).
- ✅ Cumbre: estructura, investigación inicial, matriz y medición listas.
- ⏭️ **Falta:** tu **PDF de branding/oferta de la Cumbre** → con eso se completa el Cerebro y se disparan las páginas.

> Para trabajar la Cumbre aparte, abre la carpeta **CUMBRE - MILLONARIOS CONSCIENTES** en una pestaña nueva de Claude y lee su `EMPIEZA-AQUI.md`.
