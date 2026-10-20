# 05 · Anuncios Meta: campaña de prueba 1 ("cc-prueba1")

> Fecha: 20-oct-2026. Proyecto PERSONAL de Alejo (Alejo Cloud). Cuenta: Business Manager y cuenta publicitaria **personales**.
> Insumos: `03-angulos.md` (TOP 5 + suplentes #22 y #5), `01-avatar-icp.md`, `02-voc.md`, `conocimiento/_COMPARTIDO/investigaciones/2026-10-micro-apps-latam/03-instagram-meta-ads.md`, `playbook-mercado-hispano.md`, y el código real de `public/calculadora/`, `public/app/` y `public/index.html` (para no prometer nada que el producto no haga).
> País de arranque: **Colombia** (vocabulario principal: torta, plata, pedido por encargo). Cada ángulo trae una línea con los cambios para México.

---

## 0. Antes de lanzar: 6 bloqueos que encontré en el código (resolver o ajustar el copy)

| # | Qué encontré | Por qué importa | Qué hacer |
|---|---|---|---|
| B1 | **No hay píxel de Meta** en la landing, en la calculadora ni en la app. Solo hay `dataLayer.push(...)`, y sin GTM ni `fbq` nadie lee esos eventos. | Sin píxel no se puede optimizar por "calculadora completada" ni medir compras. | Instalar el píxel con el puente de la §8.2 y publicar por el carril `bash scripts/deploy.sh cuanto-cobro`. |
| B2 | La landing todavía dice **"Preventa… recibes el acceso a más tardar el 30 de noviembre de 2026"**. El brief de esta campaña dice **"acceso inmediato"**. | Si el anuncio dice "acceso inmediato" y la landing dice "preventa", el anuncio es engañoso (y Meta revisa la landing). | `[PENDIENTE: confirmar cuál es la verdad hoy]`. Los anuncios de abajo dicen "acceso inmediato" **solo** en el ángulo #9 y van marcados; si sigue siendo preventa, cambiar esa línea por "preventa: acceso a más tardar el 30-nov-2026 o te devolvemos el 100 %". |
| B3 | "Precio al lanzar: ~~USD 17~~" **no tiene fecha**. | Urgencia sin fecha real no es urgencia real. | Ningún anuncio frío usa la subida a USD 17. Se activa en retargeting cuando haya `[PENDIENTE: fecha exacta en que sube a USD 17]`. |
| B4 | El ejemplo del hero de la landing está en **números de México** ($380, $454) sin moneda, y el `<select>` de país de la calculadora arranca en **México (MXN)**. | Con tráfico de Colombia, una torta de "$454" se lee rara, y la usuaria tiene que acordarse de cambiar a COP. | `[PENDIENTE]`: poner "MXN" o un ejemplo en COP en el hero; aceptar `?pais=CO` en la calculadora (no existe hoy). Mientras tanto, el video muestra cómo elegir "Colombia (COP)". |
| B5 | La landing tiene dos frases con riesgo de política o de veracidad: **"Vendes bien, pero al final del mes no ves la plata"** (afirma la situación económica de quien lee) y **"Subió la mantequilla… y tú no subiste"** (en 2026 la mantequilla bajó a nivel global; `01-avatar` §1.4). | Meta revisa también el destino. | Cambiar a "¿Cuánto te deja de verdad cada pedido?" y "Tu precio es de otra época". |
| B6 | `calc_primer_resultado` se dispara en cuanto **un** ingrediente tiene cantidad, precio y uso. No exige horas ni precio actual. | Es una señal real pero temprana: "vio un resultado", no "vio su semáforo". | Para esta prueba sirve (ver §8.1). Mejora recomendada para la ronda 2: evento `calc_semaforo` cuando hay horas y precio actual. |

**Cifras de ejemplo usadas en todos los anuncios.** Son precios **de ejemplo, no de referencia de mercado**. Las calculé con la fórmula de `calculadora.js` y deben verse **idénticas** en la pantalla al grabar (cargarlas a mano con país = Colombia):

| Campo (Colombia, COP) | Valor de ejemplo |
|---|---|
| Receta | Torta de chocolate (ejemplo), 12 porciones |
| Harina 1 kg a 4.000 → usa 300 g | 1.200 |
| Azúcar 1 kg a 4.500 → usa 250 g | 1.125 |
| Mantequilla 1 kg a 36.000 → usa 200 g | 7.200 |
| Huevos 30 u a 18.000 → usa 4 u | 2.400 |
| Cacao en polvo 500 g a 20.000 → usa 80 g | 3.200 |
| Leche 1 l a 4.400 → usa 250 ml | 1.100 |
| Chocolate 1 kg a 44.000 → usa 200 g | 8.800 |
| Ingredientes con merma 5 % | **$ 26.276** |
| Empaque 8.000 + gas/luz 2.000 | **$ 10.000** |
| Tarifa por hora | 15.000 (el valor por defecto de la app para CO) |

| Escenario | Horas | Precio actual | Mínimo | Sugerido | Semáforo y texto que muestra la calculadora |
|---|---|---|---|---|---|
| E1 (ángulos rojo, visto) | 3 | 70.000 | $ 81.276 | $ 116.109 | **Rojo**: "Estás cobrando $ 11.276 menos de tu precio mínimo. Hoy te quedan $ 11.241 por cada hora de trabajo." |
| E2 (horas, 4 h) | 4 | 100.000 | $ 96.276 | $ 137.538 | **Amarillo**: "…te faltan $ 37.538 para el precio sugerido. Hoy te quedan $ 15.931 por cada hora de trabajo." |
| E3 (horas, 8 h) | 8 | 100.000 | $ 156.276 | $ 223.252 | **Rojo**: "Estás cobrando $ 56.276 menos de tu precio mínimo. Hoy te quedan $ 7.965 por cada hora de trabajo." |
| E4 (× 3, 3 h) | 3 | 75.075 (= ingredientes 25.025 × 3) | $ 81.276 | $ 116.109 | **Rojo**: "…$ 6.201 menos de tu precio mínimo. Hoy te quedan $ 12.933 por cada hora…" |
| E5 (× 3, temática 6 h) | 6 | 75.075 | $ 126.276 | $ 180.395 | **Rojo**: "…$ 51.201 menos de tu precio mínimo. Hoy te quedan $ 6.466 por cada hora…" |

**Ejemplo México** (sirve tal cual el botón "Ver un ejemplo lleno" de la calculadora): mínimo $453.83, sugerido $648.33, vendida a $380 → "Estás cobrando $73.83 menos de tu precio mínimo. Hoy te quedan $55.39 por cada hora". La landing lo redondea a $454 y $74.

---

## 1. Reglas que cumplen los 10 anuncios

- **El anuncio vende el clic, no la app.** Cuatro ángulos van a la calculadora gratis (tráfico frío N1-N3 → herramienta gratis = destino corto que entrega el "ajá" sola). Solo el ángulo #9 muestra la app paga y por eso va a la landing (consciente del producto).
- **Variable de prueba dentro de cada conjunto = el hook** (primeros 3 s del video + primera línea del texto). Titular, descripción, CTA y cuerpo del video son iguales en A y B del mismo ángulo.
- **Mecanismo en todos:** la cuenta suma 4 cosas (ingredientes con 5 % de merma, empaque, gas/luz por minutos de horno y **tus horas**) y devuelve precio mínimo + sugerido + semáforo verde/amarillo/rojo.
- **Prueba real disponible (y la única que se usa):** (1) demostración en pantalla con cifras de ejemplo verificables, (2) lenguaje real del mercado de `02-voc.md`, citado como "lo escribió una repostera en un blog", nunca como reseña, (3) reversión de riesgo: calculadora gratis, sin registro, datos que se quedan en el teléfono (dice el pie de la calculadora) y, en la app, garantía de 7 días de Hotmart. **Cero testimonios de clientas: todavía no existen.**
- **Cifras rotuladas "Ejemplo"** en el mismo fotograma en que aparecen. Chats y escenas actuadas, rotulados **"Recreación"**.
- **Sin voz de "clienta" fabricada:** nadie dice "yo usé la app". La voz en off es la de la marca (Alejo o voz IA neutra) explicando una cuenta.
- **Desactivar las "mejoras de Advantage+ creativo"** (texto generado, música, superposiciones, variaciones con IA): pueden quitar los rótulos "Ejemplo"/"Recreación" o agregar claims.
- **Formato de video:** 9:16 para Reels/Stories, con el texto dentro de la zona segura (sin texto en el 14 % superior ni en el 35 % inferior). Recorte 4:5 para el feed. Subtítulos siempre quemados: la mayoría lo ve sin sonido.
- **Marca `||`** = fin de lo visible antes del "Ver más" (≤125 caracteres). El texto corto es exactamente lo que queda antes de `||`.

---

## 2. Ángulo #4: El número en rojo (`rojo`) · N1 · destino CALC

**Por qué abre así (tabla de conciencia):** inconsciente → curiosidad y revelación; ella misma descubre el número. Destino corto y gratis → el anuncio solo tiene que despertar la duda "¿y la mía de qué color sale?".

**Comunes a A y B**
- Titular: **¿Tu torta sale en verde o en rojo?** (34)
- Descripción: **Gratis · sin registro** (21)
- Botón CTA: **Más información**. Justificación: tráfico frío N1; la acción es gratis y sin registro, así que "Registrarte" mentiría y "Comprar" asusta. La razón concreta para hacer clic va en el texto ("gratis, 1 receta, sin registro").
- México: torta → **pastel**; plata → **dinero**; "por encargo" → **"sobre pedido"**; usar el ejemplo MX (vendido a $380 → **$73.83** debajo del mínimo de $453.83; "te quedan $55.39 por hora"). Titular MX: "¿Tu pastel sale en verde o en rojo?" (35).

### rojo-a · hook tipo DATO (ejemplo con número)
- **URL:** `https://cuantocobro.vendedecasa.com/calculadora/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=rojo-a`
- **Texto corto (117):**
  Ejemplo: una torta vendida a $70.000 quedó $11.276 por debajo de su precio mínimo. Haz la cuenta con la tuya, gratis.
- **Texto largo:**
  Ejemplo: una torta vendida a $70.000 quedó $11.276 por debajo de su precio mínimo. Haz la cuenta con la tuya, gratis. ||

  Ese número no sale del "× 3" ni del precio de otra repostera. Sale de sumar lo que casi todas olvidan:
  · ingredientes, con un 5 % de lo que se pierde
  · empaque: caja, base, cinta, etiqueta
  · gas y luz (pones los minutos de horno y la calculadora los convierte en pesos)
  · y tus horas: comprar, hornear, decorar, entregar

  Al final ves tu precio mínimo (debajo de ese, pierdes), tu precio sugerido y de qué color sale el precio que cobras hoy: verde, amarillo o rojo.

  Es 1 receta, gratis y sin registro. Tus datos se quedan en tu celular.
  Pon la torta que más vendes ↓

  (Cifras de ejemplo en pesos colombianos. Tu resultado depende de los datos que pongas.)

**Guion de video (22-25 s, grabación de pantalla del celular + voz en off):**

| Tiempo | Toma (visual) | Texto en pantalla | Voz en off / subtítulo |
|---|---|---|---|
| 0-3 s | **Hook visual:** primer plano del resultado de la calculadora con la pastilla **roja** llenando el centro de la pantalla; zoom rápido hacia la cifra. | "Esta torta salió en ROJO" + etiqueta fija "EJEMPLO" arriba a la derecha | "Esta torta se vendía a setenta mil pesos. Mira lo que dice la calculadora." |
| 3-9 s | Scroll rápido hacia arriba por el formulario: los 7 ingredientes, empaque 8.000, gas 2.000, horas 3. | "Ingredientes + empaque + gas + 3 horas" | "Ingredientes, empaque, el gas del horno y tres horas de trabajo." |
| 9-16 s | Vuelve al resultado. Resaltar "Precio MÍNIMO $ 81.276" y la pastilla roja. | "Mínimo: $81.276 · La vendía a: $70.000" | "Su precio mínimo es ochenta y un mil. A setenta mil, cada torta queda once mil por debajo." |
| 16-22 s | Pantalla limpia de la calculadora; un dedo elige "Colombia (COP)" y toca "+ Agregar ingrediente". | "¿Y la tuya? Gratis · 1 receta · sin registro" | "Pon la tuya. Es gratis, sin registro, y tus datos se quedan en tu celular." |
| 22-25 s | **Tarjeta final** (fondo crema, logo "¿Cuánto Cobro?"). | "Calcula 1 receta gratis" · pie: "Cifras de ejemplo" | (silencio o música suave) |

- **Hooks alternativos:**
  1. *Contraintuitivo:* "Una torta puede venderse rápido y aun así quedar debajo de su mínimo." (sobre la torta, no sobre quien mira)
  2. *Curiosidad:* "Mira de qué color sale una torta de $70.000 cuando sumas tus horas."
- **Estático alternativo (1080×1350):** captura real de la calculadora (resultado E1) dentro de un celular sostenido por una mano con harina. Texto en la imagen, arriba: **"EJEMPLO · Torta de chocolate · 12 porciones"**. Centro, grande: **"Esta torta: $11.276 por debajo de su mínimo"**. Abajo: **"¿Y la tuya? Calculadora gratis, sin registro"**.

### rojo-b · hook tipo CURIOSIDAD (pregunta)
- **URL:** `…/calculadora/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=rojo-b`
- **Texto corto (122):**
  ¿A cuánto vendes tu torta de chocolate? Ponla en esta calculadora gratis y mira de qué color sale: verde, amarillo o rojo.
- **Texto largo:** el texto corto + `||` + el mismo cuerpo de rojo-a desde "Ese número no sale del '× 3'…" hasta el pie.
- **Guion:** cambia solo de 0 a 3 s; de 3 s en adelante es idéntico a rojo-a.

| Tiempo | Toma | Texto en pantalla | Voz en off |
|---|---|---|---|
| 0-3 s | **Hook visual:** manos cerrando una caja de torta sobre una mesa de cocina; corte seco a la calculadora vacía. | "¿A cuánto vendes tu torta?" | "Si vendes tortas por encargo, haz esta prueba." |
| 3-25 s | = rojo-a (tomas 2 a 5) | | |

- **Hooks alternativos:**
  1. *Miedo a la pérdida (honesto):* "Si sale en rojo, esa torta la estás pagando tú. Pon la tuya." (condicional, sobre la torta)
  2. *Prueba de mercado:* "'¿Estuvo caro o barato?' Así lo preguntó una repostera después de entregar. La respuesta, en 1 receta." (VoC 1.8)
- **Carrusel alternativo (4 tarjetas, una historia):**

| Tarjeta | Imagen | Titular (≤40) | Descripción (≤30) |
|---|---|---|---|
| 1 | Torta en caja, mano con celular | ¿A cuánto vendes tu torta? (26) | Haz la prueba (13) |
| 2 | Lista: ingredientes, empaque, gas, horas | Súmale empaque, gas y tus horas (31) | Lo que casi todas olvidan (25) |
| 3 | Captura con pastilla roja + sello "EJEMPLO" | Ejemplo: $11.276 bajo el mínimo (31) | Torta vendida a $70.000 (23) |
| 4 | Tres círculos verde / amarillo / rojo | ¿Verde, amarillo o rojo? (24) | Calcula 1 receta gratis (23) |

---

## 3. Ángulo #1: El precio en visto (`visto`) · N2 · destino CALC

**Por qué abre así:** consciente del problema → abre con el dolor (el momento de mandar el presupuesto), el mecanismo como solución (un número con de dónde salir) y la demostración antes del CTA.

**Comunes a A y B**
- Titular: **Cotiza con tu número en la mano** (31)
- Descripción: **Gratis · 1 receta** (17)
- Botón CTA: **Más información** (N2 frío; la razón para actuar es "antes del próximo presupuesto", que va en el texto).
- México: "presupuesto" → **"cotización"**; torta → **pastel**; plata → **dinero**; cifras del ejemplo MX. Titular MX igual.

### visto-a · hook tipo EMOCIÓN (escena)
- **URL:** `…/calculadora/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=visto-a`
- **Texto corto (115):**
  Ese minuto entre mandar el precio por WhatsApp y que te contesten. Antes del próximo, saca tu precio mínimo gratis.
- **Texto largo:**
  Ese minuto entre mandar el precio por WhatsApp y que te contesten. Antes del próximo, saca tu precio mínimo gratis. ||

  Casi siempre la duda no es si el precio es caro. Es no saber de dónde salió.

  Esta calculadora lo arma contigo en 4 partes: ingredientes (con 5 % de merma), empaque, gas y luz por minutos de horno, y tus horas. Te devuelve dos números:
  · precio mínimo: debajo de este, pierdes
  · precio sugerido: con ganancia para tu negocio

  Ejemplo: una torta de chocolate para 12 da un mínimo de $81.276 y un sugerido de $116.109.

  Si ya probaste el "× 3" o copiar el precio de otra, aquí ves la cuenta con TUS ingredientes y TUS horas.
  Gratis, 1 receta, sin registro ↓

  (Cifras de ejemplo. El resultado depende de tus datos.)

**Guion de video (25-28 s, chat recreado + grabación de pantalla):**

| Tiempo | Toma | Texto en pantalla | Voz en off / subtítulo |
|---|---|---|---|
| 0-3 s | **Hook visual:** POV, celular en mano, chat de WhatsApp **recreado** (nombre genérico "Clienta", sin foto). Burbuja enviada: "La torta de 2 pisos te queda en $150.000". Arriba parpadea "escribiendo…". | "Mandaste el precio. Ahora: 'escribiendo…'" + rótulo fijo "Recreación" | "Ese minuto entre mandar el precio y que te contesten." |
| 3-8 s | El "escribiendo…" desaparece y vuelve. Corte a negro con texto. | "¿De dónde salió ese número?" | "La duda casi nunca es si es caro. Es no saber de dónde salió." |
| 8-18 s | Grabación de pantalla: calculadora con el ejemplo E1; scroll por ingredientes, empaque, gas y horas; cae en el resultado. | "Mínimo $81.276 · Sugerido $116.109" + "EJEMPLO" | "Esta calculadora suma ingredientes, empaque, gas y tus horas. En este ejemplo: mínimo ochenta y un mil, sugerido ciento dieciséis mil." |
| 18-24 s | Vuelta al chat recreado: la mano escribe un precio nuevo con calma y lo envía. | "Mandas el precio sabiendo de dónde sale" | "Así mandas el precio sabiendo de dónde sale." |
| 24-28 s | **Tarjeta final.** | "Saca tu número gratis · 1 receta · sin registro" | "Pruébala gratis con una receta." |

- **Hooks alternativos:**
  1. *Contraintuitivo:* "El problema no es que tu precio sea caro. Es que no sabes de dónde salió."
  2. *Deseo:* "Manda tu próximo presupuesto con el precio mínimo ya calculado."
- **Estático alternativo (1080×1350):** mitad superior: captura recreada de un chat con "escribiendo…" (rótulo "Recreación"). Mitad inferior: tarjeta con "Mínimo $81.276 / Sugerido $116.109 · EJEMPLO". Texto grande: **"Antes de mandar el precio, saca tu número"**. Pie: **"Calculadora gratis · 1 receta"**.

### visto-b · hook tipo PRUEBA DE MERCADO (cita VoC)
- **URL:** `…/calculadora/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=visto-b`
- **Texto corto (116):**
  "Cada vez que doy un presupuesto es mucha la ansiedad…" Lo escribió una repostera en un blog. Saca tu número gratis.
- **Texto largo:** el texto corto + `||` + el cuerpo de visto-a desde "Casi siempre la duda…". Agregar al pie: "(La cita es un comentario público en un blog de repostería; esa persona no usó esta calculadora.)"
- ⚠ **Verificar la cita en la URL antes de publicar** (`02-voc.md` 3.2, Pedacito de Cielo, comentario de Francis). La frase completa es "…es mucha la ansiedad o nervios por la respuesta"; se recorta con "…" sin cambiar el sentido.
- **Guion:** cambia solo de 0 a 3 s.

| Tiempo | Toma | Texto en pantalla | Voz en off |
|---|---|---|---|
| 0-3 s | **Hook visual:** cita en tipografía grande sobre un fondo de cocina desenfocado; abajo, en chico: "comentario público en un blog de repostería". | "'Cada vez que doy un presupuesto es mucha la ansiedad o nervios por la respuesta'" | "Una repostera escribió esto en un blog. Y no es la única." |
| 3-28 s | = visto-a (tomas 2 a 5) | | |

- **Hooks alternativos:**
  1. *Pertenencia (VoC 3.3):* "'Pensé que era la única con temor a dar costos.' No lo es." ⚠ verificar en la URL.
  2. *Curiosidad:* "Lo que conviene hacer 2 minutos antes de mandar un presupuesto." ⚠ `[NECESITA RESPALDO: cronometrar la carga de 1 receta en la calculadora; si tarda más de 2 min, quitar la cifra]`.
- **Carrusel alternativo:**

| Tarjeta | Imagen | Titular (≤40) | Descripción (≤30) |
|---|---|---|---|
| 1 | Cita VoC 3.2 sobre fondo crema | "Es mucha la ansiedad…" (22) | Lo escribió una repostera (25) |
| 2 | Chat recreado con "escribiendo…" | Ese minuto después de enviar (28) | Recreación (10) |
| 3 | Captura de la calculadora, E1 | Mínimo $81.276 · Sugerido $116.109 (34) | Ejemplo, torta para 12 (22) |
| 4 | Botón "Calcula gratis" | Saca tu número antes de cotizar (31) | Gratis · 1 receta (17) |

---

## 4. Ángulo #6: Calculaste 4 horas, te tomó 8 (`horas`) · N1 · destino CALC

**Por qué abre así:** N1 → revelación con especificidad. Es el mecanismo hecho visible: lo que el "× 3" no ve y la calculadora sí, tus horas. Demostración pura: el mismo precio pasa de amarillo a rojo cambiando **solo** el campo de horas.

**Comunes a A y B**
- Titular: **¿Cuánto vale tu hora en esa torta?** (34)
- Descripción: **Calcúlalo gratis** (16)
- Botón CTA: **Más información** (N1 frío; acción gratis).
- México: torta → **pastel**; usar el ejemplo MX con precio $600: con 4 h, amarillo y **$96.54 por hora**; con 8 h, rojo, **$253.83 por debajo del mínimo y $48.27 por hora** (calculado con la fórmula de la calculadora, rotular "Ejemplo").

### horas-a · hook tipo DATO (contraste de 6 palabras)
- **URL:** `…/calculadora/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=horas-a`
- **Texto corto (114):**
  Calculaste 4 horas. Te tomó 8. Mismo precio, pero tu hora ahora vale la mitad. Haz la cuenta con tu torta, gratis.
- **Texto largo:**
  Calculaste 4 horas. Te tomó 8. Mismo precio, pero tu hora ahora vale la mitad. Haz la cuenta con tu torta, gratis. ||

  Ejemplo: una torta de $100.000.
  · Con 4 horas te quedan $15.931 por cada hora.
  · Con 8 horas (las de verdad: comprar, hornear, decorar, entregar) te quedan $7.965, y la torta queda $56.276 por debajo de su precio mínimo.
  Lo único que cambió fueron las horas.

  La regla de "ingredientes × 3" no sabe cuánto te demoraste. Esta calculadora sí: le pones tus horas, cuánto quieres ganar por hora, y te dice tu precio mínimo y tu sugerido.

  1 receta, gratis, sin registro. Tus datos no salen de tu celular ↓

  (Cifras de ejemplo en pesos colombianos.)

**Guion de video (24-28 s):**

| Tiempo | Toma | Texto en pantalla | Voz en off / subtítulo |
|---|---|---|---|
| 0-3 s | **Hook visual:** timelapse de manos decorando una torta (crema, boquilla); un reloj grande sobreimpreso corre de 0:00 a 4:00 y sigue sin frenar hasta 8:00. | Seg. 0-1,5: "Calculaste 4 horas." · seg. 1,5-3: "Te tomó 8." | "Calculaste cuatro horas. Te tomó ocho." |
| 3-11 s | Grabación de pantalla: ejemplo E2 (precio 100.000, horas 4) → pastilla **amarilla**. | "4 h → $15.931 por hora" + "EJEMPLO" | "En este ejemplo, una torta de cien mil pesos con cuatro horas deja unos dieciséis mil por hora." |
| 11-19 s | Primer plano del dedo borrando el "4" y escribiendo "8" en "Horas que te toma". La pastilla pasa a **roja** en tiempo real. | "8 h → $7.965 por hora · $56.276 bajo el mínimo" | "Cambia solo las horas a ocho. Mismo precio: tu hora vale la mitad y la torta queda debajo del mínimo." |
| 19-24 s | Plano de la sección "Lo que casi todas olvidan". | "Comprar + hornear + decorar + entregar" | "Pon las horas de verdad: comprar, hornear, decorar y entregar." |
| 24-28 s | **Tarjeta final.** | "¿Cuánto vale tu hora? Calcula 1 receta gratis" | "Hazlo gratis con tu receta." |

- Producción: el timelapse puede ser de una repostera real que preste sus manos (sin hablar ni dar testimonio) o generado con IA. No se presenta como "mi pedido".
- **Hooks alternativos:**
  1. *Curiosidad:* "Cambié un solo número en esta calculadora y la torta pasó de amarillo a rojo."
  2. *Contraintuitivo:* "Tu torta no se encareció. Se encareció tu sábado." (sobre el tiempo, no sobre el dinero de quien mira)
- **Estático alternativo:** imagen partida en dos. Izquierda, reloj en 4:00 y **"4 h → $15.931 la hora"** sobre fondo amarillo. Derecha, reloj en 8:00 y **"8 h → $7.965 la hora"** sobre fondo rojo. Arriba: **"Misma torta, mismo precio (ejemplo)"**. Abajo: **"¿Cuántas horas le pones a la tuya? Calcula gratis"**.

### horas-b · hook tipo PRUEBA DE MERCADO (paráfrasis VoC 5.2)
- **URL:** `…/calculadora/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=horas-b`
- **Texto corto (113):**
  Una repostera lo contó así: a veces crees que un pastel te tomará 3 o 4 horas, y se te van 8. ¿Cuántas cobras tú?
- **Texto largo:** el texto corto + `||` + el cuerpo de horas-a desde "Ejemplo: una torta de $100.000." Al pie: "(Paráfrasis de un comentario público en un blog de repostería.)"
- Nota: es **paráfrasis** de VoC 5.2 (sin comillas, porque el original tiene faltas: "8 oras"). "Pastel" va así porque así lo escribió; en CO no molesta.
- **Guion:** cambia solo de 0 a 3 s.

| Tiempo | Toma | Texto en pantalla | Voz en off |
|---|---|---|---|
| 0-3 s | **Hook visual:** cocina de noche, horno con luz encendida, reloj de pared en 11:40 p. m. (escena, sin persona). | "'Crees que vas a tardar 3 o 4 horas… y pasas como 8'" + pie "lo contó una repostera en un blog" | "Una repostera lo contó así: crees que vas a tardar tres o cuatro horas, y pasas como ocho." |
| 3-28 s | = horas-a (tomas 2 a 5) | | |

- **Hooks alternativos:**
  1. *Deseo:* "Que tu precio pague las 8 horas, no las 4 que pensabas."
  2. *Contraintuitivo:* "La parte más cara de tu torta no es la mantequilla." (sin afirmar que subió nada)
- **Carrusel alternativo:**

| Tarjeta | Imagen | Titular (≤40) | Descripción (≤30) |
|---|---|---|---|
| 1 | Reloj 4:00 → 8:00 | Calculaste 4 horas. Te tomó 8. (30) | Pasa más de lo que crees (24) |
| 2 | Captura amarilla, E2 | 4 h: $15.931 por hora (21) | Ejemplo, torta de $100.000 (26) |
| 3 | Captura roja, E3 | 8 h: $7.965 por hora (20) | Mismo precio, otra cuenta (25) |
| 4 | Campo "Horas que te toma" resaltado | Pon tus horas de verdad (23) | Calcula 1 receta gratis (23) |

---

## 5. Ángulo #14: ¿De dónde sale el × 3? (`x3`) · N3 · destino CALC

**Por qué abre así:** consciente de la solución → abre diferenciando el mecanismo frente a la regla de dedo que ya usa ("como se yo si esos valores me sirven a mi o no?", VoC 7.7), con mucha demostración y CTA directo.

**Comunes a A y B**
- Titular: **Tu número, no una regla de dedo** (31)
- Descripción: **Calculadora gratis** (18)
- Botón CTA: **Más información** (N3; la herramienta es gratis y la diferencia se ve al usarla).
- México: torta → **pastel**. Ejemplo MX honesto: ingredientes $151.27 × 3 = **$453.80**, mínimo $453.83 → **el × 3 apenas cubre el mínimo: $0 de ganancia para el negocio** (sugerido $648.33). Con 6 horas, el mínimo sube a $693.83 y el × 3 queda **$240.03 debajo**.

### x3-a · hook tipo CONTRAINTUITIVO (enemigo: la regla)
- **URL:** `…/calculadora/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=x3-a`
- **Texto corto (111):**
  ×2, ×2,5, ×3… ¿De dónde sale ese número? Ninguna regla sabe cuántas horas le metiste a tu torta. Tu cuenta, sí.
- **Texto largo:**
  ×2, ×2,5, ×3… ¿De dónde sale ese número? Ninguna regla sabe cuántas horas le metiste a tu torta. Tu cuenta, sí. ||

  Ejemplo con la misma torta de chocolate:
  · Ingredientes × 3 = $75.075
  · Precio mínimo con 3 horas de trabajo = $81.276 → el × 3 queda $6.201 por debajo
  · Si es temática y te toma 6 horas, el mínimo sube a $126.276… y el × 3 sigue diciendo $75.075

  La regla da el mismo número para una torta de 3 horas que para una de 6. Tu cuenta no.

  Esta calculadora suma tus ingredientes (con 5 % de merma), el empaque, el gas por minutos de horno y tus horas, y te dice tu precio mínimo y tu sugerido.

  Gratis, 1 receta, sin registro ↓

  (Cifras de ejemplo en pesos colombianos.)

**Guion de video (24-28 s, pantalla partida):**

| Tiempo | Toma | Texto en pantalla | Voz en off / subtítulo |
|---|---|---|---|
| 0-3 s | **Hook visual:** mano escribiendo en un cuaderno "× 2", tachándolo, "× 2,5", tachándolo, "× 3", con un signo de pregunta grande. | "×2, ×2,5, ×3… ¿y cuál es el tuyo?" | "Por dos, por dos y medio, por tres… ¿de dónde sale ese número?" |
| 3-10 s | Pantalla partida. Izquierda: cuaderno "Ingredientes $25.025 × 3 = $75.075". Derecha: calculadora con E4. | "Regla: $75.075 · Tu mínimo: $81.276" + "EJEMPLO" | "Misma torta. Con la regla da setenta y cinco mil. Su mínimo real, con tres horas, es ochenta y un mil." |
| 10-18 s | En la derecha, el dedo cambia horas de 3 a 6 (E5); el mínimo salta a $126.276. La izquierda no se mueve. | "6 horas: tu mínimo $126.276 · la regla sigue en $75.075" | "Si es temática y te toma seis horas, tu mínimo sube. La regla sigue igual." |
| 18-24 s | Calculadora: plano de las 4 partes (ingredientes, empaque, gas, horas). | "Tus ingredientes. Tus horas. Tu número." | "La calculadora usa tus ingredientes y tus horas. Te da tu mínimo y tu sugerido." |
| 24-28 s | **Tarjeta final.** | "Tu número, no una regla · Calcula gratis" | "Pruébala gratis con una receta." |

- **Hooks alternativos:**
  1. *Prueba de mercado (VoC 7.4):* "'Quisiera saber porque le multiplican por 2.5, de donde saldría ese número.' Aquí está la respuesta para TU torta." ⚠ verificar en la URL.
  2. *Deseo:* "Un precio que puedas explicar, no uno que copiaste."
- **Estático alternativo:** cuaderno real con "× 3 = $75.075" tachado en rojo y, encima, un celular con "Mínimo $81.276". Texto: **"La regla no sabe cuántas horas le metiste"** · pie: **"Ejemplo · Calcula la tuya gratis"**.

### x3-b · hook tipo DEMOSTRACIÓN (comparación con número)
- **URL:** `…/calculadora/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=x3-b`
- **Texto corto (112):**
  Misma torta: con «ingredientes × 3» da $75.075. Su precio mínimo real: $81.276. (Ejemplo.) Haz tu cuenta gratis.
- **Texto largo:** el texto corto + `||` + el cuerpo de x3-a desde "Ejemplo con la misma torta de chocolate:".
- **Guion:** cambia solo de 0 a 3 s.

| Tiempo | Toma | Texto en pantalla | Voz en off |
|---|---|---|---|
| 0-3 s | **Hook visual:** pantalla partida desde el primer fotograma, dos números grandes enfrentados: "$75.075" (cuaderno) contra "$81.276" (calculadora), con un "≠" en medio. | "× 3: $75.075 · Tu mínimo: $81.276" + "EJEMPLO" | "La misma torta, con la regla del tres y con su costo real. Mira la diferencia." |
| 3-28 s | = x3-a (tomas 2 a 5) | | |

- **Hooks alternativos:**
  1. *Contraintuitivo:* "El × 3 no está mal. Está incompleto: no sabe tus horas."
  2. *Curiosidad:* "Lo que el × 3 no te dice de una torta temática."
- **Carrusel alternativo:**

| Tarjeta | Imagen | Titular (≤40) | Descripción (≤30) |
|---|---|---|---|
| 1 | Cuaderno con "× 3" | ¿De dónde sale el × 3? (22) | Nadie te lo explicó (19) |
| 2 | Cuaderno vs. calculadora, E4 | × 3: $75.075 · Mínimo: $81.276 (30) | Ejemplo, 3 horas (16) |
| 3 | Calculadora, E5 | Temática de 6 h: mínimo $126.276 (32) | La regla no cambió (18) |
| 4 | Las 4 partes de la cuenta | Tus ingredientes, tus horas (27) | Calcula 1 receta gratis (23) |

---

## 6. Ángulo #9: "Está caro": respóndele con números (`caro`) · N2 → producto · destino LAND

**Por qué abre así:** este es el único que **muestra la app paga** (mensajes, duplicar receta, aviso de precio bajo el mínimo). Al mostrar el producto, el prospecto pasa a "consciente del producto", así que el destino es la landing y el texto lleva oferta, garantía y prueba. Sirve de control: dice si el tráfico frío compra directo o necesita la calculadora.

**Lo que la app hace de verdad (verificado en `app.js`) y lo que NO se promete:**
- ✔ Pestaña "Mensajes" con **5 mensajes listos** ("Explicar el valor", "Ofrecer otra opción sin bajar tu precio", "Cuando comparan con otra", "Cuando subes precios", "Cerrar con amabilidad"), con botones Copiar y Enviar por WhatsApp. Tienen espacios para completar ([tamaño menor], [precio]).
- ✔ "Duplicar receta" para armar una versión más pequeña con su propio precio.
- ✔ "Cotizar por WhatsApp" avisa "⚠ Ese precio está por debajo de tu mínimo" si escribes un precio menor.
- ✘ No "cierra la venta" ni garantiza que la clienta acepte. La propia app lo dice: "No se trata de convencer a todas".

**Comunes a A y B**
- Titular: **Respóndele con tu número** (24)
- Descripción: **USD 12 · pago único** (19)
- Botón CTA: **Más información**. Justificación: el anuncio ya dice el precio (filtra), pero es tráfico frío y la landing todavía tiene que resolver "¿y si es estafa?" (calculadora gratis primero). Ronda 2: probar **Comprar** contra **Más información** en el ganador.
- México: torta → **pastel**; plata → **dinero**; "Paga con PSE, Nequi o Efecty" → **"Paga con OXXO o SPEI"** `[PENDIENTE: confirmar métodos activos en el producto de Hotmart]`.

### caro-a · hook tipo ESCENA (objeción externa)
- **URL:** `https://cuantocobro.vendedecasa.com/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=caro-a`
- **Texto corto (121):**
  Te dijeron «está caro». La próxima vez, que no te agarre sin respuesta: tu precio mínimo y 5 mensajes listos para copiar.
- **Texto largo:**
  Te dijeron «está caro». La próxima vez, que no te agarre sin respuesta: tu precio mínimo y 5 mensajes listos para copiar. ||

  ¿Cuánto Cobro? es una app para el celular que hace tres cosas:
  1. Calcula el costo real de cada receta: ingredientes (con 5 % de merma), empaque, gas y luz por minutos de horno, y tus horas. Te da tu precio mínimo y tu sugerido.
  2. Si te piden algo más barato, duplicas la receta en tamaño más pequeño o con otro relleno y ves su precio, sin bajar el de tu trabajo.
  3. Trae 5 mensajes para cuando te dicen «está caro» o te comparan con otra. Copias, ajustas a tu estilo y envías.

  No convence a todas las clientas. Te da con qué responder.

  USD 12, pago único, sin mensualidad. Pagas en pesos (PSE, Nequi, Efecty) [PENDIENTE: confirmar en Hotmart].
  Acceso inmediato [PENDIENTE: la landing aún dice preventa con entrega al 30-nov-2026; alinear antes de publicar].
  Garantía de 7 días: si no te sirve, te devolvemos tu dinero.
  ¿Quieres probar primero? En la página hay una calculadora gratis de 1 receta ↓

**Guion de video (28-30 s, chat recreado + grabación de pantalla de la app):**

| Tiempo | Toma | Texto en pantalla | Voz en off / subtítulo |
|---|---|---|---|
| 0-3 s | **Hook visual:** chat de WhatsApp **recreado**. La repostera envía "$150.000"; entra la burbuja de la clienta: "uy, está caro". Vibración del celular. | "Te dijeron «está caro» ↓" + rótulo "Recreación" | "Te dijeron 'está caro'. La próxima vez, ten con qué responder." |
| 3-10 s | App, pestaña "Mensajes" → "Cuando te dicen 'está caro'" → toca **Copiar** en "Explicar el valor". | "5 mensajes listos para copiar" | "En la app hay cinco mensajes listos: copias, lo ajustas a tu estilo y lo mandas." |
| 10-18 s | App → la receta → "Duplicar receta" → cambia porciones e ingredientes → precio sugerido nuevo. | "¿Le queda grande? Ofrécele otra versión" | "Y si de verdad no le alcanza, duplicas la receta más pequeña y le ofreces otra versión con su propio precio, sin bajar el tuyo." |
| 18-23 s | "Cotizar por WhatsApp": escribe un precio bajo y aparece "⚠ Ese precio está por debajo de tu mínimo". | "Si bajas de tu mínimo, la app te avisa" | "Y si escribes un precio por debajo de tu mínimo, la app te avisa." |
| 23-28 s | Tarjeta de oferta: "USD 12 · pago único · garantía de 7 días · pagas en pesos". | "No convence a todas. Te da con qué responder." | "Doce dólares, una sola vez. Si no te sirve, tienes siete días para pedir tu dinero." |
| 28-30 s | **Tarjeta final.** | "¿Cuánto Cobro? · Prueba gratis 1 receta" | "Prueba primero gratis con una receta." |

- **Hooks alternativos:**
  1. *Prueba de mercado (VoC 2.2):* "'Pretenden comparar el precio de una torta personalizada con una torta de pastelería.' Para eso hay respuesta." ⚠ verificar en la URL.
  2. *Deseo:* "Que la próxima vez que te digan «está caro» ya tengas el mensaje escrito."
- **Estático alternativo:** arriba, burbuja de chat recreada "uy, está caro" (rótulo "Recreación"). Abajo, captura de la pestaña "Mensajes" de la app. Texto: **"Respóndele con tu número, no con nervios"**. Pie: **"USD 12 pago único · garantía de 7 días"**.

### caro-b · hook tipo CONTRAINTUITIVO (no bajes el precio, cambia el pedido)
- **URL:** `…/?utm_source=meta&utm_medium=paid&utm_campaign=cc-prueba1&utm_content=caro-b`
- **Texto corto (121):**
  Cuando te dicen «está caro», no bajes tu trabajo: cambia el pedido. Más pequeña, otro relleno, y con su precio calculado.
- **Texto largo:** el texto corto + `||` + el cuerpo de caro-a desde "¿Cuánto Cobro? es una app…".
- **Guion:** cambia solo de 0 a 3 s.

| Tiempo | Toma | Texto en pantalla | Voz en off |
|---|---|---|---|
| 0-3 s | **Hook visual:** dos tortas, una grande de 2 pisos y una pequeña de 1 piso, lado a lado; sobre cada una aparece su precio con la etiqueta "EJEMPLO" `[PENDIENTE: calcular las dos versiones en la app antes de grabar; no inventar las cifras]`. | "No bajes tu trabajo. Cambia el pedido." | "Cuando te dicen 'está caro', no bajes tu trabajo. Cambia el pedido." |
| 3-30 s | = caro-a (tomas 2 a 6) | | |

- **Hooks alternativos:**
  1. *Curiosidad:* "La respuesta a «está caro» que no es bajar el precio."
  2. *Dato:* "Debajo de tu precio mínimo pierdes. ¿Sabes cuál es el tuyo antes de negociar?"
- **Carrusel alternativo:**

| Tarjeta | Imagen | Titular (≤40) | Descripción (≤30) |
|---|---|---|---|
| 1 | Chat recreado "uy, está caro" | Te dijeron «está caro» (22) | Recreación (10) |
| 2 | Pestaña Mensajes | 5 mensajes listos para copiar (28) | Y ajustar a tu estilo (21) |
| 3 | Duplicar receta, versión pequeña | Otra versión, con su precio (27) | Sin bajar tu trabajo (20) |
| 4 | Tarjeta de oferta | USD 12, pago único (18) | Garantía de 7 días (18) |

---

## 7. Suplentes (si un anuncio se rechaza o un ángulo muere el día 3)

Mismo formato. Se pueden producir con las mismas tomas de pantalla.

**#22 El pedido raro (`pedido`) · N2 · CALC**
- Texto corto (113): "Te pidieron una torta de 2 pisos temática. No respondas todavía: primero saca tu costo, con decoración y horas."
- Titular: **¿Cuánto cobrar por esa torta?** (29) · Descripción: **Calcula 1 receta gratis** (23) · CTA: Más información.
- Hook 0-3 s: notificación de WhatsApp **recreada** "¿Cuánto me cobras una de 2 pisos de Stitch para el sábado?" + texto "No respondas todavía". VoC de apoyo: 1.20, 5.3, 1.14.
- México: "2 pisos" igual; torta → pastel.

**#5 ¿Caro o barato? (`carobarato`) · N1-N2 · CALC**
- Texto corto (100): "Entregaste la torta. ¿La cobraste caro o barato? Si no lo sabes en 5 segundos, esta calculadora sí."
- Titular: **¿Caro o barato? Sal de la duda** (30) · Descripción: **Gratis · sin registro** (21) · CTA: Más información.
- Hook: torta entregada en una caja, con un signo de pregunta. VoC 1.8 ("quedé con dudas si estuvo caro o barato?").

---

## 8. Estructura de la campaña

### 8.1 Qué evento optimizar (y cuál NO)

**Evento de optimización: "calculadora completada" = `calc_primer_resultado` → evento estándar `Lead` del píxel**, una sola vez por navegador.

- **Qué mide exactamente:** en `calculadora.js` se dispara en el primer `input` después de que el bloque "Tu resultado" se hizo visible, o sea, cuando la persona ya escribió a mano al menos un ingrediente con cantidad comprada, precio y cantidad usada, y vio su precio mínimo y su sugerido. **No** se dispara solo por tocar "Ver un ejemplo lleno" (eso es `calc_ejemplo`, porque el llenado automático no genera `input`). Es el mejor proxy disponible de "metió SU receta".
- **Por qué `Lead` y no un evento personalizado:** los eventos estándar se eligen directo como objetivo de rendimiento y Meta los aprende mejor. Se manda con `content_name: "calculadora"` para distinguirlo de futuros leads reales.
- **Por qué no `Purchase`:** a USD 2/día por conjunto, un producto de USD 12 no junta compras suficientes para que Meta aprenda en 7 días. La calculadora sí da señal en días. Las compras se miden igual, como métrica de lectura.
- **Limitación honesta:** ni con `Lead` los conjuntos van a salir de la fase de aprendizaje (Meta pide ~50 eventos por semana por conjunto; a USD 14/semana eso exigiría un costo por evento de unos USD 0,28). Esta prueba **compara ángulos entre sí**; no es una campaña optimizada.
- **Deduplicación:** `primerResultado` se reinicia en cada carga de página. Si la persona vuelve, se dispararía otra vez. El puente de la §8.2 guarda una marca en `localStorage` para mandar `Lead` una sola vez.
- **Mejora para la ronda 2 `[PENDIENTE]`:** un evento `calc_semaforo` en `calculadora.js`, cuando hay resultado + horas > 0 + precio actual > 0 (o sea, vio su verde, amarillo o rojo). Es el "ajá" real. Cuando exista, pasa a ser el `Lead`.

**Mapa de eventos (todos ya existen en el `dataLayer`, salvo `Purchase`):**

| Evento `dataLayer` (archivo) | Evento del píxel | Uso |
|---|---|---|
| carga de cualquier página | `PageView` | base |
| carga de `/calculadora/` | `ViewContent` `{content_name:"calculadora"}` | lectura: visitas a la calculadora |
| `landing_a_calculadora` (index.html, botones con `data-evento`) | `trackCustom LandingACalculadora` | lectura del ángulo #9 |
| **`calc_primer_resultado`** (calculadora.js) | **`Lead` `{content_name:"calculadora"}`**, 1 vez por navegador | **OPTIMIZACIÓN** |
| `calc_a_preventa` (calculadora.js, botón "Guardar todas mis recetas en la app") | `trackCustom CalcAPreventa` | lectura: intención después del "ajá" |
| `clic_comprar_preventa` (index.html, botón "Reservar mi acceso") | `InitiateCheckout` `{value:12, currency:"USD"}` | lectura: costo por intento de compra |
| compra aprobada en Hotmart | `Purchase` | lectura: costo por compra. `[PENDIENTE: cargar el ID del píxel en la configuración de píxel del producto en Hotmart y verificar que dispare Purchase en compras aprobadas, incluidos los pagos en efectivo (Efecty) que se aprueban después]` |

Extra: el enlace a Hotmart es fijo, así que el `utm_content` se pierde en el checkout. `[PENDIENTE]`: pasar `utm_content` al link de Hotmart como parámetro `sck` (Hotmart lo reporta por venta) para cruzar ventas con ángulos sin depender solo de la atribución de Meta.

### 8.2 Cómo conectarlo (sin GTM)

En el `<head>` de `public/index.html` y de `public/calculadora/index.html`, **antes** de los scripts de la página:
1. El código base del píxel copiado del Administrador de eventos de la cuenta **personal** (`fbq('init', '[PENDIENTE: PIXEL_ID personal]'); fbq('track','PageView');`).
2. Este puente, que lee los eventos que el sitio ya empuja al `dataLayer`:

```html
<script>
(function () {
  var dl = window.dataLayer = window.dataLayer || [];
  var original = dl.push.bind(dl);
  var mapa = {
    landing_a_calculadora: ["trackCustom", "LandingACalculadora"],
    calc_primer_resultado: ["track", "Lead", { content_name: "calculadora" }],
    calc_a_preventa:       ["trackCustom", "CalcAPreventa"],
    clic_comprar_preventa: ["track", "InitiateCheckout", { value: 12, currency: "USD" }]
  };
  dl.push = function (o) {
    var r = original(o), m = o && mapa[o.event];
    if (!m || !window.fbq) return r;
    if (o.event === "calc_primer_resultado") {
      try { if (localStorage.getItem("cc:lead")) return r; localStorage.setItem("cc:lead", "1"); } catch (e) {}
    }
    fbq(m[0], m[1], m[2] || {});
    return r;
  };
})();
</script>
```
3. Solo en la calculadora: `fbq('track','ViewContent',{content_name:'calculadora'});`.
4. Publicar con `bash scripts/deploy.sh cuanto-cobro` (nunca `wrangler deploy` suelto) y verificar con la extensión Meta Pixel Helper o con "Probar eventos" del Administrador de eventos: hacer el recorrido completo y ver `PageView → ViewContent → Lead → CalcAPreventa → InitiateCheckout`.
5. Verificar el dominio `vendedecasa.com` en el Business Manager **personal**.
6. Nota de privacidad: el pie de la calculadora dice "Tus datos se quedan en tu teléfono; no los enviamos a ningún servidor". El puente no manda ingredientes ni precios, solo el nombre del evento; la frase sigue siendo cierta. Igual conviene agregar al pie: "Usamos el píxel de Meta para medir visitas" `[PENDIENTE: decidir el texto]`.

### 8.3 Configuración

| Ajuste | Recomendación | Por qué |
|---|---|---|
| Campaña | 1 campaña `cc-prueba1`, objetivo **Clientes potenciales**, ubicación de conversión **Sitio web**, evento **Lead** (calculadora) | El objetivo con el que Meta optimiza un evento web de "lead" sin formulario. |
| Presupuesto | **ABO: 5 conjuntos × USD 2/día** (≈ USD 70 en 7 días). Estrategia de puja: volumen máximo, sin límite de costo. | La variable es el ángulo: cada uno recibe el mismo dinero. `[PENDIENTE: verificar el mínimo diario por conjunto en la moneda de la cuenta; si Meta exige más, bajar a 4 conjuntos y dejar caro para la ronda 2]`. |
| Conjuntos | 1 por ángulo: `rojo`, `visto`, `horas`, `x3`, `caro`. **2 anuncios por conjunto (A y B en video)**; los estáticos y carruseles quedan de reserva. | A vs. B aísla el hook; conjunto vs. conjunto aísla el ángulo. |
| Optimización del conjunto `caro` | También `Lead`. Leerlo por `InitiateCheckout` y `Purchase`. | Los 5 se comparan con el mismo evento; el `caro` se juzga además por compra (su destino es la landing). |
| País | **Colombia** solamente. | Con USD 10/día, mezclar países atomiza la señal (03-angulos). Los textos están en vocabulario CO. |
| Edad | **Mínima 23** (control duro). Sugerencia de rango 25-50. | El corte duro saca estudiantes y hobby; el resto lo deciden el algoritmo y el creativo. |
| Idioma | Español. | |
| Advantage+ audiencia | **Sí**, con sugerencias: mujeres; intereses semilla repostería, decoración de tortas, pastelería, mesas de postres, pequeña empresa `[verificar qué intereses existen hoy]`. | En 2026 edad, género e intereses ya son sugerencias. El creativo segmenta ("si vendes tortas por encargo"). |
| Ubicaciones | **Manuales:** Facebook e Instagram Feed, Reels y Stories. **Apagar:** Audience Network, Messenger, columna derecha, Marketplace, resultados de búsqueda, Threads. | Con USD 2/día, Audience Network gasta en clics accidentales y ensucia el CTR. Los videos están hechos para 9:16 y 4:5. |
| Exclusiones (públicos personalizados) | (1) Compradoras: evento `Purchase` 180 días + lista de Hotmart. (2) Quienes ya hicieron `Lead` en los últimos 30 días (para no pagar dos veces por la misma persona). | Hoy están vacías; se crean el día 1 y se llenan solas. |
| Atribución | Por defecto (7 días clic / 1 día visualización). Leer también la columna "1 día clic". | |
| Advantage+ creativo | **Todo apagado.** | Ver §1. |
| Horario | Siempre activo. **Nada de programar horas nocturnas.** | Guardarraíl del playbook (§5). |
| Nombres | Campaña `cc-prueba1 · CO · Lead` · conjunto `rojo · ABO2` · anuncio `rojo-a · video 9:16`. | Que coincidan con `utm_content`. |
| Duración | **5-7 días sin tocar** nada (ni presupuesto, ni texto, ni público). Cada edición reinicia el aprendizaje. La única excepción es un rechazo de Meta: se cambia por el suplente. | |

### 8.4 Criterios de lectura (umbrales de referencia, a calibrar con datos propios)

**Mínimo para juzgar:** un conjunto con menos de **USD 6 gastados (≈ 3 días) o menos de 1.000 impresiones** no se juzga.

**Economía detrás de los umbrales** (hipótesis, reemplazar con datos):
- Neto por venta ≈ USD 10 `[PENDIENTE: neto real después de la comisión de Hotmart]`.
- Conversión de calculadora completada a compra: hipótesis 3-5 % (no hay datos aún).
- Costo por `Lead` de punto de equilibrio ≈ USD 10 × 3-5 % = **USD 0,30-0,50**.

| Métrica | Matar | Mantener | Escalar | Qué indica |
|---|---|---|---|---|
| CTR del enlace (no "CTR todos") | < 0,8 % | 0,8-1,5 % | > 1,5 % | Si el ángulo y el hook frenan el pulgar. |
| Hook rate (reproducciones de 3 s / impresiones) | < 20 % | 20-30 % | > 30 % | Si falla con CTR bajo pero el costo por `Lead` es bueno: **cambiar el hook, no el ángulo**. |
| Vistas de página / clics en el enlace | < 70 % → revisar velocidad de carga, no el anuncio | | | |
| **Costo por calculadora completada (`Lead`)** | > USD 1,00 **o** > 2× el mejor conjunto, o 0 leads con USD 6 gastados | USD 0,50-1,00 | ≤ USD 0,50 y CTR ≥ 1 % | La métrica que decide qué ángulo gana. |
| `CalcAPreventa` / `Lead` | < 5 % → la calculadora no lleva a la app (revisar el botón y el texto del resultado) | 5-10 % | > 10 % | Si el "ajá" se convierte en intención. |
| Costo por compra (campaña completa, día 7) | > USD 25, o 0 compras con ≥ 50 leads → el problema es la oferta, la landing o el checkout, no el anuncio | USD 10-25 → buscar la fuga del embudo | ≤ USD 10 → rentable | Con USD 70 en total habrá pocas compras: leerlo a nivel campaña, no por conjunto. |

**Decisión del día 7:**
1. Apagar los conjuntos en zona de "matar".
2. El ángulo ganador (el menor costo por `Lead` con CTR ≥ 1 %) recibe el presupuesto liberado: +20-30 % cada 3-4 días, o se duplica a CBO con sus 2 anuncios.
3. Dentro del ganador: el anuncio A o B con mejor costo por `Lead` queda como control; ronda 2 = 2 hooks nuevos sobre el mismo cuerpo, más la prueba de largo de texto (corto vs. largo) y la del botón (Comprar vs. Más información) en `caro`.
4. Abrir un conjunto de **retargeting** (USD 2-3/día) con el ángulo #25 de `03-angulos.md` para quienes hicieron `Lead` en 30 días, excluyendo compradoras. La subida a USD 17 se usa ahí **solo** con fecha real (B3).
5. Pasar los ganadores a `angulos-ganadores.md`.

---

## 9. Plan de testeo

| Prioridad | Anuncio / conjunto | Por qué |
|---|---|---|
| 1.º (control sugerido) | **rojo-a** | La puerta más grande (N1), el "ajá" se lo da ella misma con su receta, el riesgo de política es mínimo y se graba solo con el celular. Si solo puedes producir uno, es este. |
| 2.º | **horas-a** | Reutiliza la misma sesión de grabación de pantalla (ejemplos E2/E3) y hace visible el mecanismo que ninguna regla de dedo tiene: las horas. Hook de 6 palabras que funciona sin sonido. |
| 3.º | **x3-a** | Prueba si el mercado responde mejor al enemigo racional (la regla) que al emocional. Orienta la ronda 2. |
| 4.º | **visto-a** | El dolor más diferenciado, pero requiere un chat recreado y su "ajá" es emocional, no numérico: hay que confirmar que convierte en calculadora completada y no solo en clic. |
| 5.º | **caro-a** | Requiere grabar la app paga y tiene el bloqueo B2 (preventa vs. acceso inmediato). Es el control de "¿compra directo el tráfico frío?". |

| Par | Variable aislada | Qué responde |
|---|---|---|
| rojo-a vs. rojo-b | Hook: dato (cifra de ejemplo) vs. curiosidad (pregunta) | ¿Frena más un número concreto o una pregunta abierta? |
| visto-a vs. visto-b | Hook: escena actuada vs. cita real del mercado | ¿Pesa más la escena o la voz de otra repostera? |
| horas-a vs. horas-b | Hook: contraste propio vs. paráfrasis VoC | ¿La anécdota ajena suma confianza o distrae? |
| x3-a vs. x3-b | Hook: contrarian verbal vs. comparación visual con números | ¿Discurso o demostración en los primeros 3 s? |
| caro-a vs. caro-b | Hook: objeción ("te dijeron está caro") vs. contraintuitivo ("cambia el pedido") | ¿Duele más la escena o atrae más la solución? |
| Conjunto vs. conjunto | Ángulo (mismo presupuesto, mismo evento, mismo público) | ¿Qué puerta es la más barata por calculadora completada? |
| Reserva (ronda 2) | Mismo creativo: video vs. estático/carrusel | ¿Hace falta video o basta un estático para validar ángulos nuevos? |

**Producción en una sola tarde:** (1) grabación de pantalla de la calculadora en un celular real con país = Colombia y los escenarios E1-E5 de la §0; (2) un chat recreado (WhatsApp con un segundo número propio o un generador de mockups, siempre con el rótulo "Recreación"); (3) grabación de la app paga (Mensajes, Duplicar, Cotizar); (4) tomas de apoyo: manos con una torta, timelapse de decoración, cuaderno con "× 3" (de una repostera real que preste las manos, o generadas con IA); (5) voz en off de Alejo o TTS neutra; (6) subtítulos quemados.

---

## 10. Auto-auditoría

### 10.1 Políticas de Meta y reglas del proyecto (por anuncio)

Leyenda: ✔ cumple · ⚠ cumple con condición (ver nota).

| Anuncio | Atributos personales / sin "¿estás…?" | Situación económica de quien mira | Promesa de ingresos | Antes/después financiero engañoso | Testimonios inventados | Culpa familiar | Urgencia solo real | Rótulos Ejemplo/Recreación | Nota |
|---|---|---|---|---|---|---|---|---|---|
| rojo-a | ✔ | ✔ habla de "una torta", no de su bolsillo | ✔ | ✔ es una cuenta de ejemplo, no un "antes y después de la app" | ✔ | ✔ | ✔ no usa urgencia | ✔ | La UI de la calculadora dice "Estás cobrando…": se ve como captura del ejemplo con "EJEMPLO" en el mismo fotograma; el texto superpuesto va en tercera persona ("Esta torta…"). |
| rojo-b | ✔ "¿A cuánto vendes tu torta?" pregunta por un producto, no por un atributo | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | Hook alternativo 1: "la estás pagando tú" va en condicional ("si sale en rojo") y sobre la torta. |
| visto-a | ⚠ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ chat rotulado | Se quitó "Si te tiemblan las manos…" (03-angulos): implica un estado emocional de quien mira. Ahora es una escena ("ese minuto…"). |
| visto-b | ✔ | ✔ | ✔ | ✔ | ⚠ cita del mercado, no reseña | ✔ | ✔ | ✔ | Va con "lo escribió una repostera en un blog" y pie "no usó esta calculadora". **Verificar en la URL.** Habla de la ansiedad de una tercera persona, no afirma la de quien mira. |
| horas-a | ✔ | ✔ | ✔ | ✔ la comparación 4 h / 8 h es aritmética del mismo ejemplo | ✔ | ✔ | ✔ | ✔ | Se quitó "Ese pastel no te dejó ganancia: te costó tu sábado" (03-angulos): afirmaba el resultado de quien mira. |
| horas-b | ✔ | ✔ | ✔ | ✔ | ⚠ paráfrasis rotulada | ✔ | ✔ | ✔ | Paráfrasis sin comillas en el texto; en el video, la cita va con pie de origen. |
| x3-a | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | "Ninguna regla sabe cuántas horas le metiste" ataca la regla, no a la persona. |
| x3-b | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | Aritmética verificable (25.025 × 3 = 75.075). |
| caro-a | ✔ | ✔ "si no le alcanza" se refiere a la clienta del chat, no a quien mira | ✔ "no convence a todas" | ✔ | ✔ | ✔ | ⚠ "acceso inmediato" solo si es verdad (B2); sin USD 17 (B3) | ✔ | Garantía de 7 días real (Hotmart). Métodos de pago: confirmar. |
| caro-b | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ⚠ igual que caro-a | ⚠ las cifras de las dos tortas están pendientes de calcular | No grabar hasta tener los dos precios reales de la app. |

**Riesgo del destino (Meta revisa la landing):** ver B5. Mientras la landing diga "Vendes bien, pero al final del mes no ves la plata", el anuncio `caro` hereda ese riesgo.

### 10.2 Puntaje A-E (0-20 cada una) y correcciones del pase final

A = fuerza del hook · B = claridad del mecanismo · C = densidad de prueba · D = urgencia y calce del CTA · E = alineación visual-copy.

| Anuncio | A | B | C | D | E | Total | Lo más débil y qué se corrigió |
|---|---|---|---|---|---|---|---|
| rojo-a | 17 | 15 | 14 | 13 | 18 | **77** | D: el "Más información" no tenía razón → se agregó "gratis, 1 receta, sin registro, tus datos se quedan en tu celular" antes del CTA. |
| rojo-b | 15 | 15 | 13 | 13 | 16 | **72** | A: "¿Cuánto cobras por tu torta?" le servía a cualquier competidor → se cambió por "¿A cuánto vendes tu torta de chocolate? … verde, amarillo o rojo" (el semáforo es propio de esta calculadora). |
| visto-a | 16 | 13 | 13 | 13 | 15 | **70** | C estaba en 9 (solo emoción, sin prueba) → la toma 3 decía "Esta calculadora te dice tu precio"; se reemplazó por "En este ejemplo: mínimo $81.276, sugerido $116.109" (demostración antes del CTA). |
| visto-b | 16 | 13 | 14 | 13 | 14 | **70** | E: la cita sola no mostraba el producto → el cuerpo comparte la demo de visto-a desde el segundo 3. |
| horas-a | 18 | 17 | 14 | 13 | 18 | **80** | B: el mecanismo quedaba implícito → se agregó "La regla de 'ingredientes × 3' no sabe cuánto te demoraste. Esta calculadora sí". |
| horas-b | 15 | 17 | 14 | 13 | 15 | **74** | A: la cita literal con "8 oras" se leía como error → se pasó a paráfrasis rotulada. |
| x3-a | 15 | 18 | 15 | 13 | 16 | **77** | — (ninguna < 12) |
| x3-b | 16 | 18 | 16 | 13 | 17 | **80** | — |
| caro-a | 16 | 15 | 13 | 15 | 16 | **75** | D: se quitó "precio sube a USD 17" (sin fecha real, B3); la razón para actuar es la garantía de 7 días y la calculadora gratis. |
| caro-b | 15 | 15 | 12 | 15 | 14 | **71** | C/E: las cifras de las dos tortas no existen aún → `[PENDIENTE]`; no se graba hasta calcularlas en la app. |

C nunca pasa de 16: no hay testimonios ni casos reales todavía, y no se inventan. Sube en la ronda 2 si aparecen compradoras que acepten contar su experiencia real.

### 10.3 Las 5 compuertas (Stefan)

| Anuncio | 1. Especificidad | 2. Mecanismo cuantificado | 3. Viaje del lector (qué ya intentó) | 4. ≥ 2 tipos de prueba real | 5. ≥ 2 objeciones respondidas |
|---|---|---|---|---|---|
| rojo-a/b | $70.000 → $11.276 bajo el mínimo; 12 porciones | 4 partes + 5 % de merma + minutos de horno | "no sale del × 3 ni del precio de otra repostera" | demostración + reversión de riesgo (gratis, sin registro, datos en el celular) | "¿es estafa?" (gratis, sin registro) · "lo hago con × 3 / copio a otra" |
| visto-a/b | mínimo $81.276 / sugerido $116.109 | 4 partes + 5 % de merma | "si ya probaste el × 3 o copiar el precio de otra" | demostración + VoC 3.2 (b) / reversión de riesgo (a) | "¿es estafa?" · "lo hago con × 3" |
| horas-a/b | 4 h → $15.931/h; 8 h → $7.965/h; $56.276 bajo el mínimo | horas × tarifa, misma fórmula | "la regla de ingredientes × 3 no sabe cuánto te demoraste" | demostración + VoC 5.2 (b) / reversión de riesgo | "lo hago con × 3" · "¿es estafa?" |
| x3-a/b | $75.075 vs. $81.276; 6 h → $126.276 | 4 partes + 5 % de merma + horas | "×2, ×2,5, ×3" (VoC 7.4, 7.7, 7.15) | demostración + reversión de riesgo (+ VoC 7.4 en el hook alternativo) | "lo hago con × 3" · "¿esa regla me sirve a mí?" |
| caro-a/b | USD 12, 5 mensajes, 7 días | mínimo/sugerido + duplicar receta + aviso bajo el mínimo | "te quedas sin respuesta cuando te comparan" | demostración de la app + garantía de 7 días (+ calculadora gratis) | "mis clientas no lo van a pagar" (otra versión con su precio) · "¿y si no me sirve?" (garantía) · "no tengo tarjeta" (pagas en pesos, por confirmar) |

---

## 11. Adaptaciones del mejor ángulo (#4 El número en rojo)

**Nativo (Taboola/Outbrain: para más adelante, como laboratorio de ángulos)**
- Titular editorial: "La cuenta que muchas reposteras no hacen antes de ponerle precio a una torta" · alternativo: "Por qué una torta de $70.000 puede quedar por debajo de su costo (ejemplo)".
- Imagen: foto tipo nota de una mano con harina sosteniendo un celular con la pastilla roja (sello "Ejemplo"), sin logo.
- Destino: la calculadora (no hay advertorial). `[PENDIENTE: si se usa nativo, un advertorial corto de "las 4 cosas que casi todas olvidan" mejora el viaje]`.

**Google Búsqueda** (palabras clave: "cuánto cobrar por una torta", "cómo calcular el precio de una torta", "calculadora de costos repostería")

| Titulares (≤30) | Car. |
|---|---|
| Cuánto Cobrar por tu Torta | 26 |
| Calculadora Gratis 1 Receta | 27 |
| Tu Precio Mínimo y Sugerido | 27 |
| Suma Empaque, Gas y Tus Horas | 29 |

| Descripciones (≤90) | Car. |
|---|---|
| Pon tus ingredientes, empaque, gas y tus horas. Te decimos tu precio mínimo y el sugerido. | 89 |
| Gratis y sin registro. Mira si tu precio de hoy sale en verde, amarillo o rojo. | 79 |

**YouTube (pre-roll saltable)**
- Primeros 5 s (antes del "Saltar"): "Si vendes tortas por encargo, no te saltes esto: esta torta de setenta mil pesos quedó once mil por debajo de su mínimo. Ejemplo." Pantalla: la pastilla roja con "EJEMPLO".
- Resto: el guion de rojo-a (tomas 2-5), más CTA verbal "Calcula una receta gratis, el enlace está aquí abajo" y la superposición "Calcula 1 receta gratis".

---

## 12. Pendientes consolidados

1. `[PENDIENTE]` Instalar el píxel + puente (§8.2) y verificar el recorrido de eventos. **Sin esto no se lanza.**
2. `[PENDIENTE]` ¿Acceso inmediato o preventa al 30-nov-2026? Alinear landing y anuncio `caro` (B2).
3. `[PENDIENTE]` Fecha real de la subida a USD 17 (B3), o no usarla.
4. `[PENDIENTE]` Ejemplo del hero en COP o rotulado MXN; `?pais=CO` en la calculadora (B4).
5. `[PENDIENTE]` Cambiar en la landing "no ves la plata" y "subió la mantequilla" (B5).
6. `[PENDIENTE]` Abrir las URLs y confirmar los verbatims 3.2, 3.3, 5.2, 7.4 y 2.2 antes de ponerlos en pantalla.
7. `[NECESITA RESPALDO]` "2 minutos": cronometrar la carga de 1 receta antes de usar esa cifra (no aparece en ningún anuncio principal).
8. `[PENDIENTE]` Métodos de pago activos en Hotmart para CO (PSE, Nequi, Efecty) y MX (OXXO, SPEI); `Purchase` del píxel en Hotmart; neto por venta.
9. `[PENDIENTE]` Mínimo de presupuesto diario por conjunto en la moneda de la cuenta personal.
10. `[PENDIENTE]` Calcular en la app las dos versiones de torta de caro-b antes de grabar.
11. `[PENDIENTE, ronda 2]` Evento `calc_semaforo` y las 2 preguntas opcionales de la calculadora (pedidos/mes y país) que recomienda `01-avatar` §7.4 (hoy solo existe el selector de país).
