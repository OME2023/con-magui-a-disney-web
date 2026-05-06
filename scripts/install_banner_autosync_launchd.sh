#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/It Solutions/Proyectos web/con-magui-a-disney-web"
SCRIPT_PATH="$REPO_DIR/scripts/banner_autosync.sh"
PLIST_PATH="$HOME/Library/LaunchAgents/com.conmagui.banner-autosync.plist"
LOG_OUT="$HOME/Library/Logs/com.conmagui.banner-autosync.out.log"
LOG_ERR="$HOME/Library/Logs/com.conmagui.banner-autosync.err.log"

mkdir -p "$HOME/Library/LaunchAgents"
mkdir -p "$HOME/Library/Logs"

cat > "$PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.conmagui.banner-autosync</string>

    <key>ProgramArguments</key>
    <array>
      <string>/bin/bash</string>
      <string>$SCRIPT_PATH</string>
    </array>

    <key>StartInterval</key>
    <integer>60</integer>

    <key>RunAtLoad</key>
    <true/>

    <key>StandardOutPath</key>
    <string>$LOG_OUT</string>

    <key>StandardErrorPath</key>
    <string>$LOG_ERR</string>
  </dict>
</plist>
EOF

chmod 644 "$PLIST_PATH"
chmod +x "$SCRIPT_PATH"

launchctl unload "$PLIST_PATH" >/dev/null 2>&1 || true
launchctl load "$PLIST_PATH"

echo "Installed and loaded: $PLIST_PATH"
echo "OUT log: $LOG_OUT"
echo "ERR log: $LOG_ERR"

