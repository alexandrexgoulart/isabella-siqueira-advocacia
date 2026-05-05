# Isabella Siqueira Advocacia

## Visão Geral do Projeto

Site institucional para escritório de advocacia especializado em **Direito Previdenciário**.

- **Stack:** HTML5, CSS3, JavaScript vanilla (sem frameworks)
- **Hospedagem:** GitHub Pages
- **URL:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/
- **Público-alvo:** Idosos e pessoas buscando advogada previdenciária

## Estrutura de Diretórios

```
isabella-siqueira-advocacia/
├── .claude/                    # Configurações do Claude Code
│   ├── agents/                 # Agentes especializados
│   ├── commands/               # Comandos customizados
│   ├── memory/                 # Memória do projeto
│   ├── rules/                  # Regras de código
│   └── skills/                 # Skills do Claude Code
├── .ai/memory/                 # Memória de IA auxiliar
├── docs/                       # Documentação do projeto
├── optimized_video/            # Vídeo otimizado (~4.3MB)
├── index.html                  # Página única (single-page)
├── styles.css                  # Estilos — paleta Navy+Gold+Ivory
├── script.js                   # JavaScript principal
├── foto_sobre.avif             # Foto da advogada (seção about)
├── isabella_sobre.avif         # Foto hero
├── CLAUDE.md                   # Este arquivo (contexto do Claude Code)
├── README.md                   # Documentação pública do repositório
└── docs/README.md              # Documentação técnica detalhada
```

## Paleta de Cores Atual

| Variável CSS       | Valor     | Uso                        |
|--------------------|-----------|----------------------------|
| `--primary`        | `#1A2B4A` | Navy — autoridade jurídica |
| `--primary-light`  | `#243657` | Navy médio                 |
| `--accent`         | `#C5964B` | Gold — sofisticação        |
| `--accent-hover`   | `#A87B38` | Gold escuro (hover)        |
| `--bg-light`       | `#F8F6F1` | Ivory — fundo principal    |
| `--bg-card`        | `#FFFFFF` | Branco — cards             |
| `--success`        | `#059669` | Verde — WhatsApp           |
| `--text`           | `#1A1A1A` | Texto principal            |

## Seções do Site (single-page)

1. **Header/Nav** — Fixo com scroll, mobile toggle
2. **Hero** — CTA principal + stats
3. **Serviços** — Tabs com 6 áreas previdenciárias
4. **Sobre** — Bio + vídeo explicativo
5. **FAQ** — Perguntas frequentes
6. **Contato** — Formulário + mapa
7. **Footer** — Links + LGPD

## Acessibilidade

- `color-scheme: light only` — força modo claro em todos os navegadores
- `forced-color-adjust: none` — ignora alto contraste do Windows
- Fonte mínima: 14px, padrão 16px
- Contraste texto/fundo: mínimo WCAG AA

## Convenções de Código

- **HTML:** Semântico, kebab-case nos arquivos
- **CSS:** Variáveis CSS no `:root`, BEM simplificado nas classes
- **JS:** Vanilla, sem dependências externas, módulos por seção

## Desenvolvimento Local

```bash
python -m http.server 8000
# ou
npx serve .
```

## Deploy

Push na branch `main` → GitHub Actions publica automaticamente no GitHub Pages.

```bash
git add .
git commit -m "descrição da mudança"
git push origin main
```
