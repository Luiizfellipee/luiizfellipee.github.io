// Cargos da experiência: um aberto por vez. A posição do botão clicado é mantida
// na tela quando um item acima dele fecha (evita o salto de conteúdo).

export function initAccordion() {
  for (const root of document.querySelectorAll('[data-accordion]')) {
    const items = [...root.querySelectorAll('[data-role]')].map((item) => ({
      item,
      button: item.querySelector('[aria-expanded]'),
    }));

    const set = ({ item, button }, open) => {
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    };

    for (const entry of items) {
      entry.button.addEventListener('click', () => {
        const before = entry.button.getBoundingClientRect().top;
        const open = !entry.item.classList.contains('is-open');
        for (const other of items) set(other, other === entry && open);
        const shift = entry.button.getBoundingClientRect().top - before;
        if (Math.abs(shift) > 1) window.scrollBy({ top: shift, behavior: 'instant' });
      });
    }
  }
}
