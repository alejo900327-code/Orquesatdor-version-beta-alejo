# Formato del pack de recetas de ¿Cuánto Cobro? (v1)

Es el archivo que se entrega con el order bump "30 recetas base" (USD 5). La compradora lo sube en la app:
**Ajustes → Importar recetas** (o, si no tiene recetas, en el enlace "¿Compraste el pack de recetas? Impórtalo aquí").
La importación **suma** el pack a lo que ella ya tiene y **no borra nada**.

**Dos formas de importar:**
1. **Enlace directo (recomendado para el PDF del bump):** `https://cuantocobro.vendedecasa.com/app/#/importar/30-recetas-base`.
   La app trae `public/app/packs/30-recetas-base.json` y pide confirmar. No hay que descargar nada (en iPhone, tocar un `.json` lo abre como texto en vez de descargarlo). Si la app es nueva, primero elige el país y luego importa sola. Para otro pack: `packs/<nombre>.json` → `#/importar/<nombre>` (solo minúsculas, números y guiones).
2. **Archivo:** Ajustes → botón **"Importar recetas"** (o el enlace "Importar recetas" cuando no tiene recetas). Acepta `.json` y también archivos que el celular marque como texto.

- Archivo final: `entrega/pack-30-recetas.json` (UTF-8, JSON válido, sin comentarios).
- Ejemplo con 2 recetas: [`pack-ejemplo.json`](pack-ejemplo.json). La app lo importa tal cual.
- Código que lo lee: `public/app/app.js` → `validarPack()` e `importarPack()`.

## Estructura

```json
{
  "formato": "cuanto-cobro-pack",
  "version": 1,
  "nombre": "30 recetas base",
  "moneda": "COP",
  "ingredientes": [
    { "nombre": "Harina de trigo", "compra": 1, "compraU": "kg", "precio": 4000 }
  ],
  "recetas": [
    {
      "nombre": "Torta de chocolate húmeda (12 porciones)",
      "porciones": 12,
      "items": [
        { "ingrediente": "Harina de trigo", "cant": 300, "u": "g" }
      ],
      "empaque": 8000,
      "servicios": { "horno": 60, "tipo": "gas", "estufa": 0, "batidora": 10, "lavado": true },
      "horas": 3,
      "desperdicio": 5,
      "margen": 30
    }
  ]
}
```

### Raíz

| Campo | Obligatorio | Valor |
|---|---|---|
| `formato` | sí | Exactamente `"cuanto-cobro-pack"`. |
| `version` | sí | El número `1`. |
| `nombre` | no | Nombre que ve la compradora al confirmar ("30 recetas base"). |
| `moneda` | no (recomendado) | Moneda de los precios del pack: `"COP"`. Si no coincide con la moneda de la app de la compradora, los ingredientes **nuevos** y el empaque llegan **sin precio**; recetas, cantidades, horas y minutos llegan igual. |
| `ingredientes` | sí | Lista de **todos** los ingredientes que usan las recetas, una vez cada uno. |
| `recetas` | sí | Al menos una. |

### `ingredientes[]` (la presentación en que se compra)

| Campo | Obligatorio | Valor |
|---|---|---|
| `nombre` | sí | Nombre común en Colombia, igual al que trae la app cuando se puede: `Harina de trigo`, `Azúcar`, `Azúcar pulverizada`, `Mantequilla`, `Huevos`, `Leche`, `Crema de leche (para batir)`, `Queso crema`, `Leche condensada`, `Chocolate de cobertura`, `Cacao en polvo`, `Polvo de hornear`, `Esencia de vainilla`, `Aceite vegetal`, `Fresas`, `Arequipe`. Así se reconoce el de ella. |
| `compra` | sí | Cantidad de la presentación (número > 0): `1`, `500`, `30`. |
| `compraU` | sí | `"g"`, `"kg"`, `"ml"`, `"l"` o `"u"` (unidades). |
| `precio` | recomendado | Precio de **referencia** en `moneda` de esa presentación (número entero en COP, sin puntos ni símbolo). |

### `recetas[]`

| Campo | Obligatorio | Valor |
|---|---|---|
| `nombre` | sí | Único dentro del pack. Si la compradora ya tiene una receta con ese nombre, esa receta del pack **se salta** (importar dos veces no duplica). |
| `porciones` | recomendado | Entero. |
| `items` | sí | Al menos uno: `{ "ingrediente": <nombre exacto de ingredientes[]>, "cant": <número>, "u": <unidad> }`. La unidad debe ser de la **misma dimensión** que `compraU` de ese ingrediente (masa g/kg, volumen ml/l, unidades u). |
| `empaque` | no | Costo de caja, base, etc. en `moneda` (número). |
| `servicios` | recomendado | Gas, luz y agua por minutos: `horno` (min, con precalentado), `tipo` (`"gas"` o `"elec"`), `estufa` (min), `batidora` (min), `lavado` (true/false). La app lo convierte en dinero con las tarifas del país de la compradora. |
| `gas` | no | Solo si no hay `servicios`: valor fijo de gas/luz/agua en `moneda`. |
| `horas` | recomendado | Horas de trabajo (puede ser decimal: `3.5`). La **tarifa por hora** no va en el pack: se usa la de la compradora (Ajustes). |
| `desperdicio` | no | % de merma. Por defecto `5`. |
| `margen` | no | % de ganancia. Por defecto `30`. |

## Cómo se fusiona (reglas de la app)

1. **Ingredientes:** se comparan por nombre sin tildes, mayúsculas ni espacios dobles (`"azucar"` = `"Azúcar"`).
   - Si ella ya lo tiene: la receta usa **el de ella, con su precio**. El precio del pack se ignora.
   - Si no lo tiene: se agrega con el precio del pack y la marca "Referencia" para que lo corrija.
   - Caso raro: ella lo tiene medido en otra dimensión (p. ej. huevos en kg). Entonces se agrega uno nuevo llamado `"<nombre> (pack)"`.
2. **Recetas:** se agregan arriba de las suyas. Las que tienen un nombre que ella ya usa se saltan.
3. Nada de lo que ella tenía se modifica ni se borra.

## Validaciones (si falla una, no se importa nada y la app dice cuál)

- `formato`/`version` correctos; `ingredientes` y `recetas` son listas; hay al menos una receta.
- Cada ingrediente tiene `nombre`, `compra` > 0 y `compraU` válida.
- Cada receta tiene `nombre` y al menos un ítem; cada ítem nombra un ingrediente que existe en `ingredientes[]` y usa una unidad de su misma dimensión.

## Reglas de contenido

- Los precios son **de referencia aproximados**, no de mercado; no prometas que son los de su ciudad.
- Las cantidades deben ser reales y probadas (rinden lo que dice `porciones`).
- Sin marcas comerciales en los nombres de ingredientes.
