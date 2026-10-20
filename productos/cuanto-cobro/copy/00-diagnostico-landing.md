# Diagnóstico del copy actual — landing ¿Cuánto Cobro? (2026-10-20)

Página auditada: `public/index.html` (en vivo en https://cuantocobro.vendedecasa.com).

## Veredicto
La página es **clara pero informativa, no persuasiva**. Explica bien *qué hace* la app y *cómo funciona*, pero casi no toca
*lo que ella siente* ni *en quién se convierte*. Le habla a la tarea ("calcular un precio"), no a la persona ("trabajo un
montón y no veo la plata, y me da miedo cobrar más"). Un tráfico frío de Meta entra, entiende y se va sin urgencia.

## Lo que funciona (conservar)
- El ejemplo numérico del hero ("La vendías a $380: estás $74 por debajo de tu mínimo"). Es el mejor momento de la página: prueba con números.
- "Vendes bien, pero al final del mes no ves la plata." — buen titular de dolor; está enterrado debajo del hero.
- La comparación con Excel y la calculadora gratis (el "ajá" se lo da ella misma).
- Pago único / sin mensualidad / garantía (bajan riesgo) y el descargo legal.

## Problemas, por orden de impacto
| # | Problema | Por qué cuesta ventas | Arreglo |
|---|---|---|---|
| 1 | **Dice "preventa… a más tardar el 30 de noviembre"** cuando la entrega ya es inmediata | Esperar 6 semanas mata la compra impulsiva de USD 12 y genera desconfianza | "Acceso inmediato: lo recibes en tu email apenas pagas" |
| 2 | **El dolor se enumera, no se siente** (3 viñetas racionales) | No hay escena, emoción ni costo: la culpa, el cansancio, la clienta que dice "está caro", el mes de 40 pedidos sin plata | Sección de dolor con escenas en sus palabras (VoC) y el costo acumulado |
| 3 | **No hay tope de montaña** | Nunca se pinta cómo se ve su vida resuelta: cobrar sin miedo, que la repostería sea un negocio, aportar en casa | Bloque "Imagina…" / antes-después |
| 4 | **No hay reencuadre de culpa** ("no es tu culpa: nadie te enseñó a costear") | Sin él, la lectora se defiende ("yo sé cobrar") en vez de identificarse | Puente de "no es tu culpa" + el enemigo (copiar precios ajenos) |
| 5 | **Titular funcional y genérico** ("Deja de adivinar…") | Compite con cualquier plantilla. No llama a la que ya tiene pedidos (el ICP) | Titular con el costo oculto + llamada al ICP |
| 6 | **El precio no se justifica** | USD 12 se siente como gasto, no como recuperación | Ancla: "Con una sola torta bien cobrada recuperas la app" (usando el ejemplo de $74) |
| 7 | **CTA débil** ("Reservar mi acceso", "Quiero la app") | Habla de la acción, no del resultado | "Quiero saber cuánto cobrar" / "Empezar a cobrar lo justo" |
| 8 | **Cero prueba social** | Es preventa y no hay testimonios (no inventar) | Prueba honesta: demo, números del ejemplo, la calculadora gratis, "sé de las primeras" + garantía fuerte |
| 9 | **No responde las objeciones emocionales** | Las FAQ son técnicas; faltan "¿y si subo y me dejan de comprar?", "soy nueva", "la competencia cobra menos" | FAQ con objeciones del avatar |

## Siguiente paso
Reescribir con el avatar profundo (`01-avatar-icp.md`) y el banco de frases (`02-voc.md`), pasar por `editor-voz-marca` y
`guardian-etico`, y recién ahí tocar el HTML.
