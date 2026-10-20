// Piezas de Instagram con diseño de marca: posts (frase | lista | formula) y carruseles.
//   node scripts/activos/generar-posts-ig.mjs <slug> [json]   (json por defecto: contenido-ig.json)
// Lee marcas/<slug>/marca.json (colores, logo, handle) y marcas/<slug>/contenido/<json>.
// Salida: marcas/<slug>/contenido/ig/<id>.png o <id>-<n>.png (carrusel), 1080×1350.
// *palabra* en un título o texto = se pinta con el color de acento del fondo.
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const [slug, archivo = "contenido-ig.json"] = process.argv.slice(2);
if (!slug) { console.error("Uso: node scripts/activos/generar-posts-ig.mjs <slug> [json]"); process.exit(1); }
const dir = join(raiz, "marcas", slug);
const salida = join(dir, "contenido", "ig");
mkdirSync(salida, { recursive: true });
const m = JSON.parse(readFileSync(join(dir, "marca.json"), "utf8"));
const { posts } = JSON.parse(readFileSync(join(dir, "contenido", archivo), "utf8"));
const handle = "@" + (m.handles?.elegido || slug);
const simbolo = m.logo?.simbolo
  ? readFileSync(join(dir, m.logo.simbolo), "utf8").replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")
  : "";

const W = 1080, H = 1350, X = 96, ANCHO = W - 2 * X;
const FUENTE = "Avenir Next";
const crema = m.colores.fondo, choco = m.colores.tinta, frambuesa = m.colores.acento, mantequilla = "#f2b950";
const TEMAS = {
  crema: { bg: crema, txt: choco, acento: frambuesa, sub: "#6b574b", deco: frambuesa, pill: frambuesa, pillTxt: "#fff" },
  frambuesa: { bg: frambuesa, txt: "#fffdf9", acento: mantequilla, sub: "#f8dfe7", deco: "#ffffff", pill: "#fffdf9", pillTxt: frambuesa },
  choco: { bg: choco, txt: crema, acento: mantequilla, sub: "#d8c8ba", deco: frambuesa, pill: frambuesa, pillTxt: "#fff" }
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const plano = (s) => String(s).replace(/\*/g, "");

// Una línea con *resaltados* → tspans.
function linea(x, y, s, { size, weight = 700, t, color, anchor = "start", spacing = -1 }) {
  const partes = String(s).split(/(\*[^*]+\*)/).filter(Boolean);
  const spans = partes.map((p) => p.startsWith("*")
    ? `<tspan fill="${t.acento}">${esc(p.slice(1, -1))}</tspan>`
    : `<tspan>${esc(p)}</tspan>`).join("");
  return `<text x="${x}" y="${y}" font-family="${FUENTE}" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" fill="${color || t.txt}" text-anchor="${anchor}" xml:space="preserve">${spans}</text>`;
}

// Corta un párrafo en líneas de ~max caracteres; conserva los *resaltados* abiertos entre líneas.
function cortar(texto, max) {
  const out = []; let actual = "";
  for (const pal of String(texto).split(" ")) {
    const prueba = (actual + " " + pal).trim();
    if (plano(prueba).length > max && actual) { out.push(actual); actual = pal; } else actual = prueba;
  }
  if (actual) out.push(actual);
  let abierto = false;
  return out.map((l) => {
    let s = (abierto ? "*" : "") + l;
    const n = (l.match(/\*/g) || []).length;
    if (n % 2 === 1) abierto = !abierto;
    if (abierto) s += "*";
    return s;
  });
}

const tamTitulo = (lineas, max) => Math.min(max, Math.floor(ANCHO / (Math.max(...lineas.map((l) => plano(l).length)) * 0.54)));

function bloqueTitulo(lineas, y0, max, t) {
  const size = tamTitulo(lineas, max);
  const svg = lineas.map((l, i) => linea(X, y0 + i * size * 1.08, l, { size, t, spacing: -2 })).join("");
  return { svg, fin: y0 + (lineas.length - 1) * size * 1.08 };
}

function parrafo(texto, y0, t, { size = 40, max = 36, color } = {}) {
  const ls = cortar(texto, max);
  return { svg: ls.map((l, i) => linea(X, y0 + i * size * 1.38, l, { size, weight: 500, t, color: color || t.sub, spacing: 0 })).join(""), fin: y0 + (ls.length - 1) * size * 1.38 };
}

function marco(t, etiqueta, cuerpo, { pagina, desliza } = {}) {
  const ancho = 44 + plano(etiqueta).length * 17;
  const marca = t.bg === crema
    ? `<g transform="translate(${X - 8} ${H - 168}) scale(0.2)">${simbolo}</g>`
    : `<circle cx="${X + 32}" cy="${H - 128}" r="40" fill="${crema}"/><g transform="translate(${X - 4} ${H - 164}) scale(0.18)">${simbolo}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  <circle cx="${W - 40}" cy="70" r="230" fill="${t.deco}" opacity="0.07"/>
  <circle cx="${W - 110}" cy="${H - 250}" r="120" fill="${t.deco}" opacity="0.05"/>
  <rect x="${X}" y="104" width="${ancho}" height="54" rx="27" fill="${t.pill}"/>
  ${linea(X + ancho / 2, 140, etiqueta.toUpperCase(), { size: 24, t, color: t.pillTxt, anchor: "middle", spacing: 2 })}
  ${pagina ? linea(W - X, 140, pagina, { size: 26, weight: 600, t, color: t.sub, anchor: "end", spacing: 1 }) : ""}
  ${cuerpo}
  ${marca}
  ${linea(X + 92, H - 118, handle, { size: 30, weight: 700, t, spacing: 0 })}
  ${desliza ? linea(W - X, H - 118, "Desliza  →", { size: 30, weight: 700, t, color: t.acento, anchor: "end", spacing: 0 }) : ""}
</svg>`;
}

const plantillas = {
  frase(p, t) {
    const tit = bloqueTitulo(p.titulo, 340, 112, t);
    let y = tit.fin + 70;
    let svg = tit.svg + `<rect x="${X}" y="${y}" width="140" height="10" rx="5" fill="${t.acento}"/>`;
    svg += parrafo(p.texto.join(" "), y + 100, t, { size: 42, max: 34 }).svg;
    return svg;
  },
  lista(p, t) {
    const tit = bloqueTitulo(p.titulo, 320, 96, t);
    let y = tit.fin + 120, svg = tit.svg;
    p.items.forEach((item, i) => {
      const ls = cortar(item, 30);
      svg += `<circle cx="${X + 30}" cy="${y - 14}" r="30" fill="${t.acento}"/>`;
      svg += linea(X + 30, y - 2, String(i + 1), { size: 32, t, color: t.bg === crema ? "#fff" : choco, anchor: "middle" });
      ls.forEach((l, j) => { svg += linea(X + 92, y + j * 52, l, { size: 40, weight: 500, t, spacing: 0 }); });
      y += ls.length * 52 + 48;
    });
    return svg;
  },
  formula(p, t) {
    const tit = bloqueTitulo(p.titulo, 320, 104, t);
    let y = tit.fin + 70, svg = tit.svg;
    const lf = cortar(p.formula, 28), alto = lf.length * 60 + 76;
    const cajaBg = t.bg === crema ? choco : crema, cajaTxt = t.bg === crema ? crema : choco;
    svg += `<rect x="${X}" y="${y}" width="${ANCHO}" height="${alto}" rx="28" fill="${cajaBg}"/>`;
    lf.forEach((l, i) => { svg += linea(X + 44, y + 84 + i * 60, l, { size: 44, t, color: cajaTxt, spacing: 0 }); });
    y += alto + 96;
    for (const l of p.ejemplo.flatMap((e) => cortar(e, 34))) { svg += linea(X, y, l, { size: 40, weight: 500, t, color: t.sub, spacing: 0 }); y += 58; }
    return svg;
  }
};

const slides = {
  portada(s, t) {
    const tit = bloqueTitulo(s.titulo, 400, 124, t);
    return tit.svg + parrafo(s.sub, tit.fin + 110, t, { size: 44, max: 32 }).svg;
  },
  paso(s, t) {
    let svg = linea(X, 420, s.num, { size: 220, t, color: t.acento, spacing: -8 });
    const tit = cortar(s.titulo, 20);
    tit.forEach((l, i) => { svg += linea(X, 560 + i * 80, l, { size: 72, t, spacing: -2 }); });
    svg += parrafo(s.texto, 560 + tit.length * 80 + 60, t, { size: 44, max: 32, color: t.txt }).svg;
    return svg;
  },
  cierre(s, t) {
    const tit = bloqueTitulo(s.titulo, 400, 110, t);
    let svg = tit.svg + parrafo(s.texto, tit.fin + 110, t, { size: 42, max: 34 }).svg;
    svg += linea(X, 1060, "Guárdalo  ·  Compártelo", { size: 32, t, color: t.acento, spacing: 1 });
    return svg;
  }
};

let n = 0;
for (const p of posts) {
  const t = TEMAS[p.fondo || "crema"];
  if (p.tipo === "carrusel") {
    for (const [i, s] of p.slides.entries()) {
      // Alterna el fondo en los pasos para dar ritmo: portada y cierre con el tema del post.
      const ts = s.tipo === "paso" && p.fondo !== "crema" ? TEMAS.crema : t;
      const svg = marco(ts, p.etiqueta, slides[s.tipo](s, ts), { pagina: `${i + 1}/${p.slides.length}`, desliza: i === 0 });
      await sharp(Buffer.from(svg)).png().toFile(join(salida, `${p.id}-${i + 1}.png`)); n++;
    }
  } else {
    await sharp(Buffer.from(marco(t, p.etiqueta, plantillas[p.tipo](p, t)))).png().toFile(join(salida, `${p.id}.png`)); n++;
  }
}
console.log(`✅ ${posts.length} piezas (${n} imágenes) en marcas/${slug}/contenido/ig/`);
