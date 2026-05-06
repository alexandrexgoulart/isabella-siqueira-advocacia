# Abordagem para Isabella Siqueira - Projeto Website + Blog

---

## Contexto do Projeto

- **Site atual dela**: https://www.isabellasiqueira.adv.br (Wix)
- **Domínio dela**: isabellasiqueira.adv.br (já pago)
- **Custo atual (Wix)**: ~R$ 80-150/mês
- **Custo com novo site**: ~R$ 50/ano (só o domínio)
- **Diferencial real**: Zero custo de mensalidade de hospedagem + design premium + blog completo com admin

---

## O que foi desenvolvido

### Site Principal (index.html)
- Design premium com tema Navy+Gold+Ivory
- Seções: Header, Hero, Serviços, Sobre, FAQ, Contato, Footer
- Totens de conversão (WhatsApp)
- Responsivo para mobile/tablet/desktop
- SEO otimizado

### Blog Completo (blog.html + artigo.html + admin-blog.html)
- Página pública com listagem de artigos
- Página individual de artigo
- Painel admin para gerenciar artigos
- 30 categorias (todas as áreas de atuação)
- Imagens com upload local (base64)
- Preview de artigos
- Barra de formatação com negrito, itálico, listas e 30 emojis

### Infraestrutura
- Hospedagem: GitHub Pages (grátis)
- Banco de dados: Supabase
- Autenticação: Tabela admin_users com hash SHA-256

### Formulário de Contato
- Salva contatos no Supabase (tabela `contatos`)
- Mantém função de abrir WhatsApp
- Isabella pode visualizar contatos no painel admin
- SQL de criação: `docs/SQL_CONTATOS.md`

### Painel Admin de Contatos (admin-contatos.html)
- Visualizar todas as mensagens recebidas
- Marcar como lido
- Excluir contatos
- Estatísticas: total, novos, visualizados
- Filtros: Todos / Novos / Visualizados
- Acesso: mesmo login do blog (admin@isabella.com / adminisabella2026)
- URL: https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/admin-contatos.html

---

## Questões Clarificadas

### Sobre custo mensal
- Manutenção mensal ≠ eliminar custo
- Manutenção é um serviço que você oferece, não uma vantagem do site
- Argumento correto: "Zero custo de hospedagem" (mas manutenção é cobrada por serviço prestado)

### Sobre monetização
- Option 1: Vender o site completo (R$ 3.500-4.000)
- Option 2: Manutenção mensal por continuar melhorando o site
- Não oferecer "de graça" sem retorno

### Sobre o blog (agora incluso!)
- Seu site agora TEM blog completo com admin
- Isso elimina uma weakness anterior
- Plus: Isabella pode publicar artigos sobre direito previdenciário

### Sobre a abordagem
- Não criar narrativa falsa ("fiz para outra advogada")
- Ser honesto: "Vi seu site no Wix e fiz uma versão melhorada para você avaliar"
- É uma melhoria do site DELA, não um projeto genérico

---

## Modelo de Deploy Profissional

### Opção Escolhida: GitHub em Nome Dela

**Por que é mais profissional:**
- O repositório fica no GitHub DELA
- O domínio dela (isabellasiqueira.adv.br) aponta para o site DELA
- Parece que o site é dela, não seu

### Como funciona:
1. Isabella cria uma conta gratuita no GitHub (com email dela)
2. Você cria um repositório no GitHub DELA com o nome do site
3. Você faz o deploy do código no repo dela
4. Você configura o GitHub Pages no repo dela
5. Você orienta ela a cambiar o DNS do registrador para apontar para o GitHub

### Configuração DNS que ela precisaria fazer:

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | seu-usuario.github.io |

### Custo final para ela:
- Domínio (.adv.br): ~R$ 50/ano (ela já paga)
- Hospedagem (GitHub): **R$ 0**
- **Economia mensal**: R$ 80-150/mês → R$ 0 de hospedagem

---

## Email: O que saber antes de abordar

### Importante: Não prometer migração automática de emails

A migração de emails envolve riscos e complexidades que devem ser tratadas com cautela:

| Aspecto | Detalhe |
|---------|---------|
| **GitHub Pages** | Não oferece serviço de email — é apenas hospedagem de sites |
| **Armazenamento** | Zoho (5GB) ou Mailbux (20GB) podem não ser suficientes se ela tem muitos emails históricos |
| **Migração** | Pode ser feita via IMAP, mas requer tempo e conhecimento técnico |
| **Recomendação** | Abordar como serviço adicional opcional, não como parte do projeto |

### Opções de Email (se ela quiser migrar depois):

| Serviço | Custo | Armazenamento | Observação |
|---------|-------|---------------|------------|
| **Zoho Mail** | R$ 0 (free) | 5 GB/usuário | Até 5 caixas, bom para poucos emails |
| **Mailbux** | R$ 0 (free) | 20 GB total | Unlimited caixas, melhor para archiving |
| **Continuar no Wix** | ~R$ 80-150/mês | O que já tem | Mais simples, mas paga mensalidade |

### Na Abordagem: Como dizer

> "Sobre os emails: o GitHub só hospeda sites, não oferece email. Se você quiser, posso ajudar a migrar os seus emails para um serviço gratuito depois — mas preciso avaliar quantos emails você tem com documentos, para ver se o plano gratuito suporta."

**Resumo:** Na abordagem, NÃO prometer migração de email — mencionar apenas como possibilidade futura se ela tiver interesse.

---

## Script de Abordagem (WhatsApp)

### Versão Honesta e Profissional

```
Oi Isabella! 👋

Meu nome é Alexandre Goulart, trabalho com desenvolvimento de websites e gostei muito do seu trabalho como advogada previdenciarista.

Vi seu site atual (isabellasiqueira.adv.br) e desenvolvi uma versão melhorada para você avaliar. É um projeto personalizado com design premium, blog integrado e sem mensalidade de hospedagem.

Você pode ver aqui: https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/

Diferenciais:
• Design premium e personalizado
• Blog completo integrado (você pode escrever artigos!)
• Hospedagem gratuita (GitHub Pages) — zero mensalidade
• Domínio .adv.br permanece seu
• Totalmente responsivo (funciona no celular)
• Otimizado para Google

Se tiver interesse em conversar sobre um site profissional para seu escritório, me manda uma mensagem!

Qualquer dúvida, estou à disposição.

Alexandre Goulart
WhatsApp: (62) 99114-4575
```

### Versão Curta (para quebrar o gelo)

```
Oi Isabella! 👋

Vi seu site no Wix e fiz uma versão melhorada para você avaliar.

É um site premium com blog integrado, sem mensalidade de hospedagem. O domínio .adv.br continua seu.

Link: https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/

Abs,
Alexandre Goulart
WhatsApp: (62) 99114-4575
```

---

## Script de Abordagem (Email)

### Assunto: Versão melhorada do seu site - Isabella Siqueira Advocacia

```
Olá Isabella,

Meu nome é Alexandre Goulart e trabalho com desenvolvimento de websites.

Vi seu site atual (isabellasiqueira.adv.br) e desenvolvi uma versão melhorada para você avaliar. É um projeto personalizado com design premium, blog integrado e sem mensalidade de hospedagem.

Você pode conhecer aqui: https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/

Diferenciais:
• Design premium e personalizado
• Blog completo integrado (escreva artigos sobre direito previdenciário!)
• Hospedagem gratuita (GitHub Pages) — zero mensalidade
• Domínio .adv.br permanece seu
• Otimizado para Google
• Totalmente responsivo

Se tiver interesse em conversar sobre um site para seu escritório, ficarei feliz em apresentar o projeto pessoalmente.

Grande abraço,
Alexandre Goulart
WhatsApp: (62) 99114-4575
```

---

## Proposta de Valor

### Opção 1: Vender o site completo

| Item | Valor |
|------|-------|
| Site completo com design premium | R$ 3.500 |
| Blog com admin para artigos | incluso |
| Deploy e configuração no GitHub dela | incluso |
| Tutorial de uso | incluso |
| Suporte 30 dias | incluso |

### Opção 2: Site + Manutenção

| Item | Valor |
|------|-------|
| Site completo | R$ 2.800 |
| Manutenção mensal (atualizações + artigos) | R$ 180/mês |

### Argumentos de venda

> "Você paga R$ 100/mês no Wix. Com este site, zero mensalidade de hospedagem. Só paga manutenção se quiser updates."

> "Design profissional passa mais credibilidade. Clientes que chegam pelo site avaliam muito a primeira impressão."

> "O blog permite você publicar artigos sobre direito previdenciário, mostrando autoridade e atraindo clientes."

> "O site foi construído para aparecer no Google. O atual não tem SEO."

> "Seu domínio .adv.br continua seu. A gente só migra a hospedagem para o GitHub Pages."

---

## Pontos Fortes do Seu Site vs. Della

| Aspecto | Seu Site | Site Atual (Wix) |
|---------|----------|------------------|
| Design | Premium e moderno | Genérico Wix |
| Blog | Completo com admin | Tem (básico) |
| Custo hospedagem | Grátis | R$ 80-150/mês |
| Velocidade | Rápido | Lento |
| SEO | Otimizado | Básico |
| Manutenção | Baixo custo | Alta (Wix) |
| Domínio | .adv.br dela | .adv.br dela |

---

## Credenciais de Acesso

### Admin do Blog
- URL: https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/admin-blog.html
- Email: admin@isabella.com
- Senha: adminisabella2026

### Admin de Contatos
- URL: https://alexandrexgoulart.github.io/isabella-siqueira-advocacia/admin-contatos.html
- Email: admin@isabella.com
- Senha: adminisabella2026

### Supabase (Banco de Dados)
- URL: https://gpvwgogcfgohxdstoocc.supabase.co

---

## Riscos

1. **Ela pode não responder** - É normal, seguir em frente
2. **Ela pode achar caro** - Ter um valor mínimo evita clientes baratos
3. **Outros devs podem abordar ela** - Estar presente primeiro ajuda
4. **Ela pode não querer criar GitHub** - Oferecer alternativa (você mantém, ela usa)

---

## Objeções e Como Responder

### 1. "Está caro / muito caro"

**Resposta:**
> "Entendo seu ponto de vista. Mas você paga cerca de R$ 100/mês no Wix, não é? Com este site, não tem mensalidade de hospedagem. Você só paga manutenção se quiser atualizações. Parece muito, mas em 1 ano você economia R$ 1.200. É um investimento que se paga ao longo do tempo."

**Técnica:** Transforme o "caro" em economia de longo prazo.

---

### 2. "Já tenho site (Wix/WordPress)"

**Resposta:**
> "Que bom que você já tem presença digital! Posso te mostrar as diferenças? Meu site é 100% personalizado, não usa aqueles modelos prontos do Wix. Além disso, é muito mais rápido, tem blog integrado e foi otimizado para aparecer no Google. Quer fazer um teste comparativo? A gente vê o que aparece primeiro no Google."

**Técnica:** Reconheça o que ela já tem e mostre os diferenciais.

---

### 3. "Não tenho tempo para manter / atualizar"

**Resposta:**
> "Você não precisa mexer em nada se não quiser! Posso fazer a manutenção mensal pra você - é só me mandar o conteúdo do artigo ou qualquer alteração que eu faço. Assim você foca no seu trabalho e o site fica sempre atualizado."

**Técnica:** Ofereça a manutenção como solução, não como problema.

---

### 4. "Vou pensar / Depois a gente conversa"

**Resposta:**
> "Sem problema! Deixei tudo pronto para você ver com calma. Quando quiser conversar, é só me chamar no WhatsApp. Enquanto isso, posso te enviar alguns exemplos de artigos que você poderia publicar no blog? Assim você já vê o tipo de conteúdo que atrai clientes."

**Técnica:** Não pressione, mas deixe a porta aberta com próximo passo.

---

### 5. "Não preciso de blog"

**Resposta:**
> "Entendo! Mas você sabia que o blog ajuda o Google a encontrar seu site? Quando alguém busca 'advogada previdenciária [sua cidade]' ou 'como pedir aposentadoria', artigos seus aparecem no Google e levam diretamente ao seu escritório. É cliente que chega até você sem precisar de indicações."

**Técnica:** Mostre o benefício oculto que ela não conhece.

---

### 6. "Quem vai ler meus artigos?"

**Resposta:**
> "Exatamente pessoas como seus clientes! Quem está procurando informações sobre benefícios, aposentadoria, auxílio-doença - esses artigos atraem quem precisa dos seus serviços. É conteúdo que mostra autoridade e confiança. Muitos advogados indicam que seus melhores clientes chegam pelo blog."

**Técnica:** Prove o valor com exemplo concreto.

---

### 7. "Não tenho dinheiro agora"

**Resposta:**
> "Sem problema! Posso parcelar em até 3x no cartão, ou fazer um acordo de pagamento. O importante é você ter um site profissional. Depois que começar a trazer clientes, o investimento se paga sozinho."

**Técnica:** Ofereça opções de pagamento flexíveis.

---

### 8. "Meu site atual está bom"

**Resposta:**
> "Fico feliz que você esteja satisfeita! Posso fazer uma análise rápida do seu site atual e te mostrar onde podem ter melhorias? É de graça, não te comprometo a nada. Só queria te mostrar o que eu faria de diferente."

**Técnica:** Ofereça valor sem compromisso (análise gratuita).

---

### 9. "Não quero criar conta no GitHub"

**Resposta:**
> "Sem problema! Posso manter o site no meu GitHub e você usa normalmente. A única diferença é que o código fica no meu repositório. Posso fazer a gestão completa pra você."

**Técnica:** Ofereça alternativa sem forçar a criação de conta.

---

## Técnica do "Sim, E"

Quando a pessoa objectivar, você aceita o ponto dela E adiciona algo:

- **"Sim, o preço parece alto, E você economiza R$ 100/mês em hospedagem"**
- **"Sim, você está ocupada, E eu posso fazer toda a manutenção pra você"**
- **"Sim, você já tem site, E este é muito mais rápido e aparece no Google"**
- **"Sim, você não quer criar GitHub, E eu posso manter o site pra você"**

---

## Fluxo de Conversa

```
1. Enviar mensagem inicial (versão curta)
2. Se responder → enviar link e diferenciais
3. Se objectionar → usar uma das respostas acima
4. Se demonstrar interesse → enviar proposta completa
5. Se pedir prazo → agendar retorno em 3-5 dias
6. Se não responder → enviar email após 48h
```

---

## Próximos Passos

1. [x] Personalizar scripts com seu nome
2. [x] Seu número de WhatsApp configurado: (62) 99114-4575
3. [x] Número da Isabella obtido: (62) 98300-0708
4. [x] Domínio atual dela: isabellasiqueira.adv.br
5. [x] Modelo profissional definido (GitHub dela)
6. [x] Painel admin de contatos criado (admin-contatos.html)
7. [ ] Enviar primeira mensagem via WhatsApp
8. [ ] Se não responder em 48h, enviar email

---

## Seus Contatos

- Alexandre Goulart: (62) 99114-4575

## Contato da Isabella

- WhatsApp: (62) 98300-0708

---

### Link Pronto para Envio

**Versão Curta:**
https://wa.me/5562983000708?text=Oi%20Isabella!%20👋%0A%0AVi%20seu%20site%20no%20Wix%20e%20fiz%20uma%20versão%20melhorada%20para%20você%20avaliar.%0A%0AÉ%20um%20site%20premium%20com%20blog%20integrado%2C%20sem%20mensalidade%20de%20hospedagem.%20O%20domínio%20.adv.br%20continua%20seu.%0A%0ALink%3A%20https%3A%2F%2Falexandrexgoulart.github.io%2Fisabella-siqueira-advocacia%2F%0A%0AAbs%2C%0AAlexandre%20Goulart%0AWhatsApp%3A%20(62)%2099114-4575

**Versão Completa:**
https://wa.me/5562983000708?text=Oi%20Isabella!%20👋%0A%0AMeu%20nome%20é%20Alexandre%20Goulart%2C%20trabalho%20com%20desenvolvimento%20de%20websites%20e%20gostei%20muito%20do%20seu%20trabalho%20como%20advogada%20previdenciarista.%0A%0AVi%20seu%20site%20atual%20(isabellasiqueira.adv.br)%20e%20desenvolvi%20uma%20versão%20melhorada%20para%20você%20avaliar.%20É%20um%20projeto%20personalizado%20com%20design%20premium%2C%20blog%20integrado%20e%20sem%20mensalidade%20de%20hospedagem.%0A%0AVocê%20pode%20ver%20aqui%3A%20https%3A%2F%2Falexandrexgoulart.github.io%2Fisabella-siqueira-advocacia%2F%0A%0ADiferenciais%3A%0A•%20Design%20premium%20e%20personalizado%0A•%20Blog%20completo%20integrado%20(você%20pode%20escrever%20artigos!)%0A•%20Hospedagem%20gratuita%20(GitHub%20Pages)%20—%20zero%20mensalidade%0A•%20Domínio%20.adv.br%20permanece%20seu%0A•%20Totalmente%20responsivo%20(funciona%20no%20celular)%0A•%20Otimizado%20para%20Google%0A%0ASe%20tiver%20interesse%20em%20conversar%20sobre%20um%20site%20profissional%20para%20seu%20escritório%2C%20me%20manda%20uma%20mensagem!%0A%0AQualquer%20dúvida%2C%20estou%20à%20disposição.%0A%0AAlexandre%20Goulart%0AWhatsApp%3A%20(62)%2099114-4575

---

*Documento atualizado: 06/05/2026*
*Atualizado em: 06/05/2026 - Segurança: login com hash SHA-256 via banco, SQL contatos executado no Supabase*