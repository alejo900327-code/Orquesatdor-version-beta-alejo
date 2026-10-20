# ¿Cuánto Cobro? — pendientes antes de publicar

Modelo de negocio: `conocimiento/_COMPARTIDO/investigaciones/2026-10-micro-apps-latam/04-modelo-calculadora-costos.md`

## Qué hay (semana 0)
- `public/index.html` — landing de preventa (USD 12, pago único, garantía 7 días).
- `public/calculadora/` — calculadora gratis de 1 receta. Todo en el navegador; el borrador se guarda solo en el teléfono (localStorage).
- `public/estilos.css` — estilos compartidos.
- Eventos de medición en `window.dataLayer`: `landing_a_calculadora`, `clic_comprar_preventa`, `calc_ejemplo`, `calc_primer_resultado`, `calc_compartir`, `calc_a_preventa`.

## Publicado 2026-10-20 en https://cuantocobro.vendedecasa.com (ver DEPLOYS.md). Pendientes:
- [x] ~~Crear el producto de preventa en Hotmart (USD 12) y poner el enlace en `#boton-comprar` (index.html).~~ 2026-10-20: ID 8770692 (borrador), checkout https://pay.hotmart.com/D108114823S.
- [x] ~~Hotmart → contenido del producto~~ 2026-10-20: PDF `entrega/cuanto-cobro-acceso-y-guia.pdf` subido (acceso a /app/ + guía de las 4 cosas + mensajes para "está caro").
- [x] ~~Alejo compra el dominio~~ 2026-10-20: `vendedecasa.com` (paraguas para todas las micro apps) → `cuantocobro.vendedecasa.com`.
- [x] ~~App paga en `public/app/`~~ 2026-10-20: publicada en https://cuantocobro.vendedecasa.com/app/
- [x] ~~Hotmart → Página de venta externa~~ 2026-10-20: https://cuantocobro.vendedecasa.com/ guardada; PDF reemplazado con la URL nueva.
- [ ] Hotmart → Finalizar registro (acepta el Término de Datos: sí de Alejo) → aprobación.
- [x] ~~Fijar la fecha real de entrega en `#fecha-entrega`~~ 2026-10-20: 30 de noviembre de 2026 (decisión de Alejo). Es solo protocolo: la entrega es inmediata (PDF + /app/).
- [ ] Conectar el píxel de Meta / analítica a los eventos de `dataLayer`.
- [x] ~~Elegir dominio~~ 2026-10-20: `cuantocobro.vendedecasa.com` (dominio paraguas `vendedecasa.com`).
- [ ] Pasar el copy por `guardian-etico` (claims) y `editor-voz-marca`.
- [ ] Decidir nombre definitivo (alternativas: Cobra Bien, Precio Justo, Mi Costo Real).

## Activos digitales (skill `activos-digitales`)
- [x] Kit de marca preparado (`marca/`)
- [ ] Alejo aprueba nombre y handle
- [ ] Fanpage de Facebook (`crear-fanpage-facebook`)
- [ ] Cuenta de Instagram (`crear-cuenta-instagram`)
- [~] Producto en Hotmart (`crear-producto-hotmart`): creado en borrador (ID 8770692), falta finalizar el registro
