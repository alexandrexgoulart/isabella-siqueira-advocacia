# Isabella Siqueira Advocacia

## Visão Geral do Projeto

Site institucional para escritório de advocacia especializado em **Direito Previdenciário** + **Blog** para artigos.

- **Stack:** HTML5, CSS3, JavaScript vanilla (sem frameworks)
- **Hospedagem:** GitHub Pages
- **URL:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/
- **Público-alvo:** Idosos e pessoas buscando advogada previdenciária

## Estrutura de Arquivos

```
isabella-siqueira-advocacia/
├── index.html                  # Página principal (single-page)
├── blog.html                  # Blog - listagem de artigos
├── artigo.html                # Blog - página individual do artigo
├── admin-blog.html            # Blog - painel admin para criar/editar artigos
├── styles.css                 # Estilos — paleta Navy+Gold+Ivory
├── script.js                  # JavaScript principal
├── foto_sobre.avif             # Foto da advogada (seção about)
├── isabella_sobre.avif        # Foto hero
├── optimized_video/           # Vídeo otimizado
├── docs/                      # Documentação do projeto
│   └── ABORDAGEM_ISABELLA.md  # Script de abordagem para cliente
├── CLAUDE.md                  # Este arquivo
└── README.md                  # Documentação pública
```

## Paleta de Cores

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

## Páginas do Projeto

### Site Principal (index.html)
1. **Header/Nav** — Fixo com scroll, mobile toggle
2. **Hero** — CTA principal + stats
3. **Serviços** — Tabs com áreas previdenciárias
4. **Sobre** — Bio + vídeo explicativo
5. **FAQ** — Perguntas frequentes
6. **Contato** — Formulário + mapa
7. **Footer** — Links + LGPD

### Blog (blog.html + artigo.html)
- Listagem de artigos com busca e filtro por categoria
- 30 categorias (todas as áreas de atuação)
- Paginação com botão "Ver Mais"
- Página individual com formatação de texto
- Imagens proporcionais (object-fit: contain)

### Admin (admin-blog.html)
- Login com email/senha (autenticação via Supabase)
- Dashboard com estatísticas
- CRUD completo de artigos
- Upload de imagem do computador
- Preview de artigos antes de publicar
- Toolbar de formatação (negrito, itálico, listas)
- 30 emojis para usar no conteúdo

## Infraestrutura

### Supabase (Banco de Dados)
- **URL:** https://gpvwgogcfgohxdstoocc.supabase.co
- **Tabelas:**
  - `posts` - Artigos do blog (id, titulo, conteudo, categorias, imagem_url, resumo, publicado, autor, created_at)
  - `admin_users` - Usuários admin (id, email, password_hash, nome, created_at)

### Credenciais de Acesso
- **Admin Blog:** admin@isabella.com / adminisabella2026

## Segurança
- Chaves `anon` nos arquivos públicos (apenas leitura)
- Chave `service_role` apenas no admin (escrita)
- Senhas de admin armazenadas com hash SHA-256
- Não há dados sensíveis expostos

## Acessibilidade
- `color-scheme: light only` — força modo claro
- `forced-color-adjust: none` — ignora alto contraste do Windows
- Fonte mínima: 14px, padrão 16px
- Contraste texto/fundo: mínimo WCAG AA
- Responsivo: mobile (< 480px), tablet (480-1024px), desktop (> 1024px)

## Convenções de Código
- **HTML:** Semântico, kebab-case nos arquivos
- **CSS:** Variáveis CSS no `:root`, BEM simplificado
- **JS:** Vanilla, sem dependências externas

## Desenvolvimento Local
```bash
python -m http.server 8000
# ou
npx serve .
```

## Deploy
Push na branch `main` → GitHub Pages publica automaticamente.
```bash
git add .
git commit -m "descrição"
git push origin main
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
