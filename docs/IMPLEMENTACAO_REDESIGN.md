# Implementação do redesign

Referência visual: `files/Site/Portfolio.dc.html` (design feito no Claude Design, indicado pelo usuário como alvo
exato). Especificação: `PORTFOLIO_REDESIGN.md`. Inventário e decisões: [AUDITORIA_PORTFOLIO.md](AUDITORIA_PORTFOLIO.md).

## Arquitetura

Sem mudança de stack: **Vite 8 + HTML pré-renderizado no build + CSS com tokens + JS vanilla**.
O plugin de `vite.config.js` continua chamando `renderHead()`/`renderBody()`, então o HTML publicado já traz todo o
conteúdo (SEO, funciona sem JS). O runtime React do Claude Design (`support.js`) não foi usado: a marcação foi
reescrita nos renderizadores de seção e as interações em módulos vanilla pequenos.

Dependências:

| Pacote | Versão | Tipo | Motivo |
| --- | --- | --- | --- |
| `@fontsource-variable/geist` | 5.3.0 | runtime (CSS) | Fonte do design, local, subset latin (29 kB) |
| `@fontsource-variable/geist-mono` | 5.3.0 | runtime (CSS) | Fonte mono do design, local (23 kB) |
| `vite` | ^8.3.0 | dev | Build (já existia) |
| `playwright-core` | 1.63.0 (fixa) | dev | Testes E2E com o Chrome/Edge já instalado; não baixa navegador e não entra no bundle |

Removidos: `@fontsource-variable/ibm-plex-sans`, `@fontsource/ibm-plex-mono`.
Nenhuma biblioteca de animação: CSS (keyframes/transições) + `IntersectionObserver` + `requestAnimationFrame`.

Build de produção: HTML 10,8 kB gz · CSS 7,4 kB gz · JS 3,7 kB gz · fontes 52,5 kB.

## O que foi implementado, por área

### 01 · Hero cinematográfico
- `render/sections/hero.js`, `styles/sections.css` (Hero), `scripts/scramble.js`, `scripts/pointer.js`.
- Fundo fixo (`renderBackdrop` em `header.js`): três orbes com deriva em CSS e parallax ao cursor, grade mascarada,
  luz de 1200 px que segue o cursor com interpolação (`transform`, sem repaint de fundo).
- Nome letra a letra com entrada escalonada (`translate`/`opacity`, 120 ms + 55 ms por letra) e hover por letra
  (contorno na 1ª linha, branco na 2ª). Nome acessível em texto oculto; letras `aria-hidden`.
- Linha mono `// Data Quality & Test Automation` com efeito *scramble* ao carregar e no hover; o texto real fica
  oculto para leitores de tela.
- Cartão `profile.yml` glass com tilt 3D e luz; linhas numeradas por `counter()`.
- CTAs reais: “Ver projetos” (`#projetos`), GitHub e LinkedIn (nova aba), com magnetismo.
- Dock em pílula glass, fixo, entra após o hero (animação sem CLS), link ativo por seção (`aria-current`), rola
  sozinho na horizontal para manter o link ativo visível em telas estreitas. Barra de progresso de leitura.
- Cursor customizado do design: ponto que segue o mouse sem atraso + anel interpolado em modo `difference`, que
  cresce e preenche sobre links e botões. Só com mouse/trackpad e sem movimento reduzido; o cursor do sistema
  some apenas após o primeiro movimento e volta se o JS falhar ou a preferência mudar.

### 02 · Projetos interativos
- `render/sections/projects.js`, `render/sections/featured.js`, `scripts/pipeline.js`, `scripts/tabs.js`.
- Dois cards (`auto_vagas`, `acidentes_bh`) com tilt 3D (±3,5°), glow monocromático ligado ao cursor e borda
  luminosa; o foco por teclado dentro do card aplica o mesmo destaque de borda (`:focus-within`).
- O espaço que o design reservava para “screenshot do dashboard Metabase” mostra um **diagrama SVG do modelo
  dimensional real** (fato `boletins` + 4 dimensões), com linhas que fluem no hover; abaixo de 520 px vira lista.
- Estudo de caso integral (`#destaque`): pipeline de 6 etapas com pacote de dados animado (só enquanto visível),
  problema, solução, tecnologias, implementação em abas (clique, setas, Home/End, hover), resultados, nota e link.

### 03 · Skills e trajetória
- `render/sections/experience.js` + `scripts/accordion.js`: cargos em acordeão (um aberto por vez), botões com
  `aria-expanded`/`aria-controls`, Enter/Espaço nativos; a posição do botão clicado é mantida quando um item acima
  fecha. Realizações em mini-cards com luz; tags.
- `render/sections/skills.js` + `scripts/marquee.js`: faixa contínua de tecnologias (pausa fora da tela,
  desacelera no hover, parada com movimento reduzido) e 6 grupos com tilt/luz, cada competência com a origem.
- `render/sections/journey.js` + `scripts/journey.js`: trilha “De QA a MLOps” com 9 etapas; **avança com o scroll**
  e também por clique, hover e setas (padrão de abas). A escolha do usuário prevalece até a seção sair da tela.
- `render/sections/education.js`: formação, certificações e reconhecimento.

### 04 · Contato marcante
- `render/sections/contact.js` + `scripts/copy.js`: título “Vamos / conversar?” em escala de display, linhas
  LinkedIn / E-mail / GitHub. A linha do e-mail é um link `mailto:` real que ocupa a linha toda; o botão “Copiar”
  fica acima dele, mostra “Copiado ✓” e anuncia em `aria-live`. Magnetismo discreto no botão e nas setas, sem mover
  a área clicável da linha. Rodapé com “Voltar ao topo”.

### Fundação e transversais
- `styles/tokens.css`: todas as cores do design como tokens; nenhum hex fora dele (verificado em teste).
- Fallback de vidro (`@supports not (backdrop-filter)`) e `prefers-reduced-transparency`.
- `prefers-reduced-motion`: sem tilt, magnetismo, anel, parallax, deriva, faixa e pacote; pipeline estático e
  completo; reveals desativados; scramble desligado.
- `scripts/pointer.js`: **um único** listener de `pointermove` para luz, tilt, magnetismo, anel e parallax; o laço
  `requestAnimationFrame` só roda enquanto há interpolação pendente; desliga e limpa estilos se a preferência mudar.
- `scripts/env.js`: media queries compartilhadas e utilitário de visibilidade (`IntersectionObserver`).
- Classe `js` aplicada no `<head>` antes do primeiro paint: painéis recolhidos não “piscam”; sem JS tudo fica aberto.
- Assets monocromáticos novos: `favicon.svg`, `apple-touch-icon.png`, `og-image.png` (gerados no Chrome com Geist).

## Desvios conscientes em relação ao design

| Design | Implementado | Motivo |
| --- | --- | --- |
| Placeholder “screenshot do dashboard Metabase” | Diagrama do modelo dimensional | Não há captura real; a spec proíbe placeholder e imagem inventada |
| Linha do e-mail inteira = botão “copiar” | Link `mailto:` + botão “Copiar” | Spec exige `mailto:` real |
| `#7a7a80`, `#6e6e74`, `#5a5a60` em textos pequenos | Tokens com contraste ≥ 4,5:1 (`#7e7e84`) e 3,9:1 na faixa (texto grande) | WCAG AA |
| Jornada só por hover/clique | Também avança com o scroll | Requisito “timeline animada no scroll” |
| Linhas de cargo/contato em 3 colunas fixas | Empilham abaixo de 640 px; `profile.yml` compacto abaixo de 400 px | Legibilidade em 320 px |
| Google Fonts | Fontsource local | Performance e privacidade |
| Deriva dos orbes calculada em JS a cada quadro | Keyframes CSS + parallax em JS só quando o mouse move | Menor custo, mesmo visual |
| Controles do editor (intensidade de movimento, grade, cursor) | Valores padrão do design fixos | Não há editor no site publicado |

## Diferenças em relação à especificação original

- **Bento Grid**: o design escolhido pelo usuário usa grade de 2 colunas + estudo de caso; foi seguido.
- **Seção GitHub com dados ao vivo** e o card `anp-fuel-prices`: fora do design; não incluídos (ver pendências).
- **CTA “Entrar em contato” no hero**: o design usa GitHub/LinkedIn; mantido o design (o contato está no dock).

## Arquivos

Novos: `src/scripts/{env,pointer,scramble,accordion,marquee,pipeline,tabs,journey}.js`, `tests/e2e/site.e2e.js`,
`docs/AUDITORIA_PORTFOLIO.md`, `docs/IMPLEMENTACAO_REDESIGN.md`, `docs/VALIDACAO_REDESIGN.md`.

Reescritos: `src/styles/*.css`, `src/render/sections/*.js`, `src/scripts/{nav,reveal,copy}.js`, `src/main.js`,
`tests/content.test.js`, `public/{favicon.svg,apple-touch-icon.png,og-image.png}`, `README.md`.

Alterados: `index.html` (classe `js`, `theme-color`), `src/render/index.js`, `src/content/projects.js` (`schema`),
`src/content/skills.js` (`highlights`), `package.json`/`package-lock.json`, `.gitignore` (`test-results/`).

Removidos: `src/render/icons.js`, `src/render/languages.js`, `src/render/sections/{github,footer}.js`,
`src/scripts/github.js`.

Sem alteração: `vite.config.js`, `.github/workflows/deploy.yml`, `scripts/check-dist.js`, `public/robots.txt`,
`public/sitemap.xml`, `src/content/{profile,experience,education,journey}.js`.
