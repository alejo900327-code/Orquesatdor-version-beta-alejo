# Spec de Página — plantilla de input para el constructor

> Rellena una por página (o por variante de ángulo) y pásala a `constructor-pagina`. Es el contrato entre la estrategia y el maquetado. Deriva del Sistema Maestro (Parte 5.2).

```
## SPEC DE PÁGINA — [nombre]
Tipo:            [opt-in | VSL | quiz | sales-page | launch | evento | high-ticket]
Tema visual:     [calido | escenario | growth | money | relationships | premium | dark | light]  → data-theme
Objetivo (1):    [una sola acción: opt-in / checkout / agendar / escribir-WhatsApp / ver VSL]
Destino del CTA: [form | checkout | calendario | WhatsApp | revelado de VSL]
Oferta:          [qué se vende]
Precio/ticket:   [bajo | medio | alto]
Avatar:          [nivel de consciencia del problema]
Promesa (H1):    [titular-beneficio, hace match con el anuncio = conversion scent]
Mecanismo único: [el "cómo" diferencial]
Prueba social:   [testimonios video/texto · logos · casos antes/después · números reales]
Autoridad:       [bio/credenciales — sí/no, prominencia]
Urgencia real:   [ninguna | cierre de carrito | early-bird | plazas limitadas (fecha+aforo)]
Garantía:        [tipo de reversión de riesgo]
Bloques (orden): [lista de la librería 1.4 según el playbook del Tipo (Parte 2.2)]
CTA copy:        [primera persona, verbo de valor]
Tono visual:     [densidad: minimalista (opt-in) ↔ cargado (sales/VSL/evento)]
Móvil:           [consideraciones específicas]
Animación:       [Fase 0/1/2/3 — justificar si Fase 3]
Testear primero: [el elemento de mayor impacto para este Tipo]
```

## Ejemplo — Cumbre MC · Ecuador (motor de variantes)
```
Tipo:            evento
Tema visual:     escenario
Objetivo (1):    escribir-WhatsApp (closing conversacional) [secundario: checkout boleto]
Promesa (H1):    [variable por ángulo: zona-espera | contexto | momento]
Prueba social:   cifras reales 2025 (14.234/11 países, 9/11 aforo, Ecuador 164%) + video (pendiente)
Urgencia real:   plazas limitadas por aforo + fecha (Quito 25-26 jul 2026); precio por olas A/B
Bloques:         Hero(angulo) → prueba social → agenda 2 días → tickets → CTA WhatsApp repetido
CTA copy:        "Quiero info por WhatsApp" / "Escríbenos"
Testear primero: ángulo del hero (vía ?v=) y estructura de tickets
```
