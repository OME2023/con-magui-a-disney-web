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

latest_file="$(find "$SOURCE_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.avif" \) -print0 | xargs -0 ls -1t 2>/dev/null | head -n1 || true)"
[ -n "${latest_file:-}" ] || exit 0

timestamp="$(date '+%Y%m%d-%H%M%S')"
latest_name="$(basename "$latest_file")"
safe_name="$(echo "$latest_name" | tr ' /' '__')"
archive_path="$ARCHIVE_DIR/${timestamp}_${safe_name}"
lower_name="$(echo "$latest_name" | tr '[:upper:]' '[:lower:]')"

# Render temporal en .jpg para comparación/ publicación
if [[ "$lower_name" == *.jpg || "$lower_name" == *.jpeg ]]; then
  cp "$latest_file" "$TMP_RENDER"
else
  sips -s format jpeg "$latest_file" --out "$TMP_RENDER" >/dev/null
fi

# Si el banner resultante es igual al actual, no duplicar historial
new_sha="$(shasum -a 256 "$TMP_RENDER" | awk '{print $1}')"
current_sha=""
if [ -f "$PUBLISHED_PATH" ]; then
  current_sha="$(shasum -a 256 "$PUBLISHED_PATH" | awk '{print $1}')"
fi

if [ -n "$current_sha" ] && [ "$new_sha" = "$current_sha" ]; then
  rm -f "$latest_file" "$TMP_RENDER"
  echo "[$(date '+%F %T')] SKIP | archivo: $latest_name | motivo: mismo contenido que banner activo" >> "$LOG_FILE"
  exit 0
fi

cp "$TMP_RENDER" "$PUBLISHED_PATH"
cp "$latest_file" "$archive_path"

# Mantener solo los últimos 5 en historial visible (antes del git add)
ls -1t "$ARCHIVE_DIR" 2>/dev/null | tail -n +$((MAX_ARCHIVE + 1)) | while IFS= read -r old_file; do
  rm -f "$ARCHIVE_DIR/$old_file"
done

cd "$REPO_DIR"
git add "assets/img/ppal/assistcard-auto.jpg" "banner-inbox/"
if git diff --cached --quiet; then
  # Si no hubo cambios reales, igual limpiamos el archivo de entrada
  rm -f "$latest_file" "$TMP_RENDER"
  echo "[$(date '+%F %T')] SKIP | archivo: $latest_name | motivo: sin cambios para git" >> "$LOG_FILE"
  exit 0
fi

git commit -m "auto: publish assistcard banner ($timestamp)"
git push origin main

# Solo borramos el origen si la publicación fue exitosa
rm -f "$latest_file" "$TMP_RENDER"
echo "[$(date '+%F %T')] OK   | archivo: $latest_name | publicado: assets/img/ppal/assistcard-auto.jpg | backup: banner-inbox/$(basename "$archive_path")" >> "$LOG_FILE"
