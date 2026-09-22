// Enriquece a lista estática de repositórios com dados públicos da API do GitHub.
// Sem token; resultado em cache na sessão. Em caso de falha, o HTML estático permanece.

const CACHE_KEY = 'gh-repos-v1';
const CACHE_TTL = 60 * 60 * 1000;

const readCache = () => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.time < CACHE_TTL) return cached.repos;
  } catch {
    /* storage indisponível */
  }
  return null;
};

const writeCache = (repos) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), repos }));
  } catch {
    /* storage indisponível */
  }
};

const fetchRepos = async (user) => {
  const cached = readCache();
  if (cached) return cached;
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&type=owner`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const repos = (await response.json()).map(({ name, fork, pushed_at, stargazers_count, language }) => ({
    name,
    fork,
    pushed_at,
    stargazers_count,
    language,
  }));
  writeCache(repos);
  return repos;
};

const relative = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
const timeAgo = (iso) => {
  const days = Math.round((new Date(iso) - Date.now()) / 86_400_000);
  if (Math.abs(days) < 30) return relative.format(days, 'day');
  if (Math.abs(days) < 365) return relative.format(Math.round(days / 30), 'month');
  return relative.format(Math.round(days / 365), 'year');
};

const metaItem = (text) => {
  const span = document.createElement('span');
  span.textContent = text;
  return span;
};

export async function initGithub() {
  const list = document.querySelector('[data-gh-repos]');
  const status = document.querySelector('[data-gh-status]');
  if (!list) return;

  try {
    const repos = await fetchRepos(list.dataset.ghUser);
    const byName = new Map(repos.map((repo) => [repo.name, repo]));

    for (const item of list.querySelectorAll('[data-repo]')) {
      const repo = byName.get(item.dataset.repo);
      const meta = item.querySelector('.repo__meta');
      if (!repo || !meta) continue;
      if (repo.stargazers_count > 0) {
        meta.append(metaItem(`★ ${repo.stargazers_count}`));
      }
      if (repo.pushed_at) meta.append(metaItem(`atualizado ${timeAgo(repo.pushed_at)}`));
    }

    const own = repos.filter((repo) => !repo.fork).length;
    if (status) status.textContent = `${own} repositórios públicos`;
  } catch {
    // Mantém o conteúdo estático gerado no build.
  }
}
