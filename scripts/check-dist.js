// Valida o build em dist/: assets referenciados, âncoras e metadados.
// Uso: node scripts/check-dist.js [--external]  (--external também testa links externos)
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const indexPath = join(DIST, 'index.html');
const problems = [];
const warnings = [];

if (!existsSync(indexPath)) {
  console.error('dist/index.html não encontrado. Rode "npm run build" antes.');
  process.exit(1);
}

const html = readFileSync(indexPath, 'utf8');

// 1. Assets locais referenciados no HTML e no CSS
const localRefs = new Set();
for (const [, ref] of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) localRefs.add(ref);
for (const [, ref] of html.matchAll(/<link[^>]+href="(\/assets\/[^"]+\.css)"/g)) {
  const css = readFileSync(join(DIST, ref), 'utf8');
  for (const [, url] of css.matchAll(/url\(([^)]+)\)/g)) {
    const clean = url.replace(/["']/g, '');
    if (!clean.startsWith('data:')) localRefs.add(clean.startsWith('/') ? clean : `/assets/${clean.replace(/^\.\//, '')}`);
  }
}
for (const ref of localRefs) {
  const file = ref === '/' ? 'index.html' : ref.slice(1);
  if (!existsSync(join(DIST, file))) problems.push(`asset ausente: ${ref}`);
}

// 2. Âncoras internas
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const [, ref] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.has(ref)) problems.push(`âncora sem destino: #${ref}`);
}

// 3. Metadados essenciais
for (const [label, pattern] of [
  ['title', /<title>[^<]+<\/title>/],
  ['meta description', /<meta name="description" content="[^"]+"/],
  ['canonical', /<link rel="canonical" href="https:\/\/luiizfellipee\.github\.io\/"/],
  ['og:image', /<meta property="og:image" content="[^"]+"/],
  ['JSON-LD', /<script type="application\/ld\+json">/],
  ['lang', /<html lang="pt-BR"/],
]) {
  if (!pattern.test(html)) problems.push(`metadado ausente: ${label}`);
}
for (const file of ['robots.txt', 'sitemap.xml', 'favicon.svg', 'og-image.png', 'apple-touch-icon.png']) {
  if (!existsSync(join(DIST, file))) problems.push(`arquivo público ausente: ${file}`);
}

// 4. Links externos (opcional, requer rede)
if (process.argv.includes('--external')) {
  const urls = [...new Set([...html.matchAll(/href="(https:\/\/[^"]+)"/g)].map((m) => m[1]))].filter(
    (u) => !u.startsWith('https://luiizfellipee.github.io'),
  );
  await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 link-check' } });
        // O LinkedIn responde 999 a clientes automatizados; não indica link quebrado.
        if (res.status === 999) warnings.push(`${url} → 999 (bloqueio anti-bot do LinkedIn, verificar manualmente)`);
        else if (!res.ok) problems.push(`link externo ${res.status}: ${url}`);
        else console.log(`ok ${res.status} ${url}`);
      } catch (err) {
        problems.push(`link externo inacessível: ${url} (${err.message})`);
      }
    }),
  );
}

warnings.forEach((w) => console.warn(`aviso: ${w}`));
if (problems.length) {
  problems.forEach((p) => console.error(`erro: ${p}`));
  process.exit(1);
}
console.log(`dist verificado: ${localRefs.size} assets locais, ${ids.size} ids, metadados ok.`);
