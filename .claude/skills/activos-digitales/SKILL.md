---
name: activos-digitales
description: Orquesta la creación de los activos digitales de un producto de Alejo Cloud — kit de marca, fanpage de Facebook, cuenta de Instagram y producto en Hotmart — en orden, con checkpoints humanos y un registro de estado que permite retomar o automatizar después. Úsala cuando Alejo diga "créale las redes", "monta los activos", "crea la fanpage / el IG / el producto en Hotmart" o al pasar un producto de validación a preventa.
---

# Activos digitales · Alejo Cloud

Un producto (`productos/<slug>/`) necesita, antes de vender: **marca → fanpage → Instagram → producto en Hotmart**.
Esta skill los encadena. Cada paso es una skill propia; esta solo decide el orden, lleva el estado y no se salta checkpoints.

## Fuente única de verdad
Marca paraguas (página/IG compartidos por varios productos): `marcas/<slug>/marca.json`.
`productos/<slug>/marca/marca.json` — nombre, textos, colores, handles, ficha de Hotmart **y el estado de cada activo**
(`activos.facebook`, `activos.instagram`, `activos.hotmart`). Las skills leen de ahí y escriben ahí lo que crean
(URL, id, enlace de checkout). Así cualquier corrida, manual o automática, sabe dónde quedó.

Estados: `pendiente` → `preparado` (textos e imágenes listos) → `creado` (existe) → `configurado` (completo y verificado).

## Orden
| # | Skill | Qué deja | Quién hace qué |
|---|---|---|---|
| 1 | `kit-marca` | `marca.json`, `marca.md`, imágenes en `marca/` | Claude prepara; **Alejo aprueba nombre y handle** |
| 2 | `crear-fanpage-facebook` | Página creada y configurada | Claude en el Chrome de Alejo; **Alejo confirma "Crear"** |
| 3 | `crear-cuenta-instagram` | Cuenta profesional ligada a la Página | **Alejo crea la cuenta**; Claude configura con su OK |
| 4 | `crear-producto-hotmart` | Producto + enlace de checkout | Claude llena la ficha; **Alejo confirma guardar/enviar a revisión** |
| 2b | (pauta) | Página asignada al BM de pauta con permiso Anuncios | Claude; **Alejo confirma identidad** |
| 2c | `calentar-pagina` | Contenido programado en la página/IG | Claude prepara; **Alejo aprueba antes de programar** |
| 5 | (cierre) | Enlace de checkout en la landing, `PENDIENTES.md` al día | Claude |

Si un paso ya está en `creado`/`configurado`, se salta. Si falla, se detiene, se anota en `marca.json` (`activos.<x>.nota`) y se reporta.

## Reglas que no se negocian
- **Solo cuentas personales de Alejo.** Antes de tocar Meta o Hotmart, mirar con qué cuenta está la sesión y qué
  portafolio comercial se usa. Si aparece algo de la empresa (Emprendimiento Consciente, MC, HIT, o cualquier BM que no sea
  el personal) → **detenerse y preguntar**. Ver `CLAUDE.md`.
- **Claude no crea cuentas ni escribe contraseñas.** Crear la cuenta de Instagram, iniciar sesión, verificar teléfono/email,
  datos bancarios y fiscales de Hotmart: los hace Alejo.
- **Todo lo público o irreversible pide un sí explícito en el chat**, por acción: crear la Página, publicar, cambiar a cuenta
  profesional, enviar el producto a revisión. Un sí no vale para el siguiente paso.
- Navegador: **Chrome de Alejo** (Claude in Chrome), porque usa sus sesiones. Si no conecta, pedir que abra el panel de Claude en Chrome.
- Nada de texto con claims de ingresos ni testimonios inventados (pasa por `guardian-etico` si hay duda).

## Automatización (hacia dónde va esto)
Hasta donde se sabe hoy (verificar en cada corrida y anotar aquí si cambia):
- Meta **no** ofrece API pública para crear Páginas ni cuentas de Instagram; sí para editar datos de una Página existente
  y publicar contenido (Graph API, con token de la Página).
- Hotmart **no** ofrece API para crear productos; su API cubre ventas, suscripciones, área de miembros y webhooks.
- Por eso la automatización realista es **navegador guiado por estas skills + checkpoints humanos**, con `marca.json` como
  entrada. Cuando un paso se repita igual 2-3 veces, convertir sus clics en un script (como `investigar-redes/scripts/`).

## Bitácora de corridas
Después de cada corrida real, anotar aquí: fecha, producto, qué pantalla cambió, qué falló, cuánto tardó.

| Fecha | Producto | Paso | Aprendizaje |
|---|---|---|---|
| 2026-10-19 | cuanto-cobro | kit-marca (handles) | Instagram con sesión muestra "Esta página no está disponible" para handles libres; sin sesión de Facebook, facebook.com/<handle> muestra login y "contenido no disponible" para todo, así que no sirve para verificar. Comprobar en Chrome qué cuenta de IG está activa antes de cualquier acción. |
| 2026-10-19 | cuanto-cobro | fanpage (reutilizar) | Alejo tiene ~20 portafolios en Business Suite (muchos de clientes y de la empresa). El dueño de una página se ve en business.facebook.com/latest/settings/pages?business_id=<id> → clic en la página → pestaña Socios. La lista de portafolios está en business.facebook.com/select. El enlace business.facebook.com/latest/home?asset_id=<id de perfil> no sirve: usar el id que muestra Business Suite. Handles ocupados en el nicho: cocinaquevende, reposteriarentable. |
| 2026-10-19 | cuanto-cobro | fanpage (limpieza) | Business Suite → Contenido solo ofrece editar/eliminar/caducar (rango 'Total' para ver lo viejo). Para ocultar sin borrar: actuar como la página (botón 'Empezar'/cambiar perfil) → '…' de cada publicación → 'Mover al archivo'. El 2.º archivado lo bloqueó el clasificador de permisos de la sesión: pedir a Alejo que lo haga o que autorice explícitamente. Socios de un BM y sus activos: business.facebook.com/latest/settings/partners?business_id=<id>. |
| 2026-10-19 | receta-rentable | asignar página a BM de pauta | Ruta: BM dueño → Socios → BM de pauta → Asignar activos → Facebook Pages → marcar página → permiso 'Anuncios' (Meta activa 'Estadísticas' solo). Al confirmar, Meta pide **verificación de identidad** (huella/cara/llave de acceso): checkpoint humano obligatorio, Alejo lo hace en su equipo. Marcas paraguas viven en `marcas/<slug>/marca.json`; el generador de imágenes las lee. |
| 2026-10-19 | receta-rentable | renombre + pauta | Renombre: facebook.com/settings/?tab=profile (actuando como la página) → Nombre → Editar → Revisar cambio → **pide contraseña de Facebook** (la pone Alejo) → revisión hasta 3 días, bloqueo de 60 días. Estructura de Alejo: BM dueño de la página (Traffiker Respaldo) + socio BM de pauta (BM 2 Fokuz Anunciante, cuenta CP Fokuz 1 = 381913140730176). La cuenta publicitaria usa la página si el BM de pauta tiene el permiso Anuncios; no hace falta 'Activos conectados'. |
