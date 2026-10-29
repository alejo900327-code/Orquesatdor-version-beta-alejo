---
name: deck-html-a-pptx-pdf
description: Convierte un deck HTML (slideshow a pantalla completa, una slide visible a la vez) en PPTX y PDF fieles, renderizando cada slide a imagen 1920x1080 con Chrome headless y armándolas con python-pptx y PIL. Incluye el preprocesador de render (video→poster, overlays ocultos, reveals fijos, navegación por #s=N), el fix del bug "screen4x3" (PPT que se ve chico/encogido), y el stripper de notas de ponente para versiones de alumnos. Úsala cuando Alejo diga "pásamelo a PPT/PowerPoint", "dámelo en PDF", "sácalo en un formato", "la letra sale pequeña en el ppt", o quiera enviar un deck HTML por WhatsApp/correo. Complementa a [[ponencia-cinematografica]].
---

# Deck HTML → PPTX / PDF

Cómo exportamos los decks del Círculo a archivos enviables. Idea: **una imagen 1920×1080 a pantalla completa por slide** (conserva el diseño exacto; los videos quedan como su fotograma de fondo). Herramientas: Google Chrome (headless) + `python-pptx` + `PIL`. No requiere internet salvo las Google Fonts del deck.

## Por qué "la letra sale pequeña" (dos causas reales)
1. **Diseño:** el contenido estaba limitado a `.pad{max-width:1180px}` en un lienzo 1920 → chico y centrado. **Fix en el generador** (no en el export): `.pad max-width:1600px` y diagramas `width:min(1500px,97vw)`, y subir los `clamp()`. Ver [[ponencia-cinematografica]].
2. **Formato:** python-pptx deja la slide etiquetada `type="screen4x3"` aunque midas 16:9 → Keynote/Google Slides/preview de WhatsApp la meten en marco 4:3 y encogen todo. **Fix:** parchear `presentation.xml` a `type="screen16x9"` tras guardar.

## Paso 1 — preprocesador de render
Genera una copia `_render.html` del deck con: videos→poster (imagen estática garantizada), overlays ocultos (counter/credit/notes/dust/botones de timer), reveals fijos (sin animación), y un hook para mostrar una slide por hash `#s=N`.

```python
import re, sys
h = open(src, encoding="utf-8").read()
# video de fondo -> div con su poster
h = re.sub(r'<video class="bgv"[^>]*poster="([^"]+)"[^>]*>.*?</video>',
           r'<div class="bg" style="background-image:url(\1)"></div>', h, flags=re.S)
inject = ('<style id="__pptx">.counter,.credit,#notes,.navhint,.dust,.tctrls{display:none!important}'
          '.rv{opacity:1!important;transform:none!important;filter:none!important;animation:none!important}'
          '.slide{transition:none!important}</style>'
          '<script>window.addEventListener("load",function(){try{var m=(location.hash||"").match(/s=(\\d+)/);'
          'if(m&&window.show){show(parseInt(m[1],10));}}catch(e){}});</script>')
h = h.replace('</body>', inject + '</body>', 1)
open(dst,"w",encoding="utf-8").write(h)
print("slides=", h.count('class="slide'))
```

## Paso 2 — render + build (PDF + PPTX 16:9)
Chrome headless, una captura por slide (`--window-size=1920,1080 --virtual-time-budget=5000 --screenshot=out.png "file://.../_render.html#s=N"`), en lotes de ~6 en paralelo (cada uno con su `--user-data-dir`). Luego JPG (quality 86) para peso, PDF con PIL y PPTX con python-pptx; parchea el type.

```python
# por cada i: Popen([CHROME,"--headless=new","--disable-gpu","--hide-scrollbars",
#   "--force-device-scale-factor=1","--window-size=1920,1080","--virtual-time-budget=5000",
#   f"--user-data-dir={ud}",f"--screenshot={png}",f"file://{render}#s={i}"])
from PIL import Image; from pptx import Presentation; from pptx.util import Inches
jpgs=[p[:-4]+".jpg" for p in pngs]
for p,j in zip(pngs,jpgs): Image.open(p).convert("RGB").save(j,"JPEG",quality=86,optimize=True)
# PDF
pg=[Image.open(j).convert("RGB") for j in jpgs]; pg[0].save(PDF,save_all=True,append_images=pg[1:],resolution=150.0)
# PPTX 16:9
prs=Presentation(); prs.slide_width=Inches(13.333); prs.slide_height=Inches(7.5)
blank=prs.slide_layouts[6]
for j in jpgs:
    s=prs.slides.add_slide(blank); s.shapes.add_picture(j,0,0,width=prs.slide_width,height=prs.slide_height)
prs.save(PPTX)
# FIX type: unzip, replace 'type="screen4x3"'→'type="screen16x9"' en ppt/presentation.xml, rezip
```

Tiempos: ~49 slides ≈ 2-3 min (corre en background). Peso final con JPG: ~5 MB (con PNG se va a ~57 MB — usa JPG).

## Paso 3 — versión para alumnos (quitar notas)
Las notas de ponente (`data-note`) llevan material interno (nombres reales, citas, números). Antes de entregar a alumnos, vacíalas. Afecta también a la versión HTML/PDF/PPT que vas a compartir.

```python
h = re.sub(r'\sdata-note="[^"]*"', '', h)   # valores van HTML-escapados → sin comillas dentro
h = re.sub(r'\s*·?\s*N notas del ponente', '', h)  # quita la mención del pie
```
Verifica: `grep -c 'data-note="'` = 0 (el `getAttribute('data-note')` del JS puede quedar, es inocuo). Y revisa que no se filtren nombres/citas internas.

## Entrega
- **PDF = el más seguro para WhatsApp** (se ve igual en cualquier dispositivo, sin descuadres).
- **PPTX** si lo quieren editable (ya en 16:9 real).
- Nombra claro y sin acentos/espacios raros: `Mastermind-Medellin-DiaN-Tema.pptx/.pdf`.
- Para abrir con enlace (no archivo local) y con videos en movimiento: publica el HTML como artifact o Pages (ver [[ponencia-cinematografica]]).
