# Validação do redesign

Data: 2026-10-20 · Ambiente: Windows 11, Node 24.15.0, npm 11.12.1, Google Chrome estável (headless) via
`playwright-core` 1.63.0. Todos os resultados abaixo foram obtidos nesta máquina, contra o build de produção.

## Comandos executados e resultados

| Comando | Resultado |
| --- | --- |
| `npm test` | **22/22 ok** — conteúdo, HTML gerado, ARIA, âncoras, SEO e design system |
| `npm run build` | ok — HTML 10,8 kB gz, CSS 7,4 kB gz, JS 3,7 kB gz, fontes 52,5 kB |
| `npm run check` | ok — 6 assets locais, 68 ids, metadados presentes |
| `npm run check:links` | ok — GitHub (perfil e 2 repositórios) 200; LinkedIn 999 (bloqueio anti-robô, conhecido; conferir manualmente) |
| `npm run test:e2e` | **15/15 ok** no Chrome |
| Lighthouse 12.8.2 local, mobile (`vite preview`) | Performance 100 · Acessibilidade 100 · Boas práticas 100 · SEO 100 · LCP 1,4 s · CLS 0 · TBT 0 ms |
| Lighthouse 12.8.2 local, desktop | 100 · 100 · 100 · 100 · LCP 0,3 s · CLS 0 · TBT 0 ms |
| `npm run dev` | servidor sobe e entrega o HTML pré-renderizado (HTTP 200) |

Lighthouse foi medido em `localhost`, não em produção: valores de campo (CrUX) e da rede do GitHub Pages podem
diferir. A primeira rodada deu Acessibilidade 97 (contraste da faixa de skills e nome acessível do “LF”) e um
reflow forçado no `reveal.js`; os três pontos foram corrigidos e a medição repetida.

## O que os testes automatizados cobrem

Testes de conteúdo (`tests/content.test.js`):
- Todo cargo, período, resumo, realização e tag; toda formação, certificação, prêmio, competência (com origem),
  etapa da jornada, parágrafo do “Sobre”, item do `profile.yml`, projeto (resumo, características, tecnologias,
  repositório) e o estudo de caso inteiro aparecem no HTML.
- Âncoras antigas preservadas (`#topo #conteudo #sobre #experiencia #skills #projetos #destaque #jornada #formacao #contato`).
- `href="#…"`, `aria-labelledby` e `aria-controls` apontam para ids existentes; ids únicos; um `h1`.
- Um cargo aberto por padrão; uma aba selecionada por lista; `aria-expanded` sempre `true|false`.
- Links externos com `rel="noopener noreferrer"` e aviso “(abre em nova aba)”.
- Sem `undefined`, placeholder, “screenshot” ou `TODO` no HTML.
- Nenhum hex fora de `tokens.css`; nenhuma cor saturada em todo o CSS; contraste ≥ 4,5:1 de todos os tokens de
  texto pequeno sobre `--bg` e `--surface`; presença de reduced motion, fallback de vidro, reduced transparency e
  `:focus-visible`.

Testes E2E (`tests/e2e/site.e2e.js`), no Chrome:

| Área | Verificado |
| --- | --- |
| Layout | Sem erros de console nem exceções; sem overflow horizontal em 320, 375, 768, 1024 e 1440 px (página percorrida inteira em cada largura) |
| Teclado | Skip link é o primeiro foco e leva a `#conteudo` |
| 01 Hero | `h1` = “Luiz Felipe”; ≥ 10 letras com animação de entrada; dock `position: fixed` com `backdrop-filter: blur`; “Ver projetos” leva a `#projetos` e o dock marca “Projetos” com `aria-current`; luz do fundo segue o mouse; anel com `pointer-events: none`; cursor nativo ≠ `none`; título cabe em 320 px |
| 02 Projetos | Hover aplica `rotateX/rotateY` e `--mx` ao card e remove ao sair; foco por teclado muda a borda do card; links reais dos repositórios; “Ver estudo de caso” leva a `#destaque`; etapas do pipeline acendem; abas por clique, `ArrowRight`, `End` e hover mostram o painel certo |
| 03 Skills/trajetória | Todas as competências no texto da seção; faixa se move; card de skill com tilt; acordeão por clique, Enter e Espaço com `aria-expanded` e um aberto por vez; jornada vai da 1ª à última etapa só com scroll (`--fill` = 1), aceita clique e `ArrowLeft` |
| 04 Contato | Um `mailto:` com o e-mail real; botão “Copiar” recebe deslocamento magnético sem mover a linha clicável (mesmo `boundingBox`, e o ponto sob o ponteiro continua sendo o `mailto:`); copia o e-mail real para a área de transferência, mostra “Copiado” e anuncia; LinkedIn e GitHub presentes; “Voltar ao topo” leva a `#topo` |
| Movimento reduzido | Sem `has-cursor` e sem `reveal-ready`; hover não aplica tilt; faixa parada; pipeline estático com as 6 etapas acesas; letras do nome com opacidade 1 |
| Toque (375 px, `hasTouch`, `isMobile`) | Sem efeitos de cursor; toque abre cargo e troca aba; toque no dock leva a `#contato` e marca o link ativo |
| Sem JavaScript | Cargos, painéis de implementação e da jornada visíveis; conteúdo com opacidade 1 |

Capturas geradas pelos testes (pasta `test-results/`, ignorada pelo Git): `01-hero-1440.png`, `01-hero-320.png`,
`02-projetos-hover.png`, `02-estudo-de-caso.png`, `03-skills.png`, `03-jornada.png`, `04-contato.png`,
`mobile-375-contato.png`.

## Inspeção visual comparada ao design

O design (`files/Site/Portfolio.dc.html`) e o site foram renderizados no mesmo Chrome em página inteira a 1440,
375 e 320 px e comparados seção por seção. Diferenças encontradas e corrigidas na primeira comparação: recuo do
cabeçalho de Skills (`box-sizing`) e altura das linhas de cargo (margem de `h4`). Diferenças mantidas de propósito
estão em [IMPLEMENTACAO_REDESIGN.md](IMPLEMENTACAO_REDESIGN.md#desvios-conscientes-em-relação-ao-design).

## Checklist dos critérios globais

- [x] As 4 áreas foram implementadas com comportamento real (hover, clique, scroll, teclado e toque testados).
- [x] Identidade mono/glass do início ao fim (teste de saturação de cor + inspeção visual).
- [x] Projetos, links e dados profissionais preservados; alterações justificadas na auditoria (seção GitHub ao vivo removida; GitHub segue linkado).
- [x] Navegação desktop e mobile (dock com rolagem horizontal).
- [x] Mouse, teclado, toque e `prefers-reduced-motion` com comportamento próprio.
- [x] Sem erros de console, links mortos introduzidos ou overflow horizontal (nas larguras testadas).
- [x] Testes e build executados, resultados acima.
- [x] GitHub Pages: `base: '/'` mantido, workflow inalterado, sem rotas de SPA; nenhum push ou deploy feito.
- [x] Documentação entregue.

## Não validado (limitações do ambiente)

- Safari/iOS e Firefox: só Chrome foi automatizado. `backdrop-filter` tem prefixo `-webkit-` e há fallback sólido, mas não foi visto em Safari real.
- Aparelhos físicos: toque foi emulado no Chrome, não testado em celular real.
- Leitores de tela (NVDA, VoiceOver): não testados; a estrutura ARIA foi verificada por testes e pelo Lighthouse.
- Lighthouse e Core Web Vitals em produção: só local; medir após o deploy em `https://luiizfellipee.github.io`.
- `prefers-reduced-transparency`: regra presente, mas o Chrome headless não emula essa preferência.

## Roteiro de inspeção manual (pós-deploy)

1. Desktop: mover o mouse no hero (luz e anel), passar sobre letras do nome, linha `//` e cartão `profile.yml`.
2. Rolar até o fim: barra de progresso, dock marcando cada seção, reveals uma única vez.
3. Projetos: hover nos cards (tilt/glow), Tab até “Código no GitHub” (borda do card), “Ver estudo de caso”.
4. Estudo de caso: pacote percorrendo o pipeline; abas com mouse, Tab + setas.
5. Experiência: abrir/fechar cargos com mouse e Enter/Espaço; o botão clicado não “salta”.
6. Jornada: rolar devagar e ver a trilha avançar; clicar numa etapa.
7. Contato: “Copiar” (aparece “Copiado ✓”), clicar no e-mail (abre o cliente de e-mail), LinkedIn e GitHub.
8. Celular: dock rolando na horizontal, cargos e abas por toque, sem rolagem lateral da página.
9. Sistema com “reduzir movimento” ligado: nada se move sozinho e todo o conteúdo aparece.
