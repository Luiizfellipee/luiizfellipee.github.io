# PORTFOLIO REDESIGN — Luiz Felipe

> Documento de especificação e execução para reformular o portfólio existente em `https://luiizfellipee.github.io`.
> **Obrigatório**: preservar informações profissionais e projetos existentes; transformar profundamente a apresentação visual e a experiência. A implementação deve ocorrer no repositório local aberto no editor, não em um projeto paralelo.

## 0. Objetivo e princípios inegociáveis

Construir um portfólio autoral, minimalista, interativo, responsivo e profissional, direcionado à transição de carreira para a área de Dados (Análise de Dados / Ciência de Dados / Machine Learning), preservando a experiência em QA e automação como diferencial.

- Identidade **monocromática**: preto, grafite, cinza, branco e superfícies translúcidas. Não usar roxo/azul ou gradientes multicoloridos como padrão.
- **Motion design significativo**: animação ajuda a compreender hierarquia, navegação, feedback e narrativa. Não transformar a página em uma demonstração desconexa de efeitos.
- **As quatro experiências exigidas** devem existir e funcionar: (1) Hero cinematográfico; (2) Projetos interativos; (3) Skills e trajetória; (4) Contato marcante.
- Não remover experiências, projetos, currículo, links válidos, dados de contato ou informações profissionais sem análise e justificativa. Não inventar formação, resultados numéricos, cargos, datas ou competências.
- Priorizar acabamento visual, legibilidade, acessibilidade, performance e estabilidade em telas pequenas.
- **Auditar o código antes de decidir o stack**: reutilizar o que está funcionando. Se o projeto atual for Vite vanilla, não migrar para React automaticamente. Só migrar se houver ganho evidente, estimativa de esforço e validação da build/Pages; documentar a decisão.
- Não alterar segredos, tokens, configurações sensíveis ou histórico do Git. Não fazer commits nem push sem autorização explícita.

## 1. Diagnóstico obrigatório do repositório

Antes de codificar:
1. Ler `README`, `package.json`, estrutura `src/`, estilos, scripts, componentes, arquivos públicos, assets e configuração de deploy.
2. Mapear seções e conteúdo exibido hoje; registrar projeto por projeto, links, experiências, skills, currículo, contato e metadados.
3. Inspecionar dependências e decidir quais manter, substituir ou acrescentar, justificando impacto no bundle.
4. Verificar rotas, links internos, acessibilidade, responsive, erros no console e fluxo de publicação no GitHub Pages.
5. Criar `docs/AUDITORIA_PORTFOLIO.md` com inventário e decisões; identificar itens **Preservar / Melhorar / Refazer / Remover com justificativa**.
6. Verificar se o projeto tem testes; caso não tenha, criar pelo menos testes de fumaça viáveis e um roteiro de inspeção manual.

## 2. Design system — MONO / GLASS

### Paleta-base

| Token | Cor / valor | Uso |
|---|---|---|
| `--bg` | `#08090B` | Plano de fundo principal |
| `--surface` | `#121418` | Cards sólidos e fallback |
| `--surface-raised` | `#191B20` | Elevação de interface |
| `--border` | `rgba(255,255,255,.12)` | Contornos e divisores |
| `--border-hover` | `rgba(255,255,255,.30)` | Hover e foco visual |
| `--text` | `#F5F5F7` | Tipografia principal |
| `--text-muted` | `#A6A8AF` | Descrições |
| `--text-subtle` | `#777B83` | Metadados |
| `--glass` | `rgba(22,24,29,.55)` | Dock, navegação e cards selecionados |
| `--glass-highlight` | `rgba(255,255,255,.06)` | Luz sutil |

Usar tokens CSS, não hexadecimais espalhados. Vidro requer `backdrop-filter: blur(14px)` aproximadamente, camada semitransparente e borda fina. Oferecer fallback sólido para browsers sem suporte. Evitar brilho excessivo e baixa legibilidade.

### Linguagem visual

- Layout editorial com espaçamento generoso, grid alinhado e tipografia grande no hero.
- Tipografia limpa: Inter, Geist ou system sans (avaliar licença, carregamento, performance). Pesos reduzidos, tracking sutil.
- Cards com raio consistente (por exemplo 18–24px); controles com raio proporcional.
- Limite de largura para leitura de texto e limites separados para seções visuais largas.
- Ícones finos de mesma família; preferir SVGs leves; imagens e thumbnails reais de projetos existentes quando disponíveis.
- Detalhes visuais discretos: grão muito sutil opcional, gradiente radial cinza e linha horizontal hairline; nada que afete contraste.
- Estados claros para hover, keyboard focus, selected, loading, empty e error.

## 3. Arquitetura narrativa e conteúdo

Ordem proposta:
1. Navegação flutuante transparente (links âncora: Início, Projetos, Sobre/Trajetória, Skills, Contato; manter outras seções existentes se relevantes).
2. **Hero cinematográfico**.
3. Prova rápida de trabalho / destaques (sem estatísticas inventadas).
4. **Projetos interativos** como área principal.
5. Sobre / experiência e **Skills e trajetória** integradas de maneira acessível.
6. Formação, certificações e outros conteúdos existentes organizados sem perda.
7. **Contato marcante** e rodapé.

O foco editorial deve ser Data Analytics / Data Science / ML, com QA, SQL e automação como história real e diferencial. Evitar afirmar que o usuário já é Machine Learning Engineer ou cientista de dados empregado, se o conteúdo não comprovar.

## 4. Requisito obrigatório 01 — Hero cinematográfico

### Aspecto visual
- Fundo quase preto; composição tipográfica autoral, nome em escala grande e quebrado de forma harmônica no mobile.
- Linha de contexto profissional e frase curta de posicionamento voltada a dados, com conteúdo fidedigno.
- Barra de navegação tipo dock, flutuante e translúcida com borda hairline, indicação de seção ativa.
- CTAs diretos: **Ver projetos** e **Entrar em contato**, sem botões falsos.
- Elemento de luz cinza/silver que reage à posição do cursor no desktop (subtilíssimo, contido e com custo baixo); nenhum bloqueio dos clicks.

### Movimento
- Entrada escalonada do nome e subtítulo com opacidade e translação (aprox. 400–800ms), easing suave.
- Navbar surge após os principais elementos, sem CLS.
- Scroll indicator discreto opcional.
- Respeitar `prefers-reduced-motion` e desativar cursor-follow no touch/mobile.
- Evitar cursor customizado que esconda o ponteiro nativo ou torne a navegação confusa.

### Aceite
- Hero é legível em 320px e 1440px sem overflow horizontal.
- CTAs navegam para âncoras reais; navbar indica a seção corrente.
- Animação inicial não bloqueia links, leitura, foco ou interação; conteúdo continua visível sem JavaScript quando a arquitetura permitir.

## 5. Requisito obrigatório 02 — Projetos interativos

### Layout
- Criar **Bento Grid responsivo** com variação intencional de tamanho: projeto principal em destaque; outros em cards menores.
- Cada projeto preserva: título, descrição, tecnologias, contexto, papel do autor, link de código/demonstração e resultados apenas quando verificáveis.
- Usar imagens reais capturadas dos próprios projetos, mockups próprios ou ilustrações abstratas discretas; não inventar screenshots de funcionalidades inexistentes.
- Estudo de caso relevante existente deve continuar acessível integralmente.

### Interações
- No desktop: efeito `tilt` moderado (aprox. 2–5°), glow monocromático ligado ao cursor e borda luminosa discreta.
- Ao focar pelo teclado: equivalente visual do hover, sem depender de movimento do mouse.
- Hover/foco revela informações adicionais sem ocultar dados indispensáveis.
- Possível expansão por modal acessível ou página própria de detalhe. Se modal: foco controlado, tecla Esc, fechar claramente, retorno de foco.
- Animações limitadas a `transform` e `opacity` quando possível.

### Aceite
- Todos os projetos existentes aparecem ou possuem rota acessível; nenhum link vira placeholder.
- Grid funciona em desktop, tablet e mobile; no touch, interação principal é por toque, não hover.
- `prefers-reduced-motion` reduz tilt e efeitos sem remover informação.

## 6. Requisito obrigatório 03 — Skills e trajetória

### Skills
- Organizar competências por grupos verificáveis: **Dados e SQL**, **Python e análise**, **Machine Learning (em estudo, quando aplicável)**, **QA/Automação**, **Ferramentas e engenharia**.
- Usar chips/cards selecionáveis ou áreas expansíveis com descrições curtas; nenhuma competência falsa ou porcentagem arbitrária de proficiência.
- Feedback elegante em hover/foco; conteúdo completo acessível por teclado.

### Trajetória
- Criar timeline profissional e acadêmica que avança visualmente durante o scroll.
- Manter datas, cargos, formações e experiências como constam das fontes do repositório; pedir confirmação em texto TODO quando algo estiver ambíguo, em vez de inventar.
- Cards de timeline expansíveis para detalhes e realizações existentes.
- Mobile: timeline vertical simples e legível; evitar animação invasiva.

### Aceite
- Habilidades e experiências existentes permanecem encontráveis; timeline mostra progressão real.
- Expansão opera via click/Enter/Espaço, com `aria-expanded` e sem comportamento dependente de hover.

## 7. Requisito obrigatório 04 — Contato marcante

- Bloco final com título grande, curto e humano, por exemplo “Vamos construir algo relevante?” (adaptar à voz do usuário).
- Link `mailto:` real, com endereço extraído do repositório; copiar e-mail opcional com feedback claro.
- Botão/link principal com microinteração **magnética moderada**, mantendo alvo clicável fixo e foco visível.
- GitHub, LinkedIn e outros contatos do portfólio atual preservados, checados e com labels acessíveis.
- Rodapé conciso, marca pessoal consistente e opção de voltar ao topo.
- Nenhuma informação de contato inventada; caso não esteja disponível, manter um placeholder TODO claramente identificado no código e não publicar placeholder na UI.

## 8. Biblioteca de animações e regras de uso

**Stack preferencial condicionado à auditoria:**
- Base existente do projeto e Vite; CSS custom properties e utilitários atuais.
- Motion (`motion/react`) para microinterações caso React já exista ou migração seja aprovada pelo diagnóstico.
- GSAP + ScrollTrigger para timeline e sequências de scroll se houver necessidade real.
- CSS native transitions/animations e IntersectionObserver para efeitos simples em projeto vanilla.
- React Bits: **referência/inspiração e uso seletivo somente se a base for React**; verificar dependências/licenças e adaptar ao design system.
- Three.js NÃO é obrigatório; evitar uso pesado que não traga valor evidente.

| Evento | Resposta esperada | Limites |
|---|---|---|
| Load inicial | Nome, contexto e CTAs entram em sequência | Não atrasar usabilidade |
| Hover em card | Leve elevação/tilt + glow | Sem flicker, sem perder informação |
| Scroll em seção | Reveal suave de conteúdo | Acionar uma vez ou coerentemente |
| Scroll na timeline | Linha/progresso animado | Fallback estático |
| Hover em CTA | Magnetic hover discreto | Nunca deslocar área clicável para longe |
| Menu mobile | Abrir/fechar com transição curta | Trava/foco/escape quando aplicável |
| Mudança de rota | Transição curta | Sem flash ou perda de scroll indevida |

Não duplicar Motion/GSAP em um mesmo elemento sem motivo. Sempre limpar listeners, ScrollTrigger instances e observers. Otimizar com `requestAnimationFrame` quando necessário e limitar cálculos em `mousemove`. Desativar efeitos reativos ao cursor em dispositivos touch e movimento reduzido.

## 9. Responsividade, acessibilidade e performance

- Breakpoints definidos pelo conteúdo e não por aparelhos específicos. Testar pelo menos 320px, 375px, 768px, 1024px e 1440px.
- `prefers-reduced-motion`, `:focus-visible`, navegação completa por teclado, labels acessíveis e contrastes adequados (WCAG AA como meta).
- Sem hover-only, sem scroll hijacking, sem autoplay sonoro, sem scroll horizontal involuntário.
- Considerar `prefers-reduced-transparency` quando viável, fallback para `backdrop-filter` e suporte a navegadores atuais.
- Otimizar imagens (WebP/AVIF quando vantajoso), lazy load abaixo da dobra, dimensões explícitas, preload só do essencial, evitar fontes pesadas.
- Lighthouse alvo indicativo em produção: Performance >= 90, Accessibility >= 90, Best Practices >= 90, SEO >= 90, sem maquiar relatórios. Registrar limitações de ambiente.
- Alvos Core Web Vitals como referência: LCP <= 2.5s, CLS <= 0.1, INP <= 200ms em condições de campo; não prometer métricas sem medição.
- Elementos animados não devem alterar layout desnecessariamente; suportar dark UI consistentemente.

## 10. Publicação no GitHub Pages

1. Verificar nome do repositório, host de publicação e `base` do Vite. Para repositório usuário `luiizfellipee.github.io`, normalmente a base é `/`; se for project pages, ajustar caminho conforme repositório.
2. Garantir que imports de assets, rotas e refresh de páginas funcionem em Pages. Em SPA com history routing, tratar fallback (ou usar rotas compatíveis com Pages).
3. Validar `npm install`/`npm ci` conforme lockfile, lint, testes e `npm run build`.
4. Inspecionar configuração atual e preservar o deploy que funciona; se necessário, implementar workflow GitHub Actions com permissões mínimas.
5. Não incluir segredo/credencial em bundle. Não alterar domínio público, configurações de DNS ou workflows de produção sem necessidade.
6. Não executar `git push`, deploy real ou alterações remotas sem autorização explícita.

## 11. Entregáveis técnicos obrigatórios

- Código implementado **no repositório existente** e arquitetura/documentação de componentes conforme stack identificado.
- `docs/AUDITORIA_PORTFOLIO.md`: inventário inicial e decisões arquiteturais.
- `docs/IMPLEMENTACAO_REDESIGN.md`: lista objetiva de implementações, arquivos editados, biblioteca/versões, limitações e decisões.
- `docs/VALIDACAO_REDESIGN.md`: checklist com testes executados, seus resultados reais, inspeção mobile/desktop e pendências.
- README atualizado com instalação, execução, build e procedimento de publicação.
- Revisão de acessibilidade, SEO, links e performance.

## 12. Sequência de implementação — executar integralmente

1. **Auditar** — inspecionar estrutura, preservar informações e criar inventário.
2. **Fundação** — tokens, tipografia, grid, componentes reutilizáveis e estilos base.
3. **Hero** — seção 01 com navbar glass, entradas, foco e responsividade.
4. **Projetos** — seção 02 com bento, imagens reais, tilt, glow e detalhes.
5. **Skills + trajetória** — seção 03 com agrupamentos, expansão acessível e timeline animada.
6. **Contato** — seção 04 com link real, microinterações e rodapé.
7. **Complementos** — seções preservadas, navegação, meta tags, OG e SEO.
8. **QA** — testes, correções, build, inspeção em mobile, acessibilidade e motion reduzido.
9. **Documentar** — auditoria, changelog funcional, validação, README e instruções de deploy.

Se houver impedimento (dependência indisponível, teste não executável, falta de assets), implementar alternativa segura, registrar o que foi realmente concluído e listar pendências sem criar falsa impressão de conclusão.

## 13. Critérios globais de aceite

- [ ] As **4 áreas obrigatórias** foram implementadas e não são apenas mockups.
- [ ] Identidade mono/glass consistente do início ao fim.
- [ ] Todos os projetos, links e dados profissionais existentes foram preservados ou tiveram alteração justificada.
- [ ] Navegação desktop e mobile funciona integralmente.
- [ ] Mouse, teclado, toque e `prefers-reduced-motion` possuem experiências corretas.
- [ ] Não há console errors críticos, links mortos introduzidos ou overflow horizontal.
- [ ] Testes e build executados com resultados informados sem inventar evidências.
- [ ] GitHub Pages configurado ou compatibilidade verificada; sem push não autorizado.
- [ ] Documentação e roteiro de validação entregues.

## 14. Referência visual enviada pelo usuário

A referência mostra exatamente quatro conceitos centrais: **(01) Hero cinematográfico**, **(02) Projetos interativos**, **(03) Skills e trajetória**, **(04) Contato marcante**. Tratar estes quatro itens como escopo fechado e obrigatório, não como sugestões opcionais. A imagem é uma referência conceitual; construir uma interface original, sem replicar o layout das miniaturas literalmente.
