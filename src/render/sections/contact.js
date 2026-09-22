import { html } from '../html.js';
import { icons } from '../icons.js';

export const renderContact = ({ profile }) => html`
  <section class="section contact" id="contato" aria-labelledby="contato-title">
    <div class="container contact__inner">
      <header class="section-head" data-reveal>
        <p class="eyebrow"><span class="eyebrow__index">09</span> Contato</p>
        <h2 class="section-title contact__title" id="contato-title">Vamos conversar?</h2>
        <p class="section-intro">Para falar sobre qualidade, dados, IA aplicada ou os projetos deste portfólio.</p>
      </header>

      <ul class="contact__list" data-reveal>
        <li>
          <a class="contact__link" href="${profile.links.linkedin}" target="_blank" rel="noopener noreferrer">
            ${icons.linkedin}
            <span class="contact__label">LinkedIn</span>
            <span class="contact__value">luiz-felipe-piumbini</span>
            <span class="sr-only">(abre em nova aba)</span>
          </a>
        </li>
        <li class="contact__row">
          <a class="contact__link" href="mailto:${profile.links.email}">
            ${icons.mail}
            <span class="contact__label">E-mail</span>
            <span class="contact__value">${profile.links.email}</span>
          </a>
          <button class="icon-link contact__copy" type="button" data-copy="${profile.links.email}" aria-label="Copiar e-mail">
            ${icons.copy}
          </button>
        </li>
        <li>
          <a class="contact__link" href="${profile.links.github}" target="_blank" rel="noopener noreferrer">
            ${icons.github}
            <span class="contact__label">GitHub</span>
            <span class="contact__value">${profile.links.githubUser}</span>
            <span class="sr-only">(abre em nova aba)</span>
          </a>
        </li>
      </ul>
      <p class="sr-only" aria-live="polite" data-copy-status></p>
    </div>
  </section>
`;
