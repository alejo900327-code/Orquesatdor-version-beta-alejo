---
name: equipo-de-ventas
description: El informe de rendimiento comercial de la semana, de una sola orden. Trae de Fathom las llamadas de venta nuevas, las analiza con la Flota Comercial, consolida el aprendizaje en activos/objeciones-maestro.md y entrega un informe LEGIBLE para el fundador: qué cerró y por qué, qué respuestas funcionaron con evidencia, qué se dejó sobre la mesa, banderas éticas §6 por vendedor y discrepancias entre lo que dice el cerebro y lo que se comunica en la calle. Úsala SIEMPRE que el usuario quiera saber cómo fue la semana comercial, revisar las llamadas del equipo de ventas, preparar la reunión del lunes, o simplemente pida "el análisis". Dispara con frases como "equipo de ventas", "cómo fue la semana de ventas", "top performance", "analiza las llamadas del equipo", "tráeme el análisis comercial", "qué pasó en las llamadas esta semana", "prepárame la reunión con los vendedores". NO inventa datos: si no hay llamadas nuevas, lo dice y para. Requiere .env con FATHOM_API_KEY (config local, nunca en git).
---

# Equipo de ventas · el informe comercial de la semana, en una orden

## Qué hace

Cierra el bucle completo sin que el usuario toque nada: **Fathom → transcripciones
→ análisis → maestro → informe legible.** El usuario escribe una frase y recibe lo
que necesita para hablar con su equipo comercial.

Es la cara amable de un pipeline que ya existe (`herramientas/importar-llamadas.py`
+ el agente `analista-llamadas` + `activos/objeciones-maestro.md`). Esta skill lo
orquesta y **traduce el resultado a lenguaje de fundador**, no de analista.

## Cuándo NO usarla

- Para preparar UNA llamada concreta → `preparador-llamadas`
- Para entrenar a un vendedor con role-play → `entrenador-comercial`
- Para escribir el seguimiento post-llamada → `redactor-seguimiento`

---

## Paso 1 · Ver qué hay (siempre en seco primero)

Por defecto la ventana es **los últimos 7 días**. Si el usuario pide otra ("el mes",
"desde el 1 de julio"), usa esa.

```bash
python3 herramientas/importar-llamadas.py --desde AAAA-MM-DD --lista
```

`--lista` no escribe nada. Lee la salida:

- **`0 importadas · N ya existían`** → no hay nada nuevo. **Dilo y para.** No corras
  agentes para no producir nada. Ofrece mostrar el último informe.
- **`N importadas`** → hay material. Sigue.

## Paso 2 · Importar

```bash
python3 herramientas/importar-llamadas.py --desde AAAA-MM-DD
```

Las transcripciones caen en `cerebros/cumbre-millonarios/fuentes/llamadas/`, que está
en `.gitignore`. **Nunca las subas a git ni las pegues en el chat: son datos
personales de clientes.**

## Paso 3 · Separar el grano

Antes de analizar, mira los nombres de archivo y **descarta lo que no es una llamada
de venta**. El importador se trae TODO lo que grabó Fathom:

- Reuniones internas (sprint planning, reuniones de equipo, salas personales)
- Llamadas de menos de ~10 minutos → suelen ser no-shows; se analizan igual, pero
  probablemente salgan "no computables"

Construye la lista explícita de archivos a analizar. **No delegues el filtrado a un
agente**: en tandas anteriores no aplicaron el filtro fielmente.

## Paso 4 · Analizar (un agente por llamada, en paralelo)

Invoca `analista-llamadas` en **MODO A** por cada llamada, con el cerebro del
**producto** correspondiente:

| Título de la llamada contiene | Cerebro primario |
|---|---|
| "Mentoría MC", "Millonarios Conscientes" | `cerebros/millonarios-conscientes/cerebro.md` |
| "CERTIFICACIÓN HIT", "HIT" | `cerebros/hit/cerebro.md` |
| Cumbre / evento | `cerebros/cumbre-millonarios/cerebro.md` |

Cada agente escribe `salidas/comercial/analisis/<mismo-nombre>.md`.

**Cuatro avisos que salen del corpus real y ahorran errores:**

1. **El título miente sobre el producto.** Hay llamadas tituladas "Mentoría MC" donde
   se ofreció HIT durante 40 minutos. Instruye al analista a determinar el peldaño
   por lo que REALMENTE se ofreció, no por el nombre del archivo.
2. **La diarización de Fathom cruza hablantes.** A veces el cliente aparece con el
   nombre de su móvil ("Samsung SM-A166M") o su email; otras, turnos entre vendedor
   y cliente están invertidos — incluidas señales de compra atribuidas al vendedor.
   Pide que reconstruya por contenido y lo declare.
3. **Captura los precios TEXTUALES con marca de tiempo.** Es el hallazgo más
   accionable que produce este pipeline: revela cuándo el cerebro está desactualizado
   respecto a lo que se vende de verdad.
4. **Resultado sin confirmar es sin confirmar.** Un cierre solo cuenta con pago en
   vivo evidenciado. El dato falso envenena el maestro.

## Paso 5 · Consolidar (un solo escritor)

Invoca `analista-llamadas` en **MODO B** una sola vez con todos los análisis nuevos.

**`activos/objeciones-maestro.md` es ACUMULATIVO y ya fue corrompido una vez** (julio
2026: dos consolidadores compactaron el cuerpo y borraron ~30 filas). Reglas:

- Solo AÑADIR. Nunca borrar filas, secciones ni historia.
- `Edit` con inserciones dirigidas, jamás `Write` sobre el archivo entero.
- Trabajar en tramos pequeños, cerrando cada sección con su propia edición: si el
  agente se cae a mitad, lo escrito queda salvado y coherente.
- Actualizar la línea de Estado con aritmética explícita y verificable.

**Verifica la integridad al terminar:**

```bash
git diff --numstat activos/objeciones-maestro.md
```

La segunda columna (líneas borradas) **debe ser 0**. Si no lo es, avisa al usuario y
no sigas.

## Paso 6 · El informe (esto es lo que el usuario lee)

Los análisis son de 25-35 KB cada uno. **Nadie los va a leer.** Destílalos en un
informe corto, en la voz de quien habla con el dueño del negocio:

```
## La semana en una línea
[N llamadas · N cierres · lo más importante que pasó]

## Lo que funcionó
Las respuestas que cerraron, con la cita textual y quién la usó.
Solo con evidencia: el cliente avanzó DESPUÉS de esa respuesta.

## Lo que se dejó sobre la mesa
Clientes que ya habían dicho que sí a un peldaño y se fueron sin cerrar.
Es donde está el dinero perdido, y suele ser el hallazgo más caro.

## Banderas §6 por vendedor
Con cita textual. Es material de coaching, no de castigo — pero se registra.
Atención a: precio estándar vendido como favor personal, urgencia fabricada,
presión financiera, venta sobre quiebre emocional.

## Cerebro vs. calle
Precios y promesas que se comunican y NO coinciden con el cerebro.
El cerebro alimenta toda la copy del sistema: si está desfasado, la copy también.

## Lo que haría yo el lunes
2-3 acciones concretas, ordenadas por impacto.
```

**Reglas del informe:**

- Citas textuales, cliente anonimizado (nombre de pila + inicial). Vendedores con
  nombre: es coaching interno.
- Un patrón necesita 2+ llamadas. Con una, es hipótesis y se dice así.
- Si la diarización vino sucia, **dilo**: los números finos no son de fiar.
- Sin cifras inventadas. Si algo no se pudo confirmar, se declara.

---

## Si algo falla

| Síntoma | Causa probable |
|---|---|
| `Falta FATHOM_API_KEY` | No está en `.env` (config local, fuera de git) |
| `Fathom respondió 401` | La API key caducó o se rotó → Fathom → Settings → API |
| `0 importadas` con llamadas que sabes que existen | La key ve tus grabaciones + las compartidas con tu equipo. Si un vendedor graba fuera del equipo, no aparece |
| El consolidador se cae a mitad | Comprueba integridad con `git diff --numstat` y reanuda solo lo que falte — nunca desde cero |

**Nota verificada contra la API (2026-08-08):** Fathom **ignora en silencio** cualquier
filtro por id (`recording_ids[]`, `recording_id`, `ids[]`) y devuelve la lista completa
con 200; no existe `GET /meetings/<id>`. Cualquier búsqueda de una grabación concreta
debe emparejar **en cliente** por `recording_id`. Fiarse del primer resultado escribe
la transcripción de OTRA llamada bajo el nombre correcto — un fallo silencioso que
produce informes coherentes sobre la llamada equivocada.

## La línea que no se cruza

Las transcripciones llevan datos personales de clientes. **No salen de la máquina
local**: ni a git, ni a la nube, ni pegadas en un chat. El informe sí se comparte —
por eso va anonimizado.
