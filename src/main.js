import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/sections.css';

import { initNav } from './scripts/nav.js';
import { initReveal } from './scripts/reveal.js';
import { initCopy } from './scripts/copy.js';
import { initGithub } from './scripts/github.js';

initNav();
initReveal();
initCopy();

// A chamada à API do GitHub só acontece quando a seção se aproxima da tela.
const githubSection = document.querySelector('#github');
if (githubSection && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        initGithub();
      }
    },
    { rootMargin: '400px 0px' },
  );
  observer.observe(githubSection);
}
