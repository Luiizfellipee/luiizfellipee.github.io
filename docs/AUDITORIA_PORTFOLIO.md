# Auditoria do portfólio — estado anterior ao redesign

Data da auditoria: 2026-10-20 · Base: commit `9669759` (branch `main`).
Escopo: código local do repositório (fonte da verdade), repositórios públicos de `github.com/Luiizfellipee` consultados pela API pública, `PORTFOLIO_REDESIGN.md` e o design de referência em `files/Site/`.

## 1. Stack identificado

| Item | Estado encontrado | Decisão |
| --- | --- | --- |
| Build | Vite 8.3 (única devDependency) | **Preservar** |
| Arquitetura | Vanilla JS. Conteúdo em `src/content/*.js` → HTML **pré-renderizado no build** por plugin próprio em `vite.config.js` (`renderHead`/`renderBody`) | **Preservar**. Sem migração para React: é uma página única, estática, já com separação conteúdo/apresentação, SEO completo e ~2 kB de JS. React + Motion acrescentaria ~45–60 kB gzip, hidratação e reescrita total sem ganho de manutenção. As interações exigidas (tilt, glow, magnético, timeline no scroll, modal) cabem em CSS + `IntersectionObserver` + `requestAnimationFrame`. |
| Template | `html` tagged template com escape automático (`src/render/html.js`) | **Preservar** |
| Estilo | CSS puro com custom properties (`tokens.css`, `base.css`, `layout.css`, `sections.css` — 1 028 linhas) | **Refazer** com o design system MONO/GLASS e arquivos por seção |
| Fontes | IBM Plex Sans (variável) + Plex Mono 400/500, via Fontsource, locais | **Substituir** por Geist + Geist Mono (OFL-1.1, Fontsource, locais, variáveis) — sugeridas pela especificação; um único arquivo variável por família |
| Comportamento | `nav.js` (menu mobile, seção ativa), `reveal.js` (IO), `copy.js`, `github.js` (API pública, cache em sessão) | **Melhorar**/reaproveitar; acrescentar módulos de interação |
| Testes | `node --test` (12 testes de conteúdo/HTML) + `scripts/check-dist.js` (assets, âncoras, metadados, links) | **Preservar e ampliar**; acrescentar testes E2E em navegador real |
| Deploy | `.github/workflows/deploy.yml`: `npm ci` → test → build → check → Pages (permissões mínimas) | **Preservar** sem alteração |
| `base` do Vite | `/` (site de usuário `luiizfellipee.github.io`) | **Correto, preservar** |
| Roteamento | Página única com âncoras; sem history routing → sem necessidade de fallback 404 | **Preservar** |

Dependências: `@fontsource-variable/ibm-plex-sans`, `@fontsource/ibm-plex-mono` (runtime CSS), `vite` (dev). Nenhuma biblioteca de animação.

Baseline executado antes de qualquer mudança: `npm test` 12/12 ok; `npm run build` ok (HTML 10,6 kB gz, CSS 5,4 kB gz, JS 2,05 kB gz, fontes 75 kB); `npm run check` ok (7 assets, 22 ids).

## 2. Inventário de conteúdo (preservado integralmente)

Fontes declaradas no código: PDF do LinkedIn (`files/Profile.pdf`, fora do Git) e repositórios públicos.

### Perfil e contato (`src/content/profile.js`)
- Nome: Luiz Felipe · nome completo Luiz Felipe Piumbini · Analista de QA II · WebLider · Guarapari, ES.
- Foco: Data Quality & Test Automation. Headline, citação e 3 parágrafos de “Sobre”.
- Fatos: WebLider 3 anos e 7 meses; Graduação Data Science · FIAP; Pós IA & ML · PUC Minas (em andamento).
- Snapshot: role, focus, stack (SQL · Cypress · Python), learning, next (Dados → Machine Learning → MLOps).
- Links: GitHub `https://github.com/Luiizfellipee`, LinkedIn `https://www.linkedin.com/in/luiz-felipe-piumbini-366768115`, e-mail `luizfelipepiumbini@gmail.com`.

### Experiência (`src/content/experience.js`)
| Empresa | Cargo | Período | Detalhe |
| --- | --- | --- | --- |
| WebLider (3 anos e 7 meses · Espírito Santo) | Analista de QA (Nível II) | mar 2026 — atual | 7 realizações + 6 tags |
| WebLider | Analista de QA / Qualidade de Dados | set 2024 — atual | resumo + 4 realizações + 6 tags |
| WebLider | Analista de Suporte Computacional (Guarapari, ES) | mar 2023 — set 2024 | resumo + 4 itens |
| Fracaroli Mármores e Granitos (5 anos e 9 meses · Guarapari, ES) | Vendedor Técnico e Gestor de Processos | jun 2017 — fev 2023 | resumo + 4 itens |

### Formação, certificações e prêmios (`src/content/education.js`)
- PUC Minas — Pós Lato Sensu em IA e Aprendizado de Máquina — fev 2026 — jan 2027 — Em andamento.
- FIAP — CST em Data Science — fev 2023 — dez 2024 — Concluído.
- Escola Técnica Cedtec — Técnico em Mecânica — 2014 — 2015 — Concluído.
- Certificações (5, em 2 grupos; emissores não informados no PDF).
- Reconhecimento: Enterprise Challenge · NPS: Audio-To-Text Challenge — FIAP · TOTVS · Microsoft.

### Skills (`src/content/skills.js`)
31 competências em 6 grupos, cada uma com a origem (WebLider, repositório, formação, certificação ou declarada).

### Jornada (`src/content/journey.js`)
9 etapas (QA → … → MLOps) com status experiência / em desenvolvimento / objetivo.

### Projetos (`src/content/projects.js`)
| Repo | Exibido como | Links | Observações |
| --- | --- | --- | --- |
| `acidentes_bh` | Card + **estudo de caso completo** (#destaque): problema, solução, pipeline, tecnologias, 5 etapas de implementação, 3 resultados qualitativos, nota “sem demo online” | repo | Conferido com o README do repositório |
| `auto_vagas` | Card com 5 características | repo | Conferido com o README (Discord, Remotive, RemoteOK, Gupy opcional). A *descrição curta* do repositório no GitHub ainda cita “Telegram/AutoGlass”, divergente do README: mantido o texto do README |

Repositórios públicos encontrados e **não exibidos** no site anterior:
- `anp-fuel-prices` (criado em 2026-10-06): README se apresenta como “projeto de portfólio em desenvolvimento” — análise da série de preços de combustíveis da ANP com Python, pandas, PyArrow, DuckDB, Jupyter e uv; status “Fase 0”; já há `notebooks/01_perfil.ipynb` e `sql/01_perfil.sql`, `02_perfil.sql`. Decisão final: não incluir (ver seção 5).
- `Luiizfellipee` (README de perfil) e `luiizfellipee.github.io` (este site): não são projetos.

Imagens reais dos projetos: **nenhum repositório contém screenshots** (verificado na árvore de arquivos). Decisão: onde o design previa uma captura, usar um diagrama gerado a partir da arquitetura documentada (modelo dimensional), rotulado como diagrama, nunca como captura de tela.

### Metadados e públicos
- `<title>`, description, canonical, Open Graph (1200×630), Twitter card, JSON-LD `ProfilePage`/`Person`, `robots.txt`, `sitemap.xml`, favicon SVG, apple-touch-icon.
- `og-image.png` e `favicon.svg` usam o acento verde-água `#5fe3c4` → conflitam com a identidade mono.

### Âncoras públicas existentes
`#topo #sobre #experiencia #skills #projetos #destaque #jornada #formacao #github #contato #conteudo` — todas mantidas no redesign (algumas passam a apontar para o elemento equivalente) para não quebrar links compartilhados.

## 3. Diagnóstico de UX/visual

- Layout de documento linear (10 seções em sequência), hero com painel “profile.yml”; boa legibilidade, mas sem a experiência exigida: não há hero cinematográfico, bento, tilt/glow, timeline animada nem contato com tipografia forte.
- Acentos cromáticos: verde-água (acento) e amarelo (`--status-developing`), cores de linguagens do GitHub (`languages.js`).
- Acessibilidade já sólida: skip link, `h1` único, `aria-expanded` no menu, Esc, foco visível, reduced motion, `rel="noopener noreferrer"`.
- Sem erros estruturais: testes e `check` passam; âncoras íntegras.

## 4. Referência visual recebida durante a execução

Depois desta auditoria inicial, o usuário indicou como alvo **exato** o design feito no Claude Design:
`files/Site/Portfolio.dc.html` (+ `support.js`, runtime React do Claude Design), também em
`claude.ai/design/p/aed7542f-…?file=Portfolio.dc.html`. O arquivo foi lido por completo e renderizado no Chrome
(1440 px e 375 px) para comparação lado a lado. Ele passa a ser a referência visual e de interação, e substitui as
decisões de layout que eu havia esboçado a partir só do texto da especificação (Bento Grid, timeline mesclada, card
extra `anp-fuel-prices`).

O que o design define: fundo `#0a0a0b` com três orbes difusos em deriva, grade mascarada e luz que segue o cursor;
barra de progresso de 2 px; anel de cursor; dock em pílula glass com 7 âncoras; hero com nome letra a letra, linha
mono com efeito *scramble*, cartão `profile.yml` com tilt; Sobre com citação e fatos; Experiência em acordeão;
Skills com faixa em movimento e 6 cards com tilt; dois projetos + estudo de caso com pipeline animado e abas;
Jornada com trilha de 9 etapas; Formação; Contato com tipografia gigante; rodapé.

Os textos do design são os mesmos de `src/content` (conferidos item a item), então o conteúdo continua vindo
dos módulos de dados. O runtime do Claude Design **não** foi copiado: a marcação foi reescrita no renderizador
existente e as interações em JS vanilla.

## 5. Matriz de decisões (final)

| Item | Decisão | Justificativa |
| --- | --- | --- |
| Vite + pré-renderização + vanilla | Preservar | Qualidade, SEO e peso já adequados; o design é estático com interações que não exigem React |
| Conteúdo em `src/content` | Preservar; acrescentados apenas `highlights` (faixa de skills, itens já existentes) e `schema` (modelo dimensional já descrito na implementação) | Nenhum dado removido ou inventado |
| Paleta, tipografia, CSS | Refazer conforme o design (tokens em `tokens.css`) | Referência do usuário |
| Fontes | Geist + Geist Mono variáveis, locais via Fontsource (o design usava Google Fonts) | Mesma fonte, sem requisição a terceiros; 52 kB contra 75 kB das fontes anteriores |
| Header | Refazer → dock glass com seção ativa e rolagem horizontal no mobile | Design |
| Hero | Refazer conforme o design | Requisito 01 |
| Projetos | Refazer → grade de 2 cards com tilt/glow + estudo de caso integral em `#destaque` | Design. A spec pedia Bento Grid; o design do usuário usa grade de 2 colunas e foi seguido |
| Placeholder “screenshot do dashboard Metabase” do design | **Substituir** por diagrama do modelo dimensional real | Não existe captura no repositório; a spec proíbe placeholders e imagens inventadas |
| Seção GitHub (dados ao vivo) | **Remover** (`github.js`, `languages.js`) | Não existe no design; links para o GitHub continuam no hero, nos projetos e no contato |
| `anp-fuel-prices` | **Não incluir** | Não está no design nem no site anterior; registrado como sugestão |
| Experiência | Acordeão (um cargo aberto por vez), como no design | Requisito 03 (expansível e acessível) |
| Jornada | Trilha do design + avanço pelo scroll | Requisito 03 pede timeline animada no scroll; o design só reagia a hover/clique |
| Cursor customizado | Anel mantido; ponto e `cursor: none` **não** aplicados | A spec proíbe esconder o ponteiro nativo |
| E-mail no contato | Link `mailto:` real + botão “Copiar” (no design a linha inteira era só “copiar”) | A spec exige `mailto:` |
| Cinzas abaixo de AA | `#7a7a80` → `#7e7e84`; textos pequenos em `#6e6e74`/`#5a5a60` passam para tokens ≥ 4,5:1; faixa de skills para 3,9:1 (texto grande) | WCAG AA |
| `og-image.png`, `favicon.svg`, `apple-touch-icon.png` | Refeitos em monocromático | Identidade consistente |
| Workflow de deploy | Preservar sem alteração | Já correto e com permissões mínimas |
| Testes | Ampliar: conteúdo/HTML/CSS (node:test) + E2E com `playwright-core` usando o Chrome instalado | Validar teclado, toque, movimento reduzido, overflow e console |

## 6. Pendências identificadas na auditoria

- A imagem de referência de quatro blocos citada no pedido inicial não está no workspace; a referência efetiva passou a ser o design em `files/Site/`.
- Emissores das certificações não constam no PDF (mantido sem emissor).
- Descrição curta do repositório `auto_vagas` no GitHub diverge do README (Telegram × Discord) — ajuste no próprio GitHub, fora deste repositório.
- Repositório `anp-fuel-prices` (público, autodeclarado “projeto de portfólio em desenvolvimento”) não está no site: decidir se entra quando tiver resultados.
- Captura real do dashboard Metabase do `acidentes_bh`, se o autor quiser substituir o diagrama.
