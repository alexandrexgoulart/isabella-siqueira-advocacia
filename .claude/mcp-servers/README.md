# Servidores MCP para Claude Code

Este diretório contém os servidores MCP (Model Context Protocol) que estendem as capacidades do Claude Code.

## Servidores Instalados

1. [Perplexity](perplexity/README.md) - Busca com IA
2. [Playwright](playwright/README.md) - Automação de navegador e testes E2E
3. [Firecrawl](firecrawl/README.md) - Web scraping e extração de conteúdo
4. [Glif](glif/README.md) - Automação de fluxos de trabalho

## Instalação

Execute o script de instalação para clonar e instalar todos os servidores:

```bash
bash .claude/mcp-servers/install-mcp-servers.sh
```

Ou instale manualmente cada servidor:

```bash
cd .claude/mcp-servers

git clone https://github.com/perplexityai/modelcontextprotocol.git perplexity
git clone https://github.com/microsoft/playwright-mcp.git playwright
git clone https://github.com/firecrawl/firecrawl-mcp-server.git firecrawl
git clone https://github.com/glifxyz/glif-mcp-server.git glif

cd perplexity  && npm install && cd ..
cd playwright  && npm install && cd ..
cd firecrawl   && npm install && cd ..
cd glif        && npm install && cd ..
```

## Configuração das Variáveis de Ambiente

```bash
export PERPLEXITY_API_KEY="sua-chave-aqui"
export FIRECRAWL_API_KEY="sua-chave-aqui"
export GLIF_API_TOKEN="seu-token-aqui"
```

Para Playwright, instale os navegadores:

```bash
cd .claude/mcp-servers/playwright && npx playwright install
```

## Verificar Status

```bash
bash .claude/mcp-servers/check-mcp-status.sh
```

## Configuração

Após instalar os servidores, configure-os nas configurações do Claude Code para que fiquem disponíveis como plugins.
O arquivo `mcp-config.json` neste diretório contém a configuração de referência.

> **Nota:** Os repositórios dos servidores MCP não estão incluídos neste template.
> Use `install-mcp-servers.sh` para cloná-los no seu ambiente local.
