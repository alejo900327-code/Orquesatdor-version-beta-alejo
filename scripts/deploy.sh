#!/usr/bin/env bash
# ÚNICO carril de deploy de Alejo Cloud.   bash scripts/deploy.sh <slug> [--dry-run]
# 1) valida el producto y que su wrangler.toml apunte SOLO a la cuenta personal
# 2) gate: repo personal, árbol limpio y HEAD == origin/main (prod = lo que está en GitHub)
# 3) punto de rollback (versión actual) → 4) wrangler deploy → 5) smoke (HTTP 200 + <title>)
# 6) anota en productos/<slug>/DEPLOYS.md
# Escape para pruebas rápidas: ALLOW_UNPUSHED=1 salta el gate 2 (queda anotado).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; . "$ROOT/scripts/_cuenta.sh"
SLUG="${1:-}"; [ -n "$SLUG" ] || { echo "Uso: deploy.sh <slug> [--dry-run]. Productos:"; ls "$ROOT/productos"; exit 1; }
shift; DRY=0; for f in "$@"; do [ "$f" = "--dry-run" ] && DRY=1; done
DIR="$ROOT/productos/$SLUG"; TOML="$DIR/wrangler.toml"
[ -f "$TOML" ] || { echo "❌ No existe productos/$SLUG/wrangler.toml" >&2; exit 1; }

# 1) Cuenta: solo la personal.
grep -qE "^account_id *= *\"$CUENTA_PERSONAL\"" "$TOML" || { echo "⛔ $TOML no fija account_id personal ($CUENTA_PERSONAL)." >&2; exit 2; }
if grep -rqE "$CUENTAS_EMPRESA_RE" "$DIR" --include=*.toml --include=*.json --include=*.jsonc; then echo "⛔ Hay IDs de la empresa en productos/$SLUG." >&2; exit 2; fi
export CLOUDFLARE_ACCOUNT_ID="$CUENTA_PERSONAL"

# 2) Gate anti-deriva.
REMOTE=$(git -C "$ROOT" remote get-url origin 2>/dev/null || true)
[[ "$REMOTE" == *"github.com"*"$GITHUB_PERSONAL/"* ]] || { echo "⛔ El remoto no es tu GitHub personal: $REMOTE" >&2; exit 2; }
SALTO=""
if [ "$DRY" -eq 0 ]; then
  git -C "$ROOT" fetch -q origin main 2>/dev/null || echo "⚠️  Sin red para fetch; uso el último origin/main." >&2
  if [ "${ALLOW_UNPUSHED:-0}" = 1 ]; then SALTO=" (sin subir a GitHub)"; echo "⚠️  ALLOW_UNPUSHED=1: se salta el gate." >&2
  else
    [ -z "$(git -C "$ROOT" status --porcelain -- "productos/$SLUG")" ] || { echo "⛔ productos/$SLUG tiene cambios sin commit. Haz commit y push primero." >&2; exit 2; }
    [ "$(git -C "$ROOT" rev-parse HEAD)" = "$(git -C "$ROOT" rev-parse origin/main)" ] || { echo "⛔ HEAD ≠ origin/main. Haz push (o pull) antes de desplegar." >&2; exit 2; }
  fi
fi

W=("$ROOT/node_modules/.bin/wrangler"); [ -x "${W[0]}" ] || W=(npx --yes wrangler@4)
cd "$DIR"
if [ "$DRY" -eq 1 ]; then "${W[@]}" deploy --dry-run --outdir "${TMPDIR:-/tmp}/ac-$SLUG"; echo "✅ dry-run OK"; exit 0; fi

# 3) Punto de rollback.
PREV=$("${W[@]}" deployments list --json 2>/dev/null | jq -r '.[-1].versions[0].version_id // empty' 2>/dev/null || true)
echo "↩️  Rollback: ${PREV:-(primer deploy, no hay versión previa)}"

# 4) Deploy.
LOG="$(mktemp)"; "${W[@]}" deploy 2>&1 | tee "$LOG"
VER=$(grep -oE 'Current Version ID: [0-9a-f-]+' "$LOG" | awk '{print $4}' || true)

# 5) Smoke: cada URL que imprimió wrangler → 200 + <title>.
RES="ok"; URLS=$(grep -oE 'https://[a-zA-Z0-9./-]+' "$LOG" | grep -vE 'cloudflare.com|dash\.' | sort -u)
for u in $URLS; do
  ok=0; for i in 1 2 3 4 5 6; do code=$(curl -s -o "$LOG.html" -w '%{http_code}' "$u" || true); [ "$code" = 200 ] && { ok=1; break; }; sleep 5; done
  t=$(grep -oE '<title>[^<]*' "$LOG.html" 2>/dev/null | sed 's/<title>//' || true)
  if [ $ok = 1 ]; then echo "✅ $u → 200 «$t»"; else echo "❌ $u → $code"; RES="FALLÓ smoke"; fi
done

# 6) Bitácora.
echo "| $(date '+%Y-%m-%d %H:%M') | $(git -C "$ROOT" rev-parse --short HEAD)$SALTO | ${VER:-?} | ${URLS//$'\n'/ } | $RES |" >> "$DIR/DEPLOYS.md"
[ "$RES" = ok ] || { echo "⚠️  Smoke falló. Rollback: npx wrangler rollback ${PREV:-<sin previa>}"; exit 3; }
echo "🚀 Publicado: $SLUG  versión ${VER:-?}"
