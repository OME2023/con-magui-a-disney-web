#!/bin/bash
set -euo pipefail

REPO_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/It Solutions/Proyectos web/con-magui-a-disney-web"
SOURCE_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney/inbox-banner"
CONTROL_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney"
ARCHIVE_DIR="$REPO_DIR/banner-inbox"
PUBLISHED_PATH="$REPO_DIR/assets/img/ppal/assistcard-auto.jpg"
MAX_ARCHIVE=5
LOG_FILE="$CONTROL_DIR/banner-proceso.txt"
TMP_RENDER="/private/tmp/conmagui/assistcard-auto-next.jpg"

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

log_event() {
  prepend_log_line "[$(date '+%F %T')] $1"
}

on_error() {
  local exit_code="$1"
  local step="$2"
  local source_name="${3:-sin archivo}"
  log_event "ERROR | paso: $step | archivo: $source_name | exit_code: $exit_code"
  exit "$exit_code"
}

latest_file="$(find "$SOURCE_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.avif" \) -print0 | xargs -0 ls -1t 2>/dev/null | head -n1 || true)"
[ -n "${latest_file:-}" ] || exit 0

timestamp="$(date '+%Y%m%d-%H%M%S')"
latest_name="$(basename "$latest_file")"
safe_name="$(echo "$latest_name" | tr ' /' '__')"
archive_path="$ARCHIVE_DIR/${timestamp}_${safe_name}"
lower_name="$(echo "$latest_name" | tr '[:upper:]' '[:lower:]')"

log_event "START | archivo: $latest_name | origen: $SOURCE_DIR | destino: $PUBLISHED_PATH | backup: banner-inbox/$(basename "$archive_path")"

if [[ "$lower_name" == *.jpg || "$lower_name" == *.jpeg ]]; then
  cp "$latest_file" "$TMP_RENDER"
else
  sips -s format jpeg "$latest_file" --out "$TMP_RENDER" >/dev/null
fi

cp "$TMP_RENDER" "$PUBLISHED_PATH" || on_error $? "publicar banner" "$latest_name"
cp "$latest_file" "$archive_path" || on_error $? "archivar archivo de agencia" "$latest_name"

ls -1t "$ARCHIVE_DIR" 2>/dev/null | tail -n +$((MAX_ARCHIVE + 1)) | while IFS= read -r old_file; do
  rm -f "$ARCHIVE_DIR/$old_file"
done

cd "$REPO_DIR"
git add "assets/img/ppal/assistcard-auto.jpg" "banner-inbox/" || on_error $? "git add" "$latest_name"
git commit -m "auto: publish assistcard banner ($timestamp) | source: $latest_name" || on_error $? "git commit" "$latest_name"
git push origin main || on_error $? "git push" "$latest_name"

rm -f "$latest_file" "$TMP_RENDER"
log_event "OK | archivo: $latest_name | publicado: assets/img/ppal/assistcard-auto.jpg | backup: banner-inbox/$(basename "$archive_path") | estado: commit y push realizados"
