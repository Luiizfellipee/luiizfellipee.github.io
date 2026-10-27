// Fonte: repositórios públicos em github.com/Luiizfellipee (código e README analisados).
// Não descrever funcionalidades que não existam no repositório: o que ainda é plano
// fica marcado como planejado (`implemented` = quantas etapas do pipeline já existem).

export const projects = [
  {
    id: 'BH-traffic-intelligence',
    name: 'BH Traffic Intelligence',
    repo: 'https://github.com/Luiizfellipee/BH-traffic-intelligence',
    kind: 'Projeto de dados · em andamento',
    summary:
      'Base documentada para analisar os sinistros de trânsito com vítimas em Belo Horizonte a partir das quatro coleções anuais da BHTRANS, com período, universo e limitações explícitos.',
    features: [
      'Inventário pela API CKAN da PBH: 4 coleções (ocorrências, pessoas, veículos e logradouros) e 64 recursos, rotulados de 2011 a 2024.',
      'Disponibilidade testada recurso a recurso no DataStore, com as falhas registradas em vez de presumidas.',
      'Arquitetura com restrições contra dupla contagem e contra misturar séries de fontes diferentes sem auditoria.',
    ],
    tech: ['Python 3.12', 'API CKAN', 'Dados abertos PBH', 'pytest', 'Ruff'],
    problem:
      'Os dados da BHTRANS estão divididos em quatro coleções anuais, com formatos e disponibilidade irregulares. Contar linhas de pessoas ou veículos como se fossem ocorrências, ou tratar a data de atualização do catálogo como data do sinistro, distorce qualquer análise.',
    solution:
      'Documentar as fontes antes de construir comparações: inventariar o catálogo, verificar cada recurso e desenhar um fluxo auditável, que preserve os dados brutos e valide chaves antes de combinar as coleções.',
    pipeline: ['Catálogo CKAN', 'Inventário', 'Ingestão auditável', 'Profiling', 'Banco e SQL', 'Análise e BI'],
    implemented: 2,
    stack: ['Python 3.12', 'API CKAN', 'DataStore', 'pytest', 'Ruff', 'uv', 'PostgreSQL (planejado)', 'SQL (planejado)'],
    implementation: [
      ['Inventário CKAN', 'Consultas somente leitura a package_search, resource_show e datastore_search: 4 conjuntos e 64 recursos registrados com formato, licença (ODbL) e data de atualização.'],
      ['Disponibilidade real', '63 recursos testados no DataStore: 62 responderam com sucesso e um retornou HTTP 404, coerente com o catálogo, que o marca como inativo. Cada falha fica documentada.'],
      ['Arquitetura', 'Fluxo do catálogo à visualização com o estado de cada etapa explícito, separando o que está implementado do que ainda depende de validação.'],
      ['Restrições', 'Dados brutos preservados e fora do Git; nenhum esquema ou chave inferido antes da inspeção; datas do catálogo não tratadas como datas dos fatos.'],
      ['Próximas etapas', 'Ingestão com manifesto e SHA-256, profiling por ano, modelo em PostgreSQL com granularidade explícita e um dashboard conferido contra SQL.'],
    ],
    outcomes: [
      'Rigor com a fonte: período, universo e limitações definidos antes de qualquer número.',
      'Rastreabilidade: cada verificação registrada com comando, resultado e evidência.',
      'Prevenção de dupla contagem entre ocorrências, pessoas e veículos.',
    ],
    note: 'Em andamento: o inventário das fontes está documentado; ingestão, análises e dashboard ainda não foram implementados.',
  },
  {
    id: 'ES-fuel-intelligence',
    name: 'ES Fuel Intelligence',
    repo: 'https://github.com/Luiizfellipee/ES-fuel-intelligence',
    kind: 'Projeto de dados · em andamento',
    summary:
      'Análise dos preços de combustíveis no Espírito Santo com a série histórica da ANP: como os preços pesquisados variam entre produtos, municípios, postos e períodos, sempre com o tamanho da amostra.',
    features: [
      'Notebook em pandas que lê o CSV da ANP, preserva o original e gera o recorte do Espírito Santo.',
      'Consultas em DuckDB com média, mediana, mínimo, máximo, observações e postos distintos por produto.',
      'PostgreSQL em Docker Compose com schemas raw, staging e analytics, e API FastAPI com OpenAPI.',
    ],
    tech: ['Python', 'pandas', 'DuckDB', 'PostgreSQL', 'Docker Compose', 'FastAPI'],
    problem:
      'Uma diferença de preço entre municípios pode ser só uma diferença na quantidade de postos pesquisados. Sem a data da coleta e o tamanho da amostra, a comparação engana. A base também não traz o valor de compra, o que impede calcular a margem dos postos.',
    solution:
      'Transformar os registros de coleta da ANP em comparações reproduzíveis, que informam produto, período, número de observações e postos distintos. O recorte principal é a gasolina comum no Espírito Santo.',
    pipeline: ['CSV da ANP', 'pandas', 'Recorte ES', 'DuckDB', 'PostgreSQL', 'Power BI'],
    implemented: 4,
    stack: ['Python 3.14', 'pandas', 'Jupyter', 'DuckDB', 'PostgreSQL 18', 'Docker Compose', 'FastAPI', 'uv'],
    implementation: [
      ['Exploração', 'O notebook lê o CSV semestral da ANP (1º semestre de 2026), examina os campos e exporta o recorte do Espírito Santo, sem alterar a cópia original.'],
      ['Consultas SQL', 'Três consultas em DuckDB: registros por produto e município; média, mediana, mínimo e máximo por produto; mediana, observações e postos distintos.'],
      ['Infraestrutura', 'Docker Compose com PostgreSQL 18 e healthcheck, volume persistente e schemas raw, staging e analytics criados na inicialização. Segredos ficam fora do Git.'],
      ['API', 'Serviço FastAPI conteinerizado com rota de saúde e documentação OpenAPI automática, base para as futuras consultas de leitura de preços.'],
      ['Próximas etapas', 'Ingestão com registro de lotes, modelo dimensional (data, município, posto e produto), relatório no Power BI e previsão comparada a uma baseline.'],
    ],
    outcomes: [
      'Comparações acompanhadas de período e tamanho da amostra.',
      'Mediana ao lado da média, para reduzir o peso de valores extremos.',
      'Leitura responsável: preço atípico é sinal para investigar, não evidência de irregularidade.',
    ],
    note: 'Em andamento: o fluxo reproduzível hoje é o notebook com as consultas em DuckDB; banco analítico, Power BI e previsão estão planejados.',
  },
  {
    id: 'jenkins-ci-case-study',
    name: 'Esteira de CI para testes E2E',
    repo: 'https://github.com/Luiizfellipee/jenkins-ci-case-study',
    kind: 'Estudo de caso profissional',
    summary:
      'Esteira no Jenkins que roda os testes E2E afetados por cada push, compara o resultado com a versão oficial e só cobra do dev a falha que ele introduziu, com veredito direto no Slack.',
    features: [
      'Seleção dos testes Cypress por mapa de impacto; a suíte completa fica para o job noturno.',
      'Linha de base na versão oficial: falha que já existia vira aviso ao QA, não reprovação do dev.',
      '8 jobs, 74 testes nos scripts da esteira e cerca de 14 minutos do push à mensagem no Slack.',
    ],
    tech: ['Jenkins', 'Groovy', 'Docker', 'Cypress', 'Node.js', 'Slack API'],
    problem:
      'Os testes E2E existiam, mas rodavam à mão: o bug de um dev só aparecia depois que a versão subia para o QA. Quando um teste falhava, ninguém sabia se a culpa era do commit novo ou de algo já quebrado na versão oficial. E o time só tinha um notebook como servidor.',
    solution:
      'A cada push numa branch de tarefa, a esteira roda o teste unitário, gera a imagem Docker do commit, sobe a stack completa isolada e executa só os testes afetados. Se algo falha, compara com a versão oficial e manda o veredito no Slack.',
    pipeline: ['Push na branch', 'Teste unitário', 'Imagem Docker', 'Stack isolada', 'Cypress', 'Veredito no Slack'],
    stack: ['Jenkins', 'Groovy', 'Docker Compose', 'Cypress', 'Node.js', 'node:test', 'WSL2', 'Slack API', 'PowerShell'],
    implementation: [
      ['Linha de base', 'Quando um teste falha, os mesmos testes rodam na versão oficial. Falha herdada vai como aviso ao QA; só a regressão nova reprova o commit. O resultado oficial fica em cache até a versão ou os testes mudarem.'],
      ['Três cores', 'Verde: a tarefa pode avançar. Vermelho: o commit quebrou algo. Amarelo: erro de ambiente, que nunca reprova um dev.'],
      ['Mapa de impacto', 'Uma tarefa que mexe num módulo roda os testes daquele módulo. O teste unitário vem antes do E2E, para a falha barata aparecer primeiro.'],
      ['Vigias', 'Jobs agendados consultam o Git em vez de webhooks, porque o servidor fica numa rede interna. Um vigia de saúde avisa quando o agente cai ou o disco passa de 80%.'],
      ['Incidente', 'Um crash do Cypress no WSL gerou um dump de 133 GB e parou a CI. O disco virtual foi recuperado, os core dumps desligados e a esteira passou a limpar o que acumula: de 72 GB para 256 GB livres.'],
    ],
    outcomes: [
      'Regressão apontada no próprio push, para o dev que a introduziu, antes de chegar ao QA.',
      'Confiança no vermelho: falha de ambiente ou herdada não reprova ninguém.',
      '44 commits em 11 dias, do primeiro build ao rollout em piloto.',
    ],
    note: 'O código e os dados pertencem à empresa; o repositório reúne o estudo de caso e as evidências.',
  },
];
