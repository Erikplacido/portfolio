# Case 10 · Caju · Ativação do cartão

Parte do portfólio em `../`. Usa a moldura comum (`../shared/`) e está registrado em `../shared/cases.js`.

```
caju-cartao/
  index.html   # o case (HTML + CSS + JS puro, sem build)
  assets/      # cover.webp, card.jpg, telas.webp (as 3 telas), prototipo.webp (captura)
  proto/       # build estático do protótipo em React (index.html + logos)
```

**Conceito autoral, sem vínculo com a Caju.** O aviso aparece logo abaixo do lede, na ficha e no rodapé. Nome e logo da marca são usados só como referência.

Convertido da página antiga `portfolio/UI/caju-cartao/portfolio.html` (commit de 14/09/2026). O protótipo veio de `UI/caju-cartao/dist/`.

## O que tem na página

| Seção | O que mostra | Tipo |
|---|---|---|
| Capa | As 3 telas (`telas_caju.png` original) sobre fundo vermelho | Telas do protótipo |
| Contexto | Premissa dos 38% e brief | Dado público, **fonte pendente** |
| 01 · Abordagem | Só QR × código + NFC + QR (escolhida) | Texto da página antiga |
| 02 · Três telas | Imagem das 3 telas e os 3 cartões de anatomia | Telas do protótipo |
| 03 · Senha | Celular com teclado: as 3 regras mudam de cor e a mensagem de erro aparece com tremor | **Recriação interativa** com a mesma lógica de `Screen2Password.tsx` |
| 04 · Motion | Cartão que gira e acende na curva real; tabela com as 8 specs | Recriação + dados reais de `motionSpecs.ts` |
| 05 · Edge cases | Os 5 erros com título, microcopy e ações | Textos exatos de `edgeCases.ts` |
| Protótipo | Captura que vira o protótipo de verdade ao clicar (iframe escalado de 1440 × 900); no celular, abre em nova aba | Protótipo funcional |
| Próximo passo | Como validar o conceito (sem métricas inventadas) | Proposta |

## O que mudou em relação à página antiga

- **Removido:** "Redução drástica de fricção no onboarding" (não há medição num conceito) e o chip "Conformidade PCI-DSS".
- **Reescrito:** "Na Caju Benefícios, identificou-se que…" virou "O ponto de partida é um dado público…", para não sugerir dado interno.
- **Legenda do protótipo:** explica que os selos "PCI-DSS" e "Conforme PCI-DSS & BACEN" fazem parte da proposta visual, não são certificações.

## Antes de publicar

1. **Fonte dos 38%.** Você disse que é um dado público. Mande o link: preencha o `<p class="cj-src" hidden>` em `#contexto` e remova o `hidden`.
2. **Ferramentas.** A ficha diz "Figma · Antigravity IDE · Google AI Studio · React · Motion". Figma e Antigravity vêm da página antiga; AI Studio e Motion vêm do `README.md` e do `package.json` do protótipo. Confirme.
3. **Nome no cartão.** O protótipo mostra "ERIK PLACIDO" como titular; a legenda avisa que é o nome do autor.

## Mudanças no protótipo para rodar estático

Só uma: em `proto/index.html`, o caminho do logo `"/assets/…"` virou `"./assets/…"` para funcionar dentro de uma subpasta. O protótipo da Caju não chama nenhuma API.
