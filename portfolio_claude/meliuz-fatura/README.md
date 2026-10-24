# Case 11 · Méliuz · Fatura e parcelamento

Parte do portfólio em `../`. Usa a moldura comum (`../shared/`) e está registrado em `../shared/cases.js`.

```
meliuz-fatura/
  index.html   # o case (HTML + CSS + JS puro, sem build)
  assets/      # cover.webp, card.jpg, prototipo.webp, desktop.webp, simulador.webp (capturas)
  proto/       # build estático do protótipo em React (index.html + logos)
```

**Conceito autoral, sem vínculo com o Méliuz.** O aviso aparece logo abaixo do lede, na ficha e no rodapé. Nome e logo da marca são usados só como referência.

Convertido da página antiga `portfolio/UI/meliuz-fatura/portfolio.html` (commit de 14/09/2026). O protótipo veio de `UI/meliuz-fatura/dist/`.

## O que tem na página

| Seção | O que mostra | Tipo |
|---|---|---|
| Capa | Visão omnichannel: simulador do celular e desktop lado a lado | Captura do protótipo (1440 × 900 @2x) |
| Contexto | Premissa do rotativo e brief | Dado público, **fonte pendente** |
| 01 · Omnichannel | Celular esticado × densidade por plataforma (escolhida) e as 3 telas | Texto da página antiga |
| 02 · Simulador | Bottom sheet com entrada (0, 300, 500), 3 planos e quadro de transparência | **Recriação interativa** com a fórmula de `calculatePlansForEntry` |
| 03 · Desktop | Captura do painel desktop e o que ele faz | Captura do protótipo |
| 04 · Revisão com IA | O que o botão "Auditar Termos Bacen" confere e a resposta de exemplo | Real (código) + resposta fixa |
| Protótipo | Captura que vira o protótipo de verdade ao clicar (iframe escalado); links para tela cheia e modo desktop | Protótipo funcional |
| Próximo passo | Como validar o conceito | Proposta |

## O que mudou em relação à página antiga

- **Reescrito:** "No Méliuz Cartões, os dados revelavam…" virou "O ponto de partida são dados públicos…", para não sugerir dado interno.
- **Removido:** "Todos os textos passaram por auditoria de conformidade regulatória". A página agora explica que é uma revisão por IA, um checklist de design e não uma auditoria.
- **Removido:** "100% de paridade visual" como número. "12 lançamentos reais" virou "doze lançamentos fictícios com nomes de lojas reais".
- **Acrescentado:** a resposta de exemplo da IA diz que não há opção pré-marcada, mas o plano de 6x abre selecionado. A página aponta isso como aprendizado. Tire se preferir.

## Antes de publicar

1. **Fonte da premissa.** Você disse que é um dado público. Mande o link: preencha o `<p class="mz-src" hidden>` em `#contexto` e remova o `hidden`.
2. **Ferramentas.** A ficha diz "Figma · Antigravity IDE · Google AI Studio · React". Confirme.

## Correção dos valores do simulador (20/10/2026)

Sem entrada, o protótipo usava valores fixos que não seguiam a própria fórmula (3x de R$ 860,00, 6x de R$ 452,10, 12x de R$ 248,30). Por isso o total do 3x **caía** ao dar R$ 300 de entrada. Agora todos os planos saem da tabela Price, com ou sem entrada:

| Plano (fatura de R$ 2.450,80, sem entrada) | Antes | Agora |
|---|---|---|
| 3x a 1,89% a.m. | R$ 860,00 · total R$ 2.580,00 · IOF R$ 9,80 | R$ 848,01 · total R$ 2.544,02 · IOF R$ 9,31 |
| 6x a 1,89% a.m. | R$ 452,10 · total R$ 2.712,60 · IOF R$ 12,40 | R$ 435,91 · total R$ 2.615,45 · IOF R$ 12,50 |
| 12x a 2,15% a.m. | R$ 248,30 · total R$ 2.979,60 · IOF R$ 18,60 | R$ 233,89 · total R$ 2.806,64 · IOF R$ 18,63 |

No código do protótipo (`portfolio/UI/meliuz-fatura/`): `calculatePlansForEntry` perdeu a exceção para entrada zero, `baseInstallmentPlans` passou a ser `calculatePlansForEntry(currentSpent, 0)` e os valores padrão de IOF e do prompt em `BacenAuditModal.tsx`, `MobileScreen2BottomSheet.tsx` e `server.ts` foram atualizados. O `dist/` foi recompilado (mesmas versões do `package-lock.json`) e copiado para `proto/`. As capturas deste case foram refeitas. A página antiga `UI/meliuz-fatura/portfolio.html` ainda mostra os valores antigos no texto.

## Mudanças no protótipo para rodar estático

O protótipo chamava `/api/audit-bacen` num servidor Node com a API do Gemini. Em `proto/index.html` entrou um pequeno script (antes do app) que responde a essa rota com a mesma resposta de reserva que o próprio app usa quando a chamada falha. Assim não há erro de rede nem no console. Nada mais foi alterado no build.
