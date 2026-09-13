import React, { useState, useEffect } from 'react'
import './GitHubProfileViewer.css'

const LANGUAGE_COLORS = {
  JavaScript: '#E5C890',
  TypeScript: '#8CAAEE',
  Python: '#A6D189',
  Java: '#E78284',
  Dart: '#8CAAEE',
  PHP: '#BABBF1',
  Go: '#8CAAEE',
  Rust: '#E78284',
  Ruby: '#E78284',
  'C++': '#8CAAEE',
  C: '#8CAAEE',
  HTML: '#E78284',
  CSS: '#8CAAEE',
  Vue: '#A6D189',
  React: '#8CAAEE',
  Shell: '#A6D189',
  default: '#CA9EE6',
}

function getLanguageColor(lang) {
  return LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default
}

function GitHubProfileViewer({ defaultUsername = 'femnixx' }) {
  const [username, setUsername] = useState(defaultUsername)
  const [input, setInput] = useState(defaultUsername)
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [contributions, setContributions] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rateLimit, setRateLimit] = useState(null)

  const calculateActivityStats = (eventsList) => {
    if (!Array.isArray(eventsList)) {
      return { commits: 0, reviews: 0, prs: 0, issues: 0, total: 0 }
    }

    let commits = 0
    let reviews = 0
    let prs = 0
    let issues = 0

    eventsList.forEach((event) => {
      if (event.type === 'PushEvent') {
        commits += event.payload?.size || 0
      } else if (event.type === 'PullRequestReviewEvent') {
        reviews++
      } else if (event.type === 'PullRequestEvent') {
        prs++
      } else if (event.type === 'IssuesEvent') {
        issues++
      }
    })

    const total = commits + reviews + prs + issues
    return {
      commits,
      reviews,
      prs,
      issues,
      total,
      commitsPct: total ? Math.round((commits / total) * 100) : 0,
      reviewsPct: total ? Math.round((reviews / total) * 100) : 0,
      prsPct: total ? Math.round((prs / total) * 100) : 0,
      issuesPct: total ? Math.round((issues / total) * 100) : 0,
    }
  }

  const fetchData = async (name) => {
    if (!name.trim()) return

    setLoading(true)
    setError(null)
    setRateLimit(null)

    try {
      const [profileRes, reposRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${name}`),
        fetch(`https://api.github.com/users/${name}/repos?sort=updated&per_page=10`),
        fetch(`https://api.github.com/users/${name}/events/public?per_page=100`),
      ])

      if (profileRes.status === 403 || reposRes.status === 403 || eventsRes.status === 403) {
        const resetTime = profileRes.headers.get('X-RateLimit-Reset')
        const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null
        setRateLimit({
          message: 'GitHub API rate limit exceeded',
          reset: resetDate ? resetDate.toLocaleTimeString() : 'soon',
        })
        setLoading(false)
        return
      }

      if (profileRes.status === 404) {
        setError(`User "${name}" not found`)
        setLoading(false)
        return
      }

      if (!profileRes.ok || !reposRes.ok || !eventsRes.ok) {
        throw new Error('Failed to fetch GitHub data')
      }

      const profileData = await profileRes.json()
      const reposData = await reposRes.json()
      const eventsData = await eventsRes.json()

      setProfile(profileData)
      setRepos(Array.isArray(reposData) ? reposData : [])
      setEvents(Array.isArray(eventsData) ? eventsData : [])
      setUsername(name)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(defaultUsername)
  }, [defaultUsername])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(input)
  }

  const stats = calculateActivityStats(events)

  const orgs = [
    { name: 'Raion-Community', url: 'https://github.com/Raion-Community' },
    { name: 'sync-up-org', url: 'https://github.com/sync-up-org' },
    { name: 'Raion-Mobile-Engineer', url: 'https://github.com/Raion-Mobile-Engineer' },
  ]

  return (
    <div className="gh-viewer">
      <form className="gh-input-row" onSubmit={handleSubmit}>
        <input
          className="gh-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter GitHub username..."
        />
        <button className="gh-btn" type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Activity'}
        </button>
      </form>

      {error && <div className="gh-error">{error}</div>}
      {rateLimit && (
        <div className="gh-error">
          {rateLimit.message}. Try again after {rateLimit.reset}.
        </div>
      )}

      {profile && (
        <div className="gh-card">
          <div className="gh-header">
            <img src={profile.avatar_url} alt="avatar" className="gh-avatar" />
            <div className="gh-header-info">
              <div className="gh-name">{profile.name || profile.login}</div>
              <div className="gh-login">@{profile.login}</div>
              {profile.bio && <div className="gh-bio">{profile.bio}</div>}
            </div>
          </div>

          <div className="gh-contribution-banner">
            <div className="gh-contribution-number">{profile.public_repos}</div>
            <div className="gh-contribution-label">public repositories</div>
          </div>

          <div className="gh-section">
            <div className="gh-section-title">Organizations</div>
            <div className="gh-orgs">
              {orgs.map((org) => (
                <a key={org.name} href={org.url} target="_blank" rel="noopener" className="gh-org-badge">
                  @{org.name}
                </a>
              ))}
            </div>
          </div>

          <div className="gh-section">
            <div className="gh-section-title">Top Contributed Repositories</div>
            <div className="gh-repo-list">
              {repos.map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener" className="gh-repo-item">
                  <div className="gh-repo-name">{repo.name}</div>
                  <div className="gh-repo-meta">
                    <span className="gh-lang-dot" style={{ background: getLanguageColor(repo.language) }} />
                    {repo.language || 'Unknown'}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="gh-section">
            <div className="gh-section-title">Activity Distribution</div>
            <div className="gh-chart">
              <div className="gh-chart-row">
                <span className="gh-chart-label">Commits</span>
                <div className="gh-chart-bar-bg">
                  <div className="gh-chart-bar" style={{ width: `${stats.commitsPct}%`, background: 'var(--accent-green)' }} />
                </div>
                <span className="gh-chart-value">{stats.commitsPct}%</span>
              </div>
              <div className="gh-chart-row">
                <span className="gh-chart-label">Code Reviews</span>
                <div className="gh-chart-bar-bg">
                  <div className="gh-chart-bar" style={{ width: `${stats.reviewsPct}%`, background: 'var(--accent-mauve)' }} />
                </div>
                <span className="gh-chart-value">{stats.reviewsPct}%</span>
              </div>
              <div className="gh-chart-row">
                <span className="gh-chart-label">Pull Requests</span>
                <div className="gh-chart-bar-bg">
                  <div className="gh-chart-bar" style={{ width: `${stats.prsPct}%`, background: 'var(--accent-blue)' }} />
                </div>
                <span className="gh-chart-value">{stats.prsPct}%</span>
              </div>
              <div className="gh-chart-row">
                <span className="gh-chart-label">Issues</span>
                <div className="gh-chart-bar-bg">
                  <div className="gh-chart-bar" style={{ width: `${stats.issuesPct}%`, background: 'var(--accent-peach)' }} />
                </div>
                <span className="gh-chart-value">{stats.issuesPct}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubProfileViewer
