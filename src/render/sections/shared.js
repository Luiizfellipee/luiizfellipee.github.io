import { html } from '../html.js';
import { icons } from '../icons.js';

export const sectionHead = ({ id, index, label, title, intro }) => html`
  <header class="section-head" data-reveal>
    <p class="eyebrow"><span class="eyebrow__index">${index}</span> ${label}</p>
    <h2 class="section-title" id="${id}">${title}</h2>
    ${intro ? html`<p class="section-intro">${intro}</p>` : ''}
  </header>
`;

export const tagList = (tags, label = 'Tecnologias') => html`
  <ul class="tags" aria-label="${label}">
    ${tags.map((tag) => html`<li>${tag}</li>`)}
  </ul>
`;

export const externalLink = (href, text, className = 'text-link') => html`
  <a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">
    ${text}${icons.external}<span class="sr-only"> (abre em nova aba)</span>
  </a>
`;
