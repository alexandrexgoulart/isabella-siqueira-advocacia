#!/bin/bash
# =============================================================================
# install-dependencies.sh — Instala dependências de todos os servidores MCP
# =============================================================================
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Instalando dependências dos servidores MCP..."

for server in perplexity playwright firecrawl glif; do
  dir="$SCRIPT_DIR/$server"
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    echo "Instalando dependências de $server..."
    npm install --prefix "$dir"
    echo "✅ $server — dependências instaladas"
  else
    echo "⚠️  $server — diretório não encontrado, execute install-mcp-servers.sh primeiro"
  fi
done

echo ""
echo "✅ Todas as dependências dos servidores MCP instaladas!"
