# Acciones internas, de lógica, de datos y de IA en workflows de HighLevel (referencia oficial)

> **Cómo usar este archivo:** busca la acción por su nombre en inglés (tal como aparece en el constructor), copia su configuración y revisa sus trampas antes de proponerla. Todo sale de documentación oficial de HighLevel (consultada el 23-sep-2026). Lo que no aparece en esa documentación va marcado **(no confirmado en doc oficial)**.

## Índice

0. [Convenciones y facturación premium](#0-convenciones-y-facturación-premium)
1. [If/Else](#1-ifelse)
2. [Wait](#2-wait)
3. [Goal Event](#3-goal-event)
4. [Go To](#4-go-to)
5. [Split](#5-split)
6. [Router y Loop (estado)](#6-router-y-loop-estado)
7. [Drip](#7-drip-drip-mode)
8. [Math Operation](#8-math-operation)
9. [Update Custom Value](#9-update-custom-value)
10. [Text Formatter](#10-text-formatter)
11. [Number Formatter](#11-number-formatter)
12. [Date/Time Formatter](#12-datetime-formatter)
13. [Array Functions / Array Formatter](#13-array-functions--array-formatter)
14. [Custom Code](#14-custom-code)
15. [Webhook (Outbound)](#15-webhook-outbound)
16. [Custom Webhook](#16-custom-webhook)
17. [Inbound Webhook (trigger, para emparejar)](#17-inbound-webhook-trigger-para-emparejar)
18. [Google Sheets](#18-google-sheets)
19. [Add to Workflow / Remove from Workflow](#19-add-to-workflow--remove-from-workflow)
20. [Acciones de IA](#20-acciones-de-ia)
21. [Sintaxis de campos de combinación (merge fields / custom values)](#21-sintaxis-de-campos-de-combinación-merge-fields--custom-values)
22. [Tabla resumen: dónde queda la salida de cada acción](#22-tabla-resumen-dónde-queda-la-salida-de-cada-acción)
23. [Fuentes](#fuentes)

---

## 0. Convenciones y facturación premium

**Identificadores internos** vistos en el código del constructor (sirven para reconocer el JSON interno; la documentación oficial no los publica):
`if_else`, `wait`, `workflow_goal`, `goto`, `workflow_split`, `router`, `loop`, `update_custom_value`, `math_operation`, `text_formatter`, `number_formatter`, `datetime_formatter`, `array_functions`, `custom_webhook`, `code`, `chatgpt`, `ai_agent`.

**Facturación premium (oficial):**
- Categoría **"Workflow - Premium Features"**: **$0.01 por ejecución** de cada acción o trigger premium. Cada sub-cuenta tiene **100 ejecuciones gratis**. Se activa en Agencia › Settings › Company › Workflow – Premium Features. El rebilling con markup solo está disponible para agencias SaaS ($497).
  - https://help.gohighlevel.com/support/solutions/articles/155000005678-how-to-enable-and-rebill-premium-features-for-workflows
- Categoría **"Workflow - External AI Models"**: la acción GPT se cobra por tokens, a la tarifa pública de OpenAI y sin margen, desde la AI wallet.
  - https://ideas.gohighlevel.com/changelog/new-workflow-pricing-categories-premium-features-ai-models
- Premium confirmados en la doc oficial: trigger **Inbound Webhook**; acciones **Google Sheets**, **Slack**, **Custom Webhook** y las **Workflow AI actions** (Translate, Summarize, Decision Maker, Intent Detection…), además de **Copy Contact**, **Custom Code** (según el artículo "Build with AI"), **AI Agent**, **AI Extract Data**, **AI Email Parser**, **AI Image Generation** y **AI Analyze Image**.
- **Ya NO son premium** (changelog oficial): **Number Formatter** y **Date Formatter** ("will no longer be premium features"); **Array Formatter** ("free to use… billed at $0"); **Text Formatter** ("free to use action").
  - https://ideas.gohighlevel.com/changelog/number-formatter-and-date-formatter-actions-are-now-free
- **Workflows Pro Plan**: tramos por volumen de ejecuciones. El excedente se cobra y el workflow no se detiene. https://help.gohighlevel.com/support/solutions/articles/155000003971-workflows-pro-plan-new-pricing-tiers

**Patrón general de salidas:** las acciones que producen datos (formatters, webhook, código, IA, Sheets) quedan disponibles para los pasos siguientes en el **selector de valores personalizados** (icono de etiqueta, o escribiendo `/` en un campo de texto), agrupadas por el nombre de la acción. La sintaxis documentada sigue el patrón `{{<tipo_accion>.<n>.<campo>}}`, donde `<n>` es el índice de la acción de ese tipo dentro del workflow (por ejemplo, `{{chatgpt.1.response}}` o `{{datetime_formatter.1.date}}`). **Regla práctica:** inserta siempre la variable desde el selector y no la escribas a mano.
- Chips de color en los campos: **azul** = disponible; **amarillo** = existe, pero este workflow no la aporta (puede salir vacía); **rojo** = no existe o está obsoleta (hay que reemplazarla). https://help.gohighlevel.com/support/solutions/articles/48001161575-how-to-use-custom-values · https://ideas.gohighlevel.com/changelog/workflow-dynamic-values-new-chip-interface-with-quick-add-and-edit

---

## 1. If/Else

**Nombre en el constructor:** `If / Else` · Premium: no.
**Para qué sirve:** enviar al contacto por una rama u otra según unas condiciones. Evalúa **en el instante**; no espera a que el dato llegue.

**Campos:**
| Campo | Obligatorio | Notas |
|---|---|---|
| Action Name | Sí | Etiqueta del paso |
| Build My Own / prebuilt recipe | — | Al añadirlo se elige "Build My Own" o empezar desde una **receta** con condiciones comunes (desplegable **Scenario Recipe**) |
| Branches | Sí | Cada rama es un grupo de condiciones. Se añaden más con **Add Branch** |
| Condition | Sí | Campo + operador + valor de comparación |
| Segments | No | Grupos de condiciones unidos con **AND / OR**. Se añaden con **Add Segment** |
| None (Else) branch | Automática | Se crea sola, **no se puede quitar** y **no admite condiciones**. Se puede renombrar y llenar con acciones de respaldo |

**Categorías de campos (doc oficial):** campos de contacto (incluidos los custom fields), campos de empresa (Company), cita (Appointment), oportunidad, datos del trigger y salidas de pasos anteriores (Dynamic Values). Añadidos recientes: **Contact Engagement Score**, **Contact → Attribution Medium ID**, **Note created by (Name)** y **Task ID**.

**Operadores documentados:**
- Genéricos: **Is**, **Is Not**, **Is Empty**, **Is Not Empty**.
- Fechas (por ejemplo, Appointment › Start Date / End Date): **Today**, **Tomorrow**, **Yesterday**, **After**, **Before**, **Date** (fecha concreta).
- Appointment › **Rescheduled**: True / False.
- La lista completa de operadores por tipo de campo (contains, greater than, has tag…) **(no confirmado en doc oficial)**. El constructor muestra los operadores que corresponden al tipo de campo.

**Dynamic Values (lado derecho):** en el valor de comparación se puede cambiar el tipo a **Dynamic Value** para comparar con salidas de pasos anteriores o con campos guardados. Tipos admitidos: numérico, fecha, select/dropdown y monetario.

**Evaluación:** las ramas se revisan en orden; si ninguna se cumple, se ejecuta la rama None. Que sea estrictamente la primera rama verdadera, de arriba abajo, **(no confirmado en doc oficial)** en el artículo actual.

**Trampas:**
- **Los campos Select/Dropdown comparan por option ID**, no por el texto que se muestra, cuando se usan con Dynamic Values. Los IDs de pipeline y etapa se sacan de Settings.
- Los campos de Company solo se resuelven si el contacto está asociado a una empresa.
- Si un campo está vacío, el workflow no se detiene: la condición simplemente no se cumple.
- La doc recomienda poner un **Wait** antes del If/Else si el dato puede llegar más tarde.
- Las ramas se pueden editar antes o después de publicar.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/155000002471-workflow-action-if-else · https://help.gohighlevel.com/support/solutions/articles/155000004050-if-else-workflow-action-appointment-filter-options · https://ideas.gohighlevel.com/changelog/smarter-field-pickers-for-custom-values-if-else-in-workflows

---

## 2. Wait

**Nombre:** `Wait` · Premium: no. Todos los campos de fecha y de duración admiten **Dynamic** (custom variables resueltas al ejecutarse).

### 2.1 A set period of time
- Número + unidad: **seconds / minutes / hours / days**. Modo **Standard** o **Dynamic**.
- **Advance Window** (opcional):
  - **Resume On**: días de la semana en que puede reanudarse.
  - **Resume Between Hours**: franja horaria o una hora exacta de inicio.
  - **Additional Filter**: condiciones de fecha (día, mes, año).

### 2.2 A specific date and time
- Selector de fecha y hora (usa el formato de la cuenta). **Standard / Dynamic** (Dynamic toma la fecha de un campo del contacto).
- **When should contact proceed**: *On this date and time* / *Before this date* / *After this date* (en estos dos, con duración).
- **Si la fecha ya pasó**: *Continue to next action* / *Exit Contact from automation* / *Go to specific step* / *Skip all outbound communication actions till next wait or event start date action*.

### 2.3 A recurring schedule
- Frecuencia **Weekly** (día o días + hora), **Monthly** (día X del mes, o el N-ésimo día de la semana: 1st / 2nd / 3rd / 4th / Last, combinables, p. ej. "1st and 3rd Tuesday"; mes; hora) o **Yearly** (mes, día y hora).
- **When should contact proceed**: on / before / after.
- Panel **"Next 5 scheduled recurrences"** con las cinco próximas fechas.

### 2.4 An upcoming appointment or booking (espera relativa a un evento o cita)
- Tipo: **Appointment / Calendar Event**, **Service Booking** (oculto si está desactivado) o **Invoice Due Date**.
- Proceder: **At the scheduled time**, **Before** o **After** (duración en months / days / hours / minutes).
- **Si ya pasó**: Continue / Go to specific step / Exit / Skip outbound hasta el próximo wait.

### 2.5 The contact to reply
> ⚠️ **Verificado en la interfaz (sep 2026):** en la lista de tipos la tarjeta se llama **"Until the contact replies"** ("Wait for a reply on SMS, Email, etc."). Campo **`Reply to` = "Select a step"**: se elige un **paso de envío anterior** del mismo workflow (SMS, Email…), no un canal. **Es obligatorio**: sin un Send previo muestra `No Data` y no deja guardar ("Please select at least one reply step"). `Timeout`: interruptor + número (−/+) + unidad (seconds/minutes/hours/days). En la pantalla de tipos también aparece un enlace "Set up with AI".
- **Reply to**: paso de envío anterior (ver nota verificada arriba). **Timeout** on/off con su duración (empieza en 0 minutos al activarlo).
- **En el lienzo:** el Wait con timeout se abre en dos nodos-píldora oscuros: **"Wait"** (arriba, respondió) y **"Timeout"** (abajo, expiró), cada uno con su punto de salida y su ⊕.
- Si se coloca justo después de una acción Send, esta opción sube al principio de la lista.

### 2.6 The contact to take an action
- Acción: **Clicks a trigger link** o **Email event** (open, click, bounce…) de un paso de email concreto (desplegable). Timeout on/off.

### 2.7 Specific conditions to be met (esperar hasta que se cumpla una condición)
- **Add Condition** / **Add Segment**, AND/OR dentro de cada segmento, sin límite de segmentos. Timeout on/off.
- El contacto avanza cuando **cualquier** segmento se cumple (los segmentos se combinan en OR).

### 2.8 A user to reply
- Canal; usuario (opcional): usuario asignado al contacto, usuarios concretos (selección múltiple) o cualquiera. Timeout on/off, que sirve para escalar un SLA.
- Trampa: se resuelve cuando la respuesta del usuario **se entrega**, no cuando se envía.

**Trampas generales:**
- Editar un Wait **no afecta a los contactos que ya están esperando** (heredado de la investigación previa; el artículo actual no lo repite).
- Las esperas con timeout generan dos salidas: el evento se cumplió o expiró el timeout.

Fuente: https://help.gohighlevel.com/support/solutions/articles/155000002470-workflow-action-wait

---

## 3. Goal Event
> ⚠️ **Verificado en la interfaz (sep 2026):** en el buscador aparece como **"Goal event"** y el panel se titula **"Workflow goal"**. Campos: `ACTION NAME`, `SELECT TYPE OF GOAL`, el campo del tipo (p. ej. `SELECT CONTACT TAG`) e `IF CONTACT REACHES THIS GOAL ACTION WITHOUT MEETING ITS CONDITIONS` (End this workflow, que es el valor por defecto / Continue anyway / Wait until the goal is met). Tipos reales: Received an Email Event (por defecto), Clicked a trigger link, **Added a contact Tag**, **Removed a contact Tag** (son dos tipos distintos), Appointment status, Payment Received, Form Submitted, Document Status, Invoice paid, Review request clicked, User Replied y **Task status** (este no aparece en la doc).

**Nombre:** `Goal Event` · Premium: no.
**Para qué sirve:** es un punto de meta. Si el contacto cumple el objetivo **en cualquier momento**, salta a este paso y se salta todo lo que tenga en medio.

**Campos:** Action Name · **Select Type of Goal** · criterios según el tipo · **comportamiento si no se cumple** (desplegable).

**Tipos de meta:**
1. **Form Submitted**: varios formularios; basta con cualquiera.
2. **Payment Received**: estado success/failed y producto.
3. **Invoice Paid**: cualquier factura o la de una acción "Send Invoice" concreta.
4. **Document Status**: Viewed / Signed / Declined / Completed.
5. **Email Events**: Opened / Clicked / Unsubscribed / Complained / Marked as Spam.
6. **Clicked a Trigger Link**.
7. **Review Request Clicked**: por canal, con enlace opcional.
8. **Contact Tag Added or Removed**.
9. **Appointment Status**: New / Confirmed / Showed / No-show.
10. **User Replied**: por usuario y canal.

**Si el contacto llega al paso sin haber cumplido la meta:** *End this workflow* / *Continue anyway* / *Wait until the goal is met*.

**Trampas:**
- **Solo un Goal Event por workflow.**
- Cuando se eligen varios valores, se evalúan en **OR**.
- Una vez cumplida, la meta no se vuelve a evaluar para ese contacto, y lo que pase después (p. ej. una cita reprogramada) no la revierte.

Fuente: https://help.gohighlevel.com/support/solutions/articles/155000003328-workflow-action-goal-event

---

## 4. Go To

**Nombre:** `Go To` · Premium: no.
**Campos:** Action Name · acción destino (se elige entre las acciones resaltadas o se traza la línea hasta ella) · icono **"Disconnect GoTo"** para cambiar el destino.
**Destinos:** cualquier acción del mismo workflow, incluidas otras ramas y pasos anteriores (sirve para bucles de reintento).
**Trampas:**
- **Solo puede ser el último paso de un workflow o de una rama**; no se puede insertar entre dos acciones.
- La doc **no documenta límite de iteraciones ni protección contra bucles infinitos**. Pon siempre un contador (Math Operation sobre un custom field) y un If/Else que corte el bucle.
- **Go-To Connections for Triggers** (solo en el **Advanced Builder**): conector punteado de un trigger a una acción concreta. Un conector por trigger; los triggers sin conectar van a la acción raíz; un contacto no recorre varias ramas a la vez. Antes de volver al Standard Builder hay que quitar estos conectores.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/155000003377-workflow-action-go-to · https://help.gohighlevel.com/support/solutions/articles/155000006690-go-to-connections-for-triggers-advanced-builder-workflow · https://help.gohighlevel.com/support/solutions/articles/155000006635-advanced-builder-for-workflows

---

## 5. Split

**Nombre:** `Split` · Premium: no.
**Campos:** Action Name · **Split Type**: solo **Random Split** · **Paths**: hasta **5**, con nombre editable y un **%** cada uno.
**Reglas:**
- Los % deben sumar **exactamente 100**; si no, no deja guardar. Se admiten rutas al 0 %.
- Un contacto que ya fue asignado a una ruta **se queda en esa ruta**, también si vuelve a entrar.
- Los cambios de configuración solo afectan a los contactos que entren después.
- No reparte por criterios (para eso está If/Else). La pestaña **Statistics** muestra cuántos contactos van por cada ruta.

Fuente: https://help.gohighlevel.com/support/solutions/articles/155000003304-workflow-action-split

---

## 6. Router y Loop (estado)

- **Router**: el constructor usa internamente el id `router`, pero **no hay ningún artículo oficial de una acción "Router"** en help.gohighlevel.com ni en el changelog **(no confirmado en doc oficial)**. Para enrutar se usa **If/Else** (reglas), **AI Decision Maker** (lenguaje natural) o **Split** (aleatorio).
- **Loop**: el constructor tiene el id interno `loop`, pero la idea oficial "Built-in Loop Action Inside Workflows" (8-feb-2024, ~26 votos, actualizada el 13-abr-2026) **sigue abierta, sin anuncio de lanzamiento** **(no confirmado en doc oficial que exista)**. Alternativa documentada: **Go To** hacia un paso anterior con contador + If/Else. Para listas: **Array Functions** o **Custom Code**.
  - https://ideas.gohighlevel.com/automations/p/built-in-loop-action-inside-workflows
- Las acciones de apps del Marketplace pueden definir ramas propias ("Allow New Branches", "Is Predefined Branches Editable"). https://ideas.gohighlevel.com/changelog/introducing-branches-and-pause-execution-for-marketplace-actions

---

## 7. Drip (Drip Mode)

**Nombre:** `Drip` · Premium: no.
**Para qué sirve:** dejar pasar a los contactos **por lotes** a intervalos regulares. Un Wait, en cambio, retiene a todos y los suelta a la vez.
**Campos:** Action Name · **Batch Size** (1–10.000) · **Drip Interval**: minutos (1–60), horas (1–24) o días (1–7).
**Comportamiento:**
- Vista previa de hasta 10 lotes; con el workflow publicado, el icono de estadísticas muestra el calendario de lotes y las ETA.
- Al pasar el workflow a borrador, la cola se **pausa**; al republicar, se reanuda por lotes (no suelta a todos de golpe).
- Si hay **Time Window**, los lotes se mueven a los huecos permitidos (aparece un aviso en línea).
- Los cambios de tamaño o intervalo solo afectan a los contactos que entren después; los que ya están en cola mantienen la configuración anterior (aparece un aviso).
- El motor nuevo (compartido con Bulk Actions) guarda un checkpoint tras cada lote y no tiene límite de duración. Bulk Actions añade **Start On / Send On / Process Between / End At**.

**Trampa:** un lote demasiado grande equivale a soltarlos todos a la vez y puede saturar los canales de envío.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/155000003360-workflow-action-drip · https://help.gohighlevel.com/support/solutions/articles/155000006472-new-drip-mode-architecture-for-bulk-actions

---

## 8. Math Operation

**Nombre:** `Math Operation` · Premium: no indicado en la doc.
**Campos:** Action Name · **Select Field** (campo origen: Current Date, Date of Birth, custom fields, custom values o un número fijo) · **Operation Type** · **Operation Value** (número o valor dinámico mediante el icono de etiqueta) · **Add Operator** (encadena operaciones) · **Update Field** (campo destino donde se guarda el resultado).
**Operaciones:**
- Campos numéricos o monetarios: suma, resta, multiplicación y división.
- Campos de fecha: sumar o restar días, meses o años.
**Salida:** se escribe en el campo **Update Field**. Después se lee con el merge field de ese campo (p. ej. `{{contact.<clave>}}`).
**Trampas:**
- **No respeta la precedencia de operadores (PEMDAS/BODMAS)** dentro de una misma acción. Para cálculos complejos, divídelos en varias acciones con campos intermedios.
- Los campos monetarios **no aceptan negativos**, y en los de fecha no se puede usar un valor negativo.
- El tipo del campo destino tiene que coincidir con el del resultado (número con número, fecha con fecha).

Fuente: https://help.gohighlevel.com/support/solutions/articles/155000003356-workflow-action-math-operation

---

## 9. Update Custom Value

**Nombre:** `Update Custom Value` · Premium: no indicado.
**Campos:** Action Name · **Custom Value** (el que se modifica) · **Current Value** (solo lectura) · **New Value** (fijo o dinámico, p. ej. `{{contact.custom_field}}`).
**Comportamiento:**
- Una acción actualiza **un solo** custom value. El nuevo valor está disponible enseguida en el mismo workflow.
- **Ojo:** un custom value es **global para toda la sub-cuenta**. Cambiarlo afecta a todos los emails, páginas y workflows que lo usen, no solo a este contacto.
- Solo funciona con custom values de la misma sub-cuenta y no se puede deshacer.
- También existe como herramienta del **AI Agent** ("Update Custom Value tool"). https://ideas.gohighlevel.com/changelog/ai-agent-action-update-custom-value-tool

Fuente: https://help.gohighlevel.com/support/solutions/articles/155000003353-workflow-action-update-custom-values

---

## 10. Text Formatter

**Nombre:** `Text Formatter` · **Gratis** ("free to use action").
**Campos comunes:** Action Name · **Action Type** · **Select Field** (texto de entrada).
| Action Type | Parámetros extra | Resultado |
|---|---|---|
| Upper Case / Lower Case / Title Case / Capitalize | — | Cambia mayúsculas/minúsculas |
| Default Value | Default Value | Devuelve el valor por defecto si la entrada está vacía |
| Trim | Max Length | Recorta a N caracteres |
| Trim Whitespace | — | Quita los espacios al principio y al final |
| Replace Text | Find, Replace | Sustituye el texto |
| Find | Find | Posición de la primera aparición (−1 si no la encuentra) |
| Word Count / Length | — | Número de palabras / de caracteres |
| Split Text | Separator, Segment | Devuelve el segmento indicado |
| Remove HTML Tags | — | HTML a texto plano |
| Extract Email / Extract URL | — | Primera aparición |

**Salida:** variable en el selector, bajo el nombre de la acción. Sintaxis literal, previsiblemente `{{text_formatter.<n>.<campo>}}` **(no confirmado en doc oficial)**. Se pueden encadenar varios formatters. Para números, usa Number Formatter.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/155000003361-workflow-action-text-formatter · https://help.gohighlevel.com/support/solutions/articles/155000002065-text-formatter-how-to-format-text-the-way-you-want

---

## 11. Number Formatter

**Nombre:** `Number Formatter` · **Gratis** (changelog: "no longer premium").
**Campos comunes:** Action Name · **Action Type**.
| Action Type | Parámetros (todos obligatorios salvo que se indique) |
|---|---|
| Text to Number | Select Field, Input Decimal Mark |
| Format Number | Select Field, Input Decimal Mark, To Format |
| Format Phone Number | Select Field, To Format (p. ej. E.164), Phone Number Country Code |
| Format Currency | Select Field, Currency (USD, EUR…), Currency Locale (en-US…) |
| Random Number | Lower Range, Upper Range, Decimal Points (opcional) |

**Salida:** variable en el selector. La sintaxis literal **(no confirmado en doc oficial)**.
**Uso típico:** normalizar a E.164 un teléfono que llega de un webhook antes de hacer un upsert o un envío.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/155000003355-workflow-action-number-formatter · https://ideas.gohighlevel.com/changelog/number-formatter-and-date-formatter-actions-are-now-free

---

## 12. Date/Time Formatter

**Nombre:** `Date/Time Formatter` · **Gratis** según el changelog "Number Formatter and Date Formatter… no longer premium features". Artículos más antiguos todavía lo llaman "Premium Action".
**Operaciones y campos:**
| Operación | Campos | Variable de salida (oficial) |
|---|---|---|
| **Format Date** | Campo (Specific Date, Current Date, fechas del contacto, custom values, Inbound Webhook) · **From Format** (se detecta solo en campos del sistema; hay que elegirlo en custom values o webhooks) · **To Format** | `{{datetime_formatter.1.date}}` |
| **Format Date-Time** | Campo (Specific Date/Time, Current Date/Time, horas de la cita, custom values, Inbound Webhook) · From Format · To Format | `{{datetime_formatter.1.datetime}}` |
| **Compare Dates** | Start Date + formato · End Date + formato | `{{datetime_formatter.1.days}}` (= End − Start; sale negativo si Start > End) |

**Trampas:**
- Los **custom fields de contacto no admiten estructura Date-Time**; solo guardan la fecha.
- Si el From Format no coincide con el formato real de la entrada, la acción falla.
- Zona horaria: usa la **zona horaria por defecto del sistema**. Normaliza la zona antes si es importante.
- El catálogo literal de formatos de salida **(no confirmado en doc oficial)**; se elige de una lista en la UI.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/48001238249-guide-to-date-time-formatter-workflow-action · https://help.gohighlevel.com/support/solutions/articles/48001237982-workflow-date-time-formatter-action

---

## 13. Array Functions / Array Formatter

**Nombre:** `Array Formatter` (antes "Array Functions") · **Gratis** ("free to use as a standard workflow execution billed at $0").
**Entrada:** arrays que llegan de triggers de Shopify, de **Inbound Webhook** o de la **respuesta de un Custom Webhook**. Solo **arrays planos**: no admite arrays anidados.
| Action Type | Parámetros | Salida |
|---|---|---|
| Find | Key, Value | El **primer** objeto que coincide |
| Find by Index | Index (empieza en 0) | Un elemento |
| Filter | Key, Value (admite varios filtros; valores dinámicos) | Array de coincidencias |
| Line Items | Pares clave/valor por elemento | Array reestructurado (para webhook, Google Sheets o Email Builder) |
| Math | Sum / Min / Max / Average / Count + campo | Un número |

**Salida:** variables en el selector. La sintaxis literal **(no confirmado en doc oficial)**.

Fuente: https://help.gohighlevel.com/support/solutions/articles/155000001466-workflow-action-array-functions-premium-

---

## 14. Custom Code

**Nombre:** `Custom Code` · **Premium** (lo dice el artículo "Build with AI").
**Lenguaje:** **JavaScript** (por defecto). El artículo 155000003362 dice además **"JavaScript and Python"**, mientras que el 155000002253 dice que solo JavaScript. Hay que verificar en la UI si Python está disponible en la cuenta.
**Campos:**
| Campo | Obligatorio | Notas |
|---|---|---|
| Action Name | Sí | |
| Language | Sí | JavaScript (/Python) |
| Property to Include in Code | Sí | Pares clave/valor mapeados desde triggers o pasos anteriores |
| Code | Sí | Se ejecuta dentro de una **función async** |

**Entradas en el código:** `inputData.<clave>` o `inputData['clave']`.
**Salida:** tiene que ser un **objeto o un array de objetos**. Ejemplos oficiales: `output = { result: sum };` o `return { emailDomain: domain, formattedPhone: formattedPhone };`.
**Referencia en pasos siguientes:** los campos del objeto devuelto aparecen en el selector bajo la acción, **pero solo después de un Test con éxito**. La sintaxis literal **(no confirmado en doc oficial)**.
**Pruebas:** con propiedades, se meten valores de ejemplo en la pestaña **Test Setup**; se pulsa **"Test your code"** y el resultado es "Test Result Success/Failed".
**Extras:** botón **HTTP Request** (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS) para llamar a APIs; `console.log` queda registrado; **Format Code**; **Build with AI** (beta) genera el código a partir de una descripción.
**Límites y trampas:**
- **Sin un Test con éxito, la salida no se puede usar** en los pasos siguientes.
- **Durante el test no viajan los custom values** (solo los datos del contacto). Mete valores de ejemplo.
- **La respuesta total no puede superar 2 MB.** El tiempo máximo y la memoria no están documentados **(no confirmado en doc oficial)**.
- Las claves de las propiedades tienen que coincidir exactamente con las que usa el código.
- Los valores de entrada de cada ejecución se ven en Execution Logs › "more details".

Fuentes: https://help.gohighlevel.com/support/solutions/articles/155000002253-custom-code · https://help.gohighlevel.com/support/solutions/articles/155000003362-workflow-action-custom-code · https://help.gohighlevel.com/support/solutions/articles/155000004692-how-to-generate-custom-code-with-ai-in-workflows

---

## 15. Webhook (Outbound)
> ⚠️ **Verificado en la interfaz (sep 2026):** panel "Webhook". Campos: `ACTION NAME`, `METHOD` (POST por defecto), `URL`, `CUSTOM DATA` (`+ Add item` → fila Key / Value; luego `+ Add another item`) y **`HEADERS`** (`+ Add item`). **Sí tiene headers**, al contrario de lo que dice la doc. **No hay botón de prueba.** Al escribir la URL se abre un desplegable "Custom values" que tapa `+ Add item`: ciérralo con un clic en una zona vacía del panel.

**Nombre:** `Webhook` · Premium: la doc no lo marca como premium.
**Campos:** Action Name · **Method** (por defecto POST) · **URL** · **Custom Data** (pares clave/valor que se añaden).
**Payload que envía:** todos los campos estándar del contacto y sus custom fields; datos de la location; y **solo si el trigger los aporta**, objetos de cita, oportunidad, tarea, factura, pedido, mensaje o nota.
**Trampas:**
- Con triggers genéricos (p. ej. Tag Added) solo va el contacto; no incluye los objetos relacionados.
- No envía imágenes ni archivos.
- No permite configurar headers ni autenticación, y los reintentos no están documentados. Si necesitas auth o capturar la respuesta, usa Custom Webhook.

Fuente: https://help.gohighlevel.com/support/solutions/articles/155000003299-workflow-action-webhook-outbound-

---

## 16. Custom Webhook

**Nombre:** `Custom Webhook` · **Premium** ($0.01 por ejecución).
**Campos:**
| Campo | Valores |
|---|---|
| Event | **CUSTOM** (control total), **POST** (sencillo, cuerpo en pares clave/valor) o **GET** (por query) |
| Method | GET / POST / PUT / DELETE (con Event = CUSTOM) |
| URL | Admite variables en la ruta: `https://api.example.com/contacts/{{contact.id}}` |
| Authorization | **Bearer Token**, **API Key** (en un header), **Basic Auth** (usuario y contraseña), **OAuth2** (token preconfigurado en **Global Workflow Settings**) o **None** |
| Headers | Clave/valor (Content-Type, Authorization, versión de API…) |
| Query Parameters | Clave/valor (p. ej. `email={{contact.email}}`) |
| Content-Type | `application/json` o `application/x-www-form-urlencoded` |
| Body | **Raw Body** (CUSTOM) o **Key/Value** (POST). Admite JSON anidado y arrays, p. ej. `"tags": ["{{contact.tag}}", "new-lead"]` |
| Save response from this Webhook | Opcional. Guarda la respuesta para usarla en pasos siguientes |

Todos los campos (URL, Headers, Query, Body) tienen el icono de etiqueta para insertar valores dinámicos, incluidas las variables de un Inbound Webhook.

**Usar la respuesta en pasos siguientes (changelog oficial):** activa **"Save response from this Webhook"**, envía una **Test Request** para obtener una respuesta válida (queda guardada como referencia de la estructura) y a partir de ahí los campos de la respuesta aparecen como **custom variables** en el selector. Sirven para condiciones de **If/Else**, Update Contact Field, tareas, Google Sheets, **Array Functions**, **Custom Code** y otros Custom Webhook. La sintaxis literal de las variables **(no confirmado en doc oficial)**: insértalas desde el selector. El artículo actual dice que la opción está "available for GET requests"; que esté disponible con otros métodos **(no confirmado en doc oficial)**.

**Errores y reintentos:** según la guía LC, los errores que devuelve la API marcan la acción como **Failed (y se salta)** o la **reintentan con backoff exponencial**. Los timeouts y el número de reintentos no son configurables ni están documentados. Códigos de referencia: 400/422 payload inválido · 401/403 auth · 404 ruta o ID · 409 conflicto · 429 rate limit · 5xx proveedor.

**Trampas:**
- **No hay IP estática** para allowlist: autentica por header.
- La llamada se dispara en cuanto el contacto llega al paso. Dimensiona el receptor para el volumen (Drip ayuda).
- Pruébalo con Test Workflow en borrador y con webhook.site o Postman; el resultado se ve en Execution Logs.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/155000003305-workflow-action-custom-webhook · https://help.gohighlevel.com/support/solutions/articles/48001238167-guide-to-custom-webhook-workflow-action · https://ideas.gohighlevel.com/changelog/save-response-in-custom-webhook-action

---

## 17. Inbound Webhook (trigger, para emparejar)

**Nombre:** trigger `Inbound Webhook` · **Premium**.
- Genera una URL única por trigger. Acepta **POST / GET / PUT**. Solo admite **JSON**, con claves **sin espacios** (camelCase o snake_case).
- Configuración: envía una petición de prueba → copia el ID de la petición que devuelve la respuesta HTTP → elige ese **Mapping Reference** en el trigger → mapea al contacto. Para buscar o crear el contacto hace falta **email o teléfono**; sin ellos, el workflow corre sin contacto y solo con acciones que no dependan de él.
- Los datos quedan disponibles como **custom values** en email, SMS, If/Else, Custom Webhook, formatters, Array Functions, etc. La sintaxis literal del prefijo (se suele ver `{{inboundWebhookRequest.<clave>}}`) **(no confirmado en doc oficial)**: insértala desde el selector.
- Si cambia la estructura del payload, hay que **volver a seleccionar el Mapping Reference**. Si la URL se filtra, borra el trigger y créalo de nuevo (la URL cambia).
- Los arrays del payload se pueden procesar con **Array Formatter**.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/48001237383-how-to-use-the-inbound-webhook-workflow-premium-trigger · https://help.gohighlevel.com/support/solutions/articles/155000003147-workflow-trigger-inbound-webhook

---

## 18. Google Sheets

**Nombre:** `Google Sheets` · **Premium** (cada ejecución cuenta; en **Lookup or Create**, la creación se cobra como una ejecución aparte).
**Campos base:** Action Name · **Action** (tipo) · **Choose an Account** (cuenta de Google integrada) · **Drive** · **Spreadsheet** · **Worksheet** · **Refresh Headers** · **Starting Column** / **Ending Column** · campos dinámicos por columna.
| Action | Campos extra | Notas |
|---|---|---|
| Create Spreadsheet Row | Valores por columna | Siempre añade la fila después de la última fila con número más alto |
| Create Multiple Spreadsheet Row(s) | Número de filas | |
| Lookup Spreadsheet Row | Orden de búsqueda (arriba/abajo), columna(s) y valor(es) | Devuelve la **primera** coincidencia. Las columnas quedan como variables; número de fila: `{{sheet.x.rowNumber}}` (patrón literal de la doc) |
| Lookup Multiple Spreadsheet Row(s) | Row Count | Solo lectura; no recorre las filas para actualizar o borrar. El índice no se puede editar después |
| Lookup or Create | Lookup + valores de creación | |
| Update Specific Spreadsheet Row | Número de fila (fijo o variable) | |
| Update Multiple Spreadsheet Row(s) | Números de fila | |
| Update Spreadsheet Row Using Lookup | Lookup previo (solo uno) | Necesita un Lookup antes |
| Delete Specific Spreadsheet Row | Número de fila | **Vacía el contenido, pero la fila sigue ahí** |
| Delete Spreadsheet Row Using Lookup | Lookup previo | Se salta si el lookup no encuentra nada |

**Trampas:**
- Si cambian los encabezados de la hoja, pulsa **Refresh Headers**.
- Si un Lookup no encuentra nada, **se saltan las acciones que dependen de él**.
- Hace falta la hoja con encabezados con nombre y los premium activados.

Fuentes: https://help.gohighlevel.com/support/solutions/articles/48001238162-guide-to-google-sheets-premium-workflow-action · https://help.gohighlevel.com/support/solutions/articles/155000003294-workflow-action-google-sheets · https://help.gohighlevel.com/support/solutions/articles/155000002097-workflow-action-create-update-multiple-rows-in-google-sheets

---

## 19. Add to Workflow / Remove from Workflow

### Add to Workflow
**Campos:** Action Name · **Target Workflow** (solo uno) · **Pass Input Trigger Parameters** (toggle).
- El contacto entra al inicio del workflow destino sin que haga falta configurar un trigger allí.
- **Pass Input Trigger Parameters** pasa solo los datos del **trigger original** (cita, formulario, encuesta, llamada o conversación, evento personalizado). **No pasa las salidas de pasos posteriores** (respuestas de Custom Code o de API). Para eso, guárdalas antes en campos del contacto.
Fuente: https://help.gohighlevel.com/support/solutions/articles/155000002554-action-add-to-workflow

### Remove from Workflow
**Campos:** Action Name · opción: **Current Workflow** / **Another Workflow** (se elige cuál) / **All Except Current Workflow** / **All Workflows**.
- Se ejecuta en silencio y no se puede deshacer; para volver a meter al contacto hay que inscribirlo de nuevo.
Fuente: https://help.gohighlevel.com/support/solutions/articles/155000002553-workflow-action-remove-from-workflow

---

## 20. Acciones de IA

Todas están en la carpeta oficial "Workflow AI Workflow Actions": https://help.gohighlevel.com/support/solutions/folders/155000000752

### 20.1 GPT powered by OpenAI (id interno `chatgpt`)
- **Campos:** **Model**: GPT-5, GPT-5.1, **GPT-5 Mini (por defecto)**, GPT-5 Nano, GPT-4o, GPT-4 Turbo o GPT-4o Mini · **Prompt** (admite merge fields, p. ej. `{{contact.first_name}}`) · **Temperature** (avanzado, 0.1–1.0).
- **Salida:** `{{chatgpt.1.response}}`. Se usa en email o SMS, se guarda en un custom field o se envía por Slack o webhook.
- **Coste:** categoría "External AI Models": tokens a la tarifa de OpenAI, desde la AI wallet (se aplican el markup de la agencia y el rebilling). GPT-5: $1.25 / $10 por millón de tokens (entrada/salida); 5 Mini: $0.25 / $2; 5 Nano: $0.05 / $0.40; 5.1: $1.25 / $10. Se prorratea a 0.001 M tokens.
- **Trampas:** hay rate limits (en horas pico puede encolar); la ventana de contexto es de 64k–256k según el modelo; valida las salidas antes de que lleguen al cliente.
- https://help.gohighlevel.com/support/solutions/articles/155000000209-workflow-action-gpt-powered-by-openai · https://help.gohighlevel.com/support/solutions/articles/155000005919-gpt-5-in-highlevel-workflows

### 20.2 AI Agent (id interno `ai_agent`) · Premium
- **Campos:** Action Name · **Template** (Form Lead Follow Up, No Show Recovery, Facebook Lead Nurturing, Stale Deal Nudge, Lead Research & Enrichment… o **Build Your Own**) · **Instructions** · **Enhance Prompt** · **Model** (Anthropic, Google u OpenAI; esfuerzo Low / Medium / High en modelos de razonamiento) · **Tools** (máx. **10**, sin contar las internas).
- **Tools:** Send SMS, Email, Update Contact Field y Add Tag (estándar); **Search Knowledge Base** (consulta fija o generada por la IA, número de fragmentos configurable); **Update Custom Value**; acciones premium (se cobran aparte).
- **Avanzado:** **Conversation Memory** (apagado por defecto; guarda un resumen entre ejecuciones del mismo contacto) · **Output Format**: *None* / *Text* (con descripción) / *JSON* (propiedades con nombre, tipo y descripción).
- **Salida:** las propiedades Text o JSON quedan disponibles para los pasos siguientes. La sintaxis literal **(no confirmado en doc oficial)**.
- **Coste:** (tokens × tarifa del modelo) + (ejecuciones de herramientas premium × su tarifa). Los tokens se ven en Execution Logs.
- **Trampa:** una plantilla no se puede usar si falta el trigger que necesita.
- https://help.gohighlevel.com/support/solutions/articles/155000007600-workflow-action-ai-agent

### 20.3 AI Decision Maker · Premium
- **Campos:** Action Name · **Instructions** (reglas de enrutado en lenguaje natural) · **Additional Context** · ramas con **Branch Name** y descripción · **Default Branch** (obligatoria; no se puede borrar ni renombrar).
- Entradas: variables del contacto (`{{contact.engagement_score}}`, `{{contact.tags}}`…), datos de formularios o encuestas y custom fields. Lo que no encaja en ninguna rama va a Default.
- https://help.gohighlevel.com/support/solutions/articles/155000005649-workflow-action-ai-decision-maker

### 20.4 AI Intent Detection · Premium ($0.01 por ejecución)
- **Campo:** Input Text (Static o Dynamic, p. ej. `{{message.body}}`).
- **Ramas fijas:** **POSITIVE / NEGATIVE / NONE**. No guarda una variable; solo enruta. No da puntuación de confianza. Reemplaza al antiguo intent detection de las condiciones de If/Else.
- https://help.gohighlevel.com/support/solutions/articles/155000005885-workflow-action-ai-intent-detection

### 20.5 AI Summarize · Premium ($0.01 por ejecución)
- **Campos:** Action Name · **Max Length** (palabras, caracteres, frases o párrafos, p. ej. "3 sentences") · **Input Text** (fijo o dinámico).
- **Salida:** custom variable en el selector. La sintaxis literal **(no confirmado en doc oficial)**.
- https://help.gohighlevel.com/support/solutions/articles/155000005886-workflow-action-ai-summarize

### 20.6 AI Translate · Premium
- **Campos:** Action Name · **From Language** · **To Language** · **Input Text**.
- **Salida (ejemplo oficial):** `{{workflow_ai_translate_content.2.response}}`, que confirma el patrón `{{<tipo>.<n>.response}}`.
- https://help.gohighlevel.com/support/solutions/articles/155000005892-workflow-action-ai-translate

### 20.7 AI Extract Data · Premium
- **Campos:** **Extract From** (obligatorio; texto de entrada) · **Additional Context** (opcional) · **Data Fields** (nombre + tipo: Text / Email / Phone / Number / Date + descripción). Plantillas: Contact, Opportunity, Order y Appointment info.
- **Salida:** en el selector, como `AI extract data > [Action Name] > [Field Name]`. Si no encuentra un campo, lo deja vacío (controla ese caso con un If/Else).
- https://help.gohighlevel.com/support/solutions/articles/155000007992-workflow-action-ai-extract-data

### 20.8 AI Email Parser · Premium
- **Campos:** Email Content: **Body** (último mensaje) / **Full Body** (con el hilo) / Custom Value · campos a extraer (plantillas New Lead, Order Details, Inquiry, Appointment; tipos Text, Email, Phone Number, Date, Date and Time, URL, Boolean).
- Necesita el trigger de email entrante; activa "Trigger Only for New Email Conversations". **No guarda nada por sí solo**: añade después una acción que lo guarde.
- https://help.gohighlevel.com/support/solutions/articles/155000008742-workflow-action-ai-email-parser

### 20.9 AI Image Generation · Premium
- **Campos:** Model (GPT Image 2, 2.5 Flare, 2.5 Sunburst, Gemini 3 Pro, 3.1 Flash, 2.5 Flash) · Quality · Prompt · Templates · Reference Images (hasta 5) · Size · Background · Output Format (PNG, JPEG, WebP) · Design Kit · Brand Voice.
- **Salidas:** `Image URL`, `Image File Path` e `Image File Name` (las imágenes se guardan en Media Storage). Coste: mediana de unos $0.039 por imagen.
- https://help.gohighlevel.com/support/solutions/articles/155000008497-workflow-action-ai-image-generation

### 20.10 AI Analyze Image · Premium
- **Campos:** Model (según la doc: GPT-5.6 Luna / GPT-5.6 Tera) · **Image URL** (tiene que ser **pública**) · Analysis Prompt · Detail Level (Auto / High / Low). Una imagen por acción. La salida es texto y aparece en el selector.
- https://help.gohighlevel.com/support/solutions/articles/155000008506-workflow-action-ai-analyze-image

### 20.11 Conversation AI (acción) y Update Conversation AI Bot and Status
- **Conversation AI**: envía un mensaje del bot y espera la respuesta. **Campos:** Advanced Bot Configuration (Personality, Additional Instructions) · **Question** · Wait time in seconds · Skip if answered · **Bot responses limit** · **Timeout** · **Channel** (uno: SMS, Facebook, Instagram, WhatsApp o Live Chat). **Ramas:** ramas propias + **Time Out** + **No Condition Met** (estas dos no se pueden quitar). La doc no indica su precio.
  - https://help.gohighlevel.com/support/solutions/articles/155000001358-workflow-actions-conversation-ai
- **Update Conversation AI Bot and Status**: Bot · Status (Active / Inactive) · Keep Same. **No espera** a que termine la conversación. El bot tiene que tener el canal activado.
  - https://help.gohighlevel.com/support/solutions/articles/155000003821-workflow-action-update-conversation-ai-bot-and-status

### 20.12 Otras (proveedores externos)
- **OpenRouter – Generate Response**: System Prompt, Prompt y Model; necesita API key de OpenRouter; la salida es una variable del workflow. https://help.gohighlevel.com/support/solutions/articles/155000007330-workflow-action-openrouter-generate-response
- **Mistral AI**: https://help.gohighlevel.com/support/solutions/articles/155000007779-mistral-ai-workflow-actions
- "Content AI" como acción de workflow independiente: **(no confirmado en doc oficial)**. En la doc, "Content AI" es la familia de funciones de generación de contenido (GPT-4 Turbo). https://help.gohighlevel.com/support/solutions/articles/155000002331-gpt-4-in-highlevel

---

## 21. Sintaxis de campos de combinación (merge fields / custom values)

**Reglas oficiales:**
- Formato `{{objeto.campo}}`. **Distingue mayúsculas y minúsculas**: `{{contact.name}}` funciona y `{{Contact.Name}}` no. Los espacios dentro de las llaves no importan (`{{ attribution.first.url }}` equivale a `{{attribution.first.url}}`).
- En un workflow, escribe `/` o pulsa el icono de etiqueta para insertar un valor. Colores de los chips: azul / amarillo / rojo (ver §0).
- Las variables disponibles dependen de las herramientas activas, del tipo de registro y del trigger.
Fuentes: https://help.gohighlevel.com/support/solutions/articles/155000004390-overview-of-merge-fields-custom-variables · https://help.gohighlevel.com/support/solutions/articles/48001078171

**Contacto:** `{{contact.name}}` `{{contact.first_name}}` `{{contact.last_name}}` `{{contact.email}}` `{{contact.phone}}` `{{contact.phone_raw}}` (formato +15155552345) `{{contact.company_name}}` `{{contact.full_address}}` `{{contact.address1}}` `{{contact.city}}` `{{contact.state}}` `{{contact.postal_code}}` `{{contact.timezone}}` `{{contact.date_of_birth}}` `{{contact.source}}` `{{contact.website}}` `{{contact.id}}`

**Custom fields de contacto:** `{{contact.<clave_del_campo>}}`. La clave exacta la muestra el selector o la configuración del campo. La doc oficial no publica el patrón literal **(no confirmado en doc oficial)**: copia la clave desde Settings › Custom Fields o desde el selector.

**Custom values (globales de la sub-cuenta):** `{{custom_values.<clave>}}`. La clave se genera a partir del nombre ("My Custom Value" pasa a `custom_values.my_custom_value`). Se crean en Settings › Custom Values. https://help.gohighlevel.com/support/solutions/articles/48001161575-how-to-use-custom-values

**Usuario:** `{{user.name}}` `{{user.first_name}}` `{{user.last_name}}` `{{user.email}}` `{{user.phone}}` `{{user.phone_raw}}` `{{user.email_signature}}` `{{user.calendar_link}}` `{{user.call_provider_phone_number}}`

**Cuenta / location:** `{{location.name}}` `{{location.full_address}}` `{{location.address}}` `{{location.city}}` `{{location.state}}` `{{location.country}}` `{{location.postal_code}}` `{{location.email}}` `{{location.phone}}` `{{location.phone_raw}}` `{{location.website}}` `{{location.logo_url}}` `{{location.id}}` `{{location_owner.first_name}}` `{{location_owner.last_name}}` `{{location_owner.email}}`

**Cita:** `{{appointment.title}}` `{{appointment.start_time}}` `{{appointment.only_start_date}}` `{{appointment.only_start_time}}` `{{appointment.end_time}}` `{{appointment.only_end_date}}` `{{appointment.only_end_time}}` `{{appointment.day_of_week}}` `{{appointment.month}}` `{{appointment.timezone}}` `{{appointment.cancellation_link}}` `{{appointment.reschedule_link}}` `{{appointment.meeting_location}}` `{{appointment.notes}}` `{{appointment.add_to_calendar}}` `{{appointment.add_to_google_calendar}}` `{{appointment.add_to_ical}}` `{{appointment.user.name}}` `{{appointment.user.email}}` `{{appointment.user.phone}}` · Calendario: `{{calendar.name}}`

**Service Booking:** `{{servicebooking.title}}` `{{servicebooking.start_time}}` `{{servicebooking.end_time}}` `{{servicebooking.start_date}}` `{{servicebooking.timezone}}` `{{servicebooking.total_price}}` `{{servicebooking.reschedule_link}}` `{{servicebooking.cancellation_link}}` (líneas: `{{this.name}}` `{{this.price}}`…)

**Oportunidad:** la doc oficial solo muestra el patrón genérico `{{opportunity.xyz}}` y recomienda **elegir los campos desde el menú Merge Fields**, no escribirlos a mano. Campos concretos como `{{opportunity.name}}` o `{{opportunity.monetary_value}}` **(no confirmado en doc oficial)**. https://help.gohighlevel.com/support/solutions/articles/155000004039-documents-contracts-templates-with-opportunity-custom-values

**Mensaje (trigger de respuesta):** `{{message.body}}` `{{message.subject}}`
**Campaña o evento:** `{{campaign.event_date_time}}` `{{campaign.event_date}}` `{{campaign.event_time}}`
**Factura:** `{{invoice.name}}` `{{invoice.number}}` `{{invoice.issue_date}}` `{{invoice.due_date}}` `{{invoice.sub_total}}` `{{invoice.discount_amount}}` `{{invoice.tax_amount}}` `{{invoice.total_amount}}` `{{invoice.url}}` (y los grupos `invoice.company.*`, `invoice.customer.*`, `invoice.sender.*`, `invoice.card.brand/last4`)
**Cursos:** `{{courses.categoryTitle}}` `{{courses.productTitle}}` `{{courses.postTitle}}`
**Atribución (primera / última):** `{{contact.attributionSource.<campo>}}` / `{{contact.lastAttributionSource.<campo>}}`, donde `<campo>` es sessionSource, url, campaign, utmSource, utmMedium, utmContent, utmCampaign (en "last"), utmKeyword, utmMatchType, referrer, campaignId, clickId, adGroupId o adId.

**Fecha y hora actuales ("Right Now"):** `{{right_now.second}}` `{{right_now.minute}}` `{{right_now.hour}}` `{{right_now.hour_ampm}}` `{{right_now.ampm}}` `{{right_now.day_of_week}}` `{{right_now.month_name}}` `{{right_now.day}}` `{{right_now.month}}` `{{right_now.year}}` `{{right_now.middle_endian_date}}` (MM/DD/YYYY) `{{right_now.little_endian_date}}` (DD/MM/YYYY). La correspondencia endian→formato sigue la convención habitual **(no confirmado en doc oficial)**.

**Formato de fechas:**
- Los merge fields de cita ya vienen formateados: fecha y hora completas ("Wed, Nov 5, 2025 3:30 PM"), solo fecha (`only_start_date`, "Nov 5, 2025") y solo hora (`only_start_time`, "3:30 PM").
- No existe un filtro de formato dentro del merge field (del tipo `{{x | date:"..."}}`) **(no confirmado en doc oficial)**. Para cambiar el formato se usa la acción **Date/Time Formatter** (§12).

**Datos de trigger y de pasos:**
- Inbound Webhook: custom values del payload mapeado (§17). Prefijo literal **(no confirmado en doc oficial)**.
- Salidas documentadas literalmente: `{{chatgpt.1.response}}`, `{{workflow_ai_translate_content.2.response}}`, `{{datetime_formatter.1.date|datetime|days}}` y `{{sheet.x.rowNumber}}`.
- Custom Webhook (respuesta guardada), Custom Code, Text/Number/Array Formatter, AI Agent y AI Summarize: se insertan desde el selector; la sintaxis literal **(no confirmado en doc oficial)**.

**Valores por defecto (fallback):**
- **Solo en email** (asunto, preheader y cuerpo; en workflows, campañas, envíos masivos y plantillas): `{{default contact.firstname "there"}}`. Se configura en cada uso y no modifica el CRM. https://help.gohighlevel.com/support/solutions/articles/155000007825-set-defaults-for-custom-values-in-emails
- En SMS y otros campos de workflow **no hay fallback documentado**. Usa **Text Formatter › Default Value** o un If/Else con **Is Empty**.

---

## 22. Tabla resumen: dónde queda la salida de cada acción

| Acción | ¿Produce variable? | Referencia | Premium |
|---|---|---|---|
| If/Else, Split, Goal Event, Go To, Wait, Drip | No (solo enrutan o esperan) | — | No |
| Math Operation | No (escribe en Update Field) | Merge field del campo destino | No |
| Update Custom Value | No (cambia el valor global) | `{{custom_values.<clave>}}` | No |
| Text Formatter | Sí | Selector (literal no confirmado) | No |
| Number Formatter | Sí | Selector (literal no confirmado) | No (ya gratis) |
| Date/Time Formatter | Sí | `{{datetime_formatter.N.date / datetime / days}}` | No (ya gratis) |
| Array Formatter | Sí | Selector | No ($0) |
| Custom Code | Sí (tras un Test con éxito) | Selector | Sí |
| Webhook (Outbound) | No | — | No indicado |
| Custom Webhook | Sí (con "Save response" + Test Request) | Selector / If/Else | Sí |
| Google Sheets Lookup | Sí | Columnas por nombre; `{{sheet.x.rowNumber}}` | Sí |
| GPT powered by OpenAI | Sí | `{{chatgpt.N.response}}` | Tokens (AI wallet) |
| AI Translate | Sí | `{{workflow_ai_translate_content.N.response}}` | Sí |
| AI Summarize / Extract Data / Email Parser / Analyze Image / Image Generation | Sí | Selector | Sí |
| AI Agent | Sí (si Output Format es Text o JSON) | Selector | Sí (tokens + herramientas) |
| AI Intent Detection / Decision Maker | No (ramas) | — | Sí |

---

## Fuentes

**Help Center (help.gohighlevel.com)**
- https://help.gohighlevel.com/support/solutions/articles/155000002471-workflow-action-if-else
- https://help.gohighlevel.com/support/solutions/articles/155000004050-if-else-workflow-action-appointment-filter-options
- https://help.gohighlevel.com/support/solutions/articles/155000002470-workflow-action-wait
- https://help.gohighlevel.com/support/solutions/articles/155000003328-workflow-action-goal-event
- https://help.gohighlevel.com/support/solutions/articles/155000003377-workflow-action-go-to
- https://help.gohighlevel.com/support/solutions/articles/155000006690-go-to-connections-for-triggers-advanced-builder-workflow
- https://help.gohighlevel.com/support/solutions/articles/155000006635-advanced-builder-for-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000003304-workflow-action-split
- https://help.gohighlevel.com/support/solutions/articles/155000003360-workflow-action-drip
- https://help.gohighlevel.com/support/solutions/articles/155000006472-new-drip-mode-architecture-for-bulk-actions
- https://help.gohighlevel.com/support/solutions/articles/155000003356-workflow-action-math-operation
- https://help.gohighlevel.com/support/solutions/articles/155000003353-workflow-action-update-custom-values
- https://help.gohighlevel.com/support/solutions/articles/155000003361-workflow-action-text-formatter
- https://help.gohighlevel.com/support/solutions/articles/155000002065-text-formatter-how-to-format-text-the-way-you-want
- https://help.gohighlevel.com/support/solutions/articles/155000003355-workflow-action-number-formatter
- https://help.gohighlevel.com/support/solutions/articles/48001238249-guide-to-date-time-formatter-workflow-action
- https://help.gohighlevel.com/support/solutions/articles/48001237982-workflow-date-time-formatter-action
- https://help.gohighlevel.com/support/solutions/articles/155000001466-workflow-action-array-functions-premium-
- https://help.gohighlevel.com/support/solutions/articles/155000002253-custom-code
- https://help.gohighlevel.com/support/solutions/articles/155000003362-workflow-action-custom-code
- https://help.gohighlevel.com/support/solutions/articles/155000004692-how-to-generate-custom-code-with-ai-in-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000003299-workflow-action-webhook-outbound-
- https://help.gohighlevel.com/support/solutions/articles/155000003305-workflow-action-custom-webhook
- https://help.gohighlevel.com/support/solutions/articles/48001238167-guide-to-custom-webhook-workflow-action
- https://help.gohighlevel.com/support/solutions/articles/48001237383-how-to-use-the-inbound-webhook-workflow-premium-trigger
- https://help.gohighlevel.com/support/solutions/articles/155000003147-workflow-trigger-inbound-webhook
- https://help.gohighlevel.com/support/solutions/articles/48001238162-guide-to-google-sheets-premium-workflow-action
- https://help.gohighlevel.com/support/solutions/articles/155000003294-workflow-action-google-sheets
- https://help.gohighlevel.com/support/solutions/articles/155000002097-workflow-action-create-update-multiple-rows-in-google-sheets
- https://help.gohighlevel.com/support/solutions/articles/155000002554-action-add-to-workflow
- https://help.gohighlevel.com/support/solutions/articles/155000002553-workflow-action-remove-from-workflow
- https://help.gohighlevel.com/support/solutions/folders/155000000752 (Workflow AI actions)
- https://help.gohighlevel.com/support/solutions/articles/155000000209-workflow-action-gpt-powered-by-openai
- https://help.gohighlevel.com/support/solutions/articles/155000005919-gpt-5-in-highlevel-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000002331-gpt-4-in-highlevel
- https://help.gohighlevel.com/support/solutions/articles/155000007600-workflow-action-ai-agent
- https://help.gohighlevel.com/support/solutions/articles/155000005649-workflow-action-ai-decision-maker
- https://help.gohighlevel.com/support/solutions/articles/155000005885-workflow-action-ai-intent-detection
- https://help.gohighlevel.com/support/solutions/articles/155000005886-workflow-action-ai-summarize
- https://help.gohighlevel.com/support/solutions/articles/155000005892-workflow-action-ai-translate
- https://help.gohighlevel.com/support/solutions/articles/155000007992-workflow-action-ai-extract-data
- https://help.gohighlevel.com/support/solutions/articles/155000008742-workflow-action-ai-email-parser
- https://help.gohighlevel.com/support/solutions/articles/155000008497-workflow-action-ai-image-generation
- https://help.gohighlevel.com/support/solutions/articles/155000008506-workflow-action-ai-analyze-image
- https://help.gohighlevel.com/support/solutions/articles/155000001358-workflow-actions-conversation-ai
- https://help.gohighlevel.com/support/solutions/articles/155000003821-workflow-action-update-conversation-ai-bot-and-status
- https://help.gohighlevel.com/support/solutions/articles/155000007330-workflow-action-openrouter-generate-response
- https://help.gohighlevel.com/support/solutions/articles/155000007779-mistral-ai-workflow-actions
- https://help.gohighlevel.com/support/solutions/articles/155000005678-how-to-enable-and-rebill-premium-features-for-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000003971-workflows-pro-plan-new-pricing-tiers
- https://help.gohighlevel.com/support/solutions/articles/155000004390-overview-of-merge-fields-custom-variables
- https://help.gohighlevel.com/support/solutions/articles/48001078171
- https://help.gohighlevel.com/support/solutions/articles/48001161575-how-to-use-custom-values
- https://help.gohighlevel.com/support/solutions/articles/155000007825-set-defaults-for-custom-values-in-emails
- https://help.gohighlevel.com/support/solutions/articles/155000004039-documents-contracts-templates-with-opportunity-custom-values

**Changelog / Ideas (ideas.gohighlevel.com)**
- https://ideas.gohighlevel.com/changelog/save-response-in-custom-webhook-action
- https://ideas.gohighlevel.com/changelog/new-workflow-pricing-categories-premium-features-ai-models
- https://ideas.gohighlevel.com/changelog/number-formatter-and-date-formatter-actions-are-now-free
- https://ideas.gohighlevel.com/changelog/introducing-premium-triggers-actions-the-next-level-of-workflow-automation
- https://ideas.gohighlevel.com/changelog/ai-actions-in-workflows-now-more-powerful
- https://ideas.gohighlevel.com/changelog/ai-agent-action-update-custom-value-tool
- https://ideas.gohighlevel.com/changelog/smarter-field-pickers-for-custom-values-if-else-in-workflows
- https://ideas.gohighlevel.com/changelog/workflow-dynamic-values-new-chip-interface-with-quick-add-and-edit
- https://ideas.gohighlevel.com/changelog/introducing-branches-and-pause-execution-for-marketplace-actions
- https://ideas.gohighlevel.com/automations/p/built-in-loop-action-inside-workflows
