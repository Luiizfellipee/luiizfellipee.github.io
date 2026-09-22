# Portfólio · Luiz Felipe

Portfólio profissional de **Luiz Felipe Piumbini**, Analista de QA II com foco em Data Quality, automação de testes e IA aplicada.

**Site:** https://luiizfellipee.github.io/

## Objetivo

Apresentar, de forma direta e fiel às fontes, a trajetória profissional, as competências e os projetos públicos, deixando claro o que é **experiência profissional**, o que é **projeto pessoal ou acadêmico**, o que está **em desenvolvimento** e o que é **objetivo**.

Fontes do conteúdo:

- **LinkedIn** (PDF exportado do perfil): experiência, formação, certificações e resumo.
- **GitHub** ([@Luiizfellipee](https://github.com/Luiizfellipee)): projetos, analisados a partir do código e da documentação de cada repositório.

## Stack

| Camada | Escolha |
| --- | --- |
| Build | [Vite](https://vite.dev/) (única dependência de desenvolvimento) |
| Markup | HTML semântico **pré-renderizado no build** a partir de módulos JS |
| Estilo | CSS puro com design tokens (custom properties) |
| Comportamento | JavaScript vanilla (~2 kB gzip) |
| Fontes | IBM Plex Sans e Plex Mono, servidas pelo próprio site (subset latin) |
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
│   │   ├── icons.js           # ícones SVG inline
│   │   └── sections/          # uma função por seção
│   ├── scripts/               # navegação, aparecimento progressivo, GitHub API, copiar e-mail
│   ├── styles/                # tokens, base, layout e seções
│   └── main.js                # entrada do cliente
├── tests/content.test.js      # integridade do conteúdo e do HTML gerado
├── scripts/check-dist.js      # valida assets, âncoras, metadados e links do build
└── .github/workflows/deploy.yml
```

Para **atualizar o conteúdo**, edite só os arquivos em `src/content/`. O HTML é regenerado automaticamente.

## Como executar

Requer Node.js 20.19 ou superior.

```bash
npm install
npm run dev        # http://localhost:5173 (recarrega ao editar conteúdo)
```

## Build e verificação

```bash
npm test               # testes de conteúdo e HTML (node:test)
npm run build          # gera dist/
npm run check          # valida assets, âncoras e metadados do build
npm run check:links    # idem + testa links externos (requer rede)
npm run preview        # serve dist/ localmente
```

## Publicação

O deploy é automático a cada push na branch `main`, pelo workflow `.github/workflows/deploy.yml`, que executa testes, build e verificação e publica `dist/`.

### Configuração do GitHub Pages (uma única vez)

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Faça push na `main` (ou rode o workflow manualmente em **Actions → Deploy GitHub Pages → Run workflow**).

Como este é um site de usuário (`<usuario>.github.io`), ele é servido na raiz do domínio e o `base` do Vite é `/`.

## Decisões técnicas

- **Sem framework no runtime.** É uma página única e estática. React ou outro framework adicionaria peso sem benefício. O conteúdo é separado em módulos e convertido em HTML no build, o que dá boa organização para quem mantém e HTML completo para buscadores e redes sociais.
- **Conteúdo como dados.** Textos ficam em `src/content/`, separados da apresentação, e cada competência registra onde foi aplicada ou comprovada.
- **Progressive enhancement.** O site funciona sem JavaScript. O JS só adiciona menu mobile, destaque de seção, animações de entrada e dados ao vivo do GitHub.
- **GitHub API sem token.** A seção GitHub chama a API pública apenas quando está prestes a aparecer, guarda o resultado em `sessionStorage` e mantém o conteúdo estático se a chamada falhar. Nenhum token ou secret vai para o frontend.
- **Acessibilidade.** HTML semântico, um único `h1`, skip link, `aria-expanded` e tecla Esc no menu, foco visível, contraste AA e `prefers-reduced-motion` respeitado.
- **SEO.** Title e description reais, canonical, Open Graph com imagem 1200×630, JSON-LD (`ProfilePage` e `Person`), `robots.txt` e `sitemap.xml`.
- **Performance.** Cerca de 10 kB de HTML, 5 kB de CSS e 2 kB de JS (gzip), fontes locais com `font-display: swap` e nenhuma requisição de terceiros no carregamento inicial.
