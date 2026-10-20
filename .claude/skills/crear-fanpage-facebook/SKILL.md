---
name: crear-fanpage-facebook
description: Crea y configura la fanpage de Facebook de un producto de Alejo Cloud desde el Chrome de Alejo, usando productos/<slug>/marca/marca.json — nombre, categoría, bio, foto, portada, usuario, sitio web y botón — y deja la URL e id en marca.json. Solo con el perfil y portafolio PERSONAL de Alejo. Paso 2 de activos-digitales.
---

# Crear fanpage de Facebook

> **Estado del método: sin validar.** La primera corrida debe confirmar cada pantalla y actualizar esta skill
> (botones, URLs, qué pide Facebook). Facebook cambia la interfaz seguido: guiarse por el texto de los botones, no por coordenadas.

## Requisitos
- `marca.json` con `activos.facebook.estado = "preparado"` (si no, correr `kit-marca`).
- Claude in Chrome conectado, con Alejo logueado en Facebook con **su perfil personal**.

## Pasos
1. **Comprobar identidad (obligatorio).** Abrir `https://www.facebook.com/me` y leer el nombre del perfil.
   Abrir `https://business.facebook.com/latest/settings` solo para ver qué portafolios existen.
   Mostrar a Alejo: "Voy a crear la Página como <perfil>, en el portafolio <X / ninguno>". Si aparece un portafolio de la
   empresa como seleccionado → no seguir. **Esperar su OK.**
2. **¿Ya existe o se reutiliza una "caliente"?** Listar `https://www.facebook.com/pages/?category=your_pages`.
   - Si la del producto existe, saltar a 5.
   - **Reutilizar una página vieja de Alejo** (recomendado para evitar bloqueos de anuncios): elegir la de tema más cercano.
     Antes de editarla comprobar: (a) que sea personal y **no esté asignada a un portafolio de la empresa**
     (Meta Business Suite → Configuración → Páginas); (b) que no tenga contenido de la empresa o de clientes publicado
     (si lo tiene, Alejo decide si se archiva); (c) estado de la cuenta sin restricciones. Luego ir a 5 y, en vez de crear,
     **renombrar** (Configuración → Información de la página). Meta revisa los cambios de nombre: un nombre relacionado con el
     anterior se aprueba más fácil; anotar el resultado en la bitácora.
   - Nunca usar páginas de la empresa ni de clientes aunque estén en la lista.
3. **Formulario**: `https://www.facebook.com/pages/creation/` → nombre (`facebook.nombre_pagina`), categoría
   (`facebook.categoria`, elegir una sugerida que exista), bio (`facebook.bio`).
4. **Checkpoint**: resumir lo que se va a crear y pedir **sí explícito**. Solo entonces pulsar "Crear página".
5. **Configurar** (cada subida o guardado es parte del mismo encargo aprobado; si algo nuevo aparece —pagos, anuncios,
   invitar amigos— **no** aceptarlo):
   - Foto de perfil `marca/perfil.png` y portada `marca/portada-facebook.png` (herramienta `file_upload`).
   - Sitio web: `facebook.sitio_web`. Email de contacto si Alejo lo da.
   - Usuario (@): `handles.elegido`.
   - Botón de acción: "Más información" → sitio web (o "Enviar mensaje de WhatsApp" si Alejo lo pide).
   - Saltar "invitar amigos" y cualquier promoción pagada.
6. **Registrar** en `marca.json`: `activos.facebook = { estado: "configurado", url, id, fecha }` (el id sale de
   "Información de la página" / transparencia). Commit del `marca.json`.
7. **Bitácora**: anotar en `activos-digitales/SKILL.md` lo que cambió respecto a estos pasos.

## No hacer
Publicar posts, invitar contactos, crear anuncios, conectar métodos de pago, aceptar términos nuevos sin preguntar.

## Optimización del perfil (probado 2026-10-20 con Receta Rentable)
Actuando como la página:
- **Nombre**: facebook.com/settings/?tab=profile → Nombre → Editar → Revisar cambio → contraseña (Alejo). Puede aprobarse al instante.
- **Usuario**: misma pantalla → Nombre de usuario → escribir → "disponible" → Guardar cambios.
- **Foto**: clic en la foto → "Elegir foto del perfil" → campo de archivo del diálogo → Guardar.
- **Portada**: "Editar foto de portada" → "Subir foto" → campo de archivo junto a ese botón → Guardar cambios.
- **Presentación** (máx. 255): Información → Detalles → lápiz de Presentación → Guardar.
- **Categoría** (hasta 3): Información → Categoría → lápiz → quitar la vieja → escribir y elegir de la lista → Guardar.
- **Contacto** (email, WhatsApp, sitio web): necesita los datos de Alejo y la landing publicada.
