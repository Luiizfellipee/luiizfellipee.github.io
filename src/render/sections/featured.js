import { html } from '../html.js';
import { externalLink, sectionHead, tagList } from './shared.js';

export const renderFeatured = ({ featuredProject: p }) => html`
  <section class="section featured" id="destaque" aria-labelledby="destaque-title">
    <div class="container">
      ${sectionHead({ id: 'destaque-title', index: '05', label: 'Projeto em destaque', title: p.name, intro: p.summary })}

      <p class="featured__kind" data-reveal>${p.kind}</p>

      <ol class="pipeline" aria-label="Fluxo de dados do projeto" data-reveal>
        ${p.pipeline.map((step) => html`<li class="pipeline__step">${step}</li>`)}
      </ol>

      <div class="case">
        <div class="case__block" data-reveal>
          <h3 class="case__label"><span class="mono">01</span> Problema</h3>
          <p>${p.problem}</p>
        </div>
        <div class="case__block" data-reveal>
          <h3 class="case__label"><span class="mono">02</span> Solução</h3>
          <p>${p.solution}</p>
        </div>
        <div class="case__block" data-reveal>
          <h3 class="case__label"><span class="mono">03</span> Tecnologias</h3>
          ${tagList(p.tech)}
        </div>
        <div class="case__block case__block--wide" data-reveal>
          <h3 class="case__label"><span class="mono">04</span> Implementação</h3>
          <ol class="steps">
            ${p.implementation.map(([title, text]) => html`<li><strong>${title}</strong><span>${text}</span></li>`)}
          </ol>
        </div>
        <div class="case__block case__block--wide" data-reveal>
          <h3 class="case__label"><span class="mono">05</span> O que o projeto demonstra</h3>
          <ul class="checks">
            ${p.outcomes.map((o) => html`<li>${o}</li>`)}
          </ul>
          <p class="muted small">${p.note}</p>
          ${externalLink(p.repo, 'Ver repositório no GitHub', 'button')}
        </div>
      </div>
    </div>
  </section>
`;
