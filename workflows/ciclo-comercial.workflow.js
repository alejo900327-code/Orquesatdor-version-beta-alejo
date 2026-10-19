export const meta = {
  name: 'ciclo-comercial',
  description: 'El loop de aprendizaje comercial: analiza llamadas de venta transcritas (Fathom) y consolida objeciones reales en activos/objeciones-maestro.md.',
  whenToUse: 'Tras importar llamadas nuevas con herramientas/importar-llamadas.mjs. Corre semanal o bajo demanda.',
  phases: [
    { title: 'Inventario', detail: 'listar llamadas importadas aun sin analizar' },
    { title: 'Analisis', detail: 'un analista-llamadas por llamada, en paralelo' },
    { title: 'Consolidacion', detail: 'merge unico en objeciones-maestro (un solo escritor)' },
  ],
}

// args esperado: { carpeta?, cerebro?, max?, filtro?, archivos? }
//   carpeta: donde viven las transcripciones importadas
//   cerebro: cerebro del nicho (avatar §2 + guardarrailes §6)
//   max: tope de llamadas por corrida (default 30; el resto queda para la siguiente)
//   archivos: LISTA EXPLÍCITA de rutas a analizar (RECOMENDADO para tandas dirigidas:
//             calcúlala con Bash ANTES de invocar — ls | grep -E ... — y pásala aquí;
//             salta el inventario por agente, que demostró no aplicar filtros fielmente)
//   filtro: regex (grep -E) sobre el NOMBRE de archivo, solo si no pasas archivos
// El harness puede entregar args como STRING JSON (causa real de que tandas 2 y 3
// ignoraran filtro/archivos) — parsear defensivamente antes de leer nada.
let A = args
if (typeof A === 'string') { try { A = JSON.parse(A) } catch (e) { A = {} } }
A = A || {}
log(`args: tipo=${typeof args} · claves=${Object.keys(A).join(',') || 'ninguna'}`)
const CARPETA = A.carpeta || 'cerebros/cumbre-millonarios/fuentes/llamadas'
const CEREBRO = A.cerebro || 'cerebros/cumbre-millonarios/cerebro.md'
const MAX = A.max || 30
const FILTRO = A.filtro || ''
const ARCHIVOS = (A.archivos && A.archivos.length) ? A.archivos : null
const ANALISIS = 'salidas/comercial/analisis'
const MAESTRO = 'activos/objeciones-maestro.md'

// ---- FASE 1 · Inventario (deterministico y barato) ----
phase('Inventario')
const INVENTARIO_SCHEMA = {
  type: 'object',
  properties: {
    pendientes: { type: 'array', items: { type: 'string' } },
    yaAnalizadas: { type: 'number' },
  },
  required: ['pendientes'],
}
let todas
if (ARCHIVOS) {
  log(`Lista explícita recibida: ${ARCHIVOS.length} archivo(s) — se salta el inventario por agente`)
  todas = ARCHIVOS
} else {
  const inv = await agent(
    `Corre con Bash EXACTAMENTE este comando y usa SOLO su salida: ls ${CARPETA}/*.md 2>/dev/null${FILTRO ? ` | grep -E '${FILTRO}'` : ''}. Luego corre: ls ${ANALISIS}/*.md 2>/dev/null. Devuelve en "pendientes" las rutas del PRIMER comando cuyo archivo de análisis con el MISMO nombre base no existe todavía en ${ANALISIS}/, ordenadas por nombre. Si el primer comando devolvió N rutas, "pendientes" JAMÁS puede tener más de N. En "yaAnalizadas" el número de las que ya tienen análisis. No leas el contenido de ningún archivo.`,
    { label: 'inventario', phase: 'Inventario', schema: INVENTARIO_SCHEMA, effort: 'low' }
  )
  todas = (inv && inv.pendientes) || []
}
if (!todas.length) {
  return { mensaje: `No hay llamadas nuevas por analizar en ${CARPETA}. ¿Corriste antes herramientas/importar-llamadas.mjs?`, yaAnalizadas: (inv && inv.yaAnalizadas) || 0 }
}
const tanda = todas.slice(0, MAX)
if (todas.length > tanda.length) log(`OJO: ${todas.length - tanda.length} llamada(s) quedan fuera por el tope max=${MAX}; corre el workflow de nuevo para procesarlas`)
log(`${tanda.length} llamada(s) a análisis`)

// ---- FASE 2 · Análisis (paralelo: cada llamada es independiente) ----
phase('Analisis')
const LLAMADA_SCHEMA = {
  type: 'object',
  properties: {
    archivo: { type: 'string' },
    tipo: { type: 'string', enum: ['setter', 'closer', 'otro'] },
    resultado: { type: 'string', enum: ['cerrada', 'avanza', 'seguimiento', 'perdida', 'sin-confirmar'] },
    nObjeciones: { type: 'number' },
    banderasEtica: { type: 'number' },
    aprendizaje: { type: 'string' },
  },
  required: ['archivo', 'resultado', 'nObjeciones'],
}
const analisis = await pipeline(
  tanda,
  (f) => agent(
    `Eres analista-llamadas en MODO A (análisis de una llamada). Transcripción: ${f}. Cerebro: ${CEREBRO}. Maestro actual: ${MAESTRO} (solo para reconocer objeciones ya catalogadas — NO lo edites en este modo). Escribe tu análisis en ${ANALISIS}/<mismo nombre de archivo>. Devuelve el resumen estructurado.`,
    { agentType: 'analista-llamadas', label: `llamada:${f.split('/').pop().slice(0, 40)}`, phase: 'Analisis', schema: LLAMADA_SCHEMA }
  )
)

// ---- FASE 3 · Consolidación (barrera justificada: el merge necesita TODOS los análisis; un solo escritor) ----
phase('Consolidacion')
const ok = analisis.filter(Boolean)
const caidas = tanda.length - ok.length
if (caidas) log(`OJO: ${caidas} análisis no terminaron; sus llamadas siguen como pendientes para la próxima corrida`)
if (!ok.length) {
  return { error: 'Ningún análisis terminó; no hay nada que consolidar. Revisa las transcripciones y reintenta.' }
}
const CONSOLIDACION_SCHEMA = {
  type: 'object',
  properties: {
    objecionesNuevas: { type: 'number' },
    objecionesReforzadas: { type: 'number' },
    confirmadas: { type: 'number' },
    banderasEtica: { type: 'number' },
    notaParaElFundador: { type: 'string' },
  },
  required: ['objecionesNuevas', 'objecionesReforzadas'],
}
const archivosAnalisis = ok.map((a) => `${ANALISIS}/${a.archivo.split('/').pop()}`).join(', ')
const consolidado = await agent(
  `Eres analista-llamadas en MODO B (consolidación). Lee estos análisis nuevos: ${archivosAnalisis}. Actualiza ${MAESTRO} según tus reglas (acumulativo, citas textuales, hipótesis→confirmada con 2+, mejores respuestas solo con evidencia, banderas éticas §6). OJO — el maestro es GRANDE: usa Edit con inserciones/reemplazos dirigidos por sección (fila a fila, sección a sección); NUNCA reescribas el archivo entero con Write (riesgo de truncar la historia acumulativa). Si una sección no admite edición segura, añade la novedad como bloque "Adenda tanda <fecha>" al final de esa sección. Actualiza también la línea de "Estado" del maestro (total llamadas analizadas y objeciones). En "notaParaElFundador" resume en 3-5 líneas lo más importante que el negocio aprendió con esta tanda.`,
  { agentType: 'analista-llamadas', label: 'consolidar-maestro', phase: 'Consolidacion', schema: CONSOLIDACION_SCHEMA }
)

// ---- Cierre ----
const cerradas = ok.filter((a) => a.resultado === 'cerrada').length
const perdidas = ok.filter((a) => a.resultado === 'perdida').length
const banderas = ok.reduce((s, a) => s + (a.banderasEtica || 0), 0)
if (banderas) log(`⚠️ ${banderas} bandera(s) ética(s) detectada(s) — revisar sección de banderas del maestro para coaching`)

return {
  llamadasAnalizadas: ok.length,
  resultados: { cerradas, perdidas, otras: ok.length - cerradas - perdidas },
  maestro: consolidado || 'consolidación no devolvió resumen — revisar ' + MAESTRO,
  banderasEtica: banderas,
  pendientesProximaCorrida: todas.length - tanda.length + caidas,
  nota: `Análisis por llamada en ${ANALISIS}/. El maestro alimenta a preparador-llamadas, entrenador-comercial y redactor-seguimiento (próximos agentes de la Flota C).`,
}
