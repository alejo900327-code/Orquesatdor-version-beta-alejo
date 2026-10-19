#!/usr/bin/env bash
# PreToolUse(Bash) de Alejo Cloud. Sale con 2 (bloquea) si:
#  1) el comando menciona una cuenta/org de la EMPRESA;
#  2) intenta publicar con wrangler por fuera del carril (scripts/deploy.sh).
command -v jq >/dev/null || exit 2
input=$(cat); cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty') || exit 2
[ -z "$cmd" ] && exit 0
. "${CLAUDE_PROJECT_DIR:-.}/scripts/_cuenta.sh"
if grep -qE "$CUENTAS_EMPRESA_RE" <<<"$cmd"; then
  echo "⛔ guardia-cuentas: el comando apunta a una cuenta de la EMPRESA. En Alejo Cloud solo se usa lo personal. Si de verdad hace falta, Alejo debe autorizarlo en el chat y correrlo él." >&2; exit 2
fi
while IFS= read -r seg || [ -n "$seg" ]; do
  if grep -qE 'wrangler[[:space:]]+((pages|versions)[[:space:]]+)?(deploy|publish)([[:space:]]|$)' <<<"$seg" && ! grep -q -- '--dry-run' <<<"$seg"; then
    echo "⛔ guardia-cuentas: no publiques con wrangler suelto. Usa el carril: bash scripts/deploy.sh <producto> (skill 'publicar')." >&2; exit 2
  fi
done < <(printf '%s' "$cmd" | tr ';|&' $'\n\n\n')
exit 0
