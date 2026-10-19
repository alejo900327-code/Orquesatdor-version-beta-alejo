---
name: copys-en-bloque
description: Escribe los copys de un lanzamiento DESDE CERO trabajando por bloques (una etapa a la vez) junto al usuario en el chat, y los deja AUTOMÁTICAMENTE organizados dentro del Panel de Control Lanzamientos (la plataforma biblioteca-lanzamientos) — cada copy cae en su comunicado correcto por canal + etapa + código, con su texto y su status, sin copiar y pegar. Es el complemento de `panel-lanzamiento` (que arma el esqueleto vacío): esta skill LLENA el esqueleto con copy real. Úsala cuando el usuario quiera "hacer los copys en bloque", "escribir la etapa de Captación / Calentamiento / Ventas de un lanzamiento", "ir llenando el panel con los copys", "que queden organizados solos en la plataforma", "trabajar los emails y whatsapps de la campaña conmigo". Dispara con frases como "hagamos el bloque de captación", "escribamos los correos de ventas y súbelos", "vamos a llenar el panel del lanzamiento X por etapas". Escribe el copy con la voz de MC y las skills de copy (email-promo, anuncios-vsl, lander-copy…) y lo empuja vía el endpoint /bloque de la plataforma. NO despliega la plataforma (eso lo hace un humano); solo escribe datos vía la API.
---

# Copys en bloque · llenar el panel de la plataforma, una etapa a la vez

## Qué hace esta Skill
Convierte una sesión de escritura de copys en algo **organizado solo**: tú y el
usuario escriben los copys de un lanzamiento **por bloques (una etapa)**, y en
cuanto un bloque se aprueba, esta skill lo **empuja a la plataforma** (Panel de
Control Lanzamientos / repo `biblioteca-lanzamientos`). Cada copy aterriza en su
comunicado correcto — canal + etapa + código — con el texto adentro y su status.

- `panel-lanzamiento` = arma el **esqueleto vacío** (las filas por llenar).
- **`copys-en-bloque` (esta)** = **escribe el copy real** y lo mete en la plataforma.
- Las skills de copy (`email-promo`, `anuncios-vsl`, `lander-copy`, `broadcast-email`,
  `welcome-sequence`, etc.) = el motor de redacción que usas dentro de cada bloque.

## Requisitos antes de arrancar (confírmalos una vez por sesión)
1. **URL base de la plataforma.** Por defecto, desarrollo local: `http://localhost:8799`.
   Cuando esté publicada, será la URL `.workers.dev` (pídesela al usuario y úsala).
   Guárdala como `BASE` para toda la sesión.
2. **Lanzamiento destino.** `GET {BASE}/api/lanzamientos` para listarlos.
   - Si ya existe → toma su `id` (y su `marca`, `campania`, `mes_anio` para los códigos).
   - Si es nuevo → créalo con `POST {BASE}/api/lanzamientos`
     `{"nombre","marca","campania","mes_anio","estado":"planeando"}`. Si además no
     tiene esqueleto, ofrece correr primero `panel-lanzamiento` e importarlo — pero
     **no es obligatorio**: `/bloque` crea las filas que falten.
3. **Bloque a trabajar.** Por defecto, la unidad es **una ETAPA completa**
   (`CPT`, `AQC`, `CPL`, `VENTAS`, `RMKT`, `DOWNSELL`, `ONB`). El usuario puede
   pedir algo más chico ("solo los emails de Ventas") o libre.

## El flujo por bloque (paso a paso)
1. **Acuerda el bloque.** Ej. "Captación (CPT)". Lista qué piezas lleva (usa el
   *kit canónico por fase* de `panel-lanzamiento` como guía, ajustado al lanzamiento
   real). Si el esqueleto ya existe en la plataforma, léelo (`GET {BASE}/api/lanzamientos/{id}`)
   y trabaja sobre esas piezas y sus códigos.
2. **Reúne el contexto de copy** (no inventes): oferta, mecanismo, VoC/objeciones,
   fechas. Si hay `cerebros/<nicho>/activos/objeciones-maestro.md` o brief, úsalos.
3. **Escribe los copys del bloque** con la voz de MC y la skill de copy que
   corresponda a cada pieza. Muéstralos al usuario para aprobación **dentro del chat**.
4. **Al aprobar, empuja el bloque** a la plataforma (ver contrato abajo). Un solo
   POST con todo el bloque.
5. **Reporta**: cuántos `creados` / `actualizados` / `versionados`, cualquier
   `error`, y el link directo al lanzamiento: `{BASE}/#/l/{id}`.
6. **Siguiente bloque.** Repite. El progreso sube solo en la barra del lanzamiento.

## El contrato del endpoint (cómo se empuja)
`POST {BASE}/api/lanzamientos/{id}/bloque`  · header `content-type: application/json`

```json
{
  "etapa": "CPT",
  "autor": "MC + IA",
  "comunicados": [
    {
      "canal": "EMAIL",
      "etapa": "CPT",
      "codigo": "MC_CUMBRE_2024-EMAIL-CPT-01",
      "titulo": "Burburinho 01",
      "status": "REVISION",
      "estrategia": "Sembrar curiosidad del evento",
      "formato": "📝 Texto",
      "segmento": "Base de leads antiguos",
      "asunto": "Algo se está cociendo…",
      "fecha_gatillo": "qui 26",
      "hora": "09:00",
      "link_cta": "",
      "anexo": "",
      "observacion": "",
      "copy_md": "Asunto: Algo se está cociendo…\n\n<cuerpo completo del correo…>"
    }
  ]
}
```

**Upsert (no duplica):** el endpoint busca primero por (`canal` + `codigo`); si no,
por (`canal` + `etapa` + `titulo`). Si existe → **actualiza** (y si el copy previo
no estaba vacío y cambió, guarda una **versión** en el historial). Si no existe →
**lo crea** con el siguiente `orden` disponible en ese canal+etapa.

**Respuesta:** `{ "creados": N, "actualizados": N, "versionados": N, "errores": [] }`.

### Cómo llamarlo (Bash + curl)
Escribe el JSON del bloque a un archivo temporal y envíalo con `--data-binary`
(evita problemas de comillas/saltos de línea del copy):
```bash
curl -s -X POST "$BASE/api/lanzamientos/$ID/bloque" \
  -H "content-type: application/json" --data-binary @/tmp/bloque.json
```
> Para clave de equipo activa (si la pusieron), añade `-H "x-access-password: <clave>"`.

## Mapa de campos (JSON → columna del panel)
`canal`→Canal · `etapa`→Etapa · `codigo`→Código · `titulo`→Estrategia/Tema (el nombre
corto de la pieza) · `asunto`→Asunto (solo email) · `estrategia`→tema/intención ·
`formato`→Formato · `segmento`→Segmento/Grupo · `fecha_gatillo`→Fecha/Gatillo ·
`hora`→Hora · `link_cta`→Link CTA · `anexo`→Anexo · `observacion`→Observación ·
`copy_md`→**el texto completo del copy** (esto es lo nuevo que llena la plataforma).

- **Canales:** `EMAIL` `WPPG` (WhatsApp grupo) `WPP1` (1a1/API) `PAG` `CRV`.
- **Etapas:** `CPT` `AQC` `CPL` `VENTAS` `RMKT` `DOWNSELL` `ONB`.
- **Status:** `SELECCIONE` `ESCRIBIENDO` `REVISION` `REVISADA` `LISTA` `CANCELADO`.
- **Código:** `MARCA_CAMPAÑA_MESAÑO-CANAL-ETAPA-NN` (ej. `MC_CUMBRE_2024-WPPG-CPL-03`).
  Toma marca/campaña/mes del lanzamiento; NN correlativo por canal+etapa.

## Reglas críticas
- **Escribe copy real, no placeholders.** El valor de esta skill es llenar `copy_md`
  con la pieza terminada, en la **voz de MC**.
- **Status al empujar:** un borrador que el usuario aún no aprobó va como
  `ESCRIBIENDO`; un bloque aprobado en la sesión va como `REVISION` (Lista para
  revisión). No pongas `LISTA` tú: `LISTA`/`REVISADA` los marca el humano en la
  plataforma. (Migraciones de material ya lanzado son la excepción.)
- **Ético (§6):** cero promesas de resultados garantizados, cero urgencia inventada,
  cero prueba/testimonios fabricados. Si el copy los rozara, pásalo por `guardian-etico`
  antes de empujar.
- **No inventes prueba ni fechas.** Si falta la oferta, el testimonio o la fecha
  real, pídelos; deja el campo vacío antes que inventar.
- **Un bloque = un POST.** Junta todas las piezas de la etapa en un solo arreglo.
- **Respeta el esqueleto si existe.** Si el lanzamiento ya tiene filas (de
  `panel-lanzamiento`), reusa sus códigos/títulos para que el upsert ACTUALICE en vez
  de duplicar. Ante la duda, lee el lanzamiento primero.
- **No despliegas.** Solo escribes datos vía la API contra una plataforma ya corriendo
  (local o publicada). El deploy lo hace un humano.

## Reporte al usuario (cada bloque)
1. Tabla de lo empujado: pieza · canal · status · (chars del copy).
2. Resultado del endpoint: creados / actualizados / versionados / errores.
3. El link: `{BASE}/#/l/{id}` para revisarlo en pantalla.
4. Propón el siguiente bloque.

## Bloqueadores (auto-documentado — APPEND-ONLY)
> Formato: `### <síntoma>` → causa → fix. No borres entradas.

<!-- Nuevas entradas debajo de esta línea -->
