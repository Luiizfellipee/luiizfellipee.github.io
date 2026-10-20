import { html } from '../html.js';

export const navItems = [
  ['sobre', 'Sobre'],
  ['experiencia', 'Experiência'],
  ['skills', 'Skills'],
  ['projetos', 'Projetos'],
  ['jornada', 'Jornada'],
  ['formacao', 'Formação'],
  ['contato', 'Contato'],
];

// Camadas decorativas fixas (fundo, progresso de leitura e anel do cursor).
export const renderBackdrop = () => html`
  <div class="backdrop" aria-hidden="true">
    <div class="orb orb--1" data-orb="1"><span class="orb__glow"></span></div>
    <div class="orb orb--2" data-orb="-1.4"><span class="orb__glow"></span></div>
    <div class="orb orb--3" data-orb="0.6"><span class="orb__glow"></span></div>
    <div class="backdrop__grid"></div>
    <div class="backdrop__spot" data-spotlight></div>
  </div>
  <div class="progress" data-progress aria-hidden="true"></div>
  <div class="cursor-ring" data-cursor aria-hidden="true"></div>
  <div class="cursor-dot" data-cursor-dot aria-hidden="true"></div>
`;

export const renderHeader = ({ profile }) => html`
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <nav class="dock" aria-label="Principal">
    <a class="dock__brand" href="#topo" data-mag aria-label="LF · ${profile.name}, voltar ao início">LF</a>
    <ul class="dock__links" data-nav>
      ${navItems.map(([id, label]) => html`<li><a class="dock__link" href="#${id}" data-nav-link>${label}</a></li>`)}
    </ul>
  </nav>
`;
