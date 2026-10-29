---
name: ponencia-cinematografica
description: Construye una ponencia/keynote de nivel premium como un deck HTML autocontenido, generado por un script de Python (no PowerPoint a mano). Mundo visual cinematográfico (oscuro + oro + acento), tipografía que LLENA la pantalla, fondos de imagen (Nano Banana) y video (Higgsfield), notas de ponente ocultas (tecla N), temporizadores en los ejercicios, badges de principios, slides de organigrama/diagrama y slide final de regalo con QR. Úsala cuando Alejo diga "hazme la ponencia / el deck / la presentación", "clase para el Círculo/Mastermind", "deck cinematográfico", "una ponencia top", o quiera un keynote que se presenta a pantalla completa desde el navegador. Para convertir el deck a PPT/PDF usa [[deck-html-a-pptx-pdf]]; para la herramienta-regalo usa [[herramienta-regalo-brujula]].
---

# Ponencia cinematográfica (deck HTML generado por Python)

Cómo hicimos los decks del Mastermind del Círculo (Día 1 "Escala", Día 2 "Liderazgo"). El deck NO se arma en PowerPoint: es **un HTML autocontenido que genera un script `gen_<deck>.py`**. Se presenta a pantalla completa desde el navegador (← → navega, F pantalla completa, N notas). Fuente: `Medellin-Escala/gen_dia2.py` + `Liderazgo-Dia2.html`.

## Principios no negociables (feedback real de Alejo)
1. **La tipografía LLENA el lienzo.** El error #1: contenido chico y centrado. El contenedor `.pad` debe ser ancho (`max-width:1600px` en lienzo 1920, no 1180) y los diagramas usar `width:min(1500px,97vw)`. Si algo "se ve pequeño", casi siempre es `.pad` angosto, no la fuente.
2. **Luxury siempre** ([[diseno-luxury-siempre]]): íconos SVG dibujados (nunca emojis), gradientes sutiles, selección/scrollbar tematizados.
3. **Animaciones reales, no sintéticas.** Para movimiento de fondo usa video real (Higgsfield), no Ken Burns por código (Alejo lo rechazó). Imágenes estáticas > animación cutre.
4. **Imágenes únicas**, nada repetido: rota los fondos de las slides de texto con contadores (`_nc()`/`_na()`), genera una imagen distinta por slide densa.
5. **Legibilidad del serif:** Bodoni Moda con `font-variation-settings:'opsz' 34` + `font-weight:700` (el master óptico 96 lo adelgaza y no se lee).
6. **Hablar claro** ([[hablar-claro-sin-metaforas]]) en el contenido; español siempre ([[responder-en-espanol]]).

## Mundo visual (tokens)
`--bg:#0A0B0E · --gold:#C9A24B · --crim:#B23A3A · --ink:#ECE7DC · --mut:#9A948A`.
Fuentes Google: `Bodoni Moda` (display serif) · `Hanken Grotesk` (texto) · `JetBrains Mono` (eyebrows/números/mono). Ejemplo de mundo: bushido/samurái (oscuro, armadura, niebla, oro). El mundo se elige por la ponencia; Alejo rechaza repetir un mundo que la sala ya vio (p.ej. estatuas si ya las vieron).

## Arquitectura del generador (`gen_<deck>.py`, Python 3.9 — ojo sin backslash en f-strings)
- `IMGDIR`/`VIDDIR`; `VIDS = {k for k in ALLKEYS if os.path.exists(f"{VIDDIR}/{k}.mp4")}` → una escena usa video si existe el mp4, si no la imagen.
- Rotadores de fondo: `CONTENT_ROTA=[f"bu_c{i:02d}" ...]`, `_nc()`/`_na()` devuelven el siguiente fondo para que ninguna slide de texto repita imagen.
- `shell(bgk, inner, cls, note, mo)`: arma la `<section class="slide">` con el fondo (video `<video class=bgv autoplay muted loop playsinline poster=...>` o `<div class=bg style=background-image:url(...)>`), scrim de legibilidad, esquinas `.brk`, y `data-note` para la nota.
- Helpers de slide: `cover()`, `divider()`, `statement(eye,title,sub,note,mo,pr)`, `content(eye,title,items,...,pr)`, `aplica(n,title,qs,close,...,secs)` (ejercicio con timer), `twoCol()` (antes/ahora), `cierre()`, y especiales de diagrama (`vision()`, `organigrama()`, `orgPrevio()`, `regalo()`).
- `rv(t,c,d)` envuelve en `<div class="rv">` con `--d` (delay) = reveal con blur focus-in.
- Al final: `out=f"""<!doctype html>...{''.join(slides)}...<script>{JS}</script>"""` y `open(...).write(out)`.

## Piezas que Alejo pidió (reutilizables)
- **Apertura con pregunta** (como el Día 1): abre con una pregunta sola a la sala, luego la segunda. Dos `statement()` separados.
- **Badges de principio:** cuando muestres un principio, un píldora dorada `PRINCIPIO NN`. Param `pr="01"` en `statement()`/`content()`; CSS `.prbadge` (fondo oro, mono, uppercase).
- **Temporizador de ejercicio** (igual que Día 1): anillo SVG + número mono grande, botones ▶ Iniciar / ❚❚ Pausa / ↺, chime WebAudio al llegar a 0, últimos 15s en coral. **No autostart** (el ponente lo arranca con su música). Al salir de la slide se pausa solo. Default 2:00 (`secs=120`). Ver el JS `chime()/fmt()/paintT()/resetTimer()` y el markup `.timer[data-secs]`.
- **Slides de organigrama/diagrama:** TÚ (pill oro) → conector → fila de tarjetas (persona/rol + subetiqueta) → barra inferior. Patrón "antes (por área) → ahora (por embudo)". Cada tarjeta = ícono SVG persona + `<b>` nombre + `<em>` subetiqueta mono. Para anidar (un sub-reporte) una `.pcard.sub` colgando con un `.pconn`.
- **Notas de ponente (tecla N):** van en `data-note`. Contienen material INTERNO (nombres reales, citas, números, "esto no está grabado"). NUNCA se entregan a alumnos → antes de compartir, quítalas (ver [[deck-html-a-pptx-pdf]], stripper de `data-note`).
- **Slide final de REGALO con QR:** `regalo()` embebe el QR en base64 (`organigrama-qr.png`), nombre de la herramienta, instrucción y la URL. Genera el QR con `python3 -c "import qrcode; ..."` apuntando al live.

## Gotchas documentados
- El navegador **pausa los video autoplay fuera de pantalla** → en `show(n)` reproducí el video de la slide activa (`v.currentTime=0;v.play()`) y pausá los demás.
- Higgsfield tiene **límite diario** (~5 videos) aparte de los créditos. Nano Banana (gemini-3-pro-image por `GOOGLE_API_KEY`) es ilimitado para imágenes ([[generacion-imagenes-ia]]).
- El panel de preview de la app da screenshots a 800px y desfasados; para verificar de verdad renderizá con Chrome headless a 1920×1080 ([[deck-html-a-pptx-pdf]]) o usá `javascript_tool` para leer el estado real.
- Python 3.9: nada de `\` dentro de f-strings; usa funciones lambda/replace.

## Flujo
1. Define mundo + narrativa (bloques). 2. Escribe `gen_<deck>.py` con los helpers. 3. Genera imágenes únicas (Nano Banana) y, si quieres movimiento, 3-5 videos clave (Higgsfield). 4. `python3 gen_<deck>.py` → HTML. 5. Verifica a 1920×1080 que **todo llena el lienzo**. 6. Entrega: carpeta (HTML + img + vid) y, para enviar, exporta con [[deck-html-a-pptx-pdf]].
