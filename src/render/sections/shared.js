import { html } from '../html.js';

export const pad = (n) => String(n).padStart(2, '0');

export const eyebrow = (index, label) => html`
  <p class="eyebrow"><span>${index}</span><span class="eyebrow__line" aria-hidden="true"></span><span>${label}</span></p>
`;

export const sectionHead = ({ id, index, label, title, intro }) => html`
  <header data-reveal>
    ${eyebrow(index, label)}
    <h2 class="section-title" id="${id}">${title}</h2>
    ${intro ? html`<p class="section-intro">${intro}</p>` : ''}
  </header>
`;

// Botão em pílula. `external` abre em nova aba; `magnetic` ativa o efeito de pointer.js.
export const pill = (href, label, { variant = 'solid', size = '', external = false, magnetic = true, arrow = '' } = {}) => html`
  <a
    class="pill pill--${variant}${size ? ` pill--${size}` : ''}"
    href="${href}"
    ${external ? html`target="_blank" rel="noopener noreferrer"` : ''}
    ${magnetic ? html`data-mag` : ''}
  >${label}${arrow ? html` <span class="pill__arrow" aria-hidden="true">${arrow}</span>` : ''}${external
      ? html`<span class="sr-only"> (abre em nova aba)</span>`
      : ''}</a>
`;

export const chips = (items, { outline = false, className = '', label = 'Tecnologias' } = {}) => html`
  <ul class="chips${className ? ` ${className}` : ''}" aria-label="${label}">
    ${items.map((item) => html`<li class="chip${outline ? ' chip--outline' : ''}">${item}</li>`)}
  </ul>
`;
