#!/usr/bin/env bash
# Genera el PDF de entrega para Hotmart. Uso: bash entrega/generar-pdf.sh <URL_APP>
set -euo pipefail
cd "$(dirname "$0")"
URL="${1:?Falta la URL de la app}"
TMP="$(mktemp -d)"
sed "s#{{URL_APP}}#${URL}#g" guia-acceso.html > "$TMP/guia.html"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --print-to-pdf="$PWD/cuanto-cobro-acceso-y-guia.pdf" "file://$TMP/guia.html" 2>/dev/null
rm -rf "$TMP"
echo "OK → $PWD/cuanto-cobro-acceso-y-guia.pdf"
