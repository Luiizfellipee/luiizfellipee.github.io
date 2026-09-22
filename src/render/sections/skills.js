import { html } from '../html.js';
import { sectionHead } from './shared.js';

export const renderSkills = ({ skillGroups }) => html`
  <section class="section" id="skills" aria-labelledby="skills-title">
    <div class="container">
      ${sectionHead({
        id: 'skills-title',
        index: '03',
        label: 'Skills',
        title: 'Competências, com a origem de cada uma',
        intro: 'À direita de cada item está onde ele foi aplicado ou comprovado: na WebLider (experiência profissional), em um repositório público ou na formação.',
      })}
      <div class="skills">
        ${skillGroups.map(
          (group) => html`
            <section class="skill-group" data-reveal aria-label="${group.title}">
              <h3 class="skill-group__title">${group.title}</h3>
              <ul class="skill-list">
                ${group.skills.map(
                  ([name, source]) => html`<li class="skill">
                    <span class="skill__name">${name}</span>
                    ${source
                      ? html`<span class="skill__source${source === 'WebLider' ? ' skill__source--pro' : ''}">${source}</span>`
                      : ''}
                  </li>`,
                )}
              </ul>
            </section>
          `,
        )}
      </div>
    </div>
  </section>
`;
