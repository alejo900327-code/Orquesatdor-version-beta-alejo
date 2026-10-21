# Métricas · ¿Cuánto Cobro?

Dashboard del embudo: https://claude.ai/artifact/T3w3nENDsU1JcaACe1wyv3 (privado de Alejo).

Lee dos archivos que viven aquí y se suben al dashboard cada vez que se actualizan:
- `embudo-diario.csv`: una fila por día.
  - Gasto, impresiones y clics al enlace: Administrador de anuncios.
  - Visitas, calculadora (Lead), ClicComprar e inicio de pago (InitiateCheckout): Events Manager, píxel 520582086176158.
  - Compras, bumps e ingresos en USD: Hotmart → Ventas. Es la fuente de verdad de las compras.
- `anuncios.csv`: acumulado por anuncio (gasto, impresiones, clics, compras según Meta, estado de entrega).

Para actualizar, pedir "actualiza el dash del embudo". Claude lee Ads Manager, Events Manager y Hotmart en Chrome, edita los CSV, los sube como asset nuevo y apunta el dataset al nuevo `/_blob/…`.
