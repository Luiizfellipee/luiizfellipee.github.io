import { html, raw } from '../html.js';
import { chips, pill, sectionHead } from './shared.js';

// Diagrama do modelo dimensional do Data Warehouse (fato no centro, dimensões nos cantos).
const schemaDiagram = ({ fact, dimensions }) => {
  const W = 420;
  const H = 180;
  const box = { w: 112, h: 34 };
  const corners = [
    [12, 14],
    [W - box.w - 12, 14],
    [12, H - box.h - 14],
    [W - box.w - 12, H - box.h - 14],
  ];
  const fx = W / 2;
  const fy = H / 2;
  const nodes = dimensions.slice(0, 4).map((name, i) => {
    const [x, y] = corners[i];
    const cx = x + box.w / 2;
    const cy = y + box.h / 2;
    return `<line class="schema__link" x1="${fx}" y1="${fy}" x2="${cx}" y2="${cy}" />
      <rect class="schema__node" x="${x}" y="${y}" width="${box.w}" height="${box.h}" rx="10" />
      <text class="schema__label" x="${cx}" y="${cy + 4}" text-anchor="middle">${name}</text>`;
  });
  return raw(`<svg class="schema" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="schema-title">
    <title id="schema-title">Modelo dimensional: tabela fato ${fact} ligada às dimensões ${dimensions.join(', ')}</title>
    ${nodes.join('')}
    <rect class="schema__node schema__node--fact" x="${fx - 66}" y="${fy - 22}" width="132" height="44" rx="12" />
    <text class="schema__label schema__label--fact" x="${fx}" y="${fy + 4}" text-anchor="middle">fato · ${fact}</text>
  </svg>`);
};

const renderProject = (project, i, featured) => {
  const isFeatured = project.id === featured.id;
  return html`
    <div data-reveal style="--delay: ${i * 120}ms">
      <article class="card project" data-spot data-tilt aria-labelledby="projeto-${project.id}">
        <p class="project__kind">${project.kind} · ${project.id}</p>
        <h3 class="project__name" id="projeto-${project.id}">${project.name}</h3>
        <p class="project__summary">${project.summary}</p>
        ${project.features
          ? html`<ul class="bullets project__features" aria-label="Principais características">
              ${project.features.map((f) => html`<li>${f}</li>`)}
            </ul>`
          : ''}
        ${isFeatured && featured.schema
          ? html`<figure class="project__preview">
              ${schemaDiagram(featured.schema)}
              <div class="schema-list" aria-hidden="true">
                <span class="schema-list__fact">fato · ${featured.schema.fact}</span>
                <span class="schema-list__dims">${featured.schema.dimensions.map((d) => html`<span>${d}</span>`)}</span>
              </div>
              <figcaption class="schema__caption">diagrama · modelo dimensional do DW</figcaption>
            </figure>`
          : ''}
        ${chips(project.tech, { className: 'project__tags' })}
        <div class="project__actions">
          ${pill(project.repo, 'Código no GitHub', { size: 'sm', external: true, arrow: '↗' })}
          ${project.caseStudy ? pill(project.caseStudy, 'Ver estudo de caso', { variant: 'outline', size: 'sm', arrow: '↓' }) : ''}
        </div>
      </article>
    </div>
  `;
};

export const renderProjects = ({ projects, featuredProject }, renderFeatured) => html`
  <section class="section" id="projetos" aria-labelledby="projetos-title">
    <div class="container">
      ${sectionHead({
        id: 'projetos-title',
        index: '04',
        label: 'Projetos',
        title: 'Projetos públicos',
        intro: 'Selecionados por mostrarem, na prática, engenharia de dados, testes e automação. A experiência com Cypress é profissional e não tem repositório público no momento.',
      })}
      <div class="projects">${projects.map((p, i) => renderProject(p, i, featuredProject))}</div>
      ${renderFeatured}
    </div>
  </section>
`;
