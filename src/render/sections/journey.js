import { html } from '../html.js';
import { pad, sectionHead } from './shared.js';

// Trilha de etapas: avança com o scroll e também por clique, teclado (setas) ou hover.
export const renderJourney = ({ journey, statuses }) => html`
  <section class="section" id="jornada" aria-labelledby="jornada-title">
    <div class="container" data-journey>
      ${sectionHead({
        id: 'jornada-title',
        index: '06',
        label: 'Jornada',
        title: 'De QA a MLOps',
        intro: 'Uma evolução contínua, a partir da qualidade. O status de cada etapa separa o que já é experiência profissional do que está em desenvolvimento e do que é objetivo.',
      })}
      <ul class="legend" aria-label="Legenda" data-reveal>
        ${Object.entries(statuses).map(
          ([key, s]) => html`<li class="legend__item">
            <span class="marker marker--${key}" aria-hidden="true"></span>
            <span><strong>${s.label}</strong> · ${s.description}</span>
          </li>`,
        )}
      </ul>

      <div data-tabs data-tabs-hover>
        <div class="scroller journey__scroller" data-reveal data-journey-scroller>
          <div class="steps">
            <div class="steps__track" aria-hidden="true"><div class="steps__fill" data-journey-fill></div></div>
            <div class="steps__list" role="tablist" aria-label="Etapas da jornada">
              ${journey.map(
                (step, i) => html`<button
                  class="step${i === 0 ? ' is-past' : ''}"
                  type="button"
                  role="tab"
                  id="etapa-tab-${i + 1}"
                  aria-controls="etapa-${i + 1}"
                  aria-selected="${String(i === 0)}"
                  tabindex="${i === 0 ? '0' : '-1'}"
                  data-hover
                >
                  <span class="step__dot" aria-hidden="true"><span class="marker marker--${step.status}"></span></span>
                  <span class="step__name">${step.stage}</span>
                </button>`,
              )}
            </div>
          </div>
        </div>

        <div class="journey__panels" data-reveal>
          ${journey.map(
            (step, i) => html`<div
              class="card journey-panel${i === 0 ? ' is-active' : ''}"
              role="tabpanel"
              id="etapa-${i + 1}"
              aria-labelledby="etapa-tab-${i + 1}"
              data-spot
            >
              <span class="journey-panel__number" aria-hidden="true">${pad(i + 1)}</span>
              <div>
                <div class="journey-panel__head">
                  <h3 class="journey-panel__name">${step.stage}</h3>
                  <span class="badge">${statuses[step.status].label}</span>
                </div>
                <p class="journey-panel__note">${step.note}</p>
              </div>
            </div>`,
          )}
        </div>
      </div>
    </div>
  </section>
`;
