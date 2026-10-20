// Cada competência indica onde foi aplicada ou comprovada (`source`).
// WebLider = experiência profissional; nome de repositório = projeto público;
// instituição/certificação = formação. Sem fonte = competência declarada no LinkedIn.

export const skillGroups = [
  {
    title: 'QA & Automação de Testes',
    skills: [
      ['Garantia de qualidade', 'WebLider'],
      ['Testes E2E com Cypress', 'WebLider'],
      ['Testes de regressão', 'WebLider'],
      ['Critérios de aceite', 'WebLider'],
      ['Análise de causa raiz', 'WebLider'],
      ['Testes unitários com pytest', 'auto_vagas'],
    ],
  },
  {
    title: 'Dados & Data Quality',
    skills: [
      ['SQL · PostgreSQL', 'WebLider'],
      ['Auditoria e validação de dados', 'WebLider'],
      ['Validação de integrações', 'WebLider'],
      ['Modelagem dimensional (DW)', 'acidentes_bh'],
      ['ETL com Python', 'acidentes_bh'],
      ['SQL · MySQL', 'certificação'],
    ],
  },
  {
    title: 'Programação & Análise',
    skills: [
      ['Python', 'FIAP · projetos'],
      ['Pandas · NumPy', 'acidentes_bh'],
      ['Estatística com Python', 'certificação'],
      ['Jupyter Notebook', 'acidentes_bh'],
      ['Metabase', 'acidentes_bh'],
      ['Tableau · Power BI', null],
    ],
  },
  {
    title: 'IA Aplicada & Machine Learning',
    skills: [
      ['Contexto, schemas e regras de negócio para agentes de IA', 'WebLider'],
      ['Agente de IA integrado ao Jira via API', 'WebLider'],
      ['Machine Learning', 'PUC Minas · em curso'],
      ['IA, ML e Deep Learning', 'certificação'],
    ],
  },
  {
    title: 'Ferramentas & DevOps',
    skills: [
      ['Git · Sourcetree', 'WebLider'],
      ['Docker · Docker Compose', 'acidentes_bh'],
      ['GitHub Actions', 'auto_vagas'],
      ['Jira · Trello', 'WebLider'],
      ['Notion', 'WebLider'],
    ],
  },
  {
    title: 'Processos & Colaboração',
    skills: [
      ['Scrum e metodologias ágeis', 'WebLider'],
      ['Documentação técnica', 'WebLider'],
      ['Mentoria e boas práticas', 'WebLider'],
      ['Treinamentos técnicos', 'WebLider'],
    ],
  },
];

// Faixa em movimento da seção de skills (decorativa). Só itens que já constam acima.
export const highlights = [
  'Cypress',
  'PostgreSQL',
  'Python',
  'Pandas',
  'Docker',
  'GitHub Actions',
  'Metabase',
  'pytest',
  'Jira',
  'Git',
  'Machine Learning',
  'Data Quality',
];
