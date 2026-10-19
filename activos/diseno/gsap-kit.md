# Kit GSAP · Capa premium para páginas GANADORAS

> Hallazgo de investigación (2026): **GSAP es 100% gratis desde abril 2025** (todos los plugins: ScrollTrigger, SplitText, MorphSVG, ScrollSmoother). Es JS puro → vive dentro del HTML autocontenido, **funciona idéntico en Cloudflare Pages, cero dependencia de hosting, cero lock-in.** Es el mayor salto de "calidad percibida" por el menor costo.

## Cuándo usarlo
- **Por defecto (los 15-20 tests):** `animaciones.js` vanilla — ligero, rápido, suficiente. No cargues GSAP en variantes desechables (peso extra sin necesidad).
- **Ganadoras / flagship:** activa GSAP para scroll-telling, reveal cinematográfico de headline y secuencias avanzadas. Ahí el costo de peso se justifica.

## Cómo activarlo (lo aplica `constructor-pagina` solo en ganadoras)
Añade en el `<head>` (vía CDN, jsDelivr):
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
```
Envuelve TODO en un guard de accesibilidad:
```js
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){ gsap.registerPlugin(ScrollTrigger, SplitText); /* …patrones… */ }
```

## Patrones reutilizables (la animación refuerza la persuasión, no decora)
1. **Hero reveal con SplitText** — el headline entra palabra por palabra:
```js
const split = new SplitText('h1.title',{type:'words'});
gsap.from(split.words,{yPercent:60,opacity:0,stagger:.06,duration:.8,ease:'power3.out'});
```
2. **Scroll-reveal de sección** (reemplaza al reveal vanilla con más control):
```js
gsap.utils.toArray('[data-gsap="reveal"]').forEach(el=>{
  gsap.from(el,{y:40,opacity:0,duration:.8,ease:'power2.out',
    scrollTrigger:{trigger:el,start:'top 82%'}});
});
```
3. **Stagger de bullets/tarjetas** al entrar:
```js
gsap.utils.toArray('[data-gsap="stagger"]').forEach(group=>{
  gsap.from(group.children,{y:24,opacity:0,stagger:.1,duration:.6,
    scrollTrigger:{trigger:group,start:'top 80%'}});
});
```
4. **Prueba social que cuenta** (cifras REALES) con ScrollTrigger + onUpdate.
5. **Sticky CTA / progress** — barra de avance del scroll o CTA que aparece tras el primer pliegue.
6. **Pin + scrub** (solo flagship): fijar el hero y revelar el mecanismo con el scroll. Úsalo con moderación.

## Reglas
- `prefers-reduced-motion` SIEMPRE respetado (guard global).
- La animación dirige la mirada hacia la jerarquía persuasiva (headline → mecanismo → oferta → CTA). Si no refuerza el mensaje, va fuera.
- Mantén el peso bajo: solo los plugins que uses. Mide en móvil.

## Render premium opt-in: v0 (Vercel) — para la ganadora que lo justifique
- **v0 Platform API** (REST, beta) o su MCP: envías copy aprobado + estructura + guía de marca → recibe **código tuyo** (React/Tailwind/shadcn). Sin lock-in de hosting.
- **Caveat (Cloudflare):** v0 produce Next.js; en Cloudflare Pages corre con `@cloudflare/next-on-pages` (a veces requiere config) o exportas estático. Si quieres cero fricción de build, quédate con HTML+GSAP y usa v0 solo como inspiración.
- **Descartados como render principal:** Framer (no exporta HTML, te ata a su hosting) y Webflow (export pierde CMS/forms, exige plan de pago). Sí "robarle" a Webflow su animación: GSAP, que ahora es gratis fuera de Webflow.

## Opcional, fase 2: Figma Dev Mode MCP
Si hay diseñador trabajando en Figma, su MCP oficial extrae **design tokens** (color/espaciado/tipografía) y componentes para alimentar a `constructor-pagina` y mantener fidelidad. No es un render: es fuente de verdad de marca.
