// Efeito de "decodificação" da linha de foco do hero: ao carregar e ao passar o mouse.
// O texto real fica em um elemento oculto para leitores de tela.
import { reducedMotion } from './env.js';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

export function initScramble() {
  const host = document.querySelector('[data-scramble]');
  const target = host?.querySelector('[data-scramble-text]');
  if (!target) return;

  const final = target.textContent;
  let timer = 0;

  const run = () => {
    if (reducedMotion.matches) return;
    let frame = 0;
    clearInterval(timer);
    timer = setInterval(() => {
      target.textContent = [...final]
        .map((ch, i) => (i < frame / 2 || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join('');
      frame += 1;
      if (frame / 2 > final.length) {
        clearInterval(timer);
        target.textContent = final;
      }
    }, 26);
  };

  setTimeout(run, 500);
  host.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') run();
  });
}
