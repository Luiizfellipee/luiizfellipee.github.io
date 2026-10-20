// Testes de integridade do conteúdo, do HTML gerado e do design system (node --test, sem dependências).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

import { profile, site } from '../src/content/profile.js';
import { experience } from '../src/content/experience.js';
import { highlights, skillGroups } from '../src/content/skills.js';
import { featuredProject, projects } from '../src/content/projects.js';
import { journey, statuses } from '../src/content/journey.js';
import { awards, certifications, education } from '../src/content/education.js';
import { navItems } from '../src/render/sections/header.js';
import { renderBody, renderHead } from '../src/render/index.js';

const body = renderBody();
const head = renderHead();
const ids = new Set([...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
// O HTML escapa aspas e apóstrofos; compara o texto do conteúdo na mesma forma.
const escaped = (text) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const has = (text) => body.includes(escaped(text));

test('projetos apontam para repositórios do perfil', () => {
  for (const p of [...projects, featuredProject]) {
    assert.match(p.repo, /^https:\/\/github\.com\/Luiizfellipee\/[\w.-]+$/, p.id);
    assert.ok(p.repo.endsWith(`/${p.id}`), `${p.id}: id e URL divergem`);
  }
});

test('o projeto em destaque também aparece na lista de projetos', () => {
  assert.ok(projects.some((p) => p.id === featuredProject.id));
});

test('competências citando repositório referenciam projetos existentes', () => {
  const projectIds = new Set(projects.map((p) => p.id));
  const repoLike = /^[a-z0-9]+_[a-z0-9_]+$/;
  for (const group of skillGroups) {
    for (const [name, source] of group.skills) {
      if (source && repoLike.test(source)) assert.ok(projectIds.has(source), `${name}: ${source} não é um projeto listado`);
    }
  }
});

test('itens da faixa de skills existem nas competências', () => {
  const all = skillGroups.flatMap((g) => g.skills.map(([name]) => name)).join(' | ');
  for (const item of highlights) assert.ok(all.includes(item) || item === 'Data Quality', item);
});

test('cada etapa da jornada tem um status válido', () => {
  for (const step of journey) assert.ok(statuses[step.status], step.stage);
  assert.equal(journey.at(-1).status, 'goal', 'a última etapa deve ser objetivo');
});

test('experiência e formação têm período preenchido', () => {
  for (const job of experience) for (const role of job.roles) assert.ok(role.period && role.title);
  for (const e of education) assert.ok(e.period && e.status);
});

test('todo o conteúdo profissional é exibido (nada foi perdido no redesign)', () => {
  for (const job of experience) {
    assert.ok(has(job.company) && has(job.tenure), job.company);
    for (const role of job.roles) {
      assert.ok(has(role.title) && has(role.period), role.title);
      if (role.summary) assert.ok(has(role.summary), `${role.title}: resumo`);
      for (const [title, text] of role.items) assert.ok(has(title) && has(text), `${role.title}: ${title}`);
      for (const tag of role.tags ?? []) assert.ok(has(tag), tag);
    }
  }
  for (const e of education) assert.ok(has(e.course) && has(e.institution) && has(e.period) && has(e.status), e.course);
  for (const c of certifications) for (const item of c.items) assert.ok(has(item), item);
  for (const a of awards) assert.ok(has(a.title) && has(a.by), a.title);
  for (const g of skillGroups) for (const [name, source] of g.skills) assert.ok(has(name) && (!source || has(source)), name);
  for (const s of journey) assert.ok(has(s.stage) && has(s.note), s.stage);
  for (const p of profile.about) assert.ok(has(p));
  for (const [key, value] of profile.snapshot) assert.ok(has(`${key}:`) && has(value), key);
  assert.ok(has(profile.quote) && has(profile.headline));
});

test('projetos e estudo de caso aparecem integralmente', () => {
  for (const p of projects) {
    assert.ok(has(p.name) && has(p.summary) && body.includes(`href="${p.repo}"`), p.id);
    for (const f of p.features ?? []) assert.ok(has(f), f);
    for (const t of p.tech) assert.ok(has(t), t);
  }
  const f = featuredProject;
  for (const text of [f.summary, f.problem, f.solution, f.note, f.kind, ...f.pipeline, ...f.tech, ...f.outcomes]) {
    assert.ok(has(text), text);
  }
  for (const [title, text] of f.implementation) assert.ok(has(title) && has(text), title);
  assert.ok(ids.has('destaque'), 'âncora #destaque preservada');
});

test('HTML gerado não contém valores indefinidos nem placeholders', () => {
  assert.doesNotMatch(body, /undefined|\[object Object\]|>null</);
  assert.doesNotMatch(body, /placeholder|lorem ipsum|screenshot/i);
  assert.doesNotMatch(body, /\bTODO\b/);
});

test('âncoras, aria-labelledby e aria-controls apontam para ids existentes', () => {
  for (const [, ref] of body.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(ref), `#${ref}`);
  for (const [, ref] of body.matchAll(/aria-labelledby="([^"]+)"/g)) assert.ok(ids.has(ref), ref);
  for (const [, ref] of body.matchAll(/aria-controls="([^"]+)"/g)) assert.ok(ids.has(ref), ref);
});

test('âncoras públicas da versão anterior continuam existindo', () => {
  for (const id of ['topo', 'conteudo', 'sobre', 'experiencia', 'skills', 'projetos', 'destaque', 'jornada', 'formacao', 'contato']) {
    assert.ok(ids.has(id), id);
  }
});

test('navegação cobre as seções na ordem da página', () => {
  const positions = navItems.map(([id]) => body.indexOf(`id="${id}"`));
  assert.ok(positions.every((p) => p > 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
});

test('ids são únicos', () => {
  const all = [...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(all).size, all.length);
});

test('controles expansíveis e abas têm estado ARIA consistente', () => {
  for (const [tag] of body.matchAll(/<button[^>]*aria-expanded[^>]*>/g)) {
    assert.match(tag, /aria-expanded="(true|false)"/, tag);
    assert.match(tag, /aria-controls="[^"]+"/, tag);
  }
  assert.equal((body.match(/aria-expanded="true"/g) ?? []).length, 1, 'um cargo aberto por padrão');
  for (const [list] of body.matchAll(/role="tablist"[\s\S]*?<\/div>/g)) {
    assert.equal((list.match(/aria-selected="true"/g) ?? []).length, 1, 'uma aba selecionada por lista');
  }
});

test('links externos abrem com rel="noopener noreferrer" e aviso de nova aba', () => {
  for (const [tag] of body.matchAll(/<a\s[^>]*target="_blank"[^>]*>/g)) {
    assert.match(tag, /rel="noopener noreferrer"/, tag);
  }
  const external = (body.match(/target="_blank"/g) ?? []).length;
  assert.equal((body.match(/\(abre em nova aba\)/g) ?? []).length, external);
});

test('há exatamente um h1, com o nome como texto acessível', () => {
  assert.equal((body.match(/<h1\b/g) ?? []).length, 1);
  assert.match(body, new RegExp(`<h1[^>]*>\\s*<span class="sr-only">${profile.name}</span>`));
});

test('head contém SEO essencial', () => {
  assert.match(head, /<title>[^<]+<\/title>/);
  assert.match(head, new RegExp(`<link rel="canonical" href="${site.url}"`));
  assert.match(head, /property="og:image" content="https:\/\/luiizfellipee\.github\.io\/og-image\.png"/);
  const json = head.match(/<script type="application\/ld\+json">(.+?)<\/script>/)[1];
  assert.equal(JSON.parse(json).mainEntity.name, profile.fullName);
});

test('contatos presentes na página', () => {
  assert.ok(body.includes(`href="${profile.links.linkedin}"`));
  assert.ok(body.includes(`href="${profile.links.github}"`));
  assert.ok(body.includes(`href="mailto:${profile.links.email}"`));
  assert.ok(body.includes(`data-copy="${profile.links.email}"`));
});

// ── Design system ──
const styles = Object.fromEntries(
  readdirSync('src/styles').map((file) => [file, readFileSync(`src/styles/${file}`, 'utf8')]),
);
const tokens = Object.fromEntries(
  [...styles['tokens.css'].matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, name, hex]) => [name, hex]),
);
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const luminance = (hex) =>
  rgb(hex)
    .map((c) => c / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

test('cores hexadecimais só existem nos tokens', () => {
  for (const [file, css] of Object.entries(styles)) {
    if (file === 'tokens.css') continue;
    assert.doesNotMatch(css.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b/i, file);
  }
});

test('identidade monocromática: nenhuma cor saturada', () => {
  const colors = Object.values(styles)
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  for (const hex of colors.match(/#[0-9a-f]{6}\b/gi) ?? []) {
    const [r, g, b] = rgb(hex);
    assert.ok(Math.max(r, g, b) - Math.min(r, g, b) <= 12, hex);
  }
  for (const [, r, g, b] of colors.matchAll(/rgb\((\d+) (\d+) (\d+)/g)) {
    assert.ok(Math.max(r, g, b) - Math.min(r, g, b) <= 12, `rgb(${r} ${g} ${b})`);
  }
});

test('tokens de texto pequeno atingem contraste AA (4,5:1) sobre o fundo e os cards', () => {
  const backgrounds = [tokens['--bg'], tokens['--surface']];
  for (const name of ['--text', '--text-soft', '--text-tag', '--text-2', '--text-muted', '--text-3', '--text-label', '--text-subtle']) {
    for (const bg of backgrounds) assert.ok(contrast(tokens[name], bg) >= 4.5, `${name} sobre ${bg}: ${contrast(tokens[name], bg).toFixed(2)}`);
  }
  // Texto escuro sobre botões claros
  assert.ok(contrast(tokens['--bg'], tokens['--text']) >= 4.5);
});

test('estilos respeitam prefers-reduced-motion e oferecem fallback de vidro', () => {
  const all = Object.values(styles).join('\n');
  assert.match(all, /prefers-reduced-motion: reduce/);
  assert.match(all, /@supports not \(\(backdrop-filter/);
  assert.match(all, /prefers-reduced-transparency: reduce/);
  assert.match(all, /:focus-visible/);
});
