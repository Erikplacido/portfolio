# Análise e reconstrução — Terceiro Nome

## Diagnóstico baseado nos arquivos locais

O site é uma exportação Adobe Muse com gerador 2018.1.1.386, jQuery 1.8.3 e estrutura de apresentação repetida em arquivos HTML/CSS. A página inicial se chama apenas HOME. Há conteúdo e links duplicados, preços estáticos, imagens sem descrição alternativa e elementos cuja apresentação depende dos scripts do Muse. Isso dificulta manutenção, acessibilidade, descoberta do catálogo e evolução comercial.

Exemplos concretos:

- `nunca-o-nome-do-menino.html` possui botões para o produto A guerra na Martins Fontes; o ISBN importado tem 12 dígitos. O novo site não divulga esse ISBN como válido nem direciona para o livro errado.
- `contato.html` inclui um trecho PHP com shortcode do Contact Form 7 dentro do HTML exportado. A exportação isolada não disponibiliza esse formulário funcional. A reconstrução usa o perfil real da editora no Instagram; um canal próprio de e-mail ou formulário precisa ser confirmado.
- O diretório contém versões duplicadas e páginas auxiliares de venda, incluindo Pix. Essas rotas comerciais foram direcionadas para o contato na nova versão, mantendo o escopo atual de catálogo.
- As imagens originais incluem composições com fundos e margens. A troca por arquivos de capa limpos é uma melhoria editorial pendente; os arquivos não foram adulterados.

## O que foi entregue

- Nova direção visual com a marca original, vermelho editorial, fundo claro, títulos em serifas e páginas responsivas.
- 178 registros centralizados e páginas estáticas de livros; duas duplicatas consolidadas com aliases.
- Busca insensível a acentos por título, autoria e ISBN válido, seleção de coleção, ordenação e exibição progressiva de 24 resultados.
- Links normais funcionais sem JavaScript; navegação por teclado, foco visível, títulos semânticos e descrição de capas.
- Metadados por página, dados estruturados Book, configuração de canonical e geração de sitemap após definição do domínio.
- Preview protegido contra indexação. Esta configuração deve mudar somente na publicação definitiva.
- Referências comerciais mantidas na Martins Fontes Paulista. Todos os links antigos foram retidos nos dados para revisão, mas não são automaticamente considerados corretos. Até a verificação individual, o botão abre a página inicial da livraria e explica que o leitor deve buscar título ou ISBN. Não são exibidos os preços antigos.

## Integridade da migração

O relatório `import-audit.json` lista ISBNs ausentes/inválidos, destinos que requerem revisão e duplicatas. A verificação de ISBN usa comprimento e dígito verificador; isso não comprova correspondência bibliográfica. A extração preserva os textos, inclusive possíveis erros do original. Subtítulos podem ainda estar unidos ao título; créditos e autoria precisam de revisão editorial em obras coletivas. As galerias, clippings, vinhetas/blog e materiais suplementares não foram migrados como recursos próprios nesta etapa. Os originais continuam disponíveis na raiz para a próxima fase.

## Preparação para venda própria

Separação implementada: catálogo editorial, dados comerciais por produto, configuração global e templates. Cada registro reserva campos para preço em centavos, moeda, SKU, peso e controle de estoque. Valores desconhecidos são nulos; nenhuma disponibilidade ou preço é inventado. O build recusa ativar modo de venda própria enquanto não houver serviço de pedidos.

O modelo `commerce-schema.sql` define produtos, variantes, estoque, reservas com expiração, pedidos, itens com preço histórico, pagamentos e deduplicação de eventos. É uma base inicial testável, não um checkout operacional.

Contrato previsto para o backend:

1. Consultar catálogo e variantes públicas sem expor segredos.
2. Receber itens e endereço e calcular preços, estoque e frete no servidor, sem confiar no navegador.
3. Criar pedido com chave de idempotência e reservar estoque numa transação atômica; liberar reservas expiradas.
4. Criar sessão de pagamento em um provedor escolhido. Dados de cartão ficam com o provedor.
5. Validar assinatura e valor dos webhooks; deduplicar eventos; reconciliar pagamentos e processar transições permitidas de status.
6. Confirmar pedido apenas após validação do pagamento; permitir atendimento, cancelamento, reembolso e expedição com trilha de auditoria.

Para ativar vendas ainda será necessário implementar e testar esse backend, escolher os serviços de pagamento/frete, cadastrar estoque e preços reais, configurar dados da empresa e atendimento, revisar documentos comerciais e de privacidade com responsáveis, e homologar compra, falha, reembolso e entrega. Não existe uma promessa de ativação apenas trocando uma chave.

## Próximas decisões editoriais

Aprovar a direção visual; conferir os títulos e os destinos da livraria; definir as categorias que não existem na fonte; fornecer capas sem composição quando disponíveis; confirmar contato e hospedagem. A nova versão é uma base concreta de revisão, não substituiu o site público.
