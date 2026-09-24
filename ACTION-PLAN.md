# Plano de Ação SEO + LLM — Portfólio Madson Vander

Data: 2026-09-16

O plano abaixo segue a ordem **impacto → esforço → dependências**. Itens já concluídos ficam registrados para facilitar futuras auditorias.

## 1. Concluído nesta rodada — Quick wins

- [x] Criar `robots.txt` na raiz.
- [x] Criar `sitemap.xml` com as páginas públicas.
- [x] Adicionar canonical por página.
- [x] Melhorar titles e meta descriptions.
- [x] Adicionar Open Graph e Twitter Cards.
- [x] Adicionar dados estruturados para site, pessoa, projetos e breadcrumbs.
- [x] Expandir `llms.txt` com todos os projetos e regras de precisão.
- [x] Aprofundar os estudos de caso de R.S. Top Team, MHouse Fit, Instagram DM Downloader e Atlas Gestão.
- [x] Atualizar o README do repositório com URL pública e estrutura de SEO.
- [x] Aplicar lazy loading às mídias pesadas dos cards na home.

## 2. Próxima prioridade — Quick wins

### A. Recompressão das imagens de projeto
**Impacto:** alto para transferência e experiência de carregamento.

Arquivos prioritários:
- `projetos/mhouse-fit/img/Mhouse.webp` — aproximadamente 3,25 MB.
- `projetos/atlas-gestao/img/index-atlas.webp` — aproximadamente 1,59 MB.

Ação:
1. gerar versões menores específicas para os cards;
2. manter a captura completa apenas quando realmente necessária;
3. comparar qualidade visual antes de substituir o original.

### B. Validar o deploy em produção
**Impacto:** alto, porque arquivos no GitHub só ajudam SEO depois que estão publicados.

Confirmar depois do deploy:
- `/robots.txt` retorna 200;
- `/sitemap.xml` retorna 200 e XML válido;
- `/llms.txt` retorna 200;
- todas as cinco URLs do sitemap retornam 200;
- canonical aponta para a própria URL escolhida;
- nenhuma página pública recebe `noindex`.

### C. Google Search Console
**Impacto:** alto para transformar hipóteses em dados.

Depois que o deploy estiver estável:
1. verificar a propriedade do domínio/site;
2. enviar `https://madsdevelop.vercel.app/sitemap.xml`;
3. inspecionar a home e os quatro estudos de caso;
4. acompanhar cobertura, impressões, cliques e consultas sem inferir resultados antes dos dados.

## 3. Estratégico

### A. Melhorar evidência visual dos estudos de caso
Adicionar screenshots reais com legendas e alt text quando as imagens tiverem valor informativo. Priorizar imagens que mostrem uma decisão específica da interface em vez de uma galeria genérica.

### B. Registrar decisões de projeto
Para cada estudo de caso, continuar documentando:
- problema;
- restrições;
- decisão tomada;
- alternativa considerada;
- implementação;
- o que mudaria hoje.

Isso aumenta valor original, experiência de primeira mão e utilidade para pessoas e mecanismos de busca.

### C. Autoridade externa
Sem fabricar menções ou backlinks:
- manter GitHub e LinkedIn completos e consistentes;
- publicar atualizações de projetos quando houver algo real para mostrar;
- linkar para o portfólio a partir dos perfis oficiais;
- buscar menções naturais por meio do trabalho e da documentação dos projetos.

## 4. Manutenção

Mensal ou a cada mudança relevante:
- validar links externos;
- revisar sitemap quando uma página for criada/removida;
- manter `llms.txt` sincronizado com o conteúdo real;
- revisar titles/descriptions ao mudar o foco das páginas;
- atualizar `dateModified` do schema somente quando houver alteração substancial;
- testar mobile e acessibilidade.

Trimestralmente:
- revisar Search Console;
- rodar PageSpeed Insights em home + páginas mais importantes;
- comparar CWV com os limites atuais;
- revisar documentação oficial do Google antes de adotar novos formatos de schema ou “técnicas para IA”.

## 5. O que não fazer

- Não criar centenas de páginas programáticas para este portfólio sem dados e intenção que justifiquem cada URL.
- Não repetir palavras-chave artificialmente.
- Não inventar resultados, clientes, métricas, depoimentos ou experiência.
- Não criar backlinks/menções falsos para tentar aumentar visibilidade em IA.
- Não tratar `llms.txt` como substituto de SEO técnico e conteúdo rastreável.
- Não adicionar schema que não corresponda ao conteúdo visível da página.

## 6. Critério de pronto da próxima auditoria

A próxima rodada pode ser considerada completa quando:
- deploy estiver validado;
- sitemap estiver enviado ao Search Console;
- CWV tiver medição real;
- imagens grandes estiverem revisadas;
- não houver links quebrados nas páginas públicas;
- os dados estruturados estiverem válidos e coerentes com o conteúdo visível.
