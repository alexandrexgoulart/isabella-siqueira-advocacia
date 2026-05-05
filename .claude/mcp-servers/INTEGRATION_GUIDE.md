# MCP Servers Integration Guide

This document explains how to integrate and use the Model Context Protocol (MCP) servers with your Claude Code setup.

## Overview

MCP servers extend Claude's capabilities by providing access to external tools and services through a standardized protocol. The following servers are available:

1. **Perplexity** - Busca com IA (AI-powered search)
2. **Playwright** - Automação de navegador e testes E2E
3. **Firecrawl** - Web scraping e extração de conteúdo
4. **Glif** - Automação de fluxos de trabalho

## Installation

Install all servers at once using the provided script:

```bash
bash .claude/mcp-servers/install-mcp-servers.sh
```

Or install each server separately:

1. Navigate to `.claude/mcp-servers/`
2. Clone each server's repository
3. Run `npm install` in each server directory
4. Follow specific configuration in each server's README.md

## Configuration

After installation, configure Claude Code to recognize and use these MCP servers:

1. Add the MCP server configurations to your Claude settings (see `mcp-config.json`)
2. Set required environment variables:
   - `PERPLEXITY_API_KEY` — for Perplexity search
   - `FIRECRAWL_API_KEY` — for Firecrawl scraping
   - `GLIF_API_TOKEN` — for Glif automation
3. For Playwright, install browsers: `npx playwright install`
4. Test each integration to verify everything works correctly

## Usage

Once properly configured, these MCP servers will be available as tools within Claude Code:

- **Perplexity** — real-time web search with AI summaries
- **Playwright** — browser automation, E2E testing, screenshot capture
- **Firecrawl** — structured web scraping, content extraction, crawling
- **Glif** — visual workflow automation

## Verifying Status

```bash
bash .claude/mcp-servers/check-mcp-status.sh
```

## Next Steps

1. Run `install-mcp-servers.sh` to clone and install all servers
2. Configure environment variables with your API keys
3. Review each server's documentation in their respective directories
4. Test the integration with simple queries
