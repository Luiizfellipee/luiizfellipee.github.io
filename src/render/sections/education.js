import { html } from '../html.js';
import { sectionHead } from './shared.js';

export const renderEducation = ({ education, certifications, awards }) => html`
  <section class="section" id="formacao" aria-labelledby="formacao-title">
    <div class="container">
      ${sectionHead({ id: 'formacao-title', index: '07', label: 'Formação', title: 'Formação acadêmica' })}

      <ul class="education">
        ${education.map(
          (e) => html`<li class="degree${e.highlight ? ' degree--highlight' : ''}" data-reveal>
            <p class="degree__period">${e.period}</p>
            <div>
              <h3 class="degree__course">${e.course}</h3>
              <p class="degree__institution">${e.institution}</p>
            </div>
            <p class="badge${e.status === 'Em andamento' ? ' badge--active' : ''}">${e.status}</p>
          </li>`,
        )}
      </ul>

      <div class="credentials">
        <div class="credentials__col" data-reveal>
          <h3 class="subhead">Certificações</h3>
          ${certifications.map(
            (c) => html`<div class="cert-group">
              <p class="cert-group__title">${c.group}</p>
              <ul class="cert-list">${c.items.map((i) => html`<li>${i}</li>`)}</ul>
            </div>`,
          )}
        </div>
        <div class="credentials__col" data-reveal>
          <h3 class="subhead">Reconhecimentos</h3>
          <ul class="awards">
            ${awards.map(
              (a) => html`<li class="award">
                <p class="award__title">${a.title}</p>
                <p class="award__by">${a.by}</p>
              </li>`,
            )}
          </ul>
        </div>
      </div>
    </div>
  </section>
`;
