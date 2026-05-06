# Documentação Técnica — Isabella Siqueira Advocacia

**Última atualização:** Maio 2026
**Versão:** 2.0 — Paleta Navy+Gold+Ivory

---

## 1. Visão Geral

Site institucional single-page para escritório de advocacia especializado em Direito Previdenciário.

- **URL:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/
- **Stack:** HTML5 + CSS3 + JavaScript vanilla
- **Hospedagem:** GitHub Pages (gratuito, deploy automático)

---

## 2. Estrutura de Arquivos

```
isabella-siqueira-advocacia/
├── index.html              # Página única completa (site principal)
├── blog.html               # Blog - listagem de artigos
├── artigo.html             # Blog - página individual do artigo
├── admin-blog.html         # Blog - painel admin (CRUD de artigos)
├── styles.css              # Estilos (~120KB)
├── script.js               # JavaScript principal (~92KB)
├── foto_sobre.avif         # Foto da advogada — seção About
├── isabella_sobre.avif     # Foto hero — seção Hero
├── optimized_video/
│   └── video_restituicao_optimized.mp4   # 4.3MB (reduzido de 18MB)
├── docs/
│   ├── README.md           # Esta documentação
│   └── ABORDAGEM_ISABELLA.md  # Script de abordagem comercial
├── CLAUDE.md               # Contexto para Claude Code
└── README.md               # README público do repositório
```

---

## 3. Paleta de Cores

### Variáveis CSS (`:root`)

| Variável | Valor | Uso |
|----------|-------|-----|
| `--primary` | `#1A2B4A` | Navy — cor principal, headers, botões |
| `--primary-light` | `#243657` | Navy médio — gradientes |
| `--primary-dark` | `#0F1B30` | Navy escuro — hover states |
| `--accent` | `#C5964B` | Gold — CTAs, destaques, bordas |
| `--accent-hover` | `#A87B38` | Gold escuro — hover |
| `--bg-light` | `#F8F6F1` | Ivory — fundo geral |
| `--bg-card` | `#FFFFFF` | Branco — cards e formulários |
| `--bg-subtle` | `#F2EFE8` | Ivory escuro — seções alternadas |
| `--success` | `#059669` | Verde — botão WhatsApp |
| `--text` | `#1A1A1A` | Texto principal |
| `--text-light` | `#4A4540` | Texto secundário |
| `--text-muted` | `#8A8070` | Texto suave — legendas |

### Decisão de Design

Navy + Gold é a combinação clássica do universo jurídico (togas, selos, OAB). O Ivory (#F8F6F1) no fundo reduz a fadiga visual em leituras longas, especialmente para o público-alvo idoso, seguindo a mesma lógica de e-readers e papel de livros.

---

## 4. Acessibilidade

### Modo Claro Forçado

O site força o modo claro em todos os navegadores e sistemas operacionais, independente do tema do Windows/macOS:

```html
<!-- index.html -->
<meta name="color-scheme" content="light only">
```

```css
/* styles.css */
:root { color-scheme: light only; }
html  { color-scheme: light only; forced-color-adjust: none; }
```

### Por que isso é necessário

O Chrome respeita o tema escuro do Windows e pode escurecer sites que não declaram preferência. Como o público inclui idosos que podem ter o Windows em modo escuro por padrão, essa declaração garante que o site seja sempre exibido com as cores planejadas.

---

## 5. Seções do Site

| Seção | ID | Descrição |
|-------|----|-----------|
| Header | `#header` | Nav fixo, logo, menu mobile, botão WhatsApp |
| Hero | `#hero` | H1, subtítulo, CTAs, stats (500+, 98%, 5 anos) |
| Serviços | `#servicos` | 6 áreas em grid, sistema de tabs por categoria |
| Sobre | `#sobre` | Bio da advogada, foto, vídeo, credenciais OAB |
| FAQ | `#faq` | 6 perguntas frequentes em grid 3 colunas |
| Contato | `#contato` | Formulário, endereço, horário, mapa |
| Footer | — | Links, redes sociais, LGPD |

---

## 6. JavaScript — Funcionalidades

- **Menu mobile** — toggle com animação
- **Scroll suave** — `scroll-behavior: smooth`
- **Header scroll** — adiciona classe `.scrolled` ao fazer scroll
- **Tabs de serviços** — filtragem das cards por categoria
- **Cursor customizado** — apenas em desktop (desativado mobile)
- **AOS animations** — fade-in ao scroll
- **Banner LGPD** — cookies, aceite, modal de política
- **Formulário** — validação + envio (configurar endpoint)

---

## 7. Performance

| Asset | Tamanho | Formato |
|-------|---------|---------|
| styles.css | ~120KB | CSS puro |
| script.js | ~92KB | JS vanilla |
| foto_sobre.avif | — | AVIF (compressão máxima) |
| isabella_sobre.avif | — | AVIF |
| video_restituicao_optimized.mp4 | ~4.3MB | MP4 (reduzido de 18MB, -75%) |

---

## 8. Deploy

### Automático (GitHub Pages)
Push na `main` → publicado em ~1-2 minutos.

### Manual (teste local)
```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

### Cache-busting
O link do CSS usa versão para forçar atualização nos navegadores:
```html
<link rel="stylesheet" href="styles.css?v=5">
```
Ao atualizar o CSS, incremente o número da versão.

---

## 9. Blog e Supabase

### Banco de Dados
- **URL:** https://gpvwgogcfgohxdstoocc.supabase.co
- **Chave pública (anon):** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwdndnb2djZmdvaHhkc3Rvb2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMDgzODYsImV4cCI6MjA5MzU4NDM4Nn0.h7lXdFmdInuHhhBjsXKdn8t2ty_zl47-oU_MXtQUpNY

### Tabelas
- **posts** — Artigos do blog (id, titulo, conteudo, categorias, imagem_url, resumo, publicado, autor, created_at)
- **admin_users** — Usuários admin (id, email, password_hash, nome, created_at)

### Credenciais de Acesso Admin
- **URL:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/admin-blog.html
- **Email:** admin@isabella.com
- **Senha:** adminisabella2026

### Funcionalidades do Blog
- Listagem de artigos com busca e filtro por categoria
- 30 categorias (todas as áreas de atuação)
- Paginação com botão "Ver Mais"
- Página individual com formatação de texto
- Imagens proporcionais (object-fit: contain)
- Painel admin com CRUD completo
- Upload de imagem do computador (base64)
- Preview de artigos antes de publicar
- Toolbar de formatação (negrito, itálico, listas)
- 30 emojis para usar no conteúdo
- Autenticação segura com hash SHA-256

---

## 10. Histórico de Versões

| Versão | Data | Mudança Principal |
|--------|------|-------------------|
| 1.0 | Abr 2026 | Criação do site |
| 1.1 | Abr 2026 | Otimização de vídeo (18MB → 4.3MB) |
| 1.2 | Mai 2026 | Paleta Slate+Amber → Navy+Gold+Ivory |
| 1.3 | Mai 2026 | Fix modo escuro Chrome (`color-scheme: light only`) |
| 2.0 | Mai 2026 | Limpeza de arquivos, docs atualizadas, deploy |
| 2.1 | Mai 2026 | Blog completo com admin e Supabase |
| 2.2 | Mai 2026 | Fix RLS + GRANT permissions (blog não carregava no mobile) |
| 2.3 | Mai 2026 | Fix admin-blog.html mobile (categorias, backgrounds, preview) |
| 2.4 | Mai 2026 | Padroniza largura 800px em todas as etapas + white-space pre-wrap |
| 2.5 | Mai 2026 | Blog.html unificado com index.html (header, footer, cursor, responsivo) |
| 2.6 | Mai 2026 | Artigo.html unificado (header, footer, fundo branco, botões compartilhar) |

---

## 11. Problemas Conhecidos e Soluções

### Blog não carrega no celular (401 Unauthorized)
**Causa:** RLS habilitado mas sem políticas de leitura pública + roles sem GRANT.

**Solução executada:**
```sql
-- Criar política de leitura
CREATE POLICY "public_read_all_posts" ON posts FOR SELECT USING (true);

-- Conceder permissões aos roles da API
GRANT SELECT ON public.posts TO anon;
GRANT SELECT ON public.posts TO authenticated;
```

### Admin no mobile - fundos transparentes
**Causa:** Inputs sem background explícito definido.

**Solução:** Adicionado `background: var(--bg-card)` em todos os campos.

### Preview do artigo muito pequeno no mobile
**Causa:** CSS não ocupava 100% da tela.

**Solução:** Preview usa unidades vw (viewport) para desktop e mobile.

### Imagem do artigo zoomada/cortada
**Causa:** object-fit: cover cortava a imagem.

**Solução:** Trocado para object-fit: contain.

### Emojis/texto quebra de linha diferente em cada dispositivo
**Causa:** Larguras diferentes em cada etapa (editor 900px, preview 800px, artigo 680px).

**Solução executada:**
- Editor (admin): max-width 900px → 800px
- Artigo publicado: max-width 680px → 800px
- Editor textarea: adicionado `white-space: pre-wrap; word-wrap: break-word;`

**Resultado:** Conteúdo digitado aparece IGUAL em qualquer dispositivo (PC, celular, tablet) e em todas as etapas (editor, preview, publicado).

### Blog.html Visual Despadronizado
**Causa:** blog.html tinha CSS inline próprio diferente do styles.css.

**Solução:** Unificado header/footer com site principal, adicionado script.js para cursor/menu.

### Blog Hero atrás do Header
**Causa:** blog-hero sem margin-top adequada.

**Solução:** margin-top responsivo (80px desktop, 85px mobile), adicionado fadeInUp keyframe.

### Menu Mobile não abria
**Causa:** Botão hamburger sem id="mobileToggle".

**Solução:** Adicionado id="mobileToggle" ao botão.

### Artigo.html Visual Despadronizado
**Causa:** article.html tinha CSS inline próprio (fontes, header, footer) diferente do styles.css.

**Solução executada:**
- Substituído header pelo mesmo do index.html/blog.html
- Substituído footer pelo mesmo do site principal
- Adicionado script.js para cursor premium e menu mobile
- Importado styles.css para usar mesma paleta Navy+Gold+Ivory

### Artigo com fundo muito claro (difícil leitura)
**Causa:** Fundo usava bg-light (Ivory) que era muito claro para ler artigos longos.

**Solução:** Artigo agora usa bg-card (#FFFFFF) com border-radius e box-shadow para destaque.

### Botões compartilhar com bordas e sombras
**Causa:** CSS duplicado e estilos nativos do botão (appearance, outline).

**Solução executada:**
- Removido CSS duplicado do .share-btn
- Adicionado border: none !important
- Adicionado box-shadow: none !important
- Adicionado -webkit-appearance: none, appearance: none

### Article meta em múltiplas linhas no mobile
**Causa:** flex-wrap: wrap permitia quebra de linha.

**Solução:** flex-wrap: nowrap !important + white-space: nowrap nos spans.

---

## 12. Credenciais

- **Admin Blog:** admin@isabella.com / adminisabella2026
- **URLs:** Blog (blog.html), Artigo (artigo.html), Admin (admin-blog.html)
