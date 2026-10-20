# Portfólio · Luiz Felipe

Portfólio profissional de **Luiz Felipe Piumbini**, Analista de QA II com foco em Data Quality, automação de testes e IA aplicada, em direção à área de Dados.

**Site:** <https://luiizfellipee.github.io/>

## Objetivo

Apresentar, de forma direta e fiel às fontes, a trajetória profissional, as competências e os projetos públicos, deixando claro o que é **experiência profissional**, o que é **projeto pessoal ou acadêmico**, o que está **em desenvolvimento** e o que é **objetivo**.

Fontes do conteúdo:

- **LinkedIn** (PDF exportado do perfil): experiência, formação, certificações e resumo.
- **GitHub** ([@Luiizfellipee](https://github.com/Luiizfellipee)): projetos, analisados a partir do código e da documentação de cada repositório.

Visual: identidade monocromática com vidro (glass), baseada no design de referência feito no Claude Design. Detalhes em [docs/IMPLEMENTACAO_REDESIGN.md](docs/IMPLEMENTACAO_REDESIGN.md).

## Stack

| Camada | Escolha |
| --- | --- |
| Build | [Vite](https://vite.dev/) |
| Markup | HTML semântico **pré-renderizado no build** a partir de módulos JS |
| Estilo | CSS puro com design tokens (`src/styles/tokens.css`) |
| Comportamento | JavaScript vanilla (~3,7 kB gzip), sem biblioteca de animação |
| Fontes | Geist e Geist Mono (OFL), servidas pelo próprio site (subset latin) |
| Testes | `node:test` (conteúdo, HTML, design system) e E2E com `playwright-core` no Chrome instalado |
| Deploy | GitHub Actions → GitHub Pages |

## Estrutura

```text
.
├── index.html                 # shell: <!--head--> e <!--body--> são preenchidos no build
├── vite.config.js             # plugin que pré-renderiza o conteúdo no HTML
├── public/                    # favicon, og-image, robots.txt, sitemap.xml
├── src/
│   ├── content/               # dados: perfil, experiência, skills, projetos, jornada, formação
│   ├── render/
│   │   ├── index.js           # monta a página, metadados e JSON-LD
│   │   ├── html.js            # template tag com escape automático
│   │   └── sections/          # uma função por seção (hero, sobre, experiência, skills, projetos…)
│   ├── scripts/               # interações: dock, reveal, cursor/tilt/magnetismo, acordeão, abas, jornada…
│   ├── styles/                # tokens, base, layout (componentes) e seções
│   └── main.js                # entrada do cliente
├── tests/
│   ├── content.test.js        # integridade do conteúdo, HTML gerado e design system
│   └── e2e/site.e2e.js        # navegador real: mouse, teclado, toque, movimento reduzido, sem JS
├── scripts/check-dist.js      # valida assets, âncoras, metadados e links do build
├── docs/                      # auditoria, implementação e validação do redesign
└── .github/workflows/deploy.yml
```

Para **atualizar o conteúdo**, edite só os arquivos em `src/content/`. O HTML é regenerado automaticamente.
Para **ajustar cores**, edite apenas `src/styles/tokens.css` (os testes recusam hex fora dele e cores saturadas).

## Como executar

Requer Node.js 20.19 ou superior.

```bash
npm install
npm run dev        # http://localhost:5173 (recarrega ao editar conteúdo)
```

## Build e verificação

```bash
npm test               # testes de conteúdo, HTML e design system (node:test)
npm run build          # gera dist/
npm run check          # valida assets, âncoras e metadados do build
npm run check:links    # idem + testa links externos (requer rede)
npm run test:e2e       # build + testes no navegador (requer Chrome ou Edge instalado)
npm run preview        # serve dist/ em http://localhost:4173
```

`npm run test:e2e` usa o Chrome instalado (canal `chrome`, com fallback para `msedge`). Para outro executável:
`CHROME_PATH=/caminho/do/chrome npm run test:e2e`. As capturas de tela ficam em `test-results/` (ignorada pelo Git).

## Publicação

O deploy é automático a cada push na branch `main`, pelo workflow `.github/workflows/deploy.yml`, que executa `npm ci`, testes, build e verificação e publica `dist/`.

### Configuração do GitHub Pages (uma única vez)

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Faça push na `main` (ou rode o workflow manualmente em **Actions → Deploy GitHub Pages → Run workflow**).

Como este é um site de usuário (`<usuario>.github.io`), ele é servido na raiz do domínio e o `base` do Vite é `/`. A página é única, com navegação por âncoras, então não há rotas que precisem de fallback 404.

## Decisões técnicas

- **Sem framework no runtime.** Página única e estática; as interações (tilt, luz, magnetismo, acordeão, abas, trilha no scroll) cabem em CSS, `IntersectionObserver` e `requestAnimationFrame`. React adicionaria peso sem benefício.
- **Um único listener de ponteiro** alimenta luz, tilt, magnetismo, anel e parallax; o laço de animação só roda enquanto há movimento. Animações contínuas (faixa, pipeline) param fora da tela.
- **Progressive enhancement.** Sem JavaScript todo o conteúdo fica visível; o JS só recolhe painéis e adiciona efeitos.
- **Acessibilidade.** HTML semântico, um único `h1`, skip link, `aria-expanded`/`aria-controls` no acordeão, abas WAI-ARIA com setas, foco visível, contraste AA verificado em teste, `prefers-reduced-motion` e `prefers-reduced-transparency`, fallback sólido sem `backdrop-filter`, cursor nativo preservado.
- **SEO.** Title e description reais, canonical, Open Graph com imagem 1200×630, JSON-LD (`ProfilePage` e `Person`), `robots.txt` e `sitemap.xml`.
- **Performance.** Cerca de 11 kB de HTML, 7 kB de CSS e 4 kB de JS (gzip), fontes locais com `font-display: swap` e nenhuma requisição de terceiros.
