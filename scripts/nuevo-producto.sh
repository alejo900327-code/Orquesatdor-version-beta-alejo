#!/usr/bin/env bash
# Crea la carpeta de un producto listo para desplegar en el Cloudflare PERSONAL.
#   bash scripts/nuevo-producto.sh <slug> [dominio]
#   ej: bash scripts/nuevo-producto.sh decide-tu decidetu.com
# Sin dominio, el producto sale en <slug>.<subdominio>.workers.dev.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; . "$ROOT/scripts/_cuenta.sh"
SLUG="${1:?Uso: nuevo-producto.sh <slug> [dominio]}"; DOMINIO="${2:-}"
[[ "$SLUG" =~ ^[a-z0-9-]+$ ]] || { echo "❌ El slug solo admite minúsculas, números y guiones." >&2; exit 1; }
DIR="$ROOT/productos/$SLUG"; [ -e "$DIR" ] && { echo "❌ Ya existe productos/$SLUG" >&2; exit 1; }
mkdir -p "$DIR/public"
{
  echo "# Producto: $SLUG — Cloudflare PERSONAL. No cambiar account_id."
  echo "name = \"$SLUG\""
  echo "compatibility_date = \"2026-10-01\""
  echo "account_id = \"$CUENTA_PERSONAL\""
  echo "workers_dev = true"
  echo
  echo "[assets]"
  echo "directory = \"./public\""
  if [ -n "$DOMINIO" ]; then
    echo
    echo "[[routes]]"
    echo "pattern = \"$DOMINIO\""
    echo "custom_domain = true"
  fi
} > "$DIR/wrangler.toml"
cat > "$DIR/public/index.html" <<HTML
<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>$SLUG</title></head><body style="font-family:system-ui;max-width:640px;margin:15vh auto;padding:0 16px">
<h1>$SLUG</h1><p>Página en construcción.</p></body></html>
HTML
printf '# Bitácora de deploys — %s\n\n| Fecha | Commit | Versión | URL | Resultado |\n|---|---|---|---|---|\n' "$SLUG" > "$DIR/DEPLOYS.md"
echo "✅ Creado productos/$SLUG ${DOMINIO:+(dominio $DOMINIO)}"
