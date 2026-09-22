import { html } from '../html.js';
import { sectionHead, tagList } from './shared.js';

const itemList = (items) => html`
  <ul class="role__items">
    ${items.map(([title, text]) => html`<li><strong>${title}.</strong> ${text}</li>`)}
  </ul>
`;

const renderRole = (role) => html`
  <li class="role role--${role.detail}${role.period.includes('atual') ? ' role--current' : ''}" data-reveal>
    <div class="role__meta">
      <p class="role__period">${role.period}</p>
      ${role.location ? html`<p class="role__location">${role.location}</p>` : ''}
    </div>
    <div class="role__main">
      <h4 class="role__title">${role.title}</h4>
      ${role.summary ? html`<p class="role__summary">${role.summary}</p>` : ''}
      ${role.detail === 'full'
        ? itemList(role.items)
        : html`<details class="role__details">
            <summary>Ver responsabilidades</summary>
            ${itemList(role.items)}
          </details>`}
      ${role.tags ? tagList(role.tags) : ''}
    </div>
  </li>
`;

export const renderExperience = ({ experience }) => html`
  <section class="section" id="experiencia" aria-labelledby="experiencia-title">
    <div class="container">
      ${sectionHead({
        id: 'experiencia-title',
        index: '02',
        label: 'Experiência',
        title: 'Trajetória profissional',
        intro: 'Do atendimento técnico e da gestão de dados comerciais à engenharia de qualidade, com validação de dados, automação e IA aplicada.',
      })}
      <div class="timeline">
        ${experience.map(
          (job) => html`
            <article class="company">
              <header class="company__head" data-reveal>
                <h3 class="company__name">${job.company}</h3>
                <p class="company__meta">${job.tenure} · ${job.location}</p>
              </header>
              <ol class="company__roles">
                ${job.roles.map(renderRole)}
              </ol>
            </article>
          `,
        )}
      </div>
    </div>
  </section>
`;
