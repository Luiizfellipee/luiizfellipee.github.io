// Abas acessíveis (padrão WAI-ARIA): clique, setas, Home/End e, opcionalmente, hover.
// Sem JS todos os painéis ficam visíveis (as regras de ocultação dependem de `.js`).

export function createTabs(root, { hover = false, onSelect } = {}) {
  const list = root.querySelector('[role="tablist"]');
  // Só as abas da própria lista: permite abas dentro de painéis de outras abas.
  const tabs = [...(list ?? root).querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
  let current = Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'));

  const select = (index, { focus = false, source = 'user' } = {}) => {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[i]?.classList.toggle('is-active', on);
    });
    if (focus) tabs[index].focus();
    current = index;
    onSelect?.(index, source);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    if (hover) {
      tab.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse' && i !== current) select(i);
      });
    }
  });

  list?.addEventListener('keydown', (event) => {
    const last = tabs.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, { focus: true });
  });

  return {
    select,
    get current() {
      return current;
    },
    tabs,
  };
}

export function initTabs() {
  for (const root of document.querySelectorAll('[data-tabs]:not([data-journey] [data-tabs])')) {
    createTabs(root, { hover: root.hasAttribute('data-tabs-hover') });
  }
}
