import { html } from '../html.js';
import { chips, eyebrow, pad, pill } from './shared.js';

// Etapas além de `implemented` ainda são plano: aparecem tracejadas e com legenda.
const renderPipeline = (p) => {
  const done = p.implemented ?? p.pipeline.length;
  return html`
    <div class="scroller" tabindex="0" role="region" aria-label="Fluxo de dados: ${p.name}">
      <div class="pipeline" data-pipeline style="--steps: ${p.pipeline.length}">
        <div class="pipeline__track" aria-hidden="true"><span class="pipeline__packet" data-packet></span></div>
        <ol class="pipeline__steps">
          ${p.pipeline.map(
            (step, i) => html`<li class="pipeline__step${i >= done ? ' pipeline__step--planned' : ''}" data-node>
              <span class="pipeline__node" aria-hidden="true">${pad(i + 1)}</span>
              <span>${step}${i >= done ? html`<span class="sr-only"> (planejado)</span>` : ''}</span>
            </li>`,
          )}
        </ol>
      </div>
    </div>
    ${done < p.pipeline.length
      ? html`<p class="legend pipeline__legend" aria-hidden="true">
          <span class="legend__item"><span class="marker marker--experience"></span><strong>Implementado</strong></span>
          <span class="legend__item"><span class="marker marker--goal"></span><strong>Planejado</strong></span>
        </p>`
      : ''}
  `;
};

// Um estudo de caso por projeto; só o painel ativo aparece (sem JS, todos ficam visíveis).
const renderCase = (p, i) => html`
  <div
    class="featured__panel${i === 0 ? ' is-active' : ''}"
    role="tabpanel"
    id="caso-${p.id}"
    aria-labelledby="caso-tab-${p.id}"
  >
    <header data-reveal>
      <h2 class="section-title" id="destaque-${p.id}">${p.name}</h2>
      <p class="section-intro">${p.summary}</p>
      <p class="featured__kind">${p.kind}</p>
    </header>

    <div class="case" data-reveal aria-labelledby="destaque-${p.id}" role="group">
      ${renderPipeline(p)}

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
          ${chips(p.stack, { outline: true, className: 'case__tech' })}
        </div>
      </div>

      <div class="case__block case__block--wide" data-tabs data-tabs-hover>
        <h3 class="case__label" id="impl-label-${p.id}">04 Implementação</h3>
        <div class="tabs__list" role="tablist" aria-labelledby="impl-label-${p.id}">
          ${p.implementation.map(
            ([title], n) => html`<button
              class="tab"
              type="button"
              role="tab"
              id="impl-tab-${p.id}-${n + 1}"
              aria-controls="impl-${p.id}-${n + 1}"
              aria-selected="${String(n === 0)}"
              tabindex="${n === 0 ? '0' : '-1'}"
            >${title}</button>`,
          )}
        </div>
        ${p.implementation.map(
          ([title, text], n) => html`<div
            class="impl${n === 0 ? ' is-active' : ''}"
            role="tabpanel"
            id="impl-${p.id}-${n + 1}"
            aria-labelledby="impl-tab-${p.id}-${n + 1}"
          >
            <span class="impl__number" aria-hidden="true">${pad(n + 1)}</span>
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

// Estudos de caso em destaque. Ficam dentro da seção de projetos, como no design.
export const renderFeatured = ({ projects }) => html`
  <div class="featured" id="destaque" data-showcase>
    <div data-reveal>
      ${eyebrow('05', 'Projetos em destaque')}
      <div class="tabs__list featured__picker" role="tablist" aria-label="Escolha o estudo de caso">
        ${projects.map(
          (p, i) => html`<button
            class="tab"
            type="button"
            role="tab"
            id="caso-tab-${p.id}"
            aria-controls="caso-${p.id}"
            aria-selected="${String(i === 0)}"
            tabindex="${i === 0 ? '0' : '-1'}"
          ><span class="featured__index" aria-hidden="true">${pad(i + 1)}</span>${p.name}</button>`,
        )}
      </div>
    </div>
    ${projects.map(renderCase)}
  </div>
`;
