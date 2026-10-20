import { html } from '../html.js';
import { chips, eyebrow, pad, pill } from './shared.js';

// Estudo de caso completo. Fica dentro da seção de projetos, como no design.
export const renderFeatured = ({ featuredProject: p }) => html`
  <div class="featured" id="destaque">
    <header data-reveal>
      ${eyebrow('05', 'Projeto em destaque')}
      <h2 class="section-title" id="destaque-title">${p.name}</h2>
      <p class="section-intro">${p.summary}</p>
      <p class="featured__kind">${p.kind}</p>
    </header>

    <div class="case" data-reveal aria-labelledby="destaque-title" role="group">
      <div class="scroller" tabindex="0" role="region" aria-label="Fluxo de dados do projeto">
        <div class="pipeline" data-pipeline>
          <div class="pipeline__track" aria-hidden="true"><span class="pipeline__packet" data-packet></span></div>
          <ol class="pipeline__steps">
          ${p.pipeline.map(
            (step, i) => html`<li class="pipeline__step" data-node>
              <span class="pipeline__node" aria-hidden="true">${pad(i + 1)}</span>
              <span>${step}</span>
            </li>`,
            )}
          </ol>
        </div>
      </div>

      <div class="case__grid">
        <div class="case__block">
          <h3 class="case__label">01 Problema</h3>
          <p class="case__text">${p.problem}</p>
        </div>
        <div class="case__block">
          <h3 class="case__label">02 Solução</h3>
          <p class="case__text">${p.solution}</p>
        </div>
        <div class="case__block">
          <h3 class="case__label">03 Tecnologias</h3>
          ${chips(p.tech, { outline: true, className: 'case__tech' })}
        </div>
      </div>

      <div class="case__block case__block--wide" data-tabs data-tabs-hover>
        <h3 class="case__label" id="impl-label">04 Implementação</h3>
        <div class="tabs__list" role="tablist" aria-labelledby="impl-label">
          ${p.implementation.map(
            ([title], i) => html`<button
              class="tab"
              type="button"
              role="tab"
              id="impl-tab-${i + 1}"
              aria-controls="impl-${i + 1}"
              aria-selected="${String(i === 0)}"
              tabindex="${i === 0 ? '0' : '-1'}"
            >${title}</button>`,
          )}
        </div>
        ${p.implementation.map(
          ([title, text], i) => html`<div
            class="impl${i === 0 ? ' is-active' : ''}"
            role="tabpanel"
            id="impl-${i + 1}"
            aria-labelledby="impl-tab-${i + 1}"
          >
            <span class="impl__number" aria-hidden="true">${pad(i + 1)}</span>
            <p class="impl__text"><strong class="impl__title">${title}</strong>${text}</p>
          </div>`,
        )}
      </div>

      <div class="case__outcomes">
        <div>
          <h3 class="case__label">05 O que o projeto demonstra</h3>
          <ul class="bullets case__checks">
            ${p.outcomes.map((o) => html`<li>${o}</li>`)}
          </ul>
        </div>
        <div class="case__cta">
          <p class="case__note">${p.note}</p>
          ${pill(p.repo, 'Ver repositório no GitHub', { external: true, arrow: '↗' })}
        </div>
      </div>
    </div>
  </div>
`;
