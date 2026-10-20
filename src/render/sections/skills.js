import { html } from '../html.js';
import { eyebrow, pad } from './shared.js';

export const renderSkills = ({ skillGroups, highlights }) => html`
  <section class="section skills" id="skills" aria-labelledby="skills-title">
    <header class="container skills__head" data-reveal>
      ${eyebrow('03', 'Skills')}
      <h2 class="section-title" id="skills-title">Competências, com a origem de cada uma</h2>
      <p class="section-intro">
        À direita de cada item está onde ele foi aplicado ou comprovado: na WebLider (experiência profissional), em um
        repositório público ou na formação.
      </p>
    </header>

    <div class="marquee" data-marquee aria-hidden="true">
      <div class="marquee__track" data-marquee-track>
        ${[...highlights, ...highlights].map((item) => html`<span class="marquee__item" data-hover>${item}</span>`)}
      </div>
    </div>

    <div class="skill-grid">
      ${skillGroups.map(
        (group, i) => html`
          <div data-reveal style="--delay: ${(i % 3) * 80}ms">
            <section class="card card--hover skill-card" data-spot data-tilt aria-labelledby="skills-group-${i + 1}">
              <header class="skill-card__head">
                <h3 class="skill-card__title" id="skills-group-${i + 1}">${group.title}</h3>
                <span class="skill-card__index" aria-hidden="true">${pad(i + 1)}</span>
              </header>
              <ul class="skill-list">
                ${group.skills.map(
                  ([name, source]) => html`<li class="skill">
                    <span class="skill__name">${name}</span>
                    ${source ? html`<span class="skill__source"><span class="sr-only">origem: </span>${source}</span>` : ''}
                  </li>`,
                )}
              </ul>
            </section>
          </div>
        `,
      )}
    </div>
  </section>
`;
