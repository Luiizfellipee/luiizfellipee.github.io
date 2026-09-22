import { html } from '../html.js';
import { icons } from '../icons.js';
import { languageColors } from '../languages.js';
import { externalLink, sectionHead } from './shared.js';

// Conteúdo estático gerado no build. src/scripts/github.js atualiza a lista
// com dados públicos da API do GitHub (sem token) quando disponível.
export const renderGithub = ({ profile, projects }) => html`
  <section class="section" id="github" aria-labelledby="github-title">
    <div class="container github">
      <div>
        ${sectionHead({
          id: 'github-title',
          index: '08',
          label: 'GitHub',
          title: 'Código aberto',
          intro: 'Repositórios públicos com os projetos deste portfólio. A lista abaixo é atualizada com dados públicos do GitHub quando a página carrega.',
        })}
        <a class="button" href="${profile.links.github}" target="_blank" rel="noopener noreferrer" data-reveal>
          ${icons.github} github.com/${profile.links.githubUser}<span class="sr-only"> (abre em nova aba)</span>
        </a>
      </div>

      <div class="repo-panel" data-reveal>
        <p class="repo-panel__head">
          <span class="mono">~/${profile.links.githubUser}</span>
          <span class="repo-panel__status" data-gh-status aria-live="polite"></span>
        </p>
        <ul class="repos" data-gh-repos data-gh-user="${profile.links.githubUser}">
          ${projects.map(
            (p) => html`<li class="repo" data-repo="${p.id}">
              <div class="repo__main">
                ${externalLink(p.repo, p.id, 'repo__name')}
                <p class="repo__desc">${p.summary}</p>
              </div>
              <p class="repo__meta">
                <span class="repo__lang" style="--lang: ${languageColors[p.language] ?? ''}"><span class="lang-dot" aria-hidden="true"></span>${p.language}</span>
              </p>
            </li>`,
          )}
        </ul>
      </div>
    </div>
  </section>
`;
