// Aparecimento progressivo ao rolar. Sem JS ou com movimento reduzido, o conteúdo
// permanece visível (a classe `reveal-ready` só é aplicada aqui).
import { reducedMotion } from './env.js';

export function initReveal() {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const items = [...document.querySelectorAll('[data-reveal]')];
  // O que já está na tela ao carregar não é animado (evita "piscar").
  // Todas as leituras de layout antes das escritas, para não forçar reflows em série.
  const onScreen = items.filter((el) => el.getBoundingClientRect().top < innerHeight * 0.9);
  for (const el of onScreen) el.classList.add('is-visible');
  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
  );
  items.filter((el) => !el.classList.contains('is-visible')).forEach((el) => observer.observe(el));

  // Ao navegar por âncora ou foco por teclado, revela o destino na hora.
  document.addEventListener('focusin', (event) => {
    event.target.closest?.('[data-reveal]')?.classList.add('is-visible');
  });
}
