# Acciones de workflow de HighLevel: Contacto y Comunicación (referencia oficial)

> **Cómo usar este archivo:** busca la acción por su nombre exacto en el constructor (en inglés, tal como aparece en GHL), copia sus campos y revisa las "Trampas" antes de meterla en un workflow. Cada bloque cita su artículo oficial. Lo que no aparece en la documentación oficial va marcado **(no confirmado en doc oficial)**.

Investigado el 23-sep-2026. Fuentes: help.gohighlevel.com (HighLevel Support Portal) e ideas.gohighlevel.com/changelog. La lista base de categorías sale de "A List of Workflow Actions": https://help.gohighlevel.com/support/solutions/articles/155000002294-what-are-workflow-actions-complete-list-

---

## Índice

**Convenciones comunes**
- [0. Reglas transversales (merge fields, DND, Time Window, premium)](#0-reglas-transversales)

**A. Acciones de contacto (categoría "Contact")**
1. [Create Contact](#a1-create-contact)
2. [Find Contact](#a2-find-contact)
3. [Update Contact Field](#a3-update-contact-field)
4. [Add Contact Tag](#a4-add-contact-tag)
5. [Remove Contact Tag](#a5-remove-contact-tag)
6. [Assign To User](#a6-assign-to-user)
7. [Remove Assigned User](#a7-remove-assigned-user)
8. [Edit Conversation](#a8-edit-conversation)
9. [DND Contact (Enable/Disable DND)](#a9-dnd-contact-enabledisable-dnd)
10. [Add to Notes / Add Note](#a10-add-to-notes--add-note)
11. [Add Task](#a11-add-task)
12. [Copy Contact (to Sub Account)](#a12-copy-contact-to-sub-account)
13. [Delete Contact](#a13-delete-contact)
14. [Modify Contact Engagement Score](#a14-modify-contact-engagement-score)
15. [Add Contact Follower / Remove Contact Follower](#a15-add-contact-follower--remove-contact-follower)
16. [Merge Contact](#a16-merge-contact)
17. [Log External Call](#a17-log-external-call)
18. [Add to Workflow (Internal Tools)](#a18-add-to-workflow)
19. [Remove from Workflow (Internal Tools)](#a19-remove-from-workflow)
20. [Update Custom Value (Internal Tools)](#a20-update-custom-value)
21. [Otras acciones de la carpeta "Contact" (solo índice)](#a21-otras-acciones-listadas-en-la-carpeta-contact)

**B. Acciones de comunicación (categoría "Communication")**
1. [Send Email](#b1-send-email)
2. [Send SMS](#b2-send-sms)
3. [WhatsApp](#b3-whatsapp)
4. [WhatsApp Customer Service Window Check](#b4-whatsapp-customer-service-window-check)
5. [Messenger](#b5-messenger)
6. [Instagram DM](#b6-instagram-dm)
7. [Facebook Interactive Messenger](#b7-facebook-interactive-messenger)
8. [Instagram Interactive Messenger](#b8-instagram-interactive-messenger)
9. [Reply In Comments](#b9-reply-in-comments)
10. [GMB Messaging](#b10-gmb-messaging)
11. [Send Live Chat Message](#b11-send-live-chat-message)
12. [Call](#b12-call)
13. [Voicemail](#b13-voicemail)
14. [Manual Action: Manual SMS / Manual Call](#b14-manual-action-manual-sms--manual-call)
15. [Send Internal Notification](#b15-send-internal-notification)
16. [Send Review Request](#b16-send-review-request)
17. [Send Slack Message](#b17-send-slack-message)
18. [Conversation AI](#b18-conversation-ai)
19. [Update Conversation AI Bot and Status](#b19-update-conversation-ai-bot-and-status)

[Fuentes](#fuentes)

---

## 0. Reglas transversales

**Merge fields / custom values**
- Sintaxis `{{objeto.campo}}`, sensible a mayúsculas: `{{contact.first_name}}`, `{{contact.email}}`, `{{appointment.start_time}}`, `{{custom_values.clave}}`. Se insertan desde el selector de custom values (icono `{}`) en cualquier campo de texto que lo muestre.
- Si el contexto del workflow no tiene el dato (p. ej. `{{appointment.*}}` en un workflow sin trigger de cita), **el campo sale en blanco** (lo dice el artículo de Send Email).
- Guía: https://help.gohighlevel.com/support/solutions/articles/155000004390-overview-of-merge-fields-custom-variables

**DND (Do Not Disturb)**
- Canales de DND: Email, SMS, Calls, Facebook Messenger, GMB, WhatsApp. Se puede activar para todos o por canal. El DND **Inbound** solo cubre llamadas y SMS y es global.
- Efecto en workflows: los pasos de comunicación del canal con DND **se saltan** para ese contacto; el resto de pasos (tags, tareas, SMS si el DND es solo de email…) siguen. Para volver a enviar hay que quitar el DND.
- https://help.gohighlevel.com/support/solutions/articles/48001214849-how-to-use-do-not-disturb-dnd-
- Rebotes de email pueden activar DND de email solos (opción de cuenta): https://help.gohighlevel.com/support/solutions/articles/155000008249-auto-enable-email-dnd-when-a-contact-s-email-bounces

**Settings del workflow que afectan a la comunicación**
- **Time Window**: solo retrasa acciones de comunicación. **Sender Details**: nombre, email y teléfono por defecto; cada acción puede sobrescribirlos. **Stop on Response**: saca al contacto si responde.
- https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview

**Premium (cobro por ejecución)**
- En este ámbito son premium **Send Slack Message** y **Copy Contact** (según su artículo). El resto de premium (Custom Webhook, Google Sheets, Custom Code, formatters…) está en otras familias.
- https://help.gohighlevel.com/support/solutions/articles/155000005678-how-to-enable-and-rebill-premium-features-for-workflows

**Límites de SMS**
- Si un Send SMS se ejecuta con el límite de mensajería o el "Ramp" agotado, **falla y no se reintenta**. Revisa los Execution Logs.
- https://help.gohighlevel.com/support/solutions/articles/155000006385-how-to-increase-messaging-limits-

---

# A. Acciones de contacto

## A1. Create Contact
- **Qué hace:** crea un contacto nuevo o, si ya existe uno que coincide por **email o teléfono**, **actualiza** ese registro (no duplica).
- **Campos:**
  - Campos estándar a mapear: First Name, Last Name, Full Name, Email, Phone, Address, City, Country…
  - Custom fields de contacto (cualquiera de la cuenta).
  - Valores estáticos o dinámicos (merge fields / datos del trigger).
- **Obligatorios:** la doc no los detalla **(no confirmado en doc oficial)**. En la práctica hace falta email o teléfono para poder casar el contacto.
- **Uso típico:** tras un trigger **Inbound Webhook** o un trigger de app del Marketplace (workflows que arrancan sin contacto).
- **Trampas:** no documenta ramas ni gestión de errores; que "actualice si existe" puede sobrescribir datos buenos con vacíos si el mapeo trae campos en blanco **(no confirmado en doc oficial)**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002685-workflow-action-create-contact

## A2. Find Contact
- **Qué hace:** busca un contacto existente por criterios y lo mete en el contexto del workflow. Crea dos ramas.
- **Campos:**
  - **Action Name**.
  - **Match Fields** (uno o varios): campos estándar (Email, Phone, First Name, Last Name…), custom fields (p. ej. "Customer ID") o identificadores externos guardados en custom fields (p. ej. Stripe Customer ID).
  - Casilla para **incluir emails/teléfonos adicionales** además del principal.
- **Lógica:** **AND** entre todos los campos (deben coincidir todos).
- **Ramas:** **Contact Found** / **Contact Not Found**. En "Found" las acciones siguientes operan sobre el contacto encontrado; en "Not Found" lo normal es poner Create Contact.
- **Trampas:** si varios contactos cumplen, hay que afinar criterios (la doc no dice cuál elige); el formato de los datos (teléfonos, mayúsculas) influye en la coincidencia; el custom field debe existir y estar relleno.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002686-workflow-action-find-contact

## A3. Update Contact Field
- **Qué hace:** cambia uno o varios campos (estándar o custom) del contacto.
- **Campos:**
  - **Action Name**.
  - **Action Type**: **Update field data** (reemplaza) · **Add to field data** (añade opciones en campos multiselección sin quitar las que hay) · **Clear field data** (vacía).
  - Selección de campo + **valor** (fijo o **Dynamic Value** con merge fields).
  - Botón **Add Field**: más pares campo-valor en la misma acción.
- **Tipos soportados:** estándar (nombre, email, teléfono, ciudad, país…), custom, multiselección (checkbox múltiple, dropdown múltiple), fechas.
- **Trampas:**
  - **No se puede deshacer.**
  - En multiselección, "Update field data" **reemplaza** todas las opciones; usa "Add to field data" para sumar.
  - Si el campo no existe, la actualización falla.
  - Cambiar un campo puede disparar el trigger **Contact Changed** de otros workflows.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002688-workflow-action-update-contact-field

## A4. Add Contact Tag
- **Qué hace:** añade uno o varios tags al contacto.
- **Campos:**
  - **Action Name**.
  - **Tags**: elegir existentes (uno o varios) o escribir uno nuevo y pulsar **"Add New Tag"** para crearlo al momento.
  - **Tag Mode** (menú de tres puntos): **Standard** o **Dynamic** (tag construido con datos del workflow / merge fields).
- **Trampas:**
  - Los tags **distinguen mayúsculas**: "Facebook" y "facebook" son tags distintos.
  - **Sí dispara** los workflows con trigger **Contact Tag** (riesgo de bucles si ese workflow vuelve a añadir tags).
  - Crear tags nuevos depende de los permisos del usuario.
  - No quita tags: para eso está Remove Contact Tag.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003111-workflow-action-add-contact-tag

## A5. Remove Contact Tag
- **Qué hace:** quita tags concretos o todos.
- **Campos:**
  - **Action Name**.
  - **Tags** (uno o varios). **Obligatorio** salvo que actives el toggle de abajo.
  - **Remove All Tags** (toggle): quita todos los tags; al activarlo el campo Tags queda deshabilitado.
- **Trampas:** "Remove All Tags" también borra tags que usan otros workflows o smart lists; quitar un tag puede disparar el trigger Contact Tag (evento "tag removed").
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003266-workflow-action-remove-contact-tag

## A6. Assign To User
- **Qué hace:** asigna el contacto a un usuario (con reparto round-robin si hay varios).
- **Campos:**
  - **Action Name**.
  - **Select the Users**: en modo Standard, desplegable de usuarios; en modo **Dynamic**, texto con **IDs de usuario o merge tags**.
  - **Split Traffic**: **Equally** (round-robin a partes iguales) o **Unevenly** (pesos por usuario, p. ej. 5:2 o 3:3:1).
  - **Only Apply to Unassigned Contacts** (toggle): si está activo solo asigna a contactos sin dueño; si está apagado **reasigna** aunque ya tengan.
- **Trampas:** con el toggle apagado sobrescribe asignaciones previas; el round-robin ponderado recorre todo el ciclo antes de repetirse; el usuario asignado es quien recibe Call, Manual Actions y las notificaciones "Assigned User".
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003300-workflow-action-assign-to-user

## A7. Remove Assigned User
- **Qué hace:** deja el contacto sin usuario asignado.
- **Campos:** solo **Action Name**.
- **Trampas:** no borra el historial de asignaciones; puede interferir con otros workflows que dependen del usuario asignado (Call, notificaciones "Assigned User", Manual Actions); no tiene condiciones propias (fíltralo con If/Else).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003268-workflow-action-remove-assigned-user

## A8. Edit Conversation
- **Qué hace:** cambia el estado de la conversación del contacto.
- **Campos:**
  - **Mark as Read/Unread**: **Mark as Read** · **Mark as Unread** · **None** (sin cambio).
  - **Archive/Unarchive**: **Archive** · **Unarchive** (vuelve a Recents) · **None**.
- **Trampas:** con los dos en "None" no hace nada; no avisa a nadie al archivar; actúa sobre la conversación de ese contacto, no en masa.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/48001214153-workflow-action-edit-conversation

## A9. DND Contact (Enable/Disable DND)
- **Nombre:** el artículo la llama **"DND Contact"**; en la lista general aparece como **"Disable/Enable DND"**.
- **Qué hace:** activa o desactiva el DND del contacto.
- **Campos:**
  - Dirección: **Inbound** u **Outbound**.
  - **Enable / Disable**.
  - Alcance: **All Channels** o **Selected Channels** (Email, SMS, Calls, Facebook, GMB, WhatsApp; ver sección 0).
- **Trampas:**
  - Outbound DND hace que **todas** las acciones de comunicación de ese canal se salten en cualquier workflow.
  - Inbound DND solo aplica a llamadas y SMS (llamadas bloqueadas; SMS bloqueados a nivel de sistema, con coste).
  - Queda registrado como "DND Enabled/Disabled by Workflows".
  - Desactivar DND de alguien que pidió baja (STOP) es un riesgo de cumplimiento **(no confirmado en doc oficial; criterio legal/TCPA general)**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003270-workflow-action-dnd-contact

## A10. Add to Notes / Add Note
- **Nombre:** el artículo dice **"Add to Notes"**; la lista general dice **"Add Note"**.
- **Qué hace:** añade una nota al contacto (o al registro, en workflows de custom objects).
- **Campos:**
  - **Note Content**: editor de texto enriquecido (negrita, cursiva, subrayado, tachado, listas, enlaces), con **custom values** y **trigger links**.
  - **Note Title** (opcional, solo en workflows de contacto).
  - **Note Color** (opcional, solo en workflows de contacto).
- **Trampas:** en workflows de custom objects no hay título ni color; añadir la nota dispara el trigger **Note Added**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003143-workflow-action-add-to-notes

## A11. Add Task
- **Qué hace:** crea una tarea para un usuario (la lista general indica que también admite tareas sin contacto).
- **Campos:**
  - **Title** (obligatorio).
  - **Description** (opcional, texto enriquecido).
  - **Assign To** (obligatorio).
  - **Due In** (obligatorio): p. ej. "Now", 1 día, 2 días, 5 días.
  - **Due Time** (opcional).
  - **Exclude Weekends** (opcional): no cuenta fines de semana.
  - **Due Date Preview**: vista previa de la fecha calculada.
- **Merge fields:** no documentados en el artículo **(no confirmado en doc oficial)**.
- **Trampas:** crear la tarea dispara los triggers **Task Added** y **Task Reminder**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003375-workflow-action-add-task

## A12. Copy Contact (to Sub Account)
- **Nombre:** artículo "Copy Contact To Sub Account"; en el constructor **"Copy Contact"**.
- **Qué hace:** duplica el contacto en otra sub-cuenta.
- **Campos:**
  - **Select an Account** (obligatorio): sub-cuenta destino.
  - **Copy Tags** (toggle).
  - **Copy Custom Fields** (toggle).
  - **Add Tags to Sub-Account**: tags extra para la copia.
  - **Update Contact if it Already Exists** (toggle): actualiza en vez de duplicar.
- **Trampas:**
  - **Premium**: cobra por ejecución.
  - **No copia archivos ni documentos**; las referencias a archivos pueden romperse si se borra el original.
  - La doc no aclara los permisos (agencia/sub-cuenta) necesarios **(no confirmado en doc oficial)**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003272-workflow-action-copy-contact-to-sub-account

## A13. Delete Contact
- **Qué hace:** borra el contacto actual del workflow.
- **Campos:** **ninguno** (no se configura).
- **Trampas:**
  - **Termina el workflow**: nada después se ejecuta. Ponla al final.
  - El contacto se puede restaurar **durante 2 meses**, pero conversaciones, notas, tareas e historial de actividad **se pierden para siempre**.
  - Revisa los filtros tres veces y haz copias de seguridad. Alternativa sin pérdida de datos: **Remove from Workflow**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003423-workflow-actions-delete-contact

## A14. Modify Contact Engagement Score
- **Qué hace:** suma o resta puntos al Engagement Score del contacto.
- **Campos:**
  - Operación: **Add** o **Subtract**.
  - Valor de puntos (número).
- **Trampas:** solo ajustes relativos (no se puede fijar un valor absoluto); la doc no menciona límites; el cambio de puntuación puede disparar el trigger **Contact Engagement Score**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003424-workflow-actions-modify-contact-engagement-score
- Changelog: https://ideas.gohighlevel.com/changelog/contact-engagement-score-triggers-and-actions

## A15. Add Contact Follower / Remove Contact Follower
- **Qué hacen:** añaden o quitan usuarios "followers" del contacto (visibilidad compartida sin ser el asignado).
- **Add Contact Follower:** desplegable para elegir uno o varios followers.
- **Remove Contact Follower:** toggle **quitar todos los followers**; si está apagado, eliges followers concretos de la lista.
- **Trampas:** son followers del contacto, no de la oportunidad (esos van aparte).
- **URLs:**
  - https://help.gohighlevel.com/support/solutions/articles/155000003425-workflow-actions-add-contact-follower
  - https://help.gohighlevel.com/support/solutions/articles/155000003426-workflow-actions-remove-contact-follower

## A16. Merge Contact
- **Qué hace:** deduplica en caliente: si encuentra un duplicado, fusiona el contacto **más nuevo en el más antiguo** (el antiguo sobrevive) y el workflow sigue con el superviviente. Si no hay duplicado, sigue sin cambios.
- **Campos:**
  - **Match By*** (obligatorio): **Email** / **Phone Number** / **Email and Phone Number**.
  - **Action Name** (por defecto "Merge Contact").
- **Trampas:**
  - Goal Events, waits "contact to reply", waits de trigger link y eventos de email enviados **antes** de la fusión pueden fallar (apuntan al ID antiguo).
  - Si el superviviente ya está en este mismo workflow, la ejecución fusionada termina.
  - Con Allow Re-entry apagado no se reinscribe.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000007464-workflow-action-merge-contact

## A17. Log External Call
- **Qué hace:** registra en Conversations una llamada hecha con una herramienta externa (incluida la grabación).
- **Campos (todos deben rellenarse):** **Direction**, **Date**, **To**, **From**, **Call Status**, **Attachment** (grabación). Normalmente se mapean desde un **Inbound Webhook**.
- **Patrón:** Inbound Webhook → If/Else por dirección → Create/Find Contact por teléfono ("From" si es entrante, "To" si es saliente) → Log External Call.
- **Trampas:** si mapeas mal el teléfono según la dirección, la llamada no se asocia al contacto. Inbound Webhook es premium.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003460-workflow-actions-log-external-call

## A18. Add to Workflow
*(Categoría Internal Tools; se incluye por ser acción sobre el contacto.)*
- **Qué hace:** inscribe el contacto en otro workflow.
- **Campos:**
  - **Action Name**.
  - Workflow destino (**uno** por acción).
  - **Pass Input Trigger Parameters** (opcional): pasa los datos del trigger original (cita, formulario, encuesta, llamada/conversación, evento custom) al workflow destino.
- **Trampas:**
  - Solo pasa los datos del **trigger original**, **no** salidas de pasos posteriores (p. ej. respuesta de Custom Code o de un webhook).
  - El workflow destino **no necesita trigger**: el contacto entra por el principio.
  - Para varios workflows, pon varias acciones.
  - La doc no aclara cómo se aplica Allow Re-entry del destino **(no confirmado en doc oficial)**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002554-action-add-to-workflow-workflow-action-add-to-workflow
- API equivalente: `POST /contacts/{contactId}/workflow/{workflowId}`, https://marketplace.gohighlevel.com/docs/ghl/contacts/add-contact-to-workflow/

## A19. Remove from Workflow
*(Internal Tools.)*
- **Qué hace:** saca al contacto de uno o varios workflows.
- **Campos:**
  - **Action Name**.
  - Opción de alcance: **Current Workflow** · **Another Workflow** · **All Except Current Workflow** · **All Workflows**.
  - Selección del workflow (si aplica).
- **Trampas:** no se deshace (hay que reinscribir a mano); el contacto no recibe aviso; "All Workflows" corta también secuencias de otros equipos.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002553-workflow-action-remove-from-workflow

## A20. Update Custom Value
*(Internal Tools; afecta a toda la sub-cuenta, no al contacto.)*
- **Qué hace:** cambia el valor de un **custom value** (variable global de la sub-cuenta).
- **Campos:**
  - **Action Name**.
  - **Custom Value** (cuál).
  - **Current Value** (solo lectura, muestra el actual).
  - **New Value**: estático o dinámico (merge field, p. ej. `{{contact.custom_field}}`).
- **Trampas:**
  - **Es global**: cambia el valor para todo lo que use ese custom value (emails, páginas, otros contactos) **(el efecto global se deduce de qué es un custom value; el artículo no lo dice explícitamente)**.
  - No se puede deshacer. Un custom value por acción. Solo de la misma sub-cuenta.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003353-workflow-action-update-custom-values

## A21. Otras acciones listadas en la carpeta "Contact"
Solo índice: no se detallan aquí (pertenecen a otras familias).
- GPT History: https://help.gohighlevel.com/support/solutions/articles/155000003381-workflow-action-gpt-history
- Add Leads Under an Affiliate: https://help.gohighlevel.com/support/solutions/articles/155000003429-workflow-action-add-leads-under-an-affiliate
- Add Manual Sales For An Affiliate: https://help.gohighlevel.com/support/solutions/articles/155000003459-workflow-action-add-manual-sales-for-an-affiliate
- Generate One Time Booking Link: https://help.gohighlevel.com/support/solutions/articles/155000003461-workflow-action-generate-one-time-booking-link
- Create and Associate Company: https://help.gohighlevel.com/support/solutions/articles/155000006580-workflow-action-create-and-associate-company
- Update Associated Company: https://help.gohighlevel.com/support/solutions/articles/155000006606-workflow-action-update-associated-company
- Clear Associated Company Fields: https://help.gohighlevel.com/support/solutions/articles/155000006607-workflow-action-clear-associated-company-fields
- Go To (también en Internal Tools): https://help.gohighlevel.com/support/solutions/articles/155000003377-workflow-action-go-to

---

# B. Acciones de comunicación

## B1. Send Email
- **Qué hace:** envía un email al contacto.
- **Formas de crear el contenido:**
  - **Quick Compose** (por defecto, editor ligero).
  - **Smart Builder** (modos Design, Code o Plain Text).
  - **Select Template** ("My Templates" o Templates Library). Menú de tres puntos: **Edit Design** / **Remove** / **Settings**.
- **Campos:**
  - **Action Name**.
  - **From Name** y **From Email** (si se dejan vacíos, se usan los Sender Details del workflow; el email debe pertenecer a un dominio de envío configurado, según Workflow Settings).
  - **Subject** (en plantillas, se edita desde Settings de los tres puntos junto al **Preview Text**).
  - **Message / Email Body**, con merge fields (`{{contact.first_name}}`, `{{appointment.start_time}}`…).
  - **Attachments**: archivos (confirmaciones, facturas, fichas de producto).
  - **CC / BCC**: botones que despliegan los campos.
  - **Test Emails** + **Send Test Mail**.
  - **Sync Edits to Template** (casilla): **OFF por defecto** (los cambios se quedan en el paso); **ON** = el paso y la plantilla original se actualizan mutuamente.
  - **Write with AI**: genera asunto y cuerpo a partir de un prompt y un tono (friendly, professional, casual…); **sin coste**.
  - **Advanced settings** (desplegable): **Link Tracking** (clics y CTR por enlace), **UTM Parameters** (añade UTM automáticamente), **Add Tags** (etiqueta a quien abre o hace clic).
  - Botones del editor: **Save** (solo en este paso) / **Save as New Template**.
- **Reply-To:** no aparece en los artículos consultados **(no confirmado en doc oficial)**.
- **Trampas:**
  - Los destinatarios en CC/BCC **no salen en Email Stats**, las direcciones CC/BCC inválidas se ignoran sin avisar y el email de prueba no valida el CC/BCC.
  - Un merge field sin dato en el contexto sale **en blanco**.
  - Con **Sync Edits** activado, un cambio se propaga al momento a otros workflows que usan esa plantilla.
  - Contactos con DND de email (o rebotados, si la cuenta auto-activa DND) **se saltan**.
  - **Snapshots**: las plantillas de las acciones de email se importan ocultas. Empuja plantillas **antes o a la vez** que el workflow, o la acción queda rota. Para actualizar, borra y vuelve a empujar.
  - Copiar un workflow a otra sub-cuenta no lleva las plantillas del constructor de email (ver docs-workflows §1.3).
- **URLs:**
  - https://help.gohighlevel.com/support/solutions/articles/155000002472-workflow-action-send-email
  - https://help.gohighlevel.com/support/solutions/articles/155000006550-new-ui-for-email-actions-in-workflows
  - https://help.gohighlevel.com/support/solutions/articles/155000005553-managing-email-templates-in-workflow-steps
  - https://help.gohighlevel.com/support/solutions/articles/155000006141-how-to-use-the-sync-edit-checkbox-for-email-actions-in-workflows-continuous-sync-
  - https://help.gohighlevel.com/support/solutions/articles/155000005516-ai-powered-email-generation-in-workflow-action
  - https://help.gohighlevel.com/support/solutions/articles/155000005856-snapshot-workflow-email-action-enhanced-flow
  - https://help.gohighlevel.com/support/solutions/articles/155000003902-how-to-analyze-workflow-campaigns-

## B2. Send SMS
- **Qué hace:** envía un SMS al contacto.
- **Campos:**
  - **Action Name**.
  - **Templates** (plantillas de SMS, opcional).
  - **Message**: texto con merge fields.
  - **Attachments**: la doc solo contempla **URLs** a archivos, mapas, entradas… (no adjunto directo).
  - **Test Phone Number**: con selector de país (por defecto el de la sub-cuenta); admite formato local.
- **Número remitente:** no documentado en el artículo; lo toma de los Sender Details o del número por defecto **(no confirmado en doc oficial)**.
- **MMS, límite de caracteres y segmentos:** no documentados en el artículo **(no confirmado en doc oficial)**.
- **Trampas:**
  - DND de SMS o baja (opt-out) = el contacto se salta.
  - Si se agota el **Messaging Limit** o el **Ramp** (LC Phone), el paso **falla y no se reintenta**.
  - En EE. UU. hace falta el registro A2P 10DLC para entregar (política de LC Phone): https://help.gohighlevel.com/support/solutions/articles/48001213941-isv-messaging-policy
  - Solo se envía dentro del **Time Window** del workflow, si está configurado.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002474-workflow-action-send-sms
- Problemas de entrega: https://help.gohighlevel.com/support/solutions/articles/48000981696-troubleshooting-sms-delivery

## B3. WhatsApp
- **Nombre:** **WhatsApp** (artículo: "WhatsApp Send Message").
- **Qué hace:** envía un mensaje de WhatsApp desde un número conectado.
- **Campos:**
  - **Action Name**.
  - Número remitente: solo salen los números en estado **connected**; hay que elegirlo **en cada workflow**.
  - Tipo de mensaje / **Template**: una plantilla aprobada por Meta, o **"None - Manual Text"** (texto libre, válido solo dentro de la ventana de 24 h).
  - Variables de la plantilla o del texto con merge fields (`{{contact.first_name}}`, `{{appointment.date}}`…).
- **Ramas** (con plantillas o flows con botones): **Flow Completed**, **Undelivered**, **Timeout**.
- **Reglas de ventana:**
  - **24 h** de "customer service window" desde el último mensaje del contacto: texto libre permitido.
  - Fuera de la ventana: **solo plantillas aprobadas**, con **coste adicional**.
  - **72 h** "Free Entry Point" si el contacto llegó por un anuncio **Click to WhatsApp** o un CTA de Facebook.
- **Trampas:**
  - Texto libre fuera de la ventana **no se entrega**. Usa antes **WhatsApp Customer Service Window Check**.
  - Necesita WhatsApp activado en la sub-cuenta y plantillas aprobadas.
  - Detalle del mapeo de variables, media y botones: no documentado en el artículo de la acción **(no confirmado en doc oficial)**.
- **URLs:**
  - https://help.gohighlevel.com/support/solutions/articles/155000003531-workflow-action-whatsapp
  - https://help.gohighlevel.com/support/solutions/articles/155000001624-whatsapp-workflow-integration

## B4. WhatsApp Customer Service Window Check
- **Qué hace:** comprueba si la ventana de 24 h de WhatsApp está abierta con el contacto.
- **Campos:** ninguno (evalúa sola).
- **Ramas:** **Open** (manda texto libre) / **Closed** (manda plantilla aprobada).
- **Trampas:** el artículo menciona un tope de **1.000 conversaciones de servicio gratis al mes**; la ventana de 72 h de Click-to-WhatsApp tiene reglas propias.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003533-workflow-action-whatsapp-customer-service-window-check

## B5. Messenger
- **Qué hace:** envía un mensaje por Facebook Messenger.
- **Campos:**
  - **Action Name** (obligatorio).
  - **Templates** (opcional).
  - **Message** (obligatorio; custom values).
  - **Add Attachment** (opcional; imagen, documento, media).
  - **Add files through URL** (opcional).
  - **Test Phone Number** (opcional).
- **Requisitos:** página de Facebook conectada; el contacto debe haber escrito a la página **en las últimas 24 h** antes de llegar a este paso.
- **Trampas:** fuera de las 24 h no se entrega; el DND de Facebook lo salta.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003292-workflow-action-messenger

## B6. Instagram DM
- **Qué hace:** envía un DM de Instagram.
- **Campos:**
  - **Action Name** (obligatorio).
  - **Templates** (opcional).
  - **Message** (obligatorio).
  - **Add Attachment** (opcional).
  - **Add files through URL** (opcional).
- **Requisitos:** cuenta de Instagram conectada; el contacto debe haber escrito **en las últimas 24 h**.
- **Trampas:** igual que Messenger, fuera de la ventana no se entrega.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003293-workflow-action-instagram-dm

## B7. Facebook Interactive Messenger
- **Qué hace:** responde por DM a un comentario de una publicación o a un DM, con botones o respuestas rápidas que crean ramas.
- **Trigger requerido:** Facebook – Comment(s) On A Post o Customer Replied (Messenger).
- **Campos:**
  - **Reply Type**: **Reply to Comment via DM** / **Reply to DM**.
  - Cuerpo del mensaje (custom values, **trigger links**).
  - Adjuntos (subida o URL).
  - **Buttons** (hasta **3**): **Open Website** / **Call Number** / **Perform Action** (crea rama).
  - **Quick Replies** (hasta **13**; cada una crea rama).
  - **Wait Step**: tiempo antes de ir a la rama por defecto (timeout).
- **Trampas:** solo se entrega dentro de las 24 h desde la última interacción (política de Meta); los botones siguen visibles y las quick replies desaparecen al usarlas.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000004661-workflow-action-facebook-interactive-messenger

## B8. Instagram Interactive Messenger
- **Qué hace:** lo mismo que B7, en Instagram.
- **Trigger requerido:** **Instagram Comment on Post** o **Customer Reply (Instagram)**. Sin ellos la acción no aparece.
- **Campos:**
  - **Action Name**.
  - **Reply Type**: Reply to Comment via DM / Reply to DM.
  - Cuerpo del mensaje (custom values, trigger links).
  - Adjunto (subida o URL).
  - **Buttons** **o** **Quick Replies**.
  - **Wait Step/Timeout** (por defecto **1 minuto**) + rama de timeout por defecto.
- **Trampas:** **Quick Replies no se pueden combinar con un adjunto** en el mismo mensaje; ventana de 24 h; cada botón o quick reply crea su propia rama.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000004662-workflow-action-instagram-interactive-messenger

## B9. Reply In Comments
- **Qué hace:** responde públicamente al comentario en Facebook o Instagram.
- **Trigger requerido:** Facebook Comment(s) On A Post / Instagram Comment(s) On A Post.
- **Campos:**
  - **Comments**: hasta **10** respuestas, de las que se elige **una al azar**. Admiten custom values y salidas de acciones de IA previas.
  - **Like Comments** (toggle): dar "me gusta" al comentario.
- **Trampas:** no hay forma de emparejar una respuesta con un comentario concreto sin If/Else o IA antes; solo FB e IG (TikTok no está en el artículo).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003302-workflow-action-reply-in-comments

## B10. GMB Messaging
- **Nombre:** lista general **"GMB Messaging"**; artículo "GMB (Google My Business)"; por defecto la acción se llama "GMB".
- **Qué hace:** envía un mensaje por la mensajería de Google Business Profile.
- **Campos:**
  - **Action Name** (obligatorio).
  - **Message** (obligatorio; custom values con `{}` y trigger links).
- **Trampas:** el artículo no documenta requisitos (que el contacto escriba primero, ventana, estado del servicio de mensajería de Google) **(no confirmado en doc oficial)**; el DND de GMB lo salta.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003290-workflow-action-gmb

## B11. Send Live Chat Message
- **Qué hace:** responde al contacto por el chat widget (live chat).
- **Campos:** no documentados en ningún artículo de ayuda encontrado **(no confirmado en doc oficial)**; el changelog solo anuncia la acción.
- **Relacionado:** trigger Customer Replied con Reply Channel = Live Chat; el Wait "contact to reply" admite el canal Live Chat.
- **Trampas:** presumiblemente requiere una conversación de live chat previa del contacto **(no confirmado en doc oficial)**.
- **URLs:**
  - https://ideas.gohighlevel.com/changelog/live-chat-triggers-and-actions
  - https://ideas.gohighlevel.com/changelog/wait-action-live-chat-response-support

## B12. Call
- **Qué hace:** llamada puente. Primero llama al **usuario asignado** (o, si no hay, al **Company Phone** de Settings > Company). Cuando contesta, suena el susurro y después HighLevel llama al contacto y los conecta.
- **Campos:**
  - **Action Name** (obligatorio).
  - **Call Whisper** (opcional): mensaje TTS para el usuario antes de conectar. Coste de TTS: **$0.00084 por cada 100 caracteres**.
  - **Call Timeout** (obligatorio): segundos antes de abandonar.
  - **Disable Voicemail Detect**: conecta más rápido, pero trata el buzón como respuesta humana.
  - **Connect Call After Keypress**: el usuario debe pulsar una tecla para que se llame al contacto.
- **Trampas:**
  - Si el contacto no tiene usuario asignado, suena el teléfono de la empresa. Pon Assign To User antes.
  - Stop on Response solo cuenta la respuesta del contacto.
  - El TTS se cobra siempre que haya susurro.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003274-workflow-action-call

## B13. Voicemail
- **Qué hace:** deja un mensaje de voz pregrabado (voicemail drop).
- **Campos:**
  - **Action Name** (obligatorio).
  - **File Upload** (obligatorio, botón "Drop Your File").
- **No documentado:** formatos de audio, número remitente, si es "ringless" **(no confirmado en doc oficial)**.
- **Trampas:** los mensajes de voz pregrabados tienen regulación propia (consentimiento TCPA en EE. UU.) **(no confirmado en doc oficial; el artículo no da guía de cumplimiento)**. La acción puede no aparecer en la lista general de 2026, aunque el artículo sigue publicado.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003275-workflow-action-voicemail

## B14. Manual Action: Manual SMS / Manual Call
- **Qué hace:** crea una tarea en **Conversations > Manual Actions** para que una persona envíe el SMS o haga la llamada. En la lista general aparece como **"Manual Action"**; los artículos la separan en **Manual SMS** y **Manual Call**.
- **Campos, Manual SMS:**
  - **Action Name** (obligatorio).
  - **Templates** (opcional).
  - **Message** (obligatorio; custom values y trigger links).
  - **Add Attachment** (URL).
  - **Test Phone Number**.
  - **Assign To** (en Advanced Settings).
- **Campos, Manual Call:**
  - **Action Name**.
  - **Assign To** (en Advanced Settings).
- **Lógica de asignación:** usuario elegido con acceso al contacto → ese usuario; sin acceso → dueño del contacto; sin nadie → **Unassigned**.
- **Trampas:**
  - En Manual Call, **el workflow no avanza** hasta que la tarea se completa o **se borra** en la pestaña Manual Actions. Llamar al contacto desde su ficha **no** completa la tarea.
  - En los logs aparece "Manual Call added to the manual queue".
- **URLs:**
  - https://help.gohighlevel.com/support/solutions/articles/155000003289-workflow-action-manual-sms
  - https://help.gohighlevel.com/support/solutions/articles/155000003376-workflow-action-manual-call

## B15. Send Internal Notification
- **Qué hace:** avisa a **usuarios internos** (no a contactos).
- **Tipos y campos:**
  - **Email**:
    - **From Name**, **From Email** (se usan valores del sistema si van vacíos; ambos admiten custom values).
    - **To User Type**.
    - **CC/BCC**: cada destinatario cuenta como un email aparte (se factura).
    - **Subject** (opcional si la plantilla ya lo trae).
    - **Templates**.
    - **Message** (con **Write with AI**).
    - **Add Attachment**.
  - **In-App Notification** (campana):
    - **Title**.
    - **Message**.
    - **Redirect Page**.
    - **To User Type**.
  - **SMS**:
    - **To User Type**.
    - **Templates**.
    - **Message**.
    - **Add Attachment** (subida o URL).
    - **Test Phone Number**.
  - **WhatsApp**:
    - **To User Type**.
    - **Templates** (aprobadas).
    - **Message**.
- **Destinatarios (To User Type):** **All Users** · **Particular Users** · **Assigned User** (si el contacto no tiene usuario asignado, **se salta**). El artículo también menciona admins y roles.
- **Merge fields:** sí, en título, asunto y mensaje (`{{contact.name}}`, etc.).
- **Trampas:**
  - Límite: **500 notificaciones por usuario cada 5 minutos**.
  - El usuario necesita email o teléfono configurado.
  - Un email o SMS personalizado a un número externo **no está confirmado** en el artículo actual **(no confirmado en doc oficial)**.
  - Slack no está aquí: es la acción aparte Send Slack Message.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003202-workflow-action-internal-notification

## B16. Send Review Request
- **Qué hace:** envía una solicitud de reseña usando las plantillas de **Reputation Settings**.
- **Campos:**
  - **Action Name** (obligatorio).
  - **Review Type** (obligatorio): canal. El artículo de la acción documenta **E-mail**; el de Reputation admite **SMS, Email y WhatsApp**.
- **Trampas:**
  - El mensaje **no se edita en la acción**: se configura en Reputation Settings.
  - Límites por plan, sin detallar.
  - Los SMS están sujetos a Messaging Limits.
  - Si falta el dato de un canal, el sistema usa otro disponible (según el artículo multicanal).
- **URLs:**
  - https://help.gohighlevel.com/support/solutions/articles/155000003291-workflow-action-review-request
  - https://help.gohighlevel.com/support/solutions/articles/155000004803-multi-channel-review-requests
  - https://help.gohighlevel.com/support/solutions/articles/48000980328-how-to-customize-the-review-request-messages-sms-email-

## B17. Send Slack Message
- **Nombre:** lista general "Send Slack Message"; artículo "Slack Message".
- **Qué hace:** envía un mensaje a Slack.
- **Campos:**
  - **Choose an Account** (obligatorio): workspace de Slack conectado.
  - **Event Type** (obligatorio): **Direct message** a un usuario / canal **privado** / canal **público**.
  - Canal o destinatario (según el Event Type).
  - **Message**.
- **Merge fields:** el artículo no los documenta **(no confirmado en doc oficial)**.
- **Trampas:** **premium**, se cobra cada ejecución (hay que activar la facturación de premium); requiere la integración de Slack conectada.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003273-workflow-action-slack-message

## B18. Conversation AI
- **Qué hace:** el bot de Conversation AI hace una pregunta, espera la respuesta, conversa y enruta el workflow por ramas según lo que diga el contacto.
- **Campos:**
  - **Action Name**.
  - **Question**: primer mensaje del bot (custom values).
  - **Advanced Bot Configuration** (toggle): sobrescribe **Personality** y **Additional Instructions** del bot. Apagado = usa la configuración del bot.
  - **Timeout**: minutos, horas o días.
  - **Channel** (uno por acción): **SMS**, **Facebook**, **Instagram**, **WhatsApp**, **Live Chat**.
  - **Skip if answered**: se salta si ya respondieron a mano.
  - **Bot responses limit**: máximo de mensajes de IA antes de ir a "No Condition Met".
  - **Wait time in seconds**: espera antes de contestar, para agrupar mensajes seguidos.
- **Ramas:** ramas custom (condiciones) + **Time Out** + **No Condition Met**. Estas dos últimas son **fijas y no se pueden quitar**.
- **Trampas:**
  - El coste (créditos o mensajes de IA) no está en el artículo **(no confirmado en doc oficial)**.
  - Los contactos de prueba conservan actividad anterior.
  - Se aplican las ventanas de 24 h de WhatsApp, FB e IG por canal.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000001358-workflow-actions-conversation-ai
- Relacionado: https://help.gohighlevel.com/support/solutions/articles/155000003467-workflow-action-appointment-booking-conversation-ai-booking-bot

## B19. Update Conversation AI Bot and Status
- **Qué hace:** asigna un bot de Conversation AI al contacto y lo activa o desactiva.
- **Campos:**
  - **Bot**: desplegable, o **Keep Same**.
  - **Status**: **Active** / **Inactive**.
- **Trampas:** el bot debe tener activo el canal correspondiente; **no espera** a que termine la conversación (el workflow sigue en el acto); un bot por acción.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003821-workflow-action-update-conversation-ai-bot-and-status

---

## Fuentes

**Índices y carpetas**
- https://help.gohighlevel.com/support/solutions/articles/155000002294-what-are-workflow-actions-complete-list-
- https://help.gohighlevel.com/support/solutions/folders/155000000731 (Workflow Actions)
- https://help.gohighlevel.com/support/solutions/folders/155000001361 (Contact Workflow Actions)
- https://help.gohighlevel.com/support/solutions/folders/155000000749 (Communication Workflow Actions)
- https://help.gohighlevel.com/support/solutions/folders/155000000809 (Social Media Communication)
- https://help.gohighlevel.com/support/solutions/folders/155000000751 (Internal Tools)
- https://help.gohighlevel.com/support/solutions/folders/155000001353 (Workflow Email Action)

**Contacto**
- https://help.gohighlevel.com/support/solutions/articles/155000002685-workflow-action-create-contact
- https://help.gohighlevel.com/support/solutions/articles/155000002686-workflow-action-find-contact
- https://help.gohighlevel.com/support/solutions/articles/155000002688-workflow-action-update-contact-field
- https://help.gohighlevel.com/support/solutions/articles/155000003111-workflow-action-add-contact-tag
- https://help.gohighlevel.com/support/solutions/articles/155000003266-workflow-action-remove-contact-tag
- https://help.gohighlevel.com/support/solutions/articles/155000003300-workflow-action-assign-to-user
- https://help.gohighlevel.com/support/solutions/articles/155000003268-workflow-action-remove-assigned-user
- https://help.gohighlevel.com/support/solutions/articles/48001214153-workflow-action-edit-conversation
- https://help.gohighlevel.com/support/solutions/articles/155000003270-workflow-action-dnd-contact
- https://help.gohighlevel.com/support/solutions/articles/155000003143-workflow-action-add-to-notes
- https://help.gohighlevel.com/support/solutions/articles/155000003375-workflow-action-add-task
- https://help.gohighlevel.com/support/solutions/articles/155000003272-workflow-action-copy-contact-to-sub-account
- https://help.gohighlevel.com/support/solutions/articles/155000003423-workflow-actions-delete-contact
- https://help.gohighlevel.com/support/solutions/articles/155000003424-workflow-actions-modify-contact-engagement-score
- https://help.gohighlevel.com/support/solutions/articles/155000003425-workflow-actions-add-contact-follower
- https://help.gohighlevel.com/support/solutions/articles/155000003426-workflow-actions-remove-contact-follower
- https://help.gohighlevel.com/support/solutions/articles/155000007464-workflow-action-merge-contact
- https://help.gohighlevel.com/support/solutions/articles/155000003460-workflow-actions-log-external-call
- https://help.gohighlevel.com/support/solutions/articles/155000002554-action-add-to-workflow-workflow-action-add-to-workflow
- https://help.gohighlevel.com/support/solutions/articles/155000002553-workflow-action-remove-from-workflow
- https://help.gohighlevel.com/support/solutions/articles/155000003353-workflow-action-update-custom-values
- https://ideas.gohighlevel.com/changelog/contact-engagement-score-triggers-and-actions
- https://marketplace.gohighlevel.com/docs/ghl/contacts/add-contact-to-workflow/

**Comunicación**
- https://help.gohighlevel.com/support/solutions/articles/155000002472-workflow-action-send-email
- https://help.gohighlevel.com/support/solutions/articles/155000006550-new-ui-for-email-actions-in-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000005553-managing-email-templates-in-workflow-steps
- https://help.gohighlevel.com/support/solutions/articles/155000006141-how-to-use-the-sync-edit-checkbox-for-email-actions-in-workflows-continuous-sync-
- https://help.gohighlevel.com/support/solutions/articles/155000002652-how-to-use-email-template-builder-in-the-workflow-send-email-action
- https://help.gohighlevel.com/support/solutions/articles/155000005516-ai-powered-email-generation-in-workflow-action
- https://help.gohighlevel.com/support/solutions/articles/155000005856-snapshot-workflow-email-action-enhanced-flow
- https://help.gohighlevel.com/support/solutions/articles/155000002474-workflow-action-send-sms
- https://help.gohighlevel.com/support/solutions/articles/155000006385-how-to-increase-messaging-limits-
- https://help.gohighlevel.com/support/solutions/articles/48000981696-troubleshooting-sms-delivery
- https://help.gohighlevel.com/support/solutions/articles/48001213941-isv-messaging-policy
- https://help.gohighlevel.com/support/solutions/articles/155000003531-workflow-action-whatsapp
- https://help.gohighlevel.com/support/solutions/articles/155000003533-workflow-action-whatsapp-customer-service-window-check
- https://help.gohighlevel.com/support/solutions/articles/155000001624-whatsapp-workflow-integration
- https://help.gohighlevel.com/support/solutions/articles/155000003292-workflow-action-messenger
- https://help.gohighlevel.com/support/solutions/articles/155000003293-workflow-action-instagram-dm
- https://help.gohighlevel.com/support/solutions/articles/155000004661-workflow-action-facebook-interactive-messenger
- https://help.gohighlevel.com/support/solutions/articles/155000004662-workflow-action-instagram-interactive-messenger
- https://help.gohighlevel.com/support/solutions/articles/155000003302-workflow-action-reply-in-comments
- https://help.gohighlevel.com/support/solutions/articles/155000003290-workflow-action-gmb
- https://ideas.gohighlevel.com/changelog/live-chat-triggers-and-actions
- https://ideas.gohighlevel.com/changelog/wait-action-live-chat-response-support
- https://help.gohighlevel.com/support/solutions/articles/155000003274-workflow-action-call
- https://help.gohighlevel.com/support/solutions/articles/155000003275-workflow-action-voicemail
- https://help.gohighlevel.com/support/solutions/articles/155000003289-workflow-action-manual-sms
- https://help.gohighlevel.com/support/solutions/articles/155000003376-workflow-action-manual-call
- https://help.gohighlevel.com/support/solutions/articles/155000003202-workflow-action-internal-notification
- https://help.gohighlevel.com/support/solutions/articles/155000003291-workflow-action-review-request
- https://help.gohighlevel.com/support/solutions/articles/155000004803-multi-channel-review-requests
- https://help.gohighlevel.com/support/solutions/articles/48000980328-how-to-customize-the-review-request-messages-sms-email-
- https://help.gohighlevel.com/support/solutions/articles/155000003273-workflow-action-slack-message
- https://help.gohighlevel.com/support/solutions/articles/155000001358-workflow-actions-conversation-ai
- https://help.gohighlevel.com/support/solutions/articles/155000003821-workflow-action-update-conversation-ai-bot-and-status
- https://help.gohighlevel.com/support/solutions/articles/155000003467-workflow-action-appointment-booking-conversation-ai-booking-bot

**Transversales**
- https://help.gohighlevel.com/support/solutions/articles/155000004390-overview-of-merge-fields-custom-variables
- https://help.gohighlevel.com/support/solutions/articles/48001214849-how-to-use-do-not-disturb-dnd-
- https://help.gohighlevel.com/support/solutions/articles/155000008249-auto-enable-email-dnd-when-a-contact-s-email-bounces
- https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview
- https://help.gohighlevel.com/support/solutions/articles/155000005678-how-to-enable-and-rebill-premium-features-for-workflows
