// Pacote de dados que percorre o pipeline de cada estudo de caso, acendendo cada etapa.
// Só anima enquanto visível (painéis ocultos ficam parados); com movimento reduzido
// todas as etapas ficam acesas.
import { observeVisibility, onPreferenceChange, reducedMotion } from './env.js';

const CYCLE = 5200; // ms

function animate(pipeline) {
  const packet = pipeline.querySelector('[data-packet]');
  if (!packet) return;
  const track = packet.parentElement;
  const nodes = [...pipeline.querySelectorAll('[data-node]')];
  const last = nodes.length - 1;

  let raf = 0;
  let visible = false;
  let start = 0;

  const light = (pos, phase) => {
    nodes.forEach((node, i) => node.classList.toggle('is-on', pos >= i / last - 0.01 && phase < 0.92));
  };

  const tick = (now) => {
    const phase = ((now - start) % CYCLE) / CYCLE;
    const pos = Math.min(1, phase * 1.15);
    packet.style.transform = `translateX(${(pos * track.offsetWidth).toFixed(1)}px)`;
    packet.style.opacity = phase > 0.9 ? String(1 - (phase - 0.9) * 10) : '1';
    light(pos, phase);
    raf = requestAnimationFrame(tick);
  };

  const sync = () => {
    const run = visible && !reducedMotion.matches;
    if (run && !raf) {
      start = performance.now();
      raf = requestAnimationFrame(tick);
    } else if (!run && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    if (reducedMotion.matches) {
      packet.style.opacity = '0';
      light(1, 0);
    }
  };

  observeVisibility(pipeline, (isVisible) => {
    visible = isVisible;
    sync();
  });
  onPreferenceChange(sync);
  sync();
}

export function initPipeline() {
  document.querySelectorAll('[data-pipeline]').forEach(animate);
}
