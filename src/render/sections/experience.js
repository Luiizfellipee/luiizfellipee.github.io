import { html } from '../html.js';
import { chips, sectionHead } from './shared.js';

// Acordeão: um cargo aberto por vez (o mais recente, por padrão). Sem JS todos ficam abertos.
const renderRole = (role, id, open) => html`
  <li class="role${open ? ' is-open' : ''}" data-role>
    <h4 class="role__heading">
      <button class="role__toggle" type="button" id="${id}-btn" aria-expanded="${String(open)}" aria-controls="${id}" data-hover>
        <span class="role__period">${role.period}</span>
        <span class="role__title">${role.title}</span>
        <span class="role__icon" aria-hidden="true">+</span>
      </button>
    </h4>
    <div class="role__panel" id="${id}" role="region" aria-labelledby="${id}-btn">
      ${role.summary || role.location
        ? html`<p class="role__summary">${role.summary ?? ''}${role.location ? ` ${role.location}.` : ''}</p>`
        : ''}
      ${role.items.map(
        ([title, text]) => html`<div class="card achievement" data-spot>
          <p class="achievement__title">${title}.</p>
          <p class="achievement__text">${text}</p>
        </div>`,
      )}
      ${role.tags ? chips(role.tags, { outline: true, className: 'role__tags' }) : ''}
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
      <div class="companies" data-accordion>
        ${experience.map(
          (job, j) => html`
            <article class="company" data-reveal>
              <header class="company__head">
                <h3 class="company__name">${job.company}</h3>
                <p class="company__meta">${job.tenure} · ${job.location}</p>
              </header>
              <ol class="company__roles">
                ${job.roles.map((role, r) => renderRole(role, `cargo-${j + 1}-${r + 1}`, j === 0 && r === 0))}
              </ol>
            </article>
          `,
        )}
      </div>
    </div>
  </section>
`;
