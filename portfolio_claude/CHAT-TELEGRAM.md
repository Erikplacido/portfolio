# Chat do site ↔ seu Telegram

O visitante escreve no chat do site e a mensagem chega num grupo do Telegram chamado **Chat Site**, onde estão só você e o bot do site. Com Tópicos ligados, cada visitante vira um tópico do grupo. Você responde lá e a resposta aparece no chat do site. O visitante nunca sai da página e não precisa ter Telegram nem WhatsApp. Tudo usa a API oficial de bots do Telegram, que é grátis e não pede número extra.

```
visitante ──▶ /api/chat/send ──▶ bot ──▶ grupo "Chat Site" (você)
visitante ◀── /api/chat/poll ◀── Upstash Redis ◀── /api/telegram/webhook ◀── sua resposta
```

| Peça | Onde |
|---|---|
| Widget (avatar + chat) | `shared/chat-widget.js` / `.css`, injetado por `shared/frame.js` |
| Recebe a mensagem do visitante e posta no grupo | `api/chat/send.js` |
| Entrega as respostas ao widget | `api/chat/poll.js` |
| Recebe as suas respostas (webhook do Telegram) | `api/telegram/webhook.js` |
| Redis, Telegram, utilidades | `api/_lib/` |
| Configurar o bot e conferir o grupo | `dev/telegram-setup.mjs` |
| Servidor local com modo de teste | `dev/server.mjs`, `dev/reply.mjs` |

---

## Como responder (uso diário)

Cada visitante tem um código curto, por exemplo **#A7K2**. A mensagem chega assim:

```
💬 #A7K2 · EN · /caju-cartao/
Hi! I loved the Caju case…
```

**Com Tópicos ligados no grupo (recomendado, passo 1.5):** cada visitante ganha um tópico próprio, chamado `#A7K2 · EN · /caju-cartao/`. Funciona como uma lista de conversas. Abra o tópico e escreva normalmente: tudo que você mandar ali vai para aquele visitante, sem precisar deslizar.

**Sem Tópicos:** tudo cai no chat do grupo. Para responder:
- **deslize a mensagem do visitante para a esquerda** (ou toque e segure → Responder) e escreva;
- ou **comece com o código:** `#A7K2 Obrigado! Me conta mais.` Isso também funciona com Tópicos ligados, de qualquer lugar do grupo.

Quando a resposta chega ao visitante, sua mensagem ganha a reação 👍. Sem 👍, a mensagem não foi.

Uma mensagem que não indica o visitante (escrita fora de um tópico de visitante, sem deslizar e sem código) **não vai para ninguém**, e o bot responde com ℹ️ avisando. Nada vai para o visitante errado.

Por enquanto só texto chega ao visitante. Foto, áudio e figurinha não são repassados, e o bot avisa quando isso acontece.

O "EN" é o idioma em que o site estava quando o visitante escreveu. Responda no idioma em que ele escreveu.

---

## Parte 1 — Telegram (uns 5 minutos, no celular)

### 1.1 Criar o bot

1. No Telegram, abra uma conversa com **@BotFather** (o oficial, com selo azul).
2. Mande `/newbot`.
3. **Nome:** o que aparece no grupo, por exemplo `Chat do Site`.
4. **Usuário:** precisa terminar em `bot`, por exemplo `erikplacido_site_bot`.
5. O BotFather responde com o **token**, algo como `123456789:AAH…`. Ele é a senha do bot: guarde e não compartilhe.

### 1.2 Criar o grupo "Chat Site"

1. **Novo grupo** → adicione o bot que você criou (busque pelo usuário dele) → nome `Chat Site`.
2. No grupo: toque no nome → **Editar → Administradores → Adicionar administrador** → escolha o bot. As permissões podem ficar no mínimo. Sem ser administrador, o bot só vê as mensagens deslizadas: os `#CÓDIGO` soltos e os avisos ⚠️ dependem disso.
3. Mande um `oi` no grupo. É só para o passo seguinte achar o grupo.
4. Deixe as notificações do grupo **ligadas**.

### 1.3 Pegar o id do grupo

No Mac, dentro desta pasta, crie o arquivo `.env.local` (ele fica fora do git) com o token:

```
TELEGRAM_BOT_TOKEN=123456789:AAH…
```

E rode:

```bash
node dev/telegram-setup.mjs
```

A resposta mostra algo como `Grupo "Chat Site" → TELEGRAM_CHAT_ID=-1001234567890`. Copie esse número negativo para o `.env.local`. Se aparecerem dois ids para o mesmo grupo, use o que começa com `-100`: o Telegram troca o id quando o grupo vira "supergrupo".

Rode o mesmo comando de novo. A última linha deve dizer `o bot é: administrator ✓`.

### 1.4 Travar o bot nesse grupo

No @BotFather: `/setjoingroups` → escolha o bot → **Disable**. Assim ninguém consegue adicionar o bot em outros grupos. O código também ignora qualquer conversa que não seja o "Chat Site".

### 1.5 Ligar Tópicos (um tópico por visitante)

1. No grupo: toque no nome → **Editar** → ligue **Tópicos** (Topics).
2. Em **Administradores**, abra o bot e confira que **Gerenciar tópicos** (Manage Topics) está ligado.
3. Rode `node dev/telegram-setup.mjs`. Deve aparecer `Tópicos: ligados ✓`.

Vale a partir da próxima conversa nova. Se o site tentou criar tópico com eles desligados, espera até 10 minutos para tentar de novo. Conversas que já existiam continuam no chat geral; responda deslizando ou com `#CÓDIGO`.

Se você apagar o tópico de um visitante, a próxima mensagem dele cria um tópico novo.

---

## Parte 2 — Vercel

### 2.1 Publicar esta pasta como projeto

Hoje o deploy da Vercel sai da pasta `portfolio/` (a de cima). Esta pasta (`portfolio_claude/`) ainda não está no git. Para as funções `/api` funcionarem, ela precisa ser a raiz de um projeto na Vercel:

1. Faça commit e push de `portfolio_claude/` no repositório.
2. Na Vercel: **Add New → Project** → importe o mesmo repositório.
3. Em **Root Directory**, escolha `portfolio_claude`. Em **Framework Preset**, deixe **Other**.
4. Clique em **Deploy**. O `vercel.json` desta pasta já diz que não há build.

### 2.2 Banco (Upstash Redis, plano grátis)

1. No projeto: **Storage → Create Database** (ou **Marketplace**) → **Upstash for Redis** → plano **Free** → região mais próxima.
2. **Connect to Project**, marcando Production (e Preview, se quiser).
3. Confira em **Settings → Environment Variables** que apareceram `KV_REST_API_URL` e `KV_REST_API_TOKEN`. Alguns projetos recebem `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`. O código aceita os dois.

### 2.3 Variáveis de ambiente

Gere o segredo do webhook (um texto aleatório):

```bash
openssl rand -hex 24
```

Em **Settings → Environment Variables**, ambiente **Production**:

| Variável | Valor |
|---|---|
| `TELEGRAM_BOT_TOKEN` | o token do passo 1.1 |
| `TELEGRAM_CHAT_ID` | o id do passo 1.3 (com o sinal de menos) |
| `TELEGRAM_WEBHOOK_SECRET` | o texto gerado acima |
| `CHAT_MAX_PER_HOUR` | opcional, padrão `60`: teto de mensagens de visitantes por hora, somando todos |

Coloque o mesmo `TELEGRAM_WEBHOOK_SECRET` também no seu `.env.local`. O passo 3 precisa dele.

Depois: **Deployments → … → Redeploy**. Variáveis novas só valem a partir do próximo deploy.

---

## Parte 3 — Ligar o webhook

Com o site no ar, rode no Mac, trocando pelo seu domínio:

```bash
node dev/telegram-setup.mjs https://SEU-DOMINIO
```

Ele avisa o Telegram para mandar as mensagens do grupo para `https://SEU-DOMINIO/api/telegram/webhook`, com o segredo. Só precisa fazer isso de novo se mudar de domínio ou de segredo.

## Parte 4 — Testar em produção

1. Abra o site numa aba anônima e escreva no chat. A mensagem aparece no grupo com o código `#XXXX`.
2. Deslize essa mensagem e responda. Ela ganha 👍 e, em poucos segundos, aparece no chat do site.
3. Feche o chat no site, responda de novo e espere até 30s. O avatar ganha o selo vermelho de mensagem nova.
4. Recarregue a página. O histórico continua lá.

---

## Teste local (sem Telegram e sem Redis)

```bash
npm run dev
```

Abre em http://127.0.0.1:8780. Sem `.env.local`, entra no **modo de teste**: as conversas ficam na memória e o servidor mostra no console o que postaria no grupo, com o código e o número da mensagem. Para simular a sua resposta:

```bash
node dev/reply.mjs A7K2 "Oi! Obrigado pela mensagem."
```

Com `python3 -m http.server` não há `/api`. O chat abre, mas o envio mostra a mensagem de erro, que é o comportamento esperado quando o backend está fora do ar.

> Se o `.env.local` tiver `TELEGRAM_BOT_TOKEN`, o `npm run dev` sai do modo de teste. Aí ele precisa também de `TELEGRAM_CHAT_ID` e das variáveis do Redis.

---

## Custos e limites

- **Telegram:** grátis.
- **Vercel Hobby e Upstash Free:** o widget só consulta o servidor com a aba visível e só se aquele visitante já mandou mensagem. A cada 3s com o chat aberto e conversa recente, 8s quando ela esfria e 30s com o chat fechado. Para um portfólio isso fica dentro dos planos grátis. Se um dia apertar, aumente esses intervalos em `schedule()` no widget.
- **Proteção contra spam:**
  - até 6 mensagens por minuto por conversa;
  - 20 a cada 10 minutos por IP;
  - `CHAT_MAX_PER_HOUR` no total;
  - 200 mensagens por conversa;
  - um campo-isca escondido contra robôs;
  - o endpoint só aceita JSON, então outros sites não conseguem postar nele pelo navegador.

## Privacidade

O que fica guardado no Upstash Redis por **30 dias** depois da última mensagem: o texto das mensagens dos dois lados, o idioma e a página de onde o visitante escreveu. O IP não é guardado. Só um hash dele entra no contador de limite, que expira em 10 minutos. O visitante é identificado só por um código aleatório no `localStorage` do navegador dele. O texto também fica no grupo do Telegram.

## Problemas comuns

Primeiro rode `node dev/telegram-setup.mjs`. Ele mostra se o webhook está ligado, o último erro que o Telegram recebeu do site e se o bot é administrador do grupo.

- **Visitante vê "Não consegui enviar":** veja **Vercel → Logs** e procure `[chat/send]`. As causas mais comuns são token errado, `TELEGRAM_CHAT_ID` errado (sem o `-` ou o id antigo de antes do grupo virar supergrupo) ou o bot ter sido removido do grupo.
- **Suas respostas não aparecem no site (sem 👍):**
  - se o último erro for `403`, o `TELEGRAM_WEBHOOK_SECRET` da Vercel é diferente do usado no passo 3: rode o passo 3 de novo;
  - se não houver erro, confira se você deslizou a mensagem certa;
  - para `#CÓDIGO` solto e para mensagens dentro de tópicos, o bot precisa ser administrador.
- **Respondi e veio ℹ️ "Isso não foi pra nenhum visitante":** você escreveu fora de um tópico de visitante e sem deslizar. Deslize a mensagem do visitante ou comece com `#CÓDIGO`.
- **Tópicos ligados, mas as conversas novas continuam no chat geral:** confira a permissão **Gerenciar tópicos** do bot e espere até 10 minutos. Veja também `[telegram] sem tópico` em **Vercel → Logs**.
- **⚠️ "Não achei a conversa":** a conversa passou de 30 dias, ou você deslizou uma mensagem que não é de visitante (por exemplo um aviso do próprio bot).
- **Quero listar os grupos de novo e o script diz que o webhook está ligado:** `node dev/telegram-setup.mjs --off`, liste, depois ligue de novo com o passo 3.
