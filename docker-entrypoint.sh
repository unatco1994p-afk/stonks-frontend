#!/bin/sh
set -e

# jeśli nie ustawiono, dajemy fallback
: "${BACKEND_URL:=http://localhost:8080}"

# upewnij się, że folder assets istnieje
mkdir -p /usr/share/nginx/html/assets

# zapisz runtime config (nadpisze domyślny z obrazu)
cat > /usr/share/nginx/html/assets/config.json <<EOF
{"backendUrl":"${BACKEND_URL}"}
EOF

# uruchom CMD (nginx)
exec "$@"
