# Sistema de Diseño · La Fábrica de Landings

> El `constructor-pagina` compone desde aquí. Objetivo: páginas **hermosas, animadas, mobile-first y DISTINTAS entre sí**, producidas rápido y consistentes con la marca — listas para **Cloudflare Pages**. Belleza al servicio de la conversión, no decoración.
>
> ⭐ **Fundación canónica:** `SISTEMA-MAESTRO-IMPLEMENTACION.md` (filosofía + playbooks por tipo + evidencia + guardrails + QA) y `tokens.css` (tokens en 3 capas; el theming es por `data-theme`). Este archivo (moods/arquetipos) es la guía rápida; el maestro manda. Los "moods" de abajo equivalen a temas: **cálido**→`data-theme="calido"`, **escenario**→`data-theme="escenario"`, etc. `kit.css` queda como capa de componentes legacy; las páginas nuevas usan `tokens.css` + la librería de bloques del maestro.

## Principio rector
Para testeo masivo, la variación visual debe ser **rápida y sistemática**, no artesanal. Cada landing varía dentro de un sistema coherente: cambia el *mood*, el *layout del hero*, la *animación de entrada* y el *componente de prueba* — manteniendo legibilidad, velocidad y marca. El lever de conversión sigue siendo el ángulo + el copy; el diseño sube la percepción de autoridad y el tiempo en página.

## Moods (paletas + personalidad por tipo de proyecto)
Cada proyecto elige un mood base; las variantes de un mismo lanzamiento pueden rotar acento/fondo para diferenciarse.

| Mood | Uso | Fondo | Tinta | Acento | Tipografía |
|---|---|---|---|---|---|
| **Cálido-cercano** | Crianza, familia, salud emocional | crema #FBF6EF | #2A2320 | terracota #C06B4C / salvia #7E9078 | Fraunces + Nunito Sans |
| **Escenario (Cumbre MC)** | Eventos en vivo, alta energía, "amor y poder" | negro #0A0A0A | blanco #F4F2F0 | naranja marca #F08000 | **Bebas Neue** (títulos) + **Roboto** (texto) |
| **Elevado-aspiracional** | Alto ticket / lujo sobrio | obsidiana #0E1116 / marfil #F6F1E7 | según fondo | oro #C9A24B / verde profundo | Fraunces/Cormorant + Inter |
| **Claro-confiable** | Desarrollo personal, hábitos, productividad | blanco roto #FAFAF8 | #1A1A1A | índigo #4F46E5 / verde #10B981 | Sora/Plus Jakarta + Inter |
| **Místico-sereno** | Espiritualidad, meditación, sanación | noche #14121C | marfil | malva #9B8CCB / dorado suave | Fraunces + Inter |

> **Cumbre MC** usa el mood `escenario` (brandbook: negro + naranja #F08000, Bebas Neue + Roboto, texturas de partículas/energía de evento en vivo). El logo es el monograma "M" geométrico. Páginas con sensación de tarima: fondos oscuros de alto contraste, glow ámbar, fotos de ponentes con público.

> Tokens completos (espaciado, radios, sombras, tipo-escala) viven en `kit.css`. Las animaciones en `animaciones.js`.

## Arquetipos de plantilla (estructura del hero/página)
El constructor elige uno por variante para que no todas se vean igual:
1. **Editorial-largo** — hero de titular dominante (como la #1 de crianza). Mejor para ángulos de absolución/historia.
2. **Split / imagen-derecha** — hero a dos columnas con visual + promesa. Mejor para producto tangible/oferta clara.
3. **VSL-céntrico** — video/placeholder central + CTA debajo. Mejor para alto ticket/Cumbre.
4. **Quiz/Lead-first** — gancho + micro-quiz o captura arriba. Mejor para fricción mínima / lead magnet.

## Presets de animación (de `animaciones.js`)
Sutil y con propósito; respeta `prefers-reduced-motion` SIEMPRE.
- `reveal` — fade+rise al entrar en viewport (IntersectionObserver, vanilla).
- `stagger` — revela hijos en cascada (bullets, tarjetas).
- `countup` — números que cuentan (cifras de prueba reales).
- `tilt` / `float` — micro-movimiento en imágenes/tarjetas (hover/idle).
- `parallax-soft` — fondo lento en el hero.
- `lottie` — patrón para incrustar una animación Lottie ligera (icono/checkmark).
- Opcional `gsap` — para secuencias avanzadas en páginas GANADORAS (carga por CDN solo si se usa).

## Reglas no negociables
- **Mobile-first** (la mayoría del tráfico de paid social es móvil): diseñar a 375px y expandir.
- **Velocidad:** un solo archivo HTML autocontenido; CSS inline; sin frameworks pesados; imágenes optimizadas; animación con CSS/IntersectionObserver (GSAP solo si aporta).
- **Accesibilidad:** contraste AA, `:focus-visible`, `alt`, `prefers-reduced-motion`, `lang`.
- **Marca:** usa el mood del proyecto; nunca rompas la voz visual por "verse moderno".
- **Prueba honesta:** placeholders limpios donde irá prueba real; nunca stock disfrazado de testimonio ni antes/después.

## Publicación · Cloudflare Pages
La salida es un `.html` autocontenido → ideal para Cloudflare Pages (estático, global, CDN, costo casi nulo).
- Cada variante = su propia ruta/proyecto Pages para medir por separado.
- Pixel de Meta + UTM ya van comentados y listos en el `<head>` (el script de UTM propaga parámetros a los CTA `data-checkout`).
- El checkout vive donde corresponda (enlace en los CTA); la página solo captura y redirige.
- **Automatización futura:** con el MCP de Cloudflare conectado se puede desplegar a Pages desde el pipeline.
