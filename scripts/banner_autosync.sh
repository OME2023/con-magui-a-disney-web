#!/usr/bin/env bash
set -euo pipefail

# --- Config ---
REPO_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/It Solutions/Proyectos web/con-magui-a-disney-web"
INBOX_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution.com/Mi unidad/It Solutions/Proyectos web/con-magui-a-disney-web/.banner-inbox"
TARGET_DIR="$REPO_DIR/assets/img/ppal"
INDEX_FILE="$REPO_DIR/index.html"
TARGET_PREFIX="assistcard-auto"
STATE_FILE="$REPO_DIR/.banner_autosync_state"
LOCK_FILE="/tmp/conmagui-banner-autosync.lock"
BRANCH="main"

mkdir -p "$INBOX_DIR"
mkdir -p "$TARGET_DIR"

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "[$(date '+%F %T')] banner_autosync already running"
  exit 0
fi

log() {
  echo "[$(date '+%F %T')] $*"
}

find_latest_image() {
  find "$INBOX_DIR" -maxdepth 1 -type f \( \
    -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.webp" -o -iname "*.avif" \
  \) -print0 | xargs -0 ls -1t 2>/dev/null | head -n 1
}

update_index_src() {
  local rel_path="$1"
  perl -0777 -i -pe "s#assets/img/ppal/assistcard[^\"']*#$rel_path#g" "$INDEX_FILE"
}

run_once() {
  local latest
  latest="$(find_latest_image || true)"
  if [[ -z "${latest:-}" ]]; then
    log "No image found in inbox: $INBOX_DIR"
    return 0
  fi

  local sha ext ext_lc target_name target_abs target_rel marker
  sha="$(shasum -a 256 "$latest" | awk '{print $1}')"
  ext="${latest##*.}"
  ext_lc="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
  target_name="${TARGET_PREFIX}.${ext_lc}"
  target_abs="$TARGET_DIR/$target_name"
  target_rel="assets/img/ppal/$target_name"
  marker="$sha|$target_name"

  if [[ -f "$STATE_FILE" ]] && [[ "$(cat "$STATE_FILE")" == "$marker" ]]; then
    log "Latest image already processed: $(basename "$latest")"
    return 0
  fi

  cp "$latest" "$target_abs"
  update_index_src "$target_rel"

  cd "$REPO_DIR"
  git add "$target_rel" index.html

  if git diff --cached --quiet; then
    log "No git changes to commit."
    echo "$marker" > "$STATE_FILE"
    return 0
  fi

  local stamp msg
  stamp="$(date '+%Y-%m-%d %H:%M:%S')"
  msg="auto: update Assist Card banner ($stamp)"
  git commit -m "$msg"
  git push origin "$BRANCH"

  echo "$marker" > "$STATE_FILE"
  log "Done. Updated with: $(basename "$latest") -> $target_name"
}

run_once

