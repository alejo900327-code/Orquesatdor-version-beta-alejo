---
name: calentar-pagina
description: Prepara y programa el contenido para "calentar" una fanpage o cuenta de Instagram de Alejo Cloud (nueva o dormida) antes de pautar — genera piezas con la marca desde un contenido.json, las muestra para aprobación y las programa en Meta Business Suite a un ritmo gradual. Úsala con "calienta la página", "sube contenido a la fanpage", "prepara posts para el IG", o después de reutilizar o renombrar una página.
---

# Calentar una página antes de pautar

Una página dormida que de golpe cambia de nombre, publica mucho y pauta parece sospechosa para Meta.
El calentamiento es **actividad orgánica gradual y coherente con la marca**, antes y durante los primeros anuncios.

## Archivos
- `marcas/<slug>/marca.json` — colores, monograma, handle.
- `marcas/<slug>/contenido/contenido.json` — una entrada por pieza: `id`, `canales`, `tipo` (`frase` | `lista` | `formula`),
  textos de la imagen y `caption`. También `calendario_facebook` (qué pieza y cuándo).
- `node scripts/activos/generar-posts.mjs <slug>` → `contenido/<id>.png` (1080×1350) + `logo-horizontal.png`.
- **Instagram (diseño v2)**: `contenido/contenido-ig.json` + `node scripts/activos/generar-posts-ig.mjs <slug>` → `contenido/ig/`.
  Tipos `frase | lista | formula | carrusel` (slides `portada | paso | cierre`), fondos `crema | frambuesa | choco`,
  `*palabra*` resaltada. La estrategia (carriles A/B) sale de la skill `contenido-viral-que-vende` → `marcas/<slug>/estrategia-organica.md`.

## Pasos
1. **Escribir el contenido** en `contenido.json`: educativo, útil, en la voz de la marca. Sin claims de ingresos, sin
   testimonios inventados; los ejemplos con números dicen que son de referencia. Pregunta al final del caption para
   provocar comentarios (señal de página viva).
2. **Generar y revisar**: correr el script, armar hoja de contacto y mirarla (títulos que se salen, cortes raros).
   Los títulos se achican solos para caber; si quedan pequeños, repartirlos en más líneas en el JSON (3 líneas cortas > 2 largas).
3. **Checkpoint**: enviar a Alejo la hoja de contacto + captions del calendario. Programar **solo con su OK**.
4. **Programar** — usar el compositor de la **página en facebook.com** (no el de Business Suite: su botón abre el selector
   de archivos del sistema, que Claude no maneja). Ruta probada: facebook.com/<usuario> (actuando como la página) → campo
   de archivo junto a "Foto/video" (`file_upload`) → escribir caption → Siguiente → Opciones de programación → fecha
   (calendario) y hora (escribir "12:00" y elegir la opción) → Programar para más tarde → Programar. Cerrar el aviso de
   "etiquetado de productos". Verificar en business.facebook.com/latest/posts/scheduled_posts?asset_id=<id>.
   - Ritmo de calentamiento: **2 por día los primeros 2-3 días**, luego 1 por día. Horarios distintos (mediodía y noche).
   - Una pieza de "bienvenida/cambio de nombre" va **después** de que Meta apruebe el nombre nuevo.
   - Anotar en `contenido.json` el estado de cada publicación (`programada`, fecha, id).
5. **Pauta**: no antes de 5-7 días de actividad. Empezar con presupuesto bajo y un objetivo de interacción o tráfico.

## Instagram: conexión y programación
- Cuenta nueva: Alejo la crea (Agregar cuenta en la app). Claude: foto y bio en /accounts/edit/, nombre en el Centro de
  cuentas, profesional en /accounts/convert_to_professional_account/ (Negocio → categoría → sin contacto).
- Conectar a la Página: facebook.com/settings/?tab=linked_instagram (actuando como la página) → Conectar → mensajes → 
  se abre un OAuth de Instagram "Iniciar sesión como <cuenta>": **permiso OAuth = sí explícito de Alejo**.

## Programar en Instagram (probado 2026-10-20, 28 piezas)
Business Suite → composer `business.facebook.com/latest/composer?asset_id=<id página>&business_id=<id BM>`.
- **Publicar en**: dejar solo la cuenta de IG (se recuerda entre cargas).
- **Subir imágenes**: el botón abre el selector nativo. Antes de pulsarlo, inyectar con `javascript_tool` un parche a
  `HTMLInputElement.prototype.click` que, si el input es `type=file`, lo hace visible con `aria-label="subir-archivo-claude"`
  en vez de abrir el diálogo; luego `find` + `file_upload` (acepta varios archivos = carrusel, hasta 10). Re-inyectar tras cada carga.
- Texto → switch "Establecer fecha y hora" → fecha (triple clic y escribir `dd/mm/aaaa`) → horas y minutos (spinbuttons) → Programar
  → cerrar "Promocionar" con "Tal vez más tarde". ~5 llamadas por pieza.
- Meta exige **≥ 20 min** de margen al programar o reprogramar. No hay "publicar ahora" en la lista: se reprograma.
- Verificar en `.../latest/posts/scheduled_posts?...` bajando la lista (carga de a 10).

## Riesgos que vigilar (página reutilizada)
- **Cambio de nombre**: Meta lo revisa (hasta 3 días) y después lo bloquea 60 días. Pide la contraseña de Facebook: la escribe Alejo.
- **Contenido viejo de otro tema**: archivarlo (no borrarlo) antes de pautar. Desde la página como perfil activo: "…" → "Mover al archivo".
- **Publicaciones "Publicado por Instagram"**: indican un IG vinculado; revisar cuál antes de conectar el IG nuevo.
- **Cuenta publicitaria compartida con clientes** (p. ej. CP Fokuz 1 también pauta para Muso): funciona, pero mezcla
  historial y facturación. Ideal a futuro: una cuenta publicitaria propia para los productos de Alejo Cloud.

## Bitácora
| Fecha | Marca | Qué pasó |
|---|---|---|
| 2026-10-19 | receta-rentable | 10 piezas generadas; calendario FB: 2 hoy + 2 mañana; bienvenida tras aprobación del nombre. |
| 2026-10-20 | receta-rentable | Era casi medianoche: el calendario se corrió un día (20 y 21 oct, 12:00 y 19:00). 4 programadas y verificadas. Cuidado: el primer campo de archivo que aparece cerca de la portada puede abrir "Crear reel"; si pasa, salir sin publicar. |
| 2026-10-20 | receta-rentable | IG: perfil completo, conectado a la página, 28 piezas (12 carruseles) programadas del 20 al 26-oct; 1.ª publicada 01:15. |
