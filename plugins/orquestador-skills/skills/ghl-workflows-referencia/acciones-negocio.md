# GHL Workflows: acciones de objetos de negocio (oportunidades, citas, pagos, membresías, afiliados, marketing, IVR, contactos)

> **Cómo usar este archivo:** busca la acción por su nombre en inglés (tal como sale en el constructor), copia los campos de configuración y lee los "Ojo" antes de publicar. Todo sale de la documentación oficial de HighLevel (consultada el 23-sep-2026); lo que no se pudo verificar ahí lleva la marca **(no confirmado en doc oficial)**.

Convenciones:
- **Nombre en el constructor** = texto exacto de la UI en inglés.
- "Contexto de oportunidad/cita" = el objeto que el workflow "tiene en la mano": lo aporta el trigger (p. ej. Opportunity Created) o un paso previo (p. ej. Find Opportunity).
- Los triggers aquí solo se **nombran**; el detalle está en el archivo de triggers de esta skill.

---

## Índice

1. [Oportunidades y pipelines](#1-oportunidades-y-pipelines)
   - 1.1 Cómo funcionan · 1.2 Find Opportunity · 1.3 Create Opportunity · 1.4 Update Opportunity · 1.5 Create/Update Opportunity (obsoleta) · 1.6 Remove Opportunity · 1.7 Owner y followers · 1.8 Triggers relacionados
2. [Citas y calendarios](#2-citas-y-calendarios)
   - 2.1 Tipos de calendario · 2.2 Update Appointment Status · 2.3 Generate One Time Booking Link · 2.4 Book Appointment · 2.5 Create Appointment Note · 2.6 Appointment Booking Conversation AI Bot · 2.7 Triggers
3. [Pagos, facturas, documentos y ecommerce](#3-pagos-facturas-documentos-y-ecommerce)
   - 3.1 Send Invoice · 3.2 Send Recurring Invoice · 3.3 Send Estimate · 3.4 Send Documents & Contracts · 3.5 Stripe One-Time Charge · 3.6 Cupones, Text2Pay y pedidos (sin acción) · 3.7 Triggers
4. [Membresías, cursos, comunidades y certificados](#4-membresías-cursos-comunidades-y-certificados)
5. [Afiliados](#5-afiliados)
6. [Marketing y conversiones](#6-marketing-y-conversiones)
7. [IVR y bots de IA de citas (Eliza / Conversation AI)](#7-ivr-y-bots-de-ia-de-citas)
8. [Contactos: lo básico para automatizar](#8-contactos-lo-básico-para-automatizar)
9. [Fuentes](#fuentes)

---

## 1. Oportunidades y pipelines

### 1.1 Cómo funcionan
- **Pipeline** = el proceso de venta completo. **Stage** = cada paso ("New Lead", "Booked Call", "Closed"…). Una **opportunity** es un trato concreto que avanza por las etapas y **siempre está ligada a un contacto** (el contacto principal; admite hasta **10 "Additional Contacts"**).
  https://help.gohighlevel.com/support/solutions/articles/155000005062-getting-started-setup-pipelines-and-opportunities · https://help.gohighlevel.com/support/solutions/articles/155000002000-opportunities-faqs
- **Status**: hay **cuatro fijos**, que no se pueden renombrar ni ampliar: **Open** (en curso), **Won** (ganada), **Lost** (perdida) y **Abandoned** (abandonada, sin seguimiento previsto). Al marcar Lost se puede poner un **Lost Reason**. Sus valores se editan en Settings › Custom Fields y el cambio se propaga a todo. El trigger Opportunity Status Changed se puede filtrar por Lost Reason.
  https://help.gohighlevel.com/support/solutions/articles/48000982199-opportunity-statuses-won-lost-and-abandoned
- **Opportunity Value** (valor monetario del trato; en la acción antigua se llamaba "Lead Value"): acepta un número fijo o un merge field. Si se deja vacío al crear, queda en **0**.
- **Owner**: el usuario asignado. Si en los ajustes de Opportunities & Pipelines está activada la **sincronización del owner de contacto y oportunidad**, cambiar uno cambia el otro.
- **Allow duplicate opportunities** (ajuste de oportunidades): si está desactivado, un contacto no puede estar en dos oportunidades (ni como principal ni como adicional). https://help.gohighlevel.com/support/solutions/articles/155000002000-opportunities-faqs
- **Ajuste del workflow "Allow multiple Opportunities"**: hace una ejecución independiente por cada oportunidad (viene activado en workflows nuevos). https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview
- **Custom fields de oportunidad**: son distintos de los de contacto y **no se puede cambiar el objeto** después de crear el campo. Solo los de contacto aparecen en formularios y en workflows de contacto. https://help.gohighlevel.com/support/solutions/articles/48001161579-how-to-use-custom-fields
- **If/Else con campos de oportunidad**: solo funciona si hay contexto de oportunidad (trigger de oportunidad o Find Opportunity previo). https://help.gohighlevel.com/support/solutions/articles/155000002048-automating-opportunities
- **Cambio de marzo de 2025**: la acción única "Create/Update Opportunity" se sustituyó por acciones separadas: Find, Create, Update, Add/Remove Owner, Add/Remove Follower(s) y un Remove Opportunity mejorado. https://ideas.gohighlevel.com/changelog/opportunity-workflow-actions

### 1.2 Find Opportunity
- **Para qué:** localiza una oportunidad existente del contacto del workflow y la deja como **contexto** para los pasos siguientes (Update, Remove, Add Owner…).
- **Campos:**
  - **Action Name** (obligatorio).
  - **Opportunity to be Found**: **Earliest** (la creada primero) o **Latest** (la más reciente). Obligatorio.
  - **Filters**: una o varias condiciones sobre campos estándar o custom de la oportunidad (pipeline, etapa, estado…). Todas se combinan en **AND** y no hay límite de filtros. Obligatorio.
- **Ramas:** **Opportunity Found** / **Opportunity Not Found**.
- **Ojo:**
  - Devuelve **una sola** oportunidad aunque coincidan varias (según Earliest/Latest).
  - Si el workflow **no tiene contacto** (p. ej. Inbound Webhook sin contacto), hay que mapear los filtros a parámetros del webhook.
  - Patrón típico: formulario → Find Opportunity → Found: Update / Not Found: Create.
- https://help.gohighlevel.com/support/solutions/articles/155000004751-workflow-action-find-opportunity

### 1.3 Create Opportunity
> ⚠️ **Verificado en la interfaz (sep 2026), manda sobre la doc:** la acción **no tiene "Ownership Settings" ni ningún campo de owner o usuario**. Campos reales: `ACTION NAME`, `PIPELINE *` (preseleccionado si solo hay uno), la insignia `Duplicate opportunity · Disabled` (no es un interruptor, enlaza a los ajustes) y la lista `FIELDS`, **que empieza vacía**: hay que añadir cada campo con `+ Add field` (fila "Select a field" + valor). Opciones: Opportunity Name, Pipeline Stage (no se añade sola; al añadirla elige la 1.ª etapa), Opportunity Value, Status (Open/Won/Lost/Abandoned), Opportunity Source, Lost Reason, Expected Close Date, Forecast Probability y Custom Fields.
> **Para poner owner:** `Create Opportunity` → `Find Opportunity` (Latest + filtro Pipeline) → rama *Opportunity Found* → `Add Owner to Opportunity` (ver 1.7).
> ⚠️ En el buscador de acciones "opportunity" lista primero **Create/update opportunity (OBSOLETA)** y en el panel las dos se titulan "Create opportunity". La obsoleta lleva icono **$** y un "Action deprecation notice": no la elijas.

- **Para qué:** crea una oportunidad nueva sin tocar las que ya existen.
- **Campos:**
  | Campo | Obligatorio | Si se deja vacío |
  |---|---|---|
  | **Action Name** | Sí | — |
  | **Pipeline** | Sí | — |
  | **Pipeline Stage** | No | Primera etapa del pipeline |
  | **Opportunity Name** | No | Nombre del contacto (admite `{{contact.first_name}}`, etc.) |
  | **Opportunity Source** | No | Queda vacío |
  | **Status** | No | Open |
  | **Opportunity Value** | No | 0 |
  | ~~Ownership Settings~~ | — | **No existe en la interfaz actual** (ver aviso arriba) |
  | **Other Custom Fields** | No | Custom fields de oportunidad adicionales |
  | Toggle **Duplicate Opportunity** | — | Ver "Ojo" |
- **Ojo:**
  - Con **Duplicate Opportunity desactivado**, **no se crea nada** si el contacto ya tiene una oportunidad vinculada. La comprobación va por **ID de contacto**, no por nombre de oportunidad.
  - **Hace falta contacto** en el workflow; sin contacto no se puede crear.
  - La oportunidad creada **no pasa a ser contexto** para un Update posterior del mismo workflow (ver 1.4).
- https://help.gohighlevel.com/support/solutions/articles/155000004752-workflow-action-create-opportunity

### 1.4 Update Opportunity
- **Para qué:** modifica la oportunidad que hay en contexto: mover de etapa o de pipeline, cambiar estado, valor o fuente. El changelog también menciona el nombre.
- **Campos:**
  - **Action Name** (interno).
  - **Pipeline** (sirve también para mover la oportunidad a otro pipeline).
  - **Pipeline Stage**.
  - **Status**: Open / Won / Lost. La doc de esta acción no menciona Abandoned **(no confirmado en doc oficial si Abandoned está disponible aquí)**.
  - **Opportunity Source** (admite custom values, p. ej. `{{contact.source}}`).
  - **Opportunity Value** (fijo o dinámico, p. ej. `{{contact.quoted_price}}`).
  - Toggle **Allow Opportunity to Move to Any Previous Stage**: **apagado por defecto**, así que solo se mueve hacia delante o se queda en la misma etapa.
  - Toggle **Duplicate Opportunity**: aparece en la UI pero **no hace nada** en esta acción (no crea oportunidades).
- **A qué oportunidad afecta:** a la del trigger (si el trigger es de oportunidad) o a la localizada con un **Find Opportunity** previo.
- **Ojo:**
  - **Sin oportunidad en contexto, el paso se salta.**
  - **No** actualiza una oportunidad creada antes con Create Opportunity en el mismo workflow. Mete un Find Opportunity entre medias.
  - **No** cambia el owner: usa **Add Owner to Opportunity**.
- https://help.gohighlevel.com/support/solutions/articles/155000004753-workflow-action-update-opportunity

### 1.5 Create/Update Opportunity (OBSOLETA)
- **Estado:** "gradually being phased out" para workflows nuevos. Sigue en workflows antiguos. **No la uses en diseños nuevos.**
- **Campos:** **Action Name**\*, **In Pipeline**\*, **In Pipeline Stage**\*, **Opportunity Name**\*, **Opportunity Source**\*, **Lead Value**, **Status**\*.
- **Toggles:** **Allow Opportunity to Move to Any Previous Stage in Pipeline** y **Allow Duplicate Opportunities**.
- **Ojo:** **no** usa la oportunidad que disparó el workflow ni el resultado de un Find Opportunity.
- https://help.gohighlevel.com/support/solutions/articles/155000002476-workflow-action-create-update-opportunity

### 1.6 Remove Opportunity
- **Para qué:** borra oportunidades del contacto.
- **Opciones:**
  - **Remove all opportunities for the contact in the pipeline** (todas las del contacto en el pipeline elegido).
  - **Only the opportunity that triggered the workflow** o la encontrada con Find Opportunity.
- **Ojo:** una oportunidad borrada **se puede recuperar durante 2 meses, pero solo de una en una, no en bloque**. La doc pide usarla "with caution".
- https://help.gohighlevel.com/support/solutions/articles/155000003365-workflow-action-remove-opportunity

### 1.7 Owner y followers de oportunidad
- **Add Owner to Opportunity**
  - Campos: **Action Name**\*, **User**\* (desplegable), toggle **Only Apply to Unassigned Opportunities**.
  - Sin ese toggle **sobrescribe** el owner actual. Si la sincronización contacto-oportunidad está activa, también cambia el owner del contacto. Sin oportunidad en contexto, el paso se salta.
  - https://help.gohighlevel.com/support/solutions/articles/155000004754-workflow-action-add-owner-to-opportunity
- **Remove Owner from Opportunity**: quita el owner. https://help.gohighlevel.com/support/solutions/articles/155000004755-workflow-action-remove-owner-from-opportunity
- **Add Follower(s) to Opportunity** / **Remove Follower(s) from Opportunity**: gestionan los usuarios que reciben avisos de la oportunidad. https://help.gohighlevel.com/support/solutions/articles/155000004756-workflow-action-add-follower-s-to-opportunity
- Las cuatro necesitan contexto de oportunidad (trigger de oportunidad o Find Opportunity).

### 1.8 Triggers relacionados (solo nombres)
Opportunity Created · Opportunity Changed · Opportunity Status Changed (filtros por estado y Lost Reason) · Pipeline Stage Changed · Stale Opportunities ("no change for X days").
https://help.gohighlevel.com/support/solutions/articles/155000002048-automating-opportunities · https://help.gohighlevel.com/support/solutions/articles/155000003252-workflow-trigger-opportunity-status-changed · https://help.gohighlevel.com/support/solutions/articles/155000002493-workflow-trigger-pipeline-stage-changed

---

## 2. Citas y calendarios

### 2.1 Tipos de calendario (lo básico)
- **Personal**: un solo miembro del equipo. Mismas funciones que Round Robin.
- **Round Robin**: reparte las citas entre varios miembros según disponibilidad o carga.
- **Collective**: la cita necesita a varios miembros; el "primary owner" dirige y es el owner de la cita.
- **Class Booking**: uno a muchos (webinars, talleres); varios invitados por reserva.
- **Service Menu** y **Service Calendars (v1)**: legacy. **Services (v2)** es el sistema nuevo para negocios de servicios, con su propio trigger Service Booking.
- **Rentals**: vista de alquileres.
- La vista "Meetings" agrupa los tipos legacy.
- https://help.gohighlevel.com/support/solutions/folders/155000000686 · https://help.gohighlevel.com/support/solutions/articles/155000001485-round-robin-calendars-the-setup-guide · https://help.gohighlevel.com/support/solutions/articles/155000003557-creating-collective-booking-calendars · https://help.gohighlevel.com/support/solutions/articles/48001236022-class-booking-calendar-overview · https://help.gohighlevel.com/support/solutions/articles/155000005153-how-to-set-up-a-personal-booking-calendar-with-highlevel

### 2.2 Update Appointment Status
- **Para qué:** cambia el estado de una cita del contacto.
- **Campos:** **Action Name** (opcional) y **Status**\*: **New · Confirmed · Cancelled · Showed · No-show · Invalid**.
- **A qué cita afecta:** a la del trigger si este es de cita (Appointment Status, Customer Booked Appointment). Si no, a la **cita más reciente** del contacto.
- **Ojo:**
  - Si el trigger no es de cita, puede tocar una cita que no querías (la más reciente).
  - Con calendarios externos (Google, Outlook o iCloud) sincronizados, pasar a **Showed** o **No-show** **no** actualiza el evento externo (así evita el email "event updated" a los asistentes).
- https://help.gohighlevel.com/support/solutions/articles/155000003364-workflow-action-update-appointment-status

### 2.3 Generate One Time Booking Link
- **Para qué:** genera un enlace de reserva **de un solo uso**, que caduca cuando se usa para reservar. Evita reservas múltiples con el mismo enlace.
- **Campos:** **Calendar**\*.
- **Salida:** un custom value **"One Time Link"** que se inserta desde el selector de custom values en un Send Email o Send SMS posterior.
- **Ojo:**
  - Esta acción **no envía nada**: hace falta un paso de comunicación después.
  - Se genera un enlace nuevo en cada ejecución.
  - Caduca **al reservar**, no por tiempo.
- https://help.gohighlevel.com/support/solutions/articles/155000003461-workflow-action-generate-one-time-booking-link · https://help.gohighlevel.com/support/solutions/articles/155000001692-one-time-link

### 2.4 Book Appointment
- **Para qué:** crea una cita desde el workflow, sin que el contacto use el widget.
- **Campos:**
  - **Action Name** y descripción opcional.
  - **Calendar**\*.
  - **Team Member**: **Calendar Default** (sigue las reglas del calendario, p. ej. round robin) o **Specific member**.
  - **Appointment Date & Time**: fija (**Standard**) o **dinámica**, mapeada desde datos del trigger. Formatos admitidos: `MM-DD-YYYY HH:MM` y `DD-MMM-YYYY HH:MM`. Para otros formatos, convierte antes con **Date/Time Formatter**.
  - Toggle **Override Availability**: apagado valida la disponibilidad; encendido la ignora (úsalo poco).
- **Ramas:** **Appointment booked successfully** True/False.
- **Ojo:**
  - Los calendarios con **"Recurring" activado no se pueden seleccionar**.
  - Sin disponibilidad (y sin override), falla y va por la rama False.
- https://help.gohighlevel.com/support/solutions/articles/155000004209-workflow-action-book-appointment

### 2.5 Create Appointment Note
- **Para qué:** añade una nota interna a la cita. Se ve en el contacto, la oportunidad y la conversación.
- **Campos:** **body**\* (máximo **5000 caracteres**) y **appointmentId** (solo obligatorio con trigger Inbound Webhook).
- **Ojo:** con Inbound Webhook hay que pasar `{{inboundWebhookRequest.appointmentId}}` y `{{inboundWebhookRequest.body}}`. Con triggers de cita, el ID se rellena solo.
- https://help.gohighlevel.com/support/solutions/articles/155000004580-create-appointment-note-workflow-action

### 2.6 Appointment Booking Conversation AI Bot
Ver sección 7.3.

### 2.7 Triggers relacionados (solo nombres)
Appointment Status · Customer Booked Appointment · Service Booking (Services v2) · Rental Booking. El Wait "An upcoming appointment or booking" sirve para recordatorios relativos a la cita.
https://help.gohighlevel.com/support/solutions/articles/155000002619-workflow-trigger-appointment-status · https://help.gohighlevel.com/support/solutions/articles/155000002697-appointment-scenarios-in-workflow · https://help.gohighlevel.com/support/solutions/articles/155000004050-if-else-workflow-action-appointment-filter-options

---

## 3. Pagos, facturas, documentos y ecommerce

### 3.1 Send Invoice
- **Para qué:** crea y envía una **factura puntual** a partir de una plantilla de factura.
- **Requisitos previos:** al menos una **plantilla de factura**, una **pasarela de pago conectada** en modo Live y que el contacto tenga email y/o teléfono según el canal.
- **Campos:**
  - **From User** (quién emite).
  - **Invoice Template** (elígela siempre de forma explícita; no dependas de la plantilla por defecto).
  - **Payment Mode**: **Live** (cobrable) / **Test** (sandbox, sin cobro).
  - **Channel**: Email, SMS o ambos (por defecto **Email & Text**).
- **Ojo:**
  - Solo envía por los canales disponibles: si eliges Email & SMS y el contacto no tiene teléfono, solo sale el email.
  - **No hay campo de fecha de vencimiento** en la acción; viene de la plantilla **(no confirmado en doc oficial)**.
  - El comportamiento de Test depende de la pasarela.
  - Seguimiento: Execution Logs y Payments › Invoices (Sent / Viewed / Paid).
- https://help.gohighlevel.com/support/solutions/articles/155000003494-workflow-action-send-invoice

### 3.2 Send Recurring Invoice
- **Para qué:** programa facturas recurrentes (cuotas o suscripción por factura).
- **Campos:**
  - **From User** e **Invoice Template**\*.
  - **Mode** Test/Live.
  - **Channel**: Email / Text / Email & Text (por defecto).
  - **Start Date**: **Action Date** (cuando se ejecuta el paso) o **Fixed Date**.
  - **Frequency**: Daily / Weekly / Monthly / Yearly, con intervalo.
  - **End**: **Never** o **After X Occurrences**.
  - **Days in Advance**: envía la factura N días antes del vencimiento.
  - Toggle **Auto-Payment**: cobra automáticamente tras el primer pago correcto.
- **Ojo:**
  - Auto-pay **solo funciona con Stripe** y la tarjeta se guarda tras el **primer pago correcto**.
  - Un auto-pay fallido deja la factura impagada; monta tu propio flujo de reintento.
  - Cambiar Live/Test solo afecta a programaciones **nuevas**.
- https://help.gohighlevel.com/support/solutions/articles/155000005627-workflow-action-send-recurring-invoice

### 3.3 Send Estimate
- **Para qué:** genera un **presupuesto** desde una plantilla y lo envía (o lo deja en borrador).
- **Campos:**
  - **From User** y **Estimate Template**.
  - **Payment Mode** Live/Test.
  - **Sending Mode**: **Create as Draft** (revisión manual) / **Send Directly**.
  - **Channel**: Email / Text / Email & Text (por defecto).
- **Ojo:**
  - Necesita pagos activados, una plantilla activa y email o teléfono válido.
  - Si el usuario remitente se desactiva, **cámbialo en la acción**.
  - Estados posteriores: Sent, Viewed, Accepted, Declined, Paid, que se pueden usar con el trigger Estimates.
- https://help.gohighlevel.com/support/solutions/articles/155000003705-workflow-action-send-estimate

### 3.4 Send Documents & Contracts
- En el listado general aparece como "Send Documents and Contracts".
- **Para qué:** genera un documento o contrato (propuesta, acuerdo) desde una plantilla y lo envía o lo deja en borrador.
- **Campos:**
  - **Action Name**.
  - **From User** (remitente que aparece en el documento).
  - **Template** (tiene que estar guardada).
  - **Sending Mode**: **Create as Draft** / **Send Directly**.
  - **Channel**: Email, SMS o ambos.
  - Asignación dinámica de los campos "To be signed by → Sender": **From User** o **Template Owner** (quien modificó la plantilla por última vez).
- **Ojo:**
  - **Exige email en el contacto incluso si el canal es SMS.** Sin email, el documento se genera pero **se queda en Drafts** hasta que se añade uno.
  - El workflow evalúa el estado del documento **solo al entrar el contacto**. Para reaccionar a "firmado", usa **otro workflow** con el trigger **Documents & Contracts**.
  - En modo Draft, el envío final se hace a mano desde Documents & Contracts.
- https://help.gohighlevel.com/support/solutions/articles/155000004887-workflow-action-send-documents-contracts · https://help.gohighlevel.com/support/solutions/articles/155000001301-how-to-create-and-send-document-or-contract-templates-automatically-in-a-workflow · https://help.gohighlevel.com/support/solutions/articles/155000007513-send-documents-and-contracts-via-sms-in-highlevel

### 3.5 Stripe One-Time Charge
- **Para qué:** hace un cargo puntual en Stripe cada vez que se ejecuta (cobro por lead, por cita, por formulario).
- **Requisitos:** Stripe conectado en Settings › Integrations; un **Customer ID de Stripe** existente con **tarjeta por defecto**.
- **Campos:**
  - **Customer ID**\*.
  - **Amount**\* (admite custom variables).
  - **Currency**\* (desplegable).
  - **Description** (opcional; aparece en Stripe).
- **Ojo (importante):**
  - La doc dice que **no está pensada para que la sub-cuenta cobre a sus contactos**, sino para que la **agencia cobre a los administradores de sus sub-cuentas**. Para cobrar a clientes finales usa Send Invoice, order forms o checkout.
  - No crea clientes en Stripe.
  - **No reintenta** los cargos fallidos.
  - Los reembolsos se hacen en Stripe.
  - Solo cargos únicos, no suscripciones.
- https://help.gohighlevel.com/support/solutions/articles/48001202784-workflow-action-stripe-one-time-charge · https://help.gohighlevel.com/support/solutions/articles/48001151476-one-time-stripe-charge-action

### 3.6 Cupones, Text2Pay y pedidos: sin acción de workflow
- **Cupones:** existen **triggers** (Coupon Code Applied, Coupon Code Redeemed, Coupon Code Expired, Coupon Redemption Limit Reached), pero **no hay acción para crear o generar cupones**. Sigue siendo una petición abierta en el portal de ideas. Applied se dispara aunque no se complete la compra; Redeemed solo con el pedido pagado.
  https://help.gohighlevel.com/support/solutions/articles/155000005641-workflow-trigger-coupon-code-applied · https://help.gohighlevel.com/support/solutions/articles/155000005658-workflow-trigger-coupon-code-redeemed · https://help.gohighlevel.com/support/solutions/articles/155000005660-workflow-trigger-coupon-redemption-limit-reached · https://ideas.gohighlevel.com/invoice/p/generate-single-use-coupons
- **Text2Pay (Text-To-Pay Links):** es una función **manual** desde Conversations (SMS › Request Payment). **No hay acción de workflow documentada.** Los pagos que llegan por Text2Pay sí se pueden capturar con el trigger **Payment Received** (source). https://help.gohighlevel.com/support/solutions/articles/48001202185-text-to-pay-links
- **Pedidos o fulfillment:** existe el **trigger Order Fulfilled** (tiendas de HighLevel, Shopify, Shippo, ShipStation). **No se encontró ninguna acción "Update Order" ni "Fulfill Order"** **(no confirmado en doc oficial)**. https://help.gohighlevel.com/support/solutions/articles/155000007390-workflow-trigger-order-fulfilled-for-ecommerce-stores-

### 3.7 Triggers relacionados (solo nombres)
Payment Received · Invoice · Order Form Submission · Order Submitted · Documents & Contracts · Estimates · Subscription · Refund · Coupon (×4) · Order Fulfilled · Abandoned Checkout · Shopify Order Placed.
Tip: `{{Order.Amount}}` solo existe con **Order Submitted**, no con Order Form Submission (ver 6.2).

---

## 4. Membresías, cursos, comunidades y certificados

### 4.1 Course Grant Offer
- **Para qué:** da acceso a los productos o cursos incluidos en una **Offer**, con o sin pasarela de pago.
- **Campos:**
  - **Action Name**.
  - **Offer**: tiene que estar **creada antes** en Memberships › Offers; no se puede crear desde el workflow.
- **Ojo:**
  - **No envía credenciales de acceso** por sí sola: añade un Send Email con la plantilla de acceso.
  - Si el contacto ya tenía la oferta, **no duplica la inscripción ni reinicia el progreso**. Aun así, los pasos siguientes (emails) se ejecutan: pon un If/Else si no quieres reenviar.
  - La doc no documenta ningún toggle de email de bienvenida dentro de la acción **(no confirmado en doc oficial)**.
- https://help.gohighlevel.com/support/solutions/articles/155000003378-workflow-action-course-grant-offer · https://help.gohighlevel.com/support/solutions/articles/155000002845-how-to-grant-access-to-membership-courses-using-workflows

### 4.2 Course Revoke Offer
- **Para qué:** quita el acceso de una oferta (suscripción vencida, pago fallido, reembolso).
- **Campos:** **Action Name** y **Offer**\* (la oferta concreta que se revoca).
- **Ojo:**
  - Se revoca **por oferta**, no por curso suelto. Si un curso está en varias ofertas, el contacto puede conservar el acceso por otra oferta **(no confirmado en doc oficial)**.
  - Una sola oferta por acción; la selección múltiple es una petición abierta.
- https://help.gohighlevel.com/support/solutions/articles/155000003382-workflow-action-course-revoke-offer · https://ideas.gohighlevel.com/memberships/p/multi-select-revoke-offer-and-add-offer-action-step-for-courses
- **"Grant/Revoke Product access"** como acción separada de la oferta: **no aparece en la doc oficial actual**. El acceso se gestiona por Offer **(no confirmado en doc oficial)**.

### 4.3 Grant Group Access / Revoke Group Access (Communities)
- **Para qué:** da o quita al contacto del workflow el acceso a un **grupo de Communities**.
- **Campos:** **Group**\* (el contacto es el del workflow).
- **Ojo:**
  - No confundir con los triggers **Group Access Granted/Revoked**. Si un workflow cambia el acceso y otro arranca con ese cambio, revisa que no se forme un **bucle**.
  - Los canales privados tienen acciones propias (4.4).
  - Para solicitudes pendientes existe el trigger **Requested to Join Group**, que se combina con Grant Group Access para aprobar automáticamente.
- https://help.gohighlevel.com/support/solutions/articles/155000001239-workflow-triggers-for-communities-granting-and-revoking-group-access · https://ideas.gohighlevel.com/changelog/communities-smarter-join-requests-with-workflow-automation

### 4.4 Grant Private Channel Access / Revoke Private Channel Access
- **Campos:** **Group**\* y **Channel**\* (solo aparecen canales privados).
- **Ojo:** Grant **mete también en el grupo** si el contacto no era miembro. Revoke quita **solo el canal**; el contacto sigue en el grupo.
- Triggers: Private Channel Access Granted / Revoked.
- https://help.gohighlevel.com/support/solutions/articles/155000003681-workflow-trigger-action-grant-revoke-private-channel-access

### 4.5 Issue Certificate
- **Para qué:** emite un certificado (p. ej. tras aprobar un quiz o completar un curso).
- **Campos:** la doc no detalla los campos **(no confirmado en doc oficial; se presupone la selección de certificado)**.
- **Ojo:**
  - Los emitidos por workflow aparecen en Memberships › Certificates › Issued Certificates.
  - Cada curso nuevo ya trae un **certificado de finalización por defecto** (y existen certificados por categoría), así que puede que no necesites la acción.
  - Patrón oficial: trigger **Lesson Completed** con filtros (quiz o assignment aprobado) → **Issue Certificate**.
- Trigger: **Certificate Issued**.
- https://help.gohighlevel.com/support/solutions/articles/155000002376-issue-certificates-triggers-and-actions · https://help.gohighlevel.com/support/solutions/articles/155000005110-how-to-send-a-certificate-after-passing-a-quiz-or-assignment · https://help.gohighlevel.com/support/solutions/articles/155000004599-default-certificates-in-courses-category-completion-certificate

### 4.6 Triggers relacionados (solo nombres)
New Signup · Offer Access Granted/Removed · Product Access Granted/Removed · Product Started/Completed · Category Started/Completed · Lesson Started/Completed · User Login · Certificate Issued · Group Access Granted/Revoked · Private Channel Access Granted/Revoked · Requested to Join Group · Leaderboard Level Changed. También hay condiciones de membresía en If/Else.
https://ideas.gohighlevel.com/changelog/workflow-membership-updates · https://help.gohighlevel.com/support/solutions/articles/155000003251-workflow-trigger-offer-access-removed · https://help.gohighlevel.com/support/solutions/articles/155000008289-communities-workflow-triggers-for-posts-comments-requests-and-events

---

## 5. Afiliados
Acciones del **Affiliate Manager** de la sub-cuenta. https://ideas.gohighlevel.com/changelog/affiliate-manager-actions-are-now-in-workflows · https://help.gohighlevel.com/support/solutions/articles/155000003663-getting-started-with-affiliate-automations

### 5.1 Add To Affiliate Manager
- En el listado general: "Add to Affiliate Manager".
- **Para qué:** convierte al contacto en **afiliado** del Affiliate Manager. Es el "crear afiliado".
- **Campos:** **Action Name**. No documenta otros campos.
- **Ojo:** el afiliado queda **activo** por defecto. Patrón típico: tag "Affiliate" añadido → esta acción.
- https://help.gohighlevel.com/support/solutions/articles/155000003227-workflow-action-add-to-affiliate-manager

### 5.2 Add To Affiliate Campaign
- **Para qué:** convierte al contacto en afiliado y lo **inscribe en una campaña** de afiliados concreta. Puede generar comisiones desde ese momento.
- **Campos:** **Action Name** y **Affiliate Campaign**\* (desplegable).
- https://help.gohighlevel.com/support/solutions/articles/155000003228-workflow-action-add-to-affiliate-campaign

### 5.3 Remove From Affiliate Campaign
- **Para qué:** saca al afiliado de una campaña; su enlace de referido **deja de generar comisiones** en ella.
- **Campos:** **Action Name** y **Affiliate Campaign**\*.
- https://help.gohighlevel.com/support/solutions/articles/155000003230-workflow-action-remove-from-affiliate-campaign

### 5.4 Update Affiliate
- **Para qué:** cambia el **estado** del afiliado.
- **Campos:** **Action Name** y **Status**: **Active / Inactive** (solo esas dos).
- **Ojo:** en Inactive "can no longer generate commissions and sales". No edita otros datos del afiliado. La suspensión de afiliados es una función aparte del Affiliate Manager.
- https://help.gohighlevel.com/support/solutions/articles/155000003229-action-update-affiliate-workflow-action-update-affiliate · https://ideas.gohighlevel.com/changelog/sub-account-affiliate-manager-suspend-affiliates

### 5.5 Add Leads under an Affiliate
- **Para qué:** asigna el contacto (lead) a un afiliado y a su campaña para atribuirle el mérito.
- **Métodos:**
  - **Manual**: eliges **Campaign** y **Affiliate**.
  - **Auto (Attribution via URL)**: **First-click / Last-click**; exige el parámetro `am_id` en la URL.
  - **Custom Mapping**: el `am_id` viene de un custom field o de un valor del workflow.
- **Ojo:** el método Auto depende de que `am_id` haya llegado antes (formulario o landing). No hay fallback documentado si no encuentra afiliado.
- https://help.gohighlevel.com/support/solutions/articles/155000002691-workflow-action-add-leads-under-an-affiliate · https://help.gohighlevel.com/support/solutions/articles/155000003429-workflow-action-add-leads-under-an-affiliate

### 5.6 Triggers (solo nombres)
Affiliate Created · Affiliate Enrolled In Campaign · New Affiliate Sales · Lead Created. https://help.gohighlevel.com/support/solutions/articles/155000003040-workflow-trigger-affiliate-enrolled-in-campaign

---

## 6. Marketing y conversiones

### 6.1 Add to Custom Audience (Facebook) / Remove from Custom Audience (Facebook)
- **Para qué:** mete o saca al contacto de una **audiencia personalizada** de Meta (retargeting o exclusión).
- **Campos:** la cuenta publicitaria y la audiencia conectadas **(no confirmado en doc oficial el detalle de campos; no hay artículo propio)**.
- **Ojo:** desde el **2-sep-2025** Meta marca y bloquea audiencias y conversiones con **información de salud o financiera** (p. ej. "diabetes", "credit score"). Una audiencia marcada **no acepta usuarios nuevos**. Revisa nombres y criterios de las audiencias.
- https://help.gohighlevel.com/support/solutions/articles/155000002294-what-are-workflow-actions-complete-list- · https://help.gohighlevel.com/support/solutions/articles/155000006301-meta-custom-audiences-and-conversions-restrictions · https://help.gohighlevel.com/support/solutions/articles/155000004541-how-to-create-customer-list-custom-audience

### 6.2 Facebook Conversion API (Meta Conversion API)
- **Para qué:** envía eventos de conversión del servidor a Meta sin depender del píxel del navegador.
- **Modo "Integrations"** (clásico):
  - **Pixel ID**\* (en Events Manager › Data Sources › Settings aparece como **Dataset ID**).
  - **Access Token**\* (Events Manager › Settings › Generate Access Token). Admite custom values.
  - **Event Name**: Lead / Purchase.
  - **Event Value** y **Currency**.
  - **Test Event Code**.
  - **Event Source URL**.
  - Datos de cliente que envía: IP y user agent (sin cifrar), email, nombre, fbp y fbc (sin cifrar).
- **Modo "Ad Manager"**:
  - **Event Type**: Lead Event / Funnel Event / Instagram DM.
  - **Pixel** (se rellena desde Ad Manager; el token es automático).
  - **Stage Name** (Lead Event).
  - **Value** y **Currency** (solo si Stage Name = **Purchase**; por defecto USD).
  - **Custom Mapping** opcional: FBCLID para funnel o Facebook Lead ID para lead.
- **Triggers compatibles:**
  - Funnel Event: Form Submitted, Survey Submitted, Customer Booked Appointment, Order Form Submission.
  - Lead Event: Facebook Lead Form Submission y Pipeline Stage Change. La doc clásica también admite triggers de contacto (tag, status, contact changed) si hay atribución.
- **Ojo:**
  - **El contacto necesita atribución de Facebook previa** (fbclid/fbc o fuente Paid Social). Sin ella, el paso "se ejecuta" en HighLevel pero Meta no atribuye nada.
  - En modo Ad Manager, **sin fbclid no se transmite**.
  - La deduplicación es automática (eventId).
  - En pruebas Meta muestra "Custom Event".
  - `{{Order.Amount}}` solo funciona con el trigger Order Submitted.
- https://help.gohighlevel.com/support/solutions/articles/48001185099-facebook-conversions-api-trigger-in-workflows · https://help.gohighlevel.com/support/solutions/articles/155000003691-how-to-send-a-meta-conversion-api-action-for-ad-manager- · https://help.gohighlevel.com/support/solutions/articles/48001233833-facebook-conversion-leads-walkthrough · https://help.gohighlevel.com/support/solutions/articles/48001185898-facebook-conversion-api-workflow-trigger-not-working

### 6.3 Add to Google Ads (antes "Add to Google AdWords")
- **Para qué:** envía **conversiones offline** a Google Ads, ligadas al clic original.
- **Requisitos:** Google Ads conectado en Settings › Integrations, la **conversion action creada en Google Ads** y los anuncios con parámetros de seguimiento de clic.
- **Campos:**
  - **Action Name**.
  - **Conversion**: nombre **exacto** de la conversión en Google Ads, con mayúsculas incluidas.
  - **Currency**.
  - **Conversion Value**.
  - Toggle **Custom Mapping** (mapear manualmente el click ID a campos).
- **Ojo:**
  - El contacto necesita **GCLID** (conversiones "One Per Click") o **GBRAID/WBRAID** (solo "Many Per Click"). Si el nombre no coincide o falta el ID, el paso queda **"Skipped"**.
  - La lista de conversiones tarda **unos 5 minutos** en poblarse tras el primer contacto con click ID.
  - La doc la limita a los triggers **Form Submission, Order Purchase, Number Pool Calling, Survey Submission y Chat Widget**.
  - No hay botón de prueba: revisa los Execution Logs.
- https://help.gohighlevel.com/support/solutions/articles/155000003368-workflow-action-add-to-google-ads · https://help.gohighlevel.com/support/solutions/articles/48001220947-how-to-set-up-google-ads-offline-conversion-actions-google-platform-side-setup- · https://help.gohighlevel.com/support/solutions/articles/155000005530-set-up-and-manage-offline-conversion-actions-for-google-ads

### 6.4 Add to Google Analytics
- **Para qué:** envía un evento a GA4 (Measurement Protocol) o a Universal Analytics.
- **Campos:**
  - Tipo: **Google Analytics 4** / **Universal Analytics**.
  - **Measurement ID**\*.
  - **Event Name**\* (con las reglas de nombres de Google).
  - **API Secret**\*.
  - **Event Value** (opcional).
- **Ojo:**
  - Universal Analytics está retirado por Google, así que usa GA4.
  - Si el Measurement ID o el API Secret son incorrectos, el envío falla sin avisar **(no confirmado en doc oficial el comportamiento del error)**.
- https://help.gohighlevel.com/support/solutions/articles/155000003367-workflow-action-add-to-google-analytics · https://help.gohighlevel.com/support/solutions/articles/48001223243-how-to-send-data-to-google-analytics-within-a-workflow

### 6.5 LinkedIn / TikTok
- **No hay acción oficial de conversiones para LinkedIn ni TikTok** en el listado **(no confirmado en doc oficial; solo existen los triggers LinkedIn Lead Form Submitted y TikTok Form Submitted, además de Reply in Comments para TikTok)**. Alternativa: **Custom Webhook** (premium) contra su Conversions API.
  https://help.gohighlevel.com/support/solutions/articles/155000003497-workflow-trigger-linkedin-lead-form-submitted · https://help.gohighlevel.com/support/solutions/articles/155000003262-workflow-trigger-tiktok-form-submit · https://help.gohighlevel.com/support/solutions/articles/155000006703-tiktok-dms-comment-automations

---

## 7. IVR y bots de IA de citas

### 7.1 IVR: marco general
- El IVR es un workflow cuyo trigger es **Start IVR Trigger** (llamada entrante a un número asignado).
- **Un número solo puede estar asignado a un workflow IVR a la vez.**
- El texto a voz es **solo en inglés de EE. UU.**, con voz de hombre o de mujer.
- Si el llamante cuelga, solo siguen las acciones que no son de llamada.
- https://help.gohighlevel.com/support/solutions/articles/155000001200-interactive-voice-response-ivr-guide-triggers-actions · https://help.gohighlevel.com/support/solutions/articles/155000003203-workflow-trigger-start-ivr-trigger

### 7.2 Acciones IVR
En el listado aparecen como Gather Input on Call · Play Message · Connect to Call · End Call · Record Voicemail. Los artículos las titulan "IVR Say/Play", "IVR End Call", etc.

- **Play Message (IVR Say/Play)**
  - Texto a voz (voz Man/Woman) o audio subido: **.wav recomendado; .mp3 poco fiable**.
  - **Number of Loops** (repeticiones; por defecto 1).
  - https://help.gohighlevel.com/support/solutions/articles/155000003369-workflow-action-ivr-say-play
- **Gather Input on Call**
  - Campos obligatorios: **Action Name**, **Say or Play Message**, **Text to Say**, **Language**, **Message Voice** (Man/Woman), **Number of Loops**, **Stop Gathering After (Seconds)** (5 a 30 s) y **Match Conditions** (una rama por tecla).
  - Opcionales: **Stop Gathering After (Digits)** y **Stop Gathering on Key Press**.
  - Teclas: 0-9, \*, #. Hay una rama **None** para entradas no válidas o sin entrada.
  - https://help.gohighlevel.com/support/solutions/articles/155000003370-workflow-action-ivr-gather-input-on-call
- **Connect to Call**
  - Destino: usuarios o números externos (**hasta 10**).
  - **Timeout** de 1 a 600 s (por defecto 10).
  - Duración máxima de la llamada **24 h**.
  - Detección de buzón y grabación.
  - **No admite transferencias blind ni warm** si se enruta a la web app.
  - https://help.gohighlevel.com/support/solutions/articles/155000001200-interactive-voice-response-ivr-guide-triggers-actions
- **Record Voicemail**
  - Duración máxima de 1 a 14.400 s (por defecto 1 h).
  - Corte por silencio (por defecto 5 s).
  - Tecla para terminar (0-9, \*, #).
  - Pitido opcional.
  - Mensaje previo (texto a voz o audio).
  - https://help.gohighlevel.com/support/solutions/articles/155000003373-workflow-action-record-voicemail
- **End Call (IVR End Call)**
  - Mensaje final opcional (texto a voz o audio), con loops y voz.
  - https://help.gohighlevel.com/support/solutions/articles/155000003372-workflow-action-ivr-end-call · https://help.gohighlevel.com/support/solutions/articles/155000002285-workflow-action-end-ivr-call

### 7.3 Appointment Booking Conversation AI Bot
- **Para qué:** un bot de Conversation AI conversa con el contacto para **agendar una cita**, dentro del workflow.
- **Campos:**
  - **Calendar** (no recurrente).
  - **Personality**.
  - **Additional Instructions**.
  - **Maximum Messages Limit** (5 a 25).
  - **Timeout** (minutos, horas o días).
  - **Channel**: Facebook, Instagram, SMS o WhatsApp.
  - Toggle **Confirmation Message** (que la confirmación la envíe el workflow en vez de la IA).
  - **Response Delay** (segundos; agrupa mensajes seguidos).
- **Ramas:** **Timeout** (no responde), **Appointment Was Booked** y **Appointment Was Not Booked** (llegó al límite de mensajes sin reservar). Son salidas distintas.
- **Ojo:** los calendarios recurrentes no aparecen para elegir.
- https://help.gohighlevel.com/support/solutions/articles/155000003467-appointment-booking-conversation-ai-workflow-action

### 7.4 Eliza (legacy, Marketplace)
- **Eliza AI Appointment Booking**: reserva citas con la IA de Eliza (servicio del Marketplace).
- **Send to Eliza Agent Platform**: envía el contacto a Eliza **al momento**. En cambio, el tag "Send to Eliza" solo lo envía cuando llega un mensaje entrante. El contacto aparece en los Contacts de la cuenta Eliza conectada.
- **Ojo:** es un servicio de pago aparte. Hoy la opción nativa es Conversation AI (7.3).
- https://help.gohighlevel.com/support/solutions/articles/48001236572-eliza-agent-platform-introduction-and-faqs · https://help.gohighlevel.com/support/solutions/articles/48001216782-ai-conversational-appointment-booking-workflow-and-setup

---

## 8. Contactos: lo básico para automatizar

### 8.1 Campos estándar y merge fields
- Campos estándar habituales: first/last name, email, phone, company name, address, city, state, postal code, country, website, timezone, date of birth, source, tags, assigned user (DND aparte).
- Sintaxis en workflows: `{{contact.first_name}}`, `{{contact.email}}`, etc.
- Los custom values se insertan desde el selector. El color del chip indica si el valor está disponible: **azul** = lo aporta el workflow; **amarillo** = puede salir vacío; **rojo** = no existe.
- Los espacios dentro de las llaves dan igual.
- Para teléfonos internacionales a veces hace falta el formato "raw".
- https://help.gohighlevel.com/support/solutions/articles/155000004390-overview-of-merge-fields-custom-variables · https://help.gohighlevel.com/support/solutions/articles/48001161575-how-to-use-custom-values

### 8.2 Custom fields
- **Objetos:** Contact, Opportunity, Custom Objects y Company.
- **Tipos:** Single Line / Short Text, Multi Line / Long Text, Text Box List, Number, Phone, Monetary, Dropdown (single / multiple), Radio Select, Checkbox (group), Date Picker, File Upload, Signature, Email, URL… La lista exacta varía según el objeto.
- **Carpetas:** Settings › Custom Fields › Folders.
- **Ojo:**
  - **No se puede cambiar el objeto** de un campo ya creado; hay que recrearlo.
  - Solo los campos de contacto salen en formularios y workflows de contacto.
  - En If/Else, los desplegables se comparan por **option ID**.
- https://help.gohighlevel.com/support/solutions/articles/48001161579-how-to-use-custom-fields · https://help.gohighlevel.com/support/solutions/articles/155000008031-how-to-use-custom-fields · https://help.gohighlevel.com/support/solutions/articles/155000000521-how-to-use-custom-fields-for-opportunities

### 8.3 Custom values
- Valores **a nivel de sub-cuenta** (no por contacto): enlaces, precios, fechas de evento, nombre del negocio. Se usan como `{{custom_values.<clave>}}` y se cambian con la acción **Update Custom Value**.
- Conviene centralizar en ellos todo lo que se repite en muchos emails.
- Viajan en snapshots y en "Copy workflow" (lo documenta el artículo de copia de workflows).
- https://help.gohighlevel.com/support/solutions/articles/48001161575-how-to-use-custom-values · https://help.gohighlevel.com/support/solutions/articles/155000001229-how-to-copy-workflow-to-another-sub-account-

### 8.4 DND (Do Not Disturb)
- **Canales:** Email, SMS, Calls, Facebook Messenger, GMB y WhatsApp. Se puede activar para todos o por canal.
- **Outbound DND** bloquea tus envíos por ese canal, **incluidos workflows, campañas y envíos manuales**.
- **Inbound DND** bloquea llamadas y SMS entrantes, y **solo se activa o desactiva para todos los canales a la vez**.
- **Automático:**
  - Email DND se activa por rebote, spam o baja.
  - SMS DND se activa con STOP u otros códigos de error del proveedor.
  - Para quitar un DND de SMS, el contacto tiene que volver a darse de alta (START) o hay que aportar prueba de consentimiento a soporte.
- **Acción DND Contact** (listado: "Enable/Disable DND"):
  - **Direction**: Inbound / Outbound.
  - **Enable / Disable**.
  - Alcance: **all channels** o **specific channels**.
  - En el historial queda como "DND Enabled/Disabled by Workflows".
- Trigger relacionado: **Contact DND**.
- https://help.gohighlevel.com/support/solutions/articles/48001214849-how-to-use-do-not-disturb-dnd- · https://help.gohighlevel.com/support/solutions/articles/155000003270-workflow-action-dnd-contact · https://help.gohighlevel.com/support/solutions/articles/155000002673-workflow-trigger-contact-dnd · https://help.gohighlevel.com/support/solutions/articles/155000008249-auto-enable-email-dnd-when-a-contact-s-email-bounces

### 8.5 Duplicados
- **Settings › Business Profile › Contact Deduplication Preferences**:
  - Toggle **Allow Duplicate Contacts**.
  - **Primary Field**: Email (por defecto) o Phone.
  - **Secondary Field**.
- Con el toggle desactivado, los envíos de formularios, Zapier y Messenger/IG **actualizan** el contacto existente que coincide en lugar de crear otro.
- Las **importaciones CSV** fusionan siempre por email o teléfono, sea cual sea el ajuste.
- **Acción Merge Contact:**
  - **Match By**: Email / Phone Number / Email and Phone Number.
  - El contacto **más nuevo se fusiona en el más antiguo**.
  - **Ojo:** tras la fusión pueden fallar Goals, Waits de respuesta o de email y trigger links (van ligados al ID antiguo). Si el contacto que sobrevive ya estaba en el mismo workflow, la ejecución fusionada termina.
- https://help.gohighlevel.com/support/solutions/articles/48001181714-allow-duplicate-contacts-contact-deduplication-preferences- · https://help.gohighlevel.com/support/solutions/articles/48001202210-how-to-manage-and-merge-duplicate-contacts · https://help.gohighlevel.com/support/solutions/articles/155000007464-workflow-action-merge-contact

### 8.6 Smart Lists
- Listas **dinámicas** de contactos. Se crean en Contacts › + Add smart list.
- Se actualizan en tiempo real según filtros de tags, campos, actividad o etapa de oportunidad.
- **Advanced Filters**: cada filtro es campo + operador + valor. "+ Add Filter" suma en **OR**; "+ Add Nested Filter" suma en **AND**.
- Sirven para lanzar acciones masivas (añadir a un workflow, en Drip Mode, etc.).
- También existen smart lists de Companies y de Custom Objects.
- https://help.gohighlevel.com/support/solutions/articles/48001062094-how-to-create-manage-smart-lists · https://help.gohighlevel.com/support/solutions/articles/155000007530-advanced-filters-in-smart-lists · https://help.gohighlevel.com/support/solutions/articles/155000003974-workflows-advanced-filters-smart-list · https://help.gohighlevel.com/support/solutions/articles/155000006504-contacts-revamped-list-view-smartlists

---

## Fuentes

**Listados y conceptos**
- https://help.gohighlevel.com/support/solutions/articles/155000002294-what-are-workflow-actions-complete-list-
- https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview

**Oportunidades**
- https://ideas.gohighlevel.com/changelog/opportunity-workflow-actions
- https://ideas.gohighlevel.com/opportunities/p/choose-an-opportunity-to-update
- https://help.gohighlevel.com/support/solutions/articles/155000004751-workflow-action-find-opportunity
- https://help.gohighlevel.com/support/solutions/articles/155000004752-workflow-action-create-opportunity
- https://help.gohighlevel.com/support/solutions/articles/155000004753-workflow-action-update-opportunity
- https://help.gohighlevel.com/support/solutions/articles/155000002476-workflow-action-create-update-opportunity
- https://help.gohighlevel.com/support/solutions/articles/155000003365-workflow-action-remove-opportunity
- https://help.gohighlevel.com/support/solutions/articles/155000004754-workflow-action-add-owner-to-opportunity
- https://help.gohighlevel.com/support/solutions/articles/155000004755-workflow-action-remove-owner-from-opportunity
- https://help.gohighlevel.com/support/solutions/articles/155000004756-workflow-action-add-follower-s-to-opportunity
- https://help.gohighlevel.com/support/solutions/articles/155000002048-automating-opportunities
- https://help.gohighlevel.com/support/solutions/articles/155000005062-getting-started-setup-pipelines-and-opportunities
- https://help.gohighlevel.com/support/solutions/articles/48000982199-opportunity-statuses-won-lost-and-abandoned
- https://help.gohighlevel.com/support/solutions/articles/155000002000-opportunities-faqs

**Citas y calendarios**
- https://help.gohighlevel.com/support/solutions/articles/155000003364-workflow-action-update-appointment-status
- https://help.gohighlevel.com/support/solutions/articles/155000003461-workflow-action-generate-one-time-booking-link
- https://help.gohighlevel.com/support/solutions/articles/155000001692-one-time-link
- https://help.gohighlevel.com/support/solutions/articles/155000004209-workflow-action-book-appointment
- https://help.gohighlevel.com/support/solutions/articles/155000004580-create-appointment-note-workflow-action
- https://help.gohighlevel.com/support/solutions/folders/155000000686
- https://help.gohighlevel.com/support/solutions/articles/155000001485-round-robin-calendars-the-setup-guide
- https://help.gohighlevel.com/support/solutions/articles/155000003557-creating-collective-booking-calendars
- https://help.gohighlevel.com/support/solutions/articles/48001236022-class-booking-calendar-overview

**Pagos y documentos**
- https://help.gohighlevel.com/support/solutions/articles/155000003494-workflow-action-send-invoice
- https://help.gohighlevel.com/support/solutions/articles/155000005627-workflow-action-send-recurring-invoice
- https://help.gohighlevel.com/support/solutions/articles/155000003705-workflow-action-send-estimate
- https://help.gohighlevel.com/support/solutions/articles/155000004887-workflow-action-send-documents-contracts
- https://help.gohighlevel.com/support/solutions/articles/155000007513-send-documents-and-contracts-via-sms-in-highlevel
- https://help.gohighlevel.com/support/solutions/articles/48001202784-workflow-action-stripe-one-time-charge
- https://help.gohighlevel.com/support/solutions/articles/48001202185-text-to-pay-links
- https://help.gohighlevel.com/support/solutions/articles/155000005641-workflow-trigger-coupon-code-applied
- https://help.gohighlevel.com/support/solutions/articles/155000005658-workflow-trigger-coupon-code-redeemed
- https://ideas.gohighlevel.com/invoice/p/generate-single-use-coupons
- https://help.gohighlevel.com/support/solutions/articles/155000007390-workflow-trigger-order-fulfilled-for-ecommerce-stores-

**Membresías, comunidades y certificados**
- https://help.gohighlevel.com/support/solutions/articles/155000003378-workflow-action-course-grant-offer
- https://help.gohighlevel.com/support/solutions/articles/155000003382-workflow-action-course-revoke-offer
- https://help.gohighlevel.com/support/solutions/articles/155000002845-how-to-grant-access-to-membership-courses-using-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000001239-workflow-triggers-for-communities-granting-and-revoking-group-access
- https://help.gohighlevel.com/support/solutions/articles/155000003681-workflow-trigger-action-grant-revoke-private-channel-access
- https://help.gohighlevel.com/support/solutions/articles/155000002376-issue-certificates-triggers-and-actions
- https://help.gohighlevel.com/support/solutions/articles/155000005110-how-to-send-a-certificate-after-passing-a-quiz-or-assignment
- https://ideas.gohighlevel.com/changelog/workflow-membership-updates
- https://ideas.gohighlevel.com/changelog/communities-smarter-join-requests-with-workflow-automation

**Afiliados**
- https://help.gohighlevel.com/support/solutions/articles/155000003227-workflow-action-add-to-affiliate-manager
- https://help.gohighlevel.com/support/solutions/articles/155000003228-workflow-action-add-to-affiliate-campaign
- https://help.gohighlevel.com/support/solutions/articles/155000003230-workflow-action-remove-from-affiliate-campaign
- https://help.gohighlevel.com/support/solutions/articles/155000003229-action-update-affiliate-workflow-action-update-affiliate
- https://help.gohighlevel.com/support/solutions/articles/155000002691-workflow-action-add-leads-under-an-affiliate
- https://ideas.gohighlevel.com/changelog/affiliate-manager-actions-are-now-in-workflows

**Marketing**
- https://help.gohighlevel.com/support/solutions/articles/48001185099-facebook-conversions-api-trigger-in-workflows
- https://help.gohighlevel.com/support/solutions/articles/155000003691-how-to-send-a-meta-conversion-api-action-for-ad-manager-
- https://help.gohighlevel.com/support/solutions/articles/155000006301-meta-custom-audiences-and-conversions-restrictions
- https://help.gohighlevel.com/support/solutions/articles/155000003368-workflow-action-add-to-google-ads
- https://help.gohighlevel.com/support/solutions/articles/155000003367-workflow-action-add-to-google-analytics
- https://help.gohighlevel.com/support/solutions/articles/155000003497-workflow-trigger-linkedin-lead-form-submitted

**IVR e IA**
- https://help.gohighlevel.com/support/solutions/articles/155000001200-interactive-voice-response-ivr-guide-triggers-actions
- https://help.gohighlevel.com/support/solutions/articles/155000003370-workflow-action-ivr-gather-input-on-call
- https://help.gohighlevel.com/support/solutions/articles/155000003369-workflow-action-ivr-say-play
- https://help.gohighlevel.com/support/solutions/articles/155000003372-workflow-action-ivr-end-call
- https://help.gohighlevel.com/support/solutions/articles/155000003373-workflow-action-record-voicemail
- https://help.gohighlevel.com/support/solutions/articles/155000003467-appointment-booking-conversation-ai-workflow-action
- https://help.gohighlevel.com/support/solutions/articles/48001236572-eliza-agent-platform-introduction-and-faqs

**Contactos**
- https://help.gohighlevel.com/support/solutions/articles/48001161579-how-to-use-custom-fields
- https://help.gohighlevel.com/support/solutions/articles/48001161575-how-to-use-custom-values
- https://help.gohighlevel.com/support/solutions/articles/155000004390-overview-of-merge-fields-custom-variables
- https://help.gohighlevel.com/support/solutions/articles/48001214849-how-to-use-do-not-disturb-dnd-
- https://help.gohighlevel.com/support/solutions/articles/155000003270-workflow-action-dnd-contact
- https://help.gohighlevel.com/support/solutions/articles/48001181714-allow-duplicate-contacts-contact-deduplication-preferences-
- https://help.gohighlevel.com/support/solutions/articles/155000007464-workflow-action-merge-contact
- https://help.gohighlevel.com/support/solutions/articles/48001062094-how-to-create-manage-smart-lists
- https://help.gohighlevel.com/support/solutions/articles/155000007530-advanced-filters-in-smart-lists
