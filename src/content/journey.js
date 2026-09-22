// Evolução profissional. O status diferencia o que é experiência comprovada,
// o que está em desenvolvimento (projetos/formação) e o que é objetivo.

export const statuses = {
  experience: { label: 'Experiência', description: 'aplicado profissionalmente' },
  developing: { label: 'Em desenvolvimento', description: 'projetos e formação' },
  goal: { label: 'Objetivo', description: 'direção profissional' },
};

export const journey = [
  { stage: 'QA', status: 'experience', note: 'Garantia de qualidade e testes de ponta a ponta na WebLider, desde 2024.' },
  { stage: 'Data Quality', status: 'experience', note: 'Auditoria e validação de fluxos de dados em produção e desenvolvimento.' },
  { stage: 'Test Automation', status: 'experience', note: 'Suítes E2E de front-end com Cypress.' },
  { stage: 'SQL', status: 'experience', note: 'PostgreSQL para auditoria, validação de integrações e causa raiz.' },
  { stage: 'Python', status: 'developing', note: 'Formação em Data Science e projetos públicos de ETL e automação.' },
  { stage: 'IA aplicada', status: 'experience', note: 'Agente de IA para engenharia de requisitos integrado ao Jira via API.' },
  { stage: 'Dados', status: 'developing', note: 'Data Warehouse, ETL e pipelines conteinerizados em projetos.' },
  { stage: 'Machine Learning', status: 'developing', note: 'Pós-graduação em IA e Aprendizado de Máquina na PUC Minas, em andamento.' },
  { stage: 'MLOps', status: 'goal', note: 'Unir o rigor de QA ao ciclo de vida de modelos em produção.' },
];
