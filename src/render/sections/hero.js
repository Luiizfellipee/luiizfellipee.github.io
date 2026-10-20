import { html } from '../html.js';
import { pill } from './shared.js';

// Cada letra vira um span para a entrada escalonada e o hover por letra.
// O nome acessível fica em texto oculto; as letras são decorativas.
let charIndex = 0;
const letters = (word) => [...word].map((ch) => html`<span class="hero__char" style="--i: ${charIndex++}">${ch}</span>`);

export const renderHero = ({ profile }) => {
  charIndex = 0;
  const [first, ...rest] = profile.name.split(' ');
  return html`
    <section class="hero" id="topo" aria-labelledby="hero-title">
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__status">
            <span class="hero__dot" aria-hidden="true"></span>
            <span>${profile.role} na ${profile.company} · ${profile.location}</span>
          </p>
          <h1 class="hero__title" id="hero-title">
            <span class="sr-only">${profile.name}</span>
            <span class="hero__line" aria-hidden="true">${letters(first)}</span>
            <span class="hero__line hero__line--muted" aria-hidden="true">${letters(rest.join(' '))}</span>
          </h1>
          <p class="hero__focus" data-hover data-scramble>
            <span class="hero__slashes" aria-hidden="true">//</span>
            <span aria-hidden="true" data-scramble-text>${profile.focus}</span>
            <span class="sr-only">${profile.focus}</span>
          </p>
          <p class="hero__lead">${profile.headline}</p>
          <div class="hero__actions">
            ${pill('#projetos', 'Ver projetos', { arrow: '→' })}
            ${pill(profile.links.github, 'GitHub', { variant: 'glass', external: true, arrow: '↗' })}
            ${pill(profile.links.linkedin, 'LinkedIn', { variant: 'glass', external: true, arrow: '↗' })}
          </div>
        </div>

        <figure class="card profile-card" data-tilt data-spot aria-labelledby="profile-card-title">
          <figcaption class="profile-card__bar">
            <span class="profile-card__light" aria-hidden="true"></span>
            <span class="profile-card__light" aria-hidden="true"></span>
            <span class="profile-card__light" aria-hidden="true"></span>
            <span class="profile-card__file" id="profile-card-title">profile.yml<span class="sr-only">: resumo do perfil</span></span>
          </figcaption>
          <dl class="profile-card__body">
            ${profile.snapshot.map(
              ([key, value]) => html`<div class="profile-card__row" data-hover><dt>${key}:</dt><dd>${value}</dd></div>`,
            )}
          </dl>
        </figure>
      </div>
      <a class="hero__scroll" href="#sobre">
        <span>role para explorar</span>
        <span class="hero__scroll-line" aria-hidden="true"></span>
      </a>
    </section>
  `;
};
