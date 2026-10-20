import { html } from '../html.js';
import { sectionHead } from './shared.js';

export const renderEducation = ({ education, certifications, awards }) => html`
  <section class="section" id="formacao" aria-labelledby="formacao-title">
    <div class="container">
      ${sectionHead({ id: 'formacao-title', index: '07', label: 'Formação', title: 'Formação acadêmica' })}

      <ul class="degrees" data-reveal>
        ${education.map(
          (e) => html`<li class="degree" data-hover>
            <p class="degree__period">${e.period}</p>
            <h3 class="degree__course">${e.course}</h3>
            <p class="degree__meta"><span>${e.institution}</span><span class="degree__status">${e.status}</span></p>
          </li>`,
        )}
      </ul>

      <div class="credentials">
        <div data-reveal>
          <section class="card credential" data-spot aria-labelledby="certificacoes-title">
            <h3 class="credential__title" id="certificacoes-title">Certificações</h3>
            ${certifications.map(
              (c) => html`<div class="cert-group">
                <p class="cert-group__title">${c.group}</p>
                <ul class="cert-list">${c.items.map((i) => html`<li>${i}</li>`)}</ul>
              </div>`,
            )}
          </section>
        </div>
        <div data-reveal style="--delay: 120ms">
          <section class="card credential" data-spot aria-labelledby="reconhecimentos-title">
            <h3 class="credential__title" id="reconhecimentos-title">Reconhecimentos</h3>
            <ul>
              ${awards.map(
                (a) => html`<li class="award">
                  <p class="award__title">${a.title}</p>
                  <p class="award__by">${a.by}</p>
                </li>`,
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  </section>
`;
