#!/bin/bash
set -euo pipefail

REPO_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/It Solutions/Proyectos web/con-magui-a-disney-web"
SOURCE_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney/inbox-banner"
CONTROL_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney"
ARCHIVE_DIR="$REPO_DIR/banner-inbox"
PUBLISHED_PATH="$REPO_DIR/assets/img/ppal/assistcard-auto.jpg"
MAX_ARCHIVE=5
LOG_FILE="$CONTROL_DIR/banner-proceso.txt"
TMP_RENDER="/tmp/assistcard-auto-next.jpg"

mkdir -p "$ARCHIVE_DIR"
touch "$LOG_FILE"

prepend_log_line() {
  local line="$1"
  local tmp_log
  tmp_log="$(mktemp)"
  printf '%s\n' "$line" > "$tmp_log"
  cat "$LOG_FILE" >> "$tmp_log"
  mv "$tmp_log" "$LOG_FILE"
}

latest_file="$(find "$SOURCE_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.avif" \) -print0 | xargs -0 ls -1t 2>/dev/null | head -n1 || true)"
[ -n "${latest_file:-}" ] || exit 0

timestamp="$(date '+%Y%m%d-%H%M%S')"
latest_name="$(basename "$latest_file")"
safe_name="$(echo "$latest_name" | tr ' /' '__')"
archive_path="$ARCHIVE_DIR/${timestamp}_${safe_name}"
lower_name="$(echo "$latest_name" | tr '[:upper:]' '[:lower:]')"

# Render temporal en .jpg para publicación
if [[ "$lower_name" == *.jpg || "$lower_name" == *.jpeg ]]; then
  cp "$latest_file" "$TMP_RENDER"
else
  sips -s format jpeg "$latest_file" --out "$TMP_RENDER" >/dev/null
fi

cp "$TMP_RENDER" "$PUBLISHED_PATH"
cp "$latest_file" "$archive_path"

# Mantener solo los últimos 5 en historial visible (antes del git add)
ls -1t "$ARCHIVE_DIR" 2>/dev/null | tail -n +$((MAX_ARCHIVE + 1)) | while IFS= read -r old_file; do
  rm -f "$ARCHIVE_DIR/$old_file"
done

cd "$REPO_DIR"
git add "assets/img/ppal/assistcard-auto.jpg" "banner-inbox/"
git commit -m "auto: publish assistcard banner ($timestamp) | source: $latest_name"
git push origin main

# Solo borramos el origen si la publicación fue exitosa
rm -f "$latest_file" "$TMP_RENDER"
prepend_log_line "[$(date '+%F %T')] OK   | archivo: $latest_name | publicado: assets/img/ppal/assistcard-auto.jpg | backup: banner-inbox/$(basename "$archive_path")"
