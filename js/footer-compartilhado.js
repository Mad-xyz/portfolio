/* Footer pessoal de Madson Vander. */
/* Conteúdo compartilhado por todas as páginas. */
(function inserirFooterCompartilhado() {
  const script = document.currentScript;
  if (!script) return;
  const footer = `<footer id="contato">
    <div class="eyebrow">CONTATO</div>
    <div class="footer-title">Vamos conversar?</div>
    <p class="footer-lead">Estou em busca de oportunidades como desenvolvedor web júnior. Se você quiser conversar sobre vagas ou trocar uma ideia sobre projetos, é só me chamar:</p>

    <div class="footer-actions">
      <a class="footer-btn-primary" href="mailto:pmadsonm@gmail.com">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
        pmadsonm@gmail.com
      </a>
      <a class="footer-btn-secondary" href="https://www.linkedin.com/in/madsonvander/" target="_blank" rel="noreferrer">
        LinkedIn
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
      </a>
      <a class="footer-btn-secondary" href="https://github.com/Mad-xyz" target="_blank" rel="noreferrer">
        GitHub
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
      </a>
      <a class="footer-btn-secondary" href="https://www.instagram.com/mad.exe" target="_blank" rel="noreferrer">
        Instagram
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
      </a>
    </div>
    <div class="footer-bottom">
      <div class="socials">
        <a href="https://github.com/Mad-xyz" target="_blank" rel="noreferrer" aria-label="GitHub"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/mono.svg" alt="" width="22" height="22"><span class="social-label">GitHub</span></a>
        <a href="https://www.linkedin.com/in/madsonvander/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linkedin/default.svg" alt="" width="22" height="22"><span class="social-label">LinkedIn</span></a>
        <a href="https://www.instagram.com/mad.exe" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/mono.svg" alt="" width="22" height="22"><span class="social-label">Instagram</span></a>
        <a href="mailto:pmadsonm@gmail.com" aria-label="E-mail"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg><span class="social-label">E-mail</span></a>
      </div>
      <span>Madson Vander · Marituba, PA</span>
    </div>
</footer>`;
  script.insertAdjacentHTML('beforebegin', footer);
})();
