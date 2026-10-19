# Workflows de HighLevel: constructor, ajustes, publicación, pruebas e IA (referencia oficial)

> **Cómo usar este archivo:** consúltalo antes de construir o modificar un workflow en la UI de HighLevel para saber qué pantalla, botón o ajuste usar, qué pasa con los contactos al editar o publicar, y qué límites y costes aplican. Cada dato cita su URL oficial. Lo que no aparece en la documentación oficial va marcado **(no confirmado en doc oficial)**. Los nombres de la UI se mantienen en inglés, tal como aparecen en pantalla. Investigado el 23-sep-2026.

## Índice

1. [Mapa rápido de la UI (observado, sep 2026)](#1-mapa-rápido-de-la-ui-observado-sep-2026)
2. [Crear un workflow: menú "Create Workflow"](#2-crear-un-workflow-menú-create-workflow)
3. [Constructor: Standard frente a Advanced Builder](#3-constructor-standard-frente-a-advanced-builder)
4. [Triggers, acciones y ramas en el lienzo](#4-triggers-acciones-y-ramas-en-el-lienzo)
5. [Productividad: copiar y pegar, atajos, notas, Find & Replace, undo](#5-productividad-copiar-y-pegar-atajos-notas-find--replace-undo)
6. [Pestaña Settings del workflow](#6-pestaña-settings-del-workflow)
7. [Global Workflow Settings (sub-cuenta) y Workflow Settings (agencia)](#7-global-workflow-settings-sub-cuenta-y-workflow-settings-agencia)
8. [Guardado, Draft/Publish, versiones, borrar y restaurar](#8-guardado-draftpublish-versiones-borrar-y-restaurar)
9. [Qué pasa con los contactos cuando editas](#9-qué-pasa-con-los-contactos-cuando-editas)
10. [Pruebas, Execution Logs, Enrollment History, errores](#10-pruebas-execution-logs-enrollment-history-errores)
11. [IA: Workflow AI Builder y Workflow AI Assistant](#11-ia-workflow-ai-builder-y-workflow-ai-assistant)
12. [Plantillas, recetas, campañas, copiar y snapshots](#12-plantillas-recetas-campañas-copiar-y-snapshots)
13. [Organización: carpetas y nombres](#13-organización-carpetas-y-nombres)
14. [Premium, facturación y límites](#14-premium-facturación-y-límites)
15. [Bucles, condiciones de carrera y limitaciones conocidas](#15-bucles-condiciones-de-carrera-y-limitaciones-conocidas)
16. [Buenas prácticas oficiales (checklist)](#16-buenas-prácticas-oficiales-checklist)
17. [Fuentes](#fuentes)

---

## 1. Mapa rápido de la UI (observado, sep 2026)

Esto es lo que se vio en vivo en una cuenta real. Sirve para orientarse. Los detalles que confirma la doc oficial se citan en las secciones siguientes.

| Zona | Elementos |
|---|---|
| Pestañas superiores | **Builder** · **Settings** · **Enrollment history** · **Execution logs** |
| Arriba a la derecha | **Test workflow** · toggle **Draft/Publish** · **Save** · botón **Add** |
| Arriba a la izquierda | Toggle Standard/Advanced (según permisos) · icono de teclado (atajos) · Stats view |
| Barra lateral izquierda (mini-toolbar) | Añadir sticky note, Workflow Switcher, etc. |
| Lienzo | Horizontal; conectores con **"+"** entre nodos; nodos arrastrables |
| Panel derecho | Configuración de la acción o el trigger seleccionado (se puede redimensionar o ampliar a pantalla completa) |
| Abajo | Zoom, **Fit to Screen**, auto-layout (**Tidy Up**), minimapa; undo/redo |
| IA | "Build using AI" / chat **"What do you want to automate?"** con modos **Build** y **Chat**, y **Point & Edit** |

Doc oficial del recorrido del constructor (botones Save con punto rojo, Test Workflow, History, Draft/Publish, Fit to Screen/Zoom, minimapa, Workflow Switcher con `Shift+W`, Stats View, "Add New Trigger", "+", asa de 6 puntos para mover nodos): https://help.gohighlevel.com/support/solutions/articles/155000001254-workflow-builder-walkthrough
Paneles redimensionables y "expandir a pantalla completa": https://help.gohighlevel.com/support/solutions/articles/155000008326-workflow-builder-resize-and-expand-sidebars

---

## 2. Crear un workflow: menú "Create Workflow"

Ruta: **Automation › Workflows › + Create Workflow**.

| Opción (UI) | Qué hace | Fuente |
|---|---|---|
| **Start from Scratch** | Lienzo vacío. En el constructor aparece la caja de prompt de IA para quien quiera usarla | 155000002288 |
| **Build Using AI** | Genera el workflow desde lenguaje natural (ver §11) | 155000006100 |
| **Select from Template** | Biblioteca de plantillas o recetas (ver §12) | 155000002445 |
| **Import from a Campaign** | Convierte una Campaign (función obsoleta) en workflow y luego le añades los triggers | 48001229927 |
| **Company based workflow** | Workflow cuyo objeto es la **Company**, no el Contact (triggers Company Created y Company Changed) | 155000006688 |

La página de inicio de Workflows incluye además sugerencias rápidas bajo la caja de IA ("Lead Nurturing", "Form Automation", "Email Campaigns"), el enlace **"View All Templates"** y la sección "Learn About Workflows": https://help.gohighlevel.com/support/solutions/articles/155000004871-workflows-landing-page

**Company-based Workflow** (https://help.gohighlevel.com/support/solutions/articles/155000006688-company-based-workflows-company-triggers-actions):
- Triggers: **Company Created** (filtros: owner, tags, campos) y **Company Changed**.
- Acciones: Create/Update/Clear Fields de la Company o de un Associated Contact. Desde un workflow de contacto también existen Create/Update/Clear Associated Company.
- Aviso oficial: evita las actualizaciones bidireccionales entre workflows de company y de contacto si no pones salvaguardas (tags o flags booleanos), porque generan bucles.

---

## 3. Constructor: Standard frente a Advanced Builder

Fuente principal: https://help.gohighlevel.com/support/solutions/articles/155000006635-advanced-builder-for-workflows

- **Advanced Builder** (lo que en vivo se ve como "Advanced Canvas") es un lienzo visual libre. Admite varios caminos de trigger, ramas paralelas y lógica compleja en una sola vista. **No cambia cómo se ejecuta el workflow.**
- **Cambiar de vista:** abre el workflow y usa el toggle a Advanced Builder, arriba a la izquierda. Se puede alternar Standard ↔ Advanced en el mismo workflow.
- **Para volver a Standard** hay que quitar antes las funciones exclusivas de Advanced: Trigger Go-To, nodos desenlazados y nodos desactivados.
- **Funciones exclusivas de Advanced:** Trigger Go-To, delinked nodes, disabled nodes (ver la contradicción en §4), sticky notes con color, atajos de teclado y auto-layout (**Tidy Up**).
- **Mejoras de UI/UX** (según el changelog): Stats Mode más limpio, sticky notes con imágenes, **Workflow Comments** en línea por acción, menú **Quick Actions** con clic derecho y herramientas de selección múltiple (Enable/Disable, Format Selection, Add Sticky Note). https://ideas.gohighlevel.com/changelog/advanced-builder-a-new-era-for-workflow-design
- **Builder por defecto:**
  - Sub-cuenta: **Automation › Global Workflow Settings**. Agencia: **Agency Settings › Workflow Settings** (Standard o Advanced, con un toggle para aplicarlo a todas las sub-cuentas propias; las sub-cuentas nuevas lo heredan).
  - El valor por defecto **solo afecta a workflows nuevos**. Los existentes conservan la última vista guardada.
  - Se puede limitar qué roles ven el switch de vista (p. ej. Sub-account admins, Sub-account users). Los agency users lo tienen activado por defecto.
  - No hay API pública para configurarlo.
  - https://help.gohighlevel.com/support/solutions/articles/155000007323-standard-vs-advanced-how-to-set-default-workflow-builder · https://ideas.gohighlevel.com/changelog/agency-workflow-settings-default-builder-for-workflows
- **Stats Mode / Stats View:** por trigger muestra Attempted/Matched/Unmatched de los **últimos 30 días**; por acción de comunicación muestra entrega y engagement, con clic al informe por contacto. **No se puede editar mientras Stats View está activo.** https://help.gohighlevel.com/support/solutions/articles/155000006809-trigger-statistics-for-workflows
- **Workflow Switcher** (`Shift+W`): salta a otro workflow sin salir del constructor (en pestañas nuevas).

---

## 4. Triggers, acciones y ramas en el lienzo

- **Añadir un trigger:** botón **"Add New Trigger"**. Tiene búsqueda y filtro por categoría. Después se añaden los **filtros** del trigger, que son opcionales. (155000001254, 155000002288)
- **Varios triggers:** un workflow admite varios, y **cualquiera** de ellos inscribe al contacto (155000002445).
- **Añadir una acción:** el **"+"** de cada conector abre el panel de acciones (búsqueda y categorías). En el Advanced Builder también sirven `Tab` (panel de acción), `Shift+Tab` (panel de trigger) y arrastrar triggers o acciones desde la barra lateral al lienzo (155000006694, 155000004871).
- **Ramas:** las crean las acciones de ramificación (If/Else, Split, Wait con varios resultados, WhatsApp, etc.). En If/Else la rama "None" se crea sola.
- **Trigger Go-To** (solo Advanced): conecta un trigger concreto con una acción concreta mediante un **conector discontinuo**. Cuando ese trigger se dispara, el contacto salta a esa acción.
- **Delinked Nodes (ramas independientes)** (solo Advanced): grupos de acciones sin conectar a la cadena principal. **No se ejecutan solos.** Para activarlos hay que arrastrar un conector Go-To discontinuo desde un trigger (u otro nodo) hasta la primera acción del grupo. Si quitas el Go-To, la rama queda inactiva. https://help.gohighlevel.com/support/solutions/articles/155000006700-delinked-nodes-independent-branches-advanced-builder-workflow
- **Default Path:** define por qué rama entra el contacto en las pruebas o cuando lo inscribe otro workflow. Conector sólido = camino por defecto; conector discontinuo = solo Go-To.
- **Un contacto no recorre varias ramas del mismo workflow a la vez**, aunque el diseño sea paralelo (155000006635).
- **Las acciones sin configurar no se ejecutan** (155000006635).
- **Disabled nodes (pausar acciones):** pasa el ratón por el nodo y pulsa **pause** para desactivarlo, o **play** para reactivarlo. El nodo queda gris con la etiqueta "Disabled". Se **salta** en la ejecución: el contacto sigue por el camino activo, en los logs aparece "Skipped" y **no consume ejecuciones**. https://help.gohighlevel.com/support/solutions/articles/155000006693-pause-workflow-actions
  - *Contradicción en la doc:* 155000006693 dice que funciona en Standard y en Advanced y que no admite cambios masivos. 155000006635 y el changelog de UI/UX lo presentan como función de Advanced con Enable/Disable masivo. Compruébalo en la cuenta.
- **Mover nodos:** asa de 6 puntos al pasar el ratón. En Advanced se pueden seleccionar varios y moverlos juntos.
- **Bucles visuales:** el constructor no deja que una flecha vuelva a un paso anterior. Los bucles no visibles (entre workflows, o con Go To) sí son posibles (ver §15).

---

## 5. Productividad: copiar y pegar, atajos, notas, Find & Replace, undo

### 5.1 Copiar acciones entre workflows
https://help.gohighlevel.com/support/solutions/articles/155000006081-copy-workflow-actions-across-workflows
- Menú ⋮ de la acción › **Copy Action** (un paso) o **Copy All Actions From Here** (el bloque desde ese paso).
- En el destino: **Quick Paste** (junto al "+") o ⋮ › **Paste Below**. Funciona entre pestañas.
- **El portapapeles dura 15 minutos**. Solo funciona **dentro de la misma sub-cuenta**. **No copia triggers.**
- Las referencias a assets se mantienen si existen en la misma sub-cuenta, pero conviene revisarlas. Guarda después de pegar.
- En Advanced también funcionan `Ctrl/⌘+C` y `Ctrl/⌘+V`, y se pueden copiar ramas enteras entre workflows (155000006635).

### 5.2 Atajos de teclado (Advanced Builder)
https://help.gohighlevel.com/support/solutions/articles/155000006694-keyboard-shortcuts-in-workflow-builder. Se abren con **K** o con el icono de teclado (arriba a la izquierda). Pestañas del panel de atajos: Edit, View, Navigation, Tools (otro texto oficial cita también "Essential").

| Acción | Windows | Mac |
|---|---|---|
| Cortar / copiar / pegar nodos | Ctrl+X / C / V | ⌘+X / C / V |
| Copiar o cortar desde el nodo en adelante | Ctrl+Shift+C / X | ⌘+Shift+C / X |
| Zoom in / out / 100% / fit | + / − / 0 / 1 | igual |
| Navegar nodos (siguiente, anterior, hermanos) | → ← ↑ ↓ | igual |
| Seleccionar aguas arriba / abajo | Shift+← / Shift+→ | igual |
| Guardar | Ctrl+S | ⌘+S |
| Seleccionar todo | Ctrl+A | ⌘+A |
| Borrar selección | Delete/Backspace | igual |
| Borrar desde el nodo en adelante | Ctrl+Delete | ⌘+Delete |
| Panel de acción / panel de trigger | Tab / Shift+Tab | igual |
| Undo / Redo | Ctrl+Z / Ctrl+Y | ⌘+Z / ⌘+Y o ⌘+Shift+Z |
| Find & Replace | Alt+F | Option+F |
| Workflow Switcher | Shift+W | Shift+W |

### 5.3 Sticky notes y comentarios
- Sticky notes con color, texto, enlaces e imágenes, que se añaden desde la barra lateral izquierda (solo Advanced). **Workflow Comments** en línea por acción. (155000006635, changelog Advanced Builder)

### 5.4 Find & Replace
https://help.gohighlevel.com/support/solutions/articles/155000007729-workflow-builder-find-replace-option
- Modos **Custom Values**, **Tags** y **Text**. No distingue mayúsculas y acepta coincidencias parciales.
- **Solo se pueden reemplazar custom values y tags.** Los nombres de pasos y de triggers solo se buscan, no se reemplazan.
- Actúa **solo en el workflow abierto**. Funciona en Standard y en Advanced.

### 5.5 Undo/Redo y Recent Changes
https://help.gohighlevel.com/support/solutions/articles/155000006655-workflows-undo-redo-change-history
- Hay botones en la barra y atajos (§5.2). El menú **Recent Changes** permite saltar a un punto concreto del historial.
- El historial solo existe en **tu sesión actual**: se borra al salir o al refrescar, y **no incluye las ediciones de otros usuarios**. Al restaurar una versión, el historial vuelve a empezar. Para deshacer cambios a nivel de equipo, usa Version History (§8).

---

## 6. Pestaña Settings del workflow

Fuente: https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview

| Ajuste (UI) | Opciones | Comportamiento y trampas |
|---|---|---|
| **Allow Re-entry** | On/Off | Apagado: cada contacto entra **una sola vez**. **Excepción:** con triggers de **cita (appointment) o factura (invoice)** el contacto **siempre** puede entrar varias veces. |
| **Allow multiple Opportunities** | On/Off | Una instancia independiente por oportunidad. **Activo por defecto en workflows nuevos** y desactivado en los antiguos. Actualizar una oportunidad **no reinicia** su instancia activa. |
| **Stop on Response** | On/Off | Saca al contacto cuando responde. Las acciones Call traen detección de buzón de voz. Con "Disable Voicemail Detect", el buzón cuenta como respuesta. Solo cuenta la respuesta del contacto, no la del equipo. |
| **Timezone** | Account Timezone / Contact Timezone | Si el contacto no tiene zona horaria, usa la de la cuenta. Se aplica a **todo el workflow**, no paso a paso. |
| **Time Window** | Toggle "Specific Time": Start Time, End Time, Include Days | **La misma franja para todos los días** (no se puede variar por día). **Solo afecta a acciones de comunicación** (SMS, email, llamadas): lo que cae fuera espera al siguiente hueco. Tags, campos y oportunidades se ejecutan a cualquier hora. |
| **Sender Details** | From Name, From Email, From Number | Valores por defecto que cada acción de email puede sobrescribir. El email debe ser válido y pertenecer a un dominio de envío configurado. |
| **Conversations – Mark as Read** | Toggle | Por defecto, los mensajes automáticos dejan la conversación como **unread**. Con el toggle activo se marcan como leídos. Se aplica a todos los mensajes salientes del workflow. |

- Con Auto Save activo, los cambios en esta pestaña se guardan solos (§8).
- El AI Builder también puede cambiar estos ajustes: re-entry, multiple opportunities, stop on response, timezone, time window, sender details y nombre (§11).
- "Remove contact from workflow on…" como ajuste independiente **no aparece** en la doc oficial de Settings **(no confirmado en doc oficial)**. Para sacar contactos se usan Stop on Response, Goal Event o la acción Remove from Workflow.

---

## 7. Global Workflow Settings (sub-cuenta) y Workflow Settings (agencia)

**Sub-cuenta:** **Automation › Workflows › Global Workflow Settings**, o **Settings › Automation**. Solo acceden agency admins y agency users (155000007323). Contiene:

| Bloque | Qué hace | Fuente |
|---|---|---|
| **Workflow AI** | Toggle del **AI Builder** en la sub-cuenta. Apagado, lo oculta también de la página de inicio | 155000006100, 155000004871 |
| **Auto Save** | Activa el autoguardado | 155000006654 |
| **Pause Workflow** | Pausa workflows publicados en fechas concretas | 155000003850 |
| **OAuth2 / Manage Tokens** | Conexiones OAuth2 para Custom Webhook | 155000003976 |
| **Default builder** + permisos del switch | Standard o Advanced | 155000007323 |
| Banner **Workflow Pro Plans** | Suscribir un plan de ejecuciones premium | 155000003971 |

**Pause Workflows on Certain Dates** (https://help.gohighlevel.com/support/solutions/articles/155000003850-pause-workflows-on-certain-dates):
- Se eligen fecha y hora de inicio y de fin, y los workflows **publicados** afectados (uno, varios o todos). Opción **"Annually"** para repetir cada año.
- Límites: **hasta 15 rangos**, **máximo 15 días** entre inicio y fin, y los rangos no pueden solaparse.
- Durante la pausa **los contactos siguen inscribiéndose**, pero se detienen en el trigger o en la acción siguiente. **Wait e If/Else sí se procesan** antes de detenerse. En la lista, el workflow aparece como **"Paused"**. Se reanuda solo al terminar el rango.

**Agencia:** **Agency Settings › Workflow Settings** (builder por defecto y aplicarlo a las sub-cuentas). **Settings › Labs** controla funciones beta como Workflow AI Builder y, según la doc, Version History (§8). **Settings › Company › Workflow – Premium Features** controla premium (§14).

---

## 8. Guardado, Draft/Publish, versiones, borrar y restaurar

### 8.1 Guardar
- Guardado manual con **Save** (el punto rojo indica cambios sin guardar) o con `Ctrl/⌘+S`. (155000001254)
- **Auto Save** (https://help.gohighlevel.com/support/solutions/articles/155000006654-workflows-auto-save):
  - Guarda en el **borrador**. El workflow publicado no cambia hasta que pulsas Publish.
  - Guarda: añadir o borrar acciones y triggers, la pestaña Settings, el nombre y el cambio de estado.
  - **No guarda** lo que editas dentro del modal o panel de una acción o trigger. Ahí hay que pulsar **Save/Apply**.
  - Se activa en el popup de onboarding o en Global Workflow Settings.
  - Con varios editores a la vez, **gana el último autoguardado**. Coordinaos.
- Se puede **guardar con errores**, pero los errores que bloquean la publicación hay que resolverlos antes de publicar (155000004872).

### 8.2 Draft frente a Publish
- **Draft:** el workflow "no se dispara ni ejecuta acciones de verdad". **Publish:** sí. (155000001254)
- Cuando un workflow publicado pasa a Draft, los contactos que estaban en pasos de espera (Wait, Manual Call) **siguen donde estaban** (según los snippets de la doc de Wait y del walkthrough; ver §9).
- Un workflow restaurado de la papelera o copiado a otra sub-cuenta llega en **Draft**.

### 8.3 Version History & Restore
https://help.gohighlevel.com/support/solutions/articles/155000006656-workflows-version-history-restore
- Se abre con el icono **History** del constructor ("Back to Builder" para volver). Guarda **hasta 10 versiones o 30 días**, con autor, fecha y estado (draft o published), y se puede filtrar por editor. Las versiones se etiquetan v12, v13, etc.
- **Cuándo se crea una versión:** al guardar a mano, al confirmar cambios sin guardar, con **"Save Version"** o al cambiar el estado. **Los autoguardados no crean versión.**
- **Restore:** reabre la versión como **nuevo borrador**; lo publicado no cambia hasta que publicas. **Requisito:** el workflow debe estar en draft y sin contactos en curso. También se puede **crear un workflow nuevo** a partir de una versión.
- La doc dice que está en **Labs (beta)** vía Settings. Puede que ya esté activo en tu cuenta.

### 8.4 Borrar y restaurar
https://help.gohighlevel.com/support/solutions/articles/155000002639-how-to-restore-deleted-workflow
- Pestaña **Deleted** en la lista › **Restore** › escribir el nombre del workflow para confirmar.
- Se puede restaurar **a partir de 30 minutos** después de borrar y **durante 30 días**. Un workflow restaurado **no se puede volver a borrar en 48 h**.
- Vuelve en **Draft**, en la **raíz** (sin carpeta) y **sin sus permisos anteriores**. Conserva triggers, acciones, Enrollment History y Execution Logs. **Los contactos que estaban dentro no se restauran** y los que estaban en esperas se eliminan de esa ejecución.
- Solo pueden hacerlo Location Admins y Agency Admins.

---

## 9. Qué pasa con los contactos cuando editas

| Cambio | Efecto en los contactos que ya están dentro | Fuente |
|---|---|---|
| Editar acciones **posteriores** a donde está el contacto | Usará la versión nueva cuando llegue a ellas | 155000006656, 155000002470 |
| Editar un **Wait** con contactos esperando | **Terminan su espera actual** con la configuración antigua | 155000002470 |
| Pasar a **Draft** | Los contactos en espera se quedan en su paso | 155000002470 (snippet) · 155000001254 |
| **Desactivar** un nodo | Se lo saltan y siguen por el camino activo | 155000006693 |
| Borrar un paso en el que hay contactos | **(no confirmado en doc oficial)**. En Execution Logs existe el estado "Removed by – Snapshot Refresh" cuando un snapshot borra pasos | 155000003992 |
| Restaurar una versión | Exige workflow en draft **sin contactos en curso** | 155000006656 |
| Borrar el workflow y restaurarlo | Los contactos en espera salen y los inscritos no se restauran | 155000002639 |
| Cambiar Re-entry o Settings | Sin doc sobre efecto retroactivo **(no confirmado en doc oficial)** | — |

---

## 10. Pruebas, Execution Logs, Enrollment History, errores

### 10.1 Test Workflow
- Botón **Test Workflow** (arriba a la derecha) › panel **"Run A Test For Contact"** › **SELECT CONTACTS** › **Run Test**. (155000001254, 155000002445)
- **Ejecuta el workflow de verdad** para ese contacto, **incluidas todas las acciones**: envía emails y SMS, pone tags, y las premium consumen ejecución. Usa un contacto interno o de prueba.
- Se verifica en **Execution Logs**: cada acción debe aparecer como **Executed**.
- La doc advierte que **no es 100 % fiable**, sobre todo si reutilizas el mismo contacto. Recomienda probar con un **contacto nuevo** (evitas bloqueos por re-entry) y, cuando se pueda, en vivo ya publicado (155000001254, 155000002288).
- En las pruebas y en las inscripciones desde otro workflow, el contacto entra por el **Default Path** (Advanced) (155000006635).
- **Los Waits no se saltan en la prueba.** Existe la idea "Test workflow without wait steps and day/time settings" (https://ideas.gohighlevel.com/automations/p/test-workflow-without-wait-steps-and-day-time-settings). Para acelerar: desactiva temporalmente los Wait (disabled nodes) o baja su duración **(método no documentado como receta oficial)**.
- **La IA no prueba** el workflow (155000006100). Custom Code exige ejecutar su propio "Test" para que su salida esté disponible en los pasos siguientes.

### 10.2 Execution Logs y Enrollment History
https://help.gohighlevel.com/support/solutions/articles/155000003992-workflows-improved-execution-logs-enrollment-history
- **Execution Logs:** columnas Action Name (al pasar el ratón muestra el tipo), Status, Executed On (con zona horaria) y el enlace **View Details**. El botón **"Go To Action"** lleva al paso en el lienzo.
- **Enrollment History:** cuándo y cómo entró o reentró cada contacto, con su estado.
- **Estados:** `Executed`, `Skipped`, `Failed`, `Waiting`, `Workflow Completed`, `Removed by Workflow Action`, `Removed by External Workflow Action`, `Removed by - Snapshot Refresh`.
- Paginación de 10, 25 o 50 filas. El rango de fechas personalizado tiene un **máximo de 30 días**. La retención total no está documentada.
- Un "Add Tag" que aparece como Executed pero no se aplicó suele ser una condición de carrera (§15).

### 10.3 Errores antes de publicar (Resolve Errors)
https://help.gohighlevel.com/support/solutions/articles/155000004872-highlighting-resolving-errors-in-a-workflow
- Se marcan en el lienzo, con la barra lateral **Resolve Errors**. Cada error tiene **Open step** y **How to fix** (explicación con IA).
- Detecta: campos obligatorios vacíos, selecciones inválidas o ausentes, integraciones no disponibles, If/Else o Wait mal configurados. Ejemplos: calendario sin elegir en un trigger de cita, SMS con el cuerpo vacío.
- Aviso oficial: **no captura todos los problemas posibles**, así que prueba después de publicar.

### 10.4 Errores en producción: "Needs Review"
https://help.gohighlevel.com/support/solutions/articles/155000006813-automations-overview
- Página **Automations Overview**: widget **Error Review Summary** › botón **"Needs Review"**, con la lista de workflows con posibles errores. También muestra el total de workflows, los publicados, las inscripciones, **Workflow Enrollments Over Time** y **Trigger Analysis Filter** (últimos 30 días).
- **Notificaciones de error por email o in-app** automáticas para workflows fallidos: **(no confirmado en doc oficial)**. Existió un changelog "workflow-paused-notifications" (ver §15). Para alertas propias se usan el trigger **Messaging Error – SMS** y la acción **Send Internal Notification**.

---

## 11. IA: Workflow AI Builder y Workflow AI Assistant

### 11.1 Workflow AI Builder ("Build using AI")
https://help.gohighlevel.com/support/solutions/articles/155000006100-workflow-ai-builder · changelog: https://ideas.gohighlevel.com/changelog/ai-builder-in-workflows-now-more-powerful
- **Entradas:** (1) **Automation › Workflows › "Build using AI"**; (2) caja de prompt al empezar desde cero, con **dictado por voz**; (3) chat de IA dentro del constructor ("What do you want to automate?").
- **Modos:** **Build** (genera o modifica el workflow completo) y **Chat** (planifica y hace lluvia de ideas sin tocar el lienzo). Un clic pasa de Chat a Build y envía la petición.
- **Point & Edit:** selecciona una acción, varias, o arrastra para seleccionar un rango, y el cambio se aplica **solo a lo seleccionado**.
- **Qué puede hacer:**
  - Añadir, quitar, reemplazar, mover y modificar triggers y acciones.
  - Crear If/Else y Waits con condiciones, y enlazar datos entre pasos.
  - Cambiar Settings: re-entry, multiple opportunities, stop on response, timezone, time window, sender details y nombre.
  - Hacer **cambios múltiples en una sola petición** ("renombra, añade un wait de 24 h, apaga re-entry") y ediciones masivas acotadas.
  - Mantiene la memoria de la sesión ("mejor que sean 48 h") y conserva el chat al cerrar y reabrir el panel.
- **No puede:** **probar** el workflow ni publicar por ti; hace falta revisión manual. Algunas configuraciones complejas hay que ajustarlas a mano. Es **beta**.
- **Post-Generation To-Do List:** muestra lo pendiente (credenciales, campos obligatorios, selección de cuentas, pipeline, ajustes por paso). Complétala antes de publicar.
- Rendimiento: menos de 30 s de media por generación. Las salidas no mencionan la marca de la plataforma (apto para marca blanca).
- **Activar o desactivar:** Agencia › **Settings › Labs** (Workflow AI Builder). Sub-cuenta › **Automations › Global Workflow Settings › Workflow AI** › toggle "AI Builder". Changelog: "Workflow AI Builder Now Available Across Sub Accounts" (https://ideas.gohighlevel.com/changelog/workflow-ai-builder-now-available-across-sub-accounts).
- **Precio:** la página del Builder no lo indica. Según el artículo del Assistant, Workflow AI **no consume créditos de IA** y tiene un límite de uso justo diario.

### 11.2 Workflow AI Assistant
https://help.gohighlevel.com/support/solutions/articles/155000003970-workflow-ai-assistant
- Se abre con el icono de IA **abajo a la izquierda** del constructor. Disponible para cualquier usuario con acceso a workflows.
- Construye con guía paso a paso, explica workflows, sugiere optimizaciones, configura triggers y acciones, genera contenido (SMS, emails, código) y cambia settings y nombre.
- **"Describe This Workflow"** resume el workflow de principio a fin. **"Export Chat"** exporta solo la conversación actual.
- **Sin créditos de IA.** Tiene **límite de uso justo diario** que se reinicia a las 24 h.
- La IA a nivel de paso ("Learn More Using AI") y Custom Code › "Build with AI" están en 155000005631 y 155000004692.

---

## 12. Plantillas, recetas, campañas, copiar y snapshots

| Mecanismo | Alcance | Detalles | Fuente |
|---|---|---|---|
| **Select from Template / Workflow Recipes** | Dentro de la sub-cuenta | Estructuras listas para personalizar. Plantillas por nicho (Education, Health, Finance, Real Estate) y "View All Templates" | 155000002445 · 155000004871 · carpeta Workflow Recipes |
| **Upload to Template Library** | Sub-cuentas con acceso a la Template Library | Menú ⋮ del workflow › **Upload to Template Library**. Requiere **Agency Admin** con plan **$497 (Pro)**. El agency admin puede mostrar u ocultar la plantilla por sub-cuenta. **Editar el original no actualiza la plantilla publicada** | 155000001304 |
| **Import from a Campaign** | Migrar Campaigns (obsoletas) | Luego añades los triggers. No existen las acciones "Remove From Campaign" ni "Remove From All Campaigns". Las agencias creadas después de nov-2021 no tienen Campaigns | 48001229927 |
| **Copy to Sub-Account** | Otra sub-cuenta | Solo **Agency Admin**. Llega en **draft**. Se llevan tags, custom fields de contacto (mismo tipo), custom values, custom fields de oportunidad, pipelines y etapas, y plantillas de texto de email/SMS (las del email builder, "coming soon"). **El resto de referencias se borran** (formularios, calendarios…). Tiene historial de copias con detalle de errores | 155000001229 |
| **Copiar acciones** | Misma sub-cuenta | §5.1 | 155000006081 |
| **Snapshots** | Cuenta entera → otras sub-cuentas o agencias | Capturan workflows y sus assets (funnels, formularios, calendarios…). *Import* = añadir a la biblioteca de la agencia; *Load* = aplicar a una sub-cuenta. Se comparten por enlace. Asset Viewer para ver el contenido. Un **refresh** de snapshot puede sacar contactos ("Removed by - Snapshot Refresh") | 48000982511 · 48000982513 · 155000005917 · 155000003992 |
| Enlace para compartir **un solo workflow** | — | No existe como función nativa **(no confirmado en doc oficial)**. Se comparte vía snapshot o Template Library | — |
| Export/Import JSON | — | No existe de forma nativa (idea abierta) | ideas.gohighlevel.com |

---

## 13. Organización: carpetas y nombres

https://help.gohighlevel.com/support/solutions/articles/155000001684-workflows-nested-folders
- **Create Folder** en la lista. Las carpetas se pueden anidar: la doc recomienda **2–3 niveles como máximo** (no hay límite técnico).
- Menú ⋮ › **Move To Folder**. **Delete Folder no borra su contenido**: todo sube un nivel.
- Permisos por rol. Las carpetas anidadas suelen heredar los de su carpeta padre (vista o control total).
- **Nombres:** la doc recomienda nombres descriptivos para triggers y acciones (155000006635). El nombre del workflow se edita en el constructor y lo guarda Auto Save. Las convenciones de nombre (prefijos, etc.) no están documentadas: son práctica interna **(no confirmado en doc oficial)**.
- Changelog de rendimiento: carga del constructor hasta 4 veces más rápida (https://ideas.gohighlevel.com/changelog/workflow-builder-significant-load-time-improvements).

---

## 14. Premium, facturación y límites

### 14.1 Premium Features
https://help.gohighlevel.com/support/solutions/articles/155000005678-how-to-enable-and-rebill-premium-features-for-workflows
- **Trigger premium:** Inbound Webhook.
- **Acciones premium (lista oficial de esta página):** Google Sheets, Slack, Custom Webhook, Workflow AI actions. Otros artículos oficiales marcan también como premium Custom Code, Array Functions y Date/Time Formatter. Text y Number Formatter: **(no confirmado en doc oficial)** como premium.
- **Activar:** Agencia › **Settings › Company › Workflow – Premium Features**. Las sub-cuentas nuevas se inscriben solas.
- **100 ejecuciones gratis por sub-cuenta** (de por vida). Después, **$0.01 por ejecución** a cargo de la wallet de la agencia.
- **Rebilling:** sub-cuenta en SaaS Mode › **Premium Features Re-Sell Settings** › markup (el markup por defecto del Pro Plan es 1.2x).

### 14.2 Workflows Pro Plan
https://help.gohighlevel.com/support/solutions/articles/155000003971-workflows-pro-plan-new-pricing-tiers

| Tier | Precio/mes | Ejecuciones incluidas | Excedente |
|---|---|---|---|
| Free | $0 | 100 (de por vida) | $0.01 |
| Starter | $10 | 10.000 | $0.008 |
| Growth | $25 | 30.000 | $0.006 |
| Scale | $50 | 65.000 | $0.004 |

- **Cuentan:** triggers y acciones premium, apps del Marketplace y LC Apps usadas en workflows. **No cuentan:** acciones estándar ni pasos de modelos de IA externos (GPT se cobra por tokens).
- Las ejecuciones se reinician **en la fecha de pago** y no se acumulan. Suscripción: **Global Workflow Settings › Workflow Pro Plans banner › View Plans › Pay and Subscribe**.
- Los nodos desactivados no consumen ejecuciones (155000006693).

### 14.3 Límites de ejecución y velocidad
- Límites de ejecución por workflow o por sub-cuenta (throughput, contactos por minuto): **(no confirmado en doc oficial)**. Para envíos masivos existe **Drip Mode** (lotes e intervalo) (155000006472).
- Los rate limits de la API afectan solo a quien inscribe contactos por API. Ver el archivo de API **(no confirmado en esta sesión)**.

---

## 15. Bucles, condiciones de carrera y limitaciones conocidas

1. **Bucles:** el lienzo impide las flechas hacia atrás, pero no los bucles invisibles (walkthrough 155000001254). Casos típicos:
   - El workflow A pone un tag que dispara el B, y el B pone otro que dispara el A.
   - Un **Go To** mal colocado.
   - Workflows de Company y de Contact que se actualizan mutuamente (155000006688).
2. **Loop Lockout:** existe un anuncio oficial en el foro de soporte, "Loop Lockout Code is Live!" (https://help.gohighlevel.com/support/discussions/topics/48000562846). El umbral que circula (**50 ejecuciones o arranques para el mismo contacto en menos de 30 min → "Loop Locked"**) viene de terceros: **(no confirmado en doc oficial)**. Según el portal de ideas, HighLevel **pasa a Draft y bloquea** workflows con bucle, y la notificación se marcó "complete" en may-2023, aunque hay usuarios que dicen no recibirla (https://ideas.gohighlevel.com/automations/p/ghl-puts-looping-wf-in-draft-send-notification). **Qué hacer:** si un workflow aparece en Draft sin que nadie lo tocara, sospecha de un bucle.
3. **Condiciones de carrera:** dos actualizaciones en el mismo segundo pueden hacer que un paso figure como Executed sin surtir efecto. **Solución oficial:** poner un **Wait de ~1 min** entre operaciones que dependen una de otra (p. ej. tras "Add to Workflow" o antes de leer un tag recién puesto). https://help.gohighlevel.com/support/solutions/articles/48001218068-troubleshooting-workflow-executions-race-conditions
4. **Re-entry apagado = una vez para siempre**, salvo con triggers de cita o factura (§6).
5. **Time Window** solo retrasa la comunicación y usa la misma franja todos los días.
6. **Stats View** no permite editar. **Undo** no ve los cambios de otros usuarios. Con **Auto Save** y varios editores, gana el último guardado.
7. **Version History:** 10 versiones o 30 días; los autoguardados no crean versión; para restaurar, el workflow debe estar en draft y sin contactos en curso.
8. **Copiar acciones:** solo en la misma sub-cuenta, sin triggers y con 15 minutos de portapapeles.
9. **Copy to Sub-Account:** borra las referencias a formularios, calendarios y similares; hay que reconectarlas.
10. **Advanced → Standard** exige quitar antes Trigger Go-To, delinked nodes y disabled nodes.
11. **Un contacto no recorre varias ramas** del mismo workflow a la vez.
12. **La validación antes de publicar no lo detecta todo**, así que hay que probar igualmente.
13. **Test Workflow** envía de verdad y no salta los Waits.

---

## 16. Buenas prácticas oficiales (checklist)

Reunidas de los artículos citados. Para cada punto se indica su fuente.

- [ ] **Nombres descriptivos** en triggers y acciones. Sticky notes con color desde el principio y **Tidy Up** tras ediciones grandes (155000006635).
- [ ] **Filtros en los triggers** para no inscribir de más (155000002288).
- [ ] Revisar **Allow Re-entry** según el caso de uso, recordando la excepción de citas y facturas (48001239875, 155000002288).
- [ ] Configurar **Sender Details**, **Timezone** y **Time Window** antes de publicar (48001239875).
- [ ] Resolver el panel **Resolve Errors** y la **Post-Generation To-Do List** si lo generó la IA (155000004872, 155000006100).
- [ ] **Probar con un contacto nuevo** y verificar en **Execution Logs** que todo sale Executed (155000001254, 155000002288).
- [ ] Añadir un **Wait de 1 min** entre pasos dependientes para evitar condiciones de carrera (48001218068).
- [ ] Evitar tags cruzados entre workflows y Go To circulares; en Company y Contact, usar flags de salvaguarda (155000006688).
- [ ] Usar **Disabled nodes** para iterar sin volver a cablear (155000006693).
- [ ] Antes de cambios grandes: **Save Version**, y usar Version History para revertir (155000006656).
- [ ] Carpetas por propósito, con 2–3 niveles como máximo (155000001684).
- [ ] Revisar periódicamente **Automations Overview › Needs Review** (155000006813).
- [ ] Controlar el consumo premium (Pro Plan) antes de activar Re-entry con pasos premium (155000003971).

---

## Fuentes

**Help Center (help.gohighlevel.com)**
- https://help.gohighlevel.com/support/solutions/articles/155000001254-workflow-builder-walkthrough
- https://help.gohighlevel.com/support/solutions/articles/155000006635-advanced-builder-for-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000006700-delinked-nodes-independent-branches-advanced-builder-workflow
- https://help.gohighlevel.com/support/solutions/articles/155000006693-pause-workflow-actions
- https://help.gohighlevel.com/support/solutions/articles/155000006694-keyboard-shortcuts-in-workflow-builder
- https://help.gohighlevel.com/support/solutions/articles/155000007323-standard-vs-advanced-how-to-set-default-workflow-builder
- https://help.gohighlevel.com/support/solutions/articles/155000008326-workflow-builder-resize-and-expand-sidebars
- https://help.gohighlevel.com/support/solutions/articles/155000006081-copy-workflow-actions-across-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000007729-workflow-builder-find-replace-option
- https://help.gohighlevel.com/support/solutions/articles/155000006655-workflows-undo-redo-change-history
- https://help.gohighlevel.com/support/solutions/articles/155000006654-workflows-auto-save
- https://help.gohighlevel.com/support/solutions/articles/155000006656-workflows-version-history-restore
- https://help.gohighlevel.com/support/solutions/articles/155000002639-how-to-restore-deleted-workflow
- https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview
- https://help.gohighlevel.com/support/solutions/articles/155000003850-pause-workflows-on-certain-dates
- https://help.gohighlevel.com/support/solutions/articles/155000003976-workflow-oauth2-in-custom-webhook
- https://help.gohighlevel.com/support/solutions/articles/155000004871-workflows-landing-page
- https://help.gohighlevel.com/support/solutions/articles/155000002288-getting-started-with-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000002445-introduction-to-workflows-and-automations
- https://help.gohighlevel.com/support/solutions/articles/155000006688-company-based-workflows-company-triggers-actions
- https://help.gohighlevel.com/support/solutions/articles/155000006701-custom-object-and-company-based-workflow-actions-triggers
- https://help.gohighlevel.com/support/solutions/articles/48001229927-workflows-vs-campaigns-triggers-deprecated-features-
- https://help.gohighlevel.com/support/solutions/articles/155000002470-workflow-action-wait
- https://help.gohighlevel.com/support/solutions/articles/155000003992-workflows-improved-execution-logs-enrollment-history
- https://help.gohighlevel.com/support/solutions/articles/155000004872-highlighting-resolving-errors-in-a-workflow
- https://help.gohighlevel.com/support/solutions/articles/155000006813-automations-overview
- https://help.gohighlevel.com/support/solutions/articles/155000006809-trigger-statistics-for-workflows
- https://help.gohighlevel.com/support/solutions/articles/48001218068-troubleshooting-workflow-executions-race-conditions
- https://help.gohighlevel.com/support/solutions/articles/155000006100-workflow-ai-builder
- https://help.gohighlevel.com/support/solutions/articles/155000003970-workflow-ai-assistant
- https://help.gohighlevel.com/support/solutions/articles/155000005631-workflow-builder-learn-more-using-ai
- https://help.gohighlevel.com/support/solutions/articles/155000004692-how-to-generate-custom-code-with-ai-in-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000001304-add-custom-templates-to-template-library
- https://help.gohighlevel.com/support/solutions/folders/155000001063 (Workflow Recipes)
- https://help.gohighlevel.com/support/solutions/articles/155000001229-how-to-copy-workflow-to-another-sub-account-
- https://help.gohighlevel.com/support/solutions/articles/48000982511-snapshots-overview
- https://help.gohighlevel.com/support/solutions/articles/48000982513-how-to-share-snapshots
- https://help.gohighlevel.com/support/solutions/articles/155000005917-how-to-view-snapshot-assets
- https://help.gohighlevel.com/support/solutions/articles/155000001684-workflows-nested-folders
- https://help.gohighlevel.com/support/solutions/articles/155000005678-how-to-enable-and-rebill-premium-features-for-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000003971-workflows-pro-plan-new-pricing-tiers
- https://help.gohighlevel.com/support/solutions/articles/155000006472-new-drip-mode-architecture-for-bulk-actions
- https://help.gohighlevel.com/support/discussions/topics/48000562846 (foro oficial: "Loop Lockout Code is Live!")

**Changelog e ideas (ideas.gohighlevel.com)**
- https://ideas.gohighlevel.com/changelog/advanced-builder-a-new-era-for-workflow-design
- https://ideas.gohighlevel.com/changelog/agency-workflow-settings-default-builder-for-workflows
- https://ideas.gohighlevel.com/changelog/ai-builder-in-workflows-now-more-powerful
- https://ideas.gohighlevel.com/changelog/workflow-ai-builder-now-available-across-sub-accounts
- https://ideas.gohighlevel.com/changelog/workflow-builder-find-replace-is-here
- https://ideas.gohighlevel.com/changelog/workflow-builder-resize-and-expand-sidebars
- https://ideas.gohighlevel.com/changelog/workflow-builder-significant-load-time-improvements
- https://ideas.gohighlevel.com/changelog/advanced-builder-keyboard-shortcuts
- https://ideas.gohighlevel.com/changelog/advanced-builder-pause-workflow-actions
- https://ideas.gohighlevel.com/automations/p/ghl-puts-looping-wf-in-draft-send-notification
- https://ideas.gohighlevel.com/automations/p/test-workflow-without-wait-steps-and-day-time-settings
