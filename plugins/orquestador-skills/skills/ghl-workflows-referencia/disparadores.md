# Disparadores (triggers) de workflows en GoHighLevel: referencia oficial

> Verificado el 23-sep-2026 solo contra fuentes oficiales: help.gohighlevel.com (Support Portal), marketplace.gohighlevel.com/docs e ideas.gohighlevel.com/changelog. Los nombres de UI van en inglés, tal como los muestra el constructor. Lo que no aparece en la doc oficial se marca **(no confirmado en doc oficial)**.

**Cómo usar este archivo:** busca el trigger por categoría (tal como aparecen en el selector "Add New Trigger"). Cada entrada indica qué lo dispara, sus filtros (campo → operadores/valores), las trampas conocidas y el artículo oficial. Antes de montar un workflow, revisa también la sección 0 (reglas generales).

---

## Índice

0. [Reglas generales de los triggers](#0-reglas-generales-de-los-triggers)
1. [Contact](#1-contact)
2. [Company y Custom Objects (workflows por objeto)](#2-company-y-custom-objects)
3. [Events](#3-events)
4. [Appointments](#4-appointments)
5. [Opportunities](#5-opportunities)
6. [Payments](#6-payments)
7. [Ecommerce Stores / Shopify](#7-ecommerce-stores--shopify)
8. [Courses / Memberships / Client Portal / Certificates](#8-courses--memberships--client-portal--certificates)
9. [Communities](#9-communities)
10. [Affiliate](#10-affiliate)
11. [Facebook/Instagram Events y TikTok (comentarios)](#11-facebookinstagram-events-y-tiktok)
12. [IVR y llamadas](#12-ivr-y-llamadas)
13. [Google Ads](#13-google-ads)
14. [Eventos (módulo Events)](#14-eventos-módulo-events)
15. [Conversation AI, Custom Trigger y Marketplace](#15-conversation-ai-custom-trigger-y-marketplace)
16. [Pendientes / no confirmados](#16-pendientes--no-confirmados)
17. [Fuentes](#17-fuentes)

---

## 0. Reglas generales de los triggers

- **Varios triggers por workflow**: cualquiera de ellos inscribe al contacto. Cada uno se evalúa por separado. Los filtros de un trigger admiten lógica AND/OR, según el artículo de narración. En la práctica, varios filtros suelen combinarse con **AND** (así lo documentan LinkedIn, Company Changed y el filtro de tags).
  https://help.gohighlevel.com/support/solutions/articles/155000006636-workflow-trigger-narration-and-statistics
- **Narración y estadísticas**: cada tarjeta de trigger muestra un resumen legible de sus filtros. La vista Stats muestra **Attempted / Matched / Unmatched** por trigger, con el motivo del descarte por contacto y 30 días de histórico. Cualquier contacto evaluado suma a Attempted, cumpla o no los filtros. (Mismo artículo.)
- **Allow Re-entry**: si está apagado, cada contacto entra una sola vez. **Excepción:** los triggers de **cita (appointment)** y de **factura (invoice)** siempre permiten volver a entrar, una vez por cita o factura. Con **Allow multiple Opportunities**, cada oportunidad crea una ejecución independiente. Si la oportunidad cambia mientras está dentro, el workflow sigue con los datos nuevos y no se reinicia.
  https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview
- **Draft = no procesa eventos reales.** Hay que publicar el workflow. Los triggers **no son retroactivos**: solo cuentan los eventos que ocurren con el workflow ya publicado (lo dicen explícitamente Contact Tag, Stale Opportunities, Pipeline Stage Changed y Scheduler).
- **Filtro T&C** (Terms & Conditions): disponible en **Form Submitted**, **Survey Submitted** y **Quiz Submitted**. Opciones: aceptó los T&C / no los aceptó. Quien no ha interactuado con los T&C cuenta como "Not Agreed".
  https://help.gohighlevel.com/support/solutions/articles/155000004610-t-c-filter-for-forms-surveys-quizzes-in-workflows
- **Copiar o borrar triggers** y conexiones Go-To de triggers (Advanced Builder):
  https://help.gohighlevel.com/support/solutions/articles/155000005370-copy-or-delete-triggers-in-workflows ·
  https://help.gohighlevel.com/support/solutions/articles/155000006690-go-to-connections-for-triggers-advanced-builder-workflow
- **Tipo de workflow**: existen workflows **Contact-based** (por defecto), **Company-based** y **Custom Object-based**. Algunos triggers (Company Created/Changed, Object Created/Changed) solo aparecen en su tipo de workflow.
- **Operadores de tag habituales**: `Equals to`, `Not equals to`, `Any of`, `None of`, con multiselección y varios filtros de tag en AND (Contact Created, Contact DND, Opportunity Created y Opportunity Status Changed).
- Listado maestro oficial: https://help.gohighlevel.com/support/solutions/articles/155000002292-a-list-of-workflow-triggers

---

## 1. Contact

### Contact Created
- **Se dispara:** al crear un contacto nuevo por cualquier vía: manual, formulario, API o integración.
- **Filtros:** `Tag` (Equals to / Not equals to / Any of / None of; multiselección, varios en AND); **Custom Fields** del contacto.
- **Trampas:** **las importaciones masivas (bulk import) NO lo disparan**, para evitar sobrecargas. La detección de duplicados puede impedir que se dispare si se "re-crea" un contacto con el mismo email o teléfono (en ese caso se actualiza el existente).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002486-workflow-trigger-contact-created

### Contact Changed
- **Se dispara:** cuando cambian ciertos campos del contacto: custom fields, tags añadidos o quitados, DND, Contact Type (p. ej. Lead → Customer) y usuario asignado.
- **Filtros:** `Custom Field` (campo concreto), `Tags`, `DND Status`, `Contact Type`, `Assigned User`. Admite varios filtros para vigilar varios cambios a la vez.
- **Trampas:** se dispara **cada vez** que hay un cambio vigilado, así que varios cambios dan varias entradas. **No detecta valores borrados**, solo valores nuevos. Para reaccionar a un tag quitado, usa **Contact Tag → Tag Removed**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002477-workflow-trigger-contact-changed

### Contact Tag
- **Se dispara:** al añadir o quitar un tag. Puede provenir de una acción manual (individual o masiva), de una acción de workflow, de una integración (Zapier, solo añadir) o de una importación CSV.
- **Filtros:** `Tag Added` / `Tag Removed` + tag(s) concretos.
- **Trampas:** sin filtro se dispara con **cualquier** cambio de tag. Solo cuenta lo que ocurre con el workflow activo, sin histórico. Todos los workflows con el mismo trigger arrancan **a la vez**. Las integraciones externas solo pueden añadir tags, no quitarlos. Una importación CSV puede disparar Tag Added al actualizar contactos existentes.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002482-workflow-trigger-contact-tag · (versión anterior) https://help.gohighlevel.com/support/solutions/articles/48001213546-workflow-trigger-contact-tag

### Contact DND
- **Se dispara:** al activar o desactivar el DND de un contacto, lo cambie un workflow, un usuario o el propio contacto (queda registrado el origen en la conversación).
- **Filtros:**
  - `DND Direction`: Outbound / Inbound. El Inbound solo aplica a llamadas y SMS.
  - `DND Flag`: Enabled DND for All Channels · Enabled DND for Specific Channels · Disabled DND for All Channels · Disabled DND for Specific Channels.
  - `Channel` (con "Specific Channels"): SMS, Email, Phone Calls, Google My Business Messages, Facebook Messages.
  - `Tag`: Equals to / Not equals to / Any of / None of, varios en AND.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002673-workflow-trigger-contact-dnd

### Birthday Reminder
- **Se dispara:** una vez al día a las **8:00 (zona horaria de la cuenta)** para los contactos cuyo campo Date of Birth coincide con la regla.
- **Filtros:** `After Number of Days`, `Before Number of Days`, `Day Is`, `Month Is`. Se puede combinar con filtros de tag.
- **Trampas:** los contactos sin fecha de nacimiento válida se omiten. Todos los cumpleaños del día se procesan juntos a las 8:00.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002670-workflow-trigger-birthday-reminder · https://help.gohighlevel.com/support/solutions/articles/48000987572-workflow-trigger-birthday-reminder

### Custom Date Reminder
- **Se dispara:** antes, el mismo día o después de la fecha guardada en un campo de fecha.
- **Campos de fecha disponibles según el tipo de workflow:** Contact-based → campos de fecha del contacto y algunos de oportunidad; Custom Object-based → campos de fecha de ese objeto; Company-based → campos de fecha de Company.
- **Filtros:** `Custom Date Field`, `After Number of Days`, `Before Number of Days`, `Day Is`, `Month Is`, `Has Tag`, `Match on Year` (sí/no; con "no" se repite cada año).
- **Trampas:** no se dispara si el campo está vacío. En el mismo workflow puedes poner un trigger "antes" y otro "después" de la misma fecha.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002674-workflow-trigger-custom-date-remimder

### Note Added
- **Se dispara:** al añadir una nota nueva al contacto. Cada nota dispara una vez.
- **Filtros:** `Has Tag`, `Doesn't Have Tag`.
- **Trampas:** borrar una nota no lo dispara.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003248-workflow-trigger-note-added

### Note Changed
- **Se dispara:** al editar una nota existente del contacto.
- **Filtros:** `Has Tag`, `Doesn't Have Tag` (ambos opcionales).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003249-workflow-trigger-note-changed · https://help.gohighlevel.com/support/solutions/articles/48001213879-workflow-triggers-note-changed

### Task Added
- **Se dispara:** al crear una tarea en el registro del contacto.
- **Filtros:** `Assigned User` (uno o varios; opcional). Es el único filtro.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003260-workflow-trigger-task-added

### Task Reminder
- **Se dispara:** en relación con la **fecha de vencimiento** (due date) de una tarea.
- **Filtros:** `Before no. of days`, `After no. of days`.
- **Trampas:** la tarea **necesita due date**. Si cambia el vencimiento, el recordatorio se recalcula. **Se dispara aunque la tarea ya esté completada**, pero no si se borró. Reasignar la tarea no le afecta. El trigger no avisa a nadie por sí mismo: hay que añadir acciones de notificación.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003261-workflow-trigger-task-reminder

### Task Completed
- **Se dispara:** al marcar como completada una tarea asignada a un usuario.
- **Filtros:** `Assigned User` (vacío = cualquier usuario), más filtros por custom field (el artículo pone como ejemplo `Business Niche` y `Description`). Todos opcionales.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003495-workflow-trigger-task-completed · https://help.gohighlevel.com/support/solutions/articles/155000001166-workflow-trigger-task-completed

### Contact Engagement Score
- **Se dispara:** cuando la puntuación de engagement del contacto cumple la regla.
- **Filtros:** `Score` (obligatorio) y `Business Niche` (opcional).
- **Operadores:** Equals to, Greater than, Greater than or Equal to, Less than, Less than or Equal to, Is empty, Is not empty, Contains Phrase, Does not contain Phrase.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003496-workflow-trigger-contact-engagement-score · changelog: https://ideas.gohighlevel.com/changelog/contact-engagement-score-triggers-and-actions

### Trigger Link Clicked (el portal lo archiva en Contact; el constructor lo lista en Events)
- **Se dispara:** cuando el contacto hace clic en un **trigger link** concreto enviado por email, SMS u otro canal.
- **Filtros:** `Trigger link` (**obligatorio**, se elige del desplegable).
- **Trampas:** hace falta que el enlace llegue a un contacto identificado. Los trigger links se gestionan en Marketing › Trigger Links.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003263-workflow-trigger-trigger-link-clicked · https://help.gohighlevel.com/support/solutions/articles/48000981404-trigger-links-overview

---

## 2. Company y Custom Objects

> Solo aparecen en workflows del tipo correspondiente. Changelog: https://ideas.gohighlevel.com/changelog/introducing-company-based-workflows

### Company Created
- **Se dispara:** al crear una empresa por cualquier vía: manual, formulario, importación, API o webhook. Aquí, a diferencia de Contact Created, **las importaciones sí cuentan** según el artículo.
- **Filtros:** opcionales, sobre campos de Company (p. ej. Industry contains…, Company Name contains…, Owner). El artículo no detalla los operadores.
- **Trampas:** solo existe en workflows **Company-based**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000006609-workflow-trigger-company-created

### Company Changed
- **Se dispara:** al actualizar una empresa, si el cambio cumple las condiciones de campo configuradas.
- **Filtros:** campos estándar o custom de Company con operadores `Is not empty` y `Contains Phrase`. Varias condiciones se combinan en **AND**.
- **Trampas:** solo vigila los campos seleccionados.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000006494-workflow-trigger-company-changed

### Custom Object: `<Objeto> Created` / `<Objeto> Changed`
- **Se dispara:** al crear o modificar un registro de un objeto personalizado. El nombre del trigger lleva el nombre del objeto; el ejemplo oficial usa "Home Created" y "Home Changed".
- **Filtros:** cambios de campo del objeto (ejemplo oficial: "Home Status" pasa a "Closed"). Los operadores no están detallados **(no confirmado en doc oficial)**.
- **Trampas:** el objeto tiene que existir antes. Los workflows por objeto también aceptan **Inbound Webhook**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000004389-using-custom-objects-in-workflow-actions-and-triggers · https://help.gohighlevel.com/support/solutions/articles/155000006701-custom-object-and-company-based-workflow-actions-triggers

---

## 3. Events

### Inbound Webhook (**premium**)
- **Se dispara:** cuando llega una petición HTTP **POST, GET o PUT** a la URL única que genera cada trigger.
- **Configuración:** envías datos de prueba, eliges el payload recibido (el más reciente aparece primero) como **Mapping Reference** y mapeas sus campos en las acciones. Para crear o actualizar un contacto hay que mapear **email o teléfono**. Si no lo haces, el workflow corre **sin contacto (contactless)**.
- **Filtros:** la doc no documenta filtros sobre el payload. Para eso se usan If/Else dentro del workflow.
- **Trampas:** acepta **solo JSON**, con claves en camelCase o snake_case **sin espacios**. Admite listas en campos de texto. Si la URL se filtra, hay que regenerarla. Cada trigger tiene su propia URL. Es premium: **100 ejecuciones gratis** por sub-cuenta y después se cobra. La sintaxis exacta de las variables (`{{inboundWebhookRequest.*}}`) está **(no confirmada en doc oficial)**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/48001237383-how-to-use-the-inbound-webhook-workflow-premium-trigger · https://help.gohighlevel.com/support/solutions/articles/155000003147-workflow-trigger-inbound-webhook

### Scheduler
- **Se dispara:** por calendario, **sin contacto**.
- **Opciones:** Daily (una o varias horas), Weekly (días y horas), Monthly (día 1–31 o "Last"), Every N days, Custom (N-ésimo día de la semana, p. ej. el 2.º viernes), One-off (fecha y hora únicas) y **Advanced (Cron)** con formato `minute hour day month weekday` (p. ej. `0 9 * * 1`).
- **Extras:** `Skip Weekends`, `Stop On` (fecha de fin) y **Check Trigger Schedule** (muestra las 5 próximas ejecuciones). Usa la zona horaria de la cuenta.
- **Trampas:** **no se puede combinar con otros triggers** en el mismo workflow. Un cron **no puede ejecutarse más de una vez por hora**. Las acciones que dependen de un contacto se saltan; se permiten webhook, Google Sheets, Airtable, Slack, email o SMS internos, custom values y tareas. **No recupera** ejecuciones perdidas.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000006653-workflow-trigger-scheduler · changelog: https://ideas.gohighlevel.com/changelog/workflow-scheduler-trigger

### Call Details
- **Se dispara:** cuando un registro de llamada cumple los filtros.
- **Filtros:** `Call Direction` (Incoming/Outgoing) · `Call Status` (Busy, Voicemail, No-answer, Completed) · `In Number Pool` (pool de call tracking) · `Custom Disposition` (clasificación que elige el agente tras la llamada: Follow Up, Qualified, No Answer, Voicemail, Requested Callback…) · `In Phone Number`.
- **Trampas:** Call Status lo registra el sistema, mientras que Custom Disposition lo elige el agente. Para que el filtro de disposition funcione, la disposition tiene que quedar registrada. Una misma llamada puede disparar varios workflows.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/48001212511-workflow-trigger-call-details · https://help.gohighlevel.com/support/solutions/articles/155000002552-workflow-trigger-call-details

### Email Events
- **Se dispara:** con eventos de email: **Clicked, Opened, Bounced, Unsubscribed, Complained (Spam)**. El listado maestro también menciona "delivered", pero el artículo específico no lo incluye **(no confirmado en doc oficial)**.
- **Filtros:** `Event` (uno o varios) · `In Workflow` (limita a emails enviados desde ciertos workflows).
- **Trampas:** no hay trigger de "no abierto"; hay que usar Wait o If/Else. Complained afecta a la reputación de envío.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002678-workflow-trigger-email-events

### Customer Replied
- **Se dispara:** cuando el contacto responde por cualquier canal conectado.
- **Filtros:** `Contains Phrase` · `Exact Match Phrase` · `Has Tag` · `Doesn't Have Tag` · `Intent Type` (respuesta positiva, queja, pregunta…) · `Replied to Workflow` · `Reply Channel` (Email, SMS, WhatsApp, redes sociales, TikTok, **All-in-One Chat** con sub-filtro **Chat Widget** o **Live Chat** y el widget concreto).
- **Trampas:** sin filtro de canal ni de frase se dispara con **cualquier** respuesta. Para DMs de TikTok: Reply Channel = TikTok.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002677-workflow-trigger-customer-replied · Live Chat: https://help.gohighlevel.com/support/solutions/articles/155000002046

### User Replied
- **Se dispara:** cuando un **usuario del equipo** envía un mensaje desde la vista de Conversations y el mensaje **se entrega**. Los mensajes automáticos de workflows no cuentan.
- **Filtros:** `Sent By` (Is any of: usuario asignado o usuarios concretos) · `Message Channel` (Is any of: SMS, Email, WhatsApp, Facebook Messenger, Instagram DM, Live Chat) · `Contains Phrase` (sin distinguir mayúsculas; varias frases separadas por coma) · `Exact Match Phrase` · `Has Tag` · `Doesn't Have Tag`.
- **Trampas:** cada mensaje dispara por separado, salvo que la reentrada esté limitada. No es fiable para prospección en frío.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000008196-workflow-trigger-user-replied

### Inbound Email
- **Se dispara:** cuando llega un email a tus buzones. Cubre emails en frío (remitente desconocido), emails de contactos existentes y, de forma opcional, respuestas a hilos ya abiertos.
- **Filtros:** `Email Sent To / Mailbox` (Equals, Is any of, Contains, Does not contain) · `From` (Equals, Contains, Does not contain) · `CC` · `Subject` (Equals, Contains, Does not contain; sin distinguir mayúsculas) · `Body (plain text)` (Contains, Does not contain) · `Has Attachments` (Is true/false) · `Replied to Workflow` (Is/Is not) · `Contact Tag` (Has tag / Does not have tag).
- **Trampas:** los emails en frío **solo se detectan con dominios dedicados de LC Email o Mailgun**. Con sincronización de Gmail/Outlook o SMTP no dedicado solo llegan emails de contactos existentes. Cada sub-cuenta necesita su propio subdominio dedicado.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000007650-workflow-trigger-inbound-email

### Form Submitted
- **Se dispara:** cada vez que alguien envía un **formulario de HighLevel**.
- **Filtros:** `Form Is` (formulario concreto) y el filtro **T&C** (ver sección 0).
- **Trampas:** se dispara en **cada envío**, así que los reenvíos generan varias entradas. **No sirve para formularios externos**: para esos usa webhook, integración o External Tracking. Para varios formularios, añade más filtros o triggers.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002550-workflow-trigger-form-submitted

### Survey Submitted
- **Se dispara:** al enviar una encuesta, esté en un funnel, en una web o en un enlace externo.
- **Filtros:** `Disqualified` (is true / is false) · `Survey is` (una o varias; vacío = cualquiera) · filtro T&C.
- **Trampas:** no evalúa respuestas concretas. Para eso, haz que la encuesta escriba custom fields o tags y filtra por ellos.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003259-workflow-trigger-survey-submitted

### Quiz Submitted
- **Se dispara:** cuando un contacto completa y envía un quiz publicado.
- **Filtros:** `Quiz Name` (uno concreto, "Any" o "Is Not") · `Overall Score` (greater than, less than, equals, **Between**; los extremos se incluyen) · `Category Score` · `Custom Field` (campos de puntuación personalizados) · filtro T&C.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000004437-workflow-trigger-quiz-submitted

### Facebook Lead Form Submitted
- **Se dispara:** al enviarse un Instant Form de un Lead Ad de una página de Facebook conectada.
- **Filtros:** `Page Is` · `Form Is`.
- **Requisitos:** integración de Facebook con los permisos correctos y **Facebook Form Fields Mapping** configurado (Settings › Integrations).
- **Trampas:** sin filtros se dispara con **todos** los formularios de todas las páginas conectadas. Solo admite un formulario por filtro; para varios, clona el trigger. El artículo no menciona los lead forms de Instagram. La guía de Lead Ads de FB/IG está en https://help.gohighlevel.com/support/solutions/articles/155000005064-getting-started-setup-facebook-and-instagram-lead-ads
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003095-workflow-trigger-facebook-lead-form-submitted

### TikTok Form Submitted (el artículo lo llama "TikTok Form Submit")
- **Se dispara:** al enviarse un formulario de Lead Ads de TikTok.
- **Filtros:** `In Form` (**obligatorio**).
- **Requisito:** integración de TikTok Lead Ads (https://help.gohighlevel.com/support/solutions/articles/48001223558-how-to-integrate-tiktok-lead-ads).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003262-workflow-trigger-tiktok-form-submit

### LinkedIn Lead Form Submitted
- **Se dispara:** justo después de que alguien envía un formulario Lead Gen de LinkedIn conectado.
- **Filtros:** `Page` (opcional, recomendado) y custom fields mapeados. **Operadores:** Is, Contains Phrase, Does Not Contain Phrase, Is Empty, Is Not Empty. Varios filtros se combinan en **AND**.
- **Requisitos:** integración de LinkedIn Lead Ads, al menos un formulario publicado y mapeo de campos.
- **Trampas:** los duplicados se resuelven por email o teléfono. La reentrada depende de "Allow Re-entry". La sincronización tarda unos instantes.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003497-workflow-trigger-linkedin-lead-form-submitted

### Video Tracking
- **Se dispara:** cuando alguien ve un vídeo **de un funnel** hasta el porcentaje indicado.
- **Filtros:** `Funnel` · `Video` · `Video Duration (%)` (p. ej. 25/50/75/100). Todos opcionales.
- **Trampas:** el espectador **tiene que existir ya como contacto** (pon un formulario antes del vídeo). Hay que **desactivar la barra de progreso** del vídeo. Se dispara **cada vez que el usuario cierra el vídeo**, y vuelve a entrar si la reentrada está activa. Sin porcentaje, se dispara al cerrar la ventana o al terminar el vídeo.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003142-workflow-trigger-video-tracking

### Number Validation
- **Se dispara:** cuando HighLevel valida el teléfono **antes del primer SMS saliente** a ese número.
- **Filtros:** `Number is` (resultado de la validación: p. ej. inválido, fijo o no apto para SMS).
- **Requisito:** **Number Intelligence** activado en Settings › Phone System › Additional Settings.
- **Trampas:** **no** se dispara al crear ni al importar contactos. No se dispara con los errores de entrega de Twilio (para eso está Messaging Error). No comprueba el consentimiento. La doc recomienda no borrar contactos solo por este resultado.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003163-workflow-trigger-number-validation

### Messaging Error – SMS
- **Se dispara:** cuando un SMS queda **undelivered** con un código de error concreto.
- **Filtro:** código de error. Opciones: 30007 Carrier Violation · 30034 A2P Registration Pending · 30032 Toll Free not Verified · 30005 Number does not exist · 30003 Unreachable · 30004 DND/Do not want SMS · 30006 Landline · 30023 A2P 10DLC Daily Cap · 21408 Region not enabled · 30008 Unknown · 21606 Invalid From · 21211 Invalid To · 21614 To not mobile · 21610 STOP (opt-out) · 30011 MMS not supported · 30033 A2P Campaign suspended · 21661 From not SMS-capable · 21635 To is landline · 30037 Outbound disabled · 30002 Sub-account suspended.
- **Uso típico:** limpiar la lista (tag, DND, alerta al equipo).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003201-workflow-trigger-messaging-error-code-sms

### Funnel/Website PageView
- **Se dispara:** cuando un contacto visita una página concreta de un funnel o web de HighLevel.
- **Filtros** (operadores Is, Is any of, Is none of, Is empty, Is not empty): `Funnel/Website` (**obligatorio**) · `Page` · `Page Path` · `UTM Campaign` · `UTM Source` · `UTM Medium` · `UTM Content`.
- **Trampas:** hace falta que el visitante esté identificado como contacto, normalmente porque envió un formulario antes con la cookie activa **(no confirmado en doc oficial)**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003498-workflow-trigger-funnel-website-page-view · https://help.gohighlevel.com/support/solutions/articles/155000002027-page-view-triggers-for-funnels-and-websites

### External Tracking Event
- **Se dispara:** cuando el script de **External Tracking**, instalado en una web externa, capta un evento con nombre. La doc de External Tracking describe dos tipos: **Page View** (se dispara incluso con visitantes anónimos) y **Form Submission** (formularios externos detectados automáticamente).
- **Filtros:** `Domain`, `Page path`, `External form name`, parámetros **UTM**.
- **Trampas:** hace falta el script de tracking en el sitio externo. El listado maestro lo define como un evento de cliente o servidor con nombre; el detalle del evento de servidor está **(no confirmado en doc oficial)**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000006092-tracking-external-forms-with-gohighlevel

### New Review Received (el artículo lo llama "Review Received")
- **Se dispara:** al llegar una reseña nueva de **Google o Facebook** a Reputation.
- **Filtros:** `Review SPAM` (Yes/No) · `Review Source` (Google, Facebook) · `Review Rating` (1–5).
- **Trampas:** es **contactless**: la reseña no se vincula a ningún contacto. Los datos de la reseña se pueden mapear, p. ej. a un webhook.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003873-how-to-setup-workflow-triggers-for-google-and-facebook-reviews

### Prospect Generated
- **Se dispara:** al crear un **prospecto** en el Prospecting Tool, ya sea desde la app, desde un widget embebido o con Prospect AI.
- **Filtros:** `Source` (in-app / widget / AI) · `Conversion Rate`.
- **Trampas:** es para prospectos del Prospecting Tool, no para contactos normales.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000004634-workflow-trigger-for-new-prospects-in-the-prospecting-tool

### Click To WhatsApp Ads (el artículo lo llama "Click-to-WhatsApp Ads & Facebook Page CTA")
- **Se dispara:** cuando alguien toca un anuncio Click-to-WhatsApp o el botón CTA de WhatsApp de la página de Facebook y envía un mensaje desde el móvil.
- **Filtros:** `Ad ID / Post ID` · `Ad/Post URL` · `Headline` · `Source Type`.
- **Trampas:** si respondes en menos de 24 h, se abre una **ventana gratuita de 72 h** en la que puedes enviar mensajes con o sin plantilla. Esa conversación de entrada gratuita cierra las demás conversaciones abiertas. Pasadas 24 h sin respuesta, solo quedan las plantillas de pago. Permite pasar el Ad ID y la campaña a custom fields.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000005602-workflow-trigger-click-to-whatsapp-ads-facebook-page-cta

### Transcript Generated
- **Se dispara:** cuando HighLevel termina de transcribir una llamada de **Voice AI, IVR o LC Phone**.
- **Filtros:** `Call Type` (Voice AI, IVR, Normal Calls) · `Call Direction` · `Call Duration` (mínimo, p. ej. > 30 s).
- **Requisitos:** transcripción activada. En Voice AI viene activa por defecto; en LC Phone e IVR hay que activarla.
- **Trampas:** no se dispara con transcripciones importadas. Si guardas la transcripción en un custom field, el límite es **16 KB**. Si hay traducción, entrega la transcripción y el resumen traducidos.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000006632-workflow-trigger-transcript-generated

---

## 4. Appointments

> Estos triggers **siempre permiten reentrada**, una vez por cita (ver sección 0).

### Appointment Status
- **Se dispara:** al crear una cita o cuando cambia su estado.
- **Filtros:** `Event Type` (Any, Normal, Recurring) · `Appointment Status` (**New, Confirmed, Cancelled, Showed, No-show, Invalid**) · `Tag` · `In Calendar` · `In Calendar Group` · `Only for Grouped Calendar` (Yes/No) · `Modified By` (API, Customer, User —con usuario concreto—, Workflow).
- **Inscripción:** Contact only (por defecto) · Contact and Guests (cada persona corre por separado) · Guests only.
- **Trampas:** **una cita reprogramada cuenta como nueva** y el contacto vuelve a entrar desde el principio.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002619-workflow-trigger-appointment-status

### Customer Booked Appointment
- **Se dispara:** cuando el **cliente reserva él mismo** desde un enlace de reserva o un widget. Si un usuario del equipo crea la cita en su nombre, no se dispara.
- **Filtros:** `Has Tag` · `In Calendar` · `In Calendar Group`.
- **Inscripción:** Contact only · Contact and Guests · Guests only.
- **Trampas:** **no funciona con citas recurrentes**, solo con citas únicas. Los invitados que se añaden después de reservar no entran.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002675-workflow-trigger-customer-booked-appointment

### Service Booking (Services v2)
- **Se dispara:** al crear una reserva de servicios, desde la página de reservas o manualmente, y cuando cambia su estado.
- **Filtros:** `Appointment Status` (Unconfirmed, Confirmed, Showed, No Show, Cancelled, Invalid) · `Created By / Modified By` · `Has Tag` · `In Service` · `In Service Category` · `In Service Location`.
- **Trampas:** se dispara **una sola vez por reserva**, aunque incluya varios servicios. Solo aparece si **Services (v2)** está activado. Las órdenes de reserva de servicios no disparan Order Submitted salvo que filtres `Order Source = Calendar`. Solo admite algunas acciones (Update Appointment Status, Create Appointment Note); no admite Book Appointment ni bots de IA.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000006140-workflow-trigger-service-booking-services-v2-

### Rental Booking
- **Se dispara:** al reservar un alquiler (módulo Rentals).
- **Filtros:** **(no confirmado en doc oficial)**; no hay artículo específico del trigger.
- **URL:** listado maestro https://help.gohighlevel.com/support/solutions/articles/155000002292-a-list-of-workflow-triggers · Rentals: https://help.gohighlevel.com/support/solutions/articles/155000006649-rentals-calendars-overview-how-to-get-started

---

## 5. Opportunities

> Con **Allow multiple Opportunities** activo, cada oportunidad crea su propia ejecución.

### Opportunity Created
- **Se dispara:** al crear una oportunidad.
- **Filtros:** `Assigned To` (Equals to) · `Has Tag` (Equals to / Not equals to / Any of / None of; varios) · `In Pipeline` (Equals to) · `Lead Value` (Equals to / Greater than / Less than) · `Lost Reason` · `Status`. Todos opcionales.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003499-workflow-trigger-opportunity-created · https://help.gohighlevel.com/support/solutions/articles/155000000887-workflow-triggers-opportunity-created

### Opportunity Status Changed
- **Se dispara:** cuando cambia el estado (Open / Won / Lost / Abandoned).
- **Filtros:** `Assigned To` · `Tag` (Equals/Not equals/Any of/None of) · `In Pipeline` · `Lead Value` · `Moved From Status` · `Moved To Status` · `Pipeline Stage` · `Lost Reason`.
- **Trampas:** se dispara con cada cambio de estado. Si los cambios son rápidos, puede repetir acciones.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003252-workflow-trigger-opportunity-status-changed

### Pipeline Stage Changed
- **Se dispara:** cuando una oportunidad cambia de etapa, **tanto hacia delante como hacia atrás**.
- **Filtros:** `Assigned To` · `Tag` · `In Pipeline` · `Lead Value` · `Lost Reason` · `Pipeline Stage` (etapa destino) · `Status` (Open, Won, Lost, Abandoned).
- **Trampas:** los movimientos manuales también lo disparan. Volver a una etapa anterior lo **vuelve a disparar**. No captura movimientos anteriores a la publicación.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002493-workflow-trigger-pipeline-stage-changed

### Opportunity Changed
- **Se dispara:** con cualquier cambio en la oportunidad: valor, pipeline, asignación, custom fields o estado.
- **Filtros y operadores:** `Assigned To`, `In Pipeline`, `Lost Reason`, campos **Radio / Dropdown / Date** (Has Changed, Has Changed To, Equals) · `Status` (Is, Is Not, Has Changed, Has Changed To) · campos **Checkbox** (Added, Removed, Equals) · `Tag` · `Lead Value`.
- **Trampas:** los operadores **Has Changed** y **Has Changed To** permiten dispararlo solo cuando ese campo cambia de verdad. Los workflows creados antes de esta mejora mantienen su comportamiento hasta que los edites. Es distinto de Opportunity Status Changed, que solo vigila el estado.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000000886-workflow-trigger-opportunity-changed · changelog: https://ideas.gohighlevel.com/changelog/workflow-updates-enhanced-opportunity-changed-trigger

### Stale Opportunities
- **Se dispara:** cuando una oportunidad lleva N días en la misma etapa sin progresar ni actualizarse.
- **Filtros:** `Duration in Days` · `In Pipeline` · `Pipeline Stage`.
- **Trampas:** el contador se reinicia si la oportunidad cambia de etapa o se actualiza. **No es retroactivo**: empieza a contar al publicar. Puede volver a dispararse si la oportunidad se estanca otra vez.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002492-workflow-trigger-stale-opportunities

---

## 6. Payments

> El trigger **Invoice** siempre permite reentrada, una vez por factura.

### Payment Received
- **Se dispara:** cuando se procesa un pago: cobros únicos, **renovaciones de suscripción** y pagos de factura, de cualquier origen.
- **Filtros:** `Source` (Calendar, External [Stripe/PayPal/APIs], Form, Funnel, Invoice, Manual Payment, Memberships, Website) · `Payment Status` (**Success / Failed**) · `Global Product` · `Calendar` · `Transaction Type` ("customer not present / subscription transaction", para cobros recurrentes).
- **Trampas:** con **Payment Status = Failed** sirve para flujos de recuperación. No existe un trigger específico de Stripe: se usa este con filtros. Variables disponibles: importe, transaction ID y marca/últimos 4 dígitos de la tarjeta. Pruébalo en modo sandbox.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003534-workflow-trigger-payment-received · https://help.gohighlevel.com/support/solutions/articles/48001238334-workflow-trigger-payment-received

### Invoice
- **Se dispara:** cuando cambia el estado de una factura.
- **Filtros:** `Invoice Status` (Paid, Partially Paid, Sent, Viewed, Void) · `Invoice Amount` (Between, con extremos incluidos) · `Tag` · Custom Fields.
- **Trampas:** conviene un workflow por estado. El listado maestro también menciona "created" y "due" **(no confirmado en el artículo específico)**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002835-workflow-trigger-invoice

### Order Form Submission
- **Se dispara:** al enviar un **order form** en un funnel o web, **haya pago o no**.
- **Filtros:** `In Funnel/Website` · `Page Is` · `Product Is` · `Submission Type` (**Bump, Opt-In** [datos sin compra], **Sale, Upsell**).
- **Trampas:** con Opt-In se dispara aunque no haya compra. Sirve para abandono o captura de lead.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003253-workflow-trigger-order-form-submission · comparativa: https://help.gohighlevel.com/support/solutions/articles/155000004303-workflow-trigger-order-submitted-vs-order-form-submission

### Order Submitted
- **Se dispara:** cuando hay una transacción real en checkout, incluidas **las compras principales y los upsells**. Se dispara **una vez por producto comprado**.
- **Filtros** (Is / Is Not): `Global Product` · `Order Source` (External, Form, Membership, Order Form, Payment Link, Store, Survey; también **Calendar** para reservas de servicios) · `Sub-Source` · `In Funnel/Website` · `Page Is` · `Submission Type` (Primary, Bump, Upsell) · `Product Price`.
- **Trampas:** activa **Allow Multiple** para que los bumps y upsells entren por separado. Incluye datos del carrito que no tiene Order Form Submission.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003535-workflow-trigger-order-submitted

### Subscription
- **Se dispara:** con eventos del ciclo de vida de una suscripción: alta, paso de trial a activa, cancelación y demás cambios de estado.
- **Filtros:** `Global Products` (Is, Is not, Is empty, Is not empty) · `Status` (Is, Is not): **Active, Canceled, Expired, Incomplete Expired, Incomplete, Overdue, Scheduled, Trial, Unpaid** · Custom Fields.
- **Trampas:** "Expired" no aplica a Stripe. "Overdue" solo aplica si el primer pago se cobró bien. "Incomplete Expired" sustituye al antiguo "Failed". En Stripe, "Canceled" incluye tanto la cancelación manual como el fin del plazo.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003536-workflow-trigger-subscription · https://help.gohighlevel.com/support/solutions/articles/155000002213-subscription-refund-trigger-for-payments

### Refund
- **Se dispara:** al emitir un reembolso **desde HighLevel** (Stripe, Authorize.net, NMI). Cada reembolso es un evento distinto.
- **Filtros:** `Status` (Successful, Failed) · `Amount` (Greater than, Less than, Equal to) · `Source` (Calendar, Communities, Payment Link, Invoices, Manual…) · `Type` (Full / Partial Refund).
- **Trampas:** los reembolsos hechos **fuera de HighLevel**, p. ej. directamente en el panel de Stripe, **no lo disparan**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003537-refund-workflow-trigger-in-highlevel

### Documents & Contracts
- **Se dispara:** cuando cambia el estado de un documento: Sent, Viewed, Signed/Accepted, Completed.
- **Filtros:** `Recipient Type` (Contact / Business User) · `Status` · `Template` · `Value` (Greater than, Equals to…).
- **Trampas:** cada cambio de estado dispara por separado. Si configuras Viewed y Signed, el workflow se dispara dos veces. Para archivos subidos por el cliente, usa Client Portal File Uploaded (sección 8).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000001491-workflow-trigger-documents-contracts

### Estimates
- **Se dispara:** con eventos de un presupuesto: enviado, visto, aceptado, rechazado o facturado.
- **Filtros:** `Estimate Status` (Accepted, Declined, Invoiced, Sent, Viewed; Is / Is Not / Is Empty / Is Not Empty) · `Estimate Value` (Equals To, Greater Than, ≥, Less Than, ≤, Is Not Equal To, Is Empty, Is Not Empty) · `Estimate Template` (Is / Is Not / Is Empty / Is Not Empty).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003704-workflow-trigger-estimates

### Coupon Code Applied
- **Se dispara:** **en cuanto se aplica** un cupón en el checkout, aunque la compra no se complete.
- **Filtros:** `Coupon Code` · `Coupon Name` · `Coupon Type` · `Coupon Value` · `Order Value (Before Discount)` · `Product Collection` · `Product Type` · `Product(s) In Order` · `Source`.
- **Trampas:** **no admite órdenes programadas** (scheduled orders). Sin filtros se dispara con cualquier cupón.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000005641-workflow-trigger-coupon-code-applied

### Coupon Code Redeemed
- **Se dispara:** cuando se usa un cupón en una **transacción completada** con pago correcto.
- **Filtros:** `Contact Email ID` · `Contact Tag` · `Coupon Code` · `Coupon Name` · `Coupon Type` (Amount/Percentage) · `Coupon Value` · `Order Value (Before Discount)` · `Product Collection` · `Product Type` · `Product(s) in Order` · `Redemption Count` · `Source`.
- **Trampas:** si se usan varios cupones, cada uno dispara por separado.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000005658-workflow-trigger-coupon-code-redeemed

### Coupon Redemption Limit Reached
- **Se dispara:** cuando un cupón **alcanza** su máximo de usos tras una transacción completada. No avisa cuando se acerca.
- **Filtros:** `Coupon Code` / `Coupon Name` (Is Any Of, Is None Of, Is Empty, Is Not Empty) · `Coupon Type` (Is, Is Not, Is Empty, Is Not Empty) · `Redemption Limit` (Equals To, >, ≥, <, ≤, Is Not Equal To, Is Empty, Is Not Empty).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000005660-workflow-trigger-coupon-redemption-limit-reached

### Coupon Code Expired
- **Se dispara:** cuando un cupón llega a su **fecha de caducidad programada**.
- **Filtros:** `Coupon Code` / `Coupon Name` (Is Any Of, Is None Of, Is Empty, Is Not Empty) · `Coupon Type`.
- **Trampas:** **desactivar un cupón a mano no lo dispara**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000005661-workflow-trigger-coupon-code-expired

---

## 7. Ecommerce Stores / Shopify

### Abandoned Checkout
- **Se dispara:** cuando alguien añade productos, introduce un **email válido** y no paga dentro de la ventana de abandono configurada.
- **Filtros:** `Duration (minutes)` · `Cart Value` (mínimo, máximo o rango) · `Country` · `Global Products` · `Order Source` (Store / External) · `Sub-Source` (con External; hoy solo Shopify).
- **Trampas:** sin email no se dispara. Sustituye a "Shopify Abandoned Cart", que está en retirada.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000007380-workflow-triggers-abandoned-checkout-trigger-for-e-commerce-stores

### Order Fulfilled
- **Se dispara:** cuando un pedido pasa a **Fulfilled**, ya sea de la tienda de HighLevel o de una externa como Shopify. Es compatible con Shippo, ShipStation, etc.
- **Filtros:** `Cart Value` · `Fulfilled Products` (contains/excludes) · `Order Source` (Store/External) · `Order Sub-Source` (Shopify) · `Shipping Carrier` · `Tracking Number`.
- **Trampas:** se dispara **con cada fulfillment parcial**. Usa filtros o el interruptor "Allow Multiple" para envíos divididos. Los cambios de estado de entrega no lo vuelven a disparar. **WooCommerce todavía no es compatible**.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000007390-workflow-trigger-order-fulfilled-for-ecommerce-stores- · (legacy) https://help.gohighlevel.com/support/solutions/articles/155000003254-workflow-trigger-order-fulfilled

### Product Review Submitted
- **Se dispara:** **en cuanto** un cliente envía una reseña de producto en la tienda de HighLevel, sin esperar a que se apruebe.
- **Filtros:** `Global Product` (**un solo producto** por trigger) · `Review Comment` / `Review Headline` (contains phrase, is not empty) · `Review Rating` (is any of, is none of, is empty, is not empty) · `Store Name` · `User Email` · `User Name`.
- **Trampas:** editar una reseña **no** lo vuelve a disparar. Si las reseñas están desactivadas, no se dispara. Por defecto corre **contactless**; puedes crear el contacto dentro del workflow.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000007386-workflow-trigger-product-review-submitted-for-e-commerce-stores-

### Shopify Order Placed (el artículo lo llama "Order Placed")
- **Se dispara:** cuando un cliente hace un pedido.
- **Filtros:** `Cart Value` (Equals, Greater than, Less than…).
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003255-workflow-trigger-order-placed

### Shopify Abandoned Cart (legacy, en retirada) · Shopify Order Fulfilled (legacy, en retirada)
- **Filtros de Abandoned Cart:** `Duration` (minutos) · `Cart Value` (Greater than, Less than, Equals to, Is Empty…).
- **Trampa:** migra a **Abandoned Checkout** y **Order Fulfilled**, que son los triggers unificados.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000002618-workflow-trigger-shopify-abandoned-cart

---

## 8. Courses / Memberships / Client Portal / Certificates

| Trigger | Se dispara | Filtros | URL |
|---|---|---|---|
| **Category Started** | el alumno empieza una categoría | categoría(s) (multiselección) | changelog https://ideas.gohighlevel.com/changelog/workflow-membership-updates (artículo propio no encontrado) |
| **Category Completed** | el alumno completa una categoría | producto/curso, categoría(s) | https://help.gohighlevel.com/support/solutions/articles/155000002671-workflow-trigger-category-completed |
| **Lesson Started** | el alumno empieza una lección | Product · Category · Lesson (**no confirmado en doc oficial**; por analogía con Lesson Completed) | changelog workflow-membership-updates |
| **Lesson Completed** | el alumno completa una lección | `Product` · `Category` · `Lesson` | https://help.gohighlevel.com/support/solutions/articles/155000005110-how-to-send-a-certificate-after-passing-a-quiz-or-assignment |
| **Product Started** | el alumno empieza un producto o curso | producto(s) | changelog workflow-membership-updates |
| **Product Completed** | el alumno completa un producto o curso | `Product` (Is any of / Is none of) | https://help.gohighlevel.com/support/solutions/articles/155000003258-workflow-trigger-product-completed |
| **New Signup** | alta nueva en una oferta, producto o grupo de comunidad | `Offer` (opcional) | https://help.gohighlevel.com/support/solutions/articles/155000003098-workflow-trigger-courses-new-sign-up |
| **Offer Access Granted** | se concede acceso a una oferta | `Offer` | https://help.gohighlevel.com/support/solutions/articles/155000003250-workflow-trigger-offer-access-granted |
| **Offer Access Removed** | se retira el acceso a una oferta | `Offer` | https://help.gohighlevel.com/support/solutions/articles/155000003251-workflow-trigger-offer-access-removed |
| **Product Access Granted** | se concede acceso a un producto | producto(s) | https://help.gohighlevel.com/support/solutions/articles/155000003256-workflow-trigger-product-access-granted |
| **Product Access Removed** | se retira el acceso a un producto | `Select Product` | https://help.gohighlevel.com/support/solutions/articles/155000003257-workflow-trigger-product-access-removed |
| **User Login** | login en el portal (legacy y **nuevo Client Portal**) | sin filtros documentados | https://help.gohighlevel.com/support/solutions/articles/155000003099-workflow-trigger-courses-user-login-legacy-portal- · https://ideas.gohighlevel.com/changelog/client-portal-user-login-workflow-trigger-now-supports-the-new-client-portal-exp |
| **Client Portal File Uploaded** | el **contacto** sube un archivo en Shared Documents del Client Portal | no detallados en la doc | https://help.gohighlevel.com/support/solutions/articles/155000008244-how-to-use-the-client-portal-file-uploaded-workflow-trigger |
| **Certificates Issued** | se genera un certificado de curso | **(no confirmado en doc oficial)** | listado maestro 155000002292 |

**Trampas del grupo:**
- **New Signup no se dispara** si el contacto ya tenía acceso a la oferta o al grupo por otra vía; solo cuenta la **primera** alta.
- Los triggers de acceso y de finalización se disparan **cada vez** que ocurre el evento. Si se concede el mismo acceso dos veces, el workflow corre dos veces.
- **Category Completed** se dispara una vez por categoría. Si se completan varias a la vez, cada una dispara por separado.
- **User Login**: desde el changelog también se dispara con el nuevo Client Portal. El selector tiene una categoría **Client Portal**, donde se movió "Client portal file uploaded".
- **Client Portal File Uploaded**: solo cuentan los archivos que sube el cliente, no los que comparte el equipo. Admite PDF, Word, Excel, PowerPoint, TXT, RTF, JPEG, PNG y GIF. La doc recomienda probarlo con una subida real, no con "Test Workflow".
- Para dar un certificado tras aprobar un quiz, usa **Lesson Completed** con filtros de Product, Category y Lesson, seguido de la acción de emitir certificado.

---

## 9. Communities

| Trigger | Se dispara | Filtros | URL |
|---|---|---|---|
| **Group Access Granted** | se concede acceso a un grupo | grupo | https://help.gohighlevel.com/support/solutions/articles/155000003538-workflow-trigger-group-access-granted |
| **Group Access Revoked** | se revoca el acceso a un grupo | grupo | https://help.gohighlevel.com/support/solutions/articles/155000003539-workflow-trigger-group-access-revoked |
| **Private Channel Access Granted** | se concede acceso a un canal privado | grupo, canal privado | https://help.gohighlevel.com/support/solutions/articles/155000003681-workflow-trigger-action-grant-revoke-private-channel-access |
| **Private Channel Access Revoked** | se revoca el acceso a un canal privado | grupo, canal privado | (mismo artículo) |
| **Community Group Member Leaderboard Level Changed** | cambia el nivel del miembro en el leaderboard | grupo(s), nivel(es) | https://help.gohighlevel.com/support/solutions/articles/155000004080-gamification-leaderboard-triggers-and-actions-for-community-groups |
| **Group Joining Request Rejected** | se rechaza una solicitud para unirse | `Group` (obligatorio) | https://ideas.gohighlevel.com/changelog/new-communities-triggers-in-workflows-automate-more-faster |
| **Group Post Created** | se publica un post en el grupo | `Group` (oblig.), `Channel`, `Post Title`, `Post Content` | (mismo changelog) |
| **Group Comment Created** | se comenta un post | `Group` (oblig.), `Channel`, `Post Title`, `Post Content`, `Comment Content` | (mismo changelog) |
| **Member Registered for Group Event** | un miembro se inscribe a un evento del grupo | `Group` (oblig.), `Event Title` | (mismo changelog) |

**Trampas:** la acción **Grant Private Channel Access** también mete al miembro en el grupo si no estaba. **Revoke** le quita el canal pero lo deja en el grupo. La acción de dar puntos de leaderboard **falla si el miembro no pertenece al grupo**. Los 4 triggers del changelog todavía no tienen artículo propio en el Support Portal, y los nombres se toman del changelog.

---

## 10. Affiliate

| Trigger | Se dispara | Filtros | URL |
|---|---|---|---|
| **Affiliate Created** | se crea un afiliado nuevo en la sub-cuenta | sin filtros documentados | https://help.gohighlevel.com/support/solutions/articles/155000003663-getting-started-with-affiliate-automations |
| **Affiliate Enrolled In Campaign** | un afiliado entra en una campaña, a mano o automáticamente | `Campaign` y campos estándar o custom | https://help.gohighlevel.com/support/solutions/articles/155000003040-workflow-trigger-affiliate-enrolled-in-campaign |
| **New Affiliate Sales** (el artículo lo llama "New Affiliate Sale") | una venta atribuida a un afiliado: única, recurrente o manual | `Affiliate(s)` · `Campaign` · `Payout Method Status` · `Tax Form Status` | https://help.gohighlevel.com/support/solutions/articles/155000003664-how-to-automate-affiliate-sales-with-the-new-affiliate-sales-trigger |
| **Lead Created** | se crea un lead atribuido a un afiliado | **(no confirmado en doc oficial)** | listado maestro 155000002292 |

**Trampas:**
- **New Affiliate Sales corre sobre el contacto del COMPRADOR**, no sobre el del afiliado. Un Send Email o Send SMS normal le llegará al comprador. Para escribir al afiliado, usa las acciones específicas de afiliado.
- **Affiliate Enrolled In Campaign** corre sobre el contacto del afiliado. Da acceso a variables como el nombre, el enlace de referido, el enlace al portal, el **magic login link**, los ingresos y las comisiones.
- Requisitos: Affiliate Manager activado y al menos una campaña creada.

---

## 11. Facebook/Instagram Events y TikTok

### Facebook – Comment(s) On A Post
- **Se dispara:** cuando un comentario en un post de Facebook cumple los filtros.
- **Filtros:** `Page Is` · `Post Type` (Published Post / Custom Post por URL) · `Post Is` · comentario con **Contains Phrase** o **Exact Match**.
- **Interruptor:** `Track First Level Comment Only`. Activado, solo cuentan los comentarios de primer nivel; desactivado, también las respuestas anidadas.
- **Trampas:** los comentarios que publica el propio workflow **se ignoran**, así que no se crean bucles. Se combina con las acciones Reply In Comments y Facebook Interactive Messenger.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000004645-workflow-trigger-facebook-comment-s-on-a-post

### Instagram – Comment(s) On A Post
- Mismos filtros e interruptor que el de Facebook (Page Is, Post Type, Post Is, Contains Phrase / Exact Match, Track First Level Comment Only). Solo funciona con Instagram.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000004646-workflow-trigger-instagram-comment-s-on-a-post · guía: https://help.gohighlevel.com/support/solutions/articles/155000002055-guide-to-facebook-instagram-comment-automation-ai

### TikTok – Comment(s) On A Video
- **Se dispara:** con un comentario nuevo en un vídeo o post de TikTok.
- **Filtros:** `Account` · `Post Type` (Published / Custom por URL) · `Post` (si no eliges ninguno, vigila todos los de la cuenta) · comentario con **Exact Match** o **Contains Phrase**.
- **Trampas:** guarda el nombre y el apellido del contacto. La acción Reply in Comments admite hasta 10 variantes aleatorias. Para DMs de TikTok se usa **Customer Replied** con Reply Channel = TikTok.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000006703-tiktok-dms-comment-automations

---

## 12. IVR y llamadas

### Start IVR Trigger
- **Se dispara:** cuando entra una llamada a un número configurado para el workflow IVR.
- **Filtros:** número de teléfono de entrada (obligatorio) y custom fields opcionales.
- **Requisitos:** plan **LC Phone**, número configurado en LC Phone y el IVR creado de antemano.
- **Trampas:** **no permite rastrear el buzón de voz con este trigger**. **Cada número solo puede mapearse a un workflow IVR.**
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000003203-workflow-trigger-start-ivr-trigger · guía: https://help.gohighlevel.com/support/solutions/articles/155000001200-interactive-voice-response-ivr-guide-triggers-actions

Relacionados: **Call Details** y **Transcript Generated** (sección 3).

---

## 13. Google Ads

### Google Lead Form Submitted
- **Se dispara:** al instante, cuando alguien envía un lead form de Google Ads mapeado.
- **Filtros:** `Ad Account` · `Lead Form`.
- **Requisitos:** cuenta de Google Ads conectada por OAuth con acceso de admin, y el formulario activado y mapeado a campos del CRM. El contacto se crea solo.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000006989-google-lead-ads-integration

---

## 14. Eventos (módulo Events)

| Trigger | Se dispara | Filtros | URL |
|---|---|---|---|
| **Event Registration** | un contacto se inscribe a un evento | estado de la inscripción, evento concreto, quién hizo la reserva, tipo de entrada, datos de check-in | https://help.gohighlevel.com/support/solutions/articles/155000008431-events-and-workflows-integration |
| **Event Checked In** | un asistente hace check-in | los mismos filtros | (mismo artículo) |

Nota: los nombres exactos que muestra el selector **(no confirmado en doc oficial)**; el artículo los describe como "Event Registration" y "Event Checked In". Los datos del evento (nombre, fecha, lugar, tipo de entrada) quedan disponibles para If/Else y personalización.

---

## 15. Conversation AI, Custom Trigger y Marketplace

### Conversation AI Trigger
- **Qué es:** en el bot de Conversation AI, pestaña **Bot Goals**, la acción **"Trigger a Workflow"** tiene tres campos: nombre de la acción, un workflow **publicado** del desplegable y una descripción en lenguaje natural de cuándo activarlo (p. ej. "Customer wants to purchase the subscription").
- **Trampas:** **no lo uses con un workflow que ya tenga publicado el mismo trigger en Automation**, porque se ejecutaría **dos veces**. Si varias acciones comparten condición, el orden lo decide la IA. El bot necesita tener nombre antes de poder usar esta opción.
- **URL:** https://help.gohighlevel.com/support/solutions/articles/155000004098-trigger-a-workflow-within-conversation-ai · changelog: https://ideas.gohighlevel.com/changelog/trigger-a-workflow-within-conversation-ai

### Custom Trigger (incluye los triggers de apps del Marketplace)
- **Qué es:** un trigger definido por una app del Marketplace. Cuando alguien lo añade a un workflow, HighLevel envía un POST a la **Subscription URL** de la app con el evento `CREATED`, `UPDATED` o `DELETED`. El payload incluye `triggerData` (id, key, filters, eventType, **`targetUrl`**), `meta` (key, version) y `extras` (locationId, workflowId, companyId).
- **Cómo se dispara:** la app hace POST del payload a `targetUrl`.
- **Filtros:** String, Select/Multi-select (constantes, referencias internas o una API externa) y Dynamic (construidos a partir de la respuesta de una API).
- **Trampas:** puede correr **contactless**, sin datos de contacto, con acciones como webhook, Sheets o Slack. El trigger está disponible en todas las sub-cuentas una vez aprobada la app. La doc **no documenta** rate limits ni tamaño máximo del payload. Las ejecuciones de apps del Marketplace cuentan como premium (ver docs-workflows). El listado maestro lo describe como "custom event you define for non-standard use cases". Una configuración nativa sin app **(no confirmado en doc oficial)**.
- **URL:** https://marketplace.gohighlevel.com/docs/marketplace-modules/CustomTriggers/index.html · https://marketplace.gohighlevel.com/docs/marketplace-modules/WorkflowActionsAndTriggers/index.html

### Triggers de integraciones de terceros (apps "LC Apps")
Calendly, Cal.com, Typeform, Google Forms, Vapi, etc. añaden sus propios triggers. Cada integración tiene su artículo, por ejemplo:
- Calendly: https://help.gohighlevel.com/support/solutions/articles/155000008110-calendly-workflow-actions-triggers
- Cal.com: https://help.gohighlevel.com/support/solutions/articles/155000007879-cal-com-workflow-actions-triggers
- Typeform: https://help.gohighlevel.com/support/solutions/articles/155000006443-typeform-actions-triggers-in-workflows
- Google Forms: https://help.gohighlevel.com/support/solutions/articles/155000007217-google-forms-actions-and-triggers-in-workflows
- Vapi: https://help.gohighlevel.com/support/solutions/articles/155000007349-vapi-actions-and-triggers-in-workflows

---

## 16. Pendientes / no confirmados

| Elemento | Estado |
|---|---|
| Rental Booking: filtros | sin artículo propio (no confirmado en doc oficial) |
| Certificates Issued: filtros | sin artículo propio (no confirmado en doc oficial) |
| Affiliate "Lead Created": filtros y sobre qué contacto corre | sin artículo propio (no confirmado en doc oficial) |
| Lesson Started / Category Started / Product Started: filtros exactos | solo el changelog (no confirmado en doc oficial) |
| Email Events: evento "Delivered" | el listado maestro lo menciona; el artículo específico no (no confirmado) |
| Invoice: estados "created" y "due" | el listado maestro los menciona; el artículo lista Paid/Partially Paid/Sent/Viewed/Void |
| Variables del Inbound Webhook (`{{inboundWebhookRequest.*}}`) | no confirmado en doc oficial |
| Operadores de filtros de Custom Object Changed y Company Created | no detallados |
| "Form Partially Completed", "Payment Failed" como triggers propios | no aparecen en la doc oficial (el pago fallido se cubre con Payment Received + Payment Status = Failed) |
| Page View: exige contacto identificado | no confirmado en doc oficial |
| Lead forms de Instagram: si usan el trigger de Facebook | no confirmado en doc oficial |

---

## 17. Fuentes

**Índices oficiales**
- https://help.gohighlevel.com/support/solutions/articles/155000002292-a-list-of-workflow-triggers
- https://help.gohighlevel.com/support/solutions/folders/48000666397 (carpeta "Workflow Triggers", 2 páginas)
- Subcarpetas: 155000001337 (Contact), 155000001338 (Opportunity), 155000001339 (Company), 155000000737 (Events), 155000000738 (Appointments), 155000000741 (Courses), 155000000742 (Payments), 155000000743 (Shopify), 155000000746 (Communities), 155000000807 (Forms/Surveys), 155000000808 (TikTok), 155000000836 (LinkedIn), bajo `https://help.gohighlevel.com/support/solutions/folders/<id>`
- https://help.gohighlevel.com/support/solutions/articles/155000006636-workflow-trigger-narration-and-statistics
- https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview
- https://help.gohighlevel.com/support/solutions/articles/155000004610-t-c-filter-for-forms-surveys-quizzes-in-workflows

**Artículos por trigger** (help.gohighlevel.com/support/solutions/articles/…)
- Contact: 155000002486, 155000002477, 155000002482, 48001213546, 155000002673, 155000002670, 48000987572, 155000002674, 155000003248, 155000003249, 48001213879, 155000003260, 155000003261, 155000003495, 155000001166, 155000003496, 155000003263
- Company / Objects: 155000006609, 155000006494, 155000004389, 155000006701
- Events: 48001237383, 155000003147, 155000006653, 48001212511, 155000002552, 155000002678, 155000002677, 155000002046, 155000008196, 155000007650, 155000002550, 155000003259, 155000004437, 155000003095, 155000005064, 155000003262, 155000003497, 155000003142, 155000003163, 155000003201, 155000003498, 155000002027, 155000006092, 155000003873, 155000004634, 155000005602, 155000006632
- Appointments: 155000002619, 155000002675, 155000006140, 155000006649
- Opportunities: 155000003499, 155000000887, 155000003252, 155000002493, 155000000886, 155000002492
- Payments: 155000003534, 48001238334, 155000002835, 155000003253, 155000004303, 155000003535, 155000003536, 155000002213, 155000003537, 155000001491, 155000003704, 155000005641, 155000005658, 155000005660, 155000005661
- Ecommerce: 155000007380, 155000007390, 155000003254, 155000007386, 155000003255, 155000002618
- Courses / Portal: 155000002671, 155000005110, 155000003258, 155000003098, 155000003250, 155000003251, 155000003256, 155000003257, 155000003099, 155000008244, 155000001236
- Communities: 155000003538, 155000003539, 155000003681, 155000004080
- Affiliate: 155000003663, 155000003040, 155000003664
- Social: 155000004645, 155000004646, 155000002055, 155000006703
- IVR: 155000003203, 155000001200
- Google Ads: 155000006989
- Events (módulo): 155000008431
- Conversation AI: 155000004098
- Integraciones: 155000008110, 155000007879, 155000006443, 155000007217, 155000007349

**Marketplace**
- https://marketplace.gohighlevel.com/docs/marketplace-modules/CustomTriggers/index.html
- https://marketplace.gohighlevel.com/docs/marketplace-modules/WorkflowActionsAndTriggers/index.html

**Changelog (ideas.gohighlevel.com/changelog/…)**
- workflow-scheduler-trigger · workflow-updates-enhanced-opportunity-changed-trigger · contact-engagement-score-triggers-and-actions · community-leaderboard-workflow-trigger-action · new-communities-triggers-in-workflows-automate-more-faster · client-portal-user-login-workflow-trigger-now-supports-the-new-client-portal-exp · introducing-company-based-workflows · workflow-membership-updates · new-trigger-for-workflows · trigger-a-workflow-within-conversation-ai
