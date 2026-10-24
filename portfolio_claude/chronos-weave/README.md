# Chronos Weave · Skill Tree & Engine Design System TRC Suite

> **Case 17** · Game UI/UX · Engine Pipeline & Technical Systems Design  
> **Gênero / Engine:** Action RPG Monumental / Unreal Engine 5 UMG  
> **Conformidade:** Sony TRC R4017, Microsoft TCR XR-014, 10-Foot UI, L10n (+35%)  
> **Designer:** Erik Placido ([erik.placido@gmail.com](mailto:erik.placido@gmail.com))

---

## ✦ Visão Geral do Projeto

Este estudo de caso demonstra como um Lead Game UI Designer atua na interseção crítica entre arte visual e engenharia de software da engine de jogo. Inspirado em referências como *Path of Exile*, *Horizon Forbidden West* e *Assassin's Creed*, o projeto aborda:

1. **Navegação em Árvore Monumental (Astrolábio Celestial):**
   - Câmera 2D matemática com pan, zoom suave, minimap radar e cálculo dinâmico de menor caminho (Auto-Rota A* / Dijkstra).
   - Os 4 Estados Visuais Canônicos da indústria:
     - **Bloqueado (Locked):** opacidade reduzida, névoa e cálculo preditivo de rota ao passar o cursor.
     - **Disponível para Compra (Available):** anel ciano pulsante em 60 FPS, pronto para investimento.
     - **Adquirido (Acquired):** núcleo preenchido em ouro celestial com fluxo de energia contínuo.
     - **Masterizado (Mastered ✦):** coroa ornamental rotativa e status ápice com som harmônico.
   - Salvaguarda BFS na devolução de pontos (reembolso), garantindo que nenhum nó ativo fique desconectado da raiz (zero nós órfãos).

2. **Design System Atômico de Engine (Unreal Engine UMG / Unity):**
   - Matriz completa de botões com os 5 estados canônicos: *Default*, *Hover*, *Pressed*, *Focused* (contorno para Gamepad) e *Disabled*.
   - Laboratório interativo de fatiamento 9-Slice em tempo real, demonstrando quinas imutáveis de 12px e centro expansível sem pixel stretching.
   - Tipografia escalável para TV a 3 metros de distância (10-Foot Console UI).

3. **Homologação Estrita para Consoles (Sony TRC & Microsoft TCR):**
   - **90% Title Safe (Sony TRC R4017 / Xbox TCR XR-014):** isolamento obrigatório de todos os textos, prompts e medidores contra o overscan físico de televisores.
   - **95% Action Safe:** limites para elementos de fundo e molduras visuais.
   - **Estresse de Localização (+35%):** seletor de idiomas ao vivo demonstrando resistência da UI ao alemão (expansão média de +35%), japonês (CJK com entrelinha ampliada e sem itálicos) e pseudo-localização.

---

## 🛠️ Arquivos do Case

- `index.html`: Estudo de caso completo integrado à navegação global do portfólio.
- `simulator.html`: Simulador interativo autônomo com as 3 suítes técnicas (`[1] Árvore`, `[2] Design System`, `[3] Console TRC`), sintetizador WebAudio e suporte a controles (PS5 / Xbox / PC).
- `assets/astrolabe_bg.jpg`: Backdrop cinematográfico do astrolábio celestial e nebulosa estelar gerado em alta fidelidade.
- `assets/card.jpg`: Imagem de capa do case para listagem na home e no rodapé cíclico.
