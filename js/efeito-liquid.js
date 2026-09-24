/*
 * Efeito Liquid leve e independente.
 *
 * A imagem continua sendo uma imagem comum e editável no HTML. Este brilho
 * acompanha o ponteiro apenas quando há mouse e quando o usuário não pediu
 * redução de movimento, mantendo o mesmo clima visual sem React ou JSX.
 */
(function iniciarEfeitoLiquid() {
  const areaLiquid = document.querySelector('#area-liquid');
  if (!areaLiquid) return;

  const movimentoPermitido = window.matchMedia(
    '(pointer: fine) and (prefers-reduced-motion: no-preference)'
  );
  if (!movimentoPermitido.matches) return;

  const brilho = document.createElement('span');
  brilho.className = 'liquid-brilho';
  brilho.setAttribute('aria-hidden', 'true');
  areaLiquid.appendChild(brilho);

  function atualizarBrilho(evento) {
    const limites = areaLiquid.getBoundingClientRect();
    const posicaoX = evento.clientX - limites.left;
    const posicaoY = evento.clientY - limites.top;
    brilho.style.left = `${posicaoX}px`;
    brilho.style.top = `${posicaoY}px`;
    brilho.style.opacity = '1';
    areaLiquid.style.setProperty('--liquid-x', `${posicaoX}px`);
    areaLiquid.style.setProperty('--liquid-y', `${posicaoY}px`);
  }

  function esconderBrilho() {
    brilho.style.opacity = '0';
  }

  areaLiquid.addEventListener('pointermove', atualizarBrilho);
  areaLiquid.addEventListener('pointerleave', esconderBrilho);
})();
