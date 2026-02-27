
# Capa para o VSL (Video Poster)

## Problema
O primeiro frame do vídeo VSL mostra a Erika de boca aberta, o que não transmite a imagem profissional desejada. O atributo `poster` do `<video>` está vazio.

## Solucao

Criar um **overlay de capa personalizado** em React que aparece sobre o video antes do play. Ao clicar, o overlay desaparece e o video comeca a reproduzir.

A capa tera um design branded com:
- Fundo escuro (cor foreground do tema: `hsl(220 15% 18%)`)
- Logo da marca (`logo-transparent.png`) centralizado
- Titulo elegante em fonte serif: "Making Thinking Visible"
- Subtitulo: "Watch the Introduction"
- Icone de play circular animado (pulse suave)
- A moldura verde existente sera mantida

## Mudancas Tecnicas

### 1. Criar componente `src/components/VideoWithPoster.tsx`
- Componente que encapsula o `<video>` com um overlay absoluto
- Estado `isPlaying` controla visibilidade do overlay
- Ao clicar no overlay, chama `video.play()` e esconde o poster
- Usa o logo, titulo e um botao de play estilizado
- Transicao suave com opacity ao iniciar

### 2. Atualizar `src/pages/Index.tsx`
- Substituir o `<video>` direto pelo novo componente `<VideoWithPoster>`
- Manter toda a moldura verde existente ao redor

### Resultado Visual
```text
+----------------------------------+
|  [moldura verde elegante]        |
|  +----------------------------+  |
|  |                            |  |
|  |     [Logo transparente]    |  |
|  |                            |  |
|  |   Making Thinking Visible  |  |
|  |                            |  |
|  |        ( > Play )          |  |
|  |   Watch the Introduction   |  |
|  |                            |  |
|  +----------------------------+  |
+----------------------------------+
```
