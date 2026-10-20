import { html } from '../html.js';
import { sectionHead } from './shared.js';

export const renderAbout = ({ profile }) => html`
  <section class="section" id="sobre" aria-labelledby="sobre-title">
    <div class="container">
      ${sectionHead({ id: 'sobre-title', index: '01', label: 'Sobre', title: 'Qualidade como base para dados confiáveis' })}
      <div class="about__grid">
        <div class="about__text" data-reveal>
          ${profile.about.map((p) => html`<p>${p}</p>`)}
        </div>
        <div class="about__aside" data-reveal style="--delay: 120ms">
          <blockquote class="card card--hover quote" data-spot>
            <p>${profile.quote}</p>
          </blockquote>
          <dl class="facts">
            ${profile.facts.map(
              (f) => html`<div class="card fact" data-spot data-hover>
                <dt>${f.label}</dt>
                <dd>${f.value}${f.note ? ` · ${f.note}` : ''}</dd>
              </div>`,
            )}
          </dl>
        </div>
      </div>
    </div>
  </section>
`;
