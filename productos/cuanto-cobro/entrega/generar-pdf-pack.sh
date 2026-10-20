#!/usr/bin/env bash
# Genera el PDF del order bump desde pack-30-recetas.md. Uso: bash entrega/generar-pdf-pack.sh
set -euo pipefail
cd "$(dirname "$0")"
TMP="$(mktemp -d)"
npx -y marked@12.0.2 -i pack-30-recetas.md -o "$TMP/cuerpo.html" >/dev/null 2>&1
{ cat <<'H'
<!doctype html><html lang="es"><head><meta charset="utf-8"><title>30 recetas base costeables</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:16mm 16mm 18mm}
:root{--fondo:#fbf6ef;--tinta:#2b1d16;--acento:#b8325a;--suave:#efe4d6;--gris:#6b5a50}
body{font-family:Inter,system-ui,sans-serif;color:var(--tinta);font-size:10.5pt;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2,h3{font-family:Fraunces,Georgia,serif;line-height:1.15}
h1{font-size:30pt;color:var(--acento);margin:0 0 4mm}
h2{font-size:17pt;color:var(--acento);margin:8mm 0 3mm;page-break-after:avoid}
h3{font-size:13pt;margin:7mm 0 2mm;page-break-after:avoid;border-top:2px solid var(--suave);padding-top:4mm}
table{width:100%;border-collapse:collapse;margin:2mm 0 3mm;font-size:9.8pt;page-break-inside:avoid}
th{background:var(--suave);text-align:left;padding:1.6mm 2mm}
td{padding:1.4mm 2mm;border-bottom:1px solid var(--suave)}
blockquote{margin:3mm 0;padding:3mm 5mm;background:#fff;border-left:4px solid var(--acento);border-radius:6px}
hr{border:none;border-top:1px solid var(--suave);margin:6mm 0}
.portada{height:250mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:var(--fondo);page-break-after:always;margin:-16mm -16mm 0;padding:0 20mm}
.mono{width:38mm;height:38mm;border-radius:50%;background:var(--acento);color:var(--fondo);display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-size:32pt;font-weight:700;margin-bottom:10mm}
.portada p{font-size:13pt;color:var(--gris)}
</style></head><body>
<section class="portada"><div class="mono">¿$?</div><h1>30 recetas base<br>costeables</h1><p>Bonus de ¿Cuánto Cobro?<br>Importa las recetas a tu app y solo pon tus precios.</p><p style="margin-top:14mm;font-size:11pt">Autoría: Receta Rentable · © 2026 · Prohibida su reventa</p></section>
H
sed '1{/^# /d;}' "$TMP/cuerpo.html"
echo '</body></html>'; } > "$TMP/pack.html"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="$PWD/30-recetas-base-costeables.pdf" "file://$TMP/pack.html" 2>/dev/null
rm -rf "$TMP"; echo "OK → $PWD/30-recetas-base-costeables.pdf"
