/**
 * card-media.js — mídia dos cards de projeto com carregamento progressivo.
 *
 * Regras:
 *   · a cor original do card é o fallback enquanto não existe imagem pronta;
 *   · quando a imagem carrega, a cor some e a imagem assume o card;
 *   · se a imagem falhar, a cor e os textos do card continuam visíveis;
 *   · na home, imagens só entram na rede perto da viewport;
 *   · os cards usam versões WebP leves, próprias para preview;
 *   · o slideshow do R.S. Top Team baixa um frame por vez e só troca quando o próximo terminou de carregar;
 *   · animações respeitam prefers-reduced-motion.
 */
(function iniciarCardMedia() {
  'use strict';

  var CONFIG = Object.freeze({
    SLIDE_DURATION_MS: 2400,
    SCROLL_DURATION_S: 16,
    ROOT_MARGIN: '160px 0px',
    FADE_MS: 350,
  });

  // Versões de 900 px geradas exclusivamente para os cards.
  // As imagens originais de alta resolução continuam preservadas nas páginas dos projetos.
  var PROJECT_MEDIA = {
    'rs-top-team': [
      'projetos/rs-top-team/img/card-1.webp',
      'projetos/rs-top-team/img/card-2.webp',
      'projetos/rs-top-team/img/card-3.webp',
      'projetos/rs-top-team/img/card-4.webp',
      'projetos/rs-top-team/img/card-5.webp',
      'projetos/rs-top-team/img/card-6.webp',
    ],
    'atlas-gestao': ['projetos/atlas-gestao/img/index-atlas-card.webp'],
    'mhouse-fit': ['projetos/mhouse-fit/img/Mhouse-card.webp'],
    'instagram-dm': ['projetos/instagram-dm-downloader/img/DM-downloader-card.webp'],
  };

  var inSubPage = location.pathname.replace(/\\/g, '/').indexOf('/projetos/') !== -1;
  var mediaBase = inSubPage ? '../../' : '';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slideshowState = Object.create(null);
  var preloadCache = Object.create(null);

  function injetarEstilosDeEstado() {
    if (document.getElementById('card-media-state-styles')) return;

    var style = document.createElement('style');
    style.id = 'card-media-state-styles';
    style.textContent = [
      '/* Cor/texto = fallback. Imagem pronta = conteúdo visual do card. */',
      '.project-grid .project-cover[data-media-type] .cover-media{opacity:0;transition:opacity .24s ease}',
      '.project-grid .project-cover.project-cover--media-ready[data-media-type] .cover-media{opacity:1}',
      '.project-grid .project-cover.project-cover--media-ready.rs,',
      '.project-grid .project-cover.project-cover--media-ready.mh,',
      '.project-grid .project-cover.project-cover--media-ready.ig,',
      '.project-grid .project-cover.project-cover--media-ready.ag{background-color:transparent!important}',
      '.project-grid .project-cover[data-media-type]:not(.project-cover--media-ready) .cover-meta,',
      '.project-grid .project-cover[data-media-type]:not(.project-cover--media-ready) .cover-bottom{display:flex!important}',
      '.project-grid .project-cover[data-media-type]:not(.project-cover--media-ready) .cover-name{display:block!important}',
      '.project-grid .project-cover.project-cover--media-ready[data-media-type] .cover-meta,',
      '.project-grid .project-cover.project-cover--media-ready[data-media-type] .cover-bottom,',
      '.project-grid .project-cover.project-cover--media-ready[data-media-type] .cover-name{display:none!important}',
      '/* Contraste do fallback sem mudar a família visual dos cards. */',
      '.project-grid .ig:not(.project-cover--media-ready) .cover-name>span{color:#73204d!important}',
      '.project-grid .ag:not(.project-cover--media-ready) .cover-name>span{color:#245276!important}',
      '@media (prefers-reduced-motion:reduce){.project-grid .project-cover[data-media-type] .cover-media{transition:none}}'
    ].join('');
    document.head.appendChild(style);
  }

  function projectIdFrom(mediaEl) {
    var project = mediaEl.closest('[data-project]');
    return project ? project.dataset.project : '';
  }

  function getCover(mediaEl) {
    return mediaEl.closest('.project-cover');
  }

  function marcarCarregando(mediaEl) {
    var cover = getCover(mediaEl);
    if (!cover || cover.classList.contains('project-cover--media-ready')) return;
    cover.classList.add('project-cover--loading');
    cover.classList.remove('project-cover--media-error');
  }

  function marcarPronto(mediaEl) {
    var cover = getCover(mediaEl);
    if (!cover) return;
    cover.classList.remove('project-cover--loading', 'project-cover--media-error');
    cover.classList.add('project-cover--media-ready');
  }

  function marcarFalhaInicial(mediaEl) {
    var cover = getCover(mediaEl);
    if (!cover || cover.classList.contains('project-cover--media-ready')) return;
    cover.classList.remove('project-cover--loading');
    cover.classList.add('project-cover--media-error');
  }

  function urlDaMidia(src) {
    return mediaBase + src;
  }

  function preCarregar(src) {
    var url = urlDaMidia(src);
    if (preloadCache[url]) return preloadCache[url];

    preloadCache[url] = new Promise(function (resolve, reject) {
      var probe = new Image();
      probe.decoding = 'async';
      probe.onload = function () { resolve(url); };
      probe.onerror = function () {
        delete preloadCache[url];
        reject(new Error('Falha ao carregar ' + url));
      };
      probe.src = url;
    });

    return preloadCache[url];
  }

  function criarImg(src, mediaEl, options) {
    options = options || {};

    var img = document.createElement('img');
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    img.loading = options.eager ? 'eager' : 'lazy';

    try {
      img.fetchPriority = options.priority || 'low';
    } catch (_) {}

    img.addEventListener('load', function () {
      marcarPronto(mediaEl);
      if (typeof options.onLoad === 'function') options.onLoad(img);
    }, { once: true });

    img.addEventListener('error', function () {
      if (options.initial) marcarFalhaInicial(mediaEl);
      if (typeof options.onError === 'function') options.onError(img);
    }, { once: true });

    if (options.initial) marcarCarregando(mediaEl);
    img.src = urlDaMidia(src);
    return img;
  }

  function observarQuandoPerto(targets, callback) {
    var lista = Array.isArray(targets) ? targets : [targets];

    if (!('IntersectionObserver' in window) || inSubPage) {
      callback();
      return;
    }

    var executado = false;
    var observer = new IntersectionObserver(function (entries) {
      if (executado) return;

      for (var i = 0; i < entries.length; i += 1) {
        if (!entries[i].isIntersecting) continue;
        executado = true;
        observer.disconnect();
        callback();
        break;
      }
    }, {
      root: null,
      rootMargin: CONFIG.ROOT_MARGIN,
      threshold: 0.01,
    });

    lista.forEach(function (target) {
      if (target) observer.observe(target);
    });
  }

  function observarAnimacaoScroll(mediaEl, img) {
    if (reducedMotion) {
      img.style.animation = 'none';
      return;
    }

    img.style.animationDuration = CONFIG.SCROLL_DURATION_S + 's';

    var cover = getCover(mediaEl) || mediaEl;
    if (!('IntersectionObserver' in window)) return;

    img.style.animationPlayState = 'paused';

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        img.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0.05 });

    observer.observe(cover);
  }

  function initScrollCover(mediaEl) {
    if (mediaEl.dataset.mediaInitialized === 'true') return;
    mediaEl.dataset.mediaInitialized = 'true';

    var projectId = projectIdFrom(mediaEl);
    var srcs = PROJECT_MEDIA[projectId];
    if (!srcs || !srcs.length) return;

    var img = criarImg(srcs[0], mediaEl, {
      initial: true,
      eager: true,
      priority: inSubPage ? 'high' : 'low',
    });

    img.classList.add('cover-scroll-img');
    mediaEl.appendChild(img);
    observarAnimacaoScroll(mediaEl, img);
  }

  function initScrollCovers(covers) {
    covers.forEach(function (mediaEl) {
      var cover = getCover(mediaEl) || mediaEl;
      observarQuandoPerto(cover, function () {
        initScrollCover(mediaEl);
      });
    });
  }

  function obterFrame(mediaEl, frameIndex) {
    return mediaEl.querySelector('[data-slide-index="' + frameIndex + '"]');
  }

  function anexarFrame(mediaEl, state, frameIndex, initial) {
    var existente = obterFrame(mediaEl, frameIndex);
    if (existente) return existente;

    var img = criarImg(state.srcs[frameIndex], mediaEl, {
      initial: initial,
      eager: true,
      priority: inSubPage && initial ? 'high' : 'low',
    });

    img.classList.add('cover-slide-img');
    img.dataset.slideIndex = String(frameIndex);
    mediaEl.appendChild(img);
    return img;
  }

  function ativarFrameQuandoPronto(mediaEl, prevIdx, nextIdx, img) {
    function trocar() {
      var anterior = obterFrame(mediaEl, prevIdx);
      var proximo = obterFrame(mediaEl, nextIdx);
      if (!proximo || !proximo.complete || !proximo.naturalWidth) return;

      if (anterior) anterior.classList.remove('cover-slide-img--ativo');
      proximo.classList.add('cover-slide-img--ativo');

      if (anterior && anterior !== proximo) {
        window.setTimeout(function () {
          if (!anterior.classList.contains('cover-slide-img--ativo')) anterior.remove();
        }, reducedMotion ? 0 : CONFIG.FADE_MS + 80);
      }
    }

    if (img.complete && img.naturalWidth) trocar();
    else img.addEventListener('load', trocar, { once: true });
  }

  function carregarPrimeiroFrame(state) {
    var src = state.srcs[0];

    preCarregar(src).then(function () {
      state.covers.forEach(function (mediaEl) {
        var img = anexarFrame(mediaEl, state, 0, true);

        function ativar() {
          if (!img.naturalWidth) return;
          img.classList.add('cover-slide-img--ativo');
          marcarPronto(mediaEl);
        }

        if (img.complete && img.naturalWidth) ativar();
        else img.addEventListener('load', ativar, { once: true });
      });
    }).catch(function () {
      state.covers.forEach(marcarFalhaInicial);
    });
  }

  function avancarSlide(projectId) {
    var state = slideshowState[projectId];
    if (!state || state.loading || document.hidden || reducedMotion) return;

    var prevIdx = state.index;
    var nextIdx = (prevIdx + 1) % state.srcs.length;
    state.loading = true;

    preCarregar(state.srcs[nextIdx]).then(function () {
      state.covers.forEach(function (mediaEl) {
        var img = anexarFrame(mediaEl, state, nextIdx, false);
        ativarFrameQuandoPronto(mediaEl, prevIdx, nextIdx, img);
      });
      state.index = nextIdx;
    }).catch(function () {
      // Um frame secundário com falha não substitui o último frame válido.
    }).finally(function () {
      state.loading = false;
    });
  }

  function iniciarSlideshowDoProjeto(projectId, mediaEls) {
    if (slideshowState[projectId]) return;

    var srcs = PROJECT_MEDIA[projectId];
    if (!srcs || !srcs.length) return;

    var state = slideshowState[projectId] = {
      index: 0,
      srcs: srcs,
      covers: mediaEls,
      loading: false,
      timerId: null,
    };

    carregarPrimeiroFrame(state);

    if (!reducedMotion && srcs.length > 1) {
      state.timerId = window.setInterval(function () {
        avancarSlide(projectId);
      }, CONFIG.SLIDE_DURATION_MS);
    }
  }

  function initSlideshowCovers(covers) {
    var porProjeto = Object.create(null);

    covers.forEach(function (mediaEl) {
      var id = projectIdFrom(mediaEl);
      if (!id) return;
      if (!porProjeto[id]) porProjeto[id] = [];
      porProjeto[id].push(mediaEl);
    });

    Object.keys(porProjeto).forEach(function (projectId) {
      var mediaEls = porProjeto[projectId];
      var targets = mediaEls.map(function (mediaEl) {
        return getCover(mediaEl) || mediaEl;
      });

      observarQuandoPerto(targets, function () {
        iniciarSlideshowDoProjeto(projectId, mediaEls);
      });
    });
  }

  function init() {
    injetarEstilosDeEstado();

    var scrollCovers = Array.from(
      document.querySelectorAll('[data-media-type="scroll"] .cover-media')
    );
    var slideshowCovers = Array.from(
      document.querySelectorAll('[data-media-type="slideshow"] .cover-media')
    );

    if (scrollCovers.length) initScrollCovers(scrollCovers);
    if (slideshowCovers.length) initSlideshowCovers(slideshowCovers);
  }

  init();
})();
