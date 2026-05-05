#!/bin/bash
# =============================================================================
# install-mcp-servers.sh — Clona e instala todos os servidores MCP recomendados
# =============================================================================
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== Instalando Servidores MCP ==="
echo ""

declare -A REPOS=(
  ["perplexity"]="https://github.com/perplexityai/modelcontextprotocol.git"
  ["playwright"]="https://github.com/microsoft/playwright-mcp.git"
  ["firecrawl"]="https://github.com/firecrawl/firecrawl-mcp-server.git"
  ["glif"]="https://github.com/glifxyz/glif-mcp-server.git"
)

for server in "${!REPOS[@]}"; do
  url="${REPOS[$server]}"
  dir="$SCRIPT_DIR/$server"

  if [ -d "$dir" ]; then
    echo "⏭️  $server — já existe, pulando clone"
  else
    echo "📥 Clonando $server de $url..."
    git clone "$url" "$dir"
  fi

  if [ -f "$dir/package.json" ] && [ ! -d "$dir/node_modules" ]; then
    echo "📦 Instalando dependências de $server..."
    npm install --prefix "$dir"
  fi

  echo "✅ $server pronto"
  echo ""
done

echo "=== Todos os servidores MCP instalados! ==="
echo ""
echo "Próximos passos:"
echo "  1. Configure as variáveis de ambiente:"
echo "     export PERPLEXITY_API_KEY='sua-chave'"
echo "     export FIRECRAWL_API_KEY='sua-chave'"
echo "     export GLIF_API_TOKEN='seu-token'"
echo "  2. Para Playwright, instale os navegadores:"
echo "     cd playwright && npx playwright install"
