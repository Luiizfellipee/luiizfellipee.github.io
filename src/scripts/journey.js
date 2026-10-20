// Jornada: a trilha avança conforme o scroll passa pela seção. Ao interagir
// (clique, teclado, hover), a escolha do usuário prevalece até a seção sair da tela.
import { createTabs } from './tabs.js';
import { clamp, observeVisibility, reducedMotion } from './env.js';

export function initJourney() {
  const root = document.querySelector('[data-journey]');
  const tabsRoot = root?.querySelector('[data-tabs]');
  if (!tabsRoot) return;
  const fill = root.querySelector('[data-journey-fill]');
  const scroller = root.querySelector('[data-journey-scroller]');

  let manual = false;
  let queued = false;

  const keepVisible = (tab) => {
    if (scroller.scrollWidth <= scroller.clientWidth) return;
    const left = tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2;
    scroller.scrollTo({ left, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  };

  const tabs = createTabs(tabsRoot, {
    hover: true,
    onSelect: (index, source) => {
      fill.style.setProperty('--fill', String(index / (tabs.tabs.length - 1)));
      tabs.tabs.forEach((tab, i) => tab.classList.toggle('is-past', i <= index));
      if (source === 'user') manual = true;
      else keepVisible(tabs.tabs[index]);
    },
  });

  // A trilha percorre todas as etapas enquanto sobe de 85% a 25% da altura da janela.
  const update = () => {
    queued = false;
    if (manual) return;
    const top = scroller.getBoundingClientRect().top;
    const progress = clamp((innerHeight * 0.85 - top) / (innerHeight * 0.6));
    const index = Math.round(progress * (tabs.tabs.length - 1));
    if (index !== tabs.current) tabs.select(index, { source: 'scroll' });
  };
  const queue = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };

  observeVisibility(root, (visible) => {
    if (visible) {
      addEventListener('scroll', queue, { passive: true });
      queue();
    } else {
      removeEventListener('scroll', queue);
      manual = false;
    }
  });
  tabs.select(tabs.current, { source: 'init' });
}
