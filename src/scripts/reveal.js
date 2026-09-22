// Aparecimento progressivo ao rolar. Sem JS ou com reduced motion, o conteúdo
// permanece visível (a classe `reveal-ready` só é aplicada aqui).

export function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  const items = [...document.querySelectorAll('[data-reveal]')];
  // Elementos já visíveis no carregamento não são animados (evita "piscar").
  for (const el of items) {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
  }
  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.filter((el) => !el.classList.contains('is-visible')).forEach((el) => observer.observe(el));
}
