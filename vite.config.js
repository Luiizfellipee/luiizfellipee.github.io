import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const RENDERER = '/src/render/index.js';

// Renderiza o conteúdo (src/content + src/render) dentro do index.html.
// No build o resultado é HTML estático: melhor para SEO e sem framework no runtime.
const prerender = () => ({
  name: 'portfolio-prerender',
  async transformIndexHtml(html, ctx) {
    const renderer = ctx.server
      ? await ctx.server.ssrLoadModule(RENDERER)
      : await import(pathToFileURL(resolve(import.meta.dirname, `.${RENDERER}`)).href);
    return html.replace('<!--head-->', renderer.renderHead()).replace('<!--body-->', renderer.renderBody());
  },
  handleHotUpdate({ file, server }) {
    if (/[\\/]src[\\/](content|render)[\\/]/.test(file)) {
      server.ws.send({ type: 'full-reload' });
      return [];
    }
  },
});

export default defineConfig({
  // Site de usuário (luiizfellipee.github.io) é servido na raiz do domínio.
  base: '/',
  plugins: [prerender()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
});
