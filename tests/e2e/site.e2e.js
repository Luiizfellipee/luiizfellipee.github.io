// Testes E2E no navegador (Chrome ou Edge instalados), contra o build de produção em dist/.
// Uso: npm run test:e2e   (faz o build, sobe o preview do Vite e roda estes testes)
// Navegador: CHROME_PATH=/caminho/do/chrome ou, por padrão, o canal "chrome" (fallback "msedge").
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { preview } from 'vite';

import { profile } from '../../src/content/profile.js';
import { skillGroups } from '../../src/content/skills.js';
import { journey } from '../../src/content/journey.js';

const SHOTS = 'test-results';
mkdirSync(SHOTS, { recursive: true });

let server;
let browser;
let url;

const launch = async () => {
  if (process.env.CHROME_PATH) return chromium.launch({ executablePath: process.env.CHROME_PATH });
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return chromium.launch({ channel: 'msedge' });
  }
};

// Abre a página registrando erros de console e exceções.
const open = async (options = {}, path = '/') => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...options });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(String(err)));
  await page.goto(url + path.slice(1));
  return { page, context, errors };
};

const scrollToEl = (page, selector, block = 'center') =>
  page.evaluate(
    ([sel, b]) => document.querySelector(sel).scrollIntoView({ block: b, behavior: 'instant' }),
    [selector, block],
  );

before(async () => {
  server = await preview({ preview: { port: 0, strictPort: false, open: false }, logLevel: 'silent' });
  url = server.resolvedUrls.local[0];
  browser = await launch();
});

after(async () => {
  await browser?.close();
  await server?.close();
});

describe('carregamento e layout', () => {
  test('sem erros de console e sem overflow horizontal de 320 a 1440 px', async () => {
    const { page, context, errors } = await open();
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      // percorre a página para acionar reveals e componentes
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 30));
        }
        scrollTo({ top: 0, behavior: 'instant' });
      });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.equal(overflow, 0, `overflow horizontal em ${width}px`);
    }
    assert.deepEqual(errors, []);
    await context.close();
  });

  test('skip link é o primeiro foco e leva ao conteúdo principal', async () => {
    const { page, context } = await open();
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.className), 'skip-link');
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => location.hash === '#conteudo');
    await context.close();
  });
});

describe('01 · hero cinematográfico', () => {
  test('nome, entrada animada, CTAs reais e dock flutuante glass', async () => {
    const { page, context } = await open();
    assert.equal(await page.getByRole('heading', { level: 1 }).innerText().then((t) => t.split('\n')[0]), profile.name);
    const animated = await page.$$eval('.hero__char', (els) => els.filter((el) => el.getAnimations().length > 0).length);
    assert.ok(animated >= 10, 'letras do nome com animação de entrada');

    const dock = page.locator('.dock');
    const style = await dock.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { position: cs.position, filter: cs.backdropFilter || cs.webkitBackdropFilter };
    });
    assert.equal(style.position, 'fixed');
    assert.match(style.filter, /blur/);

    await page.waitForTimeout(1600); // entrada concluída
    await page.screenshot({ path: `${SHOTS}/01-hero-1440.png` });

    await page.getByRole('link', { name: 'Ver projetos' }).click();
    await page.waitForFunction(() => location.hash === '#projetos');
    await page.waitForFunction(() => Math.abs(document.querySelector('#projetos').getBoundingClientRect().top) < 140);
    await page.waitForFunction(() => document.querySelector('.dock__link.is-active')?.hash === '#projetos');
    assert.equal(await page.locator('.dock__link[aria-current="location"]').innerText(), 'Projetos');
    await context.close();
  });

  test('luz e anel acompanham o cursor sem bloquear cliques', async () => {
    const { page, context } = await open();
    assert.ok(await page.evaluate(() => document.documentElement.classList.contains('has-cursor')));
    await page.mouse.move(300, 300);
    await page.mouse.move(900, 500, { steps: 8 });
    await page.waitForTimeout(400);
    const spot = await page.locator('[data-spotlight]').evaluate((el) => el.style.transform);
    assert.match(spot, /translate3d\((8\d\d|9\d\d)\.?\d*px/);
    for (const sel of ['[data-cursor]', '[data-cursor-dot]']) {
      const el = page.locator(sel);
      assert.equal(await el.evaluate((n) => getComputedStyle(n).pointerEvents), 'none', `${sel} não bloqueia cliques`);
      assert.equal(await el.evaluate((n) => getComputedStyle(n).opacity), '1', `${sel} visível`);
    }
    // ponto segue o mouse sem atraso; cursor do sistema substituído pelo customizado
    assert.match(await page.locator('[data-cursor-dot]').evaluate((el) => el.style.transform), /translate3d\(900px, 500px/);
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.pill')).cursor), 'none');
    // e os cliques continuam chegando aos links por baixo
    const hit = await page.evaluate(() => {
      const r = document.querySelector('.pill--solid').getBoundingClientRect();
      return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.closest('a')?.hash;
    });
    assert.equal(hit, '#projetos');
    await context.close();
  });

  test('título legível em 320 px', async () => {
    const { page, context } = await open({ viewport: { width: 320, height: 640 } });
    const box = await page.locator('.hero__title').boundingBox();
    assert.ok(box.x >= 0 && box.x + box.width <= 320);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${SHOTS}/01-hero-320.png` });
    await context.close();
  });
});

describe('02 · projetos interativos', () => {
  test('cards com tilt 3D e glow ligados ao cursor', async () => {
    const { page, context } = await open();
    await scrollToEl(page, '.project');
    const card = page.locator('.project').first();
    const box = await card.boundingBox();
    await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.2, { steps: 5 });
    await page.waitForTimeout(250);
    const state = await card.evaluate((el) => ({ transform: el.style.transform, mx: el.style.getPropertyValue('--mx') }));
    assert.match(state.transform, /rotateX\(-?\d/);
    assert.match(state.mx, /px$/);
    await page.screenshot({ path: `${SHOTS}/02-projetos-hover.png` });
    await page.mouse.move(5, 5);
    await page.waitForTimeout(100);
    assert.equal(await card.evaluate((el) => el.style.transform), '');
    await context.close();
  });

  test('foco por teclado destaca o card e links são reais', async () => {
    const { page, context } = await open();
    const link = page.locator('.project a[href="https://github.com/Luiizfellipee/ES-fuel-intelligence"]').first();
    await link.focus();
    await page.waitForTimeout(450); // transição da borda
    const border = await page.locator('.project').nth(1).evaluate((el) => getComputedStyle(el).borderColor);
    assert.match(border, /0\.22\)$/);
    for (const repo of ['BH-traffic-intelligence', 'ES-fuel-intelligence', 'jenkins-ci-case-study']) {
      assert.ok(await page.locator(`a[href="https://github.com/Luiizfellipee/${repo}"]`).count());
    }
    for (const repo of ['auto_vagas', 'acidentes_bh']) {
      assert.equal(await page.locator(`#projetos a[href="https://github.com/Luiizfellipee/${repo}"]`).count(), 0, repo);
    }
    await context.close();
  });

  test('cards abrem o estudo de caso certo e o seletor troca de projeto', async () => {
    const { page, context } = await open();
    const picker = page.locator('.featured__picker [role="tab"]');
    assert.equal(await picker.count(), 3);
    assert.ok(await page.locator('#caso-BH-traffic-intelligence').isVisible());
    assert.ok(!(await page.locator('#caso-jenkins-ci-case-study').isVisible()));

    // "Ver estudo de caso" do terceiro card seleciona a esteira de CI e rola até o seletor.
    await page.locator('.project').nth(2).getByRole('link', { name: 'Ver estudo de caso' }).click();
    await page.waitForFunction(() => location.hash === '#destaque');
    assert.equal(await picker.nth(2).getAttribute('aria-selected'), 'true');
    assert.ok(await page.locator('#caso-jenkins-ci-case-study').isVisible());
    assert.ok(!(await page.locator('#caso-BH-traffic-intelligence').isVisible()));
    assert.equal(await page.evaluate(() => document.activeElement.id), 'caso-tab-jenkins-ci-case-study');

    // Setas e clique no seletor.
    await page.keyboard.press('ArrowRight');
    assert.ok(await page.locator('#caso-BH-traffic-intelligence').isVisible());
    await picker.nth(1).click();
    assert.ok(await page.locator('#caso-ES-fuel-intelligence').isVisible());
    assert.equal(await page.locator('#caso-ES-fuel-intelligence .pipeline__step--planned').count(), 2);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SHOTS}/02-destaques-seletor.png` });

    // Link direto para um caso.
    const deep = await open({}, '/#caso-jenkins-ci-case-study');
    assert.ok(await deep.page.locator('#caso-jenkins-ci-case-study').isVisible());
    await deep.context.close();
    await context.close();
  });

  test('pipeline animado e abas de implementação (clique, setas e hover)', async () => {
    const { page, context } = await open();
    await scrollToEl(page, '#caso-BH-traffic-intelligence [data-pipeline]');
    await page.waitForTimeout(2500);
    assert.ok((await page.locator('#caso-BH-traffic-intelligence .pipeline__step.is-on').count()) > 0, 'etapas do pipeline acendem');

    // Só o pipeline visível anima; o do caso oculto fica parado.
    assert.equal(await page.locator('#caso-jenkins-ci-case-study [data-packet]').evaluate((el) => el.style.transform), '');

    const id = (n) => `#impl-BH-traffic-intelligence-${n}`;
    const tabs = page.locator('#caso-BH-traffic-intelligence [data-tabs] [role="tab"]');
    await tabs.nth(2).click();
    assert.equal(await tabs.nth(2).getAttribute('aria-selected'), 'true');
    assert.ok(await page.locator(id(3)).isVisible());
    assert.ok(!(await page.locator(id(1)).isVisible()));
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'impl-tab-BH-traffic-intelligence-4');
    assert.ok(await page.locator(id(4)).isVisible());
    await page.keyboard.press('End');
    assert.ok(await page.locator(id(5)).isVisible());
    await tabs.nth(1).hover();
    assert.ok(await page.locator(id(2)).isVisible());

    // Trocar de caso mantém as abas do outro caso independentes e reinicia a animação.
    await page.locator('#caso-tab-jenkins-ci-case-study').click();
    await page.waitForTimeout(1500);
    assert.ok((await page.locator('#caso-jenkins-ci-case-study .pipeline__step.is-on').count()) > 0);
    assert.ok(await page.locator('#impl-jenkins-ci-case-study-1').isVisible());
    await scrollToEl(page, '#caso-jenkins-ci-case-study .case');
    await page.screenshot({ path: `${SHOTS}/02-estudo-de-caso.png` });
    await context.close();
  });
});

describe('03 · skills e trajetória', () => {
  test('todas as competências aparecem, cards reagem ao cursor e a faixa se move', async () => {
    const { page, context } = await open();
    const text = await page.locator('#skills').innerText();
    for (const group of skillGroups) for (const [name] of group.skills) assert.ok(text.includes(name), name);
    await scrollToEl(page, '.marquee');
    const x1 = await page.locator('[data-marquee-track]').evaluate((el) => el.style.transform);
    await page.waitForTimeout(500);
    const x2 = await page.locator('[data-marquee-track]').evaluate((el) => el.style.transform);
    assert.notEqual(x1, x2);
    await scrollToEl(page, '.skill-grid');
    const card = page.locator('.skill-card').first();
    const box = await card.boundingBox();
    await page.mouse.move(box.x + 40, box.y + 40, { steps: 4 });
    await page.waitForTimeout(200);
    assert.match(await card.evaluate((el) => el.style.transform), /rotateY/);
    await page.screenshot({ path: `${SHOTS}/03-skills.png` });
    await context.close();
  });

  test('cargos expansíveis por clique, Enter e Espaço com aria-expanded', async () => {
    const { page, context } = await open();
    const toggles = page.locator('.role__toggle');
    assert.equal(await toggles.nth(0).getAttribute('aria-expanded'), 'true');
    assert.ok(await page.locator('#cargo-1-1').isVisible());
    assert.ok(!(await page.locator('#cargo-1-2').isVisible()));

    await toggles.nth(1).click();
    assert.equal(await toggles.nth(1).getAttribute('aria-expanded'), 'true');
    assert.equal(await toggles.nth(0).getAttribute('aria-expanded'), 'false');
    assert.ok(await page.locator('#cargo-1-2').isVisible());

    await toggles.nth(3).focus();
    await page.keyboard.press('Enter');
    assert.equal(await toggles.nth(3).getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Space');
    assert.equal(await toggles.nth(3).getAttribute('aria-expanded'), 'false');
    await context.close();
  });

  test('jornada avança com o scroll e aceita clique e teclado', async () => {
    const { page, context } = await open();
    const selected = () => page.locator('.step[aria-selected="true"] .step__name').innerText();
    await page.evaluate(() => {
      const el = document.querySelector('[data-journey-scroller]');
      scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight * 0.95, behavior: 'instant' });
    });
    await page.waitForTimeout(200);
    const first = await selected();
    await page.evaluate(() => {
      const el = document.querySelector('[data-journey-scroller]');
      scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight * 0.2, behavior: 'instant' });
    });
    await page.waitForTimeout(300);
    const last = await selected();
    assert.equal(first, journey[0].stage);
    assert.equal(last, journey.at(-1).stage);
    const fill = await page.locator('[data-journey-fill]').evaluate((el) => el.style.getPropertyValue('--fill'));
    assert.equal(Number(fill), 1);

    await page.locator('.step').nth(4).click();
    assert.equal(await selected(), journey[4].stage);
    assert.ok(await page.locator('#etapa-5').isVisible());
    await page.keyboard.press('ArrowLeft');
    assert.equal(await selected(), journey[3].stage);
    await page.screenshot({ path: `${SHOTS}/03-jornada.png` });
    await context.close();
  });
});

describe('04 · contato marcante', () => {
  test('mailto real, copiar com retorno e magnetismo sem mover o alvo', async () => {
    const { page, context } = await open({ permissions: ['clipboard-read', 'clipboard-write'] });
    await scrollToEl(page, '#contato', 'start');
    await page.waitForTimeout(1200); // reveal concluído antes de medir posições
    const mail = page.locator(`a[href="mailto:${profile.links.email}"]`);
    assert.equal(await mail.count(), 1);
    const copy = page.locator('[data-copy]');
    const row = page.locator('.contact-row', { has: mail });
    const before = await row.boundingBox();
    const box = await copy.boundingBox();
    await page.mouse.move(box.x + box.width + 6, box.y + box.height / 2 + 4, { steps: 4 });
    await page.mouse.move(box.x + box.width - 2, box.y + box.height / 2 + 4, { steps: 2 });
    await page.waitForTimeout(150);
    assert.match(await copy.evaluate((el) => el.style.transform), /translate\(/);
    // a área clicável (linha inteira, via link esticado) não se desloca
    assert.deepEqual(await row.boundingBox(), before, 'linha do e-mail permanece no lugar');
    const hit = await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('a')?.href, [before.x + 200, before.y + before.height / 2]);
    assert.equal(hit, `mailto:${profile.links.email}`);
    await copy.click();
    await page.waitForFunction(() => document.querySelector('[data-copy-label]').textContent.includes('Copiado'));
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), profile.links.email);
    assert.match(await page.locator('[data-copy-status]').textContent(), /copiado/);
    for (const href of [profile.links.linkedin, profile.links.github]) {
      assert.equal(await page.locator(`.contact a[href="${href}"]`).count(), 1, href);
    }
    await page.screenshot({ path: `${SHOTS}/04-contato.png` });
    await page.getByRole('link', { name: 'Voltar ao topo' }).click();
    await page.waitForFunction(() => location.hash === '#topo');
    await context.close();
  });
});

describe('acessibilidade de movimento, toque e sem JavaScript', () => {
  test('prefers-reduced-motion: sem animações reativas e conteúdo visível', async () => {
    const { page, context } = await open({ reducedMotion: 'reduce' });
    assert.ok(!(await page.evaluate(() => document.documentElement.classList.contains('has-cursor'))));
    assert.ok(!(await page.evaluate(() => document.documentElement.classList.contains('reveal-ready'))));
    await page.mouse.move(400, 300, { steps: 3 });
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.pill')).cursor), 'pointer', 'cursor do sistema mantido');
    await scrollToEl(page, '.project');
    const card = page.locator('.project').first();
    const box = await card.boundingBox();
    await page.mouse.move(box.x + 30, box.y + 30, { steps: 3 });
    assert.equal(await card.evaluate((el) => el.style.transform), '', 'sem tilt');
    await scrollToEl(page, '.marquee');
    const x1 = await page.locator('[data-marquee-track]').evaluate((el) => el.style.transform);
    await page.waitForTimeout(400);
    assert.equal(await page.locator('[data-marquee-track]').evaluate((el) => el.style.transform), x1, 'faixa parada');
    await scrollToEl(page, '[data-pipeline]');
    assert.equal(await page.locator('#caso-BH-traffic-intelligence .pipeline__step.is-on').count(), 6, 'pipeline estático e completo');
    const opacity = await page.locator('.hero__char').first().evaluate((el) => getComputedStyle(el).opacity);
    assert.equal(opacity, '1');
    await context.close();
  });

  test('toque (mobile): sem efeitos de cursor e interações por toque funcionam', async () => {
    const { page, context } = await open({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
    assert.ok(!(await page.evaluate(() => document.documentElement.classList.contains('has-cursor'))));
    await scrollToEl(page, '.role__toggle:nth-of-type(1)');
    await page.locator('.role__toggle').nth(2).tap();
    assert.equal(await page.locator('.role__toggle').nth(2).getAttribute('aria-expanded'), 'true');
    await scrollToEl(page, '#caso-tab-ES-fuel-intelligence');
    await page.locator('#caso-tab-ES-fuel-intelligence').tap();
    assert.ok(await page.locator('#caso-ES-fuel-intelligence').isVisible());
    await scrollToEl(page, '#impl-tab-ES-fuel-intelligence-2');
    await page.locator('#impl-tab-ES-fuel-intelligence-2').tap();
    assert.ok(await page.locator('#impl-ES-fuel-intelligence-2').isVisible());
    await scrollToEl(page, '#destaque', 'start');
    await page.screenshot({ path: `${SHOTS}/mobile-375-destaques.png` });
    await page.locator('.dock__link[href="#contato"]').tap();
    await page.waitForFunction(() => location.hash === '#contato');
    await page.waitForFunction(() => document.querySelector('.dock__link.is-active')?.hash === '#contato');
    await page.screenshot({ path: `${SHOTS}/mobile-375-contato.png` });
    await context.close();
  });

  test('sem JavaScript todo o conteúdo continua visível', async () => {
    const { page, context } = await open({ javaScriptEnabled: false });
    for (const id of ['#cargo-1-2', '#cargo-2-1', '#impl-jenkins-ci-case-study-5', '#caso-ES-fuel-intelligence', '#etapa-9']) {
      assert.ok(await page.locator(id).isVisible(), id);
    }
    assert.equal(await page.locator('[data-reveal]').first().evaluate((el) => getComputedStyle(el).opacity), '1');
    await context.close();
  });
});
