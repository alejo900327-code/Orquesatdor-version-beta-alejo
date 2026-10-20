# 04 · Copy de la landing de ¿Cuánto Cobro? (v2, persuasiva)

> Fecha: 20-oct-2026. Reemplaza el copy de `public/index.html`. **No toca HTML**: está escrito por secciones y en el orden en que se maquetaría.
> Las notas en cursiva entre `> **Por qué:**` explican cada sección y **no se publican**.
> Las marcas `[CONFIRMAR]` y `[NECESITA RESPALDO]` hay que resolverlas antes de publicar.

---

## Bloque meta

| Campo | Valor |
|---|---|
| **Ángulo** | "El costo oculto": vendes y te pagan, pero tu precio deja fuera tu tiempo, el gas, el empaque y la merma. La diferencia la pones tú. |
| **Palanca principal** | Toma de conciencia con números (la mueve el ejemplo de $74 y la calculadora gratis) → permiso para cobrar ("no es tu culpa") → respaldo en el momento de mandar el precio. |
| **Palancas secundarias** | Pertenencia ("no eres la única"), enemigo común (copiar precios, ×2/×3, el precio de otra época), orgullo (la que no regala su trabajo). |
| **Avatar objetivo** | ICP primario de `01-avatar-icp.md` §7.2: repostera que vende pasteles o tortas por encargo desde casa, ya tiene clientas que no son familia y siente miedo al mandar el precio. Nivel de conciencia 1 → 2 (Schwartz). |
| **Promesa** | Claridad y respaldo para cobrar: saber tu mínimo y tu precio sugerido antes de cotizar. **No** promete ingresos, ventas ni clientas. |
| **Voz** | Cálida, de tú, sin culpa, frases cortas, como una colega que ya pasó por eso. Español latino neutro. |

### Claims usados y su respaldo

| Claim | Respaldo |
|---|---|
| "Suma ingredientes, merma, empaque, gas/luz/agua y tu tiempo" | `app.js` → `calcular()`: merma 5 % por defecto, empaque, gas, horas × tarifa |
| "Precio mínimo (debajo pierdes) y precio sugerido (con ganancia)" | `app.js` → resultado "Precio MÍNIMO / SUGERIDO"; margen 30 % por defecto |
| "Precio por porción" | `app.js` → "por porción" en receta y cotización |
| "Gas y luz por minutos de horno, con valores aproximados de tu país; afinable con tu recibo" | `app/index.html` hoja `hoja-servicios`; Ajustes → "Calcúlalo con tu recibo" |
| "Cambias el precio de un ingrediente y se recalculan todas tus recetas, y ves cuánto subió cada una" | `app.js` → `informarRecalculo()` (antes → después) y franja "Subieron los precios de N recetas" |
| "Te avisa si vas a cotizar por debajo de tu mínimo" | `app.js` → `abrirCotizar()`: "Ese precio está por debajo de tu mínimo: pierdes dinero" |
| "Te avisa si olvidaste sumar tu tiempo" | `app.js` → "Ojo: no sumaste tu tiempo…" |
| "Cotización lista para WhatsApp con el nombre de tu negocio" | `app.js` → `textoCotizacion()` + Ajustes "Nombre de tu negocio" |
| "Duplicar una receta para ofrecer otro tamaño" | `app.js` → botón "Duplicar receta" |
| "16 ingredientes comunes precargados con precio de referencia de tu país" | `app.js` → `COMUNES` (16) y `comunesDe()` |
| "5 mensajes para cuando te dicen 'está caro'" + guía "Las 4 cosas que olvidas" | `app.js` → `MENSAJES` (5) y `renderMensajes()` |
| "Tus datos se quedan en tu teléfono; sin cuenta ni contraseña; copia de seguridad" | `app.js` → localStorage, Bienvenida, Ajustes → "Descargar copia" |
| MX/CO/PE/CL/AR/EE. UU. con su moneda | `app.js` → `PAISES` |
| USD 12 pago único, luego USD 17, garantía 7 días, acceso inmediato por email | Hechos del producto dados por Alejo |
| Ejemplo $380 vs. mínimo $454 (–$74) | Mockup actual de la landing, "datos de ejemplo" |
| Verbatims de reposteras | `02-voc.md` (sin nombres; **abrir cada URL y confirmar el texto antes de publicar**, como pide el propio VoC) |
| "Acceso de por vida y actualizaciones" | Está en la landing actual. `[CONFIRMAR]` que Alejo lo sostiene; si no, usar "Pago único: es tuya, sin mensualidad". |
| Métodos de pago locales (OXXO, PSE, Nequi, Yape…) | `[CONFIRMAR]` que estén activados en el producto de Hotmart. Si no, dejar solo "Pagas en tu moneda local". |

**Lo que este copy NO dice (a propósito):** que vas a ganar más, que no vas a perder clientas, "subió la mantequilla" como verdad universal (en 2026 no lo es; ver avatar §1.4), "dejar tu empleo", "la primera app en español" (no se sostiene; VoC hallazgo 1), ni testimonios.

---

## 0 · Barra superior

**Marca:** ¿Cuánto Cobro?
**Botón:** Calcula tu pastel gratis

> **Por qué:** el botón chico de la barra es para la que todavía duda; el clic gratis es el primer sí.

---

## 1 · Hero

**Llamado (etiqueta):**
Para reposteras que ya venden pasteles y tortas por encargo

**Titular (H1):**
Vendes bien, pero al final del mes no ves el dinero.

**Subtítulo:**
No es que vendas poco. Es que en tu precio no entran tus horas, el gas del horno, la caja ni lo que se pierde en la receta. ¿Cuánto Cobro? lo suma desde tu celular y te dice dos números antes de mandar el precio por WhatsApp: **el mínimo, debajo del cual pierdes**, y **el que deja ganancia para tu negocio**.

**Botón principal:** Ver si estoy cobrando de menos (gratis)
**Botón secundario:** Quiero cobrar lo justo · USD 12

**Línea de confianza (debajo de los botones):**
Acceso inmediato a tu email · Pago único, sin mensualidad · Garantía de 7 días

**Mockup del teléfono (se conserva, con un ajuste):**
> Torta de chocolate · 12 porciones · *datos de ejemplo (MXN)*
> Ingredientes $159 · Empaque + gas $55 · Tu trabajo (3 h) $240
> **Precio mínimo $454** · **Precio sugerido $648**
> 🔴 La vendías a $380: estás $74 por debajo de tu mínimo.

**Pie del mockup (texto nuevo, pequeño):**
En este ejemplo, cada pastel vendido a $380 son $74 que salen de tu bolsillo. Si fueran 10 pedidos al mes, serían $740.

> **Por qué:** se sube el mejor titular de dolor que estaba enterrado (diagnóstico #5) y se hace llamado explícito al ICP ("ya venden… por encargo") para filtrar hobby y consumidoras. El subtítulo nombra el costo oculto en cosas que ella toca (horno, caja) y presenta el mecanismo en una línea: dos números. El mockup es la prueba numérica: se conserva y se le agrega el costo acumulado, que es aritmética sobre el ejemplo, no una promesa. Etiquetar la moneda (MXN) evita que en CO o AR se lea como un precio absurdo; en las variantes por país se cambia el ejemplo (ver tabla final).
> CTA principal = la calculadora gratis, porque el tráfico frío de nivel 1 necesita verse a sí misma en rojo antes de pagar.

---

## 2 · "Hazle la prueba a tu pastel" (prueba numérica, sección corta)

**Etiqueta:** Haz la cuenta

**H2:** Ese pastel que vendes a $380 te cuesta $454 hacerlo bien.

**Texto:**
Mira el ejemplo de arriba. La repostera no cobraba mal "porque sí". Cobraba lo que le parecía razonable, lo que cobraban otras y lo que la clienta no le iba a discutir.

Pero cuando se suma todo, la cuenta queda así:

| Lo que pone en el pastel | Cuánto |
|---|---|
| Ingredientes (con un 5 % de merma) | $159 |
| Caja, base, gas del horno, luz, agua | $55 |
| Sus 3 horas de trabajo, a $80 la hora | $240 |
| **Lo mínimo para no perder** | **$454** |
| Lo que cobraba | $380 |
| **Lo que ponía ella, en cada pedido** | **$74** |

No es una tragedia en un pastel. Es una fuga en todos.

**Botón:** Hacer la cuenta con mi receta (gratis)
**Nota:** Sin registro. Tarda unos minutos. Tus datos se quedan en tu teléfono.

> **Por qué:** el diagnóstico dice que el ejemplo numérico es "el mejor momento de la página". Aquí se desarma en tabla para que se lea sin el teléfono y para que la lectora haga la comparación con lo suyo. "Una fuga en todos" es la metáfora del costo acumulado sin dramatizar. "A $80 la hora" es la tarifa por defecto de MX en la app; deja ver que el tiempo es un número, no un sentimiento.

---

## 3 · El dolor, en escenas

**Etiqueta:** ¿Te ha pasado?

**H2:** Lo que nadie ve de tu negocio de pasteles.

**Escena 1. El precio que da miedo mandar**
Ya tienes la foto de referencia, el sabor y la fecha. La clienta espera. Escribes el precio. Lo borras. Le bajas un poco "para que no se asuste". Lo mandas y dejas el teléfono boca abajo, esperando el visto.
Una repostera lo escribió así en un blog: *"Cada vez que doy un presupuesto es mucha la ansiedad o nervios por la respuesta."* Otra le contestó: *"Pensé que era la única."*
No eres la única.

**Escena 2. "¿En cuánto me lo dejas?"**
Te comparan con el pastel del supermercado. Te piden "uno parecido, pero más sencillo" por la mitad. Y tú, sin un número que te respalde, terminas bajando. No porque quieras: porque no tienes con qué decir que no.
Como lo dijo una repostera: *"las personas pretenden comparar el precio de una torta personalizada con una torta de pastelería."*

**Escena 3. El mes que no paraste… y no te alcanzó**
Diciembre, Día de las Madres, la temporada de fiestas. Horneaste todos los fines de semana, entregaste todo a tiempo, las fotos quedaron preciosas. Y cuando fuiste a comprar los insumos del siguiente pedido, el dinero no alcanzaba.
¿Cómo se puede vender tanto y que no quede nada? Pasa cuando cada pedido sale un poco por debajo de lo que cuesta: entre más vendes, más pones tú.

**Escena 4. Las 8 horas que cobraste como 3**
Calculaste una tarde. Fue el día entero: comprar, hornear, esperar que enfríe, rellenar, decorar, lavar todo, entregar. Una repostera lo contó perfecto: *"crees que vas a tardar como 3 o 4 horas en un pastel, pero pasas como 8 horas y el pastel te sale más caro de lo que pediste por el pastel."*
Esas horas también son trabajo. Si no están en el precio, las regalaste.

**Cierre de la sección:**
Lo peor no es el cansancio. Es la duda que se queda después de entregar: *¿estuvo caro o barato?* Y nadie te la responde.

> **Por qué:** el diagnóstico #2 pide escenas, no viñetas. Las cuatro escenas siguen el orden emocional del avatar (§8.1 y §2.2): primero el miedo al mandar el precio (el dolor que más vende), luego el regateo, luego la consecuencia de dinero, luego el tiempo invisible (el mecanismo del producto). Los verbatims van sin nombre y presentados como frases de reposteras en blogs, nunca como clientas de la app. La escena 3 no tiene cita textual en el VoC (avatar §2.4 punto 8: "usar como pregunta, no como testimonio"), por eso se escribe en segunda persona y con pregunta. "¿Estuvo caro o barato?" es verbatim (VoC 1.8) y es el puente a la solución.
> **[CONFIRMAR]** ortografía normalizada en los verbatims (VoC 3.2, 3.3, 2.2, 5.2, 1.8): abrir las URL antes de publicar.

---

## 4 · No es tu culpa (y el enemigo)

**Etiqueta:** No es tu culpa

**H2:** Nadie te enseñó a ponerle precio a tu trabajo.

**Texto:**
Aprendiste a hornear con tu mamá, con tu abuela, con YouTube o con cursos que te costaron. En ninguno te enseñaron a costear. Y cuando preguntaste, te dieron una de estas tres respuestas:

**1. "Copia lo que cobra la de al lado."**
Pero ella no compra donde tú compras, no usa tus ingredientes, no tarda lo que tú tardas y no paga tu gas. Si cobra mucho menos con la misma calidad, lo más probable es que alguien esté perdiendo… y puede ser ella.

**2. "Suma los ingredientes y multiplica por 2 (o por 3)."**
Suena a mucho, pero ese número no sabe cuántas horas te tomó la decoración ni cuánto costó la caja. Una repostera lo descubrió así: *"Yo solo cobraba los costos directos por 3, he estado regalando una parte de mi trabajo."*

**3. "Ponle un precio y ya."**
Y lo pusiste hace un año. Desde entonces cambió el precio de la harina, del huevo, del chocolate o de la caja, y tu precio sigue igual. No hiciste nada mal: tu precio es de otra época.

**Remate:**
El problema no eres tú. Es que estabas cobrando a ojo, con reglas que no salen de *tu* receta. Lo que te falta no es valor para cobrar. Es un número que te respalde.

> **Por qué:** diagnóstico #4. Sin absolución, la lectora se defiende ("yo sí sé cobrar"). La herencia familiar (avatar §1.1) explica la culpa de cobrar sin convertirla en culpa familiar. Los tres enemigos son los que ya probó (VoC §7: copiar listas, ×2/×3, cursos que no enseñan a cobrar). El tercero usa "tu precio es de otra época" en lugar de "subió la mantequilla" (avatar §1.4 y conclusión 4) y nombra insumos de forma genérica para que sea verdad en cualquier país. "Un número que te respalde" convierte el miedo en una carencia que el producto sí resuelve.

---

## 5 · El mecanismo: tu piso y tu precio

**Etiqueta:** Cómo funciona

**H2:** Dos números que te dan seguridad antes de mandar cualquier precio.

**Intro:**
¿Cuánto Cobro? hace con *tus* ingredientes, *tus* horas y *tu* gas la cuenta que nadie te enseñó. Al final te da dos números:

- **Tu piso:** el precio mínimo. Debajo de este número, pierdes dinero en ese pedido.
- **Tu precio:** el sugerido, que además de pagarte tu trabajo deja ganancia para tu negocio (para la próxima batidora, para los insumos del mes que viene, para crecer).

Tu sueldo y la ganancia del negocio son cosas distintas. La app las separa para que dejes de confundirlas.

**Paso 1 · Pon lo que compras, una sola vez.**
"1 kg de harina a $28." Ya vienen 16 ingredientes comunes de tu país con un precio de referencia; solo corriges lo que tú pagas. La app calcula cuánto te cuesta cada gramo.

**Paso 2 · Arma tu receta con lo que casi todas olvidan.**
Eliges ingredientes y cantidades, y sumas la caja, la base, tus horas y la merma. ¿El gas y la luz? Nadie sabe cuánto gas gastó en un pastel, pero sí cuánto rato prendió el horno: pones los minutos de horno, estufa y batidora y la app los convierte en dinero con un valor aproximado de tu país. Si quieres afinarlo, lo calculas una vez con tu recibo.

**Paso 3 · Cotiza tranquila.**
Ves tu piso y tu precio, también por porción. Mandas la cotización lista por WhatsApp, con el nombre de tu negocio. Y si por nervios escribes un precio por debajo de tu mínimo, la app te avisa antes de enviarlo.

**Bloque "Y cuando cambia un precio…"**
Cambias el precio de la mantequilla, del huevo o de la caja, y **todas las recetas que la usan se recalculan solas**. La app te muestra cuánto subió cada una: "Pastel de chocolate: $612 → $648". Así tu precio nunca vuelve a quedarse en otra época.

**Tabla de gas, luz y agua (se conserva tal cual de la landing actual):**
| Pastel de chocolate (ejemplo) | Cuesta |
|---|---|
| Horno a gas, 60 min (con precalentado) | $5.50 |
| Estufa, 20 min (ganache) | $0.83 |
| Batidora, 15 min | $0.20 |
| Agua y jabón del lavado | $3.00 |
| **Gas, luz y agua de este pastel** | **$9.53** |

Nota: ¿Lo quieres exacto? Recibo de gas del mes ÷ horas de horno del mes = lo que te cuesta 1 hora de horno. Ej.: $330 ÷ 60 horas = $5.50 por hora. Lo pones una vez y todas tus recetas se recalculan.

**Botón:** Probarlo gratis con 1 receta

> **Por qué:** el mecanismo se nombra ("tu piso y tu precio") para que sea memorable y para que se pueda repetir en anuncios. "Piso" reencuadra la objeción "si subo me dejan de comprar": el mínimo no es ambición, es el número debajo del cual pierde (avatar §3.1). La separación sueldo/ganancia responde a la confusión que casi nadie nombra (avatar §2.1 y conclusión 6). Cada función mencionada existe en `app.js`; el ejemplo "$612 → $648" es ilustrativo del formato real del aviso de recálculo (se puede cambiar por cualquier par de números). El bloque de gas por minutos respeta lo que la otra sesión acaba de implementar, sin prometer exactitud ("valor aproximado").

---

## 6 · Tope de montaña: cómo se ve tu negocio con números claros

**Etiqueta:** Imagina

**H2:** Mandar tu precio sin que te tiemblen las manos.

**Texto de entrada:**
Imagina el próximo pedido. Te escriben, abres la app, ves tu piso y tu precio, y respondes en dos minutos. Sin borrar el número tres veces. Sin dejar el teléfono boca abajo.

**Antes / Después**

| Antes | Después |
|---|---|
| "¿Estuvo caro o barato?" | Sabes cuánto te deja cada pedido, antes de aceptarlo. |
| Le bajas al precio para que no se asuste. | Mandas tu precio con un número que lo respalda. |
| Cobras 3 horas por un pastel de 8. | Tu tiempo está en el precio, siempre. |
| Te dicen "está caro" y te quedas sin palabras. | Tienes 5 respuestas amables listas para copiar y pegar. |
| Copias la lista de precios de otra. | Tus precios salen de tu receta, tu horno y tus horas. |
| Tu precio es de hace un año. | Cambias un ingrediente y todo se recalcula. |
| La clienta quiere pagar menos y tú regalas el trabajo. | Le ofreces una versión más pequeña o más sencilla que sí te deja algo. |
| Tu repostería se siente como un hobby caro. | Tu repostería se siente como un negocio. |

**Cierre:**
No te prometemos que todas las clientas digan que sí. Eso no lo promete nadie honesto. Lo que sí cambia es que, a partir de ahora, cuando digas un precio vas a saber por qué es ese y no otro. Y las clientas que se quedan son las que te buscan por tu trabajo, no por barata.

> **Por qué:** diagnóstico #3: no había tope de montaña. Se escribe con el estado soñado de `01-avatar-icp.md` §4 ("mando mi precio tranquila… la gente me busca por mi trabajo, no por barata") y el verbatim invertido de la ansiedad. La fila de "versión más pequeña" se apoya en la función "Duplicar receta" y en el mensaje "Ofrecer otra opción sin bajar tu precio", y responde al dolor de crisis (AR: "ajustar el producto, no regalar el trabajo", avatar §3.1). El cierre dice explícitamente lo que no se promete: desarma la sospecha de vendehúmo (playbook hispano §4) y cumple el guardarraíl de no prometer ventas. "Hobby caro" viene del lenguaje del mercado (avatar §2.3).
> Se evitó a propósito "local propio", "dejar tu trabajo" o "aportar más en casa" como promesa: son sueños reales del avatar, pero ponerlos aquí rozaría el claim de ingresos.

---

## 7 · Comparación: por qué no otra plantilla

**Etiqueta:** Por qué una app y no otra plantilla

**H2:** La cuenta que vive en tu celular, no en un cuaderno ni en la computadora.

| | Cuaderno o "×3" | Plantilla de Excel | ¿Cuánto Cobro? |
|---|---|---|---|
| Cuenta tus horas | Casi nunca | Si te acuerdas | Siempre (y te avisa si las olvidas) |
| Gas, luz y empaque | A ojo | Tienes que saber cuánto gastaste | Por minutos de horno, con valor de tu país |
| Desde el celular | Sí, pero sin cuentas | Difícil | Hecha para el celular |
| Cuando sube un ingrediente | Rehacer todo | Buscar y corregir a mano | Cambias un precio y se recalculan todas tus recetas |
| Precio por porción | Calculadora aparte | Si la plantilla lo trae | Automático |
| Cotizar un pedido | Escribir el mensaje | Copiar números al chat | Mensaje listo para WhatsApp |
| Si cotizas por debajo de tu mínimo | No te enteras | No te enteras | Te avisa antes de enviar |
| Necesitas | Papel y paciencia | Excel o computador | Solo el navegador de tu teléfono |

**Línea bajo la tabla:**
¿No estás segura? No nos creas: haz la cuenta de tu pastel en la calculadora gratis y compárala con lo que cobras hoy.

**Botón:** Comparar con mi pastel (gratis)

> **Por qué:** se conserva la comparación (diagnóstico la marca como algo que funciona) y se amplía a la objeción #1 del avatar (§5: "eso lo hago con mi cuaderno / multiplicando por 2-3"). Las filas nuevas (aviso por debajo del mínimo, aviso de horas olvidadas, porción, gas por minutos) son funciones reales y son la diferencia defendible frente a la planilla casi idéntica que existe en Hotmart (avatar §5 #2: la diferencia es la experiencia móvil, no la lista de funciones). "No nos creas" invita a la prueba propia en vez de pedir fe: es la prueba honesta disponible sin testimonios.

---

## 8 · Oferta y stack

**Etiqueta:** Lo que recibes hoy

**H2:** Todo lo que necesitas para cobrar con números, en tu celular.

**Stack:**
- **La app ¿Cuánto Cobro?** Tus ingredientes, tus recetas, tu piso y tu precio, también por porción. Funciona en el navegador de tu celular y la puedes dejar como ícono en tu pantalla de inicio. Acceso de por vida y actualizaciones incluidas. `[CONFIRMAR]`
- **16 ingredientes comunes de tu país ya cargados**, con precio de referencia, para empezar en minutos.
- **Gas, luz y agua por minutos de horno**, con valores aproximados de tu país que puedes afinar con tu recibo.
- **Recálculo automático:** cambias un precio y ves cuánto subió cada receta.
- **Cotización lista para WhatsApp**, con el nombre de tu negocio y aviso si vas por debajo de tu mínimo.
- **Guía "Las 4 cosas que olvidas al poner precio"** (se lee en 10 minutos).
- **5 mensajes para cuando te dicen "está caro"**: explicar el valor, ofrecer otra opción sin bajar tu precio, responder cuando te comparan, avisar que subes precios y cerrar con amabilidad.
- **Garantía de 7 días.**

**Caja de precio:**
- Etiqueta: Precio de lanzamiento
- **USD 12** · pago único
- Después: ~~USD 17~~
- Pagas en tu moneda local. Sin mensualidad. `[CONFIRMAR métodos: OXXO, SPEI, PSE, Nequi, Efecty, Yape, PagoEfectivo]`
- **Botón:** Quiero cobrar lo justo · USD 12
- **Debajo del botón:** Acceso inmediato: apenas pagas, te llega a tu email el enlace a la app y la guía de inicio.

**Ancla (texto junto a la caja de precio):**
USD 12 es menos de lo que cuestan los ingredientes de un pastel.
Y piensa en el ejemplo de arriba: si en tus pedidos se te escapan $74 como a esa repostera, la app se recupera en tus próximos pedidos bien cobrados. ¿Cuántos serían en tu caso? Haz la cuenta gratis con tu receta antes de decidir.
`[NECESITA RESPALDO: con el ejemplo en MXN, USD 12 ≈ MXN 216 al tipo 18 de la app, o sea unos 3 pedidos con $74 de diferencia. Validar el tipo de cambio del día y ajustar la cifra en cada variante de país.]`

**Por qué este precio (justificación honesta del precio bajo):**
Estamos lanzando. Preferimos que las primeras reposteras la usen, nos digan qué le falta y la mejoremos juntas. Cuando la app tenga opiniones reales de quienes la usan, el precio pasa a USD 17. `[CONFIRMAR con Alejo que esta es la razón real y si hay fecha del cambio]`

> **Por qué:** diagnóstico #6: USD 12 se sentía como gasto. Se ancla en dos cosas reales: un costo cotidiano del avatar (los ingredientes de un pastel, playbook hispano §2) y su propia fuga de dinero, pero **sin prometerle que recupera**: la invita a hacer la cuenta con su receta (avatar §5 #8: "solo si se muestra con su propio número"). Se elimina "Preventa / 30 de noviembre" (diagnóstico #1) y se cambia a "precio de lanzamiento" porque "preventa" con entrega inmediata confunde. Un precio bajo genera sospecha si no se justifica (playbook persuasión §3.8): se explica el porqué. Cada ítem del stack existe en la app.

---

## 9 · Garantía

**Etiqueta:** Sin riesgo

**H2:** Si no logras costear tu primera receta, te devolvemos tu dinero.

**Texto:**
Tienes 7 días para probarla con tu receta de verdad. Si en ese tiempo no logras sacar el costo de tu primer pastel, escribe respondiendo al email de tu compra y te devolvemos el 100 %. Sin preguntas incómodas.
Y si quieres estar segura antes de pagar, la calculadora gratis hace la cuenta de un pastel completo, con la misma fórmula que la app.

**Botón:** Quiero cobrar lo justo · USD 12

> **Por qué:** la garantía es real y su condición es concreta y fácil de cumplir. Va como sección propia, cerca del precio, porque el miedo a estafa es alto en este mercado (playbook hispano §4) y la transparencia es la mejor respuesta. Se recuerda que la calculadora gratis usa la misma fórmula (lo dice `app.js`: "misma fórmula que la calculadora gratis"), que es la prueba más fuerte que tenemos hoy.
> `[CONFIRMAR]` que el reembolso se gestiona por Hotmart y que "respondiendo al email de tu compra" es el canal correcto (así lo dice la app en Ajustes).

---

## 10 · Preguntas frecuentes

**Etiqueta:** Preguntas frecuentes
**H2:** Lo que te preguntas antes de cobrar distinto

### Las de verdad (emocionales)

**¿Y si subo mi precio y me dejan de comprar?**
Es el miedo más común, y es válido. Por eso la app no te da un solo número: te da tu piso y tu precio. El piso es el mínimo para no perder; entre el piso y el sugerido tienes margen para decidir según tu clienta y tu zona. Y si alguien solo te compra por debajo de tu piso, ese pedido te cuesta dinero cada vez que lo haces. Cuando la clienta quiere pagar menos, puedes ofrecerle un tamaño más pequeño o una decoración más sencilla (duplicas la receta, cambias lo que necesites y ves su precio). No regalas tu trabajo: ajustas el pedido.

**Soy nueva, ¿puedo cobrar como si tuviera experiencia?**
Lo que cuesta tu pastel no depende de tu experiencia: la harina, la caja y el gas cuestan lo mismo si llevas un mes o diez años. Eso sí o sí tiene que estar en tu precio. Lo que sí puedes ajustar es cuánto cobras por hora; puedes empezar con una tarifa más baja y subirla cuando ganes rapidez y seguridad. Lo que no conviene es empezar perdiendo.

**La competencia cobra mucho menos que yo. ¿No me conviene igualarla?**
Ella no compra donde tú compras, no usa tus ingredientes ni tarda lo que tú tardas. Si cobra mucho menos con la misma calidad, o tiene costos muy distintos o está perdiendo dinero sin darse cuenta. Copiar su precio es copiar su cuenta, y tú no sabes cuál es. Con la app sabes la tuya.

**No soy buena con los números.**
No necesitas serlo. Pones lo que compras, cuánto pagaste y cuánto usas, como lo dirías en voz alta: "1 kg de harina a $28, uso 300 gramos". La app hace todas las cuentas y te muestra el resultado en grande.

**Mis clientas no pagarían lo que dice la app.**
Puede pasar, sobre todo cuando la economía está difícil. La app no te obliga a cobrar el sugerido: te muestra dónde está tu piso para que decidas sabiendo. Con eso puedes elegir qué versión del pedido sí te deja algo, y tienes mensajes amables para explicar tu precio sin pelear. Lo que no cambia es esto: un pedido que te hace perder no te ayuda a ti ni a tu negocio.

**¿Y con amigas y familia, qué hago?**
Tú decides si les haces un precio especial. La diferencia es que ahora vas a saber exactamente cuánto les estás regalando, y podrás decidirlo con cariño, no por compromiso.

### Las técnicas

**¿Cuándo la recibo?**
Al instante. Apenas pagas, te llega a tu email el enlace a la app y la guía de inicio.

**¿Necesito saber Excel o contabilidad?**
No. Pones lo que compras, lo que pagas y lo que usas. La app hace las cuentas.

**¿Hay que descargar algo de la tienda de apps?**
No. Se abre desde el navegador de tu celular y la puedes dejar como ícono en tu pantalla de inicio. No necesitas cuenta ni contraseña.

**¿Funciona en mi país?**
Sí: México, Colombia, Perú, Chile, Argentina y EE. UU., cada uno con su moneda y con ingredientes y valores de gas y luz de referencia de tu país.

**¿Cómo pago si no tengo tarjeta?**
Pagas por Hotmart en tu moneda local, con los medios de pago disponibles en tu país. `[CONFIRMAR y listar los métodos activos]`

**¿Es una suscripción?**
No. Pagas una vez y es tuya. Sin mensualidad.

**¿Dónde quedan mis recetas?**
En tu teléfono; no las enviamos a ningún servidor. Si cambias de celular, descargas una copia de seguridad desde Ajustes y la restauras en el nuevo.

**¿Sirve solo para repostería?**
Está pensada para repostería, pero funciona igual para cualquier producto con receta: comida casera, velas, jabones.

**¿Y si no me sirve?**
Tienes 7 días de garantía. Si no logras costear tu primera receta, te devolvemos tu dinero.

> **Por qué:** diagnóstico #9: las FAQ eran solo técnicas. Las emocionales van primero y en el orden de frecuencia del avatar (§3.1 y §5: miedo a perder clientas, "soy nueva", competencia, números, "aquí no pagan eso", amigas y familia). Cada respuesta valida primero y luego reencuadra, sin prometer que no perderá clientas (avatar §3.1: "no prometer que no pierde clientas"). La respuesta de "soy nueva" separa costo (fijo) de tarifa (variable), que es el desarme honesto del avatar. La de la competencia usa la frase que ya funcionaba en la landing. La de "dónde quedan mis recetas" ahora dice la verdad completa: si cambias de celular, necesitas la copia (Ajustes de la app lo advierte).

---

## 11 · Cierre

**H2:** Tu trabajo vale. Ahora vas a saber cuánto.

**Texto:**
Llevas meses (o años) horneando bien, entregando a tiempo y cobrando a ojo. No te falta talento ni ganas. Te faltaba la cuenta.

Hoy puedes empezar de dos maneras:
1. **Haz la cuenta gratis** de un pastel y mira si estás por encima o por debajo de tu mínimo.
2. **Lleva todas tus recetas a la app** por USD 12, una sola vez, con 7 días de garantía.

La próxima vez que te pregunten "¿cuánto cuesta?", que tu respuesta salga de tus números, no de tus nervios.

**Botón principal:** Empezar a cobrar con números · USD 12
**Botón secundario:** Primero quiero hacer la cuenta gratis
**Línea de confianza:** Acceso inmediato a tu email · Pago único · Garantía de 7 días

> **Por qué:** recapitula promesa (claridad, no dinero) + reversión de riesgo, y da las dos salidas honestas: la gratis para la que necesita verse, la de pago para la que ya se vio. "Tus números, no tus nervios" cierra el arco que abrió la escena 1 (el miedo al mandar el precio). No hay urgencia de reloj: la única razón real para actuar hoy es el precio de lanzamiento (sección 8) y el costo de seguir cotizando a ojo.

---

## 12 · Pie de página (descargo, se conserva)

¿Cuánto Cobro? es una herramienta de cálculo: los resultados dependen de los datos que ingresas y no garantizan ventas ni ingresos.

---

## Variantes de vocabulario por país

La versión principal usa "pastel" en el cuerpo, "pasteles y tortas" en el llamado y "dinero". Para cada variante, aplicar estos cambios:

| Dónde | Principal (neutra) | Variante MX | Variante CO / AR |
|---|---|---|---|
| Llamado del hero | pasteles y tortas por encargo | pasteles por encargo | tortas por encargo |
| H1 | no ves el dinero | no ves el dinero | no ves la plata |
| Sustantivo en todo el cuerpo | pastel | pastel | torta |
| Botón de barra / CTA calculadora | Calcula tu pastel gratis | igual | Calcula tu torta gratis |
| Sección 2, H2 | Ese pastel que vendes a $380 te cuesta $454 | igual (MXN) | Cambiar el ejemplo a moneda local con la calculadora: CO en COP, AR en ARS `[NECESITA RESPALDO: generar los números del ejemplo con la app, no inventarlos]` |
| "salen de tu bolsillo" / "dinero" | dinero | dinero | plata |
| Escena 2, comparación | el pastel del supermercado | el pastel del súper | la torta del supermercado (AR: "la torta que hace la tía", VoC 2.9) |
| Escena 3, temporadas | Diciembre, Día de las Madres, la temporada de fiestas | Día de las Madres, Navidad, XV años | CO: Amor y Amistad, Día de la Madre, diciembre. AR: Día de la Madre, fiestas de fin de año |
| Escena 4, verbatim | "…en un pastel… más caro de lo que pediste por el pastel" | igual | se deja el verbatim tal cual (es cita) |
| Tratamiento | tú | tú | CO: tú. AR: **vos** (cobrás, mandás, tenés, querés, sabés) |
| Ingrediente de ejemplo | mantequilla | mantequilla | CO: mantequilla. AR: manteca |
| Dulce de leche (si aparece) | dulce de leche | cajeta | CO: arequipe. AR: dulce de leche |
| Ancla de precio | menos que los ingredientes de un pastel | igual | menos que los ingredientes de una torta |
| Métodos de pago (FAQ) | en tu moneda local | OXXO, SPEI, tarjeta `[CONFIRMAR]` | CO: PSE, Nequi, Efecty, Bancolombia `[CONFIRMAR]`. AR: `[CONFIRMAR métodos AR en Hotmart]` |
| Cierre | "¿cuánto cuesta?" | igual | AR: "¿cuánto sale?" |

**Nota de localización AR:** además de "vos", la escena 3 conviene reescribirla con el dolor de inflación real de AR ("el precio que pusiste hace dos meses ya no cubre lo que pagás hoy"), porque allí sí es verdad que casi todo sube (avatar §1.4).

---

## Resumen de pendientes antes de maquetar
1. `[CONFIRMAR]` "Acceso de por vida y actualizaciones incluidas".
2. `[CONFIRMAR]` métodos de pago activos por país en Hotmart.
3. `[CONFIRMAR]` razón y fecha del paso a USD 17 (si no hay fecha, no poner fecha).
4. `[CONFIRMAR]` canal de reembolso (email de Hotmart).
5. `[NECESITA RESPALDO]` cifra del ancla (cuántos pedidos recuperan USD 12) con el tipo de cambio del día, por país.
6. `[NECESITA RESPALDO]` números del ejemplo en COP y ARS para las variantes, generados con la app.
7. Abrir las URL de los 6 verbatims usados y confirmar el texto (VoC 3.2, 3.3, 2.2, 1.3, 5.2, 1.8).
8. Pasar por `editor-voz-marca` y `guardian-etico` antes de tocar el HTML (como pide el diagnóstico).

---

## Dictamen guardian-etico

**Fecha:** 20-oct-2026 · **Revisó:** guardian-etico · **Insumos:** este archivo, `02-voc.md`, `public/app/app.js`, `public/servicios.js`, `public/calculadora/calculadora.js`.

### VEREDICTO: BLOQUEADA (8 bloqueos). Pasa a APROBADA en cuanto se apliquen los 8 cambios obligatorios de abajo; no hace falta otra revisión completa, solo comprobar que el texto final es el corregido.

La base es buena: no hay testimonios inventados, no se prometen ingresos de forma explícita, el descargo del pie se mantiene, el cierre dice qué NO se promete y casi todas las funciones existen en la app. Lo verifiqué así:
- **Números del ejemplo:** cuadran con `calculadora.js` (EJEMPLO). Ingredientes 151,27 × 1,05 = 158,83 → $159; empaque 45 + gas 10 = $55; 3 h × $80 = $240; mínimo 453,83 → $454; sugerido 453,83 / 0,7 = 648,33 → $648; diferencia con $380 = $74.
- **Tabla de gas:** cuadra con `servicios.js` (MX: 5,50 + 0,83 + 0,20 + 3,00 = $9,53).
- **Funciones citadas:** existen todas: recálculo con antes→después, aviso por debajo del mínimo, aviso de tiempo olvidado, porción, duplicar, 16 ingredientes, 5 mensajes, guía de 4 puntos, copia de seguridad, 6 países.

Los bloqueos son de urgencia, letra chica, claim no confirmado y una cita armada.

### Cambios obligatorios (bloqueos)

**B1. Precio tachado irreal (urgencia/escasez falsa).** Sección 8, caja de precio.
- Original: `Después: ~~USD 17~~`
- Problema: tachar un precio que nunca se cobró y que no tiene fecha es un ancla falsa. Es el patrón "precio tachado irreal" del playbook de adquisición §5.
- Corregido: quitar el tachado y poner una línea en texto normal: `Precio de lanzamiento. Más adelante pasará a USD 17; si compras ahora, no pagas la diferencia nunca.`
- Esta frase solo se publica si Alejo confirma que de verdad piensa subir el precio. Si no lo confirma, se quita cualquier mención a USD 17, también la de "Por qué este precio". Nunca se le pone fecha ni cuenta regresiva mientras la fecha no exista.

**B2. Insinuación de retorno o ingresos.** Sección 8, ancla.
- Original: `Y piensa en el ejemplo de arriba: si en tus pedidos se te escapan $74 como a esa repostera, la app se recupera en tus próximos pedidos bien cobrados.`
- Problema: "la app se recupera en tus próximos pedidos" es una proyección de retorno sobre el dinero de la lectora. La nota `[NECESITA RESPALDO]` ("unos 3 pedidos") la convertiría en cifra. Es un claim de ingresos implícito (FTC/Meta) y además depende de que ella suba su precio y no pierda clientas.
- Corregido: `USD 12 es menos de lo que cuestan los ingredientes de un pastel. ¿Te conviene? No lo decidas por nosotros: haz primero la cuenta gratis con tu receta y mira tu propio número.`
- Se elimina la nota `[NECESITA RESPALDO]` del ancla y el pendiente n.º 5. Ya no hace falta calcular "cuántos pedidos recuperan USD 12".

**B3. Garantía con condición que no coincide con Hotmart (letra chica).** Sección 9 (H2 y texto) y FAQ "¿Y si no me sirve?".
- Original H2: `Si no logras costear tu primera receta, te devolvemos tu dinero.`
- Original texto: `Si en ese tiempo no logras sacar el costo de tu primer pastel, escribe respondiendo al email de tu compra y te devolvemos el 100 %.`
- Problema: la garantía de 7 días de Hotmart es incondicional. Ponerle una condición ("si no logras costear…") crea una letra chica que no existe y que algunas leerían como "me la pueden negar". Además, el canal real del reembolso es Hotmart.
- Corregido H2: `7 días para probarla. Si no te sirve, te devolvemos tu dinero.`
- Corregido texto: `Tienes 7 días para probarla con tu receta de verdad. Si no te convence, por la razón que sea, pides el reembolso del 100 % desde Hotmart (o respondes al email de tu compra y te ayudamos a hacerlo). Sin preguntas incómodas.`
- Corregido FAQ: `Tienes 7 días de garantía. Si no te sirve, pides el reembolso del 100 % y listo.`
- `[CONFIRMAR]` que el producto en Hotmart está configurado con 7 días.

**B4. Cita armada (prueba social fabricada).** Escena 1.
- Original: `Otra le contestó: *"Pensé que era la única."*`
- Problema: el VoC (3.2 Francis y 3.3 Grace) no muestra que Grace le respondiera a Francis. "Le contestó" inventa una conversación, y el recorte cambia la frase original: "Pensé que era la unica con temor a dar costos…".
- Corregido: `En el mismo blog, otra escribió: *"Pensé que era la única con temor a dar costos."*`
- Abrir la URL y confirmar el texto, como ya marca el pendiente 7.

**B5. "Acceso de por vida y actualizaciones" sin confirmar.** Sección 8, stack.
- Original: `Acceso de por vida y actualizaciones incluidas. [CONFIRMAR]`
- Problema: es un compromiso permanente de hosting y mantenimiento que nadie confirmó. Si el dominio o el Worker se caen, el claim queda falso.
- Corregido, por defecto: `Pago único: es tuya, sin mensualidad.`
- Solo se vuelve a la versión original si Alejo confirma explícitamente las dos cosas.

**B6. Afirmación sobre la situación financiera de la lectora (Meta).** H1 y pie del mockup.
- Original H1: `Vendes bien, pero al final del mes no ves el dinero.`
- Original pie: `…cada pastel vendido a $380 son $74 que salen de tu bolsillo.`
- Problema: le afirma a la lectora su situación económica en segunda persona. Meta revisa la página de destino de los anuncios, y si el H1 se reutiliza como texto de anuncio la regla de atributos personales se viola directamente. Además, el H1 no es verdad para toda la audiencia.
- Corregido H1: `Muchas reposteras venden bien y al final del mes no ven el dinero. Casi siempre es por lo que el precio deja fuera.`
- Alternativa en pregunta abierta y no acusatoria: `¿Por qué se puede vender bien y que al final del mes no quede dinero?`
- Corregido pie: `En este ejemplo, cada pastel vendido a $380 son $74 que pone la repostera. Con 10 pedidos así al mes, serían $740.`
- Regla para Ads: ningún anuncio usa "no ves el dinero", "estás perdiendo" ni "cobras de menos" dirigido a "tú".

**B7. Stack inflado: la "guía".** Sección 8.
- Original: `Guía "Las 4 cosas que olvidas al poner precio" (se lee en 10 minutos).`
- Problema: en la app son 4 viñetas dentro de la pestaña Mensajes (`renderMensajes()`). "10 minutos" infla un entregable que se lee en uno o dos.
- Corregido: `Guía rápida "Las 4 cosas que olvidas al poner precio", dentro de la app.`

**B8. "Precio de referencia de tu país" para los ingredientes (claim exagerado).** Paso 1, stack y FAQ "¿Funciona en mi país?".
- Problema: `COMUNES` es un único precio en USD multiplicado por un tipo de cambio fijo (`tasa`). No es un precio relevado en cada país. Los valores de gas y luz sí son tarifas por país (`servicios.js`).
- Corregido Paso 1: `Ya vienen 16 ingredientes comunes con un precio de referencia aproximado en tu moneda; solo corriges lo que tú pagas.`
- Corregido stack: `16 ingredientes comunes ya cargados, con un precio de referencia aproximado en tu moneda, para empezar en minutos.`
- Corregido FAQ: `…cada uno con su moneda, ingredientes comunes con precio aproximado y valores de gas y luz de referencia del país.`

### Cambios recomendados (no bloquean, pero los aconsejo)

- **R1. Métodos de pago.** Si no hay confirmación de Hotmart, no se lista ninguno (ni OXXO, ni PSE, ni Yape, etc.). Queda solo `Pagas por Hotmart con los medios disponibles en tu país.` Listar un método inactivo sería un claim falso, así que antes de publicar esto se vuelve obligatorio.
- **R2. "Tus datos se quedan en tu teléfono"** (sección 2, calculadora). Si la landing o la calculadora cargan el píxel de Meta o GTM para la pauta, cambiar a `Tus recetas y precios se quedan en tu teléfono.` Así la frase no choca con la política de privacidad ni con el aviso de cookies.
- **R3. Tabla "Antes / Después"** (sección 6). Cambiar los encabezados a `Cobrando a ojo` / `Con tus números`. El contenido no es financiero, pero el formato "antes/después" atrae revisión en Meta y así se evita.
- **R4. Cierre de la sección 6.** `Y las clientas que se quedan son las que te buscan por tu trabajo, no por barata.` → `Y puedes explicar tu precio sin pedir disculpas.` La versión original insinúa un resultado sobre las clientas.
- **R5. Comparación, fila "Si cotizas por debajo de tu mínimo".** En la columna Excel, `No te enteras` → `Solo si la plantilla lo trae`. Hay plantillas que sí lo tienen, y así no se exagera al competidor.
- **R6. H2 de la sección 2.** `Ese pastel que vendes a $380…` → `Un pastel que se vende a $380 puede costar $454 hacerlo bien.` La versión original le afirma a la lectora su precio; la corrección va en la misma línea que B6.
- **R7. Ejemplo de recálculo `$612 → $648`.** Marcarlo como `(ejemplo)` en la página.

### Lo que se protege (no diluir en la edición)
La calculadora gratis como primer CTA, el descargo del pie, el "No te prometemos que todas las clientas digan que sí", la absolución sin culpa familiar, los verbatims sin nombre y presentados como frases de blogs (no como clientas de la app), y la ausencia de relojes, cupos y contadores.

### Riesgos a vigilar después de publicar
- Si el precio sube a USD 17, avisar con fecha real y no volver a "lanzamiento" después.
- Ningún anuncio de Meta reutiliza el H1 original ni frases en segunda persona sobre pérdidas.
- Cuando aparezcan reseñas reales, solo se usan con permiso y sin editar el resultado.
