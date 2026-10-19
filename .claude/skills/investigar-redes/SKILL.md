---
name: investigar-redes
description: Investigación directa en redes con datos reales: busca y mide anuncios ganadores en la Biblioteca de Anuncios de Meta (Facebook/Instagram), reels de cuentas de Instagram (vistas, comentarios, captions, duración) y contenido de TikTok, descarga los vídeos de referencia y deja un paquete listo para analizar. Empieza con una entrevista corta para fijar objetivo, fuentes y criterios. Úsala cuando alguien pida "investiga a X", "tráeme anuncios que estén funcionando en mi nicho", "qué hace tal creador que vende", antes de escribir guiones o anuncios de un lanzamiento sin investigación reciente, o para auditar una cuenta propia. Entrega datos y vídeos; el análisis lo hacen minar-cuenta-viral (estrategia de una cuenta) y minar-referencia (edición de un vídeo) en la fábrica de video.
---

# Investigar en redes (Meta Ads, Instagram, Facebook, TikTok)

Esta skill consigue **datos reales**: métricas de cada pieza, textos completos y los vídeos. No opina: mide.
Es el método de Emprendimiento Consciente para responder con números preguntas como "¿por qué esta
cuenta es viral pero no convierte?" o "¿qué anuncios llevan meses funcionando en mi nicho?".

## Paso 0 — Entrevista (pregunta SIEMPRE antes de navegar)
Haz estas preguntas en un solo mensaje, con opciones sugeridas. No arranques sin las 4 primeras.

1. **Objetivo**: ¿qué decisión vamos a tomar con esto?
   - (a) Entender por qué una cuenta vende / es viral (estrategia)
   - (b) Encontrar anuncios ganadores de un nicho para inspirar los nuestros
   - (c) Sacar referencias de edición para la fábrica de video
   - (d) Auditar una cuenta propia contra referentes
2. **Quién / qué**: cuentas concretas (@ o enlace) **o** nicho + palabras clave. Si el usuario da nombres
   sin @, búscalos (web + buscador de Instagram) y **confirma la cuenta antes de medir**: hay homónimos
   (mismo nombre, otra persona u otro sector). Enseña al usuario la cuenta candidata y espera su OK.
3. **Fuentes**: Biblioteca de Anuncios de Meta · Instagram (reels) · Facebook (página) · TikTok (perfil y/o
   Creative Center). Por defecto: (a) y (d) → Instagram; (b) → Meta Ads; (c) → ambas.
4. **Cuenta propia para comparar** (opcional pero muy recomendable): sin contraste no hay diagnóstico.
5. **Idioma y países** (por defecto: español; Colombia, México, España, EE. UU. hispano) y **ventana de
   tiempo** (por defecto: anuncios activos hoy; reels de los últimos ~70 por cuenta).
6. **Volumen**: cuántos vídeos descargar (por defecto: top 5-12 y bottom 3-4 por cuenta; 10-20 anuncios).
7. **¿Quiere elegir antes de descargar?** Si sí, publica una lista con enlaces y casillas (artifact)
   y espera su selección (es útil para que el usuario descarte referentes que no quiere usar).

## Paso 1 — Comprobar el acceso
| Fuente | Necesita sesión | Herramienta |
|---|---|---|
| Biblioteca de Anuncios de Meta | No | Navegador integrado o Chrome |
| Instagram (perfiles, métricas, vídeos) | **Sí** | **Chrome del usuario** (Claude in Chrome) con su sesión abierta |
| TikTok Creative Center (Top Ads) | Sí para ver más de 3 | Chrome del usuario |
| TikTok perfiles | Recomendable | Chrome del usuario |

- Si Claude in Chrome no responde: `list_connected_browsers`. Vacío = la extensión no tiene sesión con la
  misma cuenta de Claude. Pide al usuario que abra el panel de Claude en Chrome e inicie sesión.
  Alternativa: abrir el login en el navegador integrado y que **el usuario** escriba su contraseña (Claude nunca).
- **Descargas**: Chrome bloquea la 2.ª descarga automática de cada sitio. Pide al usuario, una vez por sitio
  (instagram.com, facebook.com, tiktok.com), "Permitir siempre varias descargas" en el icono de descarga
  bloqueada de la barra de direcciones. Por eso los scripts empaquetan todo en **un solo .tar** por tanda.

## Paso 2 — Recolectar (scripts probados en `scripts/`)
Los scripts se pegan en `javascript_tool` (Claude in Chrome) tal cual; los parámetros van en la primera línea.
Corren dentro de la página con la sesión del usuario, en segundo plano (`window.__job` muestra el progreso):
la herramienta corta a los 45 s, pero el trabajo sigue. Consulta `window.__job` y espera el .tar en
`~/Downloads` con un bucle (`until [ -f ... ]`).

### 2a. Biblioteca de Anuncios de Meta
1. URL de búsqueda (vídeo, ordenada por impresiones):
   `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&media_type=video&q=<frase>&search_type=keyword_exact_phrase&sort_data[mode]=total_impressions&sort_data[direction]=desc`
   - Usa **frase exacta** (`keyword_exact_phrase`) con frases del nicho ("clase gratuita", "masterclass
     gratuita", "negocio digital"). La búsqueda suelta trae ruido (perfumes, tenis…).
   - Para un anunciante: busca su nombre y filtra por página, o usa el enlace "Ver todos los anuncios" de su ficha.
   - `country=ALL` (con un país concreto puede faltar parte de sus anuncios).
2. `scripts/meta-ads-listar.js` → lista deduplicada: id, página, días al aire, versiones, texto.
   **La señal de ganador es la longevidad**: nadie paga meses por un anuncio que no vende. ≥ 90 días = fuerte; ≥ 180 = ganador probado.
3. `scripts/meta-ads-descargar.js` con los ids elegidos → `.tar` con los vídeos + JSON.
4. Ficha de un anuncio para el usuario: `https://www.facebook.com/ads/library/?id=<id>`.
5. Facebook borra `localStorage`/variables al navegar: cada script es autocontenido.

### 2b. Instagram (cuentas)
1. Abre `https://www.instagram.com/<cuenta>/reels/` en Chrome.
2. `scripts/ig-cuenta.js` (parámetros: cuenta, nº top, nº bottom, códigos a saltar):
   recorre la rejilla, pide los datos de cada reel a la API web de Instagram con la sesión del usuario
   (vistas, likes, comentarios, duración, fecha, caption completa, etiquetados, colaboradores), elige top y
   bottom por vistas, descarga esos vídeos (720×1280) y lo empaqueta todo en `ig_<cuenta>.tar`.
   Con `top=0, bottom=0` solo saca métricas (rápido, para cuentas propias o de contraste).
3. Ritmo: ~0,5 s entre peticiones y una cuenta cada vez. ~70 reels tardan 2-4 min.
4. Si el texto de un reel nombra a clientes o colaboradores (`@...`, "con [nombre]"), apúntalos: suelen
   ser los casos de éxito y conviene medirlos también.

### 2c. Facebook (páginas)
Para anuncios, usa 2a. Para el orgánico de una página, el flujo es el mismo que en Instagram pero
**aún no está probado**: la primera vez, valida a mano y documenta aquí lo que funcione.

### 2d. TikTok (sin probar todavía)
- **Creative Center → Top Ads** (`ads.tiktok.com/business/creativecenter/inspiration/topads/`): con sesión
  muestra anuncios con métricas por segundo. Filtra por país, sector y últimos 30 días.
- **Perfiles** (`tiktok.com/@cuenta`): la rejilla muestra las vistas de cada vídeo.
- La primera investigación en TikTok debe validar el método y **actualizar esta sección** con el script que funcione.

## Paso 3 — Ordenar en disco
```bash
bash scripts/desempacar.sh <nombre-investigacion>   # mueve los .tar de ~/Downloads y los extrae
```
Estructura: `~/Desktop/Videos-IA/referencias/<AAAA-MM>-<nombre>/{instagram,meta-ads,tiktok}/` con
`<cuenta>_<código>.mp4` y `metadata_<cuenta>.json`. Los vídeos se quedan **en local**: nunca se suben a
repos (pesan y no son nuestros).

## Paso 4 — Primera lectura (antes de entregar)
Calcula por cuenta y enséñalo en una tabla: reels medidos · vistas (mediana) · **comentarios por 1.000
vistas** · likes por 1.000 · duración mediana · % de reels que piden "comenta PALABRA" y cuáles.
- Likes altos + comentarios bajos = cuenta querida pero sin puerta de entrada (p. ej. > 50 likes/1k con < 1 coment./1k).
- Comentarios/1.000 ≥ 10 con palabra clave = cuenta que convierte (una buena cuenta de conversión ronda 15-17).
- Mediana vs picos: la mediana dice la constancia; los picos dicen qué se puede provocar.

## Paso 5 — Entregar y pasar al análisis
Entrega: tabla del paso 4, ruta de la carpeta, qué se descargó y qué no (y por qué). Luego:
- Estrategia de una cuenta → `minar-cuenta-viral` (fábrica de video).
- Edición de vídeos concretos → `minar-referencia` (fábrica de video).
- Anuncios del nicho → agente `inteligencia-competitiva` con estos datos como materia prima.
- Guiones → `contenido-viral-que-vende` + `guion-reel-conversion`.
Registra la investigación en `conocimiento/_COMPARTIDO/investigaciones/` (créala si no existe): fecha, objetivo, cuentas, hallazgos.

## Cuándo debe dispararse sola
Antes de escribir guiones o anuncios de un nicho/lanzamiento, mira `conocimiento/_COMPARTIDO/investigaciones/` (si no existe, no hay investigación previa):
si no hay una investigación de ese nicho de **menos de 30 días**, propón correr esta skill primero
(y pregunta lo del paso 0). Las skills de guion la invocan en su paso 0.

## Reglas
- Solo información **pública** (métricas, textos, vídeos publicados) y para **análisis interno**. No se
  republica contenido ajeno ni se copian guiones: se extraen patrones.
- Con la sesión del usuario **no** se comenta, da like, sigue ni manda mensajes. Solo lectura.
- No recolectes datos de personas (comentaristas, seguidores): solo de las piezas.
- Ritmo humano (pausas entre peticiones) para no forzar límites de la plataforma.
- Todo lo que no se ve desde fuera (qué pasa en el DM, precios, ventas) se marca como **hipótesis**.
