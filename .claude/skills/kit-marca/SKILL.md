---
name: kit-marca
description: Prepara el kit de marca de un producto de Alejo Cloud para redes y Hotmart — nombre, handle disponible, bio de Instagram, textos de la fanpage, ficha de Hotmart, colores, foto de perfil y portada — en productos/<slug>/marca/. Primer paso de activos-digitales. Úsala cuando haya que "crear la marca", "sacar el handle", "hacer la foto de perfil o portada" o antes de abrir redes.
---

# Kit de marca

Deja todo lo que las otras skills van a pegar o subir, para que crear la Página, el IG y el producto sea solo copiar.

## Entradas
- `productos/<slug>/public/index.html` (promesa, precio, garantía).
- El modelo de negocio del producto si existe (`conocimiento/_COMPARTIDO/investigaciones/...`).

## Pasos
1. **Copiar la plantilla**: `cp plantillas/marca.json productos/<slug>/marca/marca.json` (crear la carpeta) y llenarla.
2. **Textos** (respetar límites; contar caracteres con `node -e` o `wc -m`):
   | Campo | Límite | Regla |
   |---|---|---|
   | `instagram.bio` | 150 | Qué hace + para quién + llamada a la acción. Sin claims de ingresos. |
   | `instagram.nombre` | 64 | Marca + palabra que se busca ("¿Cuánto Cobro? · Costos de repostería"). |
   | `facebook.bio` | 255 | Versión un poco más larga de la bio. |
   | `facebook.categoria` | — | Una categoría que exista en Facebook (p. ej. "Aplicación", "Software", "Sitio web de educación"). |
   | `hotmart.nombre` | ~60 | Nombre comercial del producto. |
   | `hotmart.descripcion` | — | Qué recibe, cómo se entrega, garantía. Honesta. |
3. **Handle**: 3-5 candidatos cortos, sin puntos raros. Verificar disponibilidad en el navegador (solo lectura):
   abrir `https://www.instagram.com/<handle>/` y `https://www.facebook.com/<handle>` — "Esta página no está disponible"
   = probablemente libre (confirmación final la da Instagram al crearla). Guardar en `handles.disponibles`.
4. **Logo** (marca real, no iniciales): diseñar 2 conceptos con un **símbolo que cuente la idea** (p. ej. Receta Rentable:
   pastel cuyas capas suben como gráfica; etiqueta de precio con batidor) + nombre en Avenir Next Bold en dos colores.
   Cada marca tiene su `marcas/<slug>/logo/generar.mjs` → `*-simbolo.svg`, `*-perfil.png`, `*-horizontal.svg/png`.
   Las letras sueltas (monograma) quedaron feas en la primera prueba: no usarlas como logo principal.
   Al elegir, registrar `logo` en `marca.json` (`simbolo`, `horizontal`, `perfil`): los generadores de perfil, portada
   y piezas lo usan solos. Títulos de las piezas en la misma fuente del logo (Avenir Next Bold).
5. **Imágenes**: `node scripts/activos/generar-imagenes.mjs <slug>` → `marca/perfil.png` (1080×1080, legible en círculo)
   y `marca/portada-facebook.png` (1640×624, texto dentro del área segura central). Revisar a ojo con Read.
6. **Resumen**: `marca/marca.md` con todo legible para Alejo (nombre, handle, bios, imágenes) y marcar
   `activos.*.estado = "preparado"`.
7. **Checkpoint**: mostrar a Alejo nombre, handle, bio e imágenes. **No se sigue sin su OK** al nombre y al handle
   (cambiarlos después cuesta seguidores y links).
