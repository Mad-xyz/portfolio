/**
 * card-media.js — Animações de mídia nos cards de projetos.
 *
 * Responsabilidades:
 *   · Scroll automático (top→bottom) para capturas longas .webp
 *   · Slideshow com crossfade para múltiplas imagens .webp
 *   · Sincronização entre cards do mesmo projeto (marquee incluso)
 *   · Suporte a prefers-reduced-motion
 *   · IntersectionObserver para pausar animações fora da viewport
 *
 * Para alterar durações globais, edite apenas o objeto CONFIG abaixo.
 */
(function iniciarCardMedia() {

  // ── Configuração centralizada ────────────────────────────────────────────
  var CONFIG = Object.freeze({
    /** Tempo (ms) que cada slide fica visível antes da troca. */
    SLIDE_DURATION_MS  : 2400,
    /** Duração (ms) do crossfade entre slides. Deve corresponder à
     *  transição CSS em .cover-slide-img. */
    SLIDE_FADE_MS      : 350,
    /** Duração (s) do ciclo completo de scroll top→bottom→top. */
    SCROLL_DURATION_S  : 16,
  });

  // ── Mapa de mídias reais por projeto ────────────────────────────────────
  // Listados na ordem que devem aparecer no slideshow.
  var PROJECT_MEDIA = {
    'rs-top-team': [
      'projetos/rs-top-team/img/1 Dashboras.webp',
      'projetos/rs-top-team/img/2 aluno.webp',
      'projetos/rs-top-team/img/3 Equipe .webp',
      'projetos/rs-top-team/img/4 chamda .webp',
      'projetos/rs-top-team/img/5 evento.webp',
      'projetos/rs-top-team/img/6 modalidade.webp',
    ],
    'atlas-gestao': [
      'projetos/atlas-gestao/img/index-atlas.webp',
    ],
    'mhouse-fit': [
      'projetos/mhouse-fit/img/Mhouse.webp',
    ],
    'instagram-dm': [
      'projetos/instagram-dm-downloader/img/DM downloader.webp',
    ],
  };

  // ── Base path: se estamos dentro de projetos/*/index.html,
  //    os caminhos precisam de ../../ para voltar à raiz ────────────────────
  var inSubPage = location.pathname.replace(/\\/g, '/').indexOf('/projetos/') !== -1;
  var mediaBase = inSubPage ? '../../' : '';

  // ── Preferência de redução de movimento ─────────────────────────────────
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Utilitário: criar elemento <img> acessível ───────────────────────────
  function criarImg(src, eager) {
    var img = document.createElement('img');
    img.src = mediaBase + src;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
    return img;
  }

  // ────────────────────────────────────────────────────────────────────────
  // SCROLL: imagem única que desliza do topo até o fim da página
  // ────────────────────────────────────────────────────────────────────────
  function initScrollCovers(covers) {
    covers.forEach(function (mediaEl) {
      var projectId = mediaEl.closest('[data-project]').dataset.project;
      var srcs = PROJECT_MEDIA[projectId];
      if (!srcs || srcs.length === 0) return;

      var img = criarImg(srcs[0], true);
      img.classList.add('cover-scroll-img');

      if (!reducedMotion) {
        img.style.animationDuration = CONFIG.SCROLL_DURATION_S + 's';
      }

      mediaEl.appendChild(img);
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // SLIDESHOW: múltiplas imagens alternando com crossfade
  // Um único setInterval por projeto sincroniza todos os covers relacionados.
  // ────────────────────────────────────────────────────────────────────────

  // Mapa: projectId → { index, srcs, covers, timerId }
  var slideshowState = Object.create(null);

  function criarFramesSlideshow(mediaEl, srcs) {
    srcs.forEach(function (src, i) {
      var img = criarImg(src, i === 0);
      img.classList.add('cover-slide-img');
      if (i === 0) img.classList.add('cover-slide-img--ativo');
      mediaEl.appendChild(img);
    });
  }

  function avancarSlide(projectId) {
    var state = slideshowState[projectId];
    if (!state) return;

    var prevIdx = state.index;
    var nextIdx = (prevIdx + 1) % state.srcs.length;
    state.index = nextIdx;

    // Atualiza TODOS os covers do projeto simultaneamente (inclui clones do marquee)
    state.covers.forEach(function (mediaEl) {
      var imgs = mediaEl.querySelectorAll('.cover-slide-img');
      if (imgs[prevIdx]) imgs[prevIdx].classList.remove('cover-slide-img--ativo');
      if (imgs[nextIdx]) imgs[nextIdx].classList.add('cover-slide-img--ativo');
    });
  }

  function initSlideshowCovers(covers) {
    // Agrupa covers por projeto (original + clones do marquee juntos)
    var porProjeto = Object.create(null);
    covers.forEach(function (mediaEl) {
      var id = mediaEl.closest('[data-project]').dataset.project;
      if (!porProjeto[id]) porProjeto[id] = [];
      porProjeto[id].push(mediaEl);
    });

    Object.keys(porProjeto).forEach(function (projectId) {
      var mediaEls = porProjeto[projectId];
      var srcs = PROJECT_MEDIA[projectId];
      if (!srcs || srcs.length === 0) return;

      // Cria os frames em cada cover
      mediaEls.forEach(function (mediaEl) {
        criarFramesSlideshow(mediaEl, srcs);
      });

      if (reducedMotion || srcs.length <= 1) return;

      // Um único intervalo controla todos os covers deste projeto
      slideshowState[projectId] = {
        index  : 0,
        srcs   : srcs,
        covers : mediaEls,
        timerId: null,
      };

      slideshowState[projectId].timerId = setInterval(function () {
        avancarSlide(projectId);
      }, CONFIG.SLIDE_DURATION_MS);
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // INTERSECTION OBSERVER: pausa scroll CSS quando fora da viewport
  // ────────────────────────────────────────────────────────────────────────
  function initScrollObserver(covers) {
    if (!('IntersectionObserver' in window) || reducedMotion) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var img = entry.target.querySelector('.cover-scroll-img');
          if (!img) return;
          img.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
      },
      { threshold: 0.05 }
    );

    covers.forEach(function (mediaEl) {
      observer.observe(mediaEl.closest('.project-cover') || mediaEl);
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // PONTO DE ENTRADA
  // Executado após defer (DOM + clones do marquee já existem)
  // ────────────────────────────────────────────────────────────────────────
  function init() {
    var scrollCovers = Array.from(
      document.querySelectorAll('[data-media-type="scroll"] .cover-media')
    );
    var slideshowCovers = Array.from(
      document.querySelectorAll('[data-media-type="slideshow"] .cover-media')
    );

    if (scrollCovers.length)    initScrollCovers(scrollCovers);
    if (slideshowCovers.length) initSlideshowCovers(slideshowCovers);

    initScrollObserver(scrollCovers);
  }

  init();

})();
