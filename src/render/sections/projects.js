import { html } from '../html.js';
import { chips, pill, sectionHead } from './shared.js';

// O link do card aponta para o painel do caso (#caso-<id>): sem JS rola até ele;
// com JS, showcase.js seleciona o caso e rola até o seletor.
const renderProject = (project, i) => html`
  <div data-reveal style="--delay: ${i * 120}ms">
    <article class="card project" data-spot data-tilt aria-labelledby="projeto-${project.id}">
      <p class="project__kind">${project.kind} · ${project.id}</p>
      <h3 class="project__name" id="projeto-${project.id}">${project.name}</h3>
      <p class="project__summary">${project.summary}</p>
      <ul class="bullets project__features" aria-label="Principais características">
        ${project.features.map((f) => html`<li>${f}</li>`)}
      </ul>
      ${chips(project.tech, { className: 'project__tags' })}
      <div class="project__actions">
        ${pill(project.repo, 'Código no GitHub', { size: 'sm', external: true, arrow: '↗' })}
        ${pill(`#caso-${project.id}`, 'Ver estudo de caso', { variant: 'outline', size: 'sm', arrow: '↓' })}
      </div>
    </article>
  </div>
`;

export const renderProjects = ({ projects }, renderFeatured) => html`
  <section class="section" id="projetos" aria-labelledby="projetos-title">
    <div class="container">
      ${sectionHead({
        id: 'projetos-title',
        index: '04',
        label: 'Projetos',
        title: 'Projetos públicos',
        intro: 'Selecionados por mostrarem, na prática, engenharia de dados, testes e automação. A esteira de CI é um estudo de caso profissional: o código pertence à empresa e não é público.',
      })}
      <div class="projects">${projects.map(renderProject)}</div>
      ${renderFeatured}
    </div>
  </section>
`;
