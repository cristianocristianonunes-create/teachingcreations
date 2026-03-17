

## Plano: Corrigir site em branco nos domínios de produção

### Problema identificado

O componente `ComingSoon` usa `useNavigate()` do React Router, mas no `App.tsx`, quando o hostname e `teachingcreations.com`, ele e renderizado **antes** do `<BrowserRouter>`, causando um erro fatal (tela branca).

```text
App.tsx fluxo atual:

  if (isMainDomain) {
    return <ComingSoon />   <-- SEM BrowserRouter! useNavigate() crasha
  }

  return (
    <BrowserRouter>         <-- BrowserRouter so existe aqui
      ...
    </BrowserRouter>
  )
```

### Solucao

**Arquivo:** `src/App.tsx`

Mover o `<BrowserRouter>` para envolver TODA a aplicacao, incluindo o bloco `ComingSoon`:

```text
App.tsx fluxo corrigido:

  return (
    <QueryClientProvider>
      <TooltipProvider>
        <BrowserRouter>          <-- Agora envolve tudo
          {isMainDomain ? (
            <ComingSoon />       <-- Funciona com useNavigate()
          ) : (
            <Routes>...</Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
```

### Arquivos modificados

- `src/App.tsx` -- Reestruturar para que BrowserRouter envolva todo o app

### Resultado esperado

- `teachingcreations.com` -- Exibe a pagina Coming Soon corretamente (sem tela branca)
- `testing.teachingcreations.com` e preview -- Exibe a landing page completa
- O botao "Admin" na pagina Coming Soon funciona corretamente

### Proximo passo apos aprovacao

Apos implementar, sera necessario clicar em **Publish > Update** para que as mudancas aparecam nos dominios reais.

