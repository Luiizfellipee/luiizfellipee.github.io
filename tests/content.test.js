// Testes de integridade do conteúdo e do HTML gerado (node --test, sem dependências).
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { profile, site } from '../src/content/profile.js';
import { experience } from '../src/content/experience.js';
import { skillGroups } from '../src/content/skills.js';
import { featuredProject, projects } from '../src/content/projects.js';
import { journey, statuses } from '../src/content/journey.js';
import { education } from '../src/content/education.js';
import { renderBody, renderHead } from '../src/render/index.js';

const body = renderBody();
const head = renderHead();

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
  const ids = new Set(projects.map((p) => p.id));
  const repoLike = /^[a-z0-9]+_[a-z0-9_]+$/;
  for (const group of skillGroups) {
    for (const [name, source] of group.skills) {
      if (source && repoLike.test(source)) assert.ok(ids.has(source), `${name}: ${source} não é um projeto listado`);
    }
  }
});

test('cada etapa da jornada tem um status válido', () => {
  for (const step of journey) assert.ok(statuses[step.status], step.stage);
  assert.equal(journey.at(-1).status, 'goal', 'a última etapa deve ser objetivo');
});

test('experiência e formação têm período preenchido', () => {
  for (const job of experience) for (const role of job.roles) assert.ok(role.period && role.title);
  for (const e of education) assert.ok(e.period && e.status);
});

test('HTML gerado não contém valores indefinidos', () => {
  assert.doesNotMatch(body, /undefined|\[object Object\]|>null</);
});

test('âncoras internas e aria-labelledby apontam para ids existentes', () => {
  const ids = new Set([...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, ref] of body.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(ref), `#${ref}`);
  for (const [, ref] of body.matchAll(/aria-labelledby="([^"]+)"/g)) assert.ok(ids.has(ref), ref);
});

test('ids são únicos', () => {
  const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length);
});

test('links externos abrem com rel="noopener noreferrer"', () => {
  for (const [tag] of body.matchAll(/<a [^>]*target="_blank"[^>]*>/g)) {
    assert.match(tag, /rel="noopener noreferrer"/, tag);
  }
});

test('há exatamente um h1', () => {
  assert.equal((body.match(/<h1\b/g) ?? []).length, 1);
});

test('head contém SEO essencial', () => {
  assert.match(head, /<title>[^<]+<\/title>/);
  assert.match(head, new RegExp(`<link rel="canonical" href="${site.url}"`));
  assert.match(head, /property="og:image" content="https:\/\/luiizfellipee\.github\.io\/og-image\.png"/);
  const json = head.match(/<script type="application\/ld\+json">(.+?)<\/script>/)[1];
  assert.equal(JSON.parse(json).mainEntity.name, profile.fullName);
});

test('contatos presentes na página', () => {
  assert.ok(body.includes(profile.links.linkedin));
  assert.ok(body.includes(profile.links.github));
  assert.ok(body.includes(`mailto:${profile.links.email}`));
});
