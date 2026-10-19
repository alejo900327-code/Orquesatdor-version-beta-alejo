---
name: ghl-workflow-construir
description: Usar cuando hay una especificación de workflow GHL aprobada (salidas/ghl-workflows/*.md o ghl-workflows/*.md) y hay que montarla dentro de GoHighLevel / HighLevel con el navegador (Claude in Chrome o computer use) — "construye el workflow", "móntalo en GHL", "pásalo al constructor de automatizaciones". También para verificar un workflow ya montado contra su especificación.
user-invocable: true
---

# ghl-workflow-construir

## Qué hace

Monta en GHL, **en borrador**, un workflow que ya tiene especificación aprobada. Lo verifica paso a paso contra la especificación y entrega un informe. **Nunca publica.**

**Principio:** la especificación manda y la captura del lienzo es la verdad. Ni la IA de GHL ni tu memoria sustituyen a la verificación visual.

## Antes de empezar (bloqueantes)

- [ ] Existe la especificación y tiene `aprobada_por` relleno. Si no → usa `ghl-workflow-planificar`. No construyas "a partir de la conversación".
- [ ] El navegador tiene la **sesión de GHL ya iniciada**. Claude **nunca** escribe contraseñas ni códigos 2FA: si pide login, para y pide al usuario que inicie sesión.
- [ ] Estás en la **subcuenta correcta**: el ID de la URL (`/v2/location/<ID>/…`) coincide con el de `subcuenta` en la spec. Comprueba también el nombre arriba a la izquierda. La subcuenta de trabajo del equipo es Emprendimiento Consciente (`xZeB78e6zr1peyHwvhRg`). Si el ID no coincide, para: nunca construyas en otra subcuenta "porque es la que estaba abierta".
- [ ] Has leído `interfaz-constructor.md` (esta carpeta): cómo se maneja el lienzo y sus trampas.
- [ ] La persona ha puesto **la pestaña de Claude al frente** y la ventana de Chrome maximizada (ver "Antes de lanzar" en `interfaz-constructor.md`). Pídeselo siempre; es el fallo más frecuente.
- [ ] Has pasado el **chequeo previo go / no-go** de `interfaz-constructor.md`: pestaña `visible` y clic de prueba dentro del iframe. El clic es el criterio que decide. Si da no-go → para y pide al usuario que lo arregle. No intentes construir a ciegas.

**REQUIRED:** para cada paso, consulta su ficha en la skill `ghl-workflows-referencia` (nombres exactos, campos, opciones). Si un campo de la spec no aparece en la interfaz, **para y pregunta**. No improvises.

## Proceso híbrido

```
0. Preparar → 1. Requisitos previos → 2. Esqueleto (IA de GHL) → 3. Verificar y completar a mano → 4. Ajustes → 5. Guardar en borrador → 6. Informe
```

**0. Preparar.** Lee la spec entera. Anota el número de pasos y ramas: es tu lista de verificación. Avisa al usuario del tiempo estimado (ver tiempos en `interfaz-constructor.md`).

**1. Requisitos previos** (pantallas de ajustes, donde se puede manejar por `find`/`ref`):
- Comprueba que existe cada elemento de la tabla de la spec. **Coincidencia exacta:** el buscador de estas pantallas no siempre filtra, así que confirma que el nombre exacto aparece en la lista (con `get_page_text`). No basta con que la búsqueda "encoja" la lista.
- Solo crea lo que la spec marca con "crear (aprobado: sí)". Si falta algo no aprobado → **para y pregunta**.
- Nunca crees nada desde un desplegable del constructor (`Add New tag…`).

**2. Esqueleto con la IA de GHL — solo si la spec es sencilla.** Decide así:

| La spec tiene… | Qué hacer |
|---|---|
| ≤ 5 pasos, lineal o con un If/Else sencillo, sin oportunidades, pagos ni webhooks | Usa la IA para el esqueleto (Prueba 1: bien, ~5 min en total) |
| Más de 5 pasos, ramas con varios pasos, oportunidades u objetos de negocio | **Construye todo a mano** en el paso 3 (Prueba 2: la IA duplicó el flujo entero, usó una acción obsoleta y limpiarlo costó más que hacerlo a mano) |

Si usas la IA:
- `+ Create workflow` → `Start from Scratch` → renombra a `workflow` de la spec → en "What do you want to automate?" pega el prompt de abajo, **una sola vez**.
- Si la IA no aparece o falla → construye todo a mano en el paso 3.

```
Trigger: <T1 nombre exacto> (<filtros>).
Steps, in this exact order:
1) <P1 acción exacta>: <config>.
2) <P2 …>
3) If/Else "<nombre>": branch "<rama a>" if <condición exacta>; None branch otherwise.
   In branch "<rama a>": <P3.a1 …>. In None branch: <P3.b1 …>.
Do not add any other steps. Do not duplicate steps.
```

**3. Verificar y completar** (el paso crítico):
1. `Fit to screen` → captura del lienzo completo.
2. Recorre la spec **ID por ID** y clasifica cada nodo: ✅ correcto · ✏️ existe pero mal configurado · ➕ falta · 🗑️ sobra (lo inventó la IA).
3. Abre cada nodo ✅ para comprobar su configuración (el nombre del nodo no basta).
4. Corrige a mano: borra lo 🗑️, arregla lo ✏️ y añade lo ➕ (recetas en `interfaz-constructor.md`). **No le pidas correcciones a la IA de GHL**: se comprobó que rompe otros pasos y miente en su resumen.
5. Campos opcionales que la spec no menciona pero la IA rellenó (p. ej. el título de una nota) cuentan como ✏️: **vacíalos**.
6. Si borras un nodo intermedio, **reconecta** la cadena (receta en `interfaz-constructor.md`). Para borrar muchos nodos, empieza **por el final de la cadena** y ve hacia atrás: no hay que reconectar nada. Borrar un If/Else **no borra sus ramas**: sus nodos quedan sueltos y hay que borrarlos uno a uno.
   - Cuidado con las acciones **obsoletas** que mete la IA (icono $, "Action deprecation notice", p. ej. Create/Update Opportunity): cuentan como 🗑️ y se sustituyen por la acción nueva.
7. Repite la captura completa hasta que todo esté en ✅.

**4. Ajustes.** Pestaña `Settings`: aplica la sección "Ajustes del workflow" de la spec. **Fija de forma explícita cada ajuste que nombre la spec**, sobre todo `Allow re-entry` y `Allow multiple opportunities`: en workflows nuevos se han visto **activados**. No asumas el valor por defecto: la IA puede haberlo cambiado.

**5. Nombre y guardado.** Comprueba que el nombre sigue siendo el `[Claude] …` de la spec: **la IA de GHL lo cambia**, así que renómbralo si hace falta. `Save` → el botón queda gris con "Saved". Vuelve a `Builder` y comprueba que el interruptor sigue en **Draft**.

**6. Informe** (en el chat, y añadido al final del archivo de la spec, sección "Construcción"):
- URL del workflow y fecha.
- Tabla ID → estado final (✅ / ⚠️ con motivo).
- Lo que creaste en la subcuenta (requisitos previos).
- Diferencias entre la interfaz y `interfaz-constructor.md`, para actualizar la guía.
- Siguiente paso para la persona: revisar, ejecutar los "Casos de prueba" de la spec con `Test workflow` o un contacto de prueba, y publicar.

## Líneas rojas

| Nunca | Por qué |
|---|---|
| Tocar el interruptor `Draft/Publish` | Publicar lo decide y lo hace una persona |
| Pulsar botones de prueba dentro de un panel (`Send test mail`, `Send test SMS`, probar webhook o código…) | Envían o ejecutan de verdad |
| Pulsar `Test workflow` | Ejecuta **todas las acciones de verdad** (envía emails/SMS, cobra premium, no se salta los Wait). Lo lanza una persona con un contacto de prueba |
| Editar o guardar workflows que no sean el de la spec | Abrir un workflow publicado puede tocar su "Last updated"; ábrelos solo si la spec lo exige |
| Borrar workflows, tags, campos o contactos | Irreversible; pídeselo a la persona |
| Crear requisitos no aprobados (incluido `Add New tag` en desplegables) | Ensucia la subcuenta de producción |
| Escribir contraseñas, tokens o datos de pago | Prohibido; la sesión ya debe estar iniciada |
| Usar la API interna de GHL o inyectar JavaScript para crear el workflow | Fuera del alcance acordado: no es oficial y opera con la sesión del usuario |
| Dar por bueno el resumen de la IA de GHL | Se comprobó que afirma pasos que no existen |

## Errores comunes

| Síntoma | Solución |
|---|---|
| `find`/`read_page` no encuentran nada en la lista de workflows o el lienzo | Es un iframe de otro dominio: usa capturas y coordenadas |
| Los clics dentro del iframe no hacen nada (el hover sí resalta) | Pestaña en segundo plano o zoom ≠ 100 %: repite el chequeo go / no-go |
| La página ocupa parte de la captura o cambia de tamaño entre capturas | Mismo origen: zoom o pestaña no dibujada. No calcules coordenadas así |
| La opción de un desplegable no queda elegida | Prueba el otro método (clic ↔ escribir + `Enter`) y verifica con captura |
| "Leave site?" bloquea la navegación | Guarda o descarta en la interfaz, o trabaja en otra pestaña |
| Captura se queda colgada (timeout) | Espera 3–5 s y reintenta; si se repite, `tabs_context` y pestaña nueva |
| La IA de GHL deja ramas vacías o pasos duplicados | Normal: es el paso 3 el que lo arregla |
| Un campo de la spec no aparece en el formulario | Construye el resto, deja ese paso en ⚠️ y pregunta al final (no inventes la alternativa si la spec no la aprueba). Anota el campo real en el informe para corregir la referencia |
| La lista de workflows carga desplazada y no se ve `Create workflow` | Haz scroll hacia arriba dentro del iframe |
