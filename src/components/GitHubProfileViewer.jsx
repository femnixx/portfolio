import React, { useState, useEffect } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
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

  const calculateLanguageStats = (reposList) => {
    const counts = {}
    reposList.forEach((repo) => {
      const lang = repo.language
      if (lang) {
        counts[lang] = (counts[lang] || 0) + 1
      }
    })

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)

    const total = sorted.reduce((sum, [, count]) => sum + count, 0)
    return sorted.map(([lang, count]) => ({
      language: lang,
      count,
      pct: total ? Math.round((count / total) * 100) : 0,
      color: getLanguageColor(lang),
    }))
  }

  const fetchWithTimeout = (url, ms = 12000) => {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), ms)
    )
    return Promise.race([fetch(url), timeout])
  }

  const fetchData = async (name) => {
    if (!name.trim()) return

    setLoading(true)
    setError(null)
    setRateLimit(null)

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetchWithTimeout(`https://api.github.com/users/${name}`),
        fetchWithTimeout(`https://api.github.com/users/${name}/repos?sort=updated&per_page=100`),
      ])

      if (profileRes.status === 403 || reposRes.status === 403) {
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

      if (!profileRes.ok || !reposRes.ok) {
        throw new Error('Failed to fetch GitHub data')
      }

      const profileData = await profileRes.json()
      const reposData = await reposRes.json()

      setProfile(profileData)
      setRepos(Array.isArray(reposData) ? reposData : [])
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

  const languageStats = calculateLanguageStats(repos)

  const orgs = [
    { name: 'Raion-Community', url: 'https://github.com/Raion-Community' },
    { name: 'sync-up-org', url: 'https://github.com/sync-up-org' },
    { name: 'Raion-Mobile-Engineer', url: 'https://github.com/Raion-Mobile-Engineer' },
  ]

  const radarData = languageStats.map((item) => ({
    subject: `${item.pct}%\n${item.language}`,
    value: Math.max(item.pct, 5),
    color: item.color,
  }))

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
            <div className="gh-section-title">Language Overview</div>
            <div className="gh-radar-container">
              {radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      stroke="var(--text-muted)"
                      tick={({ x, y, payload }) => {
                        const lines = payload.value.split('\n')
                        const color = radarData[payload.index]?.color || 'var(--accent-mauve)'
                        return (
                          <text x={x} y={y} fill="var(--text-muted)" fontSize={12} textAnchor="middle">
                            <tspan x={x} dy="-0.2em" fontWeight="bold" fill={color}>
                              {lines[0]}
                            </tspan>
                            <tspan x={x} dy="1.2em">
                              {lines[1]}
                            </tspan>
                          </text>
                        )
                      }}
                    />
                    <Radar
                      dataKey="value"
                      stroke="var(--accent-green)"
                      fill="var(--accent-green)"
                      fillOpacity={0.35}
                      strokeWidth={2}
                      dot={{ r: 4, fill: 'var(--accent-green)', stroke: '#ffffff', strokeWidth: 1 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="gh-radar-loading">No language data available</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubProfileViewer
