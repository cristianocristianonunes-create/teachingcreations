

## Plano: Adicionar o Segundo Livro à Página /books

### Problema
A página `/books` (componente `src/pages/Books.tsx`) só exibe o primeiro livro. O segundo livro ("Strategic Access") precisa ser adicionado.

### Mudanças

**`src/pages/Books.tsx`:**
- Importar `book-2-cover.png`
- Alterar título da seção para "The Books Behind the Framework"
- Duplicar o bloco grid existente para incluir o segundo livro com:
  - Título: "Strategic Access: Teaching the Interpretive Phase of The Cycle of Thinking™"
  - Descrição focada na fase interpretativa
  - Link: `https://a.co/d/06puS62e`
  - Capa: `book-2-cover.png`
- Manter o layout `grid md:grid-cols-[240px_1fr]` para cada livro, separados por espaçamento vertical

