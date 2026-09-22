import { html } from '../html.js';
import { icons } from '../icons.js';
import { externalLink, sectionHead, tagList } from './shared.js';

const renderProject = (project) => html`
  <article class="project" data-reveal>
    <header class="project__head">
      <p class="project__kind">${project.kind} · <span class="mono">${project.id}</span></p>
      <h3 class="project__name">${project.name}</h3>
    </header>
    <p class="project__summary">${project.summary}</p>
    ${project.features
      ? html`<ul class="project__features" aria-label="Principais características">
          ${project.features.map((f) => html`<li>${f}</li>`)}
        </ul>`
      : ''}
    ${tagList(project.tech)}
    <div class="project__links">
      ${externalLink(project.repo, 'Código no GitHub')}
      ${project.caseStudy
        ? html`<a class="text-link" href="${project.caseStudy}">Ver estudo de caso ${icons.arrowDown}</a>`
        : ''}
    </div>
  </article>
`;

export const renderProjects = ({ projects }) => html`
  <section class="section" id="projetos" aria-labelledby="projetos-title">
    <div class="container">
      ${sectionHead({
        id: 'projetos-title',
        index: '04',
        label: 'Projetos',
        title: 'Projetos públicos',
        intro: 'Selecionados por mostrarem, na prática, engenharia de dados, testes e automação. A experiência com Cypress é profissional e não tem repositório público no momento.',
      })}
      <div class="projects">${projects.map(renderProject)}</div>
    </div>
  </section>
`;
