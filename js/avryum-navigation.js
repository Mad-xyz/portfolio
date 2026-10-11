/*
 * AVRYUM — navegação mobile acessível.
 * Sem dependências externas, preserva os links e a navegação original.
 */
(() => {
  const button = document.querySelector('.av-menu-button');
  const nav = document.querySelector('#av-primary-nav');
  if (!button || !nav) return;

  const close = (restoreFocus = false) => {
    nav.removeAttribute('data-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu');
    if (restoreFocus) button.focus();
  };

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    if (isOpen) return close();
    nav.dataset.open = 'true';
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Fechar menu');
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      close(true);
    }
  });
  document.addEventListener('pointerdown', event => {
    if (button.getAttribute('aria-expanded') === 'true' &&
        !button.contains(event.target) && !nav.contains(event.target)) close();
  });
  const desktop = matchMedia('(min-width: 961px)');
  desktop.addEventListener('change', event => {
    if (event.matches) close();
  });
})();
