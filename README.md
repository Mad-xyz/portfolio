# Madson Vander — Portfólio de Desenvolvimento Front-end e Design

Portfólio pessoal de **Madson Vander**, com projetos de desenvolvimento web, interfaces e design. O site reúne estudos de caso de sistemas para academias, uma extensão para Instagram Web e trabalhos que acompanham minha evolução com HTML, CSS, JavaScript, React e Firebase.

**Site:** https://madsdevelop.vercel.app/

## Projetos em destaque

- **R.S. Top Team** — sistema de gestão para academias com alunos, equipe, modalidades, presença, eventos e financeiro.
- **MHouse Fit** — site institucional criado para uma academia local.
- **Instagram DM Downloader** — extensão em JavaScript para baixar imagens e vídeos recebidos no Instagram Direct pela versão web.
- **Atlas Gestão** — plataforma SaaS multi-tenant em desenvolvimento para gestão de academias.

## Estrutura

```text
index.html                       Página inicial
projetos/                        Estudos de caso dos projetos
css/estilos.css                  Cores, espaçamentos, tipografia e responsividade
js/interacoes.js                 Interações, carrossel e metadados SEO compartilhados
js/card-media.js                 Mídias animadas dos cards
js/bibliotecas/liquid-react.js   Efeito visual da imagem principal
imagens/                         Imagem principal e favicons
robots.txt                       Regras de rastreamento e localização do sitemap
sitemap.xml                      URLs públicas do portfólio
llms.txt                         Resumo factual do site para agentes que adotam o formato
```

## SEO e descoberta

O projeto inclui sitemap XML, robots.txt, URLs canônicas, metadados sociais, dados estruturados e conteúdo descritivo nos estudos de caso. O arquivo `llms.txt` funciona como um resumo complementar para ferramentas que escolham consumir esse formato; ele não substitui HTML semântico, sitemap, conteúdo rastreável nem os fundamentos tradicionais de SEO.

## Como editar

1. Abra `index.html` para alterar os textos da página inicial.
2. Abra `css/estilos.css` para mudar cores, tamanhos ou margens.
3. Abra `js/interacoes.js` para alterar as interações do portfólio.
4. As páginas completas dos projetos ficam dentro de `projetos/`.
5. Ao criar uma nova página pública, revise também `sitemap.xml` e `llms.txt`.

## Como abrir localmente

É possível abrir `index.html` diretamente no navegador. Para testar com um servidor local:

```bash
python -m http.server 5500
```

Depois visite `http://localhost:5500`.

Não é necessário instalar Node.js, npm, pnpm ou React para editar e visualizar este portfólio estático.
