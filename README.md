# Portfólio do Madson

Esta versão mantém o mesmo conteúdo e o mesmo visual do portfólio, mas usa arquivos simples para facilitar a edição:

```text
index.html                    Página inicial
projetos/                     Uma página HTML para cada projeto
css/estilos.css               Cores, espaçamentos, tipografia e responsividade
js/interacoes.js              Cursor quadrado e abas da seção Design
js/bibliotecas/liquid-react.js Efeito Liquid original isolado em JavaScript
js/efeito-liquid.js             Alternativa leve e editável para o efeito
imagens/                      Imagem principal e favicon
```

## Como editar

1. Abra `index.html` para alterar os textos da página inicial.
2. Abra `css/estilos.css` para mudar cores, tamanhos ou margens.
3. Abra `js/interacoes.js` para alterar o cursor ou as abas.
4. O efeito da imagem fica isolado em `js/bibliotecas/liquid-react.js`. O arquivo `js/efeito-liquid.js` contém uma alternativa curta caso você queira experimentar um efeito mais simples.
5. As páginas completas dos projetos ficam em `projetos/rs-top-team/index.html` e `projetos/mhouse-fit/index.html`.

Os links principais estão no próprio HTML e usam âncoras simples:

```html
<a href="#projetos">Projetos</a>
<a href="#sobre">Sobre mim</a>
<a href="#design">Design</a>
```

## Como abrir no computador

É possível abrir `index.html` diretamente no navegador. Para testar com um servidor local, abra o terminal nesta pasta e use:

```bash
python -m http.server 5500
```

Depois visite `http://localhost:5500`.

Não é necessário instalar Node.js, npm, pnpm, React ou outra dependência para editar e visualizar esta versão.
