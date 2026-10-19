---
name: ghl-workflows-referencia
description: Usar cuando haga falta saber qué ofrece oficialmente GoHighLevel (GHL / HighLevel) en su constructor de workflows y automatizaciones — qué disparadores (triggers) o acciones existen, qué campos, filtros u operadores tienen, sintaxis de campos {{contact.…}}, pipelines y oportunidades, citas, pagos, membresías, ajustes como re-entry o stop on response, acciones premium, límites o cómo probar un workflow. La usan ghl-workflow-planificar y ghl-workflow-construir.
user-invocable: true
---

# ghl-workflows-referencia

Documentación oficial de GHL para automatizaciones, resumida y con la URL oficial de cada ficha. **Abre solo el archivo que necesites.**

| Archivo | Contenido |
|---|---|
| `disparadores.md` | Todos los triggers por categoría (contacto, eventos, citas, oportunidades, pagos, cursos/membresías, comunidades, afiliados, redes, IVR…) con sus filtros |
| `acciones-contacto-comunicacion.md` | Acciones de contacto (tags, campos, asignación, notas, tareas, DND, copiar contacto, añadir o quitar de workflow) y de comunicación (email, SMS, WhatsApp, Messenger/IG, llamadas, voicemail, notificaciones internas, reseñas) |
| `acciones-logica-datos-ia.md` | If/Else, Wait, Goal Event, Go To, Split, Drip, formateadores, Math, Custom Values, Custom Code, webhooks, Google Sheets, acciones de IA y la **sintaxis de campos de combinación** |
| `acciones-negocio.md` | Oportunidades y pipelines, citas y calendarios, facturas y pagos, documentos, membresías y cursos, comunidades, afiliados, audiencias y conversiones de anuncios, IVR, conceptos básicos de contactos (campos, custom fields, DND) |
| `constructor-ajustes-pruebas.md` | Constructor (Advanced Canvas), pestaña Settings, borrador vs publicar, versiones, Test workflow, Enrollment history, Execution logs, IA del constructor, plantillas, compartir o copiar workflows, snapshots, premium, límites y buenas prácticas |

## Cómo usarla

- Busca con `grep` el nombre de la acción o trigger (en inglés, como sale en GHL) dentro del archivo.
- Lo marcado **"(no confirmado en doc oficial)"** no está verificado: no lo metas en una especificación sin avisar.
- Si la interfaz real contradice la referencia, **manda la interfaz**: GHL cambia a menudo. Anótalo en el informe para actualizar el archivo.
- La API pública de GHL **no** crea ni edita workflows (solo lista y mete o saca contactos). El constructor se maneja por la interfaz: ver `ghl-workflow-construir`.

## Actualizar

Las fichas se generaron desde help.gohighlevel.com en septiembre de 2026. Para refrescar un archivo, vuelve a leer las URLs de su sección "Fuentes" y el changelog (ideas.gohighlevel.com/changelog).
