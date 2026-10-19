# Interfaz del constructor de workflows de GHL — guía de manejo

Observado en vivo (sep 2026, "Advanced Canvas"). Cuando la interfaz no coincida con esta guía, **manda la pantalla**: sigue lo que ves y anota la diferencia en el informe final para actualizar este archivo.

## Mapa de URLs (sustituye `{LOC}` por el location id de la subcuenta)

| Pantalla | URL |
|---|---|
| Lista de workflows | `https://app.gohighlevel.com/v2/location/{LOC}/automation/workflows` |
| Un workflow | `.../automation/workflow/{WORKFLOW_ID}/advanced-canvas` |
| Etiquetas | `.../settings/tags` |
| Campos personalizados | `.../settings/fields` |
| Valores personalizados | `.../settings/custom_values` |
| Pipelines | `.../opportunities/pipelines` → pestaña `Pipelines` |
| Calendarios | `.../settings/calendars` |
| Labs (activar la IA del constructor) | `.../settings/labs` |

Para sacar el `{LOC}`: la URL de cualquier pantalla de la subcuenta lo contiene (`/v2/location/XXXX/...`).

## La regla más importante: dos mundos distintos

| Zona | Cómo se maneja |
|---|---|
| **Algunos ajustes de la subcuenta** (comprobado: Tags) | Página normal. `find` / `read_page` / `get_page_text` funcionan → **clic por `ref`**, rápido y fiable |
| **Otros ajustes** (comprobado: My Staff, en `client-app-crm-settings.leadconnectorhq.com`) y probablemente más | Iframe también. Antes de usar `find`, mira si la página tiene un `<iframe>` (con `javascript_tool`: `document.querySelectorAll('iframe')`). Si lo tiene → capturas |
| **Pipelines** | `.../opportunities/pipelines` → pestaña `Pipelines` (lista con nombre y número de etapas). Las etapas se leen en el desplegable de la acción del constructor |
| **Todo Automation**: la **lista de workflows** y el **lienzo del constructor** | Es un **iframe de otro dominio** (`client-app-automation-workflows.leadconnectorhq.com`). `find`/`read_page` **no ven nada dentro** y `read_network_requests` no capta sus llamadas. Solo sirven **captura + coordenadas + teclado** |

## Antes de lanzar: la persona pone la pestaña al frente

Dentro de GHL solo se puede construir si Chrome **está dibujando** la pestaña de Claude. Ni un clic neutro ni crear la pestaña de otra forma la hacen visible si la ventana de Chrome está detrás, minimizada o en otra pestaña. Por eso, **antes de construir** (y antes de lanzar un subagente, que no puede preguntar a mitad de camino):
1. Claude abre su pestaña (`tabs_context_mcp` con `createIfEmpty: true`) y navega a la lista de workflows.
2. Claude pide a la persona: *"Haz clic en la pestaña de Claude en Chrome, maximiza la ventana y no la uses mientras construyo"*.
3. Claude comprueba `document.visibilityState === "visible"`. Solo entonces empieza (o lanza el subagente, diciéndole que **reutilice esa pestaña** y no cree otra).

## Chequeo previo obligatorio (go / no-go)

Dentro del iframe, los clics **solo funcionan si la pestaña se está dibujando de verdad**. Comprobado: en una pestaña abierta en segundo plano, con el zoom de Chrome al 90 %, el hover resaltaba los botones pero los clics no hacían nada.

0. **Una sola pestaña de trabajo en el grupo de Claude.** Llama a `tabs_context_mcp`. Si en el grupo hay pestañas de sesiones anteriores de Claude, **la pestaña seleccionada sigue siendo la vieja** y la nueva queda oculta detrás. Las herramientas no pueden traerla al frente (comprobado en la Prueba 3). Entonces:
   - Si la pestaña vieja no tiene trabajo pendiente (el grupo solo contiene pestañas creadas por Claude), **ciérrala** con `tabs_close_mcp`.
   - Si no puedes cerrarla, **pide al usuario que haga clic en tu pestaña**.
   - No trabajes nunca en una pestaña del usuario que esté fuera del grupo.
1. **Pestaña visible (causa principal comprobada).** Con `javascript_tool` en la página exterior: `document.visibilityState`. Una pestaña recién creada con `tabs_create_mcp` suele salir `"hidden"`. Haz **un clic en una zona neutra de la página exterior** (p. ej. la cabecera "Automation") y vuelve a leerlo hasta que dé `"visible"`. Si sigue `"hidden"` → pide al usuario que haga clic en la pestaña (su título aparece en el grupo de Claude de Chrome).
   - Síntomas de pestaña oculta: `Page.captureScreenshot` sale por timeout ("renderer may be frozen"), capturas alternas buenas y ampliadas, y la página ocupa ~90 % de la imagen.
   - Las pantallas de ajustes **fuera** de iframe (Tags) sí se leen con `get_page_text` aunque la pestaña esté oculta: puedes comprobar requisitos previos mientras tanto.
2. **Prueba de clic dentro del iframe (el criterio que decide):** en la lista de workflows, pulsa `Needs review` y **después** `All workflows`. Comprueba cada cambio leyendo `location.href` con `javascript_tool` (`?listTab=review` → `?listTab=all`), no solo con una captura: con la pestaña oculta las capturas pueden salir **congeladas pero con aspecto normal**. **Go = los dos clics seguidos funcionan.** Si alguno falla → **no-go**: para. No sigas probando a ciegas; un solo clic que funciona no basta (comprobado: clics intermitentes con la pestaña oculta).
3. **Zoom (solo informativo):** `window.devicePixelRatio` puede dar 0.9 aunque el usuario tenga el zoom al 100 %, porque se mezcla con la escala de pantalla de Windows. **No bloquees por este valor** si el punto 2 da go. Solo pide `Ctrl+0` cuando el punto 2 falle.
4. **Capturas coherentes:** si la página ocupa solo parte de la imagen o su tamaño cambia entre capturas, casi siempre es el punto 1. Las primeras capturas tras hacerla visible pueden salir raras: repite una. No calcules coordenadas sobre capturas deformadas.

Los diagnósticos **de solo lectura** con `javascript_tool` en la página exterior (`devicePixelRatio`, `innerWidth`, `location.href`, `visibilityState`) están permitidos. Un listener de ratón en la página exterior **no ve** los clics dentro del iframe. Las coordenadas válidas son las del marco que indica cada captura ("coordinate frame"), aunque `innerWidth` cambie. Lo prohibido es usar JavaScript para crear o modificar el workflow.

Consecuencias:
- Dentro del lienzo, **captura después de cada acción que cambie la vista**. Usa `scale` 0.6–0.7 para ahorrar y `zoom` sobre la región del panel para leer textos pequeños.
- Nunca navegues con `navigate` a la URL del iframe: se queda cargando para siempre (la autenticación llega de la página padre).
- Agrupa en `browser_batch` lo predecible (clic → escribir → Enter → esperar → captura).

## Anatomía del lienzo

- **Arriba:** `← Workflows list` · nombre del workflow (lápiz para renombrar) · undo/redo · **Save** (azul, con punto rojo = cambios sin guardar).
- **Pestañas:** `Builder` · `Settings` · `Enrollment history` · `Execution logs`. A la derecha: `Test workflow` e interruptor **`Draft` / `Publish`**.
- **Lienzo horizontal:** los nodos van de izquierda a derecha. Cada nodo tiene un conector `⊕` a su derecha para añadir el siguiente paso. El If/Else abre ramas con su propio `⊕` al final de cada una.
- **Abajo a la izquierda:** seleccionar · **Fit to screen** (tecla `1`) · zoom − / + · auto-layout.
- **Arriba a la derecha:** `+ Add` (añadir paso suelto).
- **Barra lateral izquierda (iconos):** el último icono (✦ morado) abre el **panel de IA** (Build / Chat, "Point & Edit").
- **Panel de acciones:** al pulsar `⊕` se abre `Actions` (se ha visto a la derecha y también como diálogo centrado; búscalo en la captura) con un buscador (`Search actions`, enfocado automáticamente), pestañas `Actions` / `Apps` y categorías (Recent actions, Contact, …). Al elegir una acción, el mismo panel muestra su formulario con `Cancel` / `Save action` abajo a la derecha.

## Recetas probadas

**Crear un workflow vacío**
0. **Antes de crear:** busca en la lista (captura) si ya hay un workflow con el nombre de la spec (`[Claude] …`) de un intento anterior. Si lo hay, **ábrelo y continúa ese** en vez de crear otro. Los "New Workflow : número" sin renombrar son restos de otros intentos: no los toques y menciónalos en el informe.
1. Arriba a la derecha hay **dos botones juntos**: `Build using AI` (**morado**, a la izquierda) y `+ Create workflow` (**azul**, a la derecha). Pulsa el **azul**: se despliega un menú con `Start from Scratch` · `Build Using AI` · `Select from Template` · `Import from a campaign` · `Company based workflow`. Cuidado con pulsar el morado por error.
2. `Start from Scratch` crea el workflow **al instante** (ya existe en la lista como borrador "New Workflow : número"). La URL cambia a `.../workflow/<id>/advanced-canvas`: anota ese id. Renómbralo enseguida con el lápiz: `[Claude] <nombre de la spec>`.

**Añadir una acción**
1. Captura → localiza el `⊕` al final del último nodo → clic.
2. El buscador ya tiene el foco: escribe **una palabra clave** de la acción (p. ej. `note`, `tag`, `if`, `email`, `wait`) → captura → clic en el resultado que corresponda. El nombre en la lista puede diferir un poco del de la documentación (p. ej. "Add to Notes" / "Add Note"): elige por significado y anota la diferencia en el informe.
3. Rellena el formulario → `Save action`.

**Elegir una opción de un desplegable** (condiciones, operadores, etiquetas, filtros del trigger)
- No hay un método que funcione siempre (comprobado): en el operador del If/Else y en el tag de Add contact tag funcionó **escribir + `Enter`** y falló el clic; en el filtro del trigger ("Tag added") funcionó el **clic** y falló `Enter`.
- Regla: prueba uno → **captura para verificar** → si no quedó elegida, prueba el otro.

**Añadir el disparador**
- En un workflow nuevo aparece el cuadro "Add first step" (ofrece Add trigger / Add action). Panel del trigger: `CHOOSE A WORKFLOW TRIGGER` (buscador), `WORKFLOW TRIGGER NAME` y `+ Add filters`. En Contact tag, el filtro es un desplegable con "Tag added" / "Tag removed" y un segundo campo para el tag.

**Evita `+ Add` (arriba a la derecha)** para añadir pasos: crea un nodo que **sigue al cursor** ("Please click on the canvas to add the node") y queda **sin conectar**, sin ningún error. Añade siempre desde el `⊕` del nodo anterior. Solo si necesitas un nodo suelto, colócalo y luego conéctalo arrastrando.

**Leer valores largos:** el botón ⤢ del panel lo abre como diálogo grande, con flechas anterior/siguiente y `Delete`.

**If/Else (Build your own)**
1. `ACTION NAME`: pon un nombre descriptivo (p. ej. "¿Es cliente?").
2. En `BRANCHES` → `Branch`: renómbrala (p. ej. "Cliente") → `Select` (campo; escribe p. ej. `Tags` + Enter) → `Select operator` (`Includes` / `Does not include` / `Is empty`…) → valor.
3. `+ Add segment` para más condiciones (AND/OR), `+ Add branch` para más ramas. La rama `None branch` recoge a quien no cumpla.
4. `Save action`. Después, cada rama tiene su propio `⊕` en el lienzo.

**Trampa — valores que no existen:** si escribes una etiqueta que no existe, el desplegable muestra `No Data` y `Add New tag (<nombre>)`. **No la pulses**: crearía una etiqueta real en la subcuenta. Los requisitos previos se crean en la fase de preparación (ver SKILL.md) y con aprobación.

**Borrar un nodo intermedio y reconectar**
1. Abre el nodo → `Delete` (abajo a la izquierda del panel) → confirma. El diálogo avisa de que se aplica al guardar.
2. GHL **no reconecta** la cadena: el nodo siguiente queda suelto.
3. Arrastra (`left_click_drag`) entre el **punto de salida** (derecha) del nodo anterior y el **punto de entrada** (izquierda) del nodo suelto. **Prueba en los dos sentidos:** en la Prueba 2 funcionó de salida → entrada; en la Prueba 3, de salida → entrada no dibujó nada (sin error) y funcionó de **entrada → salida**. Captura siempre para confirmar la línea.

**Wait con timeout ("Until the contact replies")**
- `Reply to` es un selector múltiple de **pasos de envío anteriores**: queda como chip con ×. El desplegable no se cierra solo, así que haz clic fuera.
- En el lienzo salen dos píldoras oscuras: **"Wait"** (respondió) y **"Timeout"** (expiró). Cada una tiene su ⊕ para colgar su rama.

**Ordenar el lienzo:** el último icono abajo a la izquierda, **"Format tree"**, recoloca los nodos para que las ramas se lean bien (no cambia conexiones). Úsalo antes de la captura de verificación final.

**Guardar**
- `Save` arriba a la derecha. Cuando termina, el botón se vuelve **gris y dice "Saved"**. Si al salir hay cambios sin guardar, el navegador muestra "Leave site?" y **bloquea la navegación** de la pestaña: guarda o descarta desde la propia interfaz; si necesitas otra pantalla mientras tanto, abre **otra pestaña**.
- **Nunca** toques el interruptor `Draft/Publish`.

## Asistente de IA del constructor ("What do you want to automate?", beta, gratis)

- Aparece en el lienzo de un workflow vacío y en el panel ✦. Tarda unos 40 s. Deja los cambios **sin guardar** (marca "Unsaved").
- Rendimiento observado:
  - ✅ disparador + pasos lineales (etiqueta, espera) + If/Else con su condición.
  - ❌ **inventó pasos duplicados** aunque el prompt decía "Do not add any other steps".
  - ❌ **dejó vacías las ramas del If/Else** (no puso el email ni el SMS).
  - ❌ al pedirle corregir por chat, **borró también el If/Else** y en su resumen **afirmó que seguía en el lienzo** (falso).
  - ❌ **renombra el workflow** con un nombre propio (p. ej. "Tag-Based Client Update") y **pisa** el `[Claude] …`.
  - ❌ **inventa nodos vacíos** (p. ej. un "Add contact tag" sin etiquetas, con aviso rojo) y **rellena campos opcionales** que la spec no pide (p. ej. el título de una nota).
  - ⚠️ se ha visto `Allow re-entry` activado tras usarla.
- Detalles de uso: el prompt se envía con el botón morado ↑ dentro de la caja de texto. El panel de IA queda abierto a la izquierda hasta cerrarlo con ✕.
- Reglas de uso:
  1. Úsalo **una sola vez** para el esqueleto, con un prompt en inglés, numerado y literal (ver plantilla en SKILL.md).
  2. **No le pidas correcciones**: corrige tú a mano.
  3. **Nunca te fíes de su resumen**: la verdad es la captura del lienzo.
  4. Si se desactiva (Labs), el flujo sigue igual pero construyendo todo a mano.

## Nombres en la interfaz vs documentación

La interfaz manda. Diferencias vistas (sep 2026):

| Documentación / spec | Interfaz |
|---|---|
| Add to Notes (campo Note Content) | **Add notes**: campos `TITLE`, `NOTE`, `COLOR` |
| Contact Tag (trigger) | **Contact tag** |
| Wait · A set period of time | Wait → "Selected wait type: **For a set period of time**", campos `Action name`, `Time period`, `Unit`, `Advance window` |
| If/Else | Panel "If / else": `ACTION NAME`, `SCENARIO RECIPE` = "Build your own", `BRANCHES` (nombre editable por rama, `AND` + `+`, `+ Add segment`, `+ Add branch`, `Reorder branches`) y el bloque "None branch · When no condition is met", también con nombre editable. El nombre de la rama en el lienzo se actualiza al guardar |
| Send Email | Panel "Email": `Action Name *`, `From Name`, `From Email`, `Cc`/`Bcc`, `Subject *`, `Pre-Header (Preview Text)`, `Create email` (Quick compose / From smart builder / Select existing template), `Type your message *`, `Additional settings` (Track clicks, UTM tracking, Add tags), `Test Emails *` + `Send test mail` (se guarda sin rellenarlo). **Nunca pulses Send test mail** |
| Send SMS | Al buscar "sms" salen **dos**: **Communication › Send SMS** (la nativa, **usa esta**) y "Send SMS" de la app **Twilio** (muestra precio). Panel "SMS" con pestañas `Edit action` / `Statistics`: `ACTION NAME`, `TEMPLATES`, `MESSAGE`, `Add attachments`, `Add files through URL`, `TEST PHONE NUMBER` + `Send test SMS`. **Nunca pulses Send test SMS** |
| Create Opportunity (con owner) | **No tiene owner.** Ver `ghl-workflows-referencia/acciones-negocio.md` §1.3 |
| Merge fields `{{contact.first_name}}` | Se escriben como texto; al guardar se convierten en una "chip" (p. ej. "Contact.First Name") |

Otros detalles:
- En la pestaña `Settings` desaparecen `Test workflow` y el interruptor `Draft/Publish`. Vuelve a `Builder` para verlos.
- Abajo del lienzo puede quedar fijo un aviso amarillo "Actions copied to clipboard…" de sesiones anteriores. No tiene que ver con tu workflow: ignóralo.

## Tiempos de referencia (para avisar al usuario)

- Esqueleto por IA: ~40 s.
- Acción simple a mano (etiqueta, espera): ~30–60 s.
- Acción compleja a mano (If/Else con condición, email con cuerpo): ~1–2 min.
- Workflow de ~10 pasos: 10–20 min.
