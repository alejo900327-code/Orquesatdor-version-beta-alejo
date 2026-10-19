export const meta = {
  name: 'fabrica-landings',
  description: 'Pipeline completo: de un Cerebro a 15-20 landings de calidad-fundador, con compuertas de linter, voz, ética y conversión.',
  whenToUse: 'Para correr un lanzamiento entero (Fases 1-5) orquestado y en paralelo. Consume bastante; confirmar antes.',
  phases: [
    { title: 'Investigacion', detail: 'avatar + voice-of-customer + swipe en paralelo' },
    { title: 'Angulos', detail: 'generar y rankear angulos' },
    { title: 'Produccion', detail: 'por cada angulo: copy -> voz -> linter -> etica+adversarial; si falla, reescribe con el fix y re-verifica (rondas configurables, default 2)' },
    { title: 'Cierre', detail: 'resumen y cola de publicacion' },
  ],
}

// args esperado: { lanzamiento, cerebro, nAngulos, angulosElegidos?, umbral?, maxReescrituras? }
//   lanzamiento: slug del lanzamiento (carpeta en salidas/)
//   cerebro: ruta al cerebro.md
//   nAngulos: cuantas landings producir (default 15)
//   angulosElegidos: opcional, array de numeros de angulo; si falta, el selector elige el top nAngulos
//   umbral: score minimo del verificador-adversarial para aprobar (default 70)
//   maxReescrituras: rondas maximas de reescritura automatica por landing (default 2)
const L = (args && args.lanzamiento) || 'lanzamiento-piloto'
const CEREBRO = (args && args.cerebro) || 'cerebros/crianza-consciente/cerebro.md'
const N = (args && args.nAngulos) || 15
const UMBRAL = (args && args.umbral) != null ? args.umbral : 70
const MAX_REESCRITURAS = (args && args.maxReescrituras) != null ? args.maxReescrituras : 2
const OUT = `salidas/${L}`
// reglas deterministas de la marca: viven junto al cerebro
const REGLAS = CEREBRO.replace(/\/[^/]*$/, '/guardarrailes.json')

const ANGULO_SCHEMA = {
  type: 'object',
  properties: {
    elegidos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          numero: { type: 'number' },
          nombre: { type: 'string' },
          slug: { type: 'string' },
          gancho: { type: 'string' },
        },
        required: ['numero', 'nombre', 'slug', 'gancho'],
      },
    },
  },
  required: ['elegidos'],
}

// ---- FASE 1 · Investigacion (barrera: los angulos necesitan los 3 resultados) ----
phase('Investigacion')
await parallel([
  () => agent(
    `Eres investigador-avatar. Cerebro: ${CEREBRO}. Escribe tu salida en ${OUT}/01-avatar.md.`,
    { agentType: 'investigador-avatar', label: 'avatar', phase: 'Investigacion' }
  ),
  () => agent(
    `Eres voice-of-customer. Cerebro: ${CEREBRO}. Lee ${OUT}/01-avatar.md si existe. Escribe en ${OUT}/02-voc.md.`,
    { agentType: 'voice-of-customer', label: 'voc', phase: 'Investigacion' }
  ),
  () => agent(
    `Eres inteligencia-competitiva. Cerebro: ${CEREBRO}. Escribe en ${OUT}/03-swipe.md.`,
    { agentType: 'inteligencia-competitiva', label: 'swipe', phase: 'Investigacion' }
  ),
])

// ---- FASE 2 · Angulos ----
phase('Angulos')
await agent(
  `Eres generador-angulos. Cerebro: ${CEREBRO}. Lee ${OUT}/01-avatar.md, ${OUT}/02-voc.md, ${OUT}/03-swipe.md. Genera 25-30 angulos. Escribe en ${OUT}/04-angulos.md.`,
  { agentType: 'generador-angulos', label: 'generar-angulos', phase: 'Angulos' }
)

let elegidos
if (args && args.angulosElegidos && args.angulosElegidos.length) {
  // el fundador ya eligio
  const ranked = await agent(
    `Eres selector-angulos. Lee ${OUT}/04-angulos.md y ${CEREBRO}. El fundador eligio los angulos: ${args.angulosElegidos.join(', ')}. Devuelve SOLO esos como "elegidos" con numero, nombre, slug corto y gancho. Escribe el ranking en ${OUT}/05-ranking-angulos.md.`,
    { agentType: 'selector-angulos', label: 'seleccion-fundador', phase: 'Angulos', schema: ANGULO_SCHEMA }
  )
  elegidos = (ranked && ranked.elegidos) || []
} else {
  const ranked = await agent(
    `Eres selector-angulos. Lee ${OUT}/04-angulos.md y ${CEREBRO}. Puntua y rankea. Devuelve los mejores ${N} como "elegidos" (numero, nombre, slug corto, gancho), cubriendo palancas distintas. Escribe el ranking completo en ${OUT}/05-ranking-angulos.md.`,
    { agentType: 'selector-angulos', label: 'ranking', phase: 'Angulos', schema: ANGULO_SCHEMA }
  )
  elegidos = ((ranked && ranked.elegidos) || []).slice(0, N)
}
if (!elegidos.length) {
  return { error: `selector-angulos no devolvio angulos elegidos; revisa ${OUT}/04-angulos.md y ${OUT}/05-ranking-angulos.md` }
}
log(`${elegidos.length} angulos a produccion`)

// ---- FASE 3 · Produccion (pipeline: cada angulo fluye solo por todas las etapas) ----
phase('Produccion')
const LINT_SCHEMA = {
  type: 'object',
  properties: {
    pasa: { type: 'boolean' },
    bloqueos: { type: 'array', items: { type: 'string' } },
    avisos: { type: 'array', items: { type: 'string' } },
  },
  required: ['pasa'],
}
const ETICA_SCHEMA = {
  type: 'object',
  properties: {
    etica: { type: 'string', enum: ['APROBADA', 'BLOQUEADA'] },
    fix: { type: 'string' },
  },
  required: ['etica'],
}
const ADV_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'number' },
    veredicto: { type: 'string', enum: ['PUBLICAR', 'REESCRIBIR', 'MATAR'] },
    fix: { type: 'string' },
  },
  required: ['score', 'veredicto'],
}

// Compuertas de un angulo, en jerarquia reglas > LLM-juez:
//   1) linter determinista (haiku corre herramientas/lint-landing.mjs, centavos) — si BLOQUEA, rebota
//      a reescritura sin gastar tokens de juez;
//   2) guardian-etico + verificador-adversarial en paralelo; los AVISOS del linter les llegan como focos.
// ronda > 0 = re-verificacion tras reescritura (reportes con sufijo .rN para no pisar los anteriores).
async function compuertas(a, id, file, ronda) {
  const r = ronda ? `.r${ronda}` : ''
  const lint = await agent(
    `Corre con Bash exactamente: node herramientas/lint-landing.mjs ${file} --reglas ${REGLAS} --json. Traduce el JSON a la salida estructurada: pasa = .pasa; bloqueos y avisos = por cada item de .archivos[0].bloqueos/.avisos, el string "[regla] L<linea>: <porque> — <texto>". Reporta fielmente; no opines ni corrijas nada.`,
    { label: `lint:${id}${r}`, phase: 'Produccion', schema: LINT_SCHEMA, model: 'haiku', effort: 'low' }
  )
  if (lint && lint.pasa === false) {
    return { lint: 'BLOQUEA', lintFix: (lint.bloqueos || []).join(' | '), etica: null, eticaFix: '', score: null, veredicto: null, fix: '' }
  }
  const focos = (lint && lint.avisos && lint.avisos.length)
    ? ` Focos del linter determinista — verifica su contexto real, pueden ser negaciones honestas: ${lint.avisos.join(' | ')}.`
    : ''
  const [etica, adv] = await parallel([
    () => agent(
      `Eres guardian-etico. Revisa ${file} contra ${CEREBRO}. Escribe veredicto en ${OUT}/qa/${id}${r}.etica.md y devuelve el resultado estructurado. Si bloqueas, resume en "fix" que hay que corregir exactamente.${focos}`,
      { agentType: 'guardian-etico', label: `etica:${id}${r}`, phase: 'Produccion', schema: ETICA_SCHEMA }
    ),
    () => agent(
      `Eres verificador-adversarial. Ataca ${file} (avatar: ${OUT}/01-avatar.md). Escribe en ${OUT}/qa/${id}${r}.score.md y devuelve el resultado estructurado. En "fix" da las correcciones concretas de mayor impacto.`,
      { agentType: 'verificador-adversarial', label: `adv:${id}${r}`, phase: 'Produccion', schema: ADV_SCHEMA }
    ),
  ])
  return {
    lint: lint ? 'PASA' : null,
    lintFix: '',
    etica: etica && etica.etica,
    eticaFix: (etica && etica.fix) || '',
    score: adv && adv.score,
    veredicto: adv && adv.veredicto,
    fix: (adv && adv.fix) || '',
  }
}

const aprobada = (qa) =>
  qa.lint !== 'BLOQUEA' && qa.etica === 'APROBADA' && typeof qa.score === 'number' && qa.score >= UMBRAL && qa.veredicto !== 'MATAR'

// Reescribir solo con senal concreta de fallo. MATAR corta el bucle (el angulo no se salva reescribiendo);
// resultados nulos (agente caido) van a cola humana, no a reescritura ciega.
const debeReescribir = (qa) =>
  !aprobada(qa) &&
  qa.veredicto !== 'MATAR' &&
  (qa.lint === 'BLOQUEA' || qa.etica === 'BLOQUEADA' || qa.veredicto === 'REESCRIBIR' || (typeof qa.score === 'number' && qa.score < UMBRAL))

const resultados = await pipeline(
  elegidos,
  // 1. copy
  (a) => agent(
    `Eres copywriter-landing. Cerebro: ${CEREBRO}. Avatar: ${OUT}/01-avatar.md. VOC: ${OUT}/02-voc.md. Angulos: ${OUT}/04-angulos.md. Escribe la landing para el angulo #${a.numero} "${a.nombre}". Guardala en ${OUT}/landings/${String(a.numero).padStart(2, '0')}-${a.slug}.md.`,
    { agentType: 'copywriter-landing', label: `copy:${a.slug}`, phase: 'Produccion' }
  ).then(() => a),
  // 2. voz
  (a) => agent(
    `Eres editor-voz-marca. Edita ${OUT}/landings/${String(a.numero).padStart(2, '0')}-${a.slug}.md a la voz de la marca (Cerebro: ${CEREBRO}, referencias en activos/voz-de-marca/). Reescribe en el mismo archivo.`,
    { agentType: 'editor-voz-marca', label: `voz:${a.slug}`, phase: 'Produccion' }
  ).then(() => a),
  // 3. compuertas + bucle de reescritura: verificar -> reescribir con el fix -> re-verificar, hasta pasar,
  //    agotar MAX_REESCRITURAS o recibir MATAR. Lo que no pasa cae a cola humana en el Cierre.
  async (a) => {
    const id = `${String(a.numero).padStart(2, '0')}-${a.slug}`
    const file = `${OUT}/landings/${id}.md`
    let qa = await compuertas(a, id, file, 0)
    const historial = [qa.lint === 'BLOQUEA' ? 'lint' : qa.score]
    let ronda = 0
    while (ronda < MAX_REESCRITURAS && debeReescribir(qa)) {
      const r = ronda ? `.r${ronda}` : ''
      const reportes = [
        qa.etica != null ? `${OUT}/qa/${id}${r}.etica.md` : '',
        qa.score != null ? `${OUT}/qa/${id}${r}.score.md` : '',
      ].filter(Boolean).join(' y ')
      ronda++
      const rw = await agent(
        `Eres copywriter-landing. La landing ${file} NO paso las compuertas (ronda ${ronda} de ${MAX_REESCRITURAS}). Reescribela EN EL MISMO ARCHIVO corrigiendo exactamente lo reportado — sin cambiar el angulo #${a.numero} "${a.nombre}" ni su gancho ("${a.gancho}"), conservando la voz de la marca (activos/voz-de-marca/). Contexto: Cerebro ${CEREBRO} · avatar ${OUT}/01-avatar.md · VOC ${OUT}/02-voc.md.${reportes ? ` Reportes completos: ${reportes}.` : ''}${qa.lint === 'BLOQUEA' ? ` [LINTER — reglas duras, corrige primero] ${qa.lintFix}` : ''}${qa.etica === 'BLOQUEADA' ? ` [ETICA — prioridad] ${qa.eticaFix}` : ''}${qa.fix ? ` [CONVERSION] ${qa.fix}` : ''}`,
        { agentType: 'copywriter-landing', label: `reescribe:${id}.r${ronda}`, phase: 'Produccion' }
      )
      if (rw == null) { ronda--; break } // reescritor caido: no re-verificar un archivo sin cambios
      qa = await compuertas(a, id, file, ronda)
      historial.push(qa.lint === 'BLOQUEA' ? 'lint' : qa.score)
    }
    return { ...a, lint: qa.lint, lintFix: qa.lintFix, etica: qa.etica, eticaFix: qa.eticaFix, score: qa.score, veredicto: qa.veredicto, fix: qa.fix, reescrituras: ronda, historial }
  },
)

// ---- FASE 4 · Cierre ----
phase('Cierre')
const ok = resultados.filter(Boolean)
const aprobadas = ok.filter(r => aprobada(r))
const matar = ok.filter(r => !aprobada(r) && r.veredicto === 'MATAR')
const revisar = ok.filter(r => !aprobada(r) && r.veredicto !== 'MATAR')
const rescatadas = aprobadas.filter(r => r.reescrituras > 0).length
const contradicciones = aprobadas.filter(r => r.veredicto === 'REESCRIBIR').length
log(`Aprobadas: ${aprobadas.length} (${rescatadas} rescatadas por reescritura) · Cola humana: ${revisar.length} · Matar: ${matar.length}`)
if (contradicciones) log(`OJO: ${contradicciones} aprobada(s) por score con veredicto REESCRIBIR del adversarial — revisar su reporte antes de pautar`)

return {
  lanzamiento: L,
  total: ok.length,
  umbral: UMBRAL,
  aprobadas: aprobadas.map(r => ({ angulo: r.nombre, slug: r.slug, score: r.score, veredicto: r.veredicto, reescrituras: r.reescrituras, historial: r.historial })),
  matar: matar.map(r => ({ angulo: r.nombre, slug: r.slug, score: r.score, motivo: r.fix })),
  revisar: revisar.map(r => ({ angulo: r.nombre, slug: r.slug, lint: r.lintFix || undefined, etica: r.etica, motivoEtica: r.eticaFix || undefined, score: r.score, reescrituras: r.reescrituras, historial: r.historial, fix: r.fix })),
  nota: 'Maquetar las aprobadas con constructor-pagina. Cerrar el loop: tras el testeo pagado, invocar registrador-ganadores con los resultados reales para alimentar activos/angulos-ganadores.md.',
}
