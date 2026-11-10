# XETMON — São Paulo

Jogo de navegador (HTML/CSS/JavaScript, sem build nem dependências) estilo RPG portátil: o Cid Cidoso anda por São Paulo com a action cam caçando os XETMON — os nomes do chat, o XET — e guardando cada um na XETDEX. Projeto independente de fã, sem afiliação com a Twitch ou com o streamer.

## Jogar localmente

```bash
python3 -m http.server 8765 --directory /Users/erikplacido/Documents/xet-hunt
```

Depois abra `http://localhost:8765/dist/`.

## Controles

- WASD / setas: andar (movimento em grade). Shift: correr. Celular: direcional + botões A (filmar) e B (correr).
- E / Espaço / A: filmar o XET à frente ou ler placas e monumentos.
- X: ir para a XETDEX.
- Na gravação: FILMAR abre o visor — aperte de novo quando a agulha estiver na faixa roxa. ZOAR alarga a faixa, SALVE deixa a agulha mais lenta, VAZAR foge.
- Grama alta do Ibirapuera: encontros com XETMON selvagem.
- Chat: `!onde` (rastreia o XETMON mais perto com seta amarela), `!vapo`, `!xetdex`, `!som`. Clicar numa região da barra lateral também rastreia.

## XETMON fujão

Quando o Cid chega perto, o XETMON sai correndo de costas apontando pra ele, com balão de fala "CALOTEIRO!", "CARECA!" ou só uma risadinha (🤭😂🤣). Cada fuga cansa: ele para pra respirar (😮‍💨) e corre menos na próxima. Encostar nele abre a gravação ("Alcançou!"). Os XETMON nascem espalhados pela cidade, a pelo menos 5 tiles uns dos outros.

## Tutorial

Na primeira live aparece um tutorial em 7 etapas logo abaixo do player (andar, correr, ler monumentos, rastrear, perseguir, filmar, XETDEX). Cada etapa conclui sozinha quando você faz a ação. Dá pra pular, e refazer em "Como jogar".

## O que tem no mapa

Mapa de 112×76 tiles. Av. Paulista (MASP com vão livre, Torre de TV, prédio-pirâmide, Conjunto Nacional, ciclovia), Parque Trianon, Beco do Batman, Catedral da Sé com Marco Zero, Copan, Theatro Municipal, calçadão de pedra portuguesa com o mapa do estado de SP, Banespão, Estação da Luz, feira com pastel e caldo de cana, Ibirapuera (Obelisco, Oca, Auditório, lago com patos, ipês), Marginal Pinheiros, Ponte Estaiada, campo de várzea, quebrada colorida, Liberdade (torii e lanternas), Mercadão, Rua Augusta, 25 de Março com camelôs, Estádio do Pacaembu, Ponte Cidade Jardim, baile funk com paredão, Bar do Zé, Av. dos Bandeirantes, autódromo de Interlagos, bares da Vila Madalena, Zoológico (capivaras, macacos, girafa, flamingos) e a prainha da represa. Trânsito, motoboy, ciclista e pombos que voam quando o Cid chega perto.

## Nomes do XET

A lista padrão tem 105 nomes divididos em categorias (Lore do Cid, Calvície, Absurdo, Rango duvidoso, Bicho, Máquina, Quinta série). Em "Editar XET" dá pra trocar a lista: um nome por linha, até 200 nomes de 32 caracteres. Cada nome ganha automaticamente emoji, fonte e cor de chat.

A lista e as capturas ficam salvas no localStorage deste navegador (chave `xet-hunt-v2`; capturas da versão anterior são importadas).

## Som

Trilha: `dist/audio/trilha-8bit.mp3` (8bit VR, instrumental, convertida do WAV para MP3 192 kbps), em loop; acelera levemente durante a gravação. Efeitos (passos, captura, buzina) são sintetizados com Web Audio. O som pausa quando a aba fica oculta. Preferência por movimento reduzido desativa flashes e animações.

## Arquivos

`dist/index.html`, `dist/style.css`, `dist/game.js`. Fontes via Google Fonts, com alternativas locais.
