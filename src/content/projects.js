// Fonte: repositórios públicos em github.com/Luiizfellipee (código e README analisados).
// Não descrever funcionalidades que não existam no repositório.

export const featuredProject = {
  id: 'acidentes_bh',
  name: 'Acidentes de Trânsito em BH',
  repo: 'https://github.com/Luiizfellipee/acidentes_bh',
  kind: 'Projeto acadêmico · Pós em IA e ML, PUC Minas',
  summary:
    'Solução completa de Data Analytics sobre os dados abertos de acidentes de trânsito da Prefeitura de Belo Horizonte: tratamento em Python, Data Warehouse em PostgreSQL e dashboards no Metabase, tudo orquestrado com Docker.',
  problem:
    'Os dados abertos da PBH chegam em uma planilha com várias abas, valores nulos, tipos inconsistentes e variações de grafia. Nesse estado, não servem para análise direta nem para um painel confiável.',
  solution:
    'Um pipeline reprodutível, que vai da planilha bruta ao dashboard e trata a qualidade do dado antes da visualização. O ambiente inteiro sobe já configurado, em conceito plug and play.',
  pipeline: ['Planilha PBH', 'Pandas', 'Parquet', 'PostgreSQL', 'Views SQL', 'Metabase'],
  // Modelo dimensional descrito na implementação; desenhado no card do projeto
  // no lugar de uma captura de tela (o repositório não tem imagens do dashboard).
  schema: { fact: 'boletins', dimensions: ['envolvidos', 'veículos', 'logradouros', 'coordenadas'] },
  tech: ['Python', 'Pandas', 'Jupyter', 'Parquet', 'PostgreSQL 15', 'SQLAlchemy', 'Docker Compose', 'Metabase'],
  implementation: [
    ['Tratamento', 'Exploração e limpeza em Jupyter com Pandas: separação das abas, verificação de nulos e tipos. Os dados tratados são salvos em Parquet.'],
    ['Data Warehouse', 'Carga no PostgreSQL com modelagem dimensional: a tabela fato de boletins e as dimensões de envolvidos, veículos, logradouros e coordenadas.'],
    ['Qualidade na camada SQL', 'Views para o BI que padronizam valores ausentes e variações de grafia (como "NAO INFORMADO" → "NÃO INFORMADA") e criam flags analíticas.'],
    ['Orquestração', 'Docker Compose com healthcheck para PostgreSQL, Metabase e um container Python que executa o ETL. Um script de inicialização prepara o ambiente e abre o dashboard.'],
    ['Dashboards', 'Painel estratégico (KPIs, taxa de fatalidade, evolução anual, impacto da embriaguez) e painel analítico (geolocalização, fator humano, cena do acidente).'],
  ],
  outcomes: [
    'Qualidade de dados aplicada antes da visualização, com regras explícitas em SQL.',
    'Reprodutibilidade: o ambiente completo sobe com um único comando.',
    'Modelagem dimensional pensada para consultas analíticas.',
  ],
  note: 'Não há demo online: o dashboard roda localmente via Docker.',
};

export const projects = [
  {
    id: 'auto_vagas',
    name: 'Monitor de vagas de Dados',
    repo: 'https://github.com/Luiizfellipee/auto_vagas',
    kind: 'Projeto pessoal',
    language: 'Python',
    summary:
      'Monitora vagas públicas de Dados nas APIs da Remotive e RemoteOK, com suporte opcional a páginas de carreira na Gupy, e avisa no Discord quando algo muda.',
    features: [
      'Coleta via APIs da Remotive e RemoteOK, com suporte opcional a páginas de carreira na Gupy.',
      'Filtro por cargos de Dados (Analista, Cientista, Engenheiro de Dados, BI, Machine Learning, MLOps, ETL, Analytics, Governança e Arquitetura de Dados).',
      'Comparação com o snapshot anterior (vagas novas, alteradas e não encontradas) e histórico em JSON.',
      'Em caso de falha na coleta, o snapshot anterior é preservado para evitar falsos alertas.',
      'Execução semanal no GitHub Actions (segundas-feiras) com secrets e testes automatizados com pytest.',
    ],
    tech: ['Python', 'requests', 'pytest', 'GitHub Actions', 'Discord Webhook'],
  },
  {
    id: 'acidentes_bh',
    name: 'Acidentes de Trânsito em BH',
    repo: 'https://github.com/Luiizfellipee/acidentes_bh',
    kind: 'Projeto acadêmico',
    language: 'Jupyter Notebook',
    summary:
      'ETL, Data Warehouse dimensional em PostgreSQL e dashboards no Metabase sobre dados abertos da PBH, com ambiente conteinerizado.',
    tech: ['Python', 'PostgreSQL', 'Docker', 'Metabase'],
    caseStudy: '#destaque',
  },
];
