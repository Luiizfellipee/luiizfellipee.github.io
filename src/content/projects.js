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
      'Monitora diariamente as vagas públicas da Autoglass Tech, filtra as da área de Dados e avisa no Telegram quando algo muda.',
    features: [
      'Coleta da página pública de carreiras, com suporte opcional à API da Gupy.',
      'Filtro com normalização de acentos que ignora termos genéricos como "dados" e "data".',
      'Comparação com o snapshot anterior (vagas novas, alteradas e não encontradas) e histórico em JSONL.',
      'Em caso de falha na coleta, o snapshot anterior é preservado para evitar falsos alertas.',
      'Execução diária no GitHub Actions com secrets e testes automatizados com pytest.',
    ],
    tech: ['Python', 'requests', 'pytest', 'GitHub Actions', 'Telegram Bot API'],
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
