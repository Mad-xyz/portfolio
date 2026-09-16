/**
 * card-media.js — Animações de mídia nos cards de projetos.
 *
 * Objetivos de performance:
 *   · não baixar capturas pesadas antes de o card se aproximar da viewport;
 *   · carregar somente o primeiro frame do slideshow e buscar os próximos sob demanda;
 *   · manter a cor do card como fallback enquanto a imagem não estiver pronta;
 *   · remover visualmente a cor assim que a mídia carregar;
 *   · pausar animações fora da viewport e respeitar prefers-reduced-motion.
 */
(function iniciarCardMedia() {
  'use strict';

  var CONFIG = Object.freeze({
    SLIDE_DURATION_MS: 2400,
    SCROLL_DURATION_S: 16,
    ROOT_MARGIN: '320px 0px',
  });

  var PROJECT_MEDIA = {
    'rs-top-team': [
      'projetos/rs-top-team/img/1 Dashboras.webp',
      'projetos/rs-top-team/img/2 aluno.webp',
      'projetos/rs-top-team/img/3 Equipe .webp',
      'projetos/rs-top-team/img/4 chamda .webp',
      'projetos/rs-top-team/img/5 evento.webp',
      'projetos/rs-top-team/img/6 modalidade.webp',
    ],
    'atlas-gestao': ['projetos/atlas-gestao/img/index-atlas.webp'],
    'mhouse-fit': ['projetos/mhouse-fit/img/Mhouse.webp'],
    'instagram-dm': ['projetos/instagram-dm-downloader/img/DM downloader.webp'],
  };

  var inSubPage = location.pathname.replace(/\\/g, '/').indexOf('/projetos/') !== -1;
  var mediaBase = inSubPage ? '../../' : '';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slideshowState = Object.create(null);

  function projectIdFrom(mediaEl) {
    var project = mediaEl.closest('[data-project]');
    return project ? project.dataset.project : '';
  }

  function marcarCarregando(mediaEl) {
    var cover = mediaEl.closest('.project-cover');
    if (!cover) return;
    cover.classList.add('project-cover--loading');
    cover.classList.remove('project-cover--media-ready');
  }

  function marcarPronto(mediaEl) {
    var cover = mediaEl.closest('.project-cover');
    if (!cover) return;
    cover.classList.remove('project-cover--loading');
    cover.classList.add('project-cover--media-ready');
  }

  function marcarFalha(mediaEl) {
    var cover = mediaEl.closest('.project-cover');
    if (!cover) return;
    cover.classList.remove('project-cover--loading', 'project-cover--media-ready');
    cover.classList.add('project-cover--media-error');
  }

  function criarImg(src, eager, mediaEl) {
    var img = document.createElement('img');
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
    try { img.fetchPriority = eager ? 'high' : 'low'; } catch (_) {}

    img.addEventListener('load', function () {
      marcarPronto(mediaEl);
    }, { once: true });

    img.addEventListener('error', function () {
      marcarFalha(mediaEl);
    }, { once: true });

    marcarCarregando(mediaEl);
    img.src = mediaBase + src;
    return img;
  }

  function initScrollCover(mediaEl) {
    if (mediaEl.dataset.mediaInitialized === 'true') return;
    mediaEl.dataset.mediaInitialized = 'true';

    var projectId = projectIdFrom(mediaEl);
    var srcs = PROJECT_MEDIA[projectId];
    if (!srcs || !srcs.length) return;

    var img = criarImg(srcs[0], inSubPage, mediaEl);
    img.classList.add('cover-scroll-img');
    if (!reducedMotion) img.style.animationDuration = CONFIG.SCROLL_DURATION_S + 's';
    mediaEl.appendChild(img);
  }

  function ensureSlideFrame(state, frameIndex) {
    state.covers.forEach(function (mediaEl) {
      if (mediaEl.querySelector('[data-slide-index="' + frameIndex + '"]')) return;

      var img = criarImg(state.srcs[frameIndex], inSubPage && frameIndex === 0, mediaEl);
      img.classList.add('cover-slide-img');
      img.dataset.slideIndex = String(frameIndex);
      if (frameIndex === state.index) img.classList.add('cover-slide-img--ativo');
      mediaEl.appendChild(img);
    });
  }

  function avancarSlide(projectId) {
    var state = slideshowState[projectId];
    if (!state || document.hidden) return;

    var prevIdx = state.index;
    var nextIdx = (prevIdx + 1) % state.srcs.length;

    // O próximo frame só entra na rede quando realmente for necessário.
    ensureSlideFrame(state, nextIdx);
    state.index = nextIdx;

    state.covers.forEach(function (mediaEl) {
      var prev = mediaEl.querySelector('[data-slide-index="' + prevIdx + '"]');
      var next = mediaEl.querySelector('[data-slide-index="' + nextIdx + '"]');
      if (prev) prev.classList.remove('cover-slide-img--ativo');
      if (next) next.classList.add('cover-slide-img--ativo');
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
      timerId: null,
    };

    ensureSlideFrame(state, 0);

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
      var alvo = mediaEls[0].closest('.project-cover') || mediaEls[0];

      lazyObserve(alvo, function () {
        iniciarSlideshowDoProjeto(projectId, mediaEls);
      });
    });
  }

  function lazyObserve(target, callback) {
    if (!('IntersectionObserver' in window) || inSubPage) {
      callback();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        callback();
      });
    }, {
      root: null,
      rootMargin: CONFIG.ROOT_MARGIN,
      threshold: 0.01,
    });

    observer.observe(target);
  }

  function initScrollCovers(covers) {
    covers.forEach(function (mediaEl) {
      var alvo = mediaEl.closest('.project-cover') || mediaEl;
      lazyObserve(alvo, function () {
        initScrollCover(mediaEl);
      });
    });
  }

  function initScrollAnimationObserver(covers) {
    if (!('IntersectionObserver' in window) || reducedMotion) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var img = entry.target.querySelector('.cover-scroll-img');
        if (!img) return;
        img.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0.05 });

    covers.forEach(function (mediaEl) {
      observer.observe(mediaEl.closest('.project-cover') || mediaEl);
    });
  }

  function init() {
    var scrollCovers = Array.from(document.querySelectorAll('[data-media-type="scroll"] .cover-media'));
    var slideshowCovers = Array.from(document.querySelectorAll('[data-media-type="slideshow"] .cover-media'));

    if (scrollCovers.length) initScrollCovers(scrollCovers);
    if (slideshowCovers.length) initSlideshowCovers(slideshowCovers);
    initScrollAnimationObserver(scrollCovers);
  }

  init();
})();
