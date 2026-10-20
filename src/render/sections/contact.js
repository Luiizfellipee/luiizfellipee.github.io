import { html } from '../html.js';
import { eyebrow } from './shared.js';

const linkedinHandle = (url) => url.split('/in/')[1]?.replace(/-\d+\/?$/, '') ?? 'LinkedIn';

const externalRow = (label, href, value) => html`
  <li class="contact-row" data-hover>
    <span class="contact-row__label" aria-hidden="true">${label}</span>
    <a class="contact-row__value" href="${href}" target="_blank" rel="noopener noreferrer"
      ><span class="sr-only">${label}: </span>${value}<span class="sr-only"> (abre em nova aba)</span></a
    >
    <span class="contact-row__arrow" aria-hidden="true" data-mag>↗</span>
  </li>
`;

export const renderContact = ({ profile }) => html`
  <section class="section contact" id="contato" aria-labelledby="contato-title">
    <div class="container">
      <header data-reveal>
        ${eyebrow('08', 'Contato')}
        <h2 class="contact__title" id="contato-title">Vamos <span>conversar?</span></h2>
        <p class="section-intro">Para falar sobre qualidade, dados, IA aplicada ou os projetos deste portfólio.</p>
      </header>

      <ul class="contact__list" data-reveal>
        ${externalRow('LinkedIn', profile.links.linkedin, linkedinHandle(profile.links.linkedin))}
        <li class="contact-row" data-hover>
          <span class="contact-row__label" aria-hidden="true">E-mail</span>
          <a class="contact-row__value" href="mailto:${profile.links.email}"><span class="sr-only">E-mail: </span>${profile.links.email}</a>
          <button class="copy" type="button" data-copy="${profile.links.email}" data-mag>
            <span data-copy-label>Copiar</span><span class="sr-only"> e-mail</span>
          </button>
        </li>
        ${externalRow('GitHub', profile.links.github, profile.links.githubUser)}
      </ul>
      <p class="sr-only" aria-live="polite" data-copy-status></p>
    </div>
  </section>
`;

export const renderFooter = ({ profile, year }) => html`
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p>${profile.name} © ${year}</p>
      <a class="site-footer__top" href="#topo">Voltar ao topo <span aria-hidden="true">↑</span></a>
    </div>
  </footer>
`;
