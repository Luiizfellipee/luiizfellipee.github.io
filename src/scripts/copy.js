// Botão "copiar e-mail" com retorno acessível.

export function initCopy() {
  const status = document.querySelector('[data-copy-status]');

  for (const button of document.querySelectorAll('[data-copy]')) {
    if (!navigator.clipboard) {
      button.hidden = true;
      continue;
    }
    const original = button.getAttribute('aria-label');
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.setAttribute('aria-label', 'E-mail copiado');
        button.classList.add('is-copied');
        if (status) status.textContent = 'E-mail copiado para a área de transferência.';
        setTimeout(() => {
          button.setAttribute('aria-label', original);
          button.classList.remove('is-copied');
        }, 2000);
      } catch {
        if (status) status.textContent = 'Não foi possível copiar o e-mail.';
      }
    });
  }
}
