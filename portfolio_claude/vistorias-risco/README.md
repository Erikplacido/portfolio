# Case 09 · Vistorias de Risco

Parte do portfólio em `../`. Usa a moldura comum (`../shared/`) e está registrado em `../shared/cases.js`.

```
vistorias-risco/
  index.html   # o case inteiro (HTML + CSS + JS puro, sem build)
  assets/      # card.jpg (capa do card) e real-*.webp (capturas reais tratadas)
```

**Cliente anonimizado a pedido do autor.** A página, os arquivos e este README não citam o nome nem a marca do cliente: ele aparece como "gestora de riscos do mercado de seguros". O produto é chamado de "Vistorias de Risco". Mantenha assim em qualquer edição, inclusive em `alt`, legendas e nomes de arquivo.

## O que tem na página

| Seção | O que mostra | Tipo |
|---|---|---|
| Capa | Cena com a vistoria em andamento (checklist com "Ajuda solicitada"), a Carta de Melhorias em A4 e o celular do cliente marcando itens como "Feito" em loop. No celular, mostra só a folha e o telefone | Recriação animada |
| Contexto | Brief, 4 números do produto (34 itens, 3 fases, 3 papéis, 3 modelos de laudo), o fluxo de 7 etapas e os 3 papéis | Fatos da documentação |
| 01 · Três fases | Demo da inspeção de um item: fotografar, avaliar (Satisfatório / Com apontamentos), nível de risco, Registrar e Avançar, verificação Conforme / Não Conforme e "Processo Concluído". Roda sozinha e entrega o controle no primeiro toque. Fotos são ilustrações da recomendação 1.1 (extintor obstruído → liberado → piso demarcado) | Recriação interativa |
| 01 · Três fases | Tela de ocorrências do item Extintor | **Captura real** (ambiente de teste) |
| 02 · Remota | Celular do cliente em 4 abas (senha, itens com N/A, Solicitar ajuda, Finalizar com Pendências) que avançam sozinhas até o primeiro toque; do lado do técnico, Análise técnica com Aprovar/Rejeitar e "Rejeições utilizadas: n de 5", pedido de ajuda com os 3 status e a videochamada | Recriação interativa |
| 02 · Remota | Vistoria em andamento com "Ajuda solicitada" no checklist | **Captura real** (ambiente de teste), endereço e telefone pixelizados |
| 03 · Laudo | Carta de Melhorias em A4 com filtro por risco e itens que abrem a recomendação; o item 1 traz antes e depois | Recriação interativa |
| 03 · Laudo | Os 4 formatos de saída (Word, PDF, planilha, e-mail) | Fatos da documentação |
| 03 · Laudo | Prévia real da carta em A4 | **Captura real** (ambiente de teste), logo do cliente trocado por "LOGO" |
| 04 · Paleta | 8 fundos → 3 → 1 (#202738) e as 4 cores de status | Real (scripts de substituição de cores e página de referência de cores do projeto) |
| 05 · Processo | PRD modular, protocolo de task para agentes de IA, exemplos de tasks registradas e a arquitetura | Real (documentação do repositório) |
| Trade-offs | Fotos no banco, laudo no navegador, catálogo duplicado, painel administrativo grande | Análise sobre fatos da documentação |
| Resultado | Seção pronta e **escondida** (`hidden`) esperando os números | Pendente |

## Recriação × real

| Na recriação | Real ou ilustrativo |
|---|---|
| Rótulos e status: Evidência inicial, Tratativa 1/2, Satisfatório, Com apontamentos, Conforme/Não Conforme, Registrar e Avançar, Processo Concluído, Ajuda solicitada, Vistoria Externa, N/A, Solicitar ajuda (500 caracteres), Finalizar com Pendências?, Análise técnica, Rejeições utilizadas n de 5 | Real (código das telas) |
| Link delegado com senha, válido por 30 dias; até 20 fotos por fase; até 5 rejeições; status do pedido de ajuda pendente → contatado → resolvido | Real (documentação e configurações padrão) |
| Títulos dos itens e textos das recomendações (trechos) | Real (catálogo da Carta de Melhorias) |
| Níveis de risco e prazos dos 8 itens do laudo | Ilustrativos. No catálogo, todo item começa como médio e o técnico classifica |
| "Loja Exemplo", "Técnico Exemplo", coordenadas, mensagem de ajuda | Fictícios |
| Fotos do extintor | Ilustrações em CSS |
| Texto "O status fica registrado na fase…" no caminho Não Conforme | Descreve o modelo de dados (fase com status, fotos e comentário), não uma regra de negócio verificada na tela |

## Antes de publicar

1. **Números reais.** O autor vai enviar os resultados. Preencha a seção `#resultado` em `index.html` (título, lede e os quatro `<b data-count>` com legenda) e remova o atributo `hidden`. Se houver números, vale citá-los também no lede do hero.
2. **Confirmar a história.** A narrativa foi montada a partir da documentação, do código e dos commits. Revise principalmente: o papel ("Product design, UI e desenvolvimento front e back-end"), as ferramentas de IA (Cursor e Gemini foram deduzidos dos arquivos de regras do repositório) e os trade-offs.
3. **Confirmar o sigilo.** As capturas são de ambiente de teste com empresas fictícias. Nomes e e-mails reais da equipe aparecem em outras capturas da apresentação original e **não** foram usados.
4. **Posição na lista.** O case é o Case 09 em `shared/cases.js` (era 08 até a entrada do Terraforming Mars). Para mudar a posição, mova o objeto e atualize o `Case 0X` do eyebrow de todos os cases que mudarem de posição.

## Como as capturas foram tratadas

As capturas reais vieram de uma apresentação interna em HTML do próprio projeto (2560×1626). Foram redimensionadas para 1600 px em WebP. Na tela de execução, o endereço e o telefone de contato foram pixelizados. Na prévia do laudo, o logo do cliente virou um espaço reservado. O `card.jpg` é uma montagem dessas duas capturas sobre o fundo #202738.

## O que ficou de fora

Arquivos `.env`, credenciais de teste, a visão de conteúdo do banco, o código do produto e as capturas com nomes e e-mails da equipe (painel de usuários, gerador de laudos, dashboards com saudação nominal). Não publique o repositório do produto.
