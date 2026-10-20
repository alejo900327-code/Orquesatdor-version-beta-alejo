# ¿Cuánto Cobro? — pendientes antes de publicar

Modelo de negocio: `conocimiento/_COMPARTIDO/investigaciones/2026-10-micro-apps-latam/04-modelo-calculadora-costos.md`

## Qué hay (semana 0)
- `public/index.html` — landing de preventa (USD 12, pago único, garantía 7 días).
- `public/calculadora/` — calculadora gratis de 1 receta. Todo en el navegador; el borrador se guarda solo en el teléfono (localStorage).
- `public/estilos.css` — estilos compartidos.
- Eventos de medición en `window.dataLayer`: `landing_a_calculadora`, `clic_comprar_preventa`, `calc_ejemplo`, `calc_primer_resultado`, `calc_compartir`, `calc_a_preventa`.

## Falta antes de `bash scripts/deploy.sh cuanto-cobro`
- [ ] Crear el producto de preventa en Hotmart (USD 12) y poner el enlace en `#boton-comprar` (index.html).
- [ ] Fijar la fecha real de entrega en `#fecha-entrega` (≤ 7 días después de abrir la preventa).
- [ ] Conectar el píxel de Meta / analítica a los eventos de `dataLayer`.
- [ ] Elegir dominio (o salir en `cuanto-cobro.<subdominio>.workers.dev`).
- [ ] Pasar el copy por `guardian-etico` (claims) y `editor-voz-marca`.
- [ ] Decidir nombre definitivo (alternativas: Cobra Bien, Precio Justo, Mi Costo Real).
