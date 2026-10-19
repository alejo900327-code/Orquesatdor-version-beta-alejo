#!/usr/bin/env bash
# Mueve los paquetes de investigar-redes de ~/Downloads a la carpeta de la investigación y los extrae.
#   bash desempacar.sh <nombre-investigacion>
# Resultado: ~/Desktop/Videos-IA/referencias/<AAAA-MM>-<nombre>/{instagram,meta-ads}/
set -euo pipefail
NOMBRE="${1:?Uso: desempacar.sh <nombre-investigacion>}"
DEST="$HOME/Desktop/Videos-IA/referencias/$(date +%Y-%m)-$NOMBRE"
mkdir -p "$DEST/instagram" "$DEST/meta-ads"
shopt -s nullglob
n=0
for f in "$HOME"/Downloads/ig_*.tar; do tar -xf "$f" -C "$DEST/instagram" && rm "$f" && n=$((n+1)); done
for f in "$HOME"/Downloads/meta_*.tar; do tar -xf "$f" -C "$DEST/meta-ads" && rm "$f" && n=$((n+1)); done
echo "Paquetes extraídos: $n"
echo "Vídeos: $(find "$DEST" -name '*.mp4' | wc -l | tr -d ' ')  ·  Metadatos: $(find "$DEST" -name 'metadata_*.json' | wc -l | tr -d ' ')"
echo "Carpeta: $DEST"
