// Faixa contínua de tecnologias. Só anima enquanto visível; desacelera com o mouse
// por cima e fica parada com movimento reduzido.
import { observeVisibility, onPreferenceChange, reducedMotion } from './env.js';

const SPEED = 0.6; // px por quadro a 60 fps
const SLOW = 0.12;

export function initMarquee() {
  const box = document.querySelector('[data-marquee]');
  const track = box?.querySelector('[data-marquee-track]');
  if (!track) return;

  let x = 0;
  let speed = SPEED;
  let target = SPEED;
  let visible = false;
  let raf = 0;
  let last = 0;

  const tick = (now) => {
    const step = Math.min(64, now - (last || now - 16.7)) / 16.7;
    last = now;
    speed += (target - speed) * 0.08;
    x -= speed * step;
    const half = track.scrollWidth / 2;
    if (half && -x >= half) x += half;
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    raf = requestAnimationFrame(tick);
  };

  const sync = () => {
    const run = visible && !reducedMotion.matches;
    if (run && !raf) {
      last = 0;
      raf = requestAnimationFrame(tick);
    } else if (!run && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  box.addEventListener('pointerenter', () => (target = SLOW));
  box.addEventListener('pointerleave', () => (target = SPEED));
  observeVisibility(box, (isVisible) => {
    visible = isVisible;
    sync();
  });
  onPreferenceChange(sync);
}
