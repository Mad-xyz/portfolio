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

  // Marquee de Projetos (Auto-scroll)
  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid) {
    const cards = Array.from(projectGrid.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      projectGrid.appendChild(clone);
    });
  }
})();
