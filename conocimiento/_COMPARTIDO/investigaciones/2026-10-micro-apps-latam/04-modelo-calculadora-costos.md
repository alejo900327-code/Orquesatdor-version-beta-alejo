# 04 · Modelo de negocio — Calculadora de costos y precios para emprendedoras

> Nicho #1 del ranking (`00-sintesis.md`, 23/25). Fecha: 19-oct-2026.
> Todo número de ventas o conversión es **supuesto** hasta que la validación (§7) lo reemplace con datos propios.
> Nombre de trabajo: **"¿Cuánto Cobro?"** (alternativas en §3.1).

---

## 0 · El modelo en una página

| | |
|---|---|
| **Quién compra** | Emprendedora que vende repostería/comida/artesanía desde casa por WhatsApp e Instagram (MX, CO, PE, CL, AR, EE. UU. hispano). |
| **Dolor** | Pone precios "a ojo" o copiando a la competencia, no sabe si gana, y cada vez que sube la mantequilla pierde plata sin darse cuenta. |
| **Producto** | App web en el celular (PWA, sin tienda): carga ingredientes una vez, arma recetas, y te da **costo real, precio mínimo y precio sugerido** en 2 minutos. Si sube un ingrediente, recalcula todo. |
| **Por qué ahora** | Hoy el mercado le vende **plantillas de Excel** (≥ 8 en Hotmart) que en el celular son un dolor. La micro app es la plantilla que evolucionó. |
| **Precio** | USD 17 pago único, acceso de por vida (preventa USD 12). Bump USD 7 · Upsell "Pro 12 meses" USD 29. |
| **Canal** | Cuenta propia de la app en TikTok/IG con demos + "comenta COSTOS" → calculadora gratis de 1 receta → oferta. Anuncios Meta de bajo presupuesto. Afiliadas reposteras. |
| **Cobro** | Hotmart (todas las monedas, cuotas, afiliados, garantía gestionada). |
| **Ingreso neto por compradora (supuesto)** | ≈ USD 18,3 → CAC de equilibrio USD 18; **objetivo CAC ≤ USD 9**. |
| **Validación** | 3 semanas, 3 compuertas (demanda → preventa → uso). Gasto máximo en anuncios para validar: **~USD 100**. |

---

## 1 · Cliente y dolor

**Avatar principal — "la repostera de casa que ya vende"**
- Mujer 25-45, vende tortas, postres, galletas o mesas dulces por encargo. 5-40 pedidos al mes. Cobra por WhatsApp.
- No es contadora ni usa Excel en el computador: **todo lo hace desde el celular**.
- Señales de dolor en la investigación (`02-tiktok.md`, nicho 2):
  - Videos de costeo con **500+ comentarios en 18-37 K vistas** (@casitrozos, @delicias.isa): una tasa de comentarios altísima — la gente pregunta, pide la plantilla, cuenta su caso.
  - Plantillas de Excel vendidas en Hotmart para exactamente esto; cursos y ebooks tipo "¿Y cuánto cobro?".
  - La frase-dolor que se repite: *"regalo mi trabajo"* / *"no sé a cuánto vender"*.

**Lo que realmente compra (no es "una app"):**
1. **Tranquilidad:** dejar de adivinar.
2. **Permiso para cobrar:** un número "objetivo" que la respalda cuando el cliente dice "está caro".
3. **Tiempo:** cotizar un pedido en 2 minutos y no en 30.

**Avatares secundarios** (mismo producto, otra landing): velas y jabones artesanales, comida casera/viandas, bisutería, panadería pequeña. Validar uno a la vez.

---

## 2 · Competencia y hueco

| Alternativa | Precio | Lo bueno | Lo flojo (nuestra entrada) |
|---|---|---|---|
| Plantillas Excel/Sheets en Hotmart ([costeo repostería](https://hotmart.com/es/marketplace/productos/hagsxd-plantilla-costeo-de-recetas-en-excel-reposteria-w9i4p/M95624414H), [Cobra lo que vale tu trabajo](https://hotmart.com/es/marketplace/productos/cobra-lo-que-vale-tu-trabajo-planilla-de-precios-para-reposteria/V105688000L), [30 plantillas Pro](https://hotmart.com/es/marketplace/productos/30-plantillas-pro-para-reposteria-rentable-automatiza-costos-cotiza-sin-perder-dinero-y-vende-el-doble-sin-miedo/O102554657J)) | No visible en página; Gumroad desde USD 3 | Ya educaron al mercado: la gente **ya paga** por resolver esto | Requieren Excel o pelear con Sheets en el celular; no recalculan fácil; se ven "de oficina" |
| Ebooks/cursos de costeo ([Costo, precio y ganancia](https://hotmart.com/es/marketplace/productos/costo-precio-y-ganancia-en-la-reposteria/N99499876J), [¿Y cuánto cobro?](https://hotmart.com/es/marketplace/productos/y-cuanto-cobro-guia-practica-para-ponerle-precio-a-lo-que-haces-sin-miedo-ni-culpa/X102772313B)) | — | Enseñan la fórmula | Te enseñan a calcular, pero **el cálculo lo sigues haciendo tú** |
| Apps de costeo (BakeCostDee —tailandesa—, Easy-Recette —francesa, pro—) | Varía | Funcionan en el celular | No están en español local ni piensan en la emprendedora LATAM (moneda, WhatsApp, inflación) |
| ChatGPT | Gratis | Calcula si sabes pedirlo | No recuerda tus ingredientes, no recalcula, no te da un sistema |
| La micro app que enseña @soymaximoramos | USD 19 (lista) | Mismo nicho | Es un ejemplo de curso, no una marca con contenido propio; confirma el precio |

**Posicionamiento:** *"La plantilla de costos que vive en tu celular y se actualiza sola cuando suben los precios."*
Ventajas a defender: **en el celular**, **español local + moneda local**, **recalcula todo con un toque**, **sale el mensaje de cotización para WhatsApp**.

---

## 3 · Producto

### 3.1 Nombre (a validar en los videos de demanda)
"¿Cuánto Cobro?" · "Cobra Bien" · "Precio Justo" · "Mi Costo Real". Criterio: que sea la frase que ella ya dice.

### 3.2 MVP (lo que se construye solo si pasa la compuerta 2)
1. **Ingredientes**: nombre, cuánto compras y cuánto pagas (ej. 1 kg de harina a $28) → costo por gramo automático. 20 ingredientes precargados por país.
2. **Recetas**: ingredientes + cantidades (g, kg, ml, tazas, unidades) → costo de la receta y por porción.
3. **Lo que casi todas olvidan**: empaque, gas/luz (fijo o %), **su mano de obra** (horas × tarifa), desperdicio %.
4. **Resultado con semáforo**: precio **mínimo** (debajo pierdes), **sugerido** (con tu margen) y lo que **ganas por pedido**.
5. **"Subió la mantequilla"**: cambias un precio y se recalculan todas las recetas, con aviso de cuáles quedaron en rojo.
6. **Cotizar pedido**: varias recetas + cantidades → total + **mensaje listo para WhatsApp** (copiar/compartir).
7. Moneda local, funciona sin conexión, copia de seguridad (exportar/importar).

**Fuera del MVP:** inventario, agenda de pedidos, varias usuarias, sincronización en la nube, IA.

### 3.3 Decisiones técnicas (para el carril de Alejo Cloud)
- `bash scripts/nuevo-producto.sh cuanto-cobro` → PWA estática en Cloudflare (cuenta personal `ff989b53…`), deploy por `scripts/deploy.sh`.
- **Datos en el dispositivo** (IndexedDB): costo de servidor ≈ 0, sin datos personales de clientas en nuestra base, funciona offline.
- **Acceso**: webhook de Hotmart → Worker → D1 guarda solo email + estado de licencia → enlace mágico por email. (En preventa no hace falta: entrega manual.)
- Sin IA en v1 → costo marginal por usuaria ≈ USD 0 (clave para el pago único).

---

## 4 · Oferta y precio

### 4.1 La oferta principal
**Promesa (honesta, sin claims de ingresos):** *"Sabe en 2 minutos cuánto te cuesta de verdad cada torta y cuánto deberías cobrar — desde tu celular, sin Excel."*

**Qué recibe (stack):**
| Componente | Rol |
|---|---|
| App ¿Cuánto Cobro? — acceso de por vida, actualizaciones incluidas | El núcleo |
| 20 ingredientes precargados con precios de referencia de su país | Quita la fricción del primer uso |
| Guía de 10 min: "Las 4 cosas que olvidas al poner precio" (video corto dentro de la app) | Educa el método sin convertirlo en curso |
| Plantillas de mensajes: "cómo responder cuando te dicen que está caro" | Lo que más ansiedad le da |
| **Garantía 7 días**: si no logras costear tu primera receta, te devolvemos el dinero | Reduce riesgo (Hotmart la gestiona) |

### 4.2 Precio
| Momento | Precio | Por qué |
|---|---|---|
| Preventa (validación) | **USD 12** | Premia a las primeras; mide disposición a pagar real |
| Lanzamiento | **USD 17** | Punto dulce observado (USD 16-19) para micro apps de este tipo |
| Tras 50+ testimonios | USD 19-24 | Subir con prueba, no antes |

Precio local en Hotmart (redondeado a números "de vitrina"): MX ≈ $299 MXN · CO ≈ $69.900 COP · PE ≈ S/ 59 · CL ≈ $15.900 CLP. *Confirmar conversión y cuotas al configurar.*

**No suscripción en el núcleo.** El comprador hispano de este nicho ancla en "pago único / sin mensualidad" (patrón dominante en Meta Ads, `03` §3) y la tarjeta es el cuello de botella de la recurrencia en MX/CO.

### 4.3 Escalera (sube el ingreso por compradora sin empujar)
| Peldaño | Precio | Toma supuesta | Qué es |
|---|---|---|---|
| Imán gratis | 0 | — | **Calculadora rápida de 1 receta** en la web: "¿Cuánto deberías cobrar por esta torta?" → captura email/WhatsApp |
| Núcleo | USD 17 | — | La app |
| Order bump | USD 7 | 30 % | **"50 recetas base ya costeadas"** (bizcochos, rellenos, coberturas) — importables a la app |
| Upsell 1-clic | USD 29 | 10 % | **Pro 12 meses**: cotizador con catálogo (foto + precio) para mandar por WhatsApp, recordatorio mensual "revisa tus precios", plantillas de temporada. Prepago, sin renovación automática |
| B2B (fase 2) | USD 9-19/mes o licencia | — | Para **profesoras de repostería** que venden cursos: la app con su marca para sus alumnas |

---

## 5 · Embudo

```
TikTok / Reels (cuenta de la app)          Anuncios Meta (USD 5-10/día)          Afiliadas reposteras (Hotmart)
  demo en pantalla · caso real · "comenta COSTOS"        ↓                                      ↓
            ↓ DM automático con el enlace                 ↓                                      ↓
     Calculadora gratis de 1 receta  ←───────────────────┘                                      ↓
     resultado: "estás cobrando $X menos de tu precio mínimo"                                     ↓
            ↓                                                                                    ↓
     Página de venta corta (demo de 30 s + stack + garantía) ←───────────────────────────────────┘
            ↓ Hotmart: núcleo USD 17 + bump USD 7
     Upsell Pro USD 29  →  bienvenida: "costea tu primera receta hoy" (email/WhatsApp, días 0-1-3-7)
```

**Pieza clave: la calculadora gratis.** Hace que ella misma descubra que cobra de menos — es el momento "ajá" que vende la app completa. Es también el formato *Landing App* que Hotmart está promoviendo.

### 5.1 Contenido (cuenta propia de la app)
Formatos que la investigación mostró que venden apps (`02` §2): demo en pantalla, recomendación estilo UGC, problema → app, "comenta X".

**10 ganchos para empezar** (a pasar por `generador-hooks` y `guardian-etico`):
1. "Esta torta la vendías a $350… te costó $310. Mira."
2. "Si subió la mantequilla y no subiste tus precios, este video es para ti."
3. "Las 4 cosas que nunca sumas cuando pones precio (la 3 es tu tiempo)."
4. "Le pregunté a 3 reposteras cuánto cobran por un pastel de 20 porciones…"
5. "Cuánto cobrar por una mesa de postres para 50 personas, paso a paso."
6. "¿Te dijeron 'está caro'? Responde con esto."
7. "Dejé el Excel. Así costeo desde el celular en 2 minutos."
8. "Tu precio mínimo NO es el de tu competencia."
9. "Costeando en vivo la receta que me mandaron en comentarios." (serie: alimenta "comenta COSTOS")
10. "Pedido de 100 galletas decoradas: ¿cuánto cobrarías tú?" (pregunta → comentarios → demanda)

Ritmo: 1 video diario en TikTok + mismo video en Reels. Serie fija "costeamos tu receta" usando recetas que la gente manda (con su permiso).

### 5.2 Afiliadas
Reposteras con audiencia que venden cursos: comisión 40-50 % en Hotmart. Para ellas es un producto complementario fácil de recomendar ("después de aprender la receta, cóbrala bien"). Empezar con 5-10 contactadas a mano **después** de tener testimonios.

---

## 6 · Números

### 6.1 Ingreso neto por compradora (supuestos marcados)
| Concepto | Cálculo | USD |
|---|---|---|
| Núcleo | 17 − tarifa Hotmart (9,9 % + 0,50) | 14,82 |
| − reembolsos | 5 % *(supuesto; mediana de apps 4,2 %)* | 14,08 |
| + Bump | 7 neto (6,21) × 30 % toma *(supuesto)* × 0,95 | 1,77 |
| + Upsell Pro | 29 neto (25,63) × 10 % toma *(supuesto)* × 0,95 | 2,44 |
| **Total neto por compradora** | | **≈ 18,3** |

- **CAC de equilibrio:** USD 18. **Objetivo:** CAC ≤ USD 9 (ROAS ≈ 2).
- Costos fijos: Cloudflare ≈ USD 0-5/mes, dominio ≈ USD 1/mes, email transaccional ≈ USD 0-15/mes, automatización de DM ≈ USD 15/mes → **≈ USD 20-35/mes**.
- Costo marginal por usuaria ≈ 0 (sin IA, datos en el dispositivo).

### 6.2 Escenarios mensuales (después de validar)
| | Conservador | Base | Optimista |
|---|---|---|---|
| Gasto en anuncios | 300 | 600 | 1.500 |
| CAC pagado | 15 | 10 | 8 |
| Ventas por anuncios | 20 | 60 | 187 |
| Ventas orgánicas (TikTok/IG) | 10 | 40 | 100 |
| Ventas por afiliadas (neto a Alejo ≈ USD 11 c/u) | 0 | 0 | 80 |
| **Ingreso neto** | 549 | 1.830 | 6.132 |
| − anuncios − fijos (30) | −330 | −630 | −1.530 |
| **Utilidad mensual** | **≈ 219** | **≈ 1.200** | **≈ 4.600** |

**Lectura honesta:** una sola micro app de USD 17 es un **negocio de USD 200-1.500/mes** en escenarios normales. El techo sube por tres vías, no por más anuncios: (1) **orgánico** (la cuenta propia baja el CAC promedio), (2) **afiliadas**, (3) **portafolio** — la misma máquina aplicada a velas, comida casera y cotizador de oficios (modelo D de `00-sintesis.md`), y luego B2B para profesoras.

### 6.3 Qué mata el modelo
- CAC pagado > USD 18 sostenido y orgánico < 20 ventas/mes → no escala con anuncios.
- Reembolsos > 15 % → el producto no cumple o la promesa está inflada.
- Activación < 40 % (no costean ni una receta en 48 h) → problema de onboarding, no de marketing.

---

## 7 · Plan de validación (3 semanas, ~USD 100 en anuncios)

### Semana 0 — Preparación (2-3 días)
- Abrir cuenta nueva TikTok + IG de la marca (personal de Alejo, no de la empresa).
- Construir **solo la calculadora gratis de 1 receta** (1 día con el carril) + landing de preventa en Hotmart a USD 12 con entrega "en 7 días".
- Automatización "comenta COSTOS" → DM con el enlace (skill `flujo-comentario-dm`).

### Semana 1 — Compuerta 1: ¿hay demanda?
- 10 videos (ganchos §5.1), 1 por día + 3 extra.
- **Pasa si:** ≥ 3 videos con **≥ 10 comentarios por 1.000 vistas**, **o** 1 video > 50 K vistas, **y** ≥ 100 usos de la calculadora gratis.
- Si falla: cambiar a subnicho (velas/jabones o comida casera) y repetir 1 semana. Si falla dos veces → pasar al nicho #3 (cotizador de oficios).

### Semana 2 — Compuerta 2: ¿pagan?
- Anuncios Meta USD 10/día × 5-7 días hacia la calculadora gratis → preventa.
- **Pasa si:** ≥ 15 preventas totales (orgánico + anuncios) **y** costo por preventa con anuncios ≤ USD 12.
- Mientras tanto: 5 conversaciones con compradoras (¿qué usan hoy?, ¿qué casi las hizo no comprar?).

### Semana 3 — Compuerta 3: ¿la usan?
- Construir el MVP (§3.2) y entregarlo a las preventas.
- **Pasa si:** ≥ 60 % costea una receta en 48 h · reembolsos ≤ 10 % · ≥ 5 testimonios con permiso escrito.
- Si pasa: precio a USD 17, activar bump + upsell, subir anuncios en escalones de 20 % y empezar afiliadas.

### Tablero (lo que se mide desde el día 1)
Vistas y comentarios/1.000 por video · usos de la calculadora gratis · conversión calculadora → venta · CAC por fuente · toma de bump y upsell · activación 48 h · reembolsos.

---

## 8 · Riesgos y cómo se manejan
| Riesgo | Manejo |
|---|---|
| "Esto lo hago gratis en ChatGPT/Excel" | Vender el **sistema** (recuerda tus ingredientes, recalcula, cotiza por WhatsApp), no el cálculo. La calculadora gratis lo demuestra. |
| Copias rápidas (el método se está enseñando ahora mismo) | Velocidad + marca + contenido propio + comunidad de testimonios. La app se copia; la cuenta con audiencia no. |
| Claims ("gana el doble") | Prohibidos. Promesa = claridad y tiempo. Todo copy pasa por `guardian-etico`. |
| Cobro en el país de Alejo | Hotmart evita depender de Stripe (no opera en CO/AR). Confirmar facturación e impuestos (pendiente en `00` §5). |
| Soporte | FAQ dentro de la app + videos de 30 s. WhatsApp de soporte solo en preventa. |

---

## 9 · Decisiones que necesita tomar Alejo
1. **Nombre** de la app (o probar 2 en los videos).
2. **País/moneda principal** de arranque (sugerido: MX + CO; afecta ingredientes precargados y precios).
3. **Presupuesto de validación**: ~USD 100 en anuncios + USD 20-35/mes de herramientas.
4. **Cara del contenido**: Alejo, una creadora UGC pagada, o solo pantalla + voz.
5. **Cobro**: Hotmart (recomendado) vs. Mercado Pago.
