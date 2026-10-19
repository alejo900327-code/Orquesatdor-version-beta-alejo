---
name: panel-lanzamiento
description: Genera el PANEL DE LANZAMIENTO — el tablero de control con TODOS los comunicados de un lanzamiento, organizados por canal × etapa (email, WhatsApp de grupo, WhatsApp 1a1/API, páginas y creativos), en el estilo probado de los lanzamientos de Millonarios Conscientes (tipo C04). Produce un esqueleto VACÍO estructurado (NO el copy) listo para llenar y trackear: cada comunicado es una fila con su código único, status kanban, estrategia, fecha/gatillo, hora y columnas de métricas. Salida en CSV importable a Google Sheets. Úsala SIEMPRE que el usuario quiera armar el panel/tablero/matriz/cronograma de comunicados de un lanzamiento, planear todos los emails y mensajes de una campaña, o replicar el panel de un lanzamiento anterior a uno nuevo. Dispara con frases como "hazme el panel de lanzamiento", "arma el tablero de comunicados de la campaña", "necesito la matriz de todos los emails y whatsapps del lanzamiento", "replica el panel del C04 para esta campaña". NO escribe el copy de cada pieza (para eso están email-promo, anuncios-vsl, etc.); esta skill construye el ESQUELETO de planeación y seguimiento.
---

# Panel de lanzamiento · tablero de comunicados por etapa

## Cuándo usar esta Skill
Vas a planear y trackear **todos los comunicados** de un lanzamiento (todos los
emails, mensajes de WhatsApp, páginas y creativos), en un solo tablero, como el
panel del **C04** de MC. Esta skill construye el **esqueleto vacío estructurado**:
la lista completa de piezas que un lanzamiento necesita, cada una con su código,
status, estrategia, fecha/gatillo y columnas de métricas — lista para llenar.

**Esta skill NO escribe el copy.** El copy de cada pieza vive en su propio Google
Doc (columna `Copy Doc`) y lo generan las skills de copy (`email-promo`,
`anuncios-vsl`, `lander-copy`, etc.). Aquí se planea y se hace seguimiento.

## Qué produce
Uno o más archivos **CSV importables a Google Sheets** en
`salidas/<lanzamiento>/panel/`:
- `comunicados.csv` — la matriz maestra (todas las filas, todos los canales).
- (opcional, si el usuario lo pide) un CSV por canal: `email.csv`,
  `whatsapp.csv`, `paginas-creativos.csv`.

## Inputs que pides antes de generar
Si falta alguno, pregúntalo (no inventes):
1. **Marca** (ej. `MC`) y **campaña/edición** (ej. `C04`).
2. **Mes/año** del lanzamiento (ej. `ABR24`).
3. **Modelo de lanzamiento**: ¿con evento/clases en vivo (CPLs) o directo a VSL?
   Si hay clases → **cuántas** (CPL 01, 02, 03…) y sus fechas.
4. **Fechas clave**: inicio de captación, evento(s), apertura de carrito, cierre.
5. **Oferta**: ¿lleva upsell? ¿order bump? ¿downsell? (define filas de VENTAS/DOWNSELL).
6. **Canales activos** (por defecto: Email, WhatsApp grupo, WhatsApp 1a1, Páginas,
   Creativos). El usuario puede quitar/añadir (ej. Orgánico/Stories).
7. **Nº de versiones de landing de captura** (ej. 10 → CAPTURA V1..V10).

## La convención de código (CRÍTICA — respétala siempre)
```
MARCA_CAMPAÑA_MESAÑO - CANAL - ETAPA - NN
   MC  _  C04  _ ABR24 - WPPG  -  CPL  - 20
```
- **CANAL**: `EMAIL` · `WPPG` (WhatsApp grupo) · `WPP1` (WhatsApp 1a1/API) ·
  `PAG` (páginas) · `CRV` (creativos/ads).
- **ETAPA**: `CPT` (captación) · `AQC` (calentamiento) · `CPL` (evento/clases) ·
  `VENTAS` (carrito abierto) · `RMKT` (remarketing/carrito abandonado) ·
  `DOWNSELL` · `ONB` (onboarding).
- **NN**: correlativo de dos dígitos dentro de ese canal+etapa.

## El sistema de STATUS (columna kanban — usa EXACTAMENTE estos valores)
`– Seleccione –` → `✍️ Escribiendo` → `🔵 Lista para revisión` →
`✅ Revisada` → `🚀 Lista para lanzamiento` → `❌ Cancelado`
> Toda fila nueva nace en `– Seleccione –`.

## Las columnas del CSV maestro (en este orden)
```
Fase | Canal | Etapa | Código | # | Status | Copy Doc | Estrategia/Tema |
Formato | Segmento/Grupo | Asunto | Fecha/Gatillo | Hora | Link CTA |
Anexo | Observación | #Envíos | #Opens | #Clicks | #Unsub
```
- **Formato**: `📝 Texto` · `🎬 Video + 📝 Texto` · `🎙️ Audio + 📝 Texto` · `🖼️ Imagen`.
- **Asunto**: solo aplica a email; en WhatsApp/páginas se deja vacío.
- **Fecha/Gatillo**: una fecha (`mar 23 abr`) o un disparador (`Carrito abandonado`,
  `Boleto no pagado`, `D+1`, `Grupo lleno`).
- Las 4 columnas de métricas se dejan **vacías** (se llenan tras el disparo).

## El proceso de creación (paso a paso)
1. **Reúne los inputs** de arriba. Confirma modelo de lanzamiento, nº de CPLs,
   nº de landings de captura y si hay upsell/downsell.
2. **Arma la línea de tiempo** de fases con las fechas dadas.
3. **Genera las filas** desplegando el *kit canónico por fase* (abajo), ajustado
   a los inputs: repite el bloque CPL por cada clase, la captura por cada versión,
   etc. Asigna código correlativo y `Status = – Seleccione –` a cada fila.
4. **Escribe el CSV maestro** a `salidas/<lanzamiento>/panel/comunicados.csv`.
   Escapa comas dentro de celdas con comillas dobles.
5. **Entrega** al usuario: (a) confirma la ruta del archivo, (b) muestra un
   RESUMEN en tabla (cuántas piezas por fase y canal), (c) explícale cómo
   importarlo a Google Sheets (Archivo → Importar → Subir → separador coma).
6. Si pidió CSV por canal, escribe también los archivos separados.

## Kit canónico de comunicados por fase (el molde C04)
Despliega estas filas por defecto; añade/quita según el lanzamiento real.

### FASE 0 · Captación (CPT)
- **PAG**: Captura V1..Vn · Gracias con CTA al WhatsApp · Encuesta/Form · Página del Evento · Blog de lanzamiento.
- **EMAIL**: Correo bienvenida (Boas vindas + WhatsApp) · Burburinho 01 · 02 · 03 (base de leads antiguos).
- **WPP1**: Bienvenida + Encuesta 1a1 (API) · Aviso "grupo lleno".
- **CRV**: Creativos de captación (video / estático / carrusel) por ángulo.

### FASE 1 · Calentamiento (AQC)
- **EMAIL**: AQC 01 "Entra al grupo de WhatsApp del evento" (D+1) · AQC 02 "Carta al emprendedor" (D+2) · AQC 03…
- **WPPG (CTD)**: Mensajes de contenido/calentamiento del grupo (uno por día hasta el evento).
- **CRV / Orgánico** (si aplica): stories/posts de calentamiento.

### FASE 2 · Evento / Clases en vivo (CPL) — repetir por cada clase
Por **cada CPL** (01, 02, 03…), en **WPPG (CPL)**:
- "Falta 2 horas · Clase N" · "Faltan 15 minutos · Clase N" · "Estoy en vivo · Clase N" ·
  "Estoy en vivo 2 · Clase N" · "Faltas tú 1 · Clase N" · "Faltas tú 2 · Clase N" ·
  "Faltas tú 3 – última llamada · Clase N".
- **EMAIL**: Recordatorio de clase N (lembrete de aula).

### FASE 3 · Apertura de carrito / Ventas (VENTAS)
- **EMAIL (VENTAS)**: Clímax · Excitación · Quiebra de objeción (precio/plan) ·
  "Mañana es el último día" · "Hoy es el último día".
- **WPPG (VENTAS)**: Testimonio 🔥 · Soporte · Soporte liberado · Explorar la garantía ·
  "Faltan 2 horas para terminar" · "Falta 1 hora" · "Faltan 30 min" ·
  "Faltan 10 min – última llamada" · "Inscripciones cerradas".
- **PAG**: Página de ventas · Página de upsell · Página de gracias/obrigado.

### FASE 4 · Remarketing / Carrito abandonado (RMKT)
- **EMAIL**: Carrito abandonado ("¿pasó algo?") · Boleto generado + finalizar tarjeta ·
  Boleto no pagado + CTA soporte · Tarjeta rechazada + CTA soporte.
- **CRV / WPP**: RMKT WhatsApp · RMKT página de captura.

### FASE 5 · Downsell (DOWNSELL) — solo si hay oferta de downsell
- **EMAIL (DOWNSELL)**: Convite 01 · 02 · 03 · 04.

### FASE 6 · Onboarding (ONB) — post-compra
- **EMAIL**: Onboarding de alumno / bienvenida al producto · Onboarding 01 · 02 · 03.

## Reglas críticas
- **Esqueleto, no copy.** Nunca rellenes la columna `Copy Doc` con el texto del
  comunicado; ahí va (después) el link al Google Doc. Deja `Asunto`/`Estrategia`
  como el *tema* de la pieza, no el copy.
- **Todo status nace en `– Seleccione –`.** No adelantes estados.
- **Códigos únicos y correlativos** por canal+etapa. No repitas NN.
- **Ajusta al lanzamiento real**: si no hay evento en vivo, elimina la FASE 2 y
  los WPPG-CPL; si no hay downsell, elimina FASE 5. No dejes filas fantasma.
- **CSV limpio**: encabezados en la primera fila, una fila por comunicado, comas
  internas entre comillas dobles, UTF-8. Nada de celdas combinadas (eso se hace
  en Sheets después).
- **Métricas vacías** al generar; son para llenar post-disparo.

## Bloqueadores (auto-documentado — APPEND-ONLY)
> Formato: `### <síntoma>` → causa → fix. No borres entradas.

<!-- Nuevas entradas debajo de esta línea -->
