#!/bin/bash
cd "$(dirname "$0")"
echo "Iniciando servidor local do Portfólio..."
node server.js &
SERVER_PID=$!
sleep 1
open "http://localhost:8080"
wait $SERVER_PID
