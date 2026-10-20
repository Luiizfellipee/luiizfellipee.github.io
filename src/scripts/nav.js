// Dock: destaca a seção corrente, mantém o link ativo visível quando a lista rola
// na horizontal (telas estreitas) e atualiza a barra de progresso de leitura.
import { reducedMotion } from './env.js';

export function initNav() {
  const list = document.querySelector('[data-nav]');
  const links = [...document.querySelectorAll('[data-nav-link]')];
  const bar = document.querySelector('[data-progress]');
  const sections = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
  if (!list || sections.length === 0) return;

  let active = null;
  let queued = false;

  const reveal = (link) => {
    if (list.scrollWidth <= list.clientWidth) return;
    const item = link.getBoundingClientRect();
    const box = list.getBoundingClientRect();
    const left = list.scrollLeft + item.left - box.left - (box.width - item.width) / 2;
    list.scrollTo({ left, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  };

  const setActive = (id) => {
    active = id;
    for (const link of links) {
      const on = link.hash === `#${id}`;
      link.classList.toggle('is-active', on);
      if (on) {
        link.setAttribute('aria-current', 'location');
        reveal(link);
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };

  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? Math.min(1, scrollY / max) : 0;
    if (bar) bar.style.transform = `scaleX(${progress})`;

    let current = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top < innerHeight * 0.4) current = section.id;
    }
    if (progress > 0.995) current = sections.at(-1).id;
    if (current !== active) setActive(current);
  };

  const queue = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };

  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  update();
}
