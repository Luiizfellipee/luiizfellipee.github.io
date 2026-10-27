// Projetos em destaque: as abas escolhem o estudo de caso exibido. Os links
// "Ver estudo de caso" (#caso-<id>) abrem o caso certo e rolam até o seletor.
// Sem JS todos os casos ficam visíveis e o link rola até o caso correspondente.
import { createTabs } from './tabs.js';

export function initShowcase() {
  const root = document.querySelector('[data-showcase]');
  if (!root) return;
  const tabs = createTabs(root);

  const open = (hash) => {
    const index = tabs.tabs.findIndex((tab) => `#${tab.getAttribute('aria-controls')}` === hash);
    if (index < 0) return false;
    tabs.select(index, { source: 'link' });
    return true;
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href^="#caso-"]');
    if (!link || !open(link.getAttribute('href'))) return;
    event.preventDefault();
    root.scrollIntoView(); // suave via CSS, exceto com movimento reduzido
    tabs.tabs[tabs.current].focus({ preventScroll: true });
    if (location.hash !== `#${root.id}`) history.pushState(null, '', `#${root.id}`);
  });

  if (open(location.hash)) root.scrollIntoView();
}
