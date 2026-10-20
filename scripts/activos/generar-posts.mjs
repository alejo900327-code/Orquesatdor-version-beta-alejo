// Genera las piezas de contenido (1080×1350, sirve para Instagram y Facebook) y el logo horizontal de una marca.
//   node scripts/activos/generar-posts.mjs <slug>
// Lee marcas/<slug>/marca.json y marcas/<slug>/contenido/contenido.json.
// Salida: marcas/<slug>/contenido/<id>.png y marcas/<slug>/logo-horizontal.png.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const slug = process.argv[2];
if (!slug) { console.error("Uso: node scripts/activos/generar-posts.mjs <slug>"); process.exit(1); }
const dir = join(raiz, "marcas", slug);
const m = JSON.parse(readFileSync(join(dir, "marca.json"), "utf8"));
const { posts } = JSON.parse(readFileSync(join(dir, "contenido", "contenido.json"), "utf8"));
const { fondo, tinta, acento } = m.colores;
const handle = "@" + (m.handles?.elegido || slug);
// Símbolo del logo elegido (marca.json → logo.simbolo), sin la etiqueta <svg> exterior para poder anidarlo.
const simbolo = m.logo?.simbolo
  ? readFileSync(join(dir, m.logo.simbolo), "utf8").replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")
  : null;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const serif = "Georgia, 'Times New Roman', serif";
const sans = "Helvetica Neue, Helvetica, Arial, sans-serif";
const W = 1080, H = 1350, X = 100, ANCHO = W - 2 * X;

// Corta un texto en líneas de ~max caracteres sin partir palabras.
function cortar(texto, max) {
  const lineas = [];
  let actual = "";
  for (const palabra of String(texto).split(" ")) {
    if ((actual + " " + palabra).trim().length > max && actual) { lineas.push(actual); actual = palabra; }
    else actual = (actual + " " + palabra).trim();
  }
  if (actual) lineas.push(actual);
  return lineas;
}

const texto = (x, y, s, { size, font = sans, weight = 400, fill = tinta, anchor = "start" } = {}) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;

function marco(p, cuerpo) {
  const etiquetaAncho = 40 + p.etiqueta.length * 19;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${fondo}"/>
  <rect x="${X}" y="110" width="${etiquetaAncho}" height="56" rx="28" fill="${acento}"/>
  ${texto(X + etiquetaAncho / 2, 148, p.etiqueta.toUpperCase(), { size: 26, weight: 700, fill: "#fff", anchor: "middle" })}
  ${cuerpo}
  ${simbolo
    ? `<g transform="translate(${X - 10} ${H - 200}) scale(0.22)">${simbolo}</g>`
    : `<circle cx="${X + 34}" cy="${H - 150}" r="34" fill="${acento}"/>${texto(X + 34, H - 139, m.monograma, { size: 30, font: serif, weight: 700, fill: fondo, anchor: "middle" })}`}
  ${texto(X + 86, H - 140, handle, { size: 32, weight: 700 })}
  <rect x="0" y="${H - 60}" width="${W}" height="60" fill="${acento}"/>
</svg>`;
}

// Títulos en la fuente del logo; se achican si la línea más larga no cabe en el ancho útil.
const display = "Avenir Next";
const tamTitulo = (lineas, max) => Math.min(max, Math.floor(ANCHO / (Math.max(...lineas.map((l) => l.length)) * 0.54)));
function titulo(lineas, y0, size) {
  return lineas.map((l, i) => texto(X, y0 + i * size * 1.1, l, { size, font: display, weight: 700 })).join("\n");
}

const plantillas = {
  frase(p) {
    // El título se achica si su línea más larga no cabe en el ancho útil.
    const size = tamTitulo(p.titulo, 104);
    let y = 330;
    let svg = titulo(p.titulo, y, size);
    y += p.titulo.length * size * 1.1 + 40;
    svg += `<rect x="${X}" y="${y}" width="120" height="8" fill="${acento}"/>`;
    y += 90;
    for (const l of cortar(p.texto.join(" "), 34)) { svg += texto(X, y, l, { size: 44 }); y += 62; }
    return svg;
  },
  lista(p) {
    let y = 300;
    const size = tamTitulo(p.titulo, 88);
    let svg = titulo(p.titulo, y, size);
    y += p.titulo.length * size * 1.1 + 50;
    p.items.forEach((item, i) => {
      const lineas = cortar(item, 30);
      svg += `<circle cx="${X + 28}" cy="${y - 14}" r="28" fill="${acento}"/>`;
      svg += texto(X + 28, y - 2, String(i + 1), { size: 32, weight: 700, fill: "#fff", anchor: "middle" });
      lineas.forEach((l, j) => { svg += texto(X + 84, y + j * 50, l, { size: 40 }); });
      y += lineas.length * 50 + 46;
    });
    return svg;
  },
  formula(p) {
    let y = 300;
    const size = tamTitulo(p.titulo, 96);
    let svg = titulo(p.titulo, y, size);
    y += p.titulo.length * size * 1.1 + 40;
    const lf = cortar(p.formula, 28);
    const alto = lf.length * 58 + 70;
    svg += `<rect x="${X}" y="${y}" width="${ANCHO}" height="${alto}" rx="24" fill="${tinta}"/>`;
    lf.forEach((l, i) => { svg += texto(X + 40, y + 78 + i * 58, l, { size: 44, weight: 700, fill: fondo }); });
    y += alto + 90;
    for (const l of p.ejemplo.flatMap((t) => cortar(t, 34))) { svg += texto(X, y, l, { size: 42 }); y += 60; }
    return svg;
  }
};

for (const p of posts) {
  const svg = marco(p, plantillas[p.tipo](p));
  await sharp(Buffer.from(svg)).png().toFile(join(dir, "contenido", `${p.id}.png`));
}

// Logo horizontal: monograma + nombre, para firmas, banners y la landing.
const logoAncho = 520 + Math.ceil(m.nombre.length * 78);
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="${logoAncho}" height="440">
  <rect width="${logoAncho}" height="440" fill="${fondo}"/>
  <circle cx="220" cy="220" r="150" fill="${acento}"/>
  ${texto(220, 262, m.monograma, { size: 120, font: serif, weight: 700, fill: fondo, anchor: "middle" })}
  ${texto(420, 262, m.nombre, { size: 130, font: serif, weight: 700 })}
</svg>`;
if (m.logo?.horizontal) await sharp(join(dir, m.logo.horizontal)).png().toFile(join(dir, "logo-horizontal.png"));
else await sharp(Buffer.from(logo)).png().toFile(join(dir, "logo-horizontal.png"));
console.log(`✅ ${posts.length} piezas en marcas/${slug}/contenido/ y logo-horizontal.png`);
