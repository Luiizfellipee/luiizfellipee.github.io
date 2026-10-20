// Preferências do usuário e capacidades do dispositivo, compartilhadas pelos efeitos.

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

// Efeitos que reagem ao cursor: só com mouse/trackpad e sem movimento reduzido.
export const pointerEffectsAllowed = () => finePointer.matches && !reducedMotion.matches;

export const onPreferenceChange = (callback) => {
  reducedMotion.addEventListener('change', callback);
  finePointer.addEventListener('change', callback);
};

// Chama `callback(true|false)` quando o elemento entra ou sai da área visível.
export const observeVisibility = (element, callback, rootMargin = '100px 0px') => {
  if (!('IntersectionObserver' in window)) {
    callback(true);
    return () => {};
  }
  const observer = new IntersectionObserver((entries) => callback(entries.at(-1).isIntersecting), { rootMargin });
  observer.observe(element);
  return () => observer.disconnect();
};

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
