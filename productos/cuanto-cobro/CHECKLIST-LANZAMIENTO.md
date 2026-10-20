# ✈️ Checklist de lanzamiento — ¿Cuánto Cobro? · Campaña 1 (Colombia)

Regla: **no se enciende la pauta hasta que todo el bloque A–F esté en ✅.** Cada ítem dice quién lo hace y cómo se verifica.
Estado al 2026-10-20. Leyenda: ✅ listo y verificado · 🟡 en curso · ⬜ pendiente · 🔴 bloquea.

## A · Producto y entrega
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| A1 | App paga en `/app/` (ingredientes, recetas, recálculo, cotización WhatsApp, respaldo, gas por minutos) | Claude | ✅ | Probada a ancho de celular |
| A2 | "Importar recetas" fusiona el pack sin borrar datos | Claude | 🟡 | Importar `packs/30-recetas-base.json` sobre una app con datos y ver que no se pierde nada |
| A3 | PDF de entrega (acceso + guía + mensajes) con URL `cuantocobro.vendedecasa.com/app/` | Claude | ✅ | Subido en Hotmart (484 KB) |
| A4 | PDF del bump "30 recetas" con link de descarga del pack y autoría | Claude | ✅ | `entrega/30-recetas-base-costeables.pdf` |
| A5 | Acceso a `/app/` sin contraseña (riesgo de que se comparta) | Alejo decide | ⬜ | Aceptado para la prueba; revisar en ronda 2 (webhook + clave) |

## B · Landing y calculadora (Colombia)
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| B1 | Copy nuevo con los 8 cambios obligatorios de `guardian-etico` | Claude | 🟡 | Comparar texto final con el dictamen de `copy/04-landing-copy.md` |
| B2 | Sin "preventa / 30 de noviembre / USD 17 / de por vida" | Claude | 🟡 | `grep` en `public/` = 0 resultados |
| B3 | Ejemplos en COP rotulados "datos de ejemplo" y calculadora arranca en Colombia | Claude | 🟡 | Abrir landing y calculadora en el celular |
| B4 | Botón de compra → `pay.hotmart.com/D108114823S` | Claude | ✅ | Clic real |
| B5 | Página de **política de privacidad** y contacto enlazada en el pie (Meta la exige con píxel) | Claude | ⬜🔴 | Enlace en el pie de landing y calculadora |
| B6 | Desplegado por `scripts/deploy.sh` y smoke 200 en `/`, `/app/`, `/calculadora/` | Claude | ⬜ | `DEPLOYS.md` |

## C · Hotmart
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| C1 | Producto principal 8770692 aprobado ("Ventas activas") | Hotmart | ✅ | Panel del producto |
| C2 | Precio USD 12 pago único, garantía 7 días, conversión de moneda activa | Claude | ✅ | Fijación de precios |
| C3 | Bump 8773273 "30 recetas" (USD 5) aprobado | Hotmart | 🟡 | En análisis (≤ 1 día) |
| C4 | **Order bump configurado** en el checkout del 8770692 con el 8773273 | Claude | ⬜ | Abrir el checkout y ver la casilla del bump |
| C5 | Página de venta externa = landing | Claude | ✅ | Hotmart → Página de producto |
| C6 | Afiliados desactivados | Claude | ✅ | Programa de afiliados sin configurar |
| C7 | Email de soporte visible para compradoras | Alejo | ⬜ | Hotmart → Información básica / perfil |
| C8 | Datos bancarios para recibir pagos | Alejo | ⬜🔴 | Hotmart → Mi cuenta → Datos bancarios |
| C9 | **Compra real de prueba** (1 persona, luego reembolso): llega email, PDF y bump | Alejo | ⬜🔴 | Recibir el email de Hotmart y abrir `/app/` |

## D · Medición (píxel 520582086176158, BM Alejo Traffiker Respaldo)
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| D1 | Píxel en landing y calculadora (`public/pixel.js`) | Claude | 🟡 | Meta Pixel Helper o Events Manager → Probar eventos |
| D2 | PageView · Lead (`calc_primer_resultado`, 1 vez por navegador) · `ClicComprar` personalizado | Claude | 🟡 | Probar eventos en vivo |
| D3 | Hotmart envía InitiateCheckout y Purchase al mismo píxel (web) | Claude | ✅ | Configurado; ver eventos tras la compra de prueba |
| D4 | API de Conversiones en Hotmart (token de Meta) | Alejo | ⬜ | Generar el token en Events Manager y pegarlo en Hotmart → Píxel → API |
| D5 | Dominio `vendedecasa.com` **verificado** en el BM (registro TXT en Cloudflare) | Alejo | ⬜🔴 | BM → Seguridad de la marca → Dominios |
| D6 | Eventos priorizados en Events Manager (Purchase, Lead) | Alejo/Claude | ⬜ | Tras verificar dominio |

## E · Meta Ads (cuenta)
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| E1 | Cuenta publicitaria del BM Respaldo activa, en USD o COP, zona horaria Bogotá | Alejo | ⬜ | Configuración de la cuenta |
| E2 | Método de pago cargado | Alejo | ⬜🔴 | Facturación |
| E3 | Página de Facebook Receta Rentable + IG @recetarentable conectados a la cuenta | Alejo | ⬜ | Identidad del anuncio |
| E4 | Sin restricciones/políticas pendientes en la cuenta | Alejo | ⬜ | Calidad de la cuenta |

## F · Creativos y campaña
| # | Ítem | Quién | Estado | Cómo se verifica |
|---|---|---|---|---|
| F1 | 10 anuncios (5 ángulos × 2) con copy auditado | Claude | ✅ | `copy/05-anuncios-campana-1.md` |
| F2 | Imágenes estáticas 4:5 y 9:16 | Claude | 🟡 | `creativos/imagenes/` |
| F3 | Videos 9:16 (b-roll Higgsfield + pantallas reales + texto) | Claude | 🟡 | `creativos/videos/` |
| F4 | Chats/escenas actuadas rotulados "recreación"; verbatims confirmados en su fuente | Claude | ⬜ | Revisión final |
| F5 | UTMs en cada URL (`utm_campaign=cc-prueba1`) | Claude | ✅ | En el archivo de anuncios |
| F6 | Campaña: Clientes potenciales · optimiza Lead · ABO 5 × USD 2/día · Colombia · 23+ · Advantage+ audiencia · sin Audience Network · excluir compradoras | Alejo (o Claude con acceso) | ⬜ | Revisión antes de publicar |
| F7 | Reglas de lectura escritas (matar CTR < 0,8 % o costo/Lead > USD 1; escalar < USD 0,50 y CPA ≤ USD 10) | Claude | ✅ | `copy/05-anuncios-campana-1.md` |

## G · Después de encender (día 1-7)
- Día 1: revisar que lleguen Lead y Purchase en Events Manager; nada de tocar presupuestos.
- Día 3: primera lectura de CTR y costo por Lead; solo apagar lo que rompa las reglas de F7.
- Día 7: decisión matar/escalar, registrar en `activos/angulos-ganadores.md` (registrador-ganadores).
- Responder comentarios y DMs (palabra clave COSTOS) a diario.
