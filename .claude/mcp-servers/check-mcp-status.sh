#!/bin/bash
# =============================================================================
# check-mcp-status.sh — Verifica status dos servidores MCP instalados
# =============================================================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== Status dos Servidores MCP ==="
echo ""

for server in perplexity playwright firecrawl glif; do
  dir="$SCRIPT_DIR/$server"
  if [ -d "$dir" ]; then
    if [ -f "$dir/package.json" ]; then
      if [ -d "$dir/node_modules" ]; then
        echo "✅ $server — instalado e dependências OK"
      else
        echo "⚠️  $server — clonado, mas dependências não instaladas"
        echo "       Execute: cd .claude/mcp-servers/$server && npm install"
      fi
    else
      echo "⚠️  $server — diretório existe mas sem package.json"
    fi
  else
    echo "❌ $server — não instalado"
    echo "       Execute: bash .claude/mcp-servers/install-mcp-servers.sh"
  fi
done

echo ""
echo "Consulte README.md para instruções completas de instalação."
