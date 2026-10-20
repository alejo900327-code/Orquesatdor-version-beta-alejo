// Genera la foto de perfil y la portada de Facebook de un producto a partir de su marca.json.
//   node scripts/activos/generar-imagenes.mjs <slug>
// Lee marcas/<slug>/marca.json (marca paraguas) o productos/<slug>/marca/marca.json (marca de producto).
// Salida, en esa misma carpeta: perfil.png (1080×1080) y portada-facebook.png (1640×624).
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const slug = process.argv[2];
if (!slug) { console.error("Uso: node scripts/activos/generar-imagenes.mjs <slug>"); process.exit(1); }
const paraguas = join(raiz, "marcas", slug);
const dir = existsSync(join(paraguas, "marca.json")) ? paraguas : join(raiz, "productos", slug, "marca");
const m = JSON.parse(readFileSync(join(dir, "marca.json"), "utf8"));
const { fondo, tinta, acento } = m.colores;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const serif = "Georgia, 'Times New Roman', serif";
const sans = "Helvetica Neue, Helvetica, Arial, sans-serif";

// Si la marca ya eligió logo (marca.json → logo), se usa su símbolo; si no, el monograma provisional.
const simbolo = m.logo?.simbolo
  ? readFileSync(join(dir, m.logo.simbolo), "utf8").replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")
  : null;
const palabra = (x, y, txt, fill, size) =>
  `<text x="${x}" y="${y}" font-family="Avenir Next" font-weight="700" font-size="${size}" letter-spacing="-4" fill="${fill}">${esc(txt)}</text>`;

// Perfil: monograma centrado dentro del círculo que recorta Instagram/Facebook.
const perfil = `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
  <rect width="1080" height="1080" fill="${acento}"/>
  <circle cx="540" cy="540" r="430" fill="${fondo}"/>
  <text x="540" y="540" dy="0.35em" text-anchor="middle" font-family="${serif}" font-weight="700"
        font-size="${m.monograma.length > 2 ? 330 : m.monograma.length === 2 ? 340 : 420}" letter-spacing="${m.monograma.length === 2 ? 12 : 0}" fill="${tinta}">${esc(m.monograma || m.nombre.slice(0, 2))}</text>
</svg>`;

// Portada: el contenido va en el centro (Facebook recorta los lados en el celular).
const [linea1, ...resto] = m.nombre.toLowerCase().split(" ");
const portada = simbolo ? `
<svg xmlns="http://www.w3.org/2000/svg" width="1640" height="624">
  <rect width="1640" height="624" fill="${fondo}"/>
  <rect x="0" y="560" width="1640" height="64" fill="${acento}"/>
  <g transform="translate(330 100) scale(0.85)">${simbolo}</g>
  ${palabra(700, 245, linea1, tinta, 124)}
  ${palabra(700, 365, resto.join(" "), acento, 124)}
  <text x="704" y="445" font-family="${sans}" font-size="38" fill="${tinta}">${esc(m.tagline)}</text>
</svg>` : `
<svg xmlns="http://www.w3.org/2000/svg" width="1640" height="624">
  <rect width="1640" height="624" fill="${fondo}"/>
  <rect x="0" y="560" width="1640" height="64" fill="${acento}"/>
  <text x="820" y="250" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="120" fill="${tinta}">${esc(m.nombre)}</text>
  <text x="820" y="350" text-anchor="middle" font-family="${sans}" font-size="52" fill="${tinta}">${esc(m.tagline)}</text>
  <text x="820" y="440" text-anchor="middle" font-family="${sans}" font-weight="700" font-size="40" fill="${acento}">Calculadora gratis en el enlace</text>
</svg>`;

if (m.logo?.perfil) await sharp(join(dir, m.logo.perfil)).png().toFile(join(dir, "perfil.png"));
else await sharp(Buffer.from(perfil)).png().toFile(join(dir, "perfil.png"));
await sharp(Buffer.from(portada)).png().toFile(join(dir, "portada-facebook.png"));
console.log(`✅ ${dir.replace(raiz + "/", "")}/perfil.png y portada-facebook.png`);
