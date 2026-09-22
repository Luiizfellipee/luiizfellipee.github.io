// Fonte: PDF exportado do LinkedIn (Profile.pdf) e perfil público do GitHub.
// Não adicionar informações que não estejam nessas fontes.

export const profile = {
  name: 'Luiz Felipe',
  fullName: 'Luiz Felipe Piumbini',
  role: 'Analista de QA II',
  focus: 'Data Quality & Test Automation',
  company: 'WebLider',
  location: 'Guarapari, ES',
  headline:
    'Valido sistemas e fluxos de dados de ponta a ponta: SQL para auditoria e causa raiz, testes E2E com Cypress e IA aplicada a processos.',
  quote:
    'A confiabilidade dos dados é a base para qualquer tomada de decisão ou modelo preditivo eficiente.',
  about: [
    'Sou Analista de QA II na WebLider. Meu trabalho combina garantia de qualidade e validação de dados: audito fluxos de dados complexos em produção e desenvolvimento, uso SQL (PostgreSQL) para investigar a causa raiz de anomalias e asseguro a integridade entre sistemas.',
    'A isso se somam a automação de testes E2E com Cypress e a aplicação prática de IA em processos, como a estruturação de contexto, schemas de banco e regras de negócio para um agente de IA que gera e publica user stories no Jira via API.',
    'Minha base analítica vem da graduação em Data Science pela FIAP e da pós-graduação em Inteligência Artificial e Aprendizado de Máquina na PUC Minas, em andamento. Hoje aprofundo pipelines conteinerizados e automação de testes de dados, com o objetivo de conectar Qualidade à Engenharia e à Ciência de Dados.',
  ],
  facts: [
    { label: 'WebLider', value: '3 anos e 7 meses' },
    { label: 'Graduação', value: 'Data Science · FIAP' },
    { label: 'Pós-graduação', value: 'IA & ML · PUC Minas', note: 'em andamento' },
  ],
  // Resumo exibido no painel do hero (formato chave/valor).
  snapshot: [
    ['role', 'Analista de QA II · WebLider'],
    ['focus', 'Data Quality · Test Automation'],
    ['stack', 'SQL · Cypress · Python'],
    ['learning', 'IA & Machine Learning · PUC Minas'],
    ['next', 'Dados → Machine Learning → MLOps'],
  ],
  links: {
    github: 'https://github.com/Luiizfellipee',
    githubUser: 'Luiizfellipee',
    linkedin: 'https://www.linkedin.com/in/luiz-felipe-piumbini-366768115',
    email: 'luizfelipepiumbini@gmail.com',
  },
};

export const site = {
  url: 'https://luiizfellipee.github.io/',
  lang: 'pt-BR',
  title: 'Luiz Felipe Piumbini · Analista de QA II | Data Quality & Test Automation',
  description:
    'Portfólio de Luiz Felipe Piumbini, Analista de QA II com foco em Data Quality, automação de testes E2E com Cypress, SQL (PostgreSQL), Python e IA aplicada. Formado em Data Science (FIAP) e pós-graduando em IA e Machine Learning (PUC Minas).',
  ogImage: 'og-image.png',
};
