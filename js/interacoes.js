/*
 * Interações do portfólio.
 *
 * Este arquivo substitui os pequenos componentes interativos do React.
 * O HTML continua sendo a fonte principal dos textos e da estrutura.
 */
(function iniciarInteracoes() {
  const consultaMovimento = window.matchMedia(
    '(pointer: fine) and (prefers-reduced-motion: no-preference)'
  );
  const cursor = document.querySelector('.square-cursor');

  // Cursor quadrado: só aparece em dispositivos que têm mouse ou trackpad.
  if (cursor && consultaMovimento.matches) {
    const moverCursor = (evento) => {
      cursor.style.transform = `translate3d(${evento.clientX}px, ${evento.clientY}px, 0)`;
      cursor.style.opacity = '1';

      const elementoInterativo = evento.target.closest('a, button');
      cursor.classList.toggle('over', Boolean(elementoInterativo));
      document.documentElement.classList.add('custom-cursor');
    };

    const esconderCursor = () => {
      cursor.style.opacity = '0';
      document.documentElement.classList.remove('custom-cursor');
    };

    window.addEventListener('pointermove', moverCursor);
    document.addEventListener('pointerleave', esconderCursor);
  }

  // Abas da seção Design: todos os painéis já estão no HTML.
  const botoesDasAbas = document.querySelectorAll('[data-slot="tabs-trigger"]');
  const paineisDasAbas = document.querySelectorAll('[data-slot="tabs-content"]');

  function selecionarAba(botaoSelecionado) {
    const idDoPainel = botaoSelecionado.getAttribute('aria-controls');

    botoesDasAbas.forEach((botao) => {
      const estaSelecionado = botao === botaoSelecionado;
      botao.setAttribute('aria-selected', String(estaSelecionado));
      botao.setAttribute('tabindex', estaSelecionado ? '0' : '-1');
      botao.dataset.state = estaSelecionado ? 'active' : 'inactive';
    });

    paineisDasAbas.forEach((painel) => {
      const estaAtivo = painel.id === idDoPainel;
      painel.hidden = !estaAtivo;
      painel.dataset.state = estaAtivo ? 'active' : 'inactive';
    });
  }

  botoesDasAbas.forEach((botao) => {
    botao.addEventListener('click', () => selecionarAba(botao));
    botao.addEventListener('keydown', (evento) => {
      if (evento.key !== 'ArrowRight' && evento.key !== 'ArrowLeft') return;
      evento.preventDefault();
      const indiceAtual = Array.from(botoesDasAbas).indexOf(botao);
      const passo = evento.key === 'ArrowRight' ? 1 : -1;
      const proximoIndice = (indiceAtual + passo + botoesDasAbas.length) % botoesDasAbas.length;
      const proximoBotao = botoesDasAbas[proximoIndice];
      selecionarAba(proximoBotao);
      proximoBotao.focus();
    });
  });

  // Projetos: marquee infinito + arraste horizontal com mouse/touch.
  const projectGrid = document.querySelector('.project-grid');

  if (projectGrid) {
    const cardsOriginais = Array.from(projectGrid.children);
    const quantidadeOriginal = cardsOriginais.length;

    projectGrid.style.animation = 'none';
    projectGrid.style.transform = 'translate3d(0, 0, 0)';
    projectGrid.style.willChange = 'transform';
    projectGrid.style.cursor = 'grab';
    projectGrid.style.touchAction = 'pan-y';
    projectGrid.style.userSelect = 'none';
    projectGrid.style.webkitUserSelect = 'none';

    cardsOriginais.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      clone.querySelectorAll('a, button, input, select, textarea').forEach((elemento) => {
        elemento.setAttribute('tabindex', '-1');
      });
      projectGrid.appendChild(clone);
    });

    projectGrid.querySelectorAll('img, video').forEach((midia) => {
      midia.setAttribute('draggable', 'false');
      midia.addEventListener('dragstart', (evento) => evento.preventDefault());
    });

    const prefereMovimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
    const DURACAO_VOLTA_MS = 30000; //quanto tempo leva para o marquee voltar ao inicio
    const LIMITE_DRAG_PX = 5; //quanto antes do movimento ser considerado um arrasto
    const SENSIBILIDADE_DRAG = 1; //quão mais rápido o grid se move em relação ao mouse
    const FRICCAO = 0.94; //quão rápido o grid desacelera quando você solta o mouse
    const VELOCIDADE_MINIMA_INERCIA = 0.02; //quão rápido o grid para de se mover
    const VELOCIDADE_MAXIMA_INERCIA = 2.8; //quão rápido o grid se move quando você solta o mouse

    let posicaoX = 0;
    let larguraDoCiclo = 0;
    let velocidadeAutomatica = 0;
    let velocidadeInercia = 0;
    let arrastando = false;
    let dragConfirmado = false;
    let bloquearProximoClique = false;
    let ponteiroAtivo = null;
    let inicioPonteiroX = 0;
    let inicioPonteiroY = 0;
    let inicioPosicaoX = 0;
    let ultimoPonteiroX = 0;
    let ultimoTempoPonteiro = 0;
    let ultimoFrame = performance.now();

    function aplicarTransformacao() {
      projectGrid.style.transform = `translate3d(${posicaoX}px, 0, 0)`;
    }

    function normalizarPosicao() {
      if (!larguraDoCiclo) return;
      while (posicaoX <= -larguraDoCiclo) posicaoX += larguraDoCiclo;
      while (posicaoX > 0) posicaoX -= larguraDoCiclo;
    }

    function atualizarMedidas() {
      const primeiroOriginal = projectGrid.children[0];
      const primeiroClone = projectGrid.children[quantidadeOriginal];
      if (!primeiroOriginal || !primeiroClone) return;

      larguraDoCiclo = primeiroClone.offsetLeft - primeiroOriginal.offsetLeft;
      velocidadeAutomatica = larguraDoCiclo / DURACAO_VOLTA_MS;
      normalizarPosicao();
      aplicarTransformacao();
    }

    function animar(agora) {
      const delta = Math.min(agora - ultimoFrame, 50);
      ultimoFrame = agora;

      if (!arrastando && !prefereMovimentoReduzido.matches && larguraDoCiclo > 0) {
        if (Math.abs(velocidadeInercia) > VELOCIDADE_MINIMA_INERCIA) {
          posicaoX += velocidadeInercia * delta;
          velocidadeInercia *= Math.pow(FRICCAO, delta / 16.67);
        } else {
          velocidadeInercia = 0;
          posicaoX -= velocidadeAutomatica * delta;
        }

        normalizarPosicao();
        aplicarTransformacao();
      }

      requestAnimationFrame(animar);
    }

    function iniciarDrag(evento) {
      if (evento.pointerType === 'mouse' && evento.button !== 0) return;

      arrastando = true;
      dragConfirmado = false;
      bloquearProximoClique = false;
      ponteiroAtivo = evento.pointerId;
      inicioPonteiroX = evento.clientX;
      inicioPonteiroY = evento.clientY;
      inicioPosicaoX = posicaoX;
      ultimoPonteiroX = evento.clientX;
      ultimoTempoPonteiro = performance.now();
      velocidadeInercia = 0;
      projectGrid.style.cursor = 'grabbing';
    }

    function moverDrag(evento) {
      if (!arrastando || evento.pointerId !== ponteiroAtivo) return;

      const deslocamentoBrutoX = evento.clientX - inicioPonteiroX;
      const deslocamentoY = evento.clientY - inicioPonteiroY;

      if (!dragConfirmado) {
        if (Math.abs(deslocamentoBrutoX) < LIMITE_DRAG_PX) return;

        if (Math.abs(deslocamentoY) > Math.abs(deslocamentoBrutoX)) {
          arrastando = false;
          ponteiroAtivo = null;
          projectGrid.style.cursor = 'grab';
          return;
        }

        dragConfirmado = true;
        bloquearProximoClique = true;
      }

      const deslocamentoX = deslocamentoBrutoX * SENSIBILIDADE_DRAG;
      posicaoX = inicioPosicaoX + deslocamentoX;
      aplicarTransformacao();

      const agora = performance.now();
      const deltaTempo = agora - ultimoTempoPonteiro;

      if (deltaTempo > 0) {
        velocidadeInercia = ((evento.clientX - ultimoPonteiroX) / deltaTempo) * SENSIBILIDADE_DRAG;
        velocidadeInercia = Math.max(
          -VELOCIDADE_MAXIMA_INERCIA,
          Math.min(VELOCIDADE_MAXIMA_INERCIA, velocidadeInercia)
        );
      }

      ultimoPonteiroX = evento.clientX;
      ultimoTempoPonteiro = agora;
    }

    function finalizarDrag(evento) {
      if (!arrastando || evento.pointerId !== ponteiroAtivo) return;

      arrastando = false;
      ponteiroAtivo = null;
      projectGrid.style.cursor = 'grab';

      if (!dragConfirmado) {
        velocidadeInercia = 0;
      }

      normalizarPosicao();
      aplicarTransformacao();
    }

    projectGrid.addEventListener('pointerdown', iniciarDrag);
    window.addEventListener('pointermove', moverDrag, { passive: true });
    window.addEventListener('pointerup', finalizarDrag);
    window.addEventListener('pointercancel', finalizarDrag);

    projectGrid.addEventListener(
      'click',
      (evento) => {
        if (!bloquearProximoClique) return;
        evento.preventDefault();
        evento.stopPropagation();
        bloquearProximoClique = false;
        dragConfirmado = false;
      },
      true
    );

    projectGrid.addEventListener('pointerdown', () => {
      bloquearProximoClique = false;
    }, { capture: true });

    if ('ResizeObserver' in window) {
      const observadorTamanho = new ResizeObserver(atualizarMedidas);
      observadorTamanho.observe(projectGrid);
    } else {
      window.addEventListener('resize', atualizarMedidas);
    }

    window.addEventListener('load', atualizarMedidas, { once: true });
    atualizarMedidas();
    requestAnimationFrame(animar);
  }
})();
