# Sessão de Trabalho - Isabella Siqueira Advocacia

**Última atualização:** Mai 2026
**Status:** Projeto em andamento - Site + Blog completo

---

## Ferramenta Usada

- **OpenCode** com modelo **minimax-m2.5-free**
- Provider: MiniMax (chinês)

---

## Como Usar Este Arquivo de Memória

**A cada nova sessão:**
1. O OpenCode deve ler automaticamente o CLAUDE.md
2. O CLAUDE.md contém instrução para ler este SESSION.md
3. Todo o contexto será carregado automaticamente

**Para garantir o carregamento:**
Se a memória não carregar automaticamente, o usuário pode digitar no início da sessão:
- "Leia o SESSION.md para continuar de onde paramos"
- "Carregue o contexto da sessão anterior"

**Para atualizar a memória:**
Eu atualizo automaticamente ao final de cada sessão. O usuário não precisa digitar nada.

---

## RESUMO - Como a Memória Funciona

| Situação | O que acontece |
|---------|----------------|
| Nova sessão iniciar | OpenCode → Lê CLAUDE.md → Instrui ler SESSION.md → Contexto carregado |
| Memória não carregar | Usuário pode digitar: "Leia o SESSION.md para continuar" |
| Atualização | Eu atualizo automaticamente ao final de cada sessão |

---

## Contexto do Projeto

### O que é
Site institucional para escritório de advocacia especializado em **Direito Previdenciário** com blog completo para artigos.

### URLs do Projeto
- **Site principal:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/
- **Blog:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/blog.html
- **Artigo (exemplo):** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/artigo.html?id=1
- **Admin Blog:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/admin-blog.html
- **Admin Contatos:** https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/admin-contatos.html

### Credenciais
- **Admin Blog:** admin@isabella.com
- **Admin Contatos:** admin@isabella.com
- **Senha:** adminisabella2026
- **Banco Supabase:** https://gpvwgogcfgohxdstoocc.supabase.co

---

## Estrutura de Arquivos

```
├── index.html          # Site principal single-page
├── blog.html           # Blog - listagem de artigos
├── artigo.html        # Artigo individual
├── admin-blog.html     # Painel admin para gerenciar artigos
├── admin-contatos.html # Painel admin para ver contatos
├── styles.css         # Todos os estilos (Navy+Gold+Ivory)
├── script.js          # JavaScript principal
├── foto_sobre.avif    # Foto da advogada
├── isabella_sobre.avif # Foto hero
├── optimized_video/   # Vídeo otimizado
├── SESSION.md         # Este arquivo de sessão (memória)
├── CLAUDE.md          # Contexto do projeto
└── docs/
    ├── README.md      # Documentação técnica
    ├── ABORDAGEM_ISABELLA.md # Script comercial
    └── SEGURANCA_SQL.md      # Segurança Supabase
```

---

## Paleta de Cores (Navy+Gold+Ivory)

| Variável | Valor | Uso |
|----------|-------|-----|
| `--primary` | `#1A2B4A` | Navy - autoridade jurídica |
| `--primary-light` | `#243657` | Navy médio |
| `--accent` | `#C5964B` | Gold - sofisticação |
| `--accent-hover` | `#A87B38` | Gold escuro (hover) |
| `--bg-light` | `#F8F6F1` | Ivory - fundo principal |
| `--bg-card` | `#FFFFFF` | Branco - cards e artigos |
| `--success` | `#059669` | Verde - WhatsApp |

---

## Fontes

- **Principal:** Outfit (Google Fonts)
- **Títulos:** Space Grotesk (Google Fonts)

---

## Funcionalidades Implementadas

### Site Principal (index.html)
- Header com logo "IS" + "Isabella Siqueira" + "Advocacia"
- Menu de navegação completo (Início, Serviços, Sobre, Restituição, Dúvidas, Blog, Contato)
- Botão WhatsApp no header
- Menu mobile (hamburger) com id="mobileToggle"
- Cursor premium
- Footer completo (brand, links, contato, OAB/GO 50.839)
- Responsivo (desktop, tablet, mobile)

### Blog (blog.html)
- Header unificado com site principal
- Banner "Blog Previdenciário" com animação
- Filtro de categorias + busca
- Listagem de artigos do Supabase
- Paginação com "Ver Mais"
- Footer unificado com site principal

### Artigo (artigo.html)
- Header unificado com site principal
- Fundo branco (bg-card) para melhor leitura
- Article meta (autor, data, categoria) em linha única
- Botões compartilhar (WhatsApp, Facebook, Copiar Link) - círculos sem bordas
- Box CTA "Fale com uma especialista" antes do rodapé
- Footer unificado com site principal

### Admin (admin-blog.html)
- Login com hash SHA-256
- CRUD completo de artigos
- 30 categorias disponíveis
- Upload de imagens (base64)
- Preview de artigos
- Toolbar de formatação + 30 emojis

### Admin Contatos (admin-contatos.html)
- Login com hash SHA-256
- Visualizar todas as mensagens recebidas
- Marcar como lido
- Excluir contatos
- Estatísticas: total, novos, visualizados
- Filtros: Todos / Novos / Visualizados

---

## Histórico de Versões

| Versão | Data | Mudança Principal |
|--------|------|-------------------|
| 1.0 | Abr 2026 | Criação do site |
| 2.0 | Mai 2026 | Blog completo com Supabase |
| 2.5 | Mai 2026 | Blog.html unificado com index.html |
| 2.6 | Mai 2026 | Artigo.html unificado |
| 2.7 | Mai 2026 | Docs comerciais atualizadas |
| 2.8 | Mai 2026 | Formulário de contato → Supabase |
| 2.9 | Mai 2026 | Admin-contatos.html criado |

---

## Problemas Corrigidos (Histórico)

1. **Blog não carrega no mobile (401)**
   - Causa: RLS sem GRANT
   - Solução: GRANT SELECT para anon e authenticated

2. **Admin mobile - campos transparentes**
   - Causa: Inputs sem background
   - Solução: background: var(--bg-card)

3. **Preview muito pequeno no mobile**
   - Causa: CSS não ocupava 100%
   - Solução: Unidades vw

4. **Imagem do artigo zoomada/cortada**
   - Causa: object-fit: cover
   - Solução: object-fit: contain

5. **Emojis quebram diferente em cada dispositivo**
   - Causa: Larguras diferentes (editor 900px, preview 800px, artigo 680px)
   - Solução: Largura统一 800px + white-space: pre-wrap

6. **Blog.html visual diferente do site**
   - Causa: CSS inline próprio
   - Solução: Unificado header/footer/cursor

7. **Blog hero atrás do header**
   - Causa: Sem margin-top
   - Solução: margin-top responsivo (80px desktop, 85px mobile) + keyframe fadeInUp

8. **Menu mobile não abria**
   - Causa: Botão sem id="mobileToggle"
   - Solução: Adicionado id

9. **Artigo.html visual diferente do site**
   - Causa: CSS inline próprio (fontes DM Sans + Playfair Display)
   - Solução: Unificado com site principal

10. **Artigo fundo muito claro**
    - Causa: bg-light (Ivory) difícil de ler
    - Solução: bg-card (branco) com box-shadow

11. **Botões compartilhar com sombras**
    - Causa: CSS duplicado + appearance nativo
    - Solução: !important em border, box-shadow, appearance

12. **Article meta em múltiplas linhas**
     - Causa: flex-wrap: wrap
     - Solução: flex-wrap: nowrap !important

13. **admin-contatos.html login não funcionava**
     - Causa: senha em texto plano vs hash SHA-256 no banco
     - Solução: Login via banco de dados com hash SHA-256 (igual admin-blog)

14. **admin-contatos.html não carregava contatos (403)**
     - Causa: permission denied para service_role
     - Solução: GRANT permissions no Supabase para service_role

15. **admin-blog.html sem links para admin-contatos**
     - Causa: Ausência de nav links
     - Solução: Adicionado links Contatos + Ver Blog + Ver Site

---

## Tarefas Próximas (Se Houver)

- Apresentação comercial para Isabella
- Possível oferta: R$ 3.500 (à vista) ou R$ 2.800 + R$ 180/mês manutenção

---

## Observações Importantes

- **Segurança:** Chave service_role exposta no código (mitigada por RLS + auth local)
- **Hospedagem:** GitHub Pages (gratuito)
- **Banco:** Supabase (posts, admin_users, contatos)
- **Admin usa:** service_role key no código (RISCO已知)

---

*Este arquivo é atualizado automaticamente após cada sessão de trabalho.*