# Status de Instalação dos Servidores MCP

Atualizado em: 04/05/2026

## Perplexity — Busca com IA
- [x] Diretório criado
- [x] Repositório clonado
- [x] Dependências instaladas (npm)
- [ ] API key configurada (`PERPLEXITY_API_KEY` em variáveis de ambiente)
- [ ] Testado e validado

**Configuração necessária:**
```bash
export PERPLEXITY_API_KEY="sua-chave-aqui"
```

---

## Playwright — Automação de Navegador e Testes E2E
- [x] Diretório criado
- [x] Repositório clonado
- [x] Dependências instaladas (npm)
- [ ] Navegadores instalados (`npx playwright install`)
- [ ] Testado e validado

**Configuração necessária:**
```bash
cd .claude/mcp-servers/playwright
npx playwright install
```

---

## Firecrawl — Web Scraping e Extração de Conteúdo
- [x] Diretório criado
- [x] Repositório clonado
- [x] Dependências instaladas (npm)
- [ ] API key configurada (`FIRECRAWL_API_KEY` em variáveis de ambiente)
- [ ] Testado e validado

**Configuração necessária:**
```bash
export FIRECRAWL_API_KEY="sua-chave-aqui"
```

---

## Glif — Automação de Fluxos de Trabalho
- [x] Diretório criado
- [x] Repositório clonado
- [x] Dependências instaladas (npm)
- [ ] Token configurado (`GLIF_API_TOKEN` em variáveis de ambiente)
- [ ] Testado e validado

**Configuração necessária:**
```bash
export GLIF_API_TOKEN="seu-token-aqui"
```

---

## Próximos Passos

1. Configurar as variáveis de ambiente com as API keys acima
2. Instalar os navegadores do Playwright
3. Referenciar os MCPs no arquivo de configuração do Claude Code
4. Testar cada servidor individualmente com `check-mcp-status.sh`
