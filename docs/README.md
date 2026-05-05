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
├── index.html              # Página única completa
├── styles.css              # Estilos (3.500+ linhas)
├── script.js               # JavaScript principal (~92KB)
├── foto_sobre.avif         # Foto da advogada — seção About
├── isabella_sobre.avif     # Foto hero — seção Hero
├── optimized_video/
│   └── video_restituicao_optimized.mp4   # 4.3MB (reduzido de 18MB)
├── docs/
│   └── README.md           # Esta documentação
├── CLAUDE.md               # Contexto para Claude Code
├── README.md               # README público do repositório
├── DOCUMENTACAO_CONSOLIDADA.md  # Histórico de implementações
└── PORTFOLIO_PITCH.md      # Pitch comercial do projeto
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

## 9. Histórico de Versões

| Versão | Data | Mudança Principal |
|--------|------|-------------------|
| 1.0 | Abr 2026 | Criação do site |
| 1.1 | Abr 2026 | Otimização de vídeo (18MB → 4.3MB) |
| 1.2 | Mai 2026 | Paleta Slate+Amber → Navy+Gold+Ivory |
| 1.3 | Mai 2026 | Fix modo escuro Chrome (`color-scheme: light only`) |
| 2.0 | Mai 2026 | Limpeza de arquivos, docs atualizadas, deploy |
