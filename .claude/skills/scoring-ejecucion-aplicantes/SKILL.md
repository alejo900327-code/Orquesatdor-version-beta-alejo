---
name: scoring-ejecucion-aplicantes
description: Califica y prioriza aplicantes de una agencia/servicio done-for-you, y produce un análisis de EJECUCIÓN (no solo de datos) para decidir a quién atender primero. Combina un rubro 0-100 por bandas (capacidad económica + compromiso/momento + encaje) con un análisis por candidato de palanca, estrategia, complejidad y tiempo al primer resultado, cruzando el formulario de aplicación con las sesiones/diagnósticos que existan. Úsala cuando Alejo diga "ponle puntaje a los aplicantes", "a quién le ejecutamos primero", "analiza quién paga", "criterios de calificación de la agencia", o revise el panel de aplicaciones de AGENC-IA. Relacionada con el modelo económico de la agencia ([[agencia-modelo-economico]]).
---

# Scoring + análisis de ejecución de aplicantes (AGENC-IA)

Cómo decidimos a quién atender en la agencia. Dos capas: **calificar** (¿puede y quiere?) y **ejecutar** (¿cómo y en cuánto tiempo le damos resultado?). La segunda es la que de verdad decide a quién se le abre cupo primero.

## Capa 1 — Rubro de calificación (0-100, bandas)
El cliente bueno **puede pagar + sostener pauta**, está **listo y comprometido**, y tiene un **problema que el servicio resuelve** con oferta que escala. Pesos (alineados con el panel oficial de Erick):
- **Facturación/mes 35** (+150k=35 · 50-150k=28 · 15-50k=18 · 5-15k=8 · <5k=0)
- **Pauta que ya invierte 20** (+10k=20 · 5-10k=15 · 1-5k=10 · <1k=5 · sin pauta=2)
- **Acepta los 6 meses 15** (sí=15 · "quiere que se lo expliquen"=5)
- **Urgencia/arranque 10** (ya=10 · 30 días=6)
- **Ticket 10** · **Encaje con "lo hacemos por ti" 10**
Bandas: **A ≥75 · B 55-74 · C 35-54 · D <35**. Regla dura: **bajo el mínimo de facturación nunca pasa de C**. "Quiere que se lo expliquen" (no decidido) techa la nota.
> Si ya existe un panel oficial con su propio score (Erick), **ese manda**; este rubro solo lo complementa.

## Capa 2 — Análisis de ejecución (lo que pidió Alejo)
Por candidato, con este lente: **Palanca · Estrategia · Complejidad (1-5) · Tiempo a 1er resultado · Veredicto.** Criterio de decisión: **menor tiempo de montaje × mejor resultado**, jugando a la fortaleza (Alejo domina **digital**) y cuidando lo difícil de medir.

Reglas de complejidad que salieron en sala:
- **Digital high/mid-ticket** = complejidad baja (2-2.5), resultado en 2-4 semanas, zona de dominio total. Mejor relación resultado/tiempo.
- **High-ticket** = ROI inmediato (una venta paga la agencia).
- **Físico/local:** ordénalos por "digitalizabilidad": e-commerce directo (calzado) = medible y tratable; courier/servicio = gran upside pero **atribución** difícil (sprint de tracking aparte); comida local / ticket <$30 = el más difícil con pauta (ataca solo lo empaquetable/enviable, p.ej. el café tostado).
- **B2B / organización grande** = complejidad alta, ciclo largo, curva de aprendizaje → premio mayor pero no para la ventana de "pago rápido".
- "Quiere que se lo expliquen" / sin pauta / no decidido → **nutrir**, no priorizar.

Orden típico para que paguen: digitales listos → high-ticket → digital con más construcción → físico digitalizable → físico con tracking → físico local → B2B → nutrir.

## Datos: dónde está cada cosa
- **Formulario** (campos: tipo, que_vende, facturación, ticket, margen, pauta, meta, freno/cuello, intentado, equipo, decide, accesos, arranque, compromiso, texto libre). El **texto libre es muy revelador** — léelo.
- **Sesiones 1-a-1 (diagnósticos de Javi):** en un Drive (carpeta de videos `Sesión <fecha> <Nombre>.mp4`). OJO: no todos los aplicantes tienen sesión grabada ahí; verifica por nombre en TODO el Drive (search_files `title contains '<nombre>'`), no asumas. Si no está, puede estar en el Fathom propio de Javi.
- **Círculo CSVs** (Registros/Fichas): tier/score/facturación/equipo de algunos miembros.
- **Panel de aplicaciones:** léelo pero trátalo como confidencial; no lo cruces con otras bases ni lo compartas.

## Entregable
Un doc ordenado dentro del proyecto de la agencia (`~/Desktop/Agencia Negocios Locales/ANALISIS-EJECUCION-APLICANTES.md`): panel oficial + rubro, tabla de puntajes, estado de sesión 1-a-1 por aplicante, análisis de ejecución por candidato, y el orden recomendado para que paguen. Ofrece pasarlo a PDF/Doc para compartir con Erick.
