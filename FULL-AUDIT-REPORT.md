# Auditoria SEO + LLM â€” PortfÃ³lio Madson Vander

Data da revisÃ£o: 2026-09-16

## A) Resumo da auditoria

**Escopo:** auditoria do site completo, incluindo pÃ¡gina inicial, quatro estudos de caso, rastreabilidade, metadados, dados estruturados, imagens, conteÃºdo, GitHub e preparaÃ§Ã£o para mecanismos de busca tradicionais e agentes de IA.

**Estado geral apÃ³s as correÃ§Ãµes:** **Bom**, com base tÃ©cnica e editorial significativamente melhorada. NÃ£o atribuo uma nota numÃ©rica global porque nÃ£o houve mediÃ§Ã£o real de Core Web Vitals/CrUX/PageSpeed nem dados do Google Search Console; transformar isso em nÃºmero daria uma falsa precisÃ£o.

### Principais problemas encontrados antes da implementaÃ§Ã£o

1. NÃ£o existiam `robots.txt` nem `sitemap.xml` no repositÃ³rio.
2. A home e os estudos de caso nÃ£o tinham canonical, Open Graph, Twitter Cards e dados estruturados completos no HTML inicial.
3. O `llms.txt` existia, mas nÃ£o listava Atlas GestÃ£o nem Instagram DM Downloader.
4. Atlas GestÃ£o e Instagram DM Downloader tinham conteÃºdo visÃ­vel muito curto para explicar contexto, escopo e decisÃµes de implementaÃ§Ã£o.
5. As capturas longas de MHouse Fit e Atlas eram iniciadas como `eager` na home, apesar de ficarem abaixo da dobra; os arquivos sÃ£o grandes e podiam competir com o carregamento inicial.

### Principais oportunidades implementadas

1. `robots.txt` + `sitemap.xml` com URLs absolutas.
2. Titles, descriptions, canonical, robots meta, Open Graph e Twitter Cards.
3. JSON-LD com `WebSite`, `Person`, `WebPage`, `CreativeWork`/`SoftwareSourceCode` e `BreadcrumbList` conforme o contexto.
4. Estudos de caso ampliados com experiÃªncia real, tecnologias, limitaÃ§Ãµes e escopo verificÃ¡vel.
5. `llms.txt` expandido com todas as pÃ¡ginas, projetos, repositÃ³rios, identidade e regras de precisÃ£o.
6. Lazy loading das mÃ­dias pesadas da home para reduzir a competiÃ§Ã£o com o hero.
7. README do repositÃ³rio atualizado para explicar site, projetos e arquivos de descoberta.

---

## B) Findings

| Ãrea | Severidade | ConfianÃ§a | Finding | EvidÃªncia | Impacto | Fix / estado |
|---|---|---|---|---|---|---|
| Crawl / descoberta | Pass | Confirmed | Sitemap e robots agora existem | `robots.txt` aponta para `https://avryum.vercel.app/sitemap.xml`; sitemap lista as 5 pÃ¡ginas pÃºblicas | Facilita descoberta e rastreamento das pÃ¡ginas | Implementado |
| Canonical | Pass | Confirmed | Cada pÃ¡gina principal possui URL canÃ´nica | Home usa `/`; projetos usam seus `index.html` pÃºblicos | Reduz ambiguidade entre variaÃ§Ãµes de URL | Implementado |
| Titles e descriptions | Pass | Confirmed | Metadados agora descrevem intenÃ§Ã£o e projeto de cada pÃ¡gina | Titles especÃ­ficos para home, R.S., MHouse, Instagram DM e Atlas | Melhora entendimento do documento e potencial CTR | Implementado |
| Social previews | Pass | Confirmed | Open Graph e Twitter Cards foram adicionados | `og:title`, `og:description`, `og:url`, `og:image` e equivalentes Twitter | Melhora compartilhamento e representaÃ§Ã£o da pÃ¡gina | Implementado |
| Structured data | Pass | Confirmed | Entidades principais possuem JSON-LD | Home: WebSite/Person/WebPage; projetos: CreativeWork ou SoftwareSourceCode + breadcrumbs | Ajuda mecanismos a entender pessoa, site e projetos | Implementado |
| ConteÃºdo / E-E-A-T | Pass | Confirmed | Estudos de caso passaram a explicar experiÃªncia e limitaÃ§Ãµes | PÃ¡ginas agora descrevem problema, escopo, tecnologias, aprendizado e estado atual | DÃ¡ mais valor original e contexto de primeira mÃ£o | Implementado |
| TransparÃªncia | Pass | Confirmed | O site evita mÃ©tricas e resultados nÃ£o comprovados | MHouse nÃ£o Ã© apresentado como sucesso comercial; projetos em desenvolvimento sÃ£o identificados como tal | Aumenta confianÃ§a e evita claims inventados | Implementado |
| AI / LLM | Pass | Confirmed | `llms.txt` foi expandido sem substituir os fundamentos de SEO | Arquivo lista todas as pÃ¡ginas, cÃ³digo, identidade, tecnologias e limites de precisÃ£o | Pode ajudar agentes que adotem o formato | Implementado; complementar |
| Performance de mÃ­dia | Warning | Confirmed | Existem capturas grandes | `Mhouse.webp` ~3,25 MB; `index-atlas.webp` ~1,59 MB | Pode aumentar transferÃªncia e atrasar exibiÃ§Ã£o quando os cards entram em viewport | Home agora usa lazy loading; recompressÃ£o ainda Ã© recomendada |
| Core Web Vitals | Info | Unknown | NÃ£o hÃ¡ mediÃ§Ã£o real nesta auditoria | Sem PageSpeed/CrUX/GSC conectado | NÃ£o Ã© possÃ­vel confirmar LCP, INP e CLS | Medir em produÃ§Ã£o antes de afirmar desempenho |
| IndexaÃ§Ã£o/rankings | Info | Unknown | NÃ£o hÃ¡ dados de Search Console nesta auditoria | Sem dados de cobertura, impressÃµes, cliques ou consultas | NÃ£o Ã© possÃ­vel afirmar indexaÃ§Ã£o ou ganho de posiÃ§Ã£o | Conectar GSC e acompanhar apÃ³s deploy |
| Backlinks / menÃ§Ãµes | Info | Unknown | Perfil externo nÃ£o foi quantificado | Sem dataset de backlinks ou monitoramento de menÃ§Ãµes | Autoridade externa permanece nÃ£o medida | Avaliar depois que a base on-site estabilizar |

---

## C) VerificaÃ§Ã£o por Ã¡rea

### 1. SEO tÃ©cnico

**Passou:**
- HTML principal Ã© entregue estaticamente; o conteÃºdo essencial nÃ£o depende de JavaScript.
- `lang="pt-BR"` presente.
- sitemap XML criado na raiz.
- robots criado na raiz.
- canonical definido.
- pÃ¡ginas mantÃªm URLs legÃ­veis e links internos diretos no HTML original.
- HTTPS Ã© esperado no domÃ­nio Vercel de produÃ§Ã£o; o estado do certificado nÃ£o foi medido por script nesta auditoria.

**Pendente de mediÃ§Ã£o:** redirects HTTPâ†’HTTPS, headers de seguranÃ§a, resposta 404 real, CWV e status HTTP das URLs apÃ³s o deploy.

### 2. On-page SEO

**Passou:**
- Um H1 principal por pÃ¡gina.
- H2s nos estudos de caso organizam perguntas e tÃ³picos especÃ­ficos.
- title/description diferentes por pÃ¡gina.
- copy evita keyword stuffing e foi escrita para explicar o projeto, nÃ£o para repetir termos.
- links de projeto e repositÃ³rios dÃ£o contexto adicional verificÃ¡vel.

### 3. ConteÃºdo e E-E-A-T

**Passou:**
- A home explica trajetÃ³ria e ferramentas sem inflar experiÃªncia profissional.
- Estudos de caso usam experiÃªncia de primeira mÃ£o e decisÃµes reais.
- Fontes primÃ¡rias dos projetos sÃ£o os prÃ³prios repositÃ³rios vinculados.
- LimitaÃ§Ãµes sÃ£o declaradas quando necessÃ¡rio.
- Nome, GitHub, LinkedIn, Instagram e email ajudam na desambiguaÃ§Ã£o da entidade Madson Vander.

### 4. Schema

**Passou:**
- `Person` para Madson Vander.
- `WebSite` + `WebPage` na home.
- `BreadcrumbList` nas pÃ¡ginas internas.
- `SoftwareSourceCode` para projetos que sÃ£o explicitamente cÃ³digo/software.
- `CreativeWork` para estudo de caso geral.

**DecisÃ£o deliberada:** nÃ£o foi implementado `SearchAction` para o antigo Sitelinks Searchbox e nÃ£o foi usado `FAQPage` apenas para tentar obter rich results. Esses recursos nÃ£o devem ser adicionados sem uma finalidade vÃ¡lida e suporte atual do mecanismo de busca.

### 5. GEO / LLM / AI search

**Passou:**
- ConteÃºdo importante permanece disponÃ­vel em HTML estÃ¡tico.
- Os estudos de caso tÃªm seÃ§Ãµes autocontidas e linguagem factual.
- `llms.txt` estÃ¡ na raiz e contÃ©m pÃ¡ginas, fatos, links e limites de precisÃ£o.
- A identidade do autor Ã© consistente entre site e perfis pÃºblicos.

**ObservaÃ§Ã£o importante:** `llms.txt` Ã© complementar. A base de descoberta continua sendo HTML rastreÃ¡vel, sitemap, links, conteÃºdo original e dados estruturados normais. NÃ£o foi criado markup fictÃ­cio â€œpara IAâ€.

### 6. Performance e imagens

**Melhoria aplicada:** imagens dos cards na home passaram de `eager` para `lazy`, enquanto a pÃ¡gina individual ainda pode priorizar sua mÃ­dia principal.

**Pendente:** recomprimir `projetos/mhouse-fit/img/Mhouse.webp` e `projetos/atlas-gestao/img/index-atlas.webp`, idealmente mantendo uma versÃ£o de exibiÃ§Ã£o menor para cards e a imagem completa apenas onde necessÃ¡rio.

---

## D) Unknowns e follow-ups

- Core Web Vitals reais em mobile e desktop.
- Cobertura/indexaÃ§Ã£o no Google Search Console.
- Consultas e CTR orgÃ¢nicos.
- Respostas HTTP e redirects do deploy atual.
- Links quebrados externos ao longo do tempo.
- Backlinks, menÃ§Ãµes e sinais de autoridade fora do site.
- Qualidade final das imagens depois de uma futura recompressÃ£o.

Esses itens devem permanecer como **Unknown** atÃ© existir evidÃªncia mensurÃ¡vel.
