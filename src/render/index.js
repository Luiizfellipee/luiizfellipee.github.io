// Monta a página a partir do conteúdo em src/content.
// Executado em tempo de build pelo plugin em vite.config.js: o HTML final é estático.

import { profile, site } from '../content/profile.js';
import { experience } from '../content/experience.js';
import { highlights, skillGroups } from '../content/skills.js';
import { projects } from '../content/projects.js';
import { journey, statuses } from '../content/journey.js';
import { awards, certifications, education } from '../content/education.js';
import { html, toString } from './html.js';
import { renderBackdrop, renderHeader } from './sections/header.js';
import { renderHero } from './sections/hero.js';
import { renderAbout } from './sections/about.js';
import { renderExperience } from './sections/experience.js';
import { renderSkills } from './sections/skills.js';
import { renderProjects } from './sections/projects.js';
import { renderFeatured } from './sections/featured.js';
import { renderJourney } from './sections/journey.js';
import { renderEducation } from './sections/education.js';
import { renderContact, renderFooter } from './sections/contact.js';

const data = {
  profile,
  site,
  experience,
  skillGroups,
  highlights,
  projects,
  journey,
  statuses,
  education,
  certifications,
  awards,
  year: new Date().getFullYear(),
};

export const renderBody = () =>
  toString(html`
    ${renderBackdrop()}
    ${renderHeader(data)}
    <main id="conteudo" tabindex="-1">
      ${renderHero(data)}
      ${renderAbout(data)}
      ${renderExperience(data)}
      ${renderSkills(data)}
      ${renderProjects(data, renderFeatured(data))}
      ${renderJourney(data)}
      ${renderEducation(data)}
      ${renderContact(data)}
    </main>
    ${renderFooter(data)}
  `);

const current = experience[0].roles[0];

// Dados estruturados (Schema.org) derivados do mesmo conteúdo exibido na página.
const structuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: site.url,
  mainEntity: {
    '@type': 'Person',
    name: profile.fullName,
    alternateName: profile.name,
    jobTitle: current.title,
    worksFor: { '@type': 'Organization', name: experience[0].company },
    address: { '@type': 'PostalAddress', addressLocality: 'Guarapari', addressRegion: 'ES', addressCountry: 'BR' },
    alumniOf: education.map((e) => ({ '@type': 'EducationalOrganization', name: e.institution })),
    knowsAbout: ['Quality Assurance', 'Data Quality', 'Cypress', 'SQL', 'PostgreSQL', 'Python', 'Inteligência Artificial aplicada'],
    sameAs: [profile.links.github, profile.links.linkedin],
  },
});

export const renderHead = () => {
  const escapeAttr = (v) => v.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  const ogImage = new URL(site.ogImage, site.url).href;
  return [
    `<title>${escapeAttr(site.title)}</title>`,
    `<meta name="description" content="${escapeAttr(site.description)}" />`,
    `<meta name="author" content="${escapeAttr(profile.fullName)}" />`,
    `<link rel="canonical" href="${site.url}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${escapeAttr(profile.fullName)}" />`,
    `<meta property="og:title" content="${escapeAttr(site.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(site.description)}" />`,
    `<meta property="og:url" content="${site.url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(`${profile.name}: ${profile.role}, ${profile.focus}`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData()).replaceAll('<', '\\u003c')}</script>`,
  ].join('\n    ');
};
