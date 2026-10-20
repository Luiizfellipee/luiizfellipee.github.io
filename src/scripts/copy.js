// Botão "Copiar" do e-mail, com retorno visível e anunciado a leitores de tela.

const RESET_AFTER = 1800;

export function initCopy() {
  const status = document.querySelector('[data-copy-status]');

  for (const button of document.querySelectorAll('[data-copy]')) {
    if (!navigator.clipboard) {
      button.hidden = true;
      continue;
    }
    const label = button.querySelector('[data-copy-label]');
    const original = label.textContent;
    let timer = 0;

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        label.textContent = 'Copiado ✓';
        button.classList.add('is-copied');
        if (status) status.textContent = 'E-mail copiado para a área de transferência.';
      } catch {
        label.textContent = 'Não copiado';
        if (status) status.textContent = 'Não foi possível copiar. Use o link do e-mail.';
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        label.textContent = original;
        button.classList.remove('is-copied');
      }, RESET_AFTER);
    });
  }
}
