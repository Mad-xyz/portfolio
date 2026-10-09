# AVRYUM Digital Studio — Madson Vander | Desenvolvimento Web e Design

Página profissional e portfólio de serviços digitais de **Madson Vander (AVRYUM Digital Studio)**. O site apresenta serviços de desenvolvimento web, sistemas, interfaces responsivas e design gráfico, acompanhado de estudos de caso técnicos de sistemas de gestão, sites institucionais e ferramentas web.

**Site oficial:** https://www.avryum.com.br/

## Serviços e Soluções

- **Sites Institucionais & Landing Pages:** Apresentação profissional para empresas, profissionais e marcas com alta legibilidade e semântica.
- **Sistemas Web & Painéis:** Aplicações para centralização de dados, controle de permissões, presenças e finanças.
- **Interfaces Responsivas:** Experiências otimizadas para desktop, tablets e smartphones.
- **Front-end Moderno:** Implementação modular com HTML5, CSS3, JavaScript, React e Firebase.
- **Design Gráfico:** Identidade visual, banners de divulgação e composições visuais.

## Projetos em Destaque (Estudos de Caso)

- **[R.S. Top Team](projetos/rs-top-team/index.html)** — Sistema de gestão para academias com alunos, equipe, modalidades, presença, eventos e financeiro.
- **[MHouse Fit](projetos/mhouse-fit/index.html)** — Site institucional criado com foco em presença digital e interface para academia local.
- **[Instagram DM Downloader](projetos/instagram-dm-downloader/index.html)** — Extensão em JavaScript para download de mídias no Instagram Direct pela versão web.
- **[Atlas Gestão](projetos/atlas-gestao/index.html)** — Plataforma SaaS multi-tenant para gestão centralizada de academias com isolamento de dados.

## Estrutura do Repositório

```text
index.html                       Página principal (Serviços, Projetos, Sobre, Design e Contato)
projetos/                        Estudos de caso detalhados de cada solução
css/estilos.css                  Design system, variáveis de cor, tipografia e responsividade
js/interacoes.js                 Lógica de interface, navegação e metadados SEO
js/card-media.js                 Carregamento dinâmico e mídia interativa dos cards
js/bibliotecas/liquid-react.js   Renderização visual da imagem principal
imagens/                         Assets visuais, hero art e favicons
robots.txt                       Diretrizes para mecanismos de busca
sitemap.xml                      Mapeamento das páginas públicas
llms.txt                         Resumo contextual factual para agentes e LLMs
vercel.json                      Configuração de deploy com cabeçalhos de segurança (CSP, HSTS)
```

## Como Abrir Localmente

Abra `index.html` em qualquer navegador moderno ou inicie um servidor HTTP local:

```bash
python -m http.server 5500
```

Acesse: `http://localhost:5500`

## SEO e descoberta (revisão de 2026-10-09)

- Título, descrição, Open Graph, Twitter Cards e JSON-LD são servidos no HTML de cada página, sem depender de JavaScript.
- `sitemap.xml` lista as cinco páginas públicas canônicas; atualizar `lastmod` somente quando a página sofrer mudanças significativas.
- `robots.txt` permite rastreamento e informa a localização do sitemap.
- `llms.txt` descreve a AVRYUM e os estudos de caso para ferramentas compatíveis; ele não é um fator de ranqueamento do Google Search.
- Após o deploy: validar os status HTTP e a marcação estruturada, enviar o sitemap ao Search Console e medir Core Web Vitals em dados reais.
