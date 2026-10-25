# ✈️ Checklist de lanzamiento — ¿Cuánto Cobro? · Campaña 1 (Colombia)

Regla: **no se enciende la pauta hasta que todo el bloque A–F esté en ✅.** Cada ítem dice quién lo hace y cómo se verifica.
Estado al 2026-10-20 (actualizado tras el deploy 5106f634). Leyenda: ✅ listo y verificado · 🟡 en curso · ⬜ pendiente · 🔴 bloquea.

## A · Producto y entrega
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| A1 | App paga en `/app/` (ingredientes, recetas, recálculo, cotización WhatsApp, respaldo, gas por minutos) | Claude | ✅ | Probada a ancho de celular |
| A2 | "Importar recetas" fusiona el pack sin borrar datos | Claude | ✅ | Importar `packs/30-recetas-base.json` sobre una app con datos y ver que no se pierde nada |
| A3 | PDF de entrega (acceso + guía + mensajes) con URL `cuantocobro.vendedecasa.com/app/` | Claude | ✅ | Subido en Hotmart (484 KB) |
| A4 | PDF del bump "30 recetas" con link de descarga del pack y autoría | Claude | ✅ | `entrega/30-recetas-base-costeables.pdf` |
| A5 | Acceso a `/app/` sin contraseña (riesgo de que se comparta) | Alejo decide | ⬜ | Aceptado para la prueba; revisar en ronda 2 (webhook + clave) |

## B · Landing y calculadora (Colombia)
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| B1 | Copy nuevo con los 8 cambios obligatorios de `guardian-etico` | Claude | ✅ | Comparar texto final con el dictamen de `copy/04-landing-copy.md` |
| B2 | Sin "preventa / 30 de noviembre / USD 17 / de por vida" | Claude | ✅ | `grep` en `public/` = 0 resultados |
| B3 | Ejemplos en COP rotulados "datos de ejemplo" y calculadora arranca en Colombia | Claude | ✅ | Abrir landing y calculadora en el celular |
| B4 | Botón de compra → `pay.hotmart.com/D108114823S` | Claude | ✅ | Clic real |
| B5 | Página de **política de privacidad** y contacto enlazada en el pie (Meta la exige con píxel) | Claude | ✅ | Enlace en el pie de landing y calculadora |
| B6 | Desplegado por `scripts/deploy.sh` y smoke 200 en `/`, `/app/`, `/calculadora/` | Claude | ✅ (v 5106f634) | `DEPLOYS.md` |

## C · Hotmart
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| C1 | Producto principal 8770692 aprobado ("Ventas activas") | Hotmart | ✅ | Panel del producto |
| C2 | Precio USD 12 pago único, garantía 7 días, conversión de moneda activa | Claude | ✅ | Fijación de precios |
| C3 | Bump 8773273 "30 recetas" (USD 5) aprobado | Hotmart | ✅ | Panel de ventas activo |
| C4 | **Order bump configurado** en el checkout del 8770692 con el 8773273 | Claude | ✅ publicado (página de pago estándar "En blanco" + bump USD 5, sin precio tachado); confirmar que se ve en `pay.hotmart.com/D108114823S` | Abrir el checkout y ver la casilla del bump |
| C5 | Página de venta externa = landing | Claude | ✅ | Hotmart → Página de producto |
| C6 | Afiliados desactivados | Claude | ✅ | Programa de afiliados sin configurar |
| C7 | Email de atención al cliente `soporte@vendedecasa.com` (Cloudflare Email Routing → gmail de Alejo) | Claude | ✅ | Hotmart → Página de pago; también en /privacidad/ y en el PDF |
| C8 | Datos bancarios para recibir pagos | Alejo | ✅ (confirmado por Alejo) | Hotmart → Mi cuenta → Datos bancarios |
| C9 | Compra real de prueba | Alejo | ⏭️ omitida por decisión de Alejo (21-oct) | Verificado sin compra: soporte@vendedecasa.com acepta correo (SMTP 250) y reenvía a gmail; PDF en Hotmart; /app/ y pack 200; checkout con bump, autor Receta Rentable y email de soporte; Hotmart inyecta el píxel 520582086176158 con Purchase activo. Queda sin probar: el email real de Hotmart a la compradora y el disparo del Purchase → revisar con la PRIMERA venta real |

## D · Medición (píxel 520582086176158, BM Alejo Traffiker Respaldo)
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| D1 | Píxel en landing y calculadora (`public/pixel.js`) | Claude | ✅ PageView y ViewContent verificados en vivo | Meta Pixel Helper o Events Manager → Probar eventos |
| D2 | PageView · Lead (`calc_primer_resultado`, 1 vez por navegador) · `ClicComprar` personalizado | Claude | ✅ código; Lead se verá con la primera calculadora real | Probar eventos en vivo |
| D3 | Hotmart envía InitiateCheckout ("Visitas en la Página de Pago", activado 21-oct) y Purchase ("Ventas realizadas") al mismo píxel (web) | Claude | ✅ | Hotmart → Píxel de seguimiento → Detalles de la configuración; ver eventos con las primeras visitas |
| D4 | API de Conversiones en Hotmart (token de Meta) | Alejo | ⬜ | Generar el token en Events Manager y pegarlo en Hotmart → Píxel → API |
| D5 | Dominio `vendedecasa.com` **verificado** en el BM (metaetiqueta en la portada vendedecasa.com) | Claude | ✅ | BM → Seguridad de la marca → Dominios |
| D6 | Eventos priorizados en Events Manager (Purchase, Lead) | Alejo/Claude | ⬜ | Tras verificar dominio |

## E · Meta Ads (cuenta)
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| E1 | Cuenta publicitaria del BM Respaldo activa, en USD o COP, zona horaria Bogotá | Alejo | ⬜ | Configuración de la cuenta |
| E2 | Método de pago cargado | Alejo | ✅ (confirmado por Alejo) | Facturación |
| E3 | Página de Facebook Receta Rentable + IG @recetarentable conectados a la cuenta | Alejo | ⬜ | Identidad del anuncio |
| E4 | Sin restricciones/políticas pendientes en la cuenta | Alejo | ⬜ | Calidad de la cuenta |

## F · Creativos y campaña
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| F1 | 10 anuncios (5 ángulos × 2) con copy auditado | Claude | ✅ | `copy/05-anuncios-campana-1.md` |
| F2 | Imágenes estáticas 4:5 y 9:16 | Claude | ✅ | `creativos/imagenes/` (20 PNG, revisados) |
| F3 | Videos 9:16 (b-roll Higgsfield + pantallas reales + texto) | Claude | ✅ 10 MP4 25-30 s, sin música ni voz | `creativos/videos/` |
| F4 | Chats/escenas actuadas rotulados "recreación"; verbatims confirmados en su fuente | Claude | ⬜ | Revisión final |
| F5 | UTMs en cada URL (`utm_campaign=cc-prueba1`) | Claude | ✅ | En el archivo de anuncios |
| F6 | Campaña **publicada 21-oct** `cc-prueba1 · CO · Ventas` (ID 120249380452430302) en la cuenta CP Fokuz 1 (381913140730176): objetivo Ventas · evento Compra · píxel 520582086176158 · CBO USD 10/día · 1 conjunto `CO 23+ amplio · 10 anuncios` (Colombia, 23+, Advantage+, ubicaciones automáticas) · 10 anuncios video 9:16 → landing con UTM por anuncio · identidad Receta Rentable / @recetarentable · mejoras con IA apagadas · sin catálogo · sin contenido relacionado | Claude | ✅ publicada (12 elementos: 1 campaña + 1 conjunto + 10 anuncios), en revisión de Meta | Ads Manager → Entrega pasa de "En revisión" a "Activo". Los 2 borradores ajenos de la cuenta NO se publicaron ni se tocan |
| F7 | Meta de CPA **USD 6** (50 % del ticket) como REGLA, sin tope de costo en Meta (decisión de Alejo 21-oct). Pausar un anuncio con gasto ≥ USD 12 y 0 compras · días 1-3 no tocar presupuesto · escalar +20 % el presupuesto si el CPA de la campaña ≤ USD 6 tres días seguidos · si a los 7 días CPA > USD 9, cambiar creativos/ángulos | Claude | ✅ reglas creadas 21-oct | Ads Manager → Más → Administrar reglas: **R1** `cc-prueba1 · Pausar anuncio con USD 12 gastados y 0 compras` (anuncios activos de la campaña · Gasto > USD 12 y Resultados < 1 · período máximo · continua · desactiva el anuncio + aviso). **R2** `cc-prueba1 · Escalar +20 % si CPA ≤ USD 6 (3 días)` (la campaña · Costo por resultado < USD 6,01 y Resultados > 2 · últimos 3 días sin hoy · por día · +20 % presupuesto diario, máx. 1 vez/día, tope USD 30/día + aviso). La revisión del día 7 (CPA > USD 9 → cambiar creativos) es manual |

## G · Después de encender (día 1-7)
- Seguimiento diario en el dashboard del embudo (`metricas/README.md`).
- Día 1: revisar que lleguen Lead y Purchase en Events Manager; nada de tocar presupuestos.
- Día 3: primera lectura de CTR y costo por Lead; solo apagar lo que rompa las reglas de F7.
- Día 7: decisión matar/escalar, registrar en `activos/angulos-ganadores.md` (registrador-ganadores).
- Responder comentarios y DMs (palabra clave COSTOS) a diario.

## H · Verificado en el checkout (Colombia)
- Precio mostrado: **$40.159 COP** (USD 12 convertido), cuotas hasta 12 con tarjeta.
- Medios activos para CO: tarjeta, **PSE, Nequi, Bancolombia, Efecty**.
- Autor en el checkout: **Receta Rentable** (perfil público y nombre social cambiados). OJO: el checkout personalizado (con bump y autor nuevo) es `?checkoutMode=10`; los botones de la landing ya apuntan ahí. El enlace sin parámetro muestra el checkout clásico sin bump.
- Pendientes de revisión de creativos: verificar la cita de visto-b en su URL; rojo-a 4:5 tiene la etiqueta "Vendida a" tapando un botón (retocar).

## I · Optimización de la compra (25-oct, tras USD 43,73 y 0 ventas: 17 llegaron al pago, nadie pagó)
- Landing: precio en pesos ($40.152 COP, "equivale a USD 12") en la caja de precio y botones "· $40 mil"; ancla "con 4 tortas bien cobradas la recuperas" (deploy 4dee07ad).
- Calculadora: barra fija "Todas tus recetas · $40 mil COP → Comprar la app" directo al checkout (deploy f2b4a126, 24-oct 19:49).
- Checkout Hotmart (página "En blanco", checkoutMode=10): banner de confianza `marca/checkout/banner-checkout.png` (acceso inmediato, pago único, garantía 7 días, funciona en el celular). Hotmart solo deja ponerlo debajo del botón de compra; se copió el diseño móvil a escritorio.
- Recuperación de carritos: PENDIENTE de Alejo. Hotmart → Herramientas → Automatizaciones pide aceptar los términos de la integración con WhatsApp Business y conectar un número.
- Corte: si al 27-oct en la noche (~USD 60) no hay venta aprobada, se apaga la campaña y se pasa al siguiente producto del ranking.

