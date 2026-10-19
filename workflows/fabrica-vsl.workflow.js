export const meta = {
  name: 'fabrica-vsl',
  description: 'Pipeline RMBC completo: de un Cerebro a la campaña entera — Investigación → Mecanismo → Gran Idea → Brief → VSL (con compuertas) → Aplicaciones (ganchos, anuncios multiplataforma, TikTok, advertorial, PDP, upsells, emails).',
  whenToUse: 'Para producir la espina RMBC de un producto (VSL y todas sus piezas de embudo). Consume bastante; confirmar antes. Piezas opcionales vía args.',
  phases: [
    { title: 'Investigacion', detail: 'avatar + voice-of-customer + swipe en paralelo' },
    { title: 'Mecanismo', detail: 'idear + evaluar UMP/UMS, elegir ganador' },
    { title: 'GranIdea', detail: 'la Big Idea que envuelve la campaña' },
    { title: 'Brief', detail: 'las 25 preguntas del Nuevo Brief' },
    { title: 'VSL', detail: 'guion 7 partes -> voz -> etica + adversarial' },
    { title: 'Aplicaciones', detail: 'ganchos + anuncios + tiktok + advertorial + pdp + upsells + emails, en paralelo' },
    { title: 'Cierre', detail: 'resumen y pendientes' },
  ],
}

// args esperado: { lanzamiento, cerebro, formatoVsl?, secuenciasEmail?, saltarInvestigacion?, piezas? }
//   lanzamiento: slug (carpeta en salidas/)
//   cerebro: ruta al cerebro.md
//   formatoVsl: 'corto' | 'medio' | 'largo'  (default 'medio')
//   secuenciasEmail: string (default 'carrito-abandonado')
//   saltarInvestigacion: true si ya existen 01/02/03 (reusa investigacion previa)
//   piezas: array opcional de aplicaciones a producir; default TODAS:
//           ['ganchos','anuncios','tiktok','advertorial','pdp','upsells','emails']
const L = (args && args.lanzamiento) || 'vsl-piloto'
const CEREBRO = (args && args.cerebro) || 'cerebros/millonarios-conscientes/cerebro.md'
const FORMATO = (args && args.formatoVsl) || 'medio'
const EMAILS = (args && args.secuenciasEmail) || 'carrito-abandonado'
const PIEZAS = (args && args.piezas) || ['ganchos','anuncios','tiktok','advertorial','pdp','upsells','emails']
const OUT = `salidas/${L}`

const QA_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'number' },
    etica: { type: 'string', enum: ['APROBADA', 'BLOQUEADA'] },
    veredicto: { type: 'string', enum: ['PUBLICAR', 'REESCRIBIR', 'MATAR'] },
    fix: { type: 'string' },
  },
  required: ['score', 'etica', 'veredicto'],
}

// ---- FASE 1 · Investigacion (barrera: mecanismo necesita los 3 resultados) ----
if (!(args && args.saltarInvestigacion)) {
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
} else {
  log('Investigacion saltada: reusando 01/02/03 existentes')
}

// ---- FASE 2 · Mecanismo Unico ----
phase('Mecanismo')
await agent(
  `Eres mecanismo-unico. Cerebro: ${CEREBRO}. Carpeta de salida OUT=${OUT}. Lee ${OUT}/01-avatar.md, ${OUT}/02-voc.md, ${OUT}/03-swipe.md. Idea y evalua mecanismos; escribe el ganador y alternativas en ${OUT}/05-mecanismo.md.`,
  { agentType: 'mecanismo-unico', label: 'mecanismo', phase: 'Mecanismo' }
)

// ---- FASE 2.5 · Gran Idea (el angulo maestro de la campana) ----
phase('GranIdea')
await agent(
  `Eres arquitecto-gran-idea. Cerebro: ${CEREBRO}. OUT=${OUT}. Lee 01-avatar, 02-voc, 03-swipe y 05-mecanismo. Genera y evalua candidatas de GRAN IDEA, desarrolla la ganadora en ${OUT}/04a-gran-idea.md.`,
  { agentType: 'arquitecto-gran-idea', label: 'gran-idea', phase: 'GranIdea' }
)

// ---- FASE 3 · Brief ----
phase('Brief')
await agent(
  `Eres redactor-brief. Cerebro: ${CEREBRO}. OUT=${OUT}. Lee 01-avatar, 02-voc, 03-swipe, 05-mecanismo y 04a-gran-idea (la gran idea manda el angulo maestro). Rellena las 25 preguntas del Nuevo Brief en ${OUT}/06-brief.md, con marcadores [PENDIENTE] donde falte info.`,
  { agentType: 'redactor-brief', label: 'brief', phase: 'Brief' }
)

// ---- FASE 4 · VSL (redaccion -> voz -> etica + adversarial) ----
phase('VSL')
await agent(
  `Eres redactor-vsl. Cerebro: ${CEREBRO}. OUT=${OUT}. Formato: ${FORMATO}. Lee 06-brief, 05-mecanismo y 04a-gran-idea. Escribe el VSL de 7 partes + 3-4 variaciones de gancho en ${OUT}/07-vsl.md.`,
  { agentType: 'redactor-vsl', label: 'vsl', phase: 'VSL' }
)
await agent(
  `Eres editor-voz-marca. Edita ${OUT}/07-vsl.md a la voz de la marca (Cerebro: ${CEREBRO}, referencias en activos/voz-de-marca/). Reescribe en el mismo archivo.`,
  { agentType: 'editor-voz-marca', label: 'voz:vsl', phase: 'VSL' }
)
const [eticaVsl, advVsl] = await parallel([
  () => agent(
    `Eres guardian-etico. Revisa ${OUT}/07-vsl.md contra ${CEREBRO}. Escribe veredicto en ${OUT}/qa/vsl.etica.md y devuelve el resultado estructurado.`,
    { agentType: 'guardian-etico', label: 'etica:vsl', phase: 'VSL', schema: QA_SCHEMA }
  ),
  () => agent(
    `Eres verificador-adversarial. Ataca ${OUT}/07-vsl.md (avatar: ${OUT}/01-avatar.md). Escribe en ${OUT}/qa/vsl.score.md y devuelve el resultado estructurado.`,
    { agentType: 'verificador-adversarial', label: 'adv:vsl', phase: 'VSL', schema: QA_SCHEMA }
  ),
])

// ---- FASE 5 · Aplicaciones (todas en paralelo; piezas segun args) ----
phase('Aplicaciones')
const APPS = {
  ganchos: () => agent(
    `Eres generador-hooks. Cerebro: ${CEREBRO}. OUT=${OUT}. Lee 06-brief, 05-mecanismo, 04a-gran-idea y 02-voc. Genera la bateria de ganchos en ${OUT}/04b-ganchos.md.`,
    { agentType: 'generador-hooks', label: 'ganchos', phase: 'Aplicaciones' }
  ),
  anuncios: () => agent(
    `Eres redactor-anuncios. Cerebro: ${CEREBRO}. OUT=${OUT}. Lee 06-brief, 05-mecanismo, 07-vsl, 02-voc y 04b-ganchos si existe. Escribe el set multiplataforma en ${OUT}/08-anuncios.md.`,
    { agentType: 'redactor-anuncios', label: 'anuncios', phase: 'Aplicaciones' }
  ),
  tiktok: () => agent(
    `Eres guionista-tiktok. Cerebro: ${CEREBRO}. OUT=${OUT}. Lee 02-voc, 05-mecanismo, 06-brief y 07-vsl. Escribe guiones modulares + plan de testeo iterativo en ${OUT}/13-tiktok.md.`,
    { agentType: 'guionista-tiktok', label: 'tiktok', phase: 'Aplicaciones' }
  ),
  advertorial: () => agent(
    `Eres redactor-advertorial. Cerebro: ${CEREBRO}. OUT=${OUT}. Lee 06-brief, 05-mecanismo, 04a-gran-idea y 02-voc. Escribe el publireportaje en ${OUT}/11-advertorial.md.`,
    { agentType: 'redactor-advertorial', label: 'advertorial', phase: 'Aplicaciones' }
  ),
  pdp: () => agent(
    `Eres redactor-pdp. Cerebro: ${CEREBRO}. OUT=${OUT}. Lee 06-brief, 05-mecanismo y 02-voc. Escribe la pagina de producto en ${OUT}/12-pdp.md.`,
    { agentType: 'redactor-pdp', label: 'pdp', phase: 'Aplicaciones' }
  ),
  upsells: () => agent(
    `Eres arquitecto-upsells. Cerebro: ${CEREBRO}. OUT=${OUT}. Lee 06-brief y 05-mecanismo. Disena 2-3 upsells en ${OUT}/09-upsells.md.`,
    { agentType: 'arquitecto-upsells', label: 'upsells', phase: 'Aplicaciones' }
  ),
  emails: () => agent(
    `Eres redactor-emails. Cerebro: ${CEREBRO}. OUT=${OUT}. Secuencia(s): ${EMAILS}. Lee 06-brief y 05-mecanismo. Escribe las secuencias en ${OUT}/10-emails.md.`,
    { agentType: 'redactor-emails', label: 'emails', phase: 'Aplicaciones' }
  ),
}
const activas = PIEZAS.filter(p => APPS[p])
log(`Aplicaciones a producir: ${activas.join(', ')}`)
await parallel(activas.map(p => APPS[p]))

// ---- FASE 6 · Cierre ----
phase('Cierre')
const vslOk = eticaVsl && eticaVsl.etica === 'APROBADA' && advVsl && advVsl.score >= 70
log(`VSL: etica=${eticaVsl && eticaVsl.etica} score=${advVsl && advVsl.score} -> ${vslOk ? 'LISTO' : 'REQUIERE TRABAJO'}`)

return {
  lanzamiento: L,
  formatoVsl: FORMATO,
  piezas: activas,
  entregables: {
    mecanismo: `${OUT}/05-mecanismo.md`,
    granIdea: `${OUT}/04a-gran-idea.md`,
    brief: `${OUT}/06-brief.md`,
    vsl: `${OUT}/07-vsl.md`,
    ganchos: `${OUT}/04b-ganchos.md`,
    anuncios: `${OUT}/08-anuncios.md`,
    tiktok: `${OUT}/13-tiktok.md`,
    advertorial: `${OUT}/11-advertorial.md`,
    pdp: `${OUT}/12-pdp.md`,
    upsells: `${OUT}/09-upsells.md`,
    emails: `${OUT}/10-emails.md`,
  },
  vsl: { etica: eticaVsl && eticaVsl.etica, score: advVsl && advVsl.score, veredicto: advVsl && advVsl.veredicto, fix: vslOk ? undefined : (advVsl && advVsl.fix) },
  nota: 'Revisa los [PENDIENTE] del Brief antes de publicar. optimizador-cro se corre APARTE, sobre una pagina ya viva. Si el VSL no paso la compuerta, aplica el fix y reejecuta la Fase VSL.',
}
