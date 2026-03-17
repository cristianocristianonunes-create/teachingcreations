

## Plano: Adicionar o Segundo Livro ("Strategic Access") à Landing Page V2

### Contexto
A Erika lançou o segundo livro, "Strategic Access — Teaching the Interpretive Phase of The Cycle of Thinking™ in Multilingual Classrooms". Preciso integrá-lo sem quebrar o layout existente.

### Recomendação de Posicionamento

A melhor abordagem é **expandir a seção de livros (V2BookSection)** para mostrar os dois livros lado a lado em um layout de grid. O título da seção muda de "The Framework, In Your Hands." para algo como **"The Books Behind the Framework"** e cada livro aparece como um card com sua capa, título, descrição curta e botão de compra na Amazon.

Isso mantém a Hero limpa (apenas o livro 1 como visual principal) e dá destaque adequado aos dois livros na seção dedicada.

### Mudanças Técnicas

1. **Copiar a imagem** do segundo livro para `src/assets/book-2-cover.png`

2. **Reescrever `V2BookSection.tsx`** com layout de 2 colunas:
   - Cada coluna: capa do livro (com sombra) + título + descrição curta + botão "Purchase on Amazon →"
   - Livro 1: mantém os dados atuais (link `https://a.co/d/0cTCikQ0`)
   - Livro 2: "Strategic Access" com link `https://a.co/d/06puS62e`, descrição focada na fase interpretativa do Cycle of Thinking™
   - Título da seção: "The Books Behind the Framework"
   - Em mobile, os livros empilham verticalmente

3. **Nenhuma mudança** na Hero, Footer, ou outras seções.

### Resultado
Seção de livros com 2 cards equilibrados, mantendo a estética visual e a hierarquia de conversão existente.

