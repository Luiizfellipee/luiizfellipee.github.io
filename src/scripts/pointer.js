// Um único listener de ponteiro alimenta todos os efeitos ligados ao cursor:
// luz nos cards ([data-spot]), tilt 3D ([data-tilt]), magnetismo ([data-mag]),
// anel que segue o cursor e a luz/parallax do fundo. O laço de animação só roda
// enquanto há movimento a interpolar.
import { onPreferenceChange, pointerEffectsAllowed } from './env.js';

const TILT = 7; // graus por unidade de deslocamento (±3,5° nas bordas)
const MAGNET = { x: 0.28, y: 0.35, max: 14 };
const PARALLAX = 0.05;
const HOVER_TARGETS = 'a, button, [data-hover]';

export function initPointer() {
  const root = document.documentElement;
  const ring = document.querySelector('[data-cursor]');
  const dot = document.querySelector('[data-cursor-dot]');
  const spotlight = document.querySelector('[data-spotlight]');
  const orbs = [...document.querySelectorAll('[data-orb]')].map((el) => ({ el, k: Number(el.dataset.orb) }));

  let enabled = false;
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let rx = x;
  let ry = y;
  let size = 36;
  let hovering = false;
  let spot = null;
  let tilt = null;
  let magnet = null;
  let raf = 0;

  const resetSpot = (el) => {
    el?.style.removeProperty('--mx');
    el?.style.removeProperty('--my');
  };

  const applyTilt = () => {
    if (!tilt) return;
    const r = tilt.getBoundingClientRect();
    const px = (x - r.left) / r.width - 0.5;
    const py = (y - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(1000px) rotateX(${(-py * TILT).toFixed(2)}deg) rotateY(${(px * TILT).toFixed(2)}deg)`;
  };

  const applyMagnet = () => {
    if (!magnet) return;
    const r = magnet.getBoundingClientRect();
    const limit = (v) => Math.max(-MAGNET.max, Math.min(MAGNET.max, v));
    const dx = limit((x - (r.left + r.width / 2)) * MAGNET.x);
    const dy = limit((y - (r.top + r.height / 2)) * MAGNET.y);
    magnet.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  };

  const tick = () => {
    raf = 0;
    rx += (x - rx) * 0.14;
    ry += (y - ry) * 0.14;
    size += ((hovering ? 64 : 36) - size) * 0.2;

    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${(size / 36).toFixed(3)})`;
    spotlight.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    const px = (rx - innerWidth / 2) * PARALLAX;
    const py = (ry - innerHeight / 2) * PARALLAX;
    for (const { el, k } of orbs) el.style.transform = `translate3d(${px * k}px, ${py * k}px, 0)`;

    if (Math.abs(x - rx) > 0.2 || Math.abs(y - ry) > 0.2 || Math.abs((hovering ? 64 : 36) - size) > 0.2) {
      raf = requestAnimationFrame(tick);
    }
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const swap = (current, next, reset) => {
    if (current && current !== next) reset(current);
    return next;
  };

  const onMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    x = event.clientX;
    y = event.clientY;
    const target = event.target instanceof Element ? event.target : null;

    // Luz nos cards: não é movimento, vale também com movimento reduzido.
    spot = swap(spot, target?.closest('[data-spot]') ?? null, resetSpot);
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', `${x - r.left}px`);
      spot.style.setProperty('--my', `${y - r.top}px`);
    }
    if (!enabled) return;

    tilt = swap(tilt, target?.closest('[data-tilt]') ?? null, (el) => (el.style.transform = ''));
    magnet = swap(magnet, target?.closest('[data-mag]') ?? null, (el) => (el.style.transform = ''));
    applyTilt();
    applyMagnet();
    hovering = Boolean(target?.closest(HOVER_TARGETS));
    ring.classList.toggle('is-hover', hovering);
    // O ponto segue o mouse sem atraso; o anel vem interpolado em tick().
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.opacity = dot.style.opacity = '';
    // O cursor do sistema só some depois que o customizado já está na tela.
    root.classList.add('cursor-live');
    schedule();
  };

  const onLeave = () => {
    spot = swap(spot, null, resetSpot);
    tilt = swap(tilt, null, (el) => (el.style.transform = ''));
    magnet = swap(magnet, null, (el) => (el.style.transform = ''));
    ring.style.opacity = dot.style.opacity = '0';
  };

  const update = () => {
    enabled = pointerEffectsAllowed();
    root.classList.toggle('has-cursor', enabled);
    if (!enabled) {
      root.classList.remove('cursor-live');
      onLeave();
      cancelAnimationFrame(raf);
      raf = 0;
      for (const { el } of orbs) el.style.transform = '';
      spotlight.style.transform = '';
    }
  };

  if (!ring || !dot || !spotlight) return;
  ring.style.opacity = dot.style.opacity = '0'; // aparecem no primeiro movimento do mouse
  document.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  onPreferenceChange(update);
  update();
}
