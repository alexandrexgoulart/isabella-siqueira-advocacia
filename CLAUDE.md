# Isabella Siqueira Advocacia

## Visão Geral do Projeto

Site institucional para escritório de advocacia especializado em **Direito Previdenciário** + **Blog** para artigos.

- **Stack:** HTML5, CSS3, JavaScript vanilla (sem frameworks)
- **Hospedagem:** GitHub Pages (repo público)
- **URL:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/
- **Público-alvo:** Idosos e pessoas buscando advogada previdenciária

## Estrutura de Arquivos

```
├── index.html                  # Página principal (single-page)
├── blog.html                   # Blog - listagem de artigos
├── artigo.html                 # Blog - página individual do artigo
├── admin-blog.html             # Blog - painel admin para criar/editar artigos
├── styles.css                  # Estilos — paleta Navy+Gold+Ivory
├── script.js                   # JavaScript principal
├── foto_sobre.avif             # Foto da advogada (seção about)
├── isabella_sobre.avif         # Foto hero
├── optimized_video/            # Vídeo otimizado
├── docs/
│   ├── ABORDAGEM_ISABELLA.md   # Script de abordagem para cliente
│   ├── SEGURANCA_SQL.md        # Configurações de segurança do Supabase
│   └── README.md               # Documentação técnica
└── CLAUDE.md                   # Este arquivo
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

## Infraestrutura

### Supabase (Banco de Dados)
- **URL:** https://gpvwgogcfgohxdstoocc.supabase.co
- **Tabelas:**
  - `posts` - Artigos do blog (id, titulo, conteudo, categorias, imagem_url, resumo, publicado, autor, created_at)
  - `admin_users` - Usuários admin (id, email, password_hash, nome, created_at)

### Credenciais de Acesso
- **Admin Blog:** admin@isabella.com / adminisabella2026
- **Chave anon (leitura):** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (pública, segura)
- **Chave service_role:** EXPESTA NO CÓDIGO (RISCO - ver docs/SEGURANCA_SQL.md)

## Segurança

### AVISO - Risco de Segurança Identificado
A chave `service_role` está exposta no código client-side (admin-blog.html). Isso permite que qualquer pessoa com acesso ao código-fonte possa fazer operações completas no banco de dados.

**Mitigação atual:**
- Autenticação local com hash SHA-256
- RLS (Row Level Security) configurado no Supabase
- GRANT SELECT para roles anon e authenticated

**Para máxima segurança (ver docs/SEGURANCA_SQL.md):**
1. Configurar políticas RLS no Supabase
2. Migrar operações de admin para Edge Functions (futuro)
3. Considerar usar variáveis de ambiente

### Medidas Implementadas
- Senhas de admin armazenadas com hash SHA-256
- Autenticação via banco de dados local
- RLS habilitado nas tabelas
- Chave anon (only-read) nos arquivos públicos
- GRANT SELECT para roles anon e authenticated (OBRIGATÓRIO para funcionar!)

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

## Documentação de Segurança
Ver **docs/SEGURANCA_SQL.md** para configurações de segurança do Supabase.

## Últimas Correções (Mai 2026)
- blog.html unificado com index.html (header, footer, cursor, menu mobile)
- blog-hero corrigido (margin-top responsivo, keyframe fadeInUp)
- menu hamburger corrigido (adicionado id="mobileToggle")
- docs/README.md atualizado com changelog completo
- artigo.html unificado com site principal (header, footer, fonts, cursor)
- artigo.html com fundo branco (bg-card) para melhor leitura
- artigo.html botões compartilhar padronizados (círculos, !important)
- artigo.html article-meta forçado em linha única (!important)