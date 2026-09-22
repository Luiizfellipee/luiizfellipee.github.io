import { html } from '../html.js';
import { sectionHead } from './shared.js';

export const renderJourney = ({ journey, statuses }) => html`
  <section class="section" id="jornada" aria-labelledby="jornada-title">
    <div class="container journey">
      <div class="journey__intro">
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
              <span><strong>${s.label}</strong> <span class="muted">· ${s.description}</span></span>
            </li>`,
          )}
        </ul>
      </div>

      <ol class="journey__track">
        ${journey.map(
          (step) => html`<li class="journey__step journey__step--${step.status}" data-reveal>
            <span class="marker marker--${step.status}" aria-hidden="true"></span>
            <div>
              <p class="journey__stage">
                ${step.stage}
                <span class="journey__status">${statuses[step.status].label}</span>
              </p>
              <p class="journey__note">${step.note}</p>
            </div>
          </li>`,
        )}
      </ol>
    </div>
  </section>
`;
