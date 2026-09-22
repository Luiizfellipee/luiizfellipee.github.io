import { html } from '../html.js';
import { icons } from '../icons.js';

export const navItems = [
  ['sobre', 'Sobre'],
  ['experiencia', 'Experiência'],
  ['skills', 'Skills'],
  ['projetos', 'Projetos'],
  ['jornada', 'Jornada'],
  ['contato', 'Contato'],
];

export const renderHeader = ({ profile }) => html`
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header" data-header>
    <div class="container site-header__inner">
      <a class="brand" href="#topo" aria-label="${profile.name}, voltar ao início">
        <span class="brand__mark" aria-hidden="true">LF</span>
        <span class="brand__name">${profile.name}</span>
      </a>

      <nav class="nav" aria-label="Principal">
        <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-menu" data-nav-toggle>
          ${icons.menu}<span class="sr-only">Abrir menu</span>
        </button>
        <div class="nav__menu" id="nav-menu" data-nav-menu>
          <ul class="nav__list">
            ${navItems.map(([id, label]) => html`<li><a class="nav__link" href="#${id}" data-nav-link>${label}</a></li>`)}
          </ul>
          <div class="nav__social">
            <a class="icon-link" href="${profile.links.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub (abre em nova aba)">${icons.github}</a>
            <a class="icon-link" href="${profile.links.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (abre em nova aba)">${icons.linkedin}</a>
          </div>
        </div>
      </nav>
    </div>
  </header>
`;
