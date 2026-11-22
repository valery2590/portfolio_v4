#!/usr/bin/env bash
# Exporta los entregables de un post a ~/Documents/personal/marca-personal/integraciones-sin-drama/<fecha> - #N - <título>/.
# LinkedIn se publica en inglés y la story de Instagram en español.
# Uso: bash .claude/skills/nuevo-post/scripts/exportar.sh <slug>
#      bash .claude/skills/nuevo-post/scripts/exportar.sh <slug> --live   (descarga desde la web publicada)
set -euo pipefail

SLUG="${1:?Uso: exportar.sh <slug> [--live]}"
MODE="${2:-local}"
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
PORT=3199

# Carpeta destino: ~/Documents/personal/marca-personal/integraciones-sin-drama/<fecha> - #<N> - <título corto>/
# (el título corto es el título en español hasta los dos puntos; ':' y '?' no valen en nombres de carpeta).
FOLDER=$(python3 - "$ROOT/content/blog/$SLUG.ts" <<'PY'
import re, sys
src = open(sys.argv[1], encoding="utf-8").read()
num = re.search(r'number:\s*(\d+)', src).group(1)
date = re.search(r'date:\s*"([^"]+)"', src).group(1)
title = re.search(r'title:\s*"([^"]+)"', src).group(1)   # el primero es el de "es"
short = title.split(":")[0].replace("¿", "").replace("?", "").replace("/", "-").strip()
print(f"{date} - #{num} - {short}")
PY
)
OUT="${NUEVO_POST_DIR:-$HOME/Documents/personal/marca-personal/integraciones-sin-drama}/$FOLDER"
mkdir -p "$OUT"

if [ "$MODE" = "--live" ]; then
  BASE="https://valeryfigueroahuaman.com"
else
  BASE="http://localhost:$PORT"
  cd "$ROOT"
  npx next dev -p "$PORT" > /tmp/nuevo-post-dev.log 2>&1 &
  DEV_PID=$!
  trap 'kill $DEV_PID 2>/dev/null || true' EXIT
  for _ in $(seq 1 60); do
    curl -s -o /dev/null "$BASE/es" && break
    sleep 1
  done
fi

fetch() { # url destino
  local code
  code=$(curl -s -o "$2" -w "%{http_code}" "$1")
  if [ "$code" != "200" ]; then echo "✗ $1 → HTTP $code"; rm -f "$2"; return 1; fi
  echo "✓ $(basename "$2")"
}

fetch "$BASE/social/en/$SLUG/linkedin.txt" "$OUT/linkedin-en.txt"
fetch "$BASE/social/en/$SLUG/square.png" "$OUT/linkedin-en.png"
fetch "$BASE/social/es/$SLUG/story.png" "$OUT/story-instagram.png"

echo "→ $OUT"
command -v open >/dev/null && open "$OUT" || true
