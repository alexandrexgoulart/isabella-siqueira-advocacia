# Documentação Consolidada — Isabella Siqueira Advocacia

**Última atualização:** Maio 2026

---

## 1. Contexto do Projeto

Site institucional single-page para escritório especializado em Direito Previdenciário.

- **Cliente:** Isabella Siqueira (advogada previdenciária)
- **Desenvolvedor:** Alexandre Goulart
- **Objetivo:** Converter visitantes em leads via apresentação profissional e CTAs estratégicos
- **Público-alvo:** Principalmente idosos e pessoas buscando benefícios do INSS

---

## 2. Implementações Realizadas

| # | Implementação | Status |
|---|--------------|--------|
| 1 | Estrutura HTML semântica single-page | ✅ |
| 2 | Paleta Navy + Gold + Ivory (acessível) | ✅ |
| 3 | Responsividade mobile completa | ✅ |
| 4 | Otimização de vídeo: 18MB → 4.3MB (-75%) | ✅ |
| 5 | Sistema de tabs para serviços | ✅ |
| 6 | Banner e modal de LGPD/cookies | ✅ |
| 7 | Cursor customizado (apenas desktop) | ✅ |
| 8 | Animações AOS no scroll | ✅ |
| 9 | Fix modo escuro Chrome (`color-scheme: light only`) | ✅ |
| 10 | Schema.org JSON-LD (SEO jurídico) | ✅ |
| 11 | Limpeza de arquivos e documentação | ✅ |

---

## 3. Paleta de Cores

### Decisão e Justificativa

A paleta anterior (Slate #1E293B + Amber #D97706) apresentava tensão visual: o slate é uma cor associada ao universo de startups de tecnologia, enquanto o amber é informal e quente — combinação sem identidade jurídica clara.

A nova paleta Navy + Gold + Ivory é a linguagem visual clássica do direito:
- **Navy #1A2B4A** — togas, selos da OAB, documentos judiciais
- **Gold #C5964B** — sofisticação, premium, confiança
- **Ivory #F8F6F1** — reduz fadiga visual para o público idoso (mesma lógica de e-readers)

### Tabela Completa

| Variável | Valor | Uso |
|----------|-------|-----|
| `--primary` | `#1A2B4A` | Cor principal |
| `--primary-light` | `#243657` | Gradientes |
| `--primary-dark` | `#0F1B30` | Hover/sombras |
| `--accent` | `#C5964B` | CTAs, destaques |
| `--accent-hover` | `#A87B38` | Hover accent |
| `--bg-light` | `#F8F6F1` | Fundo geral |
| `--bg-card` | `#FFFFFF` | Cards |
| `--success` | `#059669` | WhatsApp |
| `--text` | `#1A1A1A` | Texto principal |

---

## 4. Decisões Técnicas

### Single-Page vs Multi-Page
Optou-se por single-page (apenas `index.html`) para maximizar performance no GitHub Pages e simplificar manutenção. Todo o conteúdo é carregado de uma vez.

### Sem Framework CSS
Sem Bootstrap, Tailwind ou similares. CSS puro com variáveis no `:root` garante controle total da identidade visual e arquivo menor.

### Imagens AVIF
Formato AVIF oferece ~50% menos tamanho que JPEG com mesma qualidade. Suportado por todos os navegadores modernos.

### Vídeo Local vs YouTube Embed
Vídeo hospedado localmente (`optimized_video/`) evita dependência do YouTube e carrega mais rápido. Reduzido de 18MB para 4.3MB com FFmpeg.

---

## 5. Problemas Identificados e Resolvidos

| Problema | Causa | Solução |
|----------|-------|---------|
| Site escuro no Chrome PC | Windows em tema escuro; Chrome respeita isso | `color-scheme: light only` no HTML e CSS |
| Cache persistente no Chrome | Arquivo CSS antigo em cache | Versionamento `?v=N` no link do CSS |
| Repositórios git aninhados | `temp-template` tinha `.git` próprio | Pasta removida |
| Documentação desatualizada | Docs com paleta e estrutura antigas | Todas as docs reescritas (Maio 2026) |
| Arquivos soltos desnecessários | `.docx`, `.report.html`, pastas vazias | Removidos |

---

## 6. Estrutura Final do Projeto

```
isabella-siqueira-advocacia/
├── .claude/                    # Claude Code — agentes, comandos, skills
├── .ai/memory/                 # Memória de IA auxiliar
├── .git/                       # Controle de versão Git
├── docs/
│   └── README.md               # Documentação técnica completa
├── optimized_video/
│   └── video_restituicao_optimized.mp4
├── index.html                  # Site completo
├── styles.css                  # Estilos — Navy+Gold+Ivory
├── script.js                   # JavaScript
├── foto_sobre.avif             # Foto — seção About
├── isabella_sobre.avif         # Foto — Hero
├── CLAUDE.md                   # Contexto Claude Code
├── README.md                   # README público GitHub
├── DOCUMENTACAO_CONSOLIDADA.md # Este arquivo
└── PORTFOLIO_PITCH.md          # Pitch comercial
```
