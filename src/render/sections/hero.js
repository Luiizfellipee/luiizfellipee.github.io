import { html } from '../html.js';
import { icons } from '../icons.js';

export const renderHero = ({ profile }) => html`
  <section class="hero" id="topo" aria-labelledby="hero-title">
    <div class="hero__grid" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="hero__eyebrow" style="--i: 0">
          <span class="status-dot" aria-hidden="true"></span>
          ${profile.role} na ${profile.company} · ${profile.location}
        </p>
        <h1 class="hero__title" id="hero-title" style="--i: 1">${profile.name}</h1>
        <p class="hero__role" style="--i: 2">${profile.focus}</p>
        <p class="hero__lead" style="--i: 3">${profile.headline}</p>
        <div class="hero__actions" style="--i: 4">
          <a class="button button--primary" href="#projetos">Ver projetos ${icons.arrowRight}</a>
          <a class="button" href="${profile.links.github}" target="_blank" rel="noopener noreferrer">
            ${icons.github} GitHub<span class="sr-only"> (abre em nova aba)</span>
          </a>
          <a class="button" href="${profile.links.linkedin}" target="_blank" rel="noopener noreferrer">
            ${icons.linkedin} LinkedIn<span class="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>

      <figure class="snapshot" style="--i: 5" aria-label="Resumo do perfil">
        <figcaption class="snapshot__bar">
          <span class="snapshot__dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="snapshot__file">profile.yml</span>
        </figcaption>
        <dl class="snapshot__body">
          ${profile.snapshot.map(
            ([key, value]) => html`<div class="snapshot__row"><dt>${key}:</dt><dd>${value}</dd></div>`,
          )}
        </dl>
      </figure>
    </div>
  </section>
`;
