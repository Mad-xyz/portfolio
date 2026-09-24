# Auditoria SEO + LLM — Portfólio Madson Vander

Data da revisão: 2026-09-16

## A) Resumo da auditoria

**Escopo:** auditoria do site completo, incluindo página inicial, quatro estudos de caso, rastreabilidade, metadados, dados estruturados, imagens, conteúdo, GitHub e preparação para mecanismos de busca tradicionais e agentes de IA.

**Estado geral após as correções:** **Bom**, com base técnica e editorial significativamente melhorada. Não atribuo uma nota numérica global porque não houve medição real de Core Web Vitals/CrUX/PageSpeed nem dados do Google Search Console; transformar isso em número daria uma falsa precisão.

### Principais problemas encontrados antes da implementação

1. Não existiam `robots.txt` nem `sitemap.xml` no repositório.
2. A home e os estudos de caso não tinham canonical, Open Graph, Twitter Cards e dados estruturados completos no HTML inicial.
3. O `llms.txt` existia, mas não listava Atlas Gestão nem Instagram DM Downloader.
4. Atlas Gestão e Instagram DM Downloader tinham conteúdo visível muito curto para explicar contexto, escopo e decisões de implementação.
5. As capturas longas de MHouse Fit e Atlas eram iniciadas como `eager` na home, apesar de ficarem abaixo da dobra; os arquivos são grandes e podiam competir com o carregamento inicial.

### Principais oportunidades implementadas

1. `robots.txt` + `sitemap.xml` com URLs absolutas.
2. Titles, descriptions, canonical, robots meta, Open Graph e Twitter Cards.
3. JSON-LD com `WebSite`, `Person`, `WebPage`, `CreativeWork`/`SoftwareSourceCode` e `BreadcrumbList` conforme o contexto.
4. Estudos de caso ampliados com experiência real, tecnologias, limitações e escopo verificável.
5. `llms.txt` expandido com todas as páginas, projetos, repositórios, identidade e regras de precisão.
6. Lazy loading das mídias pesadas da home para reduzir a competição com o hero.
7. README do repositório atualizado para explicar site, projetos e arquivos de descoberta.

---

## B) Findings

| Área | Severidade | Confiança | Finding | Evidência | Impacto | Fix / estado |
|---|---|---|---|---|---|---|
| Crawl / descoberta | Pass | Confirmed | Sitemap e robots agora existem | `robots.txt` aponta para `https://madsdevelop.vercel.app/sitemap.xml`; sitemap lista as 5 páginas públicas | Facilita descoberta e rastreamento das páginas | Implementado |
| Canonical | Pass | Confirmed | Cada página principal possui URL canônica | Home usa `/`; projetos usam seus `index.html` públicos | Reduz ambiguidade entre variações de URL | Implementado |
| Titles e descriptions | Pass | Confirmed | Metadados agora descrevem intenção e projeto de cada página | Titles específicos para home, R.S., MHouse, Instagram DM e Atlas | Melhora entendimento do documento e potencial CTR | Implementado |
| Social previews | Pass | Confirmed | Open Graph e Twitter Cards foram adicionados | `og:title`, `og:description`, `og:url`, `og:image` e equivalentes Twitter | Melhora compartilhamento e representação da página | Implementado |
| Structured data | Pass | Confirmed | Entidades principais possuem JSON-LD | Home: WebSite/Person/WebPage; projetos: CreativeWork ou SoftwareSourceCode + breadcrumbs | Ajuda mecanismos a entender pessoa, site e projetos | Implementado |
| Conteúdo / E-E-A-T | Pass | Confirmed | Estudos de caso passaram a explicar experiência e limitações | Páginas agora descrevem problema, escopo, tecnologias, aprendizado e estado atual | Dá mais valor original e contexto de primeira mão | Implementado |
| Transparência | Pass | Confirmed | O site evita métricas e resultados não comprovados | MHouse não é apresentado como sucesso comercial; projetos em desenvolvimento são identificados como tal | Aumenta confiança e evita claims inventados | Implementado |
| AI / LLM | Pass | Confirmed | `llms.txt` foi expandido sem substituir os fundamentos de SEO | Arquivo lista todas as páginas, código, identidade, tecnologias e limites de precisão | Pode ajudar agentes que adotem o formato | Implementado; complementar |
| Performance de mídia | Warning | Confirmed | Existem capturas grandes | `Mhouse.webp` ~3,25 MB; `index-atlas.webp` ~1,59 MB | Pode aumentar transferência e atrasar exibição quando os cards entram em viewport | Home agora usa lazy loading; recompressão ainda é recomendada |
| Core Web Vitals | Info | Unknown | Não há medição real nesta auditoria | Sem PageSpeed/CrUX/GSC conectado | Não é possível confirmar LCP, INP e CLS | Medir em produção antes de afirmar desempenho |
| Indexação/rankings | Info | Unknown | Não há dados de Search Console nesta auditoria | Sem dados de cobertura, impressões, cliques ou consultas | Não é possível afirmar indexação ou ganho de posição | Conectar GSC e acompanhar após deploy |
| Backlinks / menções | Info | Unknown | Perfil externo não foi quantificado | Sem dataset de backlinks ou monitoramento de menções | Autoridade externa permanece não medida | Avaliar depois que a base on-site estabilizar |

---

## C) Verificação por área

### 1. SEO técnico

**Passou:**
- HTML principal é entregue estaticamente; o conteúdo essencial não depende de JavaScript.
- `lang="pt-BR"` presente.
- sitemap XML criado na raiz.
- robots criado na raiz.
- canonical definido.
- páginas mantêm URLs legíveis e links internos diretos no HTML original.
- HTTPS é esperado no domínio Vercel de produção; o estado do certificado não foi medido por script nesta auditoria.

**Pendente de medição:** redirects HTTP→HTTPS, headers de segurança, resposta 404 real, CWV e status HTTP das URLs após o deploy.

### 2. On-page SEO

**Passou:**
- Um H1 principal por página.
- H2s nos estudos de caso organizam perguntas e tópicos específicos.
- title/description diferentes por página.
- copy evita keyword stuffing e foi escrita para explicar o projeto, não para repetir termos.
- links de projeto e repositórios dão contexto adicional verificável.

### 3. Conteúdo e E-E-A-T

**Passou:**
- A home explica trajetória e ferramentas sem inflar experiência profissional.
- Estudos de caso usam experiência de primeira mão e decisões reais.
- Fontes primárias dos projetos são os próprios repositórios vinculados.
- Limitações são declaradas quando necessário.
- Nome, GitHub, LinkedIn, Instagram e email ajudam na desambiguação da entidade Madson Vander.

### 4. Schema

**Passou:**
- `Person` para Madson Vander.
- `WebSite` + `WebPage` na home.
- `BreadcrumbList` nas páginas internas.
- `SoftwareSourceCode` para projetos que são explicitamente código/software.
- `CreativeWork` para estudo de caso geral.

**Decisão deliberada:** não foi implementado `SearchAction` para o antigo Sitelinks Searchbox e não foi usado `FAQPage` apenas para tentar obter rich results. Esses recursos não devem ser adicionados sem uma finalidade válida e suporte atual do mecanismo de busca.

### 5. GEO / LLM / AI search

**Passou:**
- Conteúdo importante permanece disponível em HTML estático.
- Os estudos de caso têm seções autocontidas e linguagem factual.
- `llms.txt` está na raiz e contém páginas, fatos, links e limites de precisão.
- A identidade do autor é consistente entre site e perfis públicos.

**Observação importante:** `llms.txt` é complementar. A base de descoberta continua sendo HTML rastreável, sitemap, links, conteúdo original e dados estruturados normais. Não foi criado markup fictício “para IA”.

### 6. Performance e imagens

**Melhoria aplicada:** imagens dos cards na home passaram de `eager` para `lazy`, enquanto a página individual ainda pode priorizar sua mídia principal.

**Pendente:** recomprimir `projetos/mhouse-fit/img/Mhouse.webp` e `projetos/atlas-gestao/img/index-atlas.webp`, idealmente mantendo uma versão de exibição menor para cards e a imagem completa apenas onde necessário.

---

## D) Unknowns e follow-ups

- Core Web Vitals reais em mobile e desktop.
- Cobertura/indexação no Google Search Console.
- Consultas e CTR orgânicos.
- Respostas HTTP e redirects do deploy atual.
- Links quebrados externos ao longo do tempo.
- Backlinks, menções e sinais de autoridade fora do site.
- Qualidade final das imagens depois de uma futura recompressão.

Esses itens devem permanecer como **Unknown** até existir evidência mensurável.
