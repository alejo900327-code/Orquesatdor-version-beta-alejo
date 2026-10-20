// Opciones de logo de Receta Rentable: símbolo (SVG) + perfil 1080 + versión horizontal.
//   node marcas/receta-rentable/logo/generar.mjs
// Cada símbolo vive en un lienzo de 400×400 para poder escalarlo igual en todas las piezas.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dir = dirname(fileURLToPath(import.meta.url));
const C = { choco: "#2b1d16", frambuesa: "#b8325a", mantequilla: "#f2b950", crema: "#fbf6ef", blanco: "#fffdf9" };

// A · "Pastel que crece": tres capas de pastel que suben como una gráfica, con cereza arriba.
function pastelQueCrece() {
  const base = 318, ancho = 78, tops = [238, 178, 112], xs = [64, 161, 258];
  let s = "";
  xs.forEach((x, i) => {
    const top = tops[i];
    s += `<rect x="${x}" y="${top}" width="${ancho}" height="${base - top + 6}" rx="14" fill="${C.mantequilla}"/>`;
    for (let y = top + 40; y < base - 14; y += 34) s += `<rect x="${x}" y="${y}" width="${ancho}" height="9" fill="${C.crema}"/>`;
    // Ganache con gotas.
    s += `<rect x="${x}" y="${top}" width="${ancho}" height="24" rx="12" fill="${C.choco}"/>`;
    s += `<rect x="${x + 12}" y="${top + 12}" width="13" height="${22 + i * 2}" rx="6.5" fill="${C.choco}"/>`;
    s += `<rect x="${x + 48}" y="${top + 12}" width="13" height="${14 + i * 3}" rx="6.5" fill="${C.choco}"/>`;
  });
  const cx = xs[2] + ancho / 2, cy = tops[2] - 24;
  s += `<path d="M${cx} ${cy - 18} q 6 -26 30 -34" stroke="${C.choco}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="22" fill="${C.frambuesa}"/>`;
  s += `<circle cx="${cx - 7}" cy="${cy - 7}" r="6" fill="${C.blanco}" opacity=".7"/>`;
  s += `<rect x="40" y="${base}" width="320" height="18" rx="9" fill="${C.choco}"/>`;
  return s;
}

// B · "Etiqueta con batidor": la etiqueta de precio es el negocio; el batidor, la cocina.
function etiquetaBatidor() {
  return `<g transform="rotate(-12 200 200)">
    <path d="M118 84 H306 a26 26 0 0 1 26 26 V290 a26 26 0 0 1 -26 26 H118 L58 200 Z" fill="${C.frambuesa}"/>
    <circle cx="104" cy="200" r="15" fill="${C.crema}"/>
    <g stroke="${C.crema}" stroke-width="11" fill="none" stroke-linecap="round">
      <path d="M222 236 C162 196 168 108 222 108 C276 108 282 196 222 236"/>
      <path d="M222 236 C194 196 198 132 222 132 C246 132 250 196 222 236"/>
      <path d="M222 236 V114"/>
    </g>
    <rect x="210" y="232" width="24" height="68" rx="12" fill="${C.crema}"/>
  </g>`;
}

const opciones = [
  { id: "a-pastel-que-crece", simbolo: pastelQueCrece(), fondoPerfil: C.crema },
  { id: "b-etiqueta-batidor", simbolo: etiquetaBatidor(), fondoPerfil: C.crema }
];

const palabra = (y, txt, fill) =>
  `<text x="0" y="${y}" font-family="Avenir Next" font-weight="700" font-size="150" letter-spacing="-5" fill="${fill}">${txt}</text>`;

for (const o of opciones) {
  const simbolo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">${o.simbolo}</svg>`;
  writeFileSync(join(dir, `${o.id}-simbolo.svg`), simbolo);

  // Perfil: símbolo centrado dentro del círculo que recortan Instagram y Facebook.
  const perfil = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
    <rect width="1080" height="1080" fill="${o.fondoPerfil}"/>
    <g transform="translate(190 180) scale(1.75)">${o.simbolo}</g></svg>`;
  await sharp(Buffer.from(perfil)).png().toFile(join(dir, `${o.id}-perfil.png`));

  // Horizontal: símbolo + "receta / rentable" en dos líneas.
  const horizontal = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="480">
    <rect width="1400" height="480" fill="${C.crema}"/>
    <g transform="translate(30 40)">${o.simbolo}</g>
    <g transform="translate(470 0)">${palabra(225, "receta", C.choco)}${palabra(375, "rentable", C.frambuesa)}</g></svg>`;
  writeFileSync(join(dir, `${o.id}-horizontal.svg`), horizontal);
  await sharp(Buffer.from(horizontal)).png().toFile(join(dir, `${o.id}-horizontal.png`));
}
console.log("✅ opciones de logo en marcas/receta-rentable/logo/");
