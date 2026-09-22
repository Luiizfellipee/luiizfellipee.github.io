// Fonte: seção "Experiência" do PDF do LinkedIn.
// `detail: 'full'` para as experiências recentes; `compact` recolhe as responsabilidades.

export const experience = [
  {
    company: 'WebLider',
    tenure: '3 anos e 7 meses',
    location: 'Espírito Santo',
    roles: [
      {
        title: 'Analista de QA (Nível II)',
        period: 'mar 2026 — atual',
        detail: 'full',
        items: [
          ['IA aplicada', 'Desenvolvimento e alimentação de um Agente de IA para Engenharia de Requisitos, estruturando schemas de banco de dados, regras de negócio e documentação do sistema para gerar e publicar user stories e tarefas diretamente no Jira via API.'],
          ['Automação de testes', 'Desenvolvimento de suítes de testes E2E para front-end com Cypress, garantindo a regressão contínua e a qualidade de interface das aplicações.'],
          ['Validação de dados', 'Validações técnicas de ponta a ponta em fluxos de dados complexos, assegurando integridade e consistência entre sistemas.'],
          ['Auditoria de banco de dados', 'Consultas SQL (PostgreSQL) para auditoria de informações e validação de integrações em Produção e Desenvolvimento.'],
          ['Causa raiz em produção', 'Diagnóstico de anomalias críticas, atuando com o time de Engenharia na resolução de falhas sistêmicas.'],
          ['Gestão e documentação', 'Controle de ciclos de entrega via Jira e Trello e documentação técnica no Notion focada em reprodutibilidade e critérios de aceite.'],
          ['Versionamento e mentoria', 'Versionamento de artefatos com Git/Sourcetree, apoio na definição de critérios de aceite e disseminação de boas práticas no time.'],
        ],
        tags: ['Cypress', 'SQL · PostgreSQL', 'Agente de IA', 'Jira', 'Notion', 'Git · Sourcetree'],
      },
      {
        title: 'Analista de QA / Qualidade de Dados',
        period: 'set 2024 — atual',
        detail: 'full',
        summary: 'Responsável por garantir a integridade e a confiabilidade dos sistemas e fluxos de dados por meio de validações técnicas e testes de ponta a ponta.',
        items: [
          ['Validação técnica de dados', 'Consultas complexas em bancos de Desenvolvimento e Produção para auditar a consistência das informações e validar integrações.'],
          ['Análise de falhas', 'Diagnóstico de anomalias em produção, sugerindo correções técnicas junto ao time de engenharia.'],
          ['Gestão ágil e documentação', 'Ciclos de entrega via Jira e Trello e documentação técnica no Notion para garantir a reprodutibilidade dos testes.'],
          ['Versionamento e colaboração', 'Controle de versões com Sourcetree (Git) em um ambiente colaborativo focado em melhoria contínua.'],
        ],
        tags: ['SQL', 'Data Quality', 'Jira', 'Trello', 'Notion', 'Sourcetree'],
      },
      {
        title: 'Analista de Suporte Computacional',
        period: 'mar 2023 — set 2024',
        location: 'Guarapari, ES',
        detail: 'compact',
        summary: 'Suporte técnico especializado, com foco na resolução de problemas complexos e na integridade operacional dos sistemas dos clientes.',
        items: [
          ['Diagnóstico de dados', 'Consultas em bancos de dados para identificar falhas técnicas e analisar a causa raiz de anomalias.'],
          ['Monitoramento de integrações', 'Supervisão do fluxo de informações entre sistemas para assegurar a consistência dos dados.'],
          ['Capacitação técnica', 'Elaboração e condução de treinamentos técnicos para usuários.'],
          ['Suporte técnico', 'Instalação, configuração e manutenção de sistemas.'],
        ],
      },
    ],
  },
  {
    company: 'Fracaroli Mármores e Granitos',
    tenure: '5 anos e 9 meses',
    location: 'Guarapari, ES',
    roles: [
      {
        title: 'Vendedor Técnico e Gestor de Processos',
        period: 'jun 2017 — fev 2023',
        detail: 'compact',
        summary: 'Atuação multidisciplinar em atendimento consultivo, gestão de dados comerciais e planejamento técnico de produção.',
        items: [
          ['Planejamento e design técnico', 'Projetos 2D e 3D no AutoCAD, traduzindo especificações técnicas em pedidos de produção.'],
          ['Gestão de dados e CRM', 'Organização do cadastro de clientes e gestão de cobranças, garantindo a integridade das informações comerciais.'],
          ['Produção e prazos', 'Controle do ciclo produtivo e da logística de entrega.'],
          ['Negociação', 'Relacionamento com o cliente do primeiro contato ao pós-venda.'],
        ],
      },
    ],
  },
];
