# Case 12 · Conta Simples · TransactionLedger

Parte do portfólio em `../`. Usa a moldura comum (`../shared/`) e está registrado em `../shared/cases.js`.

```
conta-simples-ledger/
  index.html   # o case (HTML + CSS + JS puro, sem build)
  assets/      # cover.webp, card.jpg, prancha-*.webp (recortes da prancha)
  proto/       # build estático da prancha em React (index.html + logos)
```

**Conceito autoral, sem vínculo com a Conta Simples.** O aviso aparece logo abaixo do lede, na ficha e no rodapé. Nome e logo da marca são usados só como referência.

Convertido da página antiga `portfolio/UI/conta-simples-ledger/portfolio.html` (commit de 14/09/2026). A prancha veio de `UI/conta-simples-ledger/dist/`.

## O que tem na página

| Seção | O que mostra | Tipo |
|---|---|---|
| Capa | Topo da prancha | Captura (1920 de largura @2x) |
| Contexto | Hipótese do conceito e brief | Hipótese, sem dado |
| 01 · Anatomia | Extrato com as 7 transações do protótipo, com hover, pressionado, foco e o rótulo de leitor de tela de cada linha; specs dos 4 blocos; captura da seção 1 | **Recriação interativa** com os tokens de `designTokens.ts` e os dados de `mockTransactions.ts` |
| 02 · Família modular | Monolítico × TransactionRow + LedgerGroup (escolhida) | Texto da página antiga |
| 03 · Estados | Os 4 estados com as cores reais; captura da matriz 4 × 3 | Real |
| 04 · Tokens | Tabela com o contraste **recalculado** pela fórmula WCAG 2.1 e o valor declarado riscado ao lado; escala de espaçamento; captura da seção 3 | Real, com correção |
| 05 · Handoff com IA | Trecho do JSON Schema e dos tokens do código React Native; captura da seção 4 | Real (resposta fixa do servidor) |
| Prancha | Captura que vira a prancha de verdade ao clicar (iframe escalado de 1920 × 1080) | Protótipo funcional |
| Próximo passo | Como validar o conceito | Proposta |

## O que mudou em relação à página antiga

- **Removido, como você pediu:** "30% de redução de retrabalho entre squads", "30% de aceleração na entrega" e "100% dos squads usando o mesmo componente".
- **Corrigido:** "40 edge cases validados" virou "as sete transações extremas do protótipo" (`mockTransactions.ts` tem 7). "Dados bancários reais" virou fictícios.
- **Corrigido:** a página antiga mostrava tokens de modo escuro e o estado pressionado como "caju-red @ 8%" (sobra de copiar e colar). O protótipo usa modo claro e pressionado `#F1F3F5`, e é isso que a página mostra agora.
- **Corrigido:** contrastes. A prancha declarava valores que não batem com a fórmula. Os selos de status ficam em AA (6,4–6,8:1), não AAA. O anel de foco tem 5,2:1, não 8,6:1. O texto tachado das recusadas (`#9CA3AF`, 2,5:1) fica abaixo de AA. A afirmação "WCAG AA+ em todos os estados" saiu.
- **Removido:** "eliminando o gargalo que antes consumia horas por sprint" e "Props bien tipados" (erro de digitação).

## Antes de publicar

1. **Voz do texto.** A seção 04 diz "Ao converter este case, recalculei os contrastes". Quem recalculou foi o Claude, durante a conversão. Ajuste se preferir outra formulação.
2. **"Andes".** A prancha chama o padrão de tokens de "Andes", que é o design system do Mercado Livre. A legenda da prancha diz que ele foi usado como referência. Confirme ou explique melhor a relação.
3. **Ferramentas.** A ficha diz "Figma · Antigravity IDE · Google AI Studio · React". Confirme.
4. **Próxima versão da prancha.** Vale atualizar os contrastes declarados em `designTokens.ts` e escurecer `color-text-disabled`.

## Mudanças na prancha para rodar estática

A prancha chamava `/api/ai/generate-schema` (já ao abrir) e `/api/ai/generate-handoff` num servidor Node com a API do Gemini. Em `proto/index.html` entrou um pequeno script (antes do app) que responde a essas rotas com o schema e o código de reserva que o próprio servidor devolve quando não há chave de API (`DEFAULT_TRANSACTION_ROW_SCHEMA` e `DEFAULT_HANDOFF_DOCS` de `server.ts`). Assim a seção 4 aparece preenchida, sem erro de rede. Nada mais foi alterado no build.
