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

      const elementoInterativo = evento.target.closest('a, button, [role="link"]');
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
    projectGrid.style.touchAction = 'pan-y';
    projectGrid.style.userSelect = 'none';
    projectGrid.style.webkitUserSelect = 'none';

    /*
     * IMPORTANTE:
     * O Chrome pode iniciar o drag nativo de <a href="..."> antes do nosso
     * carrossel assumir o gesto. Para eliminar isso pela raiz, salvamos a URL
     * em data-href e removemos o href dos cards. A navegação passa a ser feita
     * manualmente por clique/teclado. Sem href, não existe link nativo para o
     * Chrome transformar naquele "ghost" cinza com título + URL.
     */
    cardsOriginais.forEach((card) => {
      const href = card.getAttribute('href');
      if (href) card.dataset.href = href;

      card.removeAttribute('href');
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('draggable', 'false');
      card.style.webkitUserDrag = 'none';

      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      clone.setAttribute('draggable', 'false');
      clone.style.webkitUserDrag = 'none';
      projectGrid.appendChild(clone);
    });

    // Nenhum descendente do carrossel pode iniciar drag nativo.
    projectGrid.querySelectorAll('*').forEach((elemento) => {
      if (!(elemento instanceof HTMLElement)) return;
      elemento.draggable = false;
      elemento.style.webkitUserDrag = 'none';
    });

    projectGrid.querySelectorAll('.project-cover').forEach((capa) => {
      capa.style.cursor = 'grab';
      capa.style.touchAction = 'pan-y';
      capa.style.userSelect = 'none';
      capa.style.webkitUserSelect = 'none';
      capa.style.webkitUserDrag = 'none';
    });

    // Última barreira: se algum elemento tentar emitir dragstart, aborta.
    projectGrid.addEventListener(
      'dragstart',
      (evento) => {
        evento.preventDefault();
        evento.stopImmediatePropagation();
      },
      true
    );

    const prefereMovimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
    const DURACAO_VOLTA_MS = 30000;
    const LIMITE_DRAG_PX = 5;
    const SENSIBILIDADE_DRAG = 1;
    const FRICCAO = 0.94;
    const VELOCIDADE_MINIMA_INERCIA = 0.02;
    const VELOCIDADE_MAXIMA_INERCIA = 2.8;

    let posicaoX = 0;
    let larguraDoCiclo = 0;
    let velocidadeAutomatica = 0;
    let velocidadeInercia = 0;
    let arrastando = false;
    let dragConfirmado = false;
    let ponteiroAtivo = null;
    let inicioPonteiroX = 0;
    let inicioPonteiroY = 0;
    let inicioPosicaoX = 0;
    let ultimoPonteiroX = 0;
    let ultimoTempoPonteiro = 0;
    let ultimoFrame = performance.now();
    let cardPressionado = null;
    let ignorarCliqueAte = 0;

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

    function abrirCard(card) {
      if (!card) return;
      const href = card.dataset.href;
      if (href) window.location.assign(href);
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

      // O gesto de arraste começa pela capa/área visual do projeto.
      const capa = evento.target.closest('.project-cover');
      if (!capa || !projectGrid.contains(capa)) return;

      const card = capa.closest('.project-card');
      if (!card) return;

      // Sem href já não existe drag de link, mas isto ainda evita seleção de texto.
      if (evento.pointerType === 'mouse' && evento.cancelable) evento.preventDefault();

      cardPressionado = card;
      arrastando = true;
      dragConfirmado = false;
      ponteiroAtivo = evento.pointerId;
      inicioPonteiroX = evento.clientX;
      inicioPonteiroY = evento.clientY;
      inicioPosicaoX = posicaoX;
      ultimoPonteiroX = evento.clientX;
      ultimoTempoPonteiro = performance.now();
      velocidadeInercia = 0;
      capa.style.cursor = 'grabbing';
    }

    function moverDrag(evento) {
      if (!arrastando || evento.pointerId !== ponteiroAtivo) return;

      const deslocamentoBrutoX = evento.clientX - inicioPonteiroX;
      const deslocamentoY = evento.clientY - inicioPonteiroY;

      if (!dragConfirmado) {
        if (Math.abs(deslocamentoBrutoX) < LIMITE_DRAG_PX) return;

        // Em touch, um gesto predominantemente vertical continua rolando a página.
        if (evento.pointerType !== 'mouse' && Math.abs(deslocamentoY) > Math.abs(deslocamentoBrutoX)) {
          arrastando = false;
          ponteiroAtivo = null;
          cardPressionado = null;
          projectGrid.querySelectorAll('.project-cover').forEach((capa) => {
            capa.style.cursor = 'grab';
          });
          return;
        }

        dragConfirmado = true;
      }

      if (evento.cancelable) evento.preventDefault();

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

      const foiDrag = dragConfirmado;
      const card = cardPressionado;

      arrastando = false;
      dragConfirmado = false;
      ponteiroAtivo = null;
      cardPressionado = null;

      projectGrid.querySelectorAll('.project-cover').forEach((capa) => {
        capa.style.cursor = 'grab';
      });

      if (!foiDrag) {
        velocidadeInercia = 0;
      } else {
        // Evita que um click sintetizado imediatamente após o drag abra o projeto.
        ignorarCliqueAte = performance.now() + 250;
      }

      normalizarPosicao();
      aplicarTransformacao();

      // Como o pointerdown do mouse é preventDefault(), clique simples na capa
      // é resolvido aqui manualmente.
      if (!foiDrag && evento.pointerType === 'mouse') {
        abrirCard(card);
      }
    }

    function cancelarDrag(evento) {
      if (!arrastando || evento.pointerId !== ponteiroAtivo) return;
      arrastando = false;
      dragConfirmado = false;
      ponteiroAtivo = null;
      cardPressionado = null;
      velocidadeInercia = 0;
      projectGrid.querySelectorAll('.project-cover').forEach((capa) => {
        capa.style.cursor = 'grab';
      });
    }

    projectGrid.addEventListener('pointerdown', iniciarDrag, { passive: false });
    window.addEventListener('pointermove', moverDrag, { passive: false });
    window.addEventListener('pointerup', finalizarDrag);
    window.addEventListener('pointercancel', cancelarDrag);

    // Clique normal fora da capa (legenda/texto) ou clique touch abre manualmente.
    projectGrid.addEventListener('click', (evento) => {
      const card = evento.target.closest('.project-card');
      if (!card || !projectGrid.contains(card)) return;

      evento.preventDefault();
      if (performance.now() < ignorarCliqueAte) return;

      const clicouNaCapa = Boolean(evento.target.closest('.project-cover'));
      if (clicouNaCapa && evento.detail > 0) {
        // No mouse, a capa já é tratada no pointerup para separar click de drag.
        // Em touch, o click sintetizado pode abrir normalmente.
        if (window.matchMedia('(pointer: fine)').matches) return;
      }

      abrirCard(card);
    });

    // Mantém acesso por teclado mesmo sem href nativo.
    projectGrid.addEventListener('keydown', (evento) => {
      if (evento.key !== 'Enter' && evento.key !== ' ') return;
      const card = evento.target.closest('.project-card');
      if (!card || card.getAttribute('aria-hidden') === 'true') return;
      evento.preventDefault();
      abrirCard(card);
    });

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
