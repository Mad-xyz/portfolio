# Plano de AÃ§Ã£o SEO + LLM â€” PortfÃ³lio Madson Vander

Data: 2026-09-16

O plano abaixo segue a ordem **impacto â†’ esforÃ§o â†’ dependÃªncias**. Itens jÃ¡ concluÃ­dos ficam registrados para facilitar futuras auditorias.

## 1. ConcluÃ­do nesta rodada â€” Quick wins

- [x] Criar `robots.txt` na raiz.
- [x] Criar `sitemap.xml` com as pÃ¡ginas pÃºblicas.
- [x] Adicionar canonical por pÃ¡gina.
- [x] Melhorar titles e meta descriptions.
- [x] Adicionar Open Graph e Twitter Cards.
- [x] Adicionar dados estruturados para site, pessoa, projetos e breadcrumbs.
- [x] Expandir `llms.txt` com todos os projetos e regras de precisÃ£o.
- [x] Aprofundar os estudos de caso de R.S. Top Team, MHouse Fit, Instagram DM Downloader e Atlas GestÃ£o.
- [x] Atualizar o README do repositÃ³rio com URL pÃºblica e estrutura de SEO.
- [x] Aplicar lazy loading Ã s mÃ­dias pesadas dos cards na home.

## 2. PrÃ³xima prioridade â€” Quick wins

### A. RecompressÃ£o das imagens de projeto
**Impacto:** alto para transferÃªncia e experiÃªncia de carregamento.

Arquivos prioritÃ¡rios:
- `projetos/mhouse-fit/img/Mhouse.webp` â€” aproximadamente 3,25 MB.
- `projetos/atlas-gestao/img/index-atlas.webp` â€” aproximadamente 1,59 MB.

AÃ§Ã£o:
1. gerar versÃµes menores especÃ­ficas para os cards;
2. manter a captura completa apenas quando realmente necessÃ¡ria;
3. comparar qualidade visual antes de substituir o original.

### B. Validar o deploy em produÃ§Ã£o
**Impacto:** alto, porque arquivos no GitHub sÃ³ ajudam SEO depois que estÃ£o publicados.

Confirmar depois do deploy:
- `/robots.txt` retorna 200;
- `/sitemap.xml` retorna 200 e XML vÃ¡lido;
- `/llms.txt` retorna 200;
- todas as cinco URLs do sitemap retornam 200;
- canonical aponta para a prÃ³pria URL escolhida;
- nenhuma pÃ¡gina pÃºblica recebe `noindex`.

### C. Google Search Console
**Impacto:** alto para transformar hipÃ³teses em dados.

Depois que o deploy estiver estÃ¡vel:
1. verificar a propriedade do domÃ­nio/site;
2. enviar `https://avryum.vercel.app/sitemap.xml`;
3. inspecionar a home e os quatro estudos de caso;
4. acompanhar cobertura, impressÃµes, cliques e consultas sem inferir resultados antes dos dados.

## 3. EstratÃ©gico

### A. Melhorar evidÃªncia visual dos estudos de caso
Adicionar screenshots reais com legendas e alt text quando as imagens tiverem valor informativo. Priorizar imagens que mostrem uma decisÃ£o especÃ­fica da interface em vez de uma galeria genÃ©rica.

### B. Registrar decisÃµes de projeto
Para cada estudo de caso, continuar documentando:
- problema;
- restriÃ§Ãµes;
- decisÃ£o tomada;
- alternativa considerada;
- implementaÃ§Ã£o;
- o que mudaria hoje.

Isso aumenta valor original, experiÃªncia de primeira mÃ£o e utilidade para pessoas e mecanismos de busca.

### C. Autoridade externa
Sem fabricar menÃ§Ãµes ou backlinks:
- manter GitHub e LinkedIn completos e consistentes;
- publicar atualizaÃ§Ãµes de projetos quando houver algo real para mostrar;
- linkar para o portfÃ³lio a partir dos perfis oficiais;
- buscar menÃ§Ãµes naturais por meio do trabalho e da documentaÃ§Ã£o dos projetos.

## 4. ManutenÃ§Ã£o

Mensal ou a cada mudanÃ§a relevante:
- validar links externos;
- revisar sitemap quando uma pÃ¡gina for criada/removida;
- manter `llms.txt` sincronizado com o conteÃºdo real;
- revisar titles/descriptions ao mudar o foco das pÃ¡ginas;
- atualizar `dateModified` do schema somente quando houver alteraÃ§Ã£o substancial;
- testar mobile e acessibilidade.

Trimestralmente:
- revisar Search Console;
- rodar PageSpeed Insights em home + pÃ¡ginas mais importantes;
- comparar CWV com os limites atuais;
- revisar documentaÃ§Ã£o oficial do Google antes de adotar novos formatos de schema ou â€œtÃ©cnicas para IAâ€.

## 5. O que nÃ£o fazer

- NÃ£o criar centenas de pÃ¡ginas programÃ¡ticas para este portfÃ³lio sem dados e intenÃ§Ã£o que justifiquem cada URL.
- NÃ£o repetir palavras-chave artificialmente.
- NÃ£o inventar resultados, clientes, mÃ©tricas, depoimentos ou experiÃªncia.
- NÃ£o criar backlinks/menÃ§Ãµes falsos para tentar aumentar visibilidade em IA.
- NÃ£o tratar `llms.txt` como substituto de SEO tÃ©cnico e conteÃºdo rastreÃ¡vel.
- NÃ£o adicionar schema que nÃ£o corresponda ao conteÃºdo visÃ­vel da pÃ¡gina.

## 6. CritÃ©rio de pronto da prÃ³xima auditoria

A prÃ³xima rodada pode ser considerada completa quando:
- deploy estiver validado;
- sitemap estiver enviado ao Search Console;
- CWV tiver mediÃ§Ã£o real;
- imagens grandes estiverem revisadas;
- nÃ£o houver links quebrados nas pÃ¡ginas pÃºblicas;
- os dados estruturados estiverem vÃ¡lidos e coerentes com o conteÃºdo visÃ­vel.
