import { html } from '../html.js';

export const renderFooter = ({ profile, year }) => html`
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="site-footer__name">${profile.name} <span class="muted">© ${year}</span></p>
      <ul class="site-footer__links">
        <li><a href="${profile.links.github}" target="_blank" rel="noopener noreferrer">GitHub<span class="sr-only"> (abre em nova aba)</span></a></li>
        <li><a href="${profile.links.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn<span class="sr-only"> (abre em nova aba)</span></a></li>
      </ul>
      <p class="site-footer__stack muted">HTML, CSS e JavaScript · Vite · GitHub Pages</p>
    </div>
  </footer>
`;
