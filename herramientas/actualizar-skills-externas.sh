#!/usr/bin/env bash
#
# actualizar-skills-externas.sh — Trae la última versión de las skills de terceros
# que viven en este repo, para que el equipo las reciba con un simple `git pull`.
#
#   - UI/UX Pro Max (nextlevelbuilder/ui-ux-pro-max-skill, MIT):
#       ui-ux-pro-max, design, brand, design-system, ui-styling, slides, banner-design
#       → .claude/skills/ y plugins/orquestador-skills/skills/
#   - impeccable (pbakaus/impeccable, Apache 2.0)
#       → .claude/skills/impeccable  (solo la skill; sin hooks)
#   - taste-skill (Leonxlnx/taste-skill, MIT): taste-skill + redesign-skill
#       → .claude/skills/
#
# ui-ux-pro-max, taste-skill y redesign-skill se marcan con
# `disable-model-invocation: true`: solo se usan cuando alguien las llama por su
# nombre, para que no compitan entre sí (ver INSTALACION-EQUIPO.md).
#
# Uso (desde la raíz del repo, en una rama nueva):
#   git checkout -b chore/actualizar-skills-externas origin/main
#   bash herramientas/actualizar-skills-externas.sh
#   git diff --stat        # revisar qué cambió
#   → commit + PR. Al fusionarlo, el equipo hace `git pull` y listo.
#
# No hace commit ni push: deja los cambios para revisarlos.

set -euo pipefail

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

UIUX_SKILLS=(ui-ux-pro-max design brand design-system ui-styling slides banner-design)

echo "→ Descargando ui-ux-pro-max-skill…"
git clone --depth 1 -q https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git "$TMP/uiux"
echo "→ Descargando impeccable…"
git clone --depth 1 -q https://github.com/pbakaus/impeccable.git "$TMP/impeccable"
echo "→ Descargando taste-skill…"
git clone --depth 1 -q https://github.com/Leonxlnx/taste-skill.git "$TMP/taste"

# Marca una skill para que solo se use cuando se la llama por su nombre.
solo_manual() {
  python3 - "$1" <<'PY'
import re, sys
p = sys.argv[1]
s = open(p).read()
if 'disable-model-invocation:' not in s.split('\n---', 1)[0]:
    s = re.sub(r'^(---\n(?:.*\n)*?name:[^\n]*\n)', r'\1disable-model-invocation: true\n', s, count=1)
open(p, 'w').write(s)
PY
}

# --- UI/UX Pro Max -----------------------------------------------------------
for destino in "$RAIZ/.claude/skills" "$RAIZ/plugins/orquestador-skills/skills"; do
  for k in "${UIUX_SKILLS[@]}"; do
    rm -rf "${destino:?}/$k"
    cp -R "$TMP/uiux/.claude/skills/$k" "$destino/$k"
    find "$destino/$k" -type d \( -name tests -o -name __pycache__ \) -prune -exec rm -rf {} +
  done
  cp "$TMP/uiux/LICENSE" "$destino/ui-ux-pro-max/LICENSE-ui-ux-pro-max.txt"
  # La ruta original (${CLAUDE_PLUGIN_ROOT}/.claude/skills/...) solo existe en el repo
  # del autor; la apuntamos al directorio de la propia skill.
  python3 - "$destino/ui-ux-pro-max/SKILL.md" <<'PY'
import sys
p = sys.argv[1]
s = open(p).read()
s = s.replace('${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max/', '<SKILL_DIR>/')
s = s.replace(
    "Always invoke it by its full path — do not assume a particular working directory:",
    "Always invoke it by its full path — do not assume a particular working directory. "
    "`<SKILL_DIR>` is this skill's base directory (the folder containing this SKILL.md, "
    "shown as \"Base directory for this skill\" when the skill loads):", 1)
open(p, 'w').write(s)
PY
  solo_manual "$destino/ui-ux-pro-max/SKILL.md"
done

# --- taste-skill -------------------------------------------------------------
for k in taste-skill redesign-skill; do
  rm -rf "$RAIZ/.claude/skills/$k"
  cp -R "$TMP/taste/skills/$k" "$RAIZ/.claude/skills/$k"
  cp "$TMP/taste/LICENSE" "$RAIZ/.claude/skills/$k/LICENSE-taste-skill.txt"
  solo_manual "$RAIZ/.claude/skills/$k/SKILL.md"
done
rm -rf "$RAIZ/.claude/skills/taste-skill/evals"

# --- impeccable --------------------------------------------------------------
rm -rf "$RAIZ/.claude/skills/impeccable"
cp -R "$TMP/impeccable/.claude/skills/impeccable" "$RAIZ/.claude/skills/impeccable"
cp "$TMP/impeccable/LICENSE" "$RAIZ/.claude/skills/impeccable/LICENSE-impeccable.txt"
cp "$TMP/impeccable/NOTICE.md" "$RAIZ/.claude/skills/impeccable/NOTICE-impeccable.md"

# --- Resumen -----------------------------------------------------------------
UIUX_VER=$(python3 -c "import json;print(json.load(open('$TMP/uiux/.claude-plugin/plugin.json'))['version'])")
IMP_VER=$(sed -n 's/^version: *//p' "$TMP/impeccable/.claude/skills/impeccable/SKILL.md" | head -1)
echo
echo "✓ ui-ux-pro-max $UIUX_VER  (commit $(git -C "$TMP/uiux" rev-parse --short HEAD))"
echo "✓ impeccable    $IMP_VER  (commit $(git -C "$TMP/impeccable" rev-parse --short HEAD))"
echo "✓ taste-skill   $(python3 -c "import json;print(json.load(open('$TMP/taste/.claude-plugin/plugin.json'))['version'])")  (commit $(git -C "$TMP/taste" rev-parse --short HEAD))"
echo
echo "Siguiente: git diff --stat, sube la versión del plugin en"
echo "plugins/orquestador-skills/.claude-plugin/plugin.json si cambió UI/UX Pro Max, y abre el PR."
