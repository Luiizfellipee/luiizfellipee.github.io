import { html } from '../html.js';
import { sectionHead } from './shared.js';

export const renderAbout = ({ profile }) => html`
  <section class="section" id="sobre" aria-labelledby="sobre-title">
    <div class="container about">
      ${sectionHead({ id: 'sobre-title', index: '01', label: 'Sobre', title: 'Qualidade como base para dados confiáveis' })}
      <div class="about__body">
        <div class="prose" data-reveal>
          ${profile.about.map((p) => html`<p>${p}</p>`)}
        </div>
        <aside class="about__aside" data-reveal>
          <blockquote class="quote">
            <p>“${profile.quote}”</p>
          </blockquote>
          <dl class="facts">
            ${profile.facts.map(
              (f) => html`<div class="facts__item">
                <dt>${f.label}</dt>
                <dd>${f.value}${f.note ? html` <span class="muted">· ${f.note}</span>` : ''}</dd>
              </div>`,
            )}
          </dl>
        </aside>
      </div>
    </div>
  </section>
`;
